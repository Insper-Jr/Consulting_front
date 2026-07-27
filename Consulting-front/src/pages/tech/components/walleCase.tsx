import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";
import type { TFunction } from "i18next";

import slide01 from "../../../assets/walle/slide-01.png";
import slide02 from "../../../assets/walle/slide-02.png";
import slide03 from "../../../assets/walle/slide-03.png";
import slide04 from "../../../assets/walle/slide-04.png";
import slide05 from "../../../assets/walle/slide-05.png";
import slide06 from "../../../assets/walle/slide-06.png";
import slide07 from "../../../assets/walle/slide-07.png";
import slide08 from "../../../assets/walle/slide-08.png";
import slide09 from "../../../assets/walle/slide-09.png";

// ── Tokens (mirrors parent page) ──────────────────────────────────────────
import { RED_TITLE, RED, RED_DARK, DARK } from "../../../styles/tokens";

const C = {
  redTitle: RED_TITLE,
  redCTA: RED,
  redDark: RED_DARK,
  ink: DARK,
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;
const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

// ── Slide deck data ─────────────────────────────────────────────────────────
function buildSlides(t: TFunction): { src: string; label: string; portrait?: boolean }[] {
  return [
    { src: slide01, label: t("tech.cases.walle.slides.shots.shot01.alt") },
    { src: slide02, label: t("tech.cases.walle.slides.shots.shot02.alt") },
    { src: slide03, label: t("tech.cases.walle.slides.shots.shot03.alt") },
    { src: slide04, label: t("tech.cases.walle.slides.shots.shot04.alt") },
    { src: slide05, label: t("tech.cases.walle.slides.shots.shot05.alt") },
    { src: slide06, label: t("tech.cases.walle.slides.shots.shot06.alt") },
    { src: slide07, label: t("tech.cases.walle.slides.shots.shot07.alt") },
    { src: slide08, label: t("tech.cases.walle.slides.shots.shot08.alt") },
    { src: slide09, label: t("tech.cases.walle.slides.shots.shot09.alt"), portrait: true },
  ];
}
const TOTAL_SLIDES = 9;

// ── Component ──────────────────────────────────────────────────────────────
export default function WalleCase() {
  const { t } = useTranslation();
  const SLIDES = buildSlides(t);
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
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % TOTAL_SLIDES);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const goPrev = () => setIdx(i => Math.max(0, i - 1));
  const goNext = () => setIdx(i => Math.min(TOTAL_SLIDES - 1, i + 1));

  return (
    <CaseSection id="case-walle">
      <CaseInner>
        <CaseCounter>
          <CaseBadge>{t("tech.cases.common.badge")}</CaseBadge>
          <CaseBigName>{t("tech.cases.walle.name")}<Dot>.</Dot></CaseBigName>
        </CaseCounter>

        <CaseSub>
          <Trans i18nKey="tech.cases.walle.sub" components={{ strong: <strong /> }} />
        </CaseSub>

        <CaseSplit>
          <CaseText>
            <CtEye>{t("tech.cases.common.project")}</CtEye>
            <CtH>{t("tech.cases.walle.why")}</CtH>
            <CtP>
              <Trans i18nKey="tech.cases.walle.p1" components={{ strong: <strong /> }} />
            </CtP>

            <CtSub>{t("tech.cases.common.howMade")}</CtSub>
            <CtP>
              <Trans i18nKey="tech.cases.walle.p2" components={{ strong: <strong /> }} />
            </CtP>
            <CtP>
              <Trans i18nKey="tech.cases.walle.p3" components={{ strong: <strong /> }} />
            </CtP>

            <CtSub>{t("tech.cases.common.strategy")}</CtSub>
            <CtList>
              {(t("tech.cases.walle.list", { returnObjects: true }) as string[]).map((_item, i) => (
                <li key={i}><Trans i18nKey={`tech.cases.walle.list.${i}`} components={{ strong: <strong /> }} /></li>
              ))}
            </CtList>

            <CtFinal>{t("tech.cases.walle.final")}</CtFinal>
          </CaseText>

          <CaseDeck ref={deckRef} aria-label={t("tech.cases.walle.deckAriaLabel")}>
            <CdFrame>
              <CdStack>
                {SLIDES.map((s, i) => (
                  <CdSlide key={i} $active={idx === i} aria-hidden={idx !== i}>
                    <CdImg
                      src={s.src}
                      alt={s.label}
                      loading={i === 0 ? "eager" : "lazy"}
                      $portrait={!!s.portrait}
                    />
                  </CdSlide>
                ))}
              </CdStack>
            </CdFrame>

            <CdControls>
              <CdBtn onClick={goPrev} disabled={idx === 0} aria-label={t("tech.cases.common.prev")}>←</CdBtn>
              <CdProgress>
                <CdFill style={{ width: `${((idx + 1) / TOTAL_SLIDES) * 100}%` }} />
              </CdProgress>
              <CdCounter>{pad(idx + 1)} / {pad(TOTAL_SLIDES)}</CdCounter>
              <CdBtn onClick={goNext} disabled={idx === TOTAL_SLIDES - 1} aria-label={t("tech.cases.common.next")}>→</CdBtn>
            </CdControls>
          </CaseDeck>
        </CaseSplit>
      </CaseInner>
    </CaseSection>
  );
}

// ── Styled: case header ────────────────────────────────────────────────────
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
  color: #333;
  line-height: 1.65;
  strong { color: ${C.ink}; font-weight: 600; }
`;

// ── Split ─────────────────────────────────────────────────────────────────
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
  color: #444;
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
    color: #555;
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

// ── Deck (image carousel) ──────────────────────────────────────────────────
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
  aspect-ratio: 16 / 9;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 60px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06);
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
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(24px)"};
  transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
`;

const CdImg = styled.img<{ $portrait?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  /* slides paisagem têm fundo branco; o mock retrato ganha fundo neutro nas laterais */
  background: ${p => p.$portrait ? "#f3efe9" : "#fff"};
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
