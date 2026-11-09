import { useEffect, useRef, useState } from "react";

export default function CompareSlider({ before, after, beforeAlt, afterAlt }) {
  const trackRef = useRef(null);
  const beforeImgRef = useRef(null);
  const [value, setValue] = useState(50);
  const dragRef = useRef({ active: false, pointerId: null });

  useEffect(() => {
    const syncWidth = () => {
      const track = trackRef.current;
      const beforeImg = beforeImgRef.current;
      if (!track || !beforeImg) return;
      beforeImg.style.setProperty("--compare-track-width", `${track.clientWidth}px`);
      beforeImg.style.width = `${track.clientWidth}px`;
    };

    syncWidth();
    window.addEventListener("resize", syncWidth);
    return () => window.removeEventListener("resize", syncWidth);
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      setValue(Math.max(0, Math.min(100, next)));
    };

    const onUp = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      drag.active = false;
      drag.pointerId = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onHandlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { active: true, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const afterOpacity = Math.max(0, Math.min(1, (100 - value) / 55));
  const beforeOpacity = Math.max(0, Math.min(1, value / 55));

  return (
    <figure className="compare">
      <div className="compare-track" ref={trackRef} style={{ "--compare-value": `${value}%` }}>
        <img className="compare-after" src={after} alt={afterAlt} loading="lazy" decoding="async" />
        <div className="compare-before-wrap" style={{ width: `${value}%` }}>
          <img
            className="compare-before"
            ref={beforeImgRef}
            src={before}
            alt={beforeAlt}
            loading="lazy"
            decoding="async"
          />
        </div>

        <span className="compare-label compare-label-after" style={{ opacity: afterOpacity }} aria-hidden="true">
          Depois
        </span>
        <span className="compare-label compare-label-before" style={{ opacity: beforeOpacity }} aria-hidden="true">
          Antes
        </span>

        <input
          className="compare-range"
          type="range"
          min="0"
          max="100"
          value={value}
          aria-label="Comparar antes e depois"
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <div
          className="compare-handle"
          style={{ left: `${value}%` }}
          onPointerDown={onHandlePointerDown}
          role="presentation"
        >
          <span />
        </div>
      </div>
    </figure>
  );
}
