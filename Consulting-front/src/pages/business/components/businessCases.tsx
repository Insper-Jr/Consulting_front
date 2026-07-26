import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import capaWine     from "../../../assets/business/wine/01-contexto.jpg";
import capaCommunity   from "../../../assets/business/community/03-posicionamento.jpg";
import capaCaramelo  from "../../../assets/business/caramelo/04-capex.jpg";
import capaQuimica from "../../../assets/business/quimica/02-macroetapas.jpg";

const RED        = "#A10F23";
const RED_CTA    = "#C02121";
const INK        = "#1a1a1a";
const BG_DARK    = "#0e0404";
const LIGHT_CREAM = "#faf6f1";
const FONT_TITLE  = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY   = `"Inter", Helvetica, sans-serif`;
const SPRING      = "cubic-bezier(0.16,1,0.3,1)";

const accentGrow = keyframes`to { transform: scaleX(1); }`;
const redbarGrow = keyframes`to { transform: scaleX(1); }`;

/* ── Types & Data ── */

type Scope = {
  num: string;
  tab: string;
  caseSlug: string;
  caseTitle: React.ReactNode;
  caseLede: React.ReactNode;
  detail: React.ReactNode;
  bullets: string[];
  capa: string;
  capaAlt: string;
};

const SCOPES: Scope[] = [
  {
    num: "01",
    tab: "Análise Mercadológica",
    caseSlug: "wine",
    caseTitle: <>Projeto <i>Wine</i></>,
    caseLede: (
      <>
        Uma plataforma internacional de vinhos premium queria entrar no Brasil, em
        um mercado pequeno, disperso e quase sem estatística confiável. Não dava
        para dimensionar a demanda pelos caminhos convencionais.
      </>
    ),
    detail: (
      <>
        Construímos a leitura de mercado por <strong>cruzamento de fontes</strong>:
        bases públicas, pesquisa autoral com o público-alvo, abordagem de cliente
        oculto junto a players e networking para chegar a benchmarks fechados.
        Avaliamos a operação internacional existente, o cenário concorrencial
        brasileiro e as barreiras alfandegárias e cambiais, e entregamos as{" "}
        <strong>recomendações de tropicalização</strong> que redirecionaram o produto.
      </>
    ),
    bullets: [
      "Dimensionamento de TAM / SAM / SOM",
      "Benchmarking de concorrentes e posicionamento",
      "Pesquisa com consumidores (qualitativa + quantitativa)",
      "Relatório de viabilidade com cenários de entrada",
      "Identificação de oportunidades e riscos estratégicos",
    ],
    capa: capaWine,
    capaAlt: "Contexto do projeto de análise mercadológica",
  },
  {
    num: "02",
    tab: "Estratégia de Marketing",
    caseSlug: "community",
    caseTitle: <>Projeto <i>Community</i></>,
    caseLede: (
      <>
        Uma startup de saúde emocional digital entrava em um mercado dominado por
        players globais, sem clareza sobre onde ainda havia espaço nem sobre como
        chegar ao usuário final e às empresas contratantes.
      </>
    ),
    detail: (
      <>
        Comparamos os concorrentes atributo por atributo até encontrar a lacuna que
        ninguém ocupava, e transformamos isso em{" "}
        <strong>posicionamento e proposta de valor</strong>. Em cima dele estruturamos
        o go-to-market das duas frentes: precificação B2C e B2B ancorada em benchmark,{" "}
        <strong>funil de conteúdo founder-led</strong> para aquisição orgânica e
        prospecção B2B com análise de keywords, CPC e intenção de busca.
      </>
    ),
    bullets: [
      "Definição de personas e ICP (Ideal Customer Profile)",
      "Posicionamento e proposta de valor",
      "Plano de canais e alocação de verba",
      "Calendário editorial dos primeiros 90 dias",
      "Projeção de métricas de aquisição (CPL, CAC)",
    ],
    capa: capaCommunity,
    capaAlt: "Mapa de posicionamento competitivo do projeto",
  },
  {
    num: "03",
    tab: "Planejamento Financeiro",
    caseSlug: "caramelo",
    caseTitle: <>Projeto <i>Caramelo</i></>,
    caseLede: (
      <>
        Uma confeitaria artesanal operava de casa, com entrega própria e pouca
        visibilidade de marca. Crescer significava abrir uma loja física, uma
        decisão de investimento que ninguém tinha modelado.
      </>
    ),
    detail: (
      <>
        Lemos primeiro o <strong>comportamento de consumo por canal</strong>: o
        aplicativo de entrega como porta de entrada e a loja física como consolidação
        de marca. Definida a estratégia, dimensionamos o{" "}
        <strong>CapEx inicial item a item</strong> e rodamos a projeção completa:
        receita por canal, estrutura de custos, comparativo entre regimes tributários
        e geração de caixa ao longo do horizonte do projeto.
      </>
    ),
    bullets: [
      "Estruturação de DRE e balanço patrimonial",
      "Projeção de fluxo de caixa (18 meses)",
      "Modelagem financeira para captação",
      "Cálculo de unit economics (LTV, CAC, Payback)",
      "Análise de burn rate e runway",
    ],
    capa: capaCaramelo,
    capaAlt: "Dimensionamento do investimento inicial do projeto",
  },
  {
    num: "04",
    tab: "Plano Operacional",
    caseSlug: "quimica",
    caseTitle: <>Projeto <i>Química</i></>,
    caseLede: (
      <>
        Em uma distribuidora industrial B2B, o pedido passava por cinco áreas e três
        sistemas que não conversavam entre si. O resultado aparecia no fim da linha:
        retrabalho, atraso e promessa não cumprida.
      </>
    ),
    detail: (
      <>
        Diagnosticamos a operação por <strong>triangulação de três fontes</strong>:
        entrevistas em profundidade, formulário com os operadores e a base de não
        conformidades. Mapeamos a jornada do pedido em cinco macroetapas, rodamos{" "}
        <strong>diagrama de Ishikawa</strong> em cada uma para separar sintoma de
        causa-raiz e entregamos um{" "}
        <strong>plano de ação em três horizontes</strong>, com ferramenta e dono por ação.
      </>
    ),
    bullets: [
      "Mapeamento de processos internos (AS-IS)",
      "Identificação e priorização de gargalos",
      "Proposta de melhoria (TO-BE) com quick wins",
      "Playbooks e SOPs para o time",
      "Plano de implementação com KPIs de acompanhamento",
    ],
    capa: capaQuimica,
    capaAlt: "Mapeamento da operação em macroetapas",
  },
];

