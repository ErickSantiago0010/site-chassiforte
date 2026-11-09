import { useEffect, useState } from "react";
import { WA_BH } from "../data/site";
import { useScrolled } from "../hooks/useScrollProgress";
import { IconCookie, IconGoogle, IconWhatsApp } from "./Icons";

const COOKIE_KEY = "chassi-forte-cookies";
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ791WfAFPxwcRjv1mSyddcvg";

function readChoice() {
  try {
    return localStorage.getItem(COOKIE_KEY);
  } catch {
    return null;
  }
}

function writeChoice(value) {
  try {
    localStorage.setItem(COOKIE_KEY, value);
  } catch {
    /* ignore */
  }
}

export default function SiteWidgets() {
  const [choice, setChoice] = useState(() => readChoice());
  const [bannerOpen, setBannerOpen] = useState(() => !readChoice());
  const [tipVisible, setTipVisible] = useState(false);
  const scrolled = useScrolled(160);
  const decided = Boolean(choice);

  useEffect(() => {
    if (!decided || !scrolled) {
      setTipVisible(false);
      return undefined;
    }

    setTipVisible(true);
    const timer = window.setTimeout(() => setTipVisible(false), 5000);
    return () => window.clearTimeout(timer);
  }, [decided, scrolled]);

  const accept = () => {
    writeChoice("accepted");
    setChoice("accepted");
    setBannerOpen(false);
  };

  const reject = () => {
    writeChoice("rejected");
    setChoice("rejected");
    setBannerOpen(false);
  };

  return (
    <>
      {decided ? (
        <div className={`google-dock${scrolled ? " is-visible" : ""}`}>
          <a
            className="google-fab google-fab--on-dark"
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Avalie nossa empresa no Google"
          >
            <span className="google-fab-disc">
              <span className="google-fab-mark" aria-hidden="true">
                <IconGoogle />
              </span>
            </span>
            <span className={`google-fab-bubble${tipVisible ? " is-open" : ""}`} aria-hidden="true">
              <span className="google-fab-copy">Avalie nossa empresa</span>
              <span className="google-fab-stars">★★★★★</span>
            </span>
          </a>
        </div>
      ) : null}

      <a className="wa-floating" href={WA_BH} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco no WhatsApp">
        <span className="wa-floating-tooltip">Fale conosco</span>
        <span className="wa-floating-icon">
          <IconWhatsApp />
        </span>
      </a>

      {bannerOpen ? (
        <div className="cookie-overlay" role="presentation">
          <div className="cookie" role="dialog" aria-labelledby="cookie-title" aria-modal="true">
            <div className="cookie-visual" aria-hidden="true">
              <IconCookie />
            </div>

            <div className="cookie-head">
              <h2 id="cookie-title" className="cookie-title">
                Cookies e privacidade
              </h2>
              <span className="cookie-brand">Chassi Forte</span>
            </div>

            <p className="cookie-lead">Usamos cookies para manter o site estável e entender o que funciona melhor na navegação.</p>

            <div className="cookie-box">
              <p>
                Essenciais ficam sempre ativos. Com a sua permissão, também usamos cookies de análise para melhorar a experiência —
                sem vender dados.
              </p>
            </div>

            <div className="cookie-links">
              <a href="/privacidade">Privacidade</a>
              <span aria-hidden="true">·</span>
              <a href="/privacidade#cookies">Cookies</a>
              <span aria-hidden="true">·</span>
              <a href="/termos">Termos</a>
            </div>

            <div className="cookie-actions">
              <button type="button" className="cookie-btn cookie-btn-ghost" onClick={reject}>
                Recusar
              </button>
              <button type="button" className="cookie-btn cookie-btn-primary" onClick={accept}>
                Aceitar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
