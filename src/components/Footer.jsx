import { Link } from "react-router-dom";
import { CONTACT, SERVICES, SOCIALS, WA_BH_BASE } from "../data/site";
import { IconMail, IconPhone, IconWhatsApp, SocialIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/images/logo.webp" alt="Chassi Forte" width="160" height="110" />
          <p>Especialistas em soluções estruturais automotivas. Referência em Belo Horizonte.</p>
          <div className="footer-socials">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Serviços</h4>
          <nav aria-label="Serviços">
            {SERVICES.map((service) => (
              <Link key={service.title} to="/#servicos">
                {service.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <h4>Empresa</h4>
          <nav aria-label="Rodapé">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
              Início
            </Link>
            <Link to="/quem-somos">Quem somos</Link>
            <Link to="/#resultados">Resultados</Link>
            <Link to="/#faq">FAQ</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/#contato">Contato</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Contato</h4>
          <ul className="footer-contact-list">
            <li>
              <IconMail size={15} />
              <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            </li>
            <li>
              <IconPhone size={15} />
              <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            </li>
            <li>
              <IconWhatsApp size={15} />
              <a href={WA_BH_BASE} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Endereço</h4>
          <address className="footer-address">
            <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer">
              <span>{CONTACT.street}</span>
              <span>{CONTACT.district}</span>
              <span>{CONTACT.cep}</span>
            </a>
            <span>{CONTACT.cnpj}</span>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <nav className="footer-legal" aria-label="Informações legais">
            <Link to="/privacidade">Privacidade</Link>
            <span aria-hidden="true">|</span>
            <Link to="/privacidade#cookies">Cookies</Link>
            <span aria-hidden="true">|</span>
            <Link to="/termos">Termos</Link>
          </nav>
          <p>© 2026 Chassi Forte Soluções Automotivas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
