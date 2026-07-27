import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { RED as RED_CTA, DARK as INK, FONT_TITLE, FONT_BODY } from "../../../styles/tokens";

const Opening = styled.section`
  max-width: 1200px;
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
  font-size: clamp(28px, 3.2vw, 32px);
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.02em;
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
  const { t } = useTranslation();
  return (
    <Opening id="cases">
      <OpenHeader>
        <OpenLeft>
          <OpenEyebrow>{t("business.opening.eyebrow")}</OpenEyebrow>
          <OpenHeadline>
            <HLLight>{t("business.opening.headlineLight")}</HLLight>
            <HLBold>{t("business.opening.headlineBold")}</HLBold>
            <HLAccent>{t("business.opening.headlineAccent")}</HLAccent>
          </OpenHeadline>
        </OpenLeft>
        <OpenRight>
          <OpenBody>
            {t("business.opening.body")}
          </OpenBody>
        </OpenRight>
      </OpenHeader>

      <PrinciplesStrip>
        <Principle>
          <PrincipleNum>01</PrincipleNum>
          <PrincipleTitle>{t("business.opening.principles.p1.title")}</PrincipleTitle>
          <PrincipleText>
            {t("business.opening.principles.p1.text")}
          </PrincipleText>
        </Principle>
        <Principle>
          <PrincipleNum>02</PrincipleNum>
          <PrincipleTitle>{t("business.opening.principles.p2.title")}</PrincipleTitle>
          <PrincipleText>
            {t("business.opening.principles.p2.text")}
          </PrincipleText>
        </Principle>
        <Principle>
          <PrincipleNum>03</PrincipleNum>
          <PrincipleTitle>{t("business.opening.principles.p3.title")}</PrincipleTitle>
          <PrincipleText>
            {t("business.opening.principles.p3.text")}
          </PrincipleText>
        </Principle>
      </PrinciplesStrip>

      <OpenTransition>
        <TransLine />
        <TransLabel>{t("business.opening.transitionLabel")}</TransLabel>
        <TransLine />
      </OpenTransition>
    </Opening>
  );
}
