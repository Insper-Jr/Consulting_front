import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useParticles } from "../../../hooks/useParticleBackground";
import {
  RED, RED_DIM, BG_DARK, CREAM,
  FONT_TITLE, FONT_BODY, SPRING,
  TYPE, SPACING,
} from "../../../styles/tokens";

// ── Animations ────────────────────────────────────────────────────────────

const wordIn = keyframes`
  from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
`;

const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
`;

// ── Word splits ───────────────────────────────────────────────────────────

const DELAYS = [0.55];

// ── Component ─────────────────────────────────────────────────────────────

export default function AlumniHero() {
  const { t } = useTranslation();
  const WORDS = [t("alumni.hero.titleWord")];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
      {/* Cursor glow */}
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,33,33,0.12) 0%, transparent 65%)",
        left: glowPos.x,
        top: glowPos.y,
        transform: "translate(-50%, -50%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
        pointerEvents: "none",
        zIndex: 0,
        mixBlendMode: "screen",
      }} />

      {/* Partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      <Vignette />

      {/* Conteúdo centralizado */}
      <Center>
        <Eyebrow>{t("alumni.hero.eyebrow")}</Eyebrow>

        <Title>
          {WORDS.map((word, i) => (
            <Word key={word} $delay={DELAYS[i]}>{word}</Word>
          ))}
          {" "}
          <Word $delay={0.78}>{t("alumni.hero.titleConnector")}</Word>
          {" "}
          <Word $delay={1.02}>{t("alumni.hero.titleBrand")}</Word>
        </Title>

        <AccentLine />

        <Subtitle>
          {t("alumni.hero.subtitle")}
        </Subtitle>
      </Center>

      {/* Scroll hint */}
      <ScrollHint>
        <ScrollDot />
        <ScrollLine />
      </ScrollHint>
    </HeroOuter>
  );
}

// ── Styled Components ─────────────────────────────────────────────────────

const HeroOuter = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  height: 100dvh;
  background: ${BG_DARK};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(14,4,4,0.85) 100%);
  pointer-events: none;
  z-index: 1;
`;

const Center = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 0 24px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${SPACING.innerPaddingX};
  display: flex;
  align-items: center;

  @media (max-width: 960px) { padding: 0 28px; }
  @media (max-width: 480px) { padding: 0 20px; }
`;

const Left = styled.div`
  padding: 88px 0 48px;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 960px) { padding: 100px 0 48px; }
  @media (max-width: 480px) { padding: 90px 0 40px; }
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
  opacity: 0;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
`;

const Title = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.hero.size};
  font-weight: ${TYPE.hero.weight};
  line-height: ${TYPE.hero.lh};
  letter-spacing: ${TYPE.hero.ls};
  color: ${CREAM};
  margin: 0;

  @media (max-width: 960px) { font-size: 38px; }
  @media (max-width: 480px) { font-size: 32px; }
`;

const Word = styled.span<{ $delay: number }>`
  display: inline-block;
  margin-right: 0.22em;
  opacity: 0;
  animation: ${wordIn} 0.85s cubic-bezier(0.16,1,0.3,1) ${p => p.$delay}s forwards;

  &:last-child { margin-right: 0; }
`;

const AccentLine = styled.div`
  width: 64px;
  height: 3px;
  background: ${RED};
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${lineGrow} 0.7s cubic-bezier(0.16,1,0.3,1) 1.4s forwards;
`;

const Subtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.body.size};
  font-weight: 400;
  line-height: 1.65;
  color: ${CREAM};
  max-width: 560px;
  margin: 0;
  opacity: 0;
  animation: ${fadeIn} 0.75s cubic-bezier(0.16,1,0.3,1) 1.55s forwards;
`;

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
  animation: ${fadeIn} 0.6s cubic-bezier(0.16,1,0.3,1) 2.1s forwards;
  animation: ${fadeIn} 0.6s ${SPRING} 2.1s forwards;

  @media (max-width: 480px) { display: none; }
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