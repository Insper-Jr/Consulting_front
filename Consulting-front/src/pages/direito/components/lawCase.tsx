import { useEffect, useRef, useState, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

const C = {
  redTitle: "#C02121",
  redCTA: "#C02121",
  redDark: "#691212",
  ink: "#1a1a18",
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;
const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

// ── Types ─────────────────────────────────────────────────────────────────
export type LawCaseStep = {
  img: string;
  alt: string;
  cap: string;
};

export type LawCaseMeta = {
  label: string;
  value: string;
};

export type LawCaseProps = {
  id: string;
  badge: string;
  bigName: ReactNode;
  /** May contain inline HTML markup (e.g. <strong>) — rendered via dangerouslySetInnerHTML. */
  sub: string;
  intro: {
    eyebrow: string;
    headline: ReactNode;
    /** Each entry may contain inline HTML markup (e.g. <strong>) — rendered via dangerouslySetInnerHTML. */
    paragraphs: string[];
    subhead?: string;
    /** Each entry may contain inline HTML markup (e.g. <strong>) — rendered via dangerouslySetInnerHTML. */
    list?: string[];
    closing?: string;
  };
  meta: LawCaseMeta[];
  steps: LawCaseStep[];
};

// ── Component ──────────────────────────────────────────────────────────────
export default function LawCase(props: LawCaseProps) {
  const { t } = useTranslation();
  const { id, badge, bigName, sub, intro, meta, steps } = props;
  const [idx, setIdx] = useState(0);
  const deckRef = useRef<HTMLElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => { inViewRef.current = e.isIntersecting; },
      { threshold: 0.3 }
    );
    io.observe(deck);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + steps.length) % steps.length);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % steps.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [steps.length]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const goPrev = () => setIdx(i => Math.max(0, i - 1));
  const goNext = () => setIdx(i => Math.min(steps.length - 1, i + 1));

  return (
    <CaseSection id={id}>
      <CaseInner>
        <CaseCounter>
          <CaseBadge>{badge}</CaseBadge>
          <CaseBigName>{bigName}<Dot>.</Dot></CaseBigName>
        </CaseCounter>

        <CaseSub dangerouslySetInnerHTML={{ __html: sub }} />

        <CaseSplit>
          <CaseText>
            <CtEye>{intro.eyebrow}</CtEye>
            <CtH>{intro.headline}</CtH>
            {intro.paragraphs.map((p, i) => <CtP key={i} dangerouslySetInnerHTML={{ __html: p }} />)}

            {intro.subhead && <CtSub>{intro.subhead}</CtSub>}
            {intro.list && (
              <CtList>
                {intro.list.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}
              </CtList>
            )}

            {intro.closing && <CtFinal>{intro.closing}</CtFinal>}
          </CaseText>

          <CaseDeck ref={deckRef} aria-label={t("direito.caseCommon.deckAriaLabel", { id })}>
            <CdFrame>
              <CdStack>
                {steps.map((s, i) => (
                  <CdSlide key={i} $active={idx === i}>
                    <CdImageWrap>
                      <CdImage src={s.img} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} />
                      <CdCaption>{s.cap}</CdCaption>
                    </CdImageWrap>
                  </CdSlide>
                ))}
              </CdStack>
            </CdFrame>

            <CdControls>
              <CdBtn onClick={goPrev} disabled={idx === 0} aria-label={t("direito.caseCommon.prevAria")}>←</CdBtn>
              <CdProgress>
                <CdFill style={{ width: `${((idx + 1) / steps.length) * 100}%` }} />
              </CdProgress>
              <CdCounter>{pad(idx + 1)} / {pad(steps.length)}</CdCounter>
              <CdBtn onClick={goNext} disabled={idx === steps.length - 1} aria-label={t("direito.caseCommon.nextAria")}>→</CdBtn>
            </CdControls>

            <MetaGrid>
              {meta.map((m, i) => (
                <MetaItem key={i}>
                  <span>{m.label}</span>
                  {m.value}
                </MetaItem>
              ))}
            </MetaGrid>
          </CaseDeck>
        </CaseSplit>
      </CaseInner>
    </CaseSection>
  );
}

// ── Animations ─────────────────────────────────────────────────────────────
const cdiPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// ── Styled ─────────────────────────────────────────────────────────────────
const CaseSection = styled.section`
  background: #fff;
  color: ${C.ink};
  padding: 5rem 2rem 7rem;
  position: relative;
  margin-top: 0;
`;

const CaseInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding-top: 0;
`;

const CaseCounter = styled.p`
  font-family: ${FONT_TITLE};
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  line-height: 1;
`;

const CaseBadge = styled.span`
  font-family: ${FONT_MONO};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: ${C.redTitle};
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(161,15,35,0.4);
  border-radius: 2px;
`;

const CaseBigName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 88px;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: ${C.ink};
  line-height: 1;
  position: relative;
  padding-bottom: 1rem;
  display: inline-block;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 88px;
    height: 4px;
    background: ${C.redTitle};
  }
  @media (max-width: 1100px) { font-size: 64px; }
  @media (max-width: 700px)  { font-size: 48px; }
`;

const Dot = styled.span`
  color: ${C.redTitle};
`;

const CaseSub = styled.p`
  font-family: ${FONT_BODY};
  font-size: 17px;
  max-width: 780px;
  margin: 0 0 3rem;
  text-align: left;
  color: #7a746e;
  line-height: 1.65;
  strong { color: ${C.ink}; font-weight: 600; }
`;

const CaseSplit = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.1fr;
  gap: 3rem;
  align-items: stretch;
  @media (max-width: 1100px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const CaseText = styled.article`
  font-family: ${FONT_BODY};
  display: flex;
  flex-direction: column;
`;

const CtEye = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: ${C.redTitle};
  text-transform: uppercase;
  margin: 0 0 0.65rem;
`;

const CtH = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 1.4rem;
`;

const CtSub = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 1.75rem 0 0.65rem;
  padding-left: 0.85rem;
  border-left: 2px solid ${C.redTitle};
`;

const CtP = styled.p`
  font-size: 14.5px;
  line-height: 1.7;
  color: #7a746e;
  margin: 0 0 0.9rem;
  strong { color: ${C.ink}; font-weight: 600; }
`;

const CtList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: grid;
  gap: 0.65rem;
  li {
    font-size: 13.5px;
    line-height: 1.55;
    color: #7a746e;
    padding-left: 1.25rem;
    position: relative;
    &::before {
      content: "→";
      position: absolute;
      left: 0;
      color: ${C.redTitle};
      font-weight: 700;
    }
    strong { color: ${C.ink}; font-weight: 600; }
  }
`;

const CtFinal = styled.p`
  font-family: ${FONT_MONO};
  font-size: 12px;
  color: ${C.redTitle};
  font-weight: 600;
  letter-spacing: 0.06em;
  margin: auto 0 0;
  padding-top: 1.25rem;
  border-top: 1px dashed rgba(0,0,0,0.15);
`;

const CaseDeck = styled.aside`
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 1100px) { position: relative; top: 0; max-width: 680px; margin: 0 auto; width: 100%; }
`;

const CdFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 60px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08);
`;

const CdStack = styled.div`
  position: absolute;
  inset: 0;
`;

const CdSlide = styled.figure<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(24px)"};
  transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
`;

const CdImageWrap = styled.div`
  position: relative;
  flex: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CdImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: #fff;
`;

const CdCaption = styled.figcaption`
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-family: ${FONT_MONO};
  font-size: 10px;
  letter-spacing: 0.22em;
  color: rgba(0,0,0,0.55);
  text-transform: uppercase;
  z-index: 3;
  background: rgba(255,255,255,0.85);
  padding: 0.3rem 0.55rem;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0.06);
  pointer-events: none;
  &::before {
    content: "●";
    color: ${C.redTitle};
    margin-right: 0.4rem;
    font-size: 8px;
    animation: ${cdiPulse} 2.4s ease-in-out infinite;
  }
`;

const MetaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 1rem;
  text-align: center;

  @media (max-width: 700px) {
    gap: 0.85rem 1rem;
  }
`;

const MetaItem = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 12px;
  font-weight: 600;
  color: ${C.ink};
  padding: 0 0.75rem;

  span {
    display: block;
    font-family: ${FONT_MONO};
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: ${C.redTitle};
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }

  @media (max-width: 700px) {
    padding: 0;
  }
`;

const CdControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CdBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.15);
  color: ${C.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: ${FONT_MONO};
  font-size: 16px;
  flex-shrink: 0;
  &:hover:not(:disabled) {
    background: ${C.redTitle};
    border-color: ${C.redTitle};
    color: #fff;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CdProgress = styled.div`
  flex: 1;
  height: 2px;
  background: rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
`;

const CdFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${C.redTitle};
  transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
`;

const CdCounter = styled.span`
  font-family: ${FONT_MONO};
  font-size: 11px;
  color: #888;
  letter-spacing: 0.16em;
  flex-shrink: 0;
`;
