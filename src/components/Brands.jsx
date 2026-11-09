import { useState } from "react";
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
        onError={() => setFailed(true)}
      />
      <em>{brand.name}</em>
    </span>
  );
}

function BrandRow({ brands, direction }) {
  return (
    <div className="brands-row">
      <div className={`brands-track brands-track-${direction}`}>
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
