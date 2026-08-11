import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useParticles } from "../../../hooks/useParticleBackground";

import { BG_DARK, RED, RED_DARK, RED_DIM, CREAM, FONT_TITLE, FONT_BODY, SPRING, TYPE } from "../../../styles/tokens";

import { INSCRICAO_URL } from "../../../config/config";

// Tokens
const DARK_BG  = "#0e0404";   // quase preto quente
const RED = "#C02121";
const RED_DIM  = "rgba(105,18,18,0.45)";
const CREAM    = "#FAF2EA";
const MUTED    = "rgba(250,242,234,0.48)";
const FONT_TITLE = `'Montserrat',Helvetica,sans-serif`;
const FONT_BODY  = `'Inter',Helvetica,sans-serif`;
const SPRING   = "cubic-bezier(0.16,1,0.3,1)";

// Animations
const wordIn = keyframes`
  from { opacity:0; transform:translateY(28px); filter:blur(6px); }
  to   { opacity:1; transform:translateY(0);    filter:blur(0);   }
`;

const lineGrow = keyframes`
  from { transform:scaleX(0); }
  to   { transform:scaleX(1); }
`;

const subtitleIn = keyframes`
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0);    }
`;

const scrollBounce = keyframes`
  0%,100% { transform:translateY(0); }
  50%      { transform:translateY(6px); }
`;

const btnPulse = keyframes`
  0%, 100% { box-shadow: 0 8px 24px -10px rgba(192,33,33,0.7); }
  50%       { box-shadow: 0 12px 32px -8px rgba(192,33,33,0.9), 0 0 0 5px rgba(192,33,33,0.12); }
`;

// Wrappers
const HeroOuter = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: ${BG_DARK};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`;

const Center = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 220px 24px 0;
  text-align: center;

  @media (max-width: 640px) {
    gap: 20px;
    padding: 160px 20px 0;
  }
`;

// Eyebrow
const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
  opacity: 0;
  animation: ${subtitleIn} 0.6s ${SPRING} 0.2s forwards;
`;

// Main title — H1: Montserrat Bold 48px
const Title = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.hero.size};
  font-weight: ${TYPE.hero.weight};
  color: ${CREAM};
  letter-spacing: ${TYPE.hero.ls};
  line-height: ${TYPE.hero.lh};
  margin: 0;

  @media (max-width: 640px) { font-size: 36px; }
  @media (max-width: 380px) { font-size: 30px; }
`;

const Word = styled.span<{ $delay: number }>`
  display: inline-block;
  margin-right: 0.22em;
  opacity: 0;
  animation: ${wordIn} 0.85s ${SPRING} ${p => p.$delay}s forwards;

  &:last-child { margin-right: 0; }
`;

// Accent line
const AccentLine = styled.div`
  width: 64px;
  height: 3px;
  background: ${RED};
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${lineGrow} 0.7s ${SPRING} 1.4s forwards;
`;

// Subtitle — Body: Inter Regular 16px
const Subtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.body.size};
  font-weight: ${TYPE.body.weight};
  color: ${CREAM};
  line-height: ${TYPE.body.lh};
  max-width: 560px;
  margin: 0;
  opacity: 0;
  animation: ${subtitleIn} 0.75s ${SPRING} 1.55s forwards;
`;

// CTA Button
const HeroBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 36px;
  border-radius: 4px;
  background: ${RED};
  color: ${CREAM};
  font-family: ${FONT_BODY};
  font-weight: ${TYPE.cta.weight};
  font-size: ${TYPE.cta.size};
  text-decoration: none;
  line-height: 1;
  opacity: 0;
  animation: ${subtitleIn} 0.75s ${SPRING} 1.8s forwards, ${btnPulse} 3s ease-in-out 2.5s infinite;
  transition: background 0.2s, transform 0.2s;

  .arrow { transition: transform 0.25s; }

  &:hover {
    background: ${RED_DARK};
    transform: translateY(-1px);
    animation-play-state: paused;
  }
  &:hover .arrow { transform: translateX(4px); }

  @media (max-width: 640px) {
    padding: 16px 28px;
    font-size: 15px;
  }
`;

// Insper-only badge
const InsperBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(250,242,234,0.45);
  font-family: ${FONT_BODY};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.06em;
  opacity: 0;
  animation: ${subtitleIn} 0.75s ${SPRING} 2s forwards;

  svg { color: rgba(250,242,234,0.3); flex-shrink: 0; }

  @media (max-width: 640px) { font-size: 11px; }
`;

// Scroll hint
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
  animation: ${subtitleIn} 0.6s ${SPRING} 2.1s forwards;

  @media (max-width: 640px) { bottom: 24px; }
  @media (max-width: 380px) { display: none; }
`;

const ScrollDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${RED};
  animation: ${scrollBounce} 1.8s ease-in-out 2.5s infinite;
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, ${RED_DIM}, transparent);
`;

// Vignette
const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(14,4,4,0.85) 100%);
  pointer-events: none;
  z-index: 1;
`;

// Wave transition para a seção seguinte
const WaveBottom = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  z-index: 3;
  line-height: 0;
`;

// Component
// Delay escalonado para cada palavra
const WORD_DELAYS = [0.55, 0.78, 1.02];

export default function AboutHero() {
  const { t } = useTranslation();
  const titleWords = t("join.hero.titleWords", { returnObjects: true }) as string[];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  // glow que acompanha o cursor — mesmo do AboutTeamAndPartners
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // reutiliza o hook de partículas existente,
  // mas sobrescreve as cores via useEffect antes do hook rodar
  useParticles(wrapperRef, canvasRef);

  // configura as cores das partículas para a paleta dark da IJR
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // injeta data-attributes que o hook pode usar (opcional — depende da
    // implementação do seu useParticles; se ele não suportar, as partículas
    // ficarão com as cores padrão do hook, que já ficam bem num fundo escuro)
    canvas.dataset.particleColor  = "rgba(105,18,18,0.55)";
    canvas.dataset.particleColor2 = "rgba(250,242,234,0.12)";
  }, []);

  return (
    <HeroOuter
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow inline — acompanha cursor sem re-render do styled */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192,33,33,0.12) 0%, transparent 65%)",
          left: glowPos.x,
          top: glowPos.y,
          transform: "translate(-50%, -50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
          zIndex: 0,
          mixBlendMode: "screen",
        }}
      />

      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Vinheta escura nas bordas */}
      <Vignette />

      {/* Conteúdo centralizado */}
      <Center>
        <Eyebrow>{t("join.hero.eyebrow")}</Eyebrow>

        <Title>
          {titleWords.map((word, i) => (
            <Word key={word} $delay={WORD_DELAYS[i]}>
              {word}
            </Word>
          ))}
        </Title>

        <AccentLine />

        <Subtitle>
          {t("join.hero.subtitle")}
        </Subtitle>


        <HeroBtn href="#inscricao">
          {t("join.hero.button")} <span className="arrow">→</span>
        </HeroBtn>

        <InsperBadge>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {t("join.hero.insperBadge")}
        </InsperBadge>
      </Center>

      {/* Hint de scroll */}
      <ScrollHint>
        <ScrollDot />
        <ScrollLine />
      </ScrollHint>

      {/* Transição suave para a seção branca abaixo */}
      <WaveBottom>
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }}
        >
          <path
            d="M0,72 L0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 Z"
            fill="#FAF2EA"
          />
        </svg>
      </WaveBottom>
    </HeroOuter>
  );
}
