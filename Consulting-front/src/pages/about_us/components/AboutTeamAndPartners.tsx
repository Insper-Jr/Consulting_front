import React, { useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";
import { useInView } from "@/hooks/useInView";
import accenture   from "../../../assets/partners/accenture.png";
import ambev       from "../../../assets/partners/ambev.png";
import bain        from "../../../assets/partners/bain.png";
import bcg         from "../../../assets/partners/bcg.png";
import bloomberg   from "../../../assets/partners/bloomberg.png";
import ey          from "../../../assets/partners/ey.png";
import igc         from "../../../assets/partners/igc.png";
import integration from "../../../assets/partners/integration.png";
import juliusBaer  from "../../../assets/partners/julius-baer.svg";
import kearney     from "../../../assets/partners/kearney.png";
import lek         from "../../../assets/partners/lek.png";
import mckinsey    from "../../../assets/partners/mckinsey.png";
import parthenon   from "../../../assets/partners/parthenon.webp";
import peers       from "../../../assets/partners/peers.png";
import trading     from "../../../assets/partners/trading-com-dados.png";
import visagio     from "../../../assets/partners/visagio.png";
import xp          from "../../../assets/partners/xp.png";

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
  { value: "60",    label: "Membros ativos"           },
  { value: "7",     label: "Frentes de atuação"       },
  { value: "200h+", label: "de capacitação"           },
  { value: "4",     label: "Fases no processo seletivo"},
];

const PARTNERS = [
  { name: "PEERS",              logo: peers      },
  { name: "Kearney",            logo: kearney    },
  { name: "Accenture",          logo: accenture  },
  { name: "EY",                 logo: ey         },
  { name: "IGC",                logo: igc        },
  { name: "Bain & Company",     logo: bain       },
  { name: "McKinsey & Company", logo: mckinsey   },
  { name: "BCG",                logo: bcg        },
  { name: "XP Investimentos",   logo: xp         },
  { name: "Ambev",              logo: ambev      },
  { name: "LEK",                logo: lek        },
  { name: "Visagio",            logo: visagio    },
  { name: "Julius Bär",         logo: juliusBaer },
  { name: "Trading com Dados",  logo: trading    },
  { name: "Bloomberg",          logo: bloomberg  },
];

// ── Keyframes ─────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const drawBorder = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ── Section wrapper — único, sem gap entre team e partners ─────────────────
const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 100px 0 80px;
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
  position: relative;
  z-index: 1;
`;

// ── Team top row ───────────────────────────────────────────────────────────────
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
  gap: 28px;
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
`;

const SynergyTag = styled.span`
  display: block;
  text-align: center;
  background: rgba(192,33,33,0.15);
  border: 1px solid rgba(192,33,33,0.3);
  color: #e06060;
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 6px 8px;
  border-radius: 2px;
  margin-bottom: 4px;
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

// ── Stats grid com hover interativo ───────────────────────────────────────────
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
  cursor: default;
  transition: background 0.25s ease, border-color 0.25s ease;
  border: 1px solid rgba(192,33,33,0);

  &:hover {
    background: rgba(192,33,33,0.05);
    border-color: rgba(192,33,33,0.45);
  }
`;

const StatValue = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 36px;
  font-weight: 700;
  color: #FAF2EA;
  letter-spacing: -0.03em;
  line-height: 1;
  position: relative;
  z-index: 2;
`;

const StatLabel = styled.span`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: rgba(250,242,234,0.4);
  line-height: 1.4;
  position: relative;
  z-index: 2;
`;

const StatAccent = styled.div`
  width: 20px;
  height: 2px;
  background: ${RED};
  margin-bottom: 4px;
`;

// ── Partners ──────────────────────────────────────────────────────────────────
const PartnersDivider = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.1s forwards;`}
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(250,242,234,0.08);
`;

const Label = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(250,242,234,0.3);
  white-space: nowrap;
`;

const LogoGrid = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px 40px;
  flex-wrap: wrap;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.2s forwards;`}
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  flex: 1;
  min-width: 100px;
`;

const LogoImg = styled.img`
  height: 100%;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.25;
  transition: opacity 0.25s ease;

  &:hover { opacity: 0.7; }
`;

const LogoPlaceholder = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(250,242,234,0.2);
  text-transform: uppercase;
  transition: color 0.25s ease;

  &:hover { color: rgba(250,242,234,0.6); }
`;

// ── StatBox com tracking de mouse ─────────────────────────────────────────────
function StatCard({ stat }: { stat: typeof STATS[number] }) {
  return (
    <StatBox>
      <StatAccent />
      <StatValue>{stat.value}</StatValue>
      <StatLabel>{stat.label}</StatLabel>
    </StatBox>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutTeamAndPartners() {
  const wrapperRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const { ref: topRef,      visible: topVisible      } = useInView();
  const { ref: statsRef,    visible: statsVisible    } = useInView();
  const { ref: listRef,     visible: listVisible     } = useInView();
  const { ref: partnerRef,  visible: partnerVisible  } = useInView();
  const { ref: gridRef,     visible: gridVisible     } = useInView();

  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useParticles(wrapperRef as React.RefObject<HTMLDivElement>, canvasRef);

  return (
    <Section
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* glow inline — acompanha cursor sem re-render */}
      <div style={{
        position: "absolute",
        width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,33,33,0.12) 0%, transparent 65%)",
        left: glowPos.x,
        top: glowPos.y,
        transform: "translate(-50%, -50%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <Inner>

        {/* ── Team ── */}
        <Top ref={topRef} $visible={topVisible}>
          <TitleBlock>
            <Eyebrow>Nosso Time</Eyebrow>
            <Title>Um time multidisciplinar, formado para entregar</Title>
            <Divider />
            <Body>
              A Insper Jr. reúne 4 frentes de atuação que colaboram de
              forma integrada. Business, Direito e Engenharia (Tech e de Processos)
              atuam juntos no mesmo projeto, entregando soluções completas
              a partir de diferentes perspectivas.
            </Body>
            <Body>
              Nossos membros passam por quatro fases de seleção e mais de
              200 horas de capacitação antes do primeiro projeto, com
              treinamentos conduzidos em parceria com BCG, Bain, McKinsey,
              Accenture e Stone.
            </Body>
          </TitleBlock>

          <CourseList ref={listRef}>
            <SynergyTag>sinergia entre os 8 cursos de graduação no Insper</SynergyTag>
            {COURSES.map((c, i) => (
              <CourseItem key={c} $delay={0.2 + i * 0.08} $visible={listVisible}>
                <CourseDot />
                <CourseName>{c}</CourseName>
              </CourseItem>
            ))}
          </CourseList>
        </Top>

        {/* ── Stats ── */}
        <StatsGrid ref={statsRef} $visible={statsVisible}>
          {STATS.map(s => <StatCard key={s.label} stat={s} />)}
        </StatsGrid>

        {/* ── Partners — sem seção separada, apenas divider ── */}
        <PartnersDivider ref={partnerRef} $visible={partnerVisible}>
          <Line />
          <Label>Nossos parceiros</Label>
          <Line />
        </PartnersDivider>

        <LogoGrid ref={gridRef} $visible={gridVisible}>
          {PARTNERS.map(p => (
            <LogoItem key={p.name}>
              {p.logo
                ? <LogoImg src={p.logo} alt={p.name} />
                : <LogoPlaceholder>{p.name}</LogoPlaceholder>
              }
            </LogoItem>
          ))}
        </LogoGrid>

      </Inner>
    </Section>
  );
}