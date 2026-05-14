import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "@/hooks/useInView";
import FeiraFoto1 from "../../../assets/feira/imagem1.png";
import FeiraFoto2 from "../../../assets/feira/imagem2.png";
import FeiraFoto3 from "../../../assets/feira/imagem3.png";

/* ─── Tokens (mesmos da CulturaSection) ──────────────── */
const RED      = "#C02121";
const RED_DEEP = "#7d1414";
const DARK     = "#1a1a18";
const MUTED    = "#7a746e";
const BG       = "#FAF2EA";
const CREAM    = "#FAF2EA";
const BORDER   = "rgba(26,26,24,0.12)";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

/* ─── Data ───────────────────────────────────────────── */
const LEADERS = [
  { name: "Thiago Maffra",    role: "CEO · XP Inc." },
  { name: "Milton Maluhy",    role: "CEO · Itaú Unibanco" },
  { name: "Luiza H. Trajano", role: "Chairwoman · Magazine Luiza" },
  { name: "Marcelo Noronha",  role: "CEO · Bradesco" },
  { name: "R. Campos Neto",   role: "Presidente · Banco Central" },
];

const FAIR_STATS = [
  { value: "29",     label: "empresas presentes"   },
  { value: "1.700+", label: "alunos participantes" },
  { value: "R$525k", label: "movimentados"         },
];

type Foto = { id: string; src: string; alt: string };
const FEIRA_FOTOS: Foto[] = [
  { id: "f1", src: FeiraFoto1, alt: "Feira de Carreiras IJR – 1" },
  { id: "f2", src: FeiraFoto2, alt: "Feira de Carreiras IJR – 2" },
  { id: "f3", src: FeiraFoto3, alt: "Feira de Carreiras IJR – 3" },
];

/* ─── Animations ─────────────────────────────────────── */
const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const slideRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

/* ─── Layout ─────────────────────────────────────────── */
const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  & > * { min-width: 0; }
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const Left = styled.div<{ $visible: boolean }>`
  background: ${RED_DEEP};
  padding: 72px 56px 72px max(40px, calc((100vw - 1200px) / 2));
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
  overflow: hidden;
  min-width: 0;
  opacity: 0;
  ${p => p.$visible && css`animation: ${slideLeft} 1s ${SPRING} 0s forwards;`}
  @media (max-width: 980px) { padding-left: 24px; padding-right: 24px; }
`;

const Right = styled.div<{ $visible: boolean }>`
  background: ${BG};
  padding: 72px max(40px, calc((100vw - 1200px) / 2)) 72px 56px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-width: 0;
  opacity: 0;
  ${p => p.$visible && css`animation: ${slideRight} 1s ${SPRING} 0.15s forwards;`}
  @media (max-width: 980px) { padding-left: 24px; padding-right: 24px; }
`;

/* ─── LEFT: header ───────────────────────────────────── */
const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${CREAM};
  opacity: 0.6;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const TitleMain = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0;
  @media (max-width: 480px) { font-size: 26px; }
`;
const TitleMuted  = styled.span` opacity: 0.5; display: block; `;
const TitleItalic = styled.span` font-style: italic; font-weight: 400; display: block; `;

const TitleAccent = styled.div<{ $visible: boolean }>`
  width: ${p => (p.$visible ? "56px" : "0")};
  height: 3px;
  background: ${CREAM};
  transition: width 1s ${SPRING} 0.6s;
`;

const BodyText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${CREAM};
  line-height: 1.5;
  margin: 0;
  max-width: 440px;
  font-weight: 400;
  opacity: 0.88;
`;

/* ─── LEFT: menção sutil ao Top 10 ───────────────────── */
const RankInline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px 8px 10px;
  border: 1px solid rgba(250,242,234,0.22);
  border-radius: 2px;
  width: fit-content;
  margin-top: 4px;
