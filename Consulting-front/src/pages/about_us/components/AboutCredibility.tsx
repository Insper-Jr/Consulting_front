import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "../../../hooks/useInView";

/* ─── Tokens ─────────────────────────────────────────── */
const RED        = "#C02121";
const DARK       = "#1a1a18";
const DARK2      = "#0e0404";
const MUTED      = "#7a746e";
const BG         = "#FAF2EA";
const BORDER     = "rgba(26,26,24,0.08)";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const EASE       = "cubic-bezier(0.16,1,0.3,1)";

/* ─── Data ───────────────────────────────────────────── */
// Duplicamos a lista para o loop contínuo do marquee
const LEADERS = [
  { name: "Thiago Maffra",    role: "CEO · XP Inc."               },
  { name: "Milton Maluhy",    role: "CEO · Itaú Unibanco"         },
  { name: "Luiza H. Trajano", role: "Chairwoman · Magazine Luiza" },
  { name: "Marcelo Noronha",  role: "CEO · Bradesco"              },
  { name: "R. Campos Neto",   role: "Presidente · Banco Central"  },
];

const FAIR_STATS = [
  { value: "29",     label: "empresas presentes"   },
  { value: "1.700+", label: "alunos participantes" },
  { value: "R$525k", label: "movimentados"         },
];

/* ─── Animations ─────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

/* ─── Layout ─────────────────────────────────────────── */
const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 64px 0 72px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 768px) {
    padding: 0 24px;
    gap: 52px;
  }
`;

/* ─── Header ─────────────────────────────────────────── */
const Header = styled.div<{ $v: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 600px;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.9s ${EASE} 0.05s forwards;`}
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
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0;
`;

const Divider = styled.div`
  width: 40px;
  height: 3px;
  background: ${RED};
`;

const Subtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${MUTED};
  line-height: 1.65;
  margin: 0;
`;

