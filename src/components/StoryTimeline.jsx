import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULTS = {
  title: "História Chassi Forte",
  periodLabel: "Início a Hoje",
  textColor: "#f8f6f2",
  mutedTextColor: "#8a9099",
  activeColor: "#d31224",
  backgroundColor: "#101215",
  imageUrl: "/assets/images/oficina.webp",
  imageAlt: "Oficina Chassi Forte em Belo Horizonte",
  duration: 1.4,
};

export default function StoryTimeline({
  items = [],
  title = DEFAULTS.title,
  periodLabel = DEFAULTS.periodLabel,
  textColor = DEFAULTS.textColor,
  mutedTextColor = DEFAULTS.mutedTextColor,
  activeColor = DEFAULTS.activeColor,
  backgroundColor = DEFAULTS.backgroundColor,
  imageUrl = DEFAULTS.imageUrl,
  imageAlt = DEFAULTS.imageAlt,
  duration = DEFAULTS.duration,
}) {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const activeRef = useRef(-1);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const milestones = useMemo(() => items, [items]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!root || !pin || !viewport || !track || milestones.length === 0) return undefined;

    const itemsEls = itemRefs.current.filter(Boolean);
    root.style.setProperty("--story-reveal", `${duration}s`);

    const getTravel = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);

    const setScrollHeight = () => {
      const travel = getTravel();
      // Espaço vertical suficiente para a trilha horizontal “caber” no scroll.
      const scrollSpace = Math.max(travel * 1.15, window.innerHeight * 1.8);
      const nextHeight = scrollSpace + window.innerHeight;
      const prevHeight = root.offsetHeight;
      const beforeY = window.scrollY;
      const rootTop = root.getBoundingClientRect().top + beforeY;

      root.style.height = `${nextHeight}px`;

      // Se a altura muda com o usuário abaixo da seção, preserva o ponto visual.
      if (beforeY > rootTop && prevHeight > 0) {
        const delta = nextHeight - prevHeight;
        if (Math.abs(delta) > 1) {
          window.scrollTo({ top: beforeY + delta, left: 0, behavior: "auto" });
        }
      }
    };

    const syncActive = (progress = 0) => {
      const last = Math.max(itemsEls.length - 1, 0);
      // Distribui o scroll igualmente entre os marcos para nenhum ficar sem revelar.
      const nearest = Math.max(0, Math.min(last, Math.round(progress * last)));
      if (activeRef.current === nearest) return;
      activeRef.current = nearest;
      itemsEls.forEach((el, index) => {
        el.classList.toggle("is-active", index === nearest);
      });
      setActive(nearest);
    };

    if (reducedMotion) {
      root.style.height = "auto";
      itemsEls.forEach((el, index) => el.classList.toggle("is-active", index === 0));
      setActive(0);
      gsap.set(track, { x: 0 });
      return undefined;
    }

    setScrollHeight();
    gsap.set(track, { x: 0, force3D: true });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.75,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const travel = getTravel();
          gsap.set(track, { x: -travel * self.progress, force3D: true });
          root.style.setProperty("--story-progress", String(self.progress));
          syncActive(self.progress);
        },
        onRefresh: (self) => {
          setScrollHeight();
          syncActive(self.progress);
        },
      });

      requestAnimationFrame(() => {
        setScrollHeight();
        ScrollTrigger.refresh();
        syncActive(0);
      });
    }, root);

    const onResize = () => {
      setScrollHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      root.style.height = "";
    };
  }, [milestones, reducedMotion, duration]);

  return (
    <div
      ref={rootRef}
      className="story-h"
      style={{
        "--story-text": textColor,
        "--story-muted": mutedTextColor,
        "--story-active": activeColor,
        "--story-bg": backgroundColor,
        "--story-reveal": `${duration}s`,
      }}
    >
      <div ref={pinRef} className="story-h-pin">
        <div className="story-h-media" aria-hidden="true">
          <img src={imageUrl} alt={imageAlt} />
          <div className="story-h-shade" />
        </div>

        <div className="story-h-head">
          <p className="story-h-period">{periodLabel}</p>
          <h3 className="story-h-title">{title}</h3>
          <p className="story-h-hint">Continue rolando: a trilha se move na horizontal</p>
        </div>

        <div className="story-h-rail" aria-hidden="true">
          <span className="story-h-rail-line" />
          <span className="story-h-rail-glow" />
        </div>

        <div className="story-h-viewport" ref={viewportRef}>
          <div
            ref={trackRef}
            className="story-h-track"
            role="list"
            aria-label="Linha do tempo da Chassi Forte"
          >
            {milestones.map((item, index) => (
              <article
                key={item.title}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className={`story-h-item${active === index ? " is-active" : ""}`}
                role="listitem"
                aria-current={active === index ? "step" : undefined}
              >
                <p className="story-h-year">{item.year}</p>
                <span className="story-h-dot" aria-hidden="true" />
                <span className="story-h-stem" aria-hidden="true" />
                <div className="story-h-copy">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="story-h-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
