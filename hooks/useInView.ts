"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the returned ref's element has scrolled into the viewport
 * (once). Used to defer mounting heavy components (charts, large modals)
 * until they're actually about to be seen, instead of on initial page load.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    if (typeof IntersectionObserver === "undefined") {
      // Fallback: environments without IntersectionObserver just render.
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, rootMargin]);

  return { ref, isInView };
}
