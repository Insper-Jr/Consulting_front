import React, { useRef, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "../../../hooks/useInView";
import { useParticles } from "../../../hooks/useParticleBackground";

/* ─── Tokens ─────────────────────────────────────────── */
const RED        = "#C02121";
const BG_DARK    = "#0e0404";
const CREAM      = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

/* ─── Animations ─────────────────────────────────────── */
const fadeUp  = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;

/* ─── Layout — padding reduzido ─────────────────────── */
const Section = styled.section`
  position: relative; background: ${BG_DARK}; color: ${CREAM};
  padding: 56px 0; overflow: hidden; isolation: isolate;
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

const Glow = styled.div<{ $on: boolean; $x: number; $y: number }>`
  position: absolute; width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(192,33,33,.12) 0%, transparent 65%);
  pointer-events: none; z-index: 1; mix-blend-mode: screen;
  transform: translate(-50%,-50%);
  left: ${p => p.$x}px; top: ${p => p.$y}px;
  opacity: ${p => p.$on ? 1 : 0}; transition: opacity .35s ease;
`;

const Inner = styled.div`
  position: relative; z-index: 2;
  max-width: 1240px; margin: 0 auto; padding: 0 56px;
  @media (max-width: 960px) { padding: 0 28px; }
`;

const Header = styled.div<{ $v: boolean }>`
  display: flex; flex-direction: column; gap: 20px;
  max-width: 680px; margin-bottom: 32px;
  opacity: ${p => p.$v ? 1 : 0};
  animation: ${p => p.$v ? fadeUp : "none"} .5s .05s ${SPRING} both;
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: ${RED};
`;

const H2 = styled.h2`
  font-family: ${FONT_TITLE}; font-size: 32px; font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.1; color: ${CREAM}; margin: 0;
  i { font-style: italic; font-weight: 400; }
  @media (max-width: 960px) { font-size: 28px; }
`;

const HDivider = styled.div<{ $v: boolean }>`
  width: 48px; height: 3px; background: ${RED}; transform-origin: left;
  transform: ${p => p.$v ? "scaleX(1)" : "scaleX(0)"};
  animation: ${p => p.$v ? lineGrow : "none"} .5s .4s ${SPRING} both;
`;

const Lead = styled.p`
  font-family: ${FONT_BODY}; font-size: 16px; line-height: 1.65;
  color: rgba(250,242,234,.45); margin: 0; max-width: 520px;
`;

/* ─── Rows ───────────────────────────────────────────── */
const Rows = styled.div`
  border-top: 1px solid rgba(255,255,255,.08);
`;

const Row = styled.div<{ $v: boolean; $d: string }>`
  display: grid; grid-template-columns: 36px 1fr 2fr; gap: 36px;
  align-items: center; padding: 24px 0;
  border-bottom: 1px solid rgba(255,255,255,.08);
  transition: background .2s;
  opacity: ${p => p.$v ? 1 : 0};
  animation: ${p => p.$v ? fadeUp : "none"} .5s ${p => p.$d} ${SPRING} both;
  &:hover { background: rgba(192,33,33,.04); }

  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 8px; }
`;

const IconWrap = styled.div`
  color: ${RED}; display: flex; align-items: center; justify-content: center;
  svg { width: 28px; height: 28px; stroke-width: 1.4; }
`;

const RowTitle = styled.h3`
  font-family: ${FONT_TITLE}; font-size: 20px; font-weight: 700;
  letter-spacing: -0.01em; color: ${CREAM}; margin: 0;
`;

const RowText = styled.p`
  font-family: ${FONT_BODY}; font-size: 15px; line-height: 1.65;
  color: rgba(250,242,234,.5); margin: 0;
`;

/* ─── Data ───────────────────────────────────────────── */
const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v6M8 11h6" opacity=".4"/>
      </svg>
    ),
    title: "Visibilidade total da operação",
    body:  "Entenda exatamente como cada etapa do seu processo funciona, quanto tempo leva e onde a performance se perde — com dados coletados diretamente na sua operação.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7" opacity=".5"/>
        <circle cx="9" cy="11" r="1.4" fill="currentColor"/>
        <circle cx="13" cy="15" r="1.4" fill="currentColor"/>
      </svg>
    ),
    title: "Gargalos identificados com precisão",
    body:  "Com um modelo computacional da sua operação, os pontos de estrangulamento deixam de ser suposições e passam a ser evidências mensuráveis e rastreáveis.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V9M10 21V4M16 21V13M22 21V7"/>
        <path d="M3 21h20" opacity=".5"/>
      </svg>
    ),
    title: "Decisão embasada em cenários",
    body:  "Simulamos múltiplas alternativas de melhoria antes de qualquer mudança real, entregando a você a melhor opção com respaldo técnico e quantitativo.",
  },
];

/* ─── Component ───────────────────────────────────────── */
export default function ProcessosOutcome() {
  const wrap = useRef<HTMLElement>(null);
  const cv   = useRef<HTMLCanvasElement>(null);
  useParticles(wrap as React.RefObject<HTMLDivElement>, cv);

  const { ref: hRef, visible: hV } = useInView(0.1);
  const { ref: rRef, visible: rV } = useInView(0.1);

  const [g, setG]     = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setG({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <Section ref={wrap} onMouseMove={onMove}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      <canvas ref={cv} style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }} />
      <Blueprint />
      <Glow $on={hov} $x={g.x} $y={g.y} />

      <Inner>
        <Header ref={hRef} $v={hV}>
          <Eyebrow>O que você ganha</Eyebrow>
          <H2>Resultados <i>concretos</i>,<br/>não relatórios genéricos</H2>
          <HDivider $v={hV} />
          <Lead>Cada projeto entrega insights acionáveis, com evidências quantitativas que suportam as decisões da sua gestão.</Lead>
        </Header>

        <Rows ref={rRef}>
          {ITEMS.map((it, i) => (
            <Row key={it.title} $v={rV} $d={`${0.05 + i * 0.08}s`}>
              <IconWrap>{it.icon}</IconWrap>
              <RowTitle>{it.title}</RowTitle>
              <RowText>{it.body}</RowText>
            </Row>
          ))}
        </Rows>
      </Inner>
    </Section>
  );
}