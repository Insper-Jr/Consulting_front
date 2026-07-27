import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// ── Tokens (mirrors parent page) ──────────────────────────────────────────
const C = {
  redTitle: "#A10F23",
  redCTA: "#C02121",
  redDark: "#691212",
  ink: "#1a1a1a",
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;
const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

// ── Tipos ─────────────────────────────────────────────────────────────────
// Os slides já vêm com os dados sensíveis removidos no próprio arquivo:
// nome do cliente, valores e dados internos foram queimados na imagem.
export type CaseSlide = { id: string; img: string; alt: string; cap: string };

export type CaseShot = {
  id: string; label: string; bar: string;
  img: string; alt: string; capH: string; capT: string;
};

export type CaseSection = {
  title: string;
  body?: React.ReactNode[];
  list?: React.ReactNode[];
};

export type CaseViewProps = {
  id: string;
  name: string;
  /* Sem badge, cai no rótulo traduzido de business.caseUi.badge */
  badge?: string;
  sub: React.ReactNode;
  eyebrow: string;
  headline: string;
  intro: React.ReactNode[];
  sections: CaseSection[];
  closing: string;
  slides: CaseSlide[];
  shots: CaseShot[];
  shotsHeadline: React.ReactNode;
};

// ── Component ─────────────────────────────────────────────────────────────
export default function CaseView({
  id, name, badge, sub, eyebrow, headline,
  intro, sections, closing, slides, shots, shotsHeadline,
}: CaseViewProps) {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);
  const deckRef = useRef<HTMLElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const shotsInViewRef = useRef(false);

  const total = slides.length;
  const totalShots = shots.length;

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
    const sh = shotsRef.current;
    if (!sh || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => { shotsInViewRef.current = e.isIntersecting; },
      { threshold: 0.3 }
    );
    io.observe(sh);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (shotsInViewRef.current) {
        if (e.key === "ArrowLeft")  setSIdx(i => (i - 1 + totalShots) % totalShots);
        else if (e.key === "ArrowRight") setSIdx(i => (i + 1) % totalShots);
        return;
      }
      if (!inViewRef.current) return;
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % total);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [total, totalShots]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const goPrev = () => setIdx(i => Math.max(0, i - 1));
  const goNext = () => setIdx(i => Math.min(total - 1, i + 1));
  const sPrev = () => setSIdx(i => Math.max(0, i - 1));
  const sNext = () => setSIdx(i => Math.min(totalShots - 1, i + 1));

  return (
    <CaseSection id={id}>
      <CaseInner>
        <CaseCounter>
          <CaseBadge>{badge ?? t("business.caseUi.badge")}</CaseBadge>
          <CaseBigName>{name}<Dot>.</Dot></CaseBigName>
        </CaseCounter>

        <CaseSub>{sub}</CaseSub>

        <CaseSplit>
          <CaseText>
            <CtEye>{eyebrow}</CtEye>
            <CtH>{headline}</CtH>
            {intro.map((p, i) => <CtP key={i}>{p}</CtP>)}

            {sections.map((s, i) => (
              <div key={i}>
                <CtSub>{s.title}</CtSub>
                {s.body?.map((p, j) => <CtP key={j}>{p}</CtP>)}
                {s.list && (
                  <CtList>
                    {s.list.map((li, j) => <li key={j}>{li}</li>)}
                  </CtList>
                )}
              </div>
            ))}

            <CtFinal>{closing}</CtFinal>
          </CaseText>

          <CaseDeck ref={deckRef} aria-label={t("business.caseUi.deckAria", { name })}>
            <CdFrame>
              <CdStack>
                {slides.map((s, i) => (
                  <CdSlide key={s.id} $active={idx === i}>
                    <CdiImage src={s.img} alt={s.alt} loading="lazy" />
                    <CdiCaption>{s.cap}</CdiCaption>
                  </CdSlide>
                ))}
              </CdStack>
            </CdFrame>

            <CdControls>
              <CdBtn onClick={goPrev} disabled={idx === 0} aria-label={t("business.caseUi.prev")}>←</CdBtn>
              <CdProgress>
                <CdFill style={{ width: `${((idx + 1) / total) * 100}%` }} />
              </CdProgress>
              <CdCounter>{pad(idx + 1)} / {pad(total)}</CdCounter>
              <CdBtn onClick={goNext} disabled={idx === total - 1} aria-label={t("business.caseUi.next")}>→</CdBtn>
            </CdControls>

            {/* Mini deck · análises do projeto */}
            <ShotsMini ref={shotsRef} aria-label={t("business.caseUi.shotsAria", { name })}>
              <ShotsMiniHead>
                <ShotsMiniH>{shotsHeadline}</ShotsMiniH>
              </ShotsMiniHead>
              <ShotsMiniFrame>
                <ShotsMiniStack>
                  {shots.map((s, i) => (
                    <ShotsMiniSlide key={s.id} $active={sIdx === i}>
                      <ShotsMiniBar>
                        <Dot1 /><Dot2 /><Dot3 /><b>{s.bar}</b>
                      </ShotsMiniBar>
                      <ShotsMiniImgFrame>
                        <ShotsMiniImg src={s.img} alt={s.alt} loading="lazy" />
                      </ShotsMiniImgFrame>
                      <ShotsMiniCap><span>{s.capH}</span> · {s.capT}</ShotsMiniCap>
                    </ShotsMiniSlide>
                  ))}
                </ShotsMiniStack>
              </ShotsMiniFrame>
              <ShotsMiniControls>
                <CdBtn onClick={sPrev} disabled={sIdx === 0} aria-label={t("business.caseUi.prev")}>←</CdBtn>
                <ShotsMiniDots>
                  {shots.map((s, i) => (
                    <ShotsMiniDot
                      key={s.id}
                      $active={sIdx === i}
                      onClick={() => setSIdx(i)}
                      aria-label={t("business.caseUi.analysisAria", { index: i + 1 })}
                    >
                      {s.label}
                    </ShotsMiniDot>
                  ))}
                </ShotsMiniDots>
                <CdCounter>{pad(sIdx + 1)} / {pad(totalShots)}</CdCounter>
                <CdBtn onClick={sNext} disabled={sIdx === totalShots - 1} aria-label={t("business.caseUi.next")}>→</CdBtn>
              </ShotsMiniControls>
            </ShotsMini>
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

  @media (max-width: 700px) { padding: 3rem 1.25rem 4rem; }
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
  font-size: 72px;
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
  @media (max-width: 1100px) { font-size: 56px; }
  @media (max-width: 700px)  { font-size: 40px; }
  @media (max-width: 400px)  { font-size: 32px; }
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

// ── Deck ──────────────────────────────────────────────────────────────────
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
  background: ${C.ink};
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
  flex-direction: column;
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(24px)"};
  transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
`;

const CdiImage = styled.img`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  background: #fff;
`;

const CdiCaption = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.65rem 0.95rem;
  background: linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.78) 50%, rgba(26,26,26,0.94) 100%);
  font-family: ${FONT_MONO};
  font-size: 10.5px;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
  z-index: 2;
  pointer-events: none;
`;

// ── Controls ──────────────────────────────────────────────────────────────
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

// ── Mini deck (análises) ──────────────────────────────────────────────────
const ShotsMini = styled.div`
  margin-top: 2rem;
  padding-top: 1.6rem;
  border-top: 1px dashed rgba(0,0,0,0.16);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const ShotsMiniHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ShotsMiniH = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  line-height: 1.18;
  margin: 0;
  em {
    font-style: italic;
    color: ${C.redTitle};
    font-weight: 700;
  }
`;

const ShotsMiniFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #1a1a1a;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 14px 36px -16px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.07);
`;

const ShotsMiniImgFrame = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: block;
  background: #fff;
`;

const ShotsMiniStack = styled.div`
  position: absolute;
  inset: 0;
`;

const ShotsMiniSlide = styled.figure<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(20px)"};
  transition: opacity 0.5s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
`;

const ShotsMiniBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.32rem;
  padding: 0.38rem 0.6rem;
  background: #2a2a2a;
  font-family: ${FONT_MONO};
  font-size: 9px;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.05em;
  flex: 0 0 auto;
  b {
    margin-left: 0.45rem;
    font-weight: 600;
    color: rgba(255,255,255,0.78);
  }
`;

const Dot1 = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff5f57;
  display: block;
  flex: 0 0 auto;
`;

const Dot2 = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #febc2e;
  display: block;
  flex: 0 0 auto;
`;

const Dot3 = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #28c840;
  display: block;
  flex: 0 0 auto;
`;

const ShotsMiniImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  background: #fff;
`;

const ShotsMiniCap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.55rem 0.75rem;
  background: linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.85) 60%, rgba(26,26,26,0.96) 100%);
  font-family: ${FONT_MONO};
  font-size: 10px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.78);
  span {
    font-family: ${FONT_TITLE};
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.005em;
  }
`;

const ShotsMiniControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

const ShotsMiniDots = styled.div`
  flex: 1;
  display: flex;
  gap: 0.32rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ShotsMiniDot = styled.button<{ $active: boolean }>`
  appearance: none;
  background: ${p => p.$active ? "#1a1a1a" : "transparent"};
  border: 1px solid ${p => p.$active ? "#1a1a1a" : "rgba(0,0,0,0.14)"};
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  font-family: ${FONT_MONO};
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${p => p.$active ? "#fff" : "rgba(0,0,0,0.55)"};
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    border-color: ${p => p.$active ? "#1a1a1a" : "rgba(0,0,0,0.32)"};
    color: ${p => p.$active ? "#fff" : "#1a1a1a"};
  }
`;
