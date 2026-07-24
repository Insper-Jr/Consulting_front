import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useInView } from "@/hooks/useInView";

const RED        = "#C02121";
const DARK       = "#1a1a18";
const MUTED      = "#7a746e";
const BG         = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";


function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

// ── Keyframes ─────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const numIn = keyframes`
  from { opacity: 0; transform: translateY(32px) scale(0.92); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const lineGrow = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

// ── Layout ────────────────────────────────────────────────────────────────────
const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 20px 0 50px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 56px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 860px) {
    padding: 0 32px;
    gap: 64px;
  }
  @media (max-width: 480px) {
    padding: 0 20px;
    gap: 48px;
  }
`;

// ── Index marker (eyebrow + meta) ─────────────────────────────────────────────
const IndexRow = styled.div<{ $visible: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} forwards;`}
`;

const Eyebrow = styled.span`
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

const Meta = styled.span`
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 11px;
  color: rgba(26, 26, 24, 0.35);
  letter-spacing: 0.05em;

  @media (max-width: 600px) { display: none; }
`;

// ── Top row ───────────────────────────────────────────────────────────────────
const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 60px;
  align-items: end;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Left = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 28px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.9s ${SPRING} 0.15s forwards;`}
`;

const Title = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;

  i {
    font-style: italic;
    font-weight: 400;
  }

  @media (max-width: 860px) { font-size: 40px; }
  @media (max-width: 480px) { font-size: 30px; }
`;

const Accent = styled.div<{ $visible: boolean }>`
  width: 0;
  height: 3px;
  background: ${RED};
  transition: width 0.9s ${SPRING} 0.6s;
  ${p => p.$visible && css`width: 56px;`}
`;

const Body = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${MUTED};
  line-height: 1.65;
  margin: 0;
`;

const CtaLink = styled.a`
  font-family: ${FONT_BODY};
  font-size: 15px;
  font-weight: 600;
  color: ${DARK};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding-bottom: 4px;
  border-bottom: 1px solid ${DARK};
  transition: gap 0.2s ease;

  &:hover { gap: 14px; }
`;

// ── Big number ────────────────────────────────────────────────────────────────
const Right = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${numIn} 1s ${SPRING} 0.3s forwards;`}

  @media (max-width: 860px) {
    align-items: flex-start;
  }
`;

const BigSub = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(26, 26, 24, 0.28);
  align-items: center;
`;

const BigNumber = styled.div`
  font-family: ${FONT_TITLE};
  font-size: clamp(110px, 14vw, 180px);
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.06em;
  line-height: 0.85;
  display: flex;
  align-items: flex-start;
  user-select: none;

  span:first-child { font-variant-numeric: tabular-nums; }
`;

const BigSuffix = styled.span`
  color: ${RED};
  font-size: 0.56em;
  margin-top: 0.07em;
`;

const BigLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ${FONT_BODY};
  font-size: 14px;
  color: ${MUTED};

  &::before {
    content: "";
    width: 30px;
    height: 1px;
    background: rgba(26, 26, 24, 0.2);
  }

  @media (max-width: 860px) { &::before { display: none; } }
`;

// ── Mini metrics row ──────────────────────────────────────────────────────────
const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(26, 26, 24, 0.12);
  border-bottom: 1px solid rgba(26, 26, 24, 0.12);

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Metric = styled.div<{ $visible: boolean; $i: number }>`
  padding: 28px 24px;
  border-right: 1px solid rgba(26, 26, 24, 0.12);
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s ${SPRING};
  transition-delay: ${p => 0.5 + p.$i * 0.08}s;

  ${p => p.$visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  &:last-child { border-right: none; }
`;

const MetricNum = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 28px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.02em;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  font-family: ${FONT_BODY};
  font-size: 12px;
  color: ${MUTED};
  letter-spacing: 0.02em;
`;

// ── Mission + Vision ──────────────────────────────────────────────────────────
const MVRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  gap: 56px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const MVLine = styled.div<{ $visible: boolean }>`
  width: 2px;
  height: 100%;
  min-height: 100px;
  background: ${RED};
  transform-origin: top center;
  transform: scaleY(0);
  ${p => p.$visible && css`animation: ${lineGrow} 0.9s ${SPRING} 0.4s forwards;`}

  @media (max-width: 768px) { display: none; }
`;

const MVBlock = styled.div<{ $visible: boolean; $i: number }>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ${SPRING};
  transition-delay: ${p => 0.2 + p.$i * 0.15}s;

  ${p => p.$visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

const MVLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${RED};
`;

const MVText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${MUTED};
  line-height: 1.65;
  margin: 0;
  max-width: 480px;
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutContent() {
  const { t } = useTranslation();
  const { ref: leftRef, visible: leftVisible } = useInView();
  const { ref: rightRef, visible: rightVisible } = useInView();
  const { ref: mvRef, visible: mvVisible } = useInView();

  const years = useCountUp(25, 1800, rightVisible);

  const metrics: [string, string][] = [
    ["+550", t("about.content.metric1")],
    ["+1000", t("about.content.metric2")],
    ["100%", t("about.content.metric3")],
  ];

  return (
    <Section>
      <Inner>
        <IndexRow ref={leftRef} $visible={leftVisible}>
          <Eyebrow>{t("about.content.eyebrow")}</Eyebrow>
        </IndexRow>

        <TopRow>
          <Left $visible={leftVisible}>
            <Title>
              {t("about.content.titlePre")} <i>{t("about.content.titleItalic")}</i><br />
              {t("about.content.titlePost")}
            </Title>
            <Accent $visible={leftVisible} />
            <Body>
              {t("about.content.body1")}
            </Body>
            <Body>
              {t("about.content.body2")}
            </Body>
            <CtaLink href="/contact">{t("about.content.ctaLink")} <span>→</span></CtaLink>
          </Left>

          <Right ref={rightRef} $visible={rightVisible}>
            <BigSub>{t("about.content.bigSub")}</BigSub>
            <BigNumber>
              <span>{years}</span>
              <BigSuffix>+</BigSuffix>
            </BigNumber>
            <BigLabel>{t("about.content.bigLabel")}</BigLabel>
          </Right>
        </TopRow>

        <MetricsRow>
          {metrics.map(([n, lbl], i) => (
            <Metric key={i} $visible={rightVisible} $i={i}>
              <MetricNum>{n}</MetricNum>
              <MetricLabel>{lbl}</MetricLabel>
            </Metric>
          ))}
        </MetricsRow>

        <MVRow ref={mvRef}>
          <MVBlock $visible={mvVisible} $i={0}>
            <MVLabel>{t("about.content.missionLabel")}</MVLabel>
            <MVText>
              {t("about.content.missionText")}
            </MVText>
          </MVBlock>

          <MVLine $visible={mvVisible} />

          <MVBlock $visible={mvVisible} $i={1}>
            <MVLabel>{t("about.content.visionLabel")}</MVLabel>
            <MVText>
              {t("about.content.visionText")}
            </MVText>
          </MVBlock>
        </MVRow>
      </Inner>
    </Section>
  );
}