`;
const RankTag = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: 0.04em;
  em { font-style: italic; color: ${CREAM}; }
`;
const RankText = styled.span`
  font-family: ${FONT_BODY};
  font-size: 12px;
  color: ${CREAM};
  opacity: 0.75;
  letter-spacing: 0.01em;
  span { opacity: 0.65; }
`;

/* ─── LEFT: marquee de líderes ───────────────────────── */
const LeadersBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: -56px;
  margin-right: -56px;
  @media (max-width: 980px) { margin-left: -24px; margin-right: -24px; }
`;
const LeadersLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${CREAM};
  opacity: 0.55;
  padding: 0 56px;
  @media (max-width: 980px) { padding: 0 24px; }
`;
const MarqueeWrapper = styled.div`
  overflow: hidden;
  border-top: 1px solid rgba(250,242,234,0.18);
  border-bottom: 1px solid rgba(250,242,234,0.18);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
`;
const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 32s linear infinite;
  &:hover { animation-play-state: paused; }
`;
const LeaderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 36px;
  flex-shrink: 0;
`;
const LeaderName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 14px;
  font-weight: 700;
  color: ${CREAM};
  white-space: nowrap;
`;
const LeaderRole = styled.span`
  font-family: ${FONT_BODY};
  font-size: 12px;
  color: ${CREAM};
  opacity: 0.6;
  white-space: nowrap;
`;
const LeaderSep = styled.span`
  width: 4px; height: 4px; border-radius: 50%;
  background: ${CREAM}; opacity: 0.35; flex-shrink: 0;
`;

/* ─── RIGHT: header ──────────────────────────────────── */
const RightEyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
`;
const RightTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
`;
const RightTitleMuted = styled.span` display: block; opacity: 0.4; `;
const RightAccent = styled.div`
  width: 56px; height: 3px; background: ${RED};
`;

/* ─── RIGHT: Feira (carrossel + stats) ───────────────── */
const FeiraWrap = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;
  align-items: stretch;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const FeiraInfo = styled.div`
  display: flex; flex-direction: column; gap: 16px;
`;
const FeiraEyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: ${MUTED};
`;
const FeiraTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 22px; font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.01em; margin: 0;
`;
const FeiraDesc = styled.p`
  font-family: ${FONT_BODY};
  font-size: 14px; color: ${MUTED};
  line-height: 1.6; margin: 0;
`;
const FeiraStats = styled.div`
  display: grid; grid-template-columns: 1fr;
  border-top: 1px solid ${BORDER};
  margin-top: 4px;
`;
const FeiraStat = styled.div`
  display: grid; grid-template-columns: auto 1fr;
  gap: 16px; align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid ${BORDER};
`;
const FeiraStatNum = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 22px; font-weight: 700; font-style: italic;
  color: ${RED}; letter-spacing: -0.02em;
  line-height: 1; min-width: 80px;
`;
const FeiraStatLabel = styled.span`
  font-family: ${FONT_BODY};
  font-size: 13px; color: ${MUTED};
`;

