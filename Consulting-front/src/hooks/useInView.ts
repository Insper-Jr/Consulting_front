import { useEffect, useRef, useState } from "react";

/**
 * Dispara uma vez quando o elemento entra na viewport e nunca reverte.
 * Usa disconnect() imediato para liberar o observer após o primeiro trigger.
 */
export function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}