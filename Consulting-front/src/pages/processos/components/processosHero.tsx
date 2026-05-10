import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";

/* ── Tokens ── */
const RED        = "#C02121";
const RED_DIM    = "rgba(105,18,18,0.45)";
const BG         = "#0e0404";
const CREAM      = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

/* ── Animations ── */
const fadeIn   = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp   = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const wordIn   = keyframes`from{opacity:0;transform:translateY(28px);filter:blur(6px)}to{opacity:1;transform:translateY(0);filter:blur(0)}`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;
const pulse    = keyframes`0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}`;
const spin     = keyframes`to{transform:rotate(360deg)}`;
const bounce   = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}`;

/* ── Layout ──
   Única diferença vs doc16: styled.div (não section) e ref<HTMLDivElement>
   para o useParticles funcionar sem cast. height:100vh = mesmo tamanho do AboutHero. */
const Outer = styled.div`
  position: relative; width: 100%; height: 100vh;
  background: ${BG}; overflow: hidden;
  display: flex; align-items: stretch; isolation: isolate;
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
  position: relative; z-index: 2; width: 100%;
  display: flex; align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 56px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 960px) { grid-template-columns: 1fr; padding: 0 28px; gap: 0; }
`;

/* ── Left ── */
const Left = styled.div`
  padding: 88px 0 48px 0;
  display: flex; flex-direction: column; justify-content: center;
  @media (max-width: 960px) { padding: 100px 0 48px; }
`;

const Eyebrow = styled.span<{ $v: boolean }>`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: ${RED};
  margin-bottom: 28px; opacity: 0;
  animation: ${p => p.$v ? fadeIn : "none"} .6s .15s ${SPRING} forwards;
`;

const Title = styled.h1`
  font-family: ${FONT_TITLE}; font-size: 48px; font-weight: 700;
  line-height: 1.05; letter-spacing: -0.03em; color: ${CREAM}; margin: 0 0 28px;
  @media (max-width: 960px) { font-size: 42px; }
`;

const Word = styled.span<{ $d: number; $v: boolean }>`
  display: inline-block; margin-right: .22em; opacity: 0;
  animation: ${p => p.$v ? wordIn : "none"} .85s ${p => p.$d}s ${SPRING} forwards;
`;

const Accent = styled.em`font-style: italic; font-weight: 400; color: ${RED};`;

const Divider = styled.div<{ $v: boolean }>`
  width: 48px; height: 3px; background: ${RED};
  transform-origin: left; margin-bottom: 28px; transform: scaleX(0);
  animation: ${p => p.$v ? lineGrow : "none"} .7s 1.4s ${SPRING} forwards;
`;

const Sub = styled.p<{ $v: boolean }>`
  font-family: ${FONT_BODY}; font-size: 16px; line-height: 1.65;
  color: rgba(250,242,234,.6); max-width: 480px; margin: 0 0 40px; opacity: 0;
  animation: ${p => p.$v ? fadeUp : "none"} .75s 1.55s ${SPRING} forwards;
`;

const Actions = styled.div<{ $v: boolean }>`
  display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
  margin-bottom: 32px; opacity: 0;
  animation: ${p => p.$v ? fadeUp : "none"} .7s 1.7s ${SPRING} forwards;
