import { useEffect, useMemo, useRef, useState } from "react";
import { INSTAGRAM_POSTS } from "../data/site";
import { useNearViewport } from "../hooks/useInViewOnce";
import { IconInstagram, IconPlay } from "./Icons";

function getLayout() {
  if (typeof window === "undefined") return { mode: "pages", perPage: 3 };
  if (window.matchMedia("(max-width: 640px)").matches) return { mode: "peek", perPage: 1 };
  if (window.matchMedia("(max-width: 980px)").matches) return { mode: "pages", perPage: 2 };
  return { mode: "pages", perPage: 3 };
}

function chunkItems(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export default function Instagram() {
  const viewportRef = useRef(null);
  const [sectionRef, near] = useNearViewport("120px 0px");
  const [layout, setLayout] = useState({ mode: "pages", perPage: 3 });
  const [page, setPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({
    active: false,
    locked: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const items = useMemo(
    () => [...INSTAGRAM_POSTS.map((post) => ({ type: "post", post })), { type: "more" }],
    [],
  );

  const slides = useMemo(() => {
    if (layout.mode === "peek") return items.map((item) => [item]);
    return chunkItems(items, layout.perPage);
  }, [items, layout]);

  const pageCount = slides.length;
  const maxPage = layout.mode === "peek" ? Math.max(0, pageCount - 1) : Math.max(0, pageCount - 1);

  useEffect(() => {
    const sync = () => {
      setLayout(getLayout());
      setPage(0);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    setPage((current) => Math.min(current, maxPage));
  }, [maxPage]);

  useEffect(() => {
    if (!near || dragging || pageCount <= 1) return undefined;
    const timer = window.setInterval(() => {
      setPage((current) => (current >= maxPage ? 0 : current + 1));
    }, 5200);
    return () => window.clearInterval(timer);
  }, [pageCount, maxPage, dragging, near]);

  useEffect(() => {
    const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (!drag.locked) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        drag.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (drag.locked === "y") {
          drag.active = false;
          drag.pointerId = null;
          setDragging(false);
          setDragX(0);
          return;
        }
        setDragging(true);
      }

      if (drag.locked !== "x") return;
      if (Math.abs(dx) > 6) drag.moved = true;
      setDragX(dx);
    };

    const onUp = (event) => {
      const drag = dragRef.current;
      if ((!drag.active && drag.locked !== "x") || event.pointerId !== drag.pointerId) {
        drag.active = false;
        drag.locked = null;
        drag.pointerId = null;
        return;
      }

      const width = viewportRef.current?.clientWidth || 1;
      const step = layout.mode === "peek" ? width / 1.5 : width;
      const delta = event.clientX - drag.startX;
      const threshold = Math.max(40, step * 0.18);
      const wasHorizontal = drag.locked === "x";

      drag.active = false;
      drag.locked = null;
      drag.pointerId = null;
      setDragging(false);
      setDragX(0);

      if (wasHorizontal && Math.abs(delta) > threshold) {
        setPage((current) => {
          if (delta < 0) return Math.min(current + 1, maxPage);
          return Math.max(current - 1, 0);
        });
      }

      window.setTimeout(() => {
        drag.moved = false;
      }, 60);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [layout.mode, maxPage]);

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = {
      active: true,
      locked: null,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    setDragX(0);
  };

  const onClickCapture = (event) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const trackTransform =
    layout.mode === "peek"
      ? `translate3d(calc(${-page * (100 / 1.5)}% + ${dragX}px), 0, 0)`
      : `translate3d(calc(${-page * 100}% + ${dragX}px), 0, 0)`;

  const renderItem = (item, key) => {
    if (item.type === "more") {
      return (
        <a
          key={key}
          className="instagram-more"
          href="https://instagram.com/chassiforte/reels"
          target="_blank"
          rel="noopener noreferrer"
        >
          Veja mais
        </a>
      );
    }

    const post = item.post;
    return (
      <a
        key={key}
        className="instagram-reel"
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={post.aria}
      >
        <img src={post.image} alt={post.label} loading="lazy" decoding="async" draggable="false" />
        <div className="instagram-reel-shade" />
        <span className="instagram-reel-play" aria-hidden="true">
          <IconPlay />
        </span>
        <span className="instagram-reel-meta">
          <span>{post.label}</span>
        </span>
      </a>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="section instagram"
      id="instagram"
      aria-labelledby="instagram-title"
    >
      <div className="container instagram-layout">
        <a className="instagram-intro" href="https://instagram.com/chassiforte" target="_blank" rel="noopener noreferrer">
          <span className="instagram-icon" aria-hidden="true">
            <IconInstagram size={28} />
          </span>
          <p className="instagram-kicker">Siga-nos no</p>
          <h2 id="instagram-title" className="instagram-title">
            Instagram
          </h2>
          <span className="instagram-handle">@chassiforte</span>
        </a>

        <div className="instagram-stage">
          <div
            className={`instagram-viewport${dragging ? " is-dragging" : ""}${layout.mode === "peek" ? " is-peek" : ""}`}
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onClickCapture={onClickCapture}
          >
            <div
              className="instagram-track"
              style={{
                transform: trackTransform,
                transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {slides.map((group, groupIndex) => (
                <div className="instagram-slide" key={`slide-${groupIndex}`}>
                  {group.map((item, itemIndex) =>
                    renderItem(item, item.type === "more" ? `more-${groupIndex}` : `${item.post.code}-${groupIndex}-${itemIndex}`),
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="instagram-dots" role="tablist" aria-label="Grupos do Instagram">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === page}
                className={`instagram-dot${index === page ? " is-active" : ""}`}
                aria-label={`Ver grupo ${index + 1}`}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
