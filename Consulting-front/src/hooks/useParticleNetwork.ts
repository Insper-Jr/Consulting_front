import React, { useEffect } from "react";

/**
 * Rede de partículas em canvas (pontos ligados por linhas, repelidos pelo cursor).
 * Mesmo efeito usado nas faixas de "Sinergia" das páginas de Tech e Direito.
 */
export type ParticleNetworkOpts = {
  count?: number;
  dotColor?: string;
  lineColor?: (c: number) => string;
  glowEl?: HTMLElement | null;
  maxDist?: number;
  repel?: number;
  deadZone?: (W: number, H: number) => { x: number; y: number; w: number; h: number };
};

export function useParticleNetwork(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapperRef: React.RefObject<HTMLElement | null>,
  opts: ParticleNetworkOpts = {}
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapperRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const mouse = { x: -9999, y: -9999 };
    const o = {
      count: 80,
      dotColor: "rgba(192,33,33,0.55)",
      lineColor: (c: number) => `rgba(192,33,33,${0.18 * c})`,
      maxDist: 140,
      repel: 100,
      ...opts,
    };

    let W = 0, H = 0;
    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    const makeP = (): Particle => {
      let x = 0, y = 0, tries = 0;
      do {
        x = Math.random() * W;
        y = Math.random() * H;
        tries++;
        if (!o.deadZone) break;
        const dz = o.deadZone(W, H);
        if (x < dz.x || x > dz.x + dz.w || y < dz.y || y > dz.y + dz.h) break;
      } while (tries < 12);
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      };
    };

    const init = () => {
      resize();
      particles = Array.from({ length: o.count }, makeP);
    };

    const update = (p: Particle) => {
      p.vx += (Math.random() - 0.5) * 0.06;
      p.vy += (Math.random() - 0.5) * 0.06;
      const sp = Math.hypot(p.vx, p.vy), max = 0.8;
      if (sp > max) { p.vx = (p.vx / sp) * max; p.vy = (p.vy / sp) * max; }
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < o.repel && d > 0) {
        const f = ((o.repel - d) / o.repel) * 1.2;
        p.vx += (dx / d) * f * 0.3;
        p.vy += (dy / d) * f * 0.3;
      }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    };

    let raf = 0;
    let running = true;
    const draw = () => {
      if (!running) return;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        update(particles[i]);
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = o.dotColor;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < o.maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = o.lineColor(1 - d / o.maxDist);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (o.glowEl) {
        o.glowEl.style.left = `${mouse.x}px`;
        o.glowEl.style.top = `${mouse.y}px`;
      }
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    init();
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, wrapperRef, opts]);
}
