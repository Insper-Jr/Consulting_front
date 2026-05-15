import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";

const RED        = "#C02121";
const RED_DIM    = "rgba(105,18,18,0.45)";
const BG         = "#0e0404";
const CREAM      = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const fadeIn   = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp   = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const wordIn   = keyframes`from{opacity:0;transform:translateY(28px);filter:blur(6px)}to{opacity:1;transform:translateY(0);filter:blur(0)}`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;
const bounce   = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}`;
const dotFade  = keyframes`from{opacity:0}to{opacity:1}`;
const areaIn   = keyframes`from{opacity:0}to{opacity:1}`;
const chipIn   = keyframes`from{opacity:0}to{opacity:1}`;

/* ── Layout ── */

const Outer = styled.div`
  position: relative; width: 100%; height: 100vh; height: 100dvh;
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
  @media (max-width: 480px) { padding: 0 20px; }
`;

/* ── Left ── */

const Left = styled.div`
  padding: 88px 0 48px;
  display: flex; flex-direction: column; justify-content: center;
  @media (max-width: 960px) { padding: 100px 0 48px; }
`;

const Eyebrow = styled.span<{ $v: boolean }>`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: ${RED};
  margin-bottom: 28px; opacity: 0;
  ${p => p.$v && css`animation: ${fadeIn} .6s .15s ${SPRING} forwards;`}
`;

const Title = styled.h1`
  font-family: ${FONT_TITLE}; font-size: 48px; font-weight: 700;
  line-height: 1.05; letter-spacing: -0.03em; color: ${CREAM}; margin: 0 0 28px;
  @media (max-width: 960px) { font-size: 42px; }
  @media (max-width: 480px) { font-size: 32px; margin: 0 0 20px; }
`;

const Word = styled.span<{ $d: number; $v: boolean }>`
  display: inline-block; margin-right: .22em; opacity: 0;
  ${p => p.$v && css`animation: ${wordIn} .85s ${p.$d}s ${SPRING} forwards;`}
`;

const Accent = styled.em`font-style: italic; font-weight: 400; color: ${RED};`;

const Divider = styled.div<{ $v: boolean }>`
  width: 48px; height: 3px; background: ${RED};
  transform-origin: left; margin-bottom: 28px; transform: scaleX(0);
  ${p => p.$v && css`animation: ${lineGrow} .7s 1.4s ${SPRING} forwards;`}
`;

const Sub = styled.p<{ $v: boolean }>`
  font-family: ${FONT_BODY}; font-size: 16px; line-height: 1.65;
  color: rgba(250,242,234,.6); max-width: 480px; margin: 0 0 40px; opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} .75s 1.55s ${SPRING} forwards;`}
`;

const Actions = styled.div<{ $v: boolean }>`
  display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
  margin-bottom: 32px; opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} .7s 1.7s ${SPRING} forwards;`}
`;

const BtnPrimary = styled.a`
  display: inline-flex; align-items: center; gap: 10px;
  background: ${RED}; color: #fff; font-family: ${FONT_BODY};
  font-size: 15px; font-weight: 700; padding: 15px 30px;
  border-radius: 3px; text-decoration: none; transition: .2s;
  cursor: pointer;
  &:hover { background: #a01b1b; transform: translateY(-1px); }
  @media (max-width: 480px) { width: 100%; justify-content: center; padding: 16px 24px; }
`;

const BtnGhost = styled.a`
  display: inline-flex; align-items: center; gap: 6px;
  font-family: ${FONT_BODY}; font-size: 14px; color: rgba(250,242,234,.5);
  text-decoration: none; border-bottom: 1px solid transparent; padding-bottom: 2px; transition: .2s;
  cursor: pointer;
  &:hover { color: rgba(250,242,234,.9); border-color: rgba(250,242,234,.4); }
`;

/* ── Right (chart) ── */

const Right = styled.div`
  padding: 88px 0 48px;
  display: flex; align-items: center; justify-content: center; position: relative;
  @media (max-width: 960px) { padding: 0 0 64px; }
  @media (max-width: 480px) { display: none; }
`;

const LINE_PATH = "M60,300 C90,288 150,255 190,240 C230,225 270,185 310,170 C355,155 400,105 430,95";
const AREA_PATH = `${LINE_PATH} L430,325 L60,325 Z`;

const ChartWrap = styled.div<{ $v: boolean }>`
  width: 100%; max-width: 500px;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeIn} 0.6s ${SPRING} 1.4s forwards;`}

  svg { width: 100%; height: 100%; overflow: visible; }

  .grid-h {
    stroke: rgba(192,33,33,0.1);
    stroke-width: 0.8;
  }

  .area-fill {
    opacity: 0;
    ${p => p.$v && css`animation: ${areaIn} 0.8s ease-out 1.9s forwards;`}
  }

  .main-line {
    fill: none;
    stroke: ${RED};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 560;
    stroke-dashoffset: ${p => p.$v ? "0" : "560"};
    transition: stroke-dashoffset 1.6s ease-out ${p => p.$v ? "1.6s" : "0s"};
  }

  .proj-line {
    fill: none;
    stroke: rgba(192,33,33,0.35);
    stroke-width: 1.5;
    stroke-dasharray: 4 5;
    opacity: 0;
    ${p => p.$v && css`animation: ${fadeIn} 0.5s ease-out 3.2s forwards;`}
  }

  .dot {
    fill: ${RED};
    opacity: 0;
  }
  .dot-1 { ${p => p.$v && css`animation: ${dotFade} 0.35s ease-out 2.1s forwards;`} }
  .dot-2 { ${p => p.$v && css`animation: ${dotFade} 0.35s ease-out 2.4s forwards;`} }
  .dot-3 { ${p => p.$v && css`animation: ${dotFade} 0.35s ease-out 2.7s forwards;`} }
  .dot-4 {
    filter: drop-shadow(0 0 8px ${RED});
    ${p => p.$v && css`animation: ${dotFade} 0.35s ease-out 3.0s forwards;`}
  }

  .x-label {
    font-family: ${FONT_TITLE};
    font-size: 10px;
    fill: rgba(250,242,234,0.3);
    text-anchor: middle;
    letter-spacing: 0.08em;
  }

  .chip {
    opacity: 0;
  }
  .chip-1 { ${p => p.$v && css`animation: ${chipIn} 0.5s ease-out 3.1s forwards;`} }
  .chip-2 { ${p => p.$v && css`animation: ${chipIn} 0.5s ease-out 3.3s forwards;`} }
  .chip-3 { ${p => p.$v && css`animation: ${chipIn} 0.5s ease-out 3.5s forwards;`} }

  .chip-rect {
    fill: rgba(192,33,33,0.15);
    stroke: rgba(192,33,33,0.38);
    stroke-width: 1;
  }

  .chip-text {
    font-family: ${FONT_TITLE};
    font-size: 10px;
    font-weight: 600;
    fill: rgba(250,242,234,0.88);
    letter-spacing: 0.04em;
  }
`;

