import React from "react";
import styled from "styled-components";

const RED_CTA    = "#C02121";
const INK        = "#1a1a1a";
const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;

const Opening = styled.section`
  max-width: 1240px;
  margin: 5rem auto 0;
  padding: 0 2rem;
  @media (max-width: 768px) { margin: 3.5rem auto 0; padding: 0 1rem; }
`;

const OpenHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: end;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(26,26,24,0.1);
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 2rem; padding-bottom: 2.5rem; }
`;

const OpenLeft = styled.div``;

const OpenEyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${RED_CTA};
  margin: 0 0 1.5rem;
`;

const OpenHeadline = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: clamp(32px, 4vw, 54px);
  line-height: 1.06;
  margin: 0;
  letter-spacing: -0.03em;
`;

const HLLight = styled.span`
  display: block;
  font-weight: 300;
  color: rgba(26,26,24,0.28);
`;

const HLBold = styled.span`
  display: block;
  font-weight: 800;
  color: ${INK};
`;

const HLAccent = styled.span`
  display: block;
  font-weight: 700;
  font-style: italic;
  color: ${RED_CTA};
`;

const OpenRight = styled.div``;

const OpenBody = styled.p`
  font-family: ${FONT_BODY};
  font-size: 17px;
  line-height: 1.72;
  color: #5a5550;
  margin: 0;
`;

const PrinciplesStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const Principle = styled.div`
  padding: 2.25rem 2.5rem 2.25rem 0;
  & + & {
    padding-left: 2.5rem;
    border-left: 1px solid rgba(26,26,24,0.1);
  }
  @media (max-width: 700px) {
    padding: 1.5rem 0;
    border-left: none !important;
    & + & { padding-left: 0; border-top: 1px solid rgba(26,26,24,0.1); }
  }
`;

const PrincipleNum = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: ${RED_CTA};
  display: block;
  margin-bottom: 0.85rem;
`;

const PrincipleTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 15px;
  font-weight: 700;
  color: ${INK};
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

const PrincipleText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13.5px;
  line-height: 1.58;
  color: #6a6560;
  margin: 0;
`;

const OpenTransition = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2.75rem;
  color: ${RED_CTA};
`;

const TransLine = styled.div`
  height: 1px;
  flex: 1;
  background: rgba(192,33,33,0.22);
`;

const TransLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export default function BusinessOpening() {
  return (
    <Opening id="cases">
      <OpenHeader>
        <OpenLeft>
          <OpenEyebrow>O que fazemos, na prática</OpenEyebrow>
          <OpenHeadline>
            <HLLight>Cada empresa</HLLight>
            <HLBold>chega diferente.</HLBold>
            <HLAccent>Nós respondemos.</HLAccent>
          </OpenHeadline>
        </OpenLeft>
        <OpenRight>
          <OpenBody>
            Não trabalhamos com pacotes prontos. Entendemos o problema, montamos
            a equipe certa e definimos a abordagem. O resultado é uma solução
            construída para o contexto específico do seu negócio sem fórmula,
            sem atalho.
          </OpenBody>
        </OpenRight>
      </OpenHeader>

      <PrinciplesStrip>
        <Principle>
          <PrincipleNum>01</PrincipleNum>
          <PrincipleTitle>Diagnóstico antes de solução</PrincipleTitle>
          <PrincipleText>
            Mergulhamos no contexto do cliente antes de propor qualquer coisa.
            Mercado, finanças e operação entendemos tudo antes de recomendar.
          </PrincipleText>
        </Principle>
        <Principle>
          <PrincipleNum>02</PrincipleNum>
          <PrincipleTitle>Abordagem adaptada ao problema</PrincipleTitle>
          <PrincipleText>
            Usamos as ferramentas que o projeto exige em qualquer combinação.
            Nenhum projeto tem formato pré-definido.
          </PrincipleText>
        </Principle>
        <Principle>
          <PrincipleNum>03</PrincipleNum>
          <PrincipleTitle>Entrega acionável</PrincipleTitle>
          <PrincipleText>
            Não entregamos slides bonitos. Entregamos o que o gestor consegue
            usar para decidir e executar com clareza no dia seguinte.
          </PrincipleText>
        </Principle>
      </PrinciplesStrip>

      <OpenTransition>
        <TransLine />
        <TransLabel>04 projetos abaixo</TransLabel>
        <TransLine />
      </OpenTransition>
    </Opening>
  );
}