/* ─── Leaders marquee ────────────────────────────────── */
const LeadersBlock = styled.div<{ $v: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: 0;
  /* sai do Inner para poder sangrar nas bordas */
  margin-left: -48px;
  margin-right: -48px;
  ${p => p.$v && css`animation: ${fadeUp} 0.8s ${EASE} 0.1s forwards;`}

  @media (max-width: 768px) {
    margin-left: -24px;
    margin-right: -24px;
  }
`;

const LeadersLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${MUTED};
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const MarqueeWrapper = styled.div`
  overflow: hidden;
  border-top: 1px solid ${BORDER};
  border-bottom: 1px solid ${BORDER};
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 28s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const LeaderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 22px 40px;
  flex-shrink: 0;
`;

const LeaderName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 15px;
  font-weight: 700;
  color: ${DARK};
  white-space: nowrap;
`;

const LeaderRole = styled.span`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${MUTED};
  white-space: nowrap;
`;

const LeaderSep = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${RED};
  flex-shrink: 0;
`;

/* ─── Bottom grid ────────────────────────────────────── */
const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const BlockLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${MUTED};
`;

/* ─── Feira block ────────────────────────────────────── */
const FairBlock = styled.div<{ $v: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 28px;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.8s ${EASE} 0.1s forwards;`}
`;

const FairTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  color: ${DARK};
  margin: 10px 0 0;
  letter-spacing: -0.01em;
`;

const FairDesc = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  color: ${MUTED};
  line-height: 1.6;
  margin: 6px 0 0;
`;

const FairStats = styled.div`
  display: flex;
  flex-direction: column;
`;

const FairStat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid ${BORDER};
  &:first-child { border-top: 1px solid ${BORDER}; }
`;

const FairStatValue = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 22px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.02em;
  min-width: 72px;
`;

const FairStatLabel = styled.span`
  font-family: ${FONT_BODY};
  font-size: 14px;
  color: ${MUTED};
`;

/* ─── Gradient cards (estilo IntroSection) ───────────── */
const CardsCol = styled.div<{ $v: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.8s ${EASE} 0.18s forwards;`}
`;

const GradCard = styled.div`
  background: linear-gradient(135deg, #230606 0%, #691212 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  transition: box-shadow 0.25s, transform 0.25s;

  &:hover {
    box-shadow: 0 8px 36px rgba(192,33,33,0.3);
    transform: translateY(-2px);
  }
`;

const CardLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(250,242,234,0.45);
`;

const CardValue = styled.div`
  font-family: ${FONT_TITLE};
  font-size: clamp(20px, 3.5vw, 11px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1;
`;

const CardBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(192,33,33,0.25);
  border: 1px solid rgba(192,33,33,0.35);
  border-radius: 4px;
  padding: 4px 10px;
  width: fit-content;
`;

const CardBadgeText = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  color: #ff8080;
  letter-spacing: 0.06em;
`;

const CardSub = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  line-height: 1.55;
  margin: 0;
`;



/* ─── NPS bar ────────────────────────────────────────── */
const npsGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const NPSScale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NPSBar = styled.div`
  height: 4px;
  background: rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
`;

const NPSFill = styled.div`
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 90%;
  background: ${RED};
  transform-origin: left;
  animation: ${npsGrow} 1.2s ${EASE} 0.5s both;
`;

const NPSScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NPSScaleLabel = styled.span<{ $bold?: boolean }>`
  font-family: ${FONT_BODY};
  font-size: 10px;
  color: ${p => p.$bold ? RED : "rgba(250,242,234,0.3)"};
  font-weight: ${p => p.$bold ? 700 : 400};
  letter-spacing: ${p => p.$bold ? "0.04em" : "0"};
`;

/* ══════════════════════════════════════════════════════ */
export default function AboutCredibility() {
  const { ref: headerRef,  visible: hV } = useInView();
  const { ref: leadersRef, visible: lV } = useInView();
  const { ref: bottomRef,  visible: bV } = useInView();

  // Duplica os líderes para o loop contínuo
  const loopItems = [...LEADERS, ...LEADERS];

  return (
    <Section>
      <Inner>

        {/* ── Header ── */}
        <Header ref={headerRef} $v={hV}>
          <Eyebrow>Credibilidade em números</Eyebrow>
          <Title>O que nos posiciona no mercado</Title>
          <Divider />
          <Subtitle>
            Nosso ecossistema vai além dos projetos. Conectamos o Insper a alguns dos maiores líderes do Brasil e geramos impacto institucional real.
          </Subtitle>
        </Header>

        {/* ── Líderes — marquee ── */}
        <LeadersBlock ref={leadersRef} $v={lV}>
          <LeadersLabel>Alguns dos líderes presentes em eventos da IJR</LeadersLabel>
          <MarqueeWrapper>
            <MarqueeTrack>
              {loopItems.map((e, i) => (
                <LeaderItem key={i}>
                  <LeaderName>{e.name}</LeaderName>
                  <LeaderRole>{e.role}</LeaderRole>
                  <LeaderSep />
                </LeaderItem>
              ))}
            </MarqueeTrack>
          </MarqueeWrapper>
        </LeadersBlock>

        {/* ── Bottom: feira | números ── */}
        <BottomGrid ref={bottomRef}>

          <FairBlock $v={bV}>
            <div>
              <BlockLabel>Evento próprio</BlockLabel>
              <FairTitle>Feira de Carreiras</FairTitle>
              <FairDesc>
                Evento anual organizado pela IJR que conecta o ecossistema Insper ao mercado de trabalho.
              </FairDesc>
            </div>
            <FairStats>
              {FAIR_STATS.map(s => (
                <FairStat key={s.label}>
                  <FairStatValue>{s.value}</FairStatValue>
                  <FairStatLabel>{s.label}</FairStatLabel>
                </FairStat>
              ))}
            </FairStats>
          </FairBlock>

          <CardsCol $v={bV}>

            <GradCard>
              <CardLabel>Faturamento 2025</CardLabel>
              <CardValue>R$ 1.071.065</CardValue>
              <CardBadge>
                <CardBadgeText>↑ +219% vs 2024</CardBadgeText>
              </CardBadge>
              <CardSub>Faturamento acumulado em 2025, ano de recorde histórico da Insper Jr.</CardSub>
            </GradCard>

            <GradCard>
              <CardLabel>Índice NPS · Satisfação dos clientes</CardLabel>
              <CardValue>+90</CardValue>
              <CardBadge>
                <CardBadgeText>★ Zona de excelência</CardBadgeText>
              </CardBadge>
              <NPSScale>
                <NPSBar><NPSFill /></NPSBar>
                <NPSScaleLabels>
                  <NPSScaleLabel>0</NPSScaleLabel>
                  <NPSScaleLabel>Bom · 50</NPSScaleLabel>
                  <NPSScaleLabel>Ótimo · 75</NPSScaleLabel>
                  <NPSScaleLabel $bold>+90 ★</NPSScaleLabel>
                </NPSScaleLabels>
              </NPSScale>
            </GradCard>

          </CardsCol>

        </BottomGrid>

      </Inner>
    </Section>
  );
}