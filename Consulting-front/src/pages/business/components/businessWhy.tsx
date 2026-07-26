import React from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "../../../hooks/useInView";

const RED        = "#C02121";
const DARK       = "#1a1a18";
const MUTED      = "#7a746e";
const CREAM      = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const lineGrow = keyframes`from { transform: scaleX(0); } to { transform: scaleX(1); }`;

/* Título e texto de cada card vivem no pt.ts / en.ts, sob business.why.items */
const ITEMS = [
  {
    key: "market",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    key: "faculty",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    key: "deliverables",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <polyline points="9 15 11 17 15 13"/>
      </svg>
    ),
  },
  {
    key: "value",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const Section = styled.section`
  background: ${CREAM};
  padding: 72px 0;
  @media (max-width: 480px) { padding: 52px 0; }
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 56px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 768px) { padding: 0 28px; }
  @media (max-width: 480px) { padding: 0 20px; gap: 28px; }
`;

const Header = styled.div<{ $v: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 580px;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.8s ${SPRING} 0.1s forwards;`}
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
`;

const H2 = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: ${DARK};
  margin: 0;
  i { font-style: italic; font-weight: 400; }
  @media (max-width: 480px) { font-size: 24px; }
`;

const Divider = styled.div<{ $v: boolean }>`
  width: 48px;
  height: 3px;
  background: ${RED};
  transform-origin: left;
  transform: scaleX(0);
  ${p => p.$v && css`animation: ${lineGrow} 0.5s 0.3s ${SPRING} both;`}
`;

const Lead = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  line-height: 1.65;
  color: ${MUTED};
  margin: 0;
  max-width: 540px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(26,26,24,0.08);
  border: 1px solid rgba(26,26,24,0.08);
  @media (max-width: 800px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Card = styled.div<{ $v: boolean; $delay: number }>`
  background: #fff;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid transparent;
  cursor: default;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.7s ${SPRING} ${p.$delay}s forwards;`}
  transition: background 0.25s ease, border-color 0.25s ease;
  &:hover {
    background: rgba(192,33,33,0.03);
    border-color: rgba(192,33,33,0.3);
  }
`;

const CardAccent = styled.div`
  width: 20px;
  height: 2px;
  background: ${RED};
  transition: width 0.3s ${SPRING};
  ${Card}:hover & { width: 40px; }
`;

const IconWrap = styled.div`
  width: 36px;
  height: 36px;
  color: ${MUTED};
  transition: color 0.25s;
  svg { width: 100%; height: 100%; }
  ${Card}:hover & { color: ${RED}; }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CardTitle = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: 0.01em;
  line-height: 1.3;
`;

const CardText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${MUTED};
  line-height: 1.55;
  margin: 0;
`;

export default function BusinessWhy() {
  const { t } = useTranslation();
  const { ref: hRef, visible: hV } = useInView();
  const { ref: gRef, visible: gV } = useInView();

  return (
    <Section>
      <Inner>
        <Header ref={hRef} $v={hV}>
          <Eyebrow>{t("business.why.eyebrow")}</Eyebrow>
          <H2>{t("business.why.titleMain")} <i>{t("business.why.titleAccent")}</i></H2>
          <Divider $v={hV} />
          <Lead>{t("business.why.lead")}</Lead>
        </Header>

        <Grid ref={gRef}>
          {ITEMS.map((it, i) => (
            <Card key={it.key} $v={gV} $delay={0.1 + i * 0.08}>
              <CardAccent />
              <IconWrap>{it.icon}</IconWrap>
              <CardBody>
                <CardTitle>{t(`business.why.items.${it.key}.title`)}</CardTitle>
                <CardText>{t(`business.why.items.${it.key}.body`)}</CardText>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
