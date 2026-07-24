import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const RED        = "#C02121";
const RED_CTA    = "#C02121";
const INK        = "#1a1a18";
const BG_DARK    = "#0e0404";
const LIGHT_CREAM = "#FAF2EA";
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
  caseTitle: string;
  caseLede: string;
  detail: string;
  bullets: string[];
  pattern: "grid" | "radial" | "diagonal" | "dots";
};

const getScopes = (t: TFunction): Scope[] => [
  {
    num: "01",
    tab: t("business.cases.items.expansaoMercado.tab"),
    caseSlug: "expansao-mercado",
    caseTitle: t("business.cases.items.expansaoMercado.caseTitle"),
    caseLede: t("business.cases.items.expansaoMercado.caseLede"),
    detail: t("business.cases.items.expansaoMercado.detail"),
    bullets: t("business.cases.items.expansaoMercado.bullets", { returnObjects: true }) as string[],
    pattern: "grid",
  },
  {
    num: "02",
    tab: t("business.cases.items.goToMarket.tab"),
    caseSlug: "go-to-market",
    caseTitle: t("business.cases.items.goToMarket.caseTitle"),
    caseLede: t("business.cases.items.goToMarket.caseLede"),
    detail: t("business.cases.items.goToMarket.detail"),
    bullets: t("business.cases.items.goToMarket.bullets", { returnObjects: true }) as string[],
    pattern: "radial",
  },
  {
    num: "03",
    tab: t("business.cases.items.estruturaFinanceira.tab"),
    caseSlug: "estrutura-financeira",
    caseTitle: t("business.cases.items.estruturaFinanceira.caseTitle"),
    caseLede: t("business.cases.items.estruturaFinanceira.caseLede"),
    detail: t("business.cases.items.estruturaFinanceira.detail"),
    bullets: t("business.cases.items.estruturaFinanceira.bullets", { returnObjects: true }) as string[],
    pattern: "diagonal",
  },
  {
    num: "04",
    tab: t("business.cases.items.operacaoParaEscalar.tab"),
    caseSlug: "operacao-para-escalar",
    caseTitle: t("business.cases.items.operacaoParaEscalar.caseTitle"),
    caseLede: t("business.cases.items.operacaoParaEscalar.caseLede"),
    detail: t("business.cases.items.operacaoParaEscalar.detail"),
    bullets: t("business.cases.items.operacaoParaEscalar.bullets", { returnObjects: true }) as string[],
    pattern: "dots",
  },
];

/* ── Pattern backgrounds for case cards ── */

const PATTERN_SVG: Record<Scope["pattern"], React.ReactNode> = {
  grid: (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="pg-b" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(192,33,33,0.15)" strokeWidth="0.8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg-b)"/>
    </svg>
  ),
  radial: (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="pr-b" cx="35%" cy="55%">
          <stop offset="0%" stopColor="rgba(192,33,33,0.3)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#pr-b)"/>
      {[40, 80, 120, 160].map(r => (
        <circle key={r} cx="35%" cy="55%" r={r} fill="none" stroke="rgba(192,33,33,0.1)" strokeWidth="1"/>
      ))}
    </svg>
  ),
  diagonal: (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="pd-b" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(192,33,33,0.12)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pd-b)"/>
    </svg>
  ),
  dots: (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="pdots-b" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="rgba(192,33,33,0.2)"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pdots-b)"/>
    </svg>
  ),
};

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
  max-width: 1200px;
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
    box-shadow: 0 6px 14px rgba(192,33,33,0.32);
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
    border-color: rgba(192,33,33,0.35);
    &::before { opacity: 1; transform: translate(-50%, 0); }
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

const CaseCardNum = styled.span`
  position: absolute;
  right: 16px;
  bottom: -10px;
  font-family: ${FONT_TITLE};
  font-size: 88px;
  font-weight: 800;
  color: rgba(192,33,33,0.1);
  line-height: 1;
  user-select: none;
  pointer-events: none;
`;

const ComingSoonBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: ${FONT_TITLE};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(250,242,234,0.6);
  background: rgba(192,33,33,0.25);
  border: 1px solid rgba(192,33,33,0.4);
  padding: 4px 10px;
  border-radius: 2px;
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
  const { t } = useTranslation();
  const SCOPES = getScopes(t);
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
                      <ScopeTitleH3 dangerouslySetInnerHTML={{ __html: s.caseTitle }} />
                      <ScopeAccent />
                      <ScopeLede>{s.caseLede}</ScopeLede>
                    </ScopeIntro>

                    <PanelBody>
                      <PanelCol>
                        <ColLabel>{t("business.cases.labels.howWeWork")}</ColLabel>
                        <ScopeDetail dangerouslySetInnerHTML={{ __html: s.detail }} />
                      </PanelCol>
                      <PanelCol>
                        <ColLabel>{t("business.cases.labels.whatWeDeliver")}</ColLabel>
                        <Bullets>
                          {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </Bullets>
                      </PanelCol>
                    </PanelBody>
                  </ScopeMain>

                  <CaseCardLink to={`/business/${s.caseSlug}`}>
                    <CaseCardHeader>
                      {PATTERN_SVG[s.pattern]}
                      <CaseCardNum>{s.num}</CaseCardNum>
                      <ComingSoonBadge>{t("business.cases.labels.comingSoon")}</ComingSoonBadge>
                    </CaseCardHeader>
                    <CaseCardBody>
                      <CaseCardScope>{t("business.cases.labels.scopePrefix")} · {s.tab}</CaseCardScope>
                      <CaseCardTitle dangerouslySetInnerHTML={{ __html: s.caseTitle }} />
                      <CaseCardCTA>
                        {t("business.cases.labels.viewFullCase")}
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
