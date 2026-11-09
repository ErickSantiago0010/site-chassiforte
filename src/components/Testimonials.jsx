import { TESTIMONIALS } from "../data/site";
import { useNearViewport } from "../hooks/useInViewOnce";
import { IconGoogle } from "./Icons";
import SectionHead from "./SectionHead";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Stars({ rating = 5 }) {
  return (
    <div className="g-review-stars" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true" className={index < rating ? "is-on" : ""}>
          <path d="M12 2.8l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.8 6.1 20.9l1.6-6.7L2.5 9.7l6.9-.6L12 2.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  const [railRef, near] = useNearViewport("100px 0px");

  return (
    <section className="section testimonials" id="depoimentos" aria-labelledby="depoimentos-title">
      <div className="container">
        <SectionHead title="Quem foi atendido recomenda" id="depoimentos-title">
          Nota 4,9 em centenas de avaliações — honestidade e precisão no padrão de fábrica.
        </SectionHead>
      </div>

      <div
        ref={railRef}
        className={`quote-rail${near ? "" : " is-paused"}`}
        aria-label="Depoimentos de clientes no Google"
      >
        <div className="quote-track">
          {loop.map((item, index) => (
            <article className="g-review" key={`${item.author}-${index}`}>
              <header className="g-review-head">
                <span className="g-review-avatar" style={{ background: item.avatar }} aria-hidden="true">
                  {initials(item.author)}
                </span>
                <div className="g-review-meta">
                  <strong>{item.author}</strong>
                  <span>{item.time}</span>
                </div>
                <span className="g-review-google" aria-hidden="true">
                  <IconGoogle />
                </span>
              </header>
              <Stars rating={item.rating} />
              <p>“{item.quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