/* — Carrossel passante — */
const CarouselWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 280px;
`;
const CarouselViewport = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 240px;
  overflow: hidden;
  border-radius: 4px;
  background: #2a0a0a;
  box-shadow: 0 12px 32px -16px rgba(0,0,0,0.35);
`;
const CarouselTrack = styled.div<{ $idx: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute; inset: 0;
  transform: translateX(${p => -p.$idx * 100}%);
  transition: transform 0.9s ${SPRING};
`;
const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%; height: 100%;
  position: relative;
`;
const SlideImg = styled.img`
  width: 100%; height: 100%;
  object-fit: cover; display: block;
`;
const SlideOverlay = styled.div`
  position: absolute; inset: auto 0 0 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(10,4,4,0) 0%, rgba(10,4,4,0.55) 100%);
  pointer-events: none;
`;
const CarouselFooter = styled.div`
  display: flex; align-items: center;
  justify-content: space-between;
`;
const Dots = styled.div` display: flex; gap: 6px; `;
const Dot = styled.button<{ $active: boolean }>`
  all: unset; cursor: pointer;
  width: ${p => (p.$active ? "18px" : "6px")};
  height: 6px; border-radius: 3px;
  background: ${p => (p.$active ? RED : "rgba(26,26,24,0.2)")};
  transition: all 0.4s ${SPRING};
`;
const ArrowGroup = styled.div` display: flex; gap: 6px; `;
const NavArrow = styled.button`
  all: unset; cursor: pointer;
  width: 30px; height: 30px;
  border: 1px solid ${BORDER};
  border-radius: 50%;
  display: grid; place-items: center;
  color: ${DARK};
  transition: background 0.3s ${SPRING}, border-color 0.3s ${SPRING};
  &:hover { background: rgba(26,26,24,0.04); border-color: rgba(26,26,24,0.3); }
`;

/* ══════════════════════════════════════════════════════ */
export default function AboutCredibility() {
  const { ref: sectionRef, visible } = useInView();
  const [idx, setIdx] = useState(0);
  const total = FEIRA_FOTOS.length;

  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(next, 4500);
    return () => window.clearInterval(id);
  }, [visible, next]);

  const loopItems = [...LEADERS, ...LEADERS];

  return (
    <Section ref={sectionRef}>
      {/* LEFT */}
      <Left $visible={visible}>
        <Eyebrow>Posicionamento &amp; Rede</Eyebrow>

        <TitleBlock>
          <TitleMain>
            <TitleMuted>O que nos posiciona</TitleMuted>
            <TitleItalic>no mercado</TitleItalic>
          </TitleMain>
          <TitleAccent $visible={visible} />
          <BodyText>
            Nosso ecossistema vai além dos projetos. Conectamos o Insper a alguns
            dos maiores líderes do Brasil e geramos impacto institucional real.
          </BodyText>
        </TitleBlock>

        <RankInline>
          <RankTag><em>Top 10</em></RankTag>
          <RankText>entre as melhores do Brasil · <span>ranking nacional 2025</span></RankText>
        </RankInline>

        <LeadersBlock>
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
      </Left>

      {/* RIGHT */}
      <Right $visible={visible}>
        <RightEyebrow>Credibilidade em números</RightEyebrow>
        <RightTitle>
          <RightTitleMuted>Impacto que se</RightTitleMuted>
          traduz em presença
        </RightTitle>
        <RightAccent />

        <FeiraWrap>
          <FeiraInfo>
            <FeiraEyebrow>Evento próprio</FeiraEyebrow>
            <FeiraTitle>Feira de Carreiras</FeiraTitle>
            <FeiraDesc>
              Evento anual organizado pela IJR que conecta o ecossistema Insper
              ao mercado de trabalho.
            </FeiraDesc>
            <FeiraStats>
              {FAIR_STATS.map(s => (
                <FeiraStat key={s.label}>
                  <FeiraStatNum>{s.value}</FeiraStatNum>
                  <FeiraStatLabel>{s.label}</FeiraStatLabel>
                </FeiraStat>
              ))}
            </FeiraStats>
          </FeiraInfo>

          <CarouselWrap>
            <CarouselViewport>
              <CarouselTrack $idx={idx}>
                {FEIRA_FOTOS.map(f => (
                  <Slide key={f.id}>
                    <SlideImg src={f.src} alt={f.alt} />
                    <SlideOverlay />
                  </Slide>
                ))}
              </CarouselTrack>
            </CarouselViewport>

            <CarouselFooter>
              <Dots>
                {FEIRA_FOTOS.map((f, i) => (
                  <Dot key={f.id} $active={i === idx}
                    onClick={() => setIdx(i)}
                    aria-label={`Foto ${i + 1}`} />
                ))}
              </Dots>
              <ArrowGroup>
                <NavArrow onClick={prev} aria-label="Foto anterior">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </NavArrow>
                <NavArrow onClick={next} aria-label="Próxima foto">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </NavArrow>
              </ArrowGroup>
            </CarouselFooter>
          </CarouselWrap>
        </FeiraWrap>
      </Right>
    </Section>
  );
}
