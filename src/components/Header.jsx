import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, SOCIALS, WA_BH_BASE, WA_CE, WORK_WITH_US } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrollProgress";
import { SocialIcon } from "./Icons";

const SECTION_IDS = NAV_LINKS.map((link) => link.section).filter(Boolean);

export default function Header() {
  const scrolled = useScrolled(24);
  const location = useLocation();
  const activeSection = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "calc(var(--header-h) + 1rem)";
  }, []);

  useEffect(() => {
    const footerLogo = document.querySelector(".footer-brand img");
    if (!footerLogo || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHideLogo(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.35, 0.6] },
    );

    observer.observe(footerLogo);
    return () => observer.disconnect();
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const isLinkActive = useMemo(
    () => (link) => {
      if (link.href === "/quem-somos") return location.pathname === "/quem-somos";
      if (link.href === "/blog") return location.pathname === "/blog" || location.pathname.startsWith("/blog/");
      if (link.section) return location.pathname === "/" && activeSection === link.section;
      return false;
    },
    [activeSection, location.pathname],
  );

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${hideLogo ? " logo-hidden" : ""}`}
    >
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-branches" aria-label="Filiais">
            <a className="topbar-branch is-active" href={WA_BH_BASE} target="_blank" rel="noopener noreferrer">
              BH · Belo Horizonte
            </a>
            <span className="topbar-sep" aria-hidden="true" />
            <a className="topbar-branch" href={WA_CE} target="_blank" rel="noopener noreferrer">
              CE · Fortaleza
            </a>
          </div>

          <div className="topbar-socials" aria-label="Redes sociais">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar-inner">
          <Link
            className="brand brand-bar"
            to="/"
            aria-label="Chassi Forte, início"
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }
            }}
          >
            <img src="/assets/images/logo.webp" alt="Chassi Forte Soluções Automotivas" width="140" height="96" />
          </Link>

          <nav className="nav" aria-label="Principal">
            <Link
              className="brand brand-pill"
              to="/"
              aria-label="Chassi Forte, início"
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
              }}
            >
              <img src="/assets/images/logo.webp" alt="" width="100" height="70" />
            </Link>
            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={isLinkActive(link) ? "is-active" : undefined}
                  aria-current={isLinkActive(link) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a className="btn btn-solid header-cta" href={WORK_WITH_US} target="_blank" rel="noopener noreferrer">
              Trabalhe conosco
            </a>
          </nav>

          <div className="navbar-actions">
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className={`nav-mobile${menuOpen ? " is-open" : ""}`} id="menu-mobile">
        <div className="nav-mobile-inner">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={isLinkActive(link) ? "is-active" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <a className="btn btn-solid" href={WORK_WITH_US} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            Trabalhe conosco
          </a>
        </div>
      </div>
    </header>
  );
}
