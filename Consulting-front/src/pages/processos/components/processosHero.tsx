import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useParticles } from "../../../hooks/useParticleBackground";
import ProcessImg from "../../../assets/hero/process6.webp"; // ← ajuste o path se necessário

/* ── Tokens ── */
import { RED, RED_DIM, BG_DARK as BG, CREAM, FONT_TITLE, FONT_BODY, SPRING } from "../../../styles/tokens";

/* ── Animations ── */
const fadeIn   = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp   = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const wordIn   = keyframes`from{opacity:0;transform:translateY(28px);filter:blur(6px)}to{opacity:1;transform:translateY(0);filter:blur(0)}`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;
const bounce   = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}`;

/* ── Layout ── */
const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  isolation: isolate;
`;

/* Foto de fundo */
const PhotoBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url(${ProcessImg}) center center / cover no-repeat;
`;

/* Gradiente esquerda → direita para legibilidade do texto */
const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(14, 4, 4, 0.97) 0%,
    rgba(14, 4, 4, 0.85) 35%,
    rgba(14, 4, 4, 0.45) 65%,
    rgba(14, 4, 4, 0.15) 100%
  );
`;

/* Gradiente vertical sutil para escurecer topo e rodapé */
const Vignette = styled.div`
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(14,4,4,0.35) 0%,
    transparent 20%,
    transparent 75%,
    rgba(14,4,4,0.75) 100%
  );
`;

const Blueprint = styled.div`
  position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: .25;
  background-image:
    linear-gradient(rgba(192,33,33,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,33,33,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
`;

const Grid = styled.div`
  position: relative; z-index: 4; width: 100%;
  display: flex; align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 56px;
  @media (max-width: 960px) { padding: 0 28px; }
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 960px) { grid-template-columns: 1fr; padding: 0 28px; gap: 0; }
  @media (max-width: 480px) { padding: 0 20px; }
`;

/* ── Left ── */
const Left = styled.div`
  padding: 88px 0 48px 0;
  max-width: 620px;
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
  @media (max-width: 480px) { font-size: 32px; margin: 0 0 20px; }
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
  @media (max-width: 480px) { width: 100%; justify-content: center; padding: 16px 24px; }
`;

const BtnGhost = styled.a`
  display: inline-flex; align-items: center; gap: 6px;
  font-family: ${FONT_BODY}; font-size: 14px; color: rgba(250,242,234,.5);
  text-decoration: none; border-bottom: 1px solid transparent; padding-bottom: 2px; transition: .2s;
  &:hover { color: rgba(250,242,234,.9); border-color: rgba(250,242,234,.4); }
`;

/* ── Right ── */
const Right = styled.div`
  padding: 88px 0 48px 0;
  display: flex; align-items: center; justify-content: center; position: relative;
  @media (max-width: 960px) { padding: 0 0 64px; }
  @media (max-width: 480px) { display: none; }
`;

const Flow = styled.div<{ $v: boolean }>`
  width: 100%; max-width: 520px; aspect-ratio: 1/1;
  opacity: 0; transition: opacity .8s ${SPRING} 1.5s;
  ${p => p.$v && `opacity: 1;`}

  svg { width: 100%; height: 100%; overflow: visible; }

  .edge {
    fill: none; stroke: rgba(192,33,33,.5); stroke-width: 1.2; stroke-dasharray: 4 6;
  }
  .pulse { fill: ${RED}; filter: drop-shadow(0 0 8px ${RED}); }
  .node circle {
    fill: rgba(14,4,4,.8); stroke: rgba(250,242,234,.4);
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
  .step-num {
    font-family: ${FONT_TITLE}; font-size: 10px; font-weight: 700;
    fill: rgba(192,33,33,.5); letter-spacing: .12em; text-anchor: middle;
  }
  .connector {
    stroke: rgba(192,33,33,.2); stroke-width: 1; stroke-dasharray: 2 3;
  }
`;

/* ── Scroll hint ── */
const ScrollHint = styled.div`
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  z-index: 4; display: flex; flex-direction: column; align-items: center; gap: 8px;
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

const D = [0.55, 0.78];

/* ── Component ── */
export default function ProcessosHero() {
  const { t } = useTranslation();
  const W = [t("processos.hero.titleWord1"), t("processos.hero.titleWord2")];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);


  return (
    <Outer ref={wrapperRef}>

      {/* ── Background layers ── */}
      <PhotoBg />
      <GradientOverlay />
      <Vignette />
      <Blueprint />

      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 3,
      }} />

      <Grid>
        <Inner>
          <Left>
            <Eyebrow $v={v}>{t("processos.hero.eyebrow")}</Eyebrow>

            <Title>
              {W.map((w, i) => <Word key={w} $d={D[i]} $v={v}>{w}</Word>)}
              <br />
              <Word $d={1.02} $v={v}><Accent>{t("processos.hero.titleAccent")}</Accent></Word>
              <br />
              <Word $d={1.22} $v={v}>{t("processos.hero.titleSuffix")}</Word>
            </Title>

            <Divider $v={v} />

            <Sub $v={v}>
              {t("processos.hero.sub")}
            </Sub>

            <Actions $v={v}>
              <BtnPrimary href="/contact">{t("processos.hero.ctaPrimary")} <ArrowR /></BtnPrimary>
              <BtnGhost href="#escopos">{t("processos.hero.ctaGhost")} <ChevD /></BtnGhost>
            </Actions>
          </Left>
        </Inner>
      </Grid>

      <ScrollHint>
        <ScrollDot />
        <ScrollLine />
      </ScrollHint>

      {/* Wave para a seção seguinte */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, lineHeight: 0, zIndex: 5 }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,72 L0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 Z"
            fill={CREAM} />
        </svg>
      </div>
    </Outer>
  );
}