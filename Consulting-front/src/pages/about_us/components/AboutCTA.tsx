import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "../../../hooks/useInView";

const RED        = "#C02121";
const DARK       = "#1a1a18";
const BG         = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 56px 0;
  box-sizing: border-box;
  @media (max-width: 480px) { padding: 40px 0; }
`;

const Inner = styled.div<{ $visible: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.1s forwards;`}

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
`;

const Title = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: clamp(26px, 3.5vw, 38px);
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
  max-width: 620px;
`;

const Sub = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  color: #7a746e;
  line-height: 1.6;
  margin: 0;
  max-width: 480px;
`;

const BtnPrimary = styled.a`
  font-family: ${FONT_BODY};
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: ${RED};
  text-decoration: none;
  padding: 13px 30px;
  border-radius: 2px;
  transition: background 0.2s ease, transform 0.15s ease;
  cursor: pointer;

  &:hover {
    background: #4e0d0d;
    transform: translateY(-1px);
  }
  @media (max-width: 480px) {
    width: 100%; text-align: center; padding: 15px 24px;
  }
`;

export default function AboutCTA() {
  const { ref, visible } = useInView();

  return (
    <Section>
      <Inner ref={ref} $visible={!!visible}>
        <Eyebrow>Próximo passo</Eyebrow>
        <Title>Seu negócio tem desafios. Nós temos soluções.</Title>
        <Sub>
          Faça um diagnóstico gratuito com a nossa equipe e descubra como a Insper Jr. pode ajudar a resolver os desafios do seu negócio.
        </Sub>
        <BtnPrimary href="/contact">Fazer diagnóstico gratuito</BtnPrimary>
      </Inner>
    </Section>
  )}
