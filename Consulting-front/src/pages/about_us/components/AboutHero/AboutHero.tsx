import React, { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../../hooks/useParticleBackground";

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

// Wrappers
const HeroOuter = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${DARK_BG};
  display: flex;
  align-items: center;
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
  padding: 0 24px;
  text-align: center;
`;

// Eyebrow
const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
  opacity: 0;
  animation: ${subtitleIn} 0.6s ${SPRING} 0.2s forwards;
`;

// Main title — H1: Montserrat Bold 48px
const Title = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: 48px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
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
  font-size: 16px;
  font-weight: 400;
  color: ${CREAM};
  line-height: 1.5;
  max-width: 560px;
  margin: 0;
  opacity: 0;
  animation: ${subtitleIn} 0.75s ${SPRING} 1.55s forwards;
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
const TITLE_WORDS = ["A", "Insper", "Jr."];
// Delay escalonado para cada palavra
const WORD_DELAYS = [0.55, 0.78, 1.02];

export default function AboutHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

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
    <HeroOuter ref={wrapperRef}>
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
        <Eyebrow>Quem somos</Eyebrow>

        <Title>
          {TITLE_WORDS.map((word, i) => (
            <Word key={word} $delay={WORD_DELAYS[i]}>
              {word}
            </Word>
          ))}
        </Title>

        <AccentLine />

        <Subtitle>
          Empresa júnior do Insper, formada por estudantes que entregam
          soluções reais para negócios reais, com rigor acadêmico,
          comprometimento e impacto mensurável.
        </Subtitle>
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