import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const COLORS = {
  redCTA: "#C02121",
  black:  "#0e0404",
};
const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;

type NetOpts = {
  count?: number;
  dotColor?: string;
  lineColor?: (c: number) => string;
  maxDist?: number;
  repel?: number;
  deadZone?: (W: number, H: number) => { x: number; y: number; w: number; h: number };
};

function useParticleNetwork(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapperRef: React.RefObject<HTMLElement | null>,
  opts: NetOpts = {}
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

const redbarGrow = keyframes`to { transform: scaleX(1); }`;

const RedBarWrap = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;
`;

const RedBar = styled.div`
  height: 2px;
  width: 100%;
  background: rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #A10F23 0%, ${COLORS.redCTA} 50%, #A10F23 100%);
    transform-origin: left center;
    transform: scaleX(0);
    animation: ${redbarGrow} 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }
`;

const Integration = styled.section`
  margin-top: 4rem;
  background: ${COLORS.black};
  color: #fff;
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;

const SynergyCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const CursorGlow = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(192,33,33,0.156) 0%, transparent 65%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
  left: 50%;
  top: 50%;
  will-change: left, top, opacity;
`;

const IntegrationInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const Kicker = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: ${COLORS.redCTA};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const IntegrationTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 38px;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: #fff;
  font-weight: 700;
  span { color: ${COLORS.redCTA}; }

  @media (max-width: 800px) { font-size: 28px; }
`;

const IntegrationLede = styled.p`
  font-family: ${FONT_BODY};
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255,255,255,0.78);
  max-width: 820px;
  margin: 0 auto 2.5rem;
`;

export default function BusinessIntegration() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useParticleNetwork(canvasRef, sectionRef, {
    count: 60,
    dotColor: "rgba(230,90,90,0.38)",
    lineColor: (c: number) => `rgba(230,90,90,${0.15 * c})`,
    maxDist: 110,
    repel: 90,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

  useEffect(() => {
    const sec = sectionRef.current;
    const glow = glowRef.current;
    if (!sec || !glow) return;
    let raf = 0;
    const onEnter = () => { glow.style.opacity = "1"; };
    const onLeave = () => { glow.style.opacity = "0"; };
    const onMove = (e: MouseEvent) => {
      const rect = sec.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      });
    };
    sec.addEventListener("mouseenter", onEnter);
    sec.addEventListener("mouseleave", onLeave);
    sec.addEventListener("mousemove", onMove);
    return () => {
      sec.removeEventListener("mouseenter", onEnter);
      sec.removeEventListener("mouseleave", onLeave);
      sec.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <RedBarWrap><RedBar /></RedBarWrap>
      <Integration ref={sectionRef}>
        <SynergyCanvas ref={canvasRef} />
        <CursorGlow ref={glowRef} />
        <IntegrationInner>
          <Kicker>{t("business.integration.kicker")}</Kicker>
          <IntegrationTitle>
            {t("business.integration.titleMain")} <span>{t("business.integration.titleAccent")}</span>
          </IntegrationTitle>
          <IntegrationLede>{t("business.integration.lede")}</IntegrationLede>
        </IntegrationInner>
      </Integration>
    </>
  );
}
