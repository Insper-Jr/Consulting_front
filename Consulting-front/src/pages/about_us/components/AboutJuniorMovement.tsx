import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "@/hooks/useInView";

const RED      = "#C02121";
const RED_DEEP = "#7d1414";
const DARK     = "#1a1a18";
const MUTED    = "#7a746e";
const BG       = "#FAF2EA";
const CREAM    = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1fr;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div<{ $visible: boolean }>`
  background: ${RED_DEEP};
  padding: 80px max(56px, calc((100vw - 1200px) / 2)) 80px max(56px, calc((100vw - 1200px) / 2));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  min-height: 580px;
  opacity: 0;

  ${p => p.$visible && css`animation: ${slideLeft} 1s ${SPRING} 0s forwards;`}
`;

const Right = styled.div<{ $visible: boolean }>`
  background: ${BG};
  padding: 80px max(56px, calc((100vw - 1200px) / 2)) 80px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${slideRight} 1s ${SPRING} 0.15s forwards;`}
`;

const Eyebrow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EyebrowLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};

  span {
    color: ${DARK};
    opacity: 0.35;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TitleMain = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 32px;
`;

const TitleMuted = styled.span`
  opacity: 0.5;
  display: block;
`;

const TitleItalic = styled.span`
  font-style: italic;
  font-weight: 400;
  display: block;
`;

const TitleAccent = styled.div<{ $visible: boolean }>`
  width: ${p => p.$visible ? "64px" : "0"};
  height: 4px;
  background: ${CREAM};
  transition: width 1s ${SPRING} 0.6s;
  margin-bottom: 32px;
`;

const BodyText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${CREAM};
  line-height: 1.55;
  margin: 0;
  max-width: 440px;
  font-weight: 400;
  opacity: 0.88;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin-top: 32px;
`;

const Tag = styled.span<{ $delay: number; $visible: boolean }>`
  font-family: ${FONT_TITLE};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${CREAM};
  border: 1px solid rgba(250,242,234,0.4);
  padding: 7px 10px;
  white-space: nowrap;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.6s ${SPRING} ${p.$delay}s forwards;`}
`;

const Quote = styled.div`
  padding-left: 24px;
  border-left: 3px solid ${RED};
`;

const QuoteText = styled.p`
  font-family: ${FONT_TITLE};
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 500;
  font-style: italic;
  color: ${DARK};
  line-height: 1.3;
  margin: 0;
  letter-spacing: -0.015em;
`;

const QuoteHighlight = styled.strong`
  color: ${RED};
  font-weight: 700;
  font-style: normal;
`;

const Callouts = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalloutItem = styled.div<{ $last?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid rgba(26,26,24,0.12);
  ${p => p.$last && `border-bottom: 1px solid rgba(26,26,24,0.12);`}
`;

const CalloutNum = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${RED};
  letter-spacing: -0.02em;
  line-height: 1;
  font-style: italic;
`;

const CalloutBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CalloutTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.01em;
  margin: 0;
`;

const CalloutText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${MUTED};
  line-height: 1.65;
  margin: 0;
`;

const CalloutStrong = styled.strong`
  color: ${DARK};
`;

export default function AboutJuniorMovement() {
  const { ref: sectionRef, visible } = useInView();

  return (
    <Section ref={sectionRef}>
      <Left $visible={visible}>
        <Eyebrow>
          <EyebrowLabel>
            Contexto
          </EyebrowLabel>
        </Eyebrow>

        <TitleBlock>
          <TitleMain>
            <TitleMuted>O que é</TitleMuted>
            <TitleItalic>uma EJ?</TitleItalic>
          </TitleMain>
          <TitleAccent $visible={visible} />
          <BodyText>
            Estudantes universitários aplicando, na prática, o que aprendem na graduação.
            Consultoria de verdade, com supervisão acadêmica e comprometimento profissional.
          </BodyText>
        </TitleBlock>

        <Tags>
          {["Sem fins lucrativos", "Supervisionados", "Multidisciplinar"].map((t, i) => (
            <Tag key={t} $delay={0.7 + i * 0.1} $visible={visible}>{t}</Tag>
          ))}
        </Tags>
      </Left>

      <Right $visible={visible}>
        <Quote>
          <QuoteText>
            Estudantes que escolheram <QuoteHighlight>aprender fazendo</QuoteHighlight>,
            ao lado de quem precisa crescer.
          </QuoteText>
        </Quote>

        <Callouts>
          <CalloutItem>
            <CalloutNum>01</CalloutNum>
            <CalloutBody>
              <CalloutTitle>Por que contratar uma EJ?</CalloutTitle>
              <CalloutText>
                Time dedicado, formado em uma das melhores instituições do Brasil, a custo competitivo.
                Cada projeto é tratado como único.
              </CalloutText>
            </CalloutBody>
          </CalloutItem>

          <CalloutItem $last>
            <CalloutNum>02</CalloutNum>
            <CalloutBody>
              <CalloutTitle>Movimento Empresa Júnior</CalloutTitle>
              <CalloutText>
                Fazemos parte de um ecossistema nacional de <CalloutStrong>+600 EJs</CalloutStrong>, apoiadas pela Brasil Júnior e pela FEJESP em São Paulo. 
              </CalloutText>
            </CalloutBody>
          </CalloutItem>
        </Callouts>
      </Right>
    </Section>
  );
}