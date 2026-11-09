import { BRANCHES } from "../data/site";
import { useInView } from "../hooks/useInView";
import StoryTimeline from "./StoryTimeline";

const MILESTONES = [
  {
    year: "Início",
    title: "Nasce a Chassi Forte",
    text: "A oficina começa em Belo Horizonte com foco total em correção estrutural, quando o alinhamento convencional não resolvia.",
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

function BranchMapCard({ branch, index }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -8% 0px", threshold: 0.2 });

  return (
    <article
      ref={ref}
      className={`story-map-card reveal${inView ? " is-visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="story-map-frame">
        <iframe
          className="story-map-embed"
          title={`Mapa Google da filial ${branch.label}`}
          src={branch.embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="story-map-veil" aria-hidden="true" />
        <div className="story-map-grid" aria-hidden="true" />
        <div className="story-map-pin" aria-hidden="true">
          <span className="story-map-pin-badge">
            <img src="/assets/images/logo.webp" alt="" width="72" height="50" />
          </span>
          <span className="story-map-pin-tip" />
        </div>
        <a className="story-map-open" href={branch.mapsHref} target="_blank" rel="noopener noreferrer">
          Abrir no Google Maps
        </a>
      </div>

      <div className="story-map-meta">
        <div className="story-map-meta-top">
          <span className="story-map-badge">{branch.short}</span>
          <h3>{branch.city}</h3>
        </div>
        <p>
          {branch.street}
          <br />
          {branch.district}
        </p>
        <div className="story-map-actions">
          <a href={branch.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={branch.phoneHref}>{branch.phoneDisplay}</a>
        </div>
      </div>
    </article>
  );
}

export default function QuemSomos() {
  const [headRef, headInView] = useInView();
  const [mapsRef, mapsInView] = useInView();

  return (
    <section className="section story" aria-labelledby="quem-somos-title">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headInView ? " is-visible" : ""}`}>
          <h2 id="quem-somos-title">Quem somos</h2>
          <p>
            A história da Chassi Forte é feita de precisão estrutural, atendimento direto e resultado no padrão original,
            veículo a veículo.
          </p>
        </div>
      </div>

      <StoryTimeline
        items={MILESTONES}
        title="História Chassi Forte"
        periodLabel="Início a Hoje"
        activeColor="#d31224"
        textColor="#f8f6f2"
        mutedTextColor="#8a9099"
        backgroundColor="#101215"
        imageUrl="/assets/images/oficina.webp"
        imageAlt="Oficina Chassi Forte em Belo Horizonte"
        duration={1.4}
      />

      <div className="container">
        <div className="story-branches">
          <div ref={mapsRef} className={`story-branches-head reveal${mapsInView ? " is-visible" : ""}`}>
            <p className="story-branches-kicker">Filiais</p>
            <h3>Onde estamos</h3>
            <p>Atendimento em Belo Horizonte e Fortaleza, com o mesmo padrão técnico da Chassi Forte.</p>
          </div>

          <div className="story-maps" aria-label="Mapas das filiais Chassi Forte">
            {BRANCHES.map((branch, index) => (
              <BranchMapCard key={branch.id} branch={branch} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
