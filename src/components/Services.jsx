import { SERVICES } from "../data/site";
import SectionHead from "./SectionHead";

export default function Services() {
  return (
    <section className="section services" id="servicos">
      <div className="container">
        <SectionHead title="O que a Chassi Forte resolve">
          Correção estrutural completa para devolver dirigibilidade, segurança e geometria de fábrica.
        </SectionHead>

        <div className="service-list">
          {SERVICES.map((service) => (
            <article key={service.title} className={`service-row${service.reverse ? " reverse" : ""}`}>
              <div className="service-media">
                <img src={service.image} alt={service.alt} loading="lazy" />
              </div>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="specialist-band">
          <div>
            <h3>Fale com um especialista</h3>
            <p>Avaliação gratuita para entender o que o alinhamento convencional não consegue resolver.</p>
          </div>
          <a
            className="btn btn-solid"
            href="https://wa.me/553136562538?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar avaliação
          </a>
        </div>
      </div>
    </section>
  );
}
