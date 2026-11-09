export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-media" aria-hidden="true">
        <img
          src="/assets/images/hero.webp"
          alt=""
          className="hero-img"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-shade" />
      </div>

      <div className="container hero-content">
        <h1>Estrutura ou alinhamento fora do padrão?</h1>
        <p className="hero-accent">A gente corrige com precisão</p>
        <p className="hero-lead">
          Carro puxando? Sofreu colisão? Desgaste irregular de pneus?
          <br />
          Resolva na raiz com correção no padrão original.
        </p>
        <p className="hero-check">
          <span aria-hidden="true">✓</span>
          <span>
            Chassi, longarina, camber, caster,
            <br />
            eixo traseiro e solda MIG/MAG
          </span>
        </p>
      </div>
    </section>
  );
}