`;

const BtnPrimary = styled.a`
  display: inline-flex; align-items: center; gap: 10px;
  background: ${RED}; color: #fff; font-family: ${FONT_BODY};
  font-size: 15px; font-weight: 700; padding: 15px 30px;
  border-radius: 3px; text-decoration: none; transition: .2s;
  &:hover { background: #a01b1b; transform: translateY(-1px); }
`;

const BtnGhost = styled.a`
  display: inline-flex; align-items: center; gap: 6px;
  font-family: ${FONT_BODY}; font-size: 14px; color: rgba(250,242,234,.5);
  text-decoration: none; border-bottom: 1px solid transparent; padding-bottom: 2px; transition: .2s;
  &:hover { color: rgba(250,242,234,.9); border-color: rgba(250,242,234,.4); }
`;

const Ribbon = styled.div<{ $v: boolean }>`
  display: flex; align-items: center; gap: 18px;
  padding-top: 24px; border-top: 1px solid rgba(255,255,255,.08);
  max-width: 480px; opacity: 0;
  animation: ${p => p.$v ? fadeUp : "none"} .7s 1.85s ${SPRING} forwards;
`;

const RibbonDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%; background: ${RED};
  box-shadow: 0 0 12px ${RED}; animation: ${pulse} 2.4s ease-in-out infinite;
`;

const RibbonName = styled.span`
  font-family: ${FONT_TITLE}; font-size: 14px; font-weight: 600;
  color: rgba(250,242,234,.85); letter-spacing: -0.005em;
  em { color: ${RED}; font-style: normal; font-weight: 700; }
`;

const RibbonMeta = styled.span`
  font-family: ${FONT_BODY}; font-size: 12px; color: rgba(250,242,234,.4); margin-left: auto;
  @media (max-width: 480px) { display: none; }
`;

/* ── Right ── */
const Right = styled.div`
  padding: 88px 0 48px 0;
  display: flex; align-items: center; justify-content: center; position: relative;
  @media (max-width: 960px) { padding: 0 0 64px; }
`;

const Flow = styled.div<{ $v: boolean }>`
  width: 100%; max-width: 520px; aspect-ratio: 1/1;
  opacity: 0; transition: opacity .8s ${SPRING} 1.5s;
  ${p => p.$v && `opacity: 1;`}

  svg { width: 100%; height: 100%; overflow: visible; }

  /* Anéis giratórios — centrados no centróide do triângulo (260, 213) */
  .ring {
    fill: none; stroke: rgba(192,33,33,.32); stroke-width: 1.5;
    stroke-dasharray: 3 5;
    transform-box: fill-box;
    transform-origin: center;
    animation: ${spin} 60s linear infinite;
  }
  .ring2 {
    stroke: rgba(192,33,33,.18);
    transform-box: fill-box;
    transform-origin: center;
    animation: ${spin} 90s linear infinite reverse;
  }


  /* Todas as arestas vermelhas — a bolinha percorre o circuito inteiro */
  .edge {
    fill: none; stroke: rgba(192,33,33,.5); stroke-width: 1.2; stroke-dasharray: 4 6;
  }

  .pulse { fill: ${RED}; filter: drop-shadow(0 0 8px ${RED}); }

  .node circle {
    fill: rgba(14,4,4,.8); stroke: rgba(250,242,234,.55);
    stroke-width: 1.4; transition: .3s;
  }
  .node.active circle {
    stroke: ${RED}; stroke-width: 2;
    filter: drop-shadow(0 0 14px rgba(192,33,33,.55));
  }
  .node text {
    font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 600;
    fill: rgba(250,242,234,.78); letter-spacing: .05em; text-anchor: middle;
  }
  .node.active text { fill: ${CREAM}; }
`;

/* ── Scroll hint ── */
const ScrollHint = styled.div`
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: ${fadeIn} 0.6s ${SPRING} 2.1s forwards;
`;
const ScrollDot = styled.div`
  width: 5px; height: 5px; border-radius: 50%; background: ${RED};
  animation: ${bounce} 1.8s ease-in-out 2.5s infinite;
`;
const ScrollLine = styled.div`
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, ${RED_DIM}, transparent);
`;

/* ── Icons ── */
const ArrowR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ChevD = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const W = ["Simulação", "&"];
const D = [0.55, 0.78];

/* ── Component ── */
export default function ProcessosHero() {
  /* ref<HTMLDivElement> sem cast — única diferença vs doc16, necessária para useParticles */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  const [g, setG]     = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return;
    setG({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <Outer ref={wrapperRef} onMouseMove={onMove}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

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
          <Eyebrow $v={v}>Frente de Engenharia</Eyebrow>

          <Title>
            {W.map((w, i) => <Word key={w} $d={D[i]} $v={v}>{w}</Word>)}
            <br />
            <Word $d={1.02} $v={v}><Accent>Otimização</Accent></Word>
            <br />
            <Word $d={1.22} $v={v}>de Processos</Word>
          </Title>

          <Divider $v={v} />

          <Sub $v={v}>
            Mapeamos sua operação, coletamos dados com precisão e construímos
            um modelo computacional completo para identificar gargalos e
            recomendar as melhorias de maior impacto.
          </Sub>

          <Actions $v={v}>
            <BtnPrimary href="#contato">Solicitar Diagnóstico <ArrowR /></BtnPrimary>
            <BtnGhost href="#escopos">Nossos escopos <ChevD /></BtnGhost>
          </Actions>

          <Ribbon $v={v}>
            <RibbonDot />
            <RibbonName>Any<em>Logic</em></RibbonName>
            <RibbonMeta>Software de simulação computacional</RibbonMeta>
          </Ribbon>
        </Left>

        <Right>
          <Flow $v={v}>
            <svg viewBox="0 0 520 520">
              <defs>
                <marker id="ah" viewBox="0 0 10 10" refX="6" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="rgba(192,33,33,.7)" />
                </marker>
              </defs>

              {/*
                Triângulo equilátero, circunraio=120, centrado em (260,240).
                Bordo externo dos nós: 120+54=174. Anel interno r=192 (fora dos nós).
                Anel externo r=238 (cabe no viewBox 520x520).
                MA(156,180) SI(364,180) OT(260,360)
              */}
              <circle className="ring"  cx="260" cy="240" r="192" />
              <circle className="ring ring2" cx="260" cy="240" r="238" />


              {/* Arestas vermelhas */}
              <path className="edge" d="M156,180 L364,180" markerEnd="url(#ah)" />
              <path className="edge" d="M364,180 Q410,275 260,360" markerEnd="url(#ah)" />
              <path className="edge" d="M260,360 Q110,275 156,180" markerEnd="url(#ah)" />

              {/* Bolinha — circuito completo 10s */}
              <circle className="pulse" r="3.5">
                <animateMotion dur="10s" repeatCount="indefinite"
                  path="M156,180 L364,180 Q410,275 260,360 Q110,275 156,180" />
              </circle>

              {/* Só SIMULAÇÃO aceso */}
              <g className="node" transform="translate(156,180)">
                <circle r="54" /><text y="4">MAPEAMENTO</text>
              </g>
              <g className="node active" transform="translate(364,180)">
                <circle r="54" /><text y="4">SIMULAÇÃO</text>
              </g>
              <g className="node" transform="translate(260,360)">
                <circle r="54" /><text y="4">OTIMIZAÇÃO</text>
              </g>
            </svg>
          </Flow>
        </Right>
        </Inner>
      </Grid>

      <ScrollHint>
        <ScrollDot />
        <ScrollLine />
      </ScrollHint>

      {/* Wave para a seção seguinte */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, lineHeight: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,72 L0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 Z"
            fill={CREAM} />
        </svg>
      </div>
    </Outer>
  );
}