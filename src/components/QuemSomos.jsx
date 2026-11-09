import { useInView } from "../hooks/useInView";

const MILESTONES = [
  {
    year: "Início",
    title: "Nasce a Chassi Forte",
    text: "A oficina começa em Belo Horizonte com foco total em correção estrutural — quando o alinhamento convencional não resolvia.",
  },
  {
    year: "Crescimento",
    title: "Método e equipamento",
    text: "Investimos em bancada, solda MIG/MAG e medições precisas para devolver a geometria original de fábrica.",
  },
  {
    year: "Confiança",
    title: "Laudo e parceria",
    text: "Passamos a emitir laudo técnico aceito por seguradoras e funilarias, virando referência em Venda Nova.",
  },
  {
    year: "Hoje",
    title: "Mais de 20 mil veículos",
    text: "Seguimos corrigindo chassi, longarina, camber, caster e eixo traseiro com honestidade e precisão.",
  },
];

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -12% 0px", threshold: 0.25 });

  return (
    <article
      ref={ref}
      className={`story-item reveal${inView ? " is-visible" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="story-marker" aria-hidden="true">
        <span />
      </div>
      <div className="story-card">
        <p className="story-year">{item.year}</p>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}

export default function QuemSomos() {
  const [headRef, headInView] = useInView();

  return (
    <section className="section story" aria-labelledby="quem-somos-title">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headInView ? " is-visible" : ""}`}>
          <h2 id="quem-somos-title">Quem somos</h2>
          <p>
            A história da Chassi Forte é feita de precisão estrutural, atendimento direto e resultado no padrão original —
            veículo a veículo.
          </p>
        </div>

        <div className="story-layout">
          <div className="story-media">
            <img src="/assets/images/oficina.webp" alt="Oficina Chassi Forte em Belo Horizonte" loading="lazy" />
          </div>

          <div className="story-timeline" aria-label="Linha do tempo da Chassi Forte">
            <div className="story-line" aria-hidden="true" />
            {MILESTONES.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
