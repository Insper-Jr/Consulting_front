import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";
import { useInView } from "@/hooks/useInView";

const RED        = "#C02121";
const DARK       = "#1a1a18";
const MUTED      = "#7a746e";
const BG         = "#0e0404";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const COURSES = [
  "Administração",
  "Economia",
  "Direito",
  "Ciência da Computação",
  "Engenharia da Computação",
  "Engenharia Mecânica",
  "Engenharia Mecatrônica",
  "Engenharia de Produção",
];

const STATS = [
  { value: "60",    label: "Membros ativos" },
  { value: "7",     label: "Cursos diferentes" },
  { value: "200h+", label: "de capacitação" },
  { value: "4",     label: "Fases no processo seletivo" },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
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
  display: flex;
  flex-direction: column;
  gap: 72px;
`;

const Top = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.9s ${SPRING} 0.1s forwards;`}

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
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
  color: #FAF2EA;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
`;

const Divider = styled.div`
  width: 48px;
  height: 3px;
  background: ${RED};
`;

const Body = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: rgba(250,242,234,0.6);
  line-height: 1.6;
  margin: 0;
  max-width: 480px;
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const CourseItem = styled.div<{ $delay: number; $visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(250,242,234,0.06);
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.55s ${SPRING} ${p.$delay}s forwards;`}
  &:first-child { border-top: 1px solid rgba(250,242,234,0.06); }
`;

const CourseDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${RED};
  flex-shrink: 0;
`;

const CourseName = styled.span`
  font-family: ${FONT_BODY};
  font-size: 15px;
  color: rgba(250,242,234,0.75);
`;

const StatsGrid = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(192,33,33,0.15);
  border: 1px solid rgba(192,33,33,0.15);
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.2s forwards;`}

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBox = styled.div`
  background: #0e0404;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatValue = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 36px;
  font-weight: 700;
  color: #FAF2EA;
  letter-spacing: -0.03em;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: rgba(250,242,234,0.4);
  line-height: 1.4;
`;

const StatAccent = styled.div`
  width: 20px;
  height: 2px;
  background: ${RED};
  margin-bottom: 4px;
`;

export default function AboutTeam() {
  const wrapperRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const { ref: topRef,   visible: topVisible   } = useInView();
  const { ref: statsRef, visible: statsVisible } = useInView();
  const { ref: listRef,  visible: listVisible  } = useInView();

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
        <Top ref={topRef} $visible={topVisible}>
          <TitleBlock>
            <Eyebrow>Nosso Time</Eyebrow>
            <Title>Um time multidisciplinar, formado para entregar</Title>
            <Divider />
            <Body>
              Nossos membros passam por um processo seletivo rigoroso em quatro fases e mais de 200 horas de capacitação antes do primeiro projeto.
              Os treinamentos são conduzidos em parceria com empresas como BCG, Bain & Company, McKinsey, Accenture e Stone.
            </Body>
          </TitleBlock>

          <CourseList ref={listRef}>
            {COURSES.map((c, i) => (
              <CourseItem key={c} $delay={0.2 + i * 0.08} $visible={listVisible}>
                <CourseDot />
                <CourseName>{c}</CourseName>
              </CourseItem>
            ))}
          </CourseList>
        </Top>

        <StatsGrid ref={statsRef} $visible={statsVisible}>
          {STATS.map(s => (
            <StatBox key={s.label}>
              <StatAccent />
              <StatValue>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </StatBox>
          ))}
        </StatsGrid>
      </Inner>
    </Section>
  );
}