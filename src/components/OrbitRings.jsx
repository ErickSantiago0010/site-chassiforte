import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const SPEED_NORMAL = 7;
const SPEED_HOVER = 0.8;
const LERP = 0.08;

function formatDisplay(value) {
  if (Number.isInteger(value)) return value.toLocaleString("pt-BR");
  return value.toFixed(1).replace(".", ",");
}

function DigitReel({ digit, active, delay = 0 }) {
  const target = Number(digit);
  const strip = useMemo(() => {
    const base = Array.from({ length: 10 }, (_, i) => i);
    return [...base, ...base, ...base, target];
  }, [target]);
  const offset = active ? strip.length - 1 : 0;

  return (
    <span className="ors-digit" style={{ "--ors-delay": `${delay}ms` }}>
      <span
        className={`ors-digit-strip${active ? " is-on" : ""}`}
        style={{ "--ors-offset": offset }}
        aria-hidden="true"
      >
        {strip.map((n, index) => (
          <span key={`${n}-${index}`}>{n}</span>
        ))}
      </span>
      <span className="ors-sr">{digit}</span>
    </span>
  );
}

function CounterValue({ value, prefix = "", unit = "", active }) {
  const display = formatDisplay(value);
  const parts = display.split("");
  let digitIndex = 0;

  return (
    <p className="ors-counter" aria-label={`${prefix}${display}${unit}`}>
      {prefix ? <span className="ors-affix">{prefix}</span> : null}
      {parts.map((char, index) => {
        if (!/\d/.test(char)) {
          return (
            <span key={`s-${index}`} className="ors-sep">
              {char}
            </span>
          );
        }
        const delay = digitIndex * 80;
        digitIndex += 1;
        return <DigitReel key={`d-${index}`} digit={char} active={active} delay={delay} />;
      })}
      {unit ? <span className="ors-affix ors-unit">{unit}</span> : null}
    </p>
  );
}

function OrbitDial({ ring, active, index }) {
  const uid = useId().replace(/:/g, "");
  const pathId = `ors-orbit-${uid}-${index}`;
  const orbitRef = useRef(null);
  const angleRef = useRef(0);
  const speedRef = useRef(SPEED_NORMAL);
  const targetSpeedRef = useRef(SPEED_NORMAL);
  const hoverRef = useRef(false);
  const frameRef = useRef(0);
  const lastRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  const orbitText = (ring.orbit || ring.label || "").toUpperCase();
  const orbitLoop = `${orbitText} · ${orbitText} · ${orbitText} · `;
  const max = ring.max ?? Math.max(ring.value, 1);
  const progress = Math.max(0, Math.min(1, ring.value / max));

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || !active) {
      cancelAnimationFrame(frameRef.current);
      lastRef.current = 0;
      if (orbitRef.current) orbitRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      return undefined;
    }

    speedRef.current = SPEED_NORMAL;
    targetSpeedRef.current = SPEED_NORMAL;

    const tick = (now) => {
      if (!lastRef.current) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;

      targetSpeedRef.current = hoverRef.current ? SPEED_HOVER : SPEED_NORMAL;
      speedRef.current += (targetSpeedRef.current - speedRef.current) * LERP;
      angleRef.current = (angleRef.current + speedRef.current * dt) % 360;

      if (orbitRef.current) {
        orbitRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      lastRef.current = 0;
    };
  }, [reduced, active]);

  return (
    <article
      className={`ors-card${active ? " is-active" : ""}`}
      style={{ "--ors-v": active ? progress : 0 }}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
    >
      <div className="ors-dial" aria-hidden="true">
        <div className="ors-progress" />

        <svg className="ors-orbit" viewBox="0 0 220 220" ref={orbitRef}>
          <defs>
            <path
              id={pathId}
              d="M 110,110 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0"
            />
          </defs>
          <text className="ors-orbit-text">
            <textPath href={`#${pathId}`} xlinkHref={`#${pathId}`} startOffset="0%">
              {orbitLoop}
            </textPath>
          </text>
        </svg>

        <div
          className={`ors-core${ring.stars ? " has-stars" : ""}${
            `${ring.prefix || ""}${formatDisplay(ring.value)}${ring.unit || ""}`.length > 4 ? " is-compact" : ""
          }`}
        >
          <CounterValue value={ring.value} prefix={ring.prefix} unit={ring.unit} active={active} />
          {ring.stars ? (
            <div className="ors-stars" aria-label={`${ring.stars} de 5 estrelas`}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < Math.round(ring.stars) ? "is-on" : ""} aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <h3 className="ors-label">{ring.label}</h3>
      {ring.note ? <p className="ors-note">{ring.note}</p> : null}

      {ring.seals?.length ? (
        <ul className="ors-seals">
          {ring.seals.map((seal) => (
            <li key={seal.label}>
              {seal.src ? <img src={seal.src} alt={seal.alt || seal.label} /> : <span>{seal.label}</span>}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export function OrbitRings({ rings = [], theme = "night", heading, kicker, ariaLabel }) {
  const [ref, inView] = useInView({ threshold: 0.35, rootMargin: "0px 0px -8% 0px" });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    const timer = window.setTimeout(() => setActive(true), 60);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <section className={`ors ors-${theme}`} aria-label={ariaLabel || heading || "Números"} ref={ref}>
      <div className="container ors-inner">
        {(kicker || heading) && (
          <div className="ors-head">
            {kicker ? <p className="ors-kicker">{kicker}</p> : null}
            {heading ? <h2>{heading}</h2> : null}
          </div>
        )}

        <div className="ors-grid">
          {rings.map((ring, index) => (
            <OrbitDial key={ring.label} ring={ring} active={active} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const CHASSI_RINGS = [
  {
    label: "Serviços realizados",
    value: 20000,
    max: 20000,
    prefix: "+",
    note: "Veículos atendidos",
    orbit: "Serviços realizados · Veículos atendidos",
  },
  {
    label: "Unidades",
    value: 2,
    max: 2,
    note: "BH e Fortaleza",
    orbit: "Belo Horizonte · Fortaleza",
  },
  {
    label: "Nota no Google",
    value: 4.9,
    max: 5,
    stars: 5,
    note: "Satisfação dos clientes",
    orbit: "Avaliação Google · Satisfação",
  },
];

export default function Stats() {
  return <OrbitRings theme="night" ariaLabel="Números da Chassi Forte" rings={CHASSI_RINGS} />;
}
