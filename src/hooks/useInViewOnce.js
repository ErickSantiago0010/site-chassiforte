import { useEffect, useRef, useState } from "react";

/** True while the element intersects the viewport (toggles on/off). */
export function useNearViewport(rootMargin = "120px 0px") {
  const ref = useRef(null);
  const [near, setNear] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, near];
}