/* ── Styled Components ── */

const RedBarWrap = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;
`;

const RedBar = styled.div`
  height: 2px;
  width: 100%;
  background: rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, ${RED} 0%, ${RED_CTA} 50%, ${RED} 100%);
    transform-origin: left center;
    transform: scaleX(0);
    animation: ${redbarGrow} 1.6s ${SPRING} 0.2s forwards;
  }
`;

const ScopeSection = styled.section`
  min-height: 100vh;
  padding: 2rem;
  scroll-margin-top: 80px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid rgba(26,26,24,0.06);
  &:nth-of-type(even) { background: ${LIGHT_CREAM}; }
  @media (max-width: 900px) { min-height: auto; padding: 3rem 1rem; }
`;

const ScopesWrap = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
`;

const ScopePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ScopeHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  @media (max-width: 900px) { align-items: flex-start; gap: 1rem; }
`;

const ScopeCounter = styled.p`
  font-family: ${FONT_TITLE};
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  line-height: 1;
`;

const ScopeName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: ${INK};
  line-height: 1;
  position: relative;
  padding-bottom: 0.5rem;
  display: inline-block;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 56px;
    height: 3px;
    background: ${RED};
  }
  @media (max-width: 1100px) { font-size: 36px; }
  @media (max-width: 700px) { font-size: 28px; }
`;

const ScopeGrid = styled.div`
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
  @media (max-width: 1024px) { gap: 1.75rem; }
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 1.5rem; }
`;

const ScopeMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  min-width: 0;
  height: 100%;
`;

const ScopeIntro = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScopeTitleH3 = styled.h3`
  color: ${INK};
  font-family: ${FONT_TITLE};
  font-size: 38px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  i { font-style: italic; font-weight: 400; color: ${RED}; }
  @media (max-width: 900px) { font-size: 28px; }
`;

const ScopeAccent = styled.div`
  width: 56px;
  height: 3px;
  background: ${RED};
  margin: 0.9rem 0 1.2rem;
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${accentGrow} 0.9s ${SPRING} 0.3s forwards;
`;

const ScopeLede = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16.5px;
  line-height: 1.6;
  color: #5a5550;
  margin: 0;
  strong { color: ${INK}; font-weight: 600; }
  @media (max-width: 600px) { font-size: 14px; }
`;

const PanelBody = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  border-top: 1px solid rgba(26,26,24,0.12);
  border-bottom: 1px solid rgba(26,26,24,0.12);
  flex: 1;
  align-content: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; flex: 0 1 auto; }
`;

const PanelCol = styled.div`
  padding: 1.5rem 2rem 1.5rem 0;
  & + & {
    padding: 1.5rem 0 1.5rem 2.25rem;
    border-left: 1px solid rgba(26,26,24,0.12);
  }
  @media (max-width: 900px) {
    padding: 1.1rem 0;
    & + & { padding: 1.1rem 0; border-left: none; border-top: 1px solid rgba(26,26,24,0.12); }
  }
