import { WORK_WITH_US } from "../data/site";
import { useInView } from "../hooks/useInView";

export default function CareersBanner() {
  const [ref, inView] = useInView({ threshold: 0.28, rootMargin: "0px 0px -12% 0px" });

  return (
    <section
      ref={ref}
      className={`careers-banner${inView ? " is-inview" : ""}`}
      id="trabalhe-conosco"
      aria-labelledby="carreira-title"
    >
      <div className="careers-banner__media" aria-hidden="true">
        <img className="careers-banner__bg" src="/assets/images/careers/handshake.jpg" alt="" />
        <div className="careers-banner__shade" />
      </div>

      <div className="container careers-banner__inner">
        <div className="careers-banner__copy">
          <h2 id="carreira-title" className="careers-banner__title">
            <span>
              Vamos juntos
              <br className="careers-banner__break" />
              com a
            </span>
            <em className="careers-banner__brand">
              Chassi
              <br className="careers-banner__break" />
              Forte
            </em>
          </h2>

          <a className="careers-banner__cta" href={WORK_WITH_US} target="_blank" rel="noopener noreferrer">
            Trabalhe conosco
          </a>
        </div>

        <img
          className="careers-banner__person"
          src="/assets/images/careers/personagem-chassi-forte.png"
          alt="Profissional da Chassi Forte com a farda da empresa"
          width="760"
          height="1015"
        />
      </div>
    </section>
  );
}
