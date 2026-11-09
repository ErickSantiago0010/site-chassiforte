import { useEffect, useRef, useState } from "react";
import { BRANDS_BOTTOM, BRANDS_TOP } from "../data/site";
import { useNearViewport } from "../hooks/useInViewOnce";

function BrandItem({ brand, decorative = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="brand-item brand-item-text">
        <em>{brand.name}</em>
      </span>
    );
  }

  return (
    <span className="brand-item">
      <img
        src={brand.src}
        alt={decorative ? "" : brand.alt || brand.name}
        loading="lazy"
        decoding="async"
        width="120"
        height="40"
        draggable="false"
        onError={() => setFailed(true)}
      />
      <em>{brand.name}</em>
    </span>
  );
}

function BrandRow({ brands, direction }) {
  const trackRef = useRef(null);
  const resumeTimer = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [held, setHeld] = useState(false);
  const [offset, setOffset] = useState(0);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    base: 0,
    width: 0,
  });

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  useEffect(() => {
    const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const width = drag.width || 1;
      let next = drag.base + (event.clientX - drag.startX);
      next = ((next % width) + width) % width - (direction === "right" ? width : 0);
      setOffset(next);
    };

    const onUp = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      drag.active = false;
      drag.pointerId = null;
      setDragging(false);
      setHeld(true);
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        setHeld(false);
        setOffset(0);
      }, 2200);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [direction]);

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    const width = track ? track.scrollWidth / 2 : 1;
    let current = offset;

    if (!dragging && !held) {
      const computed = track ? getComputedStyle(track).transform : "none";
      if (computed && computed !== "none") {
        const match = computed.match(/matrix\(([^)]+)\)/);
        if (match) {
          const parts = match[1].split(",").map((part) => Number(part.trim()));
          current = parts[4] || 0;
        }
      }
    }

    window.clearTimeout(resumeTimer.current);
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      base: current,
      width,
    };
    setOffset(current);
    setHeld(true);
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const manual = dragging || held;

  return (
    <div className={`brands-row${dragging ? " is-dragging" : ""}`}>
      <div
        ref={trackRef}
        className={`brands-track brands-track-${direction}${manual ? " is-dragging" : ""}`}
        style={manual ? { transform: `translateX(${offset}px)`, animation: "none" } : undefined}
        onPointerDown={onPointerDown}
      >
        <div className="brands-group">
          {brands.map((brand) => (
            <BrandItem key={brand.name} brand={brand} />
          ))}
        </div>
        <div className="brands-group" aria-hidden="true">
          {brands.map((brand) => (
            <BrandItem key={`${brand.name}-dup`} brand={brand} decorative />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Brands() {
  const [ref, near] = useNearViewport("80px 0px");

  return (
    <section
      ref={ref}
      className={`brands${near ? "" : " is-paused"}`}
      aria-label="Montadoras atendidas"
    >
      <BrandRow brands={BRANDS_TOP} direction="right" />
      <BrandRow brands={BRANDS_BOTTOM} direction="left" />
    </section>
  );
}
