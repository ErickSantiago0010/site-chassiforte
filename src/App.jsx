import { Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SiteWidgets from "./components/SiteWidgets";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import QuemSomos from "./pages/QuemSomos";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";

const SCROLL_Y_KEY = "cf-scroll-y";
const SCROLL_PATH_KEY = "cf-scroll-path";
const LAST_NAV_KEY = "cf-last-nav";

function readSavedScroll(pathname) {
  try {
    if (sessionStorage.getItem(SCROLL_PATH_KEY) !== pathname) return null;
    const value = Number(sessionStorage.getItem(SCROLL_Y_KEY));
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function saveScroll(pathname) {
  try {
    sessionStorage.setItem(SCROLL_PATH_KEY, pathname);
    sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));
  } catch {
    /* ignore */
  }
}

function scrollToHash(hash, behavior = "smooth") {
  const id = hash.replace("#", "");
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const pathRef = useRef(location.pathname);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const persist = () => saveScroll(pathRef.current);
    window.addEventListener("pagehide", persist);
    window.addEventListener("beforeunload", persist);
    window.addEventListener("scroll", persist, { passive: true });

    return () => {
      persist();
      window.removeEventListener("pagehide", persist);
      window.removeEventListener("beforeunload", persist);
      window.removeEventListener("scroll", persist);
    };
  }, []);

  useEffect(() => {
    pathRef.current = location.pathname;

    let lastNav = null;
    try {
      lastNav = sessionStorage.getItem(LAST_NAV_KEY);
    } catch {
      /* ignore */
    }

    const navId = `${location.key}|${location.pathname}|${location.hash}`;
    const isRemount = lastNav === navId;

    try {
      sessionStorage.setItem(LAST_NAV_KEY, navId);
    } catch {
      /* ignore */
    }

    const restoreSaved = () => {
      const saved = readSavedScroll(location.pathname);
      if (saved === null || saved < 1) return undefined;
      const apply = () => window.scrollTo({ top: saved, left: 0, behavior: "auto" });
      apply();
      const t1 = window.setTimeout(apply, 50);
      const t2 = window.setTimeout(apply, 200);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    };

    // HMR / remount da mesma entrada: mantém (ou restaura) a posição atual.
    if (isRemount) {
      return restoreSaved();
    }

    // #inicio é o topo — não reinsistir nele (HMR/reload com hash antigo).
    if (location.hash && location.hash !== "#inicio") {
      const behavior = navigationType === "POP" ? "auto" : "smooth";
      const timer = window.setTimeout(() => scrollToHash(location.hash, behavior), 40);
      return () => window.clearTimeout(timer);
    }

    if (navigationType === "POP") {
      return restoreSaved();
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    saveScroll(location.pathname);
    return undefined;
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <Header />
      <ScrollManager />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
      </Routes>

      <Footer />
      <SiteWidgets />
    </>
  );
}
