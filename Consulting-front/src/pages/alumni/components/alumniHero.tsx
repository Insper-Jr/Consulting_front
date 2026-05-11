import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";
import {
  RED, RED_DIM, BG_DARK, CREAM,
  FONT_TITLE, FONT_BODY, SPRING,
  TYPE, SPACING,
} from "../../processos/components/tokens";

// ── Animations ────────────────────────────────────────────────────────────

const fadeIn   = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp   = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const wordIn   = keyframes`from{opacity:0;transform:translateY(28px);filter:blur(6px)}to{opacity:1;transform:translateY(0);filter:blur(0)}`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;
const bounce   = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}`;

// ── Word splits ───────────────────────────────────────────────────────────

const WORDS   = ["A Insper Jr", "foi o começo."];
const DELAYS  = [0.55, 0.78];

// ── Component ─────────────────────────────────────────────────────────────

export default function AlumniHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  const [g,   setG]   = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return;
    setG({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <Outer
      ref={wrapperRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }} />

      <Blueprint />

      {/* Cursor glow */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,33,33,0.12) 0%, transparent 65%)",
        left: g.x, top: g.y, transform: "translate(-50%,-50%)",
        opacity: hov ? 1 : 0, transition: "opacity .35s ease",
        pointerEvents: "none", zIndex: 1, mixBlendMode: "screen",
      }} />

      <Vignette />

      <Grid>
        <Inner>
          <Left>
            <Eyebrow $v={v}>Ex-membros</Eyebrow>

            <Title>
              {WORDS.map((w, i) => (
                <Word key={w} $d={DELAYS[i]} $v={v}>{w}</Word>
              ))}
              <br />
              <Word $d={1.02} $v={v}><Accent>Veja onde chegaram.</Accent></Word>
            </Title>

            <Divider $v={v} />

            <Sub $v={v}>
              Nossa maior conquista são as trajetórias que ajudamos a construir.
              Conheça os profissionais que passaram pela Insper Jr e seguiram
              transformando o mercado.
            </Sub>
          </Left>
        </Inner>
      </Grid>

      <ScrollHint>
        <ScrollDot />
        <ScrollLine />
      </ScrollHint>
    </Outer>
  );
}

// ── Styled Components ─────────────────────────────────────────────────────

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${BG_DARK};
  overflow: hidden;
  display: flex;
  align-items: stretch;
  isolation: isolate;
`;

const Vignette = styled.div`
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 35%, rgba(14,4,4,0.92) 100%);
`;

const Blueprint = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .35;
  background-image:
    linear-gradient(rgba(192,33,33,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,33,33,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
`;

const Grid = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 ${SPACING.innerPaddingX};
  display: flex;
  align-items: center;

  @media (max-width: 960px) { padding: 0 28px; }
`;

const Left = styled.div`
  padding: 88px 0 48px;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 960px) { padding: 100px 0 48px; }
`;

const Eyebrow = styled.span<{ $v: boolean }>`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
  margin-bottom: 28px;
  opacity: 0;
  animation: ${({ $v }) => $v ? fadeIn : "none"} .6s .15s ${SPRING} forwards;
`;

const Title = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.hero.size};
  font-weight: ${TYPE.hero.weight};
  line-height: ${TYPE.hero.lh};
  letter-spacing: ${TYPE.hero.ls};
  color: ${CREAM};
  margin: 0 0 28px;

  @media (max-width: 960px) { font-size: 38px; }
`;

const Word = styled.span<{ $d: number; $v: boolean }>`
  display: inline-block;
  margin-right: .22em;
  opacity: 0;
  animation: ${({ $v }) => $v ? wordIn : "none"} .85s ${({ $d }) => $d}s ${SPRING} forwards;
`;

const Accent = styled.em`
  font-style: italic;
  font-weight: 400;
  color: ${RED};
`;

const Divider = styled.div<{ $v: boolean }>`
  width: ${SPACING.dividerWidth};
  height: ${SPACING.dividerHeight};
  background: ${RED};
  transform-origin: left;
  margin-bottom: 28px;
  transform: scaleX(0);
  animation: ${({ $v }) => $v ? lineGrow : "none"} .7s 1.4s ${SPRING} forwards;
`;

const Sub = styled.p<{ $v: boolean }>`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.body.size};
  line-height: 1.65;
  color: rgba(250, 242, 234, 0.6);
  max-width: 480px;
  margin: 0;
  opacity: 0;
  animation: ${({ $v }) => $v ? fadeUp : "none"} .75s 1.55s ${SPRING} forwards;
`;

// ── Scroll hint ───────────────────────────────────────────────────────────

const ScrollHint = styled.div`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: ${fadeIn} 0.6s ${SPRING} 2.1s forwards;
`;

const ScrollDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${RED};
  animation: ${bounce} 1.8s ease-in-out 2.5s infinite;
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, ${RED_DIM}, transparent);
`;