/* ── Scroll hint ── */

const ScrollHint = styled.div`
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: ${fadeIn} 0.6s ${SPRING} 2.2s forwards;
`;
const ScrollDot = styled.div`
  width: 5px; height: 5px; border-radius: 50%; background: ${RED};
  animation: ${bounce} 1.8s ease-in-out 2.5s infinite;
`;
const ScrollLine = styled.div`
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, ${RED_DIM}, transparent);
`;

const ArrowR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ChevD = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function BusinessHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef as React.RefObject<HTMLDivElement | null>, canvasRef as React.RefObject<HTMLCanvasElement | null>);

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

      {/* cursor glow */}
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
            <Eyebrow $v={v}>Frente de Business</Eyebrow>

            <Title>
              <Word $d={0.55} $v={v}>Estratégia</Word>
              <br />
              <Word $d={0.78} $v={v}>que</Word>
              <br />
              <Word $d={1.02} $v={v}><Accent>gera resultado</Accent></Word>
            </Title>

            <Divider $v={v} />

            <Sub $v={v}>
              Combinamos análise de mercado, planejamento financeiro e execução
              operacional para transformar a visão da sua empresa em crescimento real.
            </Sub>

            <Actions $v={v}>
              <BtnPrimary href="/contact">Solicitar Diagnóstico <ArrowR /></BtnPrimary>
              <BtnGhost href="#cases">Ver nossos cases <ChevD /></BtnGhost>
            </Actions>
          </Left>

          <Right>
            <ChartWrap $v={v}>
              <svg viewBox="0 0 520 390">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={RED} stopOpacity="0.28"/>
                    <stop offset="100%" stopColor={RED} stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {/* horizontal grid lines */}
                {[90, 145, 200, 255].map(y => (
                  <line key={y} className="grid-h" x1="50" y1={y} x2="460" y2={y} />
                ))}

                {/* area fill */}
                <path className="area-fill" d={AREA_PATH} fill="url(#areaGrad)" />

                {/* main line (animated via stroke-dashoffset transition) */}
                <path className="main-line" d={LINE_PATH} />

                {/* dashed projection */}
                <path className="proj-line" d="M430,95 L468,68" />

                {/* data point dots */}
                <circle className="dot dot-1" cx="60"  cy="300" r="4" />
                <circle className="dot dot-2" cx="190" cy="240" r="4" />
                <circle className="dot dot-3" cx="310" cy="170" r="4" />
                <circle className="dot dot-4" cx="430" cy="95"  r="6" />

                {/* pulse ring on last point (SMIL) */}
                <circle cx="430" cy="95" r="6" fill="none" stroke={RED} strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="r"       from="6"   to="22"  dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0"   dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* metric chips */}
                <g className="chip chip-1" transform="translate(95, 212)">
                  <rect className="chip-rect" x="0" y="0" width="96" height="22" rx="3" />
                  <text className="chip-text" x="8" y="15">Novo Segmento</text>
                </g>
                <g className="chip chip-2" transform="translate(228, 142)">
                  <rect className="chip-rect" x="0" y="0" width="84" height="22" rx="3" />
                  <text className="chip-text" x="8" y="15">+28% Receita</text>
                </g>
                <g className="chip chip-3" transform="translate(340, 62)">
                  <rect className="chip-rect" x="0" y="0" width="78" height="22" rx="3" />
                  <text className="chip-text" x="8" y="15">ROI Positivo</text>
                </g>

                {/* x-axis labels */}
                <text className="x-label" x="60"  y="350">Q1</text>
                <text className="x-label" x="190" y="350">Q2</text>
                <text className="x-label" x="310" y="350">Q3</text>
                <text className="x-label" x="430" y="350">Q4</text>
              </svg>
            </ChartWrap>
          </Right>
        </Inner>
      </Grid>

      <ScrollHint>
        <ScrollDot />
        <ScrollLine />
      </ScrollHint>

      {/* wave transition para a próxima seção */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, lineHeight: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,72 L0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 Z"
            fill="#ffffff" />
        </svg>
      </div>
    </Outer>
  );
}
