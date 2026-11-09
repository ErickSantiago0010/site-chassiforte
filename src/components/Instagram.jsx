import { useEffect, useMemo, useRef, useState } from "react";
import { INSTAGRAM_POSTS } from "../data/site";
import { useNearViewport } from "../hooks/useInViewOnce";
import { IconArrow, IconInstagram, IconPlay } from "./Icons";

function getPerPage() {
  if (typeof window === "undefined") return 3;
  if (window.matchMedia("(max-width: 640px)").matches) return 1;
  if (window.matchMedia("(max-width: 980px)").matches) return 2;
  return 3;
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
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    moved: false,
  });

  const slides = useMemo(() => {
    const items = [
      ...INSTAGRAM_POSTS.map((post) => ({ type: "post", post })),
      { type: "more" },
    ];
    return chunkItems(items, perPage);
  }, [perPage]);

  const pageCount = slides.length;

  useEffect(() => {
    const sync = () => {
      const next = getPerPage();
      setPerPage(next);
      setPage(0);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (!near || dragging || pageCount <= 1) return undefined;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pageCount);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [pageCount, dragging, near]);

  useEffect(() => {
    const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const delta = event.clientX - drag.startX;
      if (Math.abs(delta) > 6) drag.moved = true;
      setDragX(delta);
    };

    const onUp = (event) => {
      const drag = dragRef.current;
      if (!drag.active || event.pointerId !== drag.pointerId) return;

      const width = viewportRef.current?.clientWidth || 1;
      const delta = event.clientX - drag.startX;
      const threshold = Math.max(48, width * 0.16);

      drag.active = false;
      drag.pointerId = null;
      setDragging(false);
      setDragX(0);

      if (Math.abs(delta) > threshold) {
        setPage((current) => {
          if (delta < 0) return (current + 1) % pageCount;
          return (current - 1 + pageCount) % pageCount;
        });
      }

      window.setTimeout(() => {
        drag.moved = false;
      }, 60);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [pageCount]);

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      moved: false,
    };
    setDragging(true);
    setDragX(0);
  };

  const onClickCapture = (event) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
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
            className={`instagram-viewport${dragging ? " is-dragging" : ""}`}
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onClickCapture={onClickCapture}
          >
            <div
              className="instagram-track"
              style={{
                transform: `translate3d(calc(${-page * 100}% + ${dragX}px), 0, 0)`,
                transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {slides.map((group, groupIndex) => (
                <div className="instagram-slide" key={`slide-${groupIndex}`}>
                  {group.map((item, itemIndex) => {
                    if (item.type === "more") {
                      return (
                        <a
                          key={`more-${groupIndex}-${itemIndex}`}
                          className="instagram-more"
                          href="https://instagram.com/chassiforte/reels"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="instagram-more-icon" aria-hidden="true">
                            <IconArrow />
                          </span>
                          <strong>Ver mais</strong>
                        </a>
                      );
                    }

                    const post = item.post;
                    return (
                      <a
                        key={`${post.code}-${groupIndex}`}
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
                  })}
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
