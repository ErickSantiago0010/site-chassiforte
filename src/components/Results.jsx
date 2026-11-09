import { COMPARE_ITEMS } from "../data/site";
import CompareSlider from "./CompareSlider";
import SectionHead from "./SectionHead";

export default function Results() {
  return (
    <section className="section results" id="resultados">
      <div className="container">
        <SectionHead title="Resultados reais">
          Arraste o comparador e veja a correção estrutural antes e depois do serviço.
        </SectionHead>

        <div className="compare-grid">
          {COMPARE_ITEMS.map((item) => (
            <CompareSlider key={item.before} {...item} />
          ))}
        </div>

        <div className="section-cta">
          <a
            className="btn btn-solid"
            href="https://wa.me/553136562538?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20os%20servi%C3%A7os"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero saber mais
          </a>
        </div>
      </div>
    </section>
  );
}
