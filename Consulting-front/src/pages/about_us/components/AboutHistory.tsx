import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";
import { useInView } from "@/hooks/useInView";

const RED        = "#C02121";
const DARK       = "#1a1a18";
const CREAM      = "#FAF2EA";
const BG         = "#0e0404";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const MILESTONES = [
  { year: "2001", short: "Fundação",       text: "Criação da Ibmec Jr por Tarso Tietê, com o propósito de desenvolver alunos por meio de experiências práticas antes do estágio obrigatório." },
  { year: "2008", short: "Nomes mudam, valores permanecem",     text: "Com a mudança para Insper, torna-se Insper Júnior Consulting, preservando seus valores, cultura e compromisso com o desenvolvimento dos membros." },
  { year: "2024", short: "Expansão Multidisciplinar",        text: "Estrutura-se como a EJ mais multidisciplinar do Insper, integrando frentes de Business, Tech e Direito e ampliando sua capacidade de atuação." },
  { year: "2025", short: "Marco Histórico de Crescimento", text: "Ultrapassa R$ 1 milhão em faturamento, impulsionada por iniciativas estratégicas e consolidando sua posição como referência em consultoria estudantil." },
  { year: "Hoje", short: "+550 projetos",  text: "Mais de 550 projetos entregues para empresas como Ambev, Hospital Albert Einstein, Carrefour, Prefeitura de SP e dezenas de startups em todo o Brasil.", highlight: true },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(192,33,33,0.5); }
  50%      { box-shadow: 0 0 0 10px rgba(192,33,33,0); }
`;

const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 100px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
`;

const Header = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 64px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.9s ${SPRING} 0.1s forwards;`}
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
`;

const Title = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;

  i { font-style: italic; font-weight: 400; color: ${RED}; }
`;

const Divider = styled.div<{ $visible: boolean }>`
  width: 0;
  height: 3px;
  background: ${RED};
  transition: width 0.9s ${SPRING} 0.5s;
  ${p => p.$visible && css`width: 48px;`}
`;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TrackLine = styled.div<{ $visible: boolean }>`
  position: absolute;
  left: 88px;
  top: 12px;
  bottom: 12px;
  width: 1px;
  background: linear-gradient(to bottom, ${RED} 0%, ${RED} 30%, rgba(192,33,33,0.15) 100%);
  transform-origin: top center;
  transform: scaleY(0);
  ${p => p.$visible && css`animation: ${lineGrow} 1.2s ${SPRING} 0.4s forwards;`}
`;

const Item = styled.div<{ $visible: boolean; $delay: number }>`
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 40px;
  align-items: flex-start;
  padding: 0 0 32px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.7s ${SPRING} ${p.$delay}s forwards;`}
  &:last-child { padding-bottom: 0; }
`;

const YearCol = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 24px;
`;

const Year = styled.span<{ $highlight?: boolean }>`
  font-family: ${FONT_TITLE};
  font-size: ${p => p.$highlight ? "22px" : "18px"};
  font-weight: 700;
  color: ${p => p.$highlight ? CREAM : RED};
  letter-spacing: -0.01em;
  line-height: 1;
`;

const Dot = styled.div<{ $highlight?: boolean }>`
  position: absolute;
  right: -5px;
  top: 6px;
  width: ${p => p.$highlight ? "12px" : "9px"};
  height: ${p => p.$highlight ? "12px" : "9px"};
  border-radius: 50%;
  background: ${RED};
  border: 2px solid ${BG};
  ${p => p.$highlight && css`animation: ${pulse} 2.4s ease-out infinite;`}
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 0;
`;

const ShortLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${RED};
`;

const Text = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: rgba(250,242,234,0.85);
  line-height: 1.6;
  margin: 0;
  max-width: 580px;
`;

export default function AboutHistory() {
  const wrapperRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const { ref: headerRef, visible: headerVisible } = useInView();
  const { ref: sectionRef, visible: sectionVisible } = useInView();

  useParticles(wrapperRef as React.RefObject<HTMLDivElement>, canvasRef);

  return (
    <Section ref={wrapperRef}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <Inner style={{ position: "relative", zIndex: 1 }}>
        <Header ref={headerRef} $visible={headerVisible}>
          <Eyebrow>Nossa trajetória</Eyebrow>
          <Title>25 anos formando <i>consultores</i></Title>
          <Divider $visible={headerVisible} />
        </Header>

        <Timeline ref={sectionRef}>
          <TrackLine $visible={sectionVisible} />
          {MILESTONES.map((m, i) => (
            <Item key={m.year} $visible={sectionVisible} $delay={0.3 + i * 0.12}>
              <YearCol>
                <Year $highlight={m.highlight}>{m.year}</Year>
                <Dot $highlight={m.highlight} />
              </YearCol>
              <TextBlock>
                <ShortLabel>{m.short}</ShortLabel>
                <Text>{m.text}</Text>
              </TextBlock>
            </Item>
          ))}
        </Timeline>
      </Inner>
    </Section>
  );
}