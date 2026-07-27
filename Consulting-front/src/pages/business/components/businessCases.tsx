import React from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import Rich from "../../../i18n/rich";

import capaWine     from "../../../assets/business/wine/01-contexto.jpg";
import capaCommunity   from "../../../assets/business/community/03-posicionamento.jpg";
import capaCaramelo  from "../../../assets/business/caramelo/04-capex.jpg";
import capaQuimica from "../../../assets/business/quimica/02-macroetapas.jpg";

import { RED, RED as RED_CTA, DARK as INK, BG_CREAM as LIGHT_CREAM, FONT_TITLE, FONT_BODY, SPRING, TYPE } from "../../../styles/tokens";
import CaseShowcaseCard from "../../../components/caseShowcaseCard";

const accentGrow = keyframes`to { transform: scaleX(1); }`;
const redbarGrow = keyframes`to { transform: scaleX(1); }`;

/* ── Types & Data ── */

/* O texto dos escopos vive no pt.ts / en.ts, sob business.scopes.<key>.
   Aqui ficam só a ordem, o slug da rota, o codinome do case e a capa. */
type Scope = {
  num: string;
  key: string;
  caseSlug: string;
  code: string;
  capa: string;
};

const SCOPES: Scope[] = [
  { num: "01", key: "market",      caseSlug: "wine",      code: "Wine",      capa: capaWine },
  { num: "02", key: "marketing",   caseSlug: "community", code: "Community", capa: capaCommunity },
  { num: "03", key: "financial",   caseSlug: "caramelo",  code: "Caramelo",  capa: capaCaramelo },
  { num: "04", key: "operational", caseSlug: "quimica",   code: "Química",   capa: capaQuimica },
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
  font-size: ${TYPE.sectionH2.size};
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
  @media (max-width: 1100px) { font-size: 28px; }
  @media (max-width: 700px) { font-size: 24px; }
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
  font-size: ${TYPE.subTitle.size};
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  i { font-style: italic; font-weight: 400; color: ${RED}; }
  @media (max-width: 900px) { font-size: 18px; }
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

/* ── Component ── */

export default function BusinessCases() {
  const { t } = useTranslation();

  return (
    <>
      {SCOPES.map(s => {
        const base = `business.scopes.${s.key}`;
        const tab = t(`${base}.tab`);
        const title = <>{t("business.scopes.titlePrefix")} <i>{s.code}</i></>;
        const bullets = t(`${base}.bullets`, { returnObjects: true }) as unknown as string[];

        return (
        <React.Fragment key={s.num}>
          <RedBarWrap><RedBar /></RedBarWrap>

          <ScopeSection id={`escopo-${s.num}`}>
            <ScopesWrap>
              <ScopePanel>
                <ScopeHeader>
                  <ScopeCounter>
                    <ScopeName>{tab}</ScopeName>
                  </ScopeCounter>
                </ScopeHeader>

                <ScopeGrid>
                  <ScopeMain>
                    <ScopeIntro>
                      <ScopeTitleH3>{title}</ScopeTitleH3>
                      <ScopeAccent />
                      <ScopeLede>{t(`${base}.lede`)}</ScopeLede>
                    </ScopeIntro>

                    <PanelBody>
                      <PanelCol>
                        <ColLabel>{t("business.scopes.howLabel")}</ColLabel>
                        <ScopeDetail><Rich k={`${base}.detail`} /></ScopeDetail>
                      </PanelCol>
                      <PanelCol>
                        <ColLabel>{t("business.scopes.deliverLabel")}</ColLabel>
                        <Bullets>
                          {bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </Bullets>
                      </PanelCol>
                    </PanelBody>
                  </ScopeMain>

                  <CaseShowcaseCard
                    to={`/business/${s.caseSlug}`}
                    coverSrc={s.capa}
                    coverAlt={t(`${base}.capaAlt`)}
                    badge={t("business.scopes.badge")}
                    tag={`${t("business.scopes.scopeLabel")} · ${tab}`}
                    title={title}
                    desc={t(`${base}.lede`)}
                    ctaLabel={t("business.scopes.seeCase")}
                  />
                </ScopeGrid>
              </ScopePanel>
            </ScopesWrap>
          </ScopeSection>
        </React.Fragment>
        );
      })}
    </>
  );
}