`;

const ColLabel = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${RED};
  margin: 0 0 0.85rem;
`;

const ScopeDetail = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  line-height: 1.65;
  color: #3a3530;
  margin: 0;
  strong { color: ${INK}; font-weight: 600; }
`;

const Bullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: entrega;
  li {
    font-family: ${FONT_BODY};
    font-size: 14.5px;
    line-height: 1.4;
    padding: 0.6rem 0 0.6rem 2rem;
    position: relative;
    color: ${INK};
    border-bottom: 1px solid rgba(26,26,24,0.07);
    counter-increment: entrega;
    &:last-child { border-bottom: none; }
    &::before {
      content: counter(entrega, decimal-leading-zero);
      position: absolute;
      left: 0;
      top: 0.75em;
      font-family: ${FONT_TITLE};
      font-size: 10.5px;
      font-weight: 700;
      color: ${RED};
      letter-spacing: 0.05em;
    }
  }
`;

const CaseCardLink = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(26,26,24,0.08);
  border-top: 3px solid ${RED};
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  min-height: 320px;

  &::before {
    content: "Clique aqui";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: 0.6rem;
    background: ${RED};
    color: #fff;
    font-family: ${FONT_TITLE};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    box-shadow: 0 6px 14px rgba(161,15,35,0.32);
    opacity: 0;
    transform: translate(-50%, 8px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;
    z-index: 2;
    white-space: nowrap;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(0,0,0,0.12);
    border-color: rgba(161,15,35,0.35);
    &::before { opacity: 1; transform: translate(-50%, 0); }
    img { transform: scale(1.04); }
  }

  &:focus-visible {
    outline: 2px solid ${RED};
    outline-offset: 3px;
    &::before { opacity: 1; transform: translate(-50%, 0); }
  }
`;

const CaseCardHeader = styled.div`
  position: relative;
  height: 180px;
  background: ${BG_DARK};
  overflow: hidden;
  flex-shrink: 0;
`;

/* Slide de abertura do case. As imagens já saem do deck com os dados
   sensíveis removidos: nome do cliente, valores e dados internos. */
const CaseCardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.4s ${SPRING};
`;

const CaseCardNum = styled.span`
  position: absolute;
  right: 16px;
  bottom: -10px;
  font-family: ${FONT_TITLE};
  font-size: 88px;
  font-weight: 800;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 2px 12px rgba(0,0,0,0.45);
  line-height: 1;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`;

const CaseCardBody = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const CaseCardScope = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
  margin: 0;
`;

const CaseCardTitle = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 22px;
  font-weight: 700;
  color: ${INK};
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
  i { font-style: italic; font-weight: 400; color: ${RED}; }
`;

const CaseCardCTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${FONT_BODY};
  font-size: 13px;
  font-weight: 700;
  color: ${RED};
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(26,26,24,0.08);
`;

/* ── Component ── */

export default function BusinessCases() {
  return (
    <>
      {SCOPES.map(s => (
        <React.Fragment key={s.num}>
          <RedBarWrap><RedBar /></RedBarWrap>

          <ScopeSection id={`escopo-${s.num}`}>
            <ScopesWrap>
              <ScopePanel>
                <ScopeHeader>
                  <ScopeCounter>
                    <ScopeName>{s.tab}</ScopeName>
                  </ScopeCounter>
                </ScopeHeader>

                <ScopeGrid>
                  <ScopeMain>
                    <ScopeIntro>
                      <ScopeTitleH3>{s.caseTitle}</ScopeTitleH3>
                      <ScopeAccent />
                      <ScopeLede>{s.caseLede}</ScopeLede>
                    </ScopeIntro>

                    <PanelBody>
                      <PanelCol>
                        <ColLabel>Como atuamos</ColLabel>
                        <ScopeDetail>{s.detail}</ScopeDetail>
                      </PanelCol>
                      <PanelCol>
                        <ColLabel>O que entregamos</ColLabel>
                        <Bullets>
                          {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </Bullets>
                      </PanelCol>
                    </PanelBody>
                  </ScopeMain>

                  <CaseCardLink to={`/business/${s.caseSlug}`}>
                    <CaseCardHeader>
                      <CaseCardImage src={s.capa} alt={s.capaAlt} loading="lazy" />
                      <CaseCardNum>{s.num}</CaseCardNum>
                    </CaseCardHeader>
                    <CaseCardBody>
                      <CaseCardScope>Escopo · {s.tab}</CaseCardScope>
                      <CaseCardTitle>{s.caseTitle}</CaseCardTitle>
                      <CaseCardCTA>
                        Ver case completo
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </CaseCardCTA>
                    </CaseCardBody>
                  </CaseCardLink>
                </ScopeGrid>
              </ScopePanel>
            </ScopesWrap>
          </ScopeSection>
        </React.Fragment>
      ))}
    </>
  );
}
