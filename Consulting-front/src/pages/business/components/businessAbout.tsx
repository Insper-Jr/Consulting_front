import React from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

import { RED_TITLE, RED, DARK, FONT_TITLE, FONT_BODY } from "../../../styles/tokens";

const COLORS = {
  redTitle: RED_TITLE,
  redCTA:   RED,
  ink:      DARK,
};

const redbarGrow = keyframes`to { transform: scaleX(1); }`;

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
    background: linear-gradient(90deg, ${COLORS.redTitle} 0%, ${COLORS.redCTA} 50%, ${COLORS.redTitle} 100%);
    transform-origin: left center;
    transform: scaleX(0);
    animation: ${redbarGrow} 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }
`;

const Intro = styled.section`
  padding: 0 2rem 4rem;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 1rem 2.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem auto 0;
  max-width: 1100px;
  padding: 0 2rem;
  text-align: center;
`;

const OpeningEyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${COLORS.redCTA};
  margin: 0 0 0.9rem;
`;

const SectionTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${COLORS.ink};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 600px) { font-size: 26px; }
`;

const OpeningDivider = styled.div`
  width: 3rem;
  height: 3px;
  background: ${COLORS.redCTA};
  border-radius: 2px;
  margin: 1rem auto 1.6rem;
`;

const FrenteLede = styled.p`
  max-width: 920px;
  margin: 0 auto 3rem;
  text-align: center;
  font-family: ${FONT_BODY};
  font-size: 19px;
  line-height: 1.7;
  color: #2a2a2a;
  strong { font-weight: 600; color: ${COLORS.ink}; }

  @media (max-width: 900px) { font-size: 17px; }
`;

const PillarsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Pillar = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  position: relative;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.06);
    border-color: rgba(192,33,33,0.25);
  }
`;

const PillarNum = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: ${COLORS.redTitle};
  margin-bottom: 0.6rem;
  display: block;
`;

const PillarTitle = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 19px;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.6rem;
  line-height: 1.25;
`;

const PillarText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  line-height: 1.55;
  color: #4a4a4a;
  margin: 0;
`;

const StatsBar = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(0,0,0,0.08);

  @media (max-width: 600px) { margin-top: 2.5rem; padding-top: 1.5rem; gap: 1.25rem; }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: #000;

  @media (max-width: 600px) { font-size: 24px; }
`;

const StatLabel = styled.div`
  font-family: ${FONT_BODY};
  font-size: 16px;
  text-align: center;
  color: #555;

  @media (max-width: 600px) { font-size: 13px; }
`;

export default function BusinessAbout() {
  const { t } = useTranslation();
  return (
    <>
      <RedBarWrap><RedBar /></RedBarWrap>
      <Intro id="sobre-frente">
        <SectionHeader>
          <OpeningEyebrow>{t("business.about.eyebrow")}</OpeningEyebrow>
          <SectionTitle>{t("business.about.title")}</SectionTitle>
          <OpeningDivider />
        </SectionHeader>

        <FrenteLede>
          {t("business.about.lede")}
        </FrenteLede>

        <PillarsGrid>
          <Pillar>
            <PillarNum>{t("business.about.pillars.p1.num")}</PillarNum>
            <PillarTitle>{t("business.about.pillars.p1.title")}</PillarTitle>
            <PillarText>
              {t("business.about.pillars.p1.text")}
            </PillarText>
          </Pillar>
          <Pillar>
            <PillarNum>{t("business.about.pillars.p2.num")}</PillarNum>
            <PillarTitle>{t("business.about.pillars.p2.title")}</PillarTitle>
            <PillarText>
              {t("business.about.pillars.p2.text")}
            </PillarText>
          </Pillar>
          <Pillar>
            <PillarNum>{t("business.about.pillars.p3.num")}</PillarNum>
            <PillarTitle>{t("business.about.pillars.p3.title")}</PillarTitle>
            <PillarText>
              {t("business.about.pillars.p3.text")}
            </PillarText>
          </Pillar>
        </PillarsGrid>

        <StatsBar>
          <Stat><StatValue>25+</StatValue><StatLabel>{t("business.about.stats.years")}</StatLabel></Stat>
          <Stat><StatValue>500+</StatValue><StatLabel>{t("business.about.stats.projects")}</StatLabel></Stat>
          <Stat><StatValue>3</StatValue><StatLabel>{t("business.about.stats.fronts")}</StatLabel></Stat>
        </StatsBar>
      </Intro>
    </>
  );
}
