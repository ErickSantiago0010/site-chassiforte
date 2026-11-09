import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useActiveSection(sectionIds = []) {
  const location = useLocation();
  const [active, setActive] = useState("");
  const sectionsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = sectionsKey ? sectionsKey.split("|") : [];

    if (location.pathname !== "/") {
      setActive("");
      return undefined;
    }

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) {
      setActive("");
      return undefined;
    }

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.32;
      let current = elements[0].id;

      for (const el of elements) {
        if (el.offsetTop <= marker) current = el.id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        current = elements[elements.length - 1].id;
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname, sectionsKey]);

  return active;
}
