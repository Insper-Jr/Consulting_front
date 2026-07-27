import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";
import type { TFunction } from "i18next";

import slideContexto from "../../../assets/medicina/slides/04-contexto.jpg";
import slideDesafios from "../../../assets/medicina/slides/07-desafios.jpg";
import shotHome      from "../../../assets/medicina/slides/12-home.jpg";
import shotListagem  from "../../../assets/medicina/slides/13-listagem.jpg";
import shotElab      from "../../../assets/medicina/slides/14-elaboracao.jpg";
import shotAdmin     from "../../../assets/medicina/slides/15-admin.jpg";

// ── Tokens (mirrors parent page) ──────────────────────────────────────────
import { RED_TITLE, RED, RED_DARK, DARK, FONT_TITLE, FONT_BODY } from "../../../styles/tokens";

const C = {
  redTitle: RED_TITLE,
  redCTA: RED,
  redDark: RED_DARK,
  ink: DARK,
};

const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

// ── Slide deck data ─────────────────────────────────────────────────────────
// Slots sem `img` renderizam placeholder até receber a imagem.
function buildSlides(t: TFunction): Array<{ id: string; img?: string; alt: string; cap: string }> {
  return [
    { id: "contexto", img: slideContexto, alt: t("tech.cases.medicina.slides.contexto.alt"), cap: t("tech.cases.medicina.slides.contexto.cap") },
    { id: "desafios", img: slideDesafios, alt: t("tech.cases.medicina.slides.desafios.alt"), cap: t("tech.cases.medicina.slides.desafios.cap") },
  ];
}
const TOTAL_SLIDES = 2;

// ── Blurs sobre dados sensíveis da Página inicial ─────────────────────────
// Posições em % do frame 16:9 (1334x750). width/height opcionais sobrescrevem
// o tamanho padrão (definido em BlurMask) para áreas maiores como o logo.
const HOME_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Logo + nome da empresa no topo da sidebar (x=272-414, y=150-193)
  { top: "20.0%", left: "20.4%", width: "10.5%", height: "5.7%" },
  // 5 números grandes dos cards de KPI (centros y=403, dígitos ~10x14px)
  { top: "52.2%", left: "32.8%" }, // 5  — Próximos do Vencimento
  { top: "52.2%", left: "42.6%" }, // 1  — Documentos Vencidos
  { top: "52.2%", left: "52.5%" }, // 0  — Em Revisão
  { top: "52.2%", left: "62.4%" }, // 0  — Em Aprovação
  { top: "52.2%", left: "72.3%" }, // 9  — Documentos Aprovados
];

// ── Blurs sobre os 3 cards da Listagem de Documentos ──────────────────────
// Posições per-card (não usa offset uniforme): cada card tem layout próprio
// porque valores como "Cirurgia"/"Enfermagem"/"Final" empurram "Unidade:"
// e datas para posições diferentes. Coordenadas medidas via análise de
// clusters de pixels no slide source (1334×750).
const LISTAGEM_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Logo + nome da empresa no topo da sidebar (mesma proteção do slide Home).
  // Em slide-13 a sidebar fica em x=224-375 (mais à esquerda que slide-12).
  { top: "18.67%", left: "16.79%", width: "11.32%", height: "8.00%" },
  // Card 1 — "final" / "Cirurgia" / "04/11/2025"
  { top: "61.6%", left: "30.36%", width: "2.85%",  height: "2.93%" }, // título
  { top: "64.0%", left: "30.36%", width: "12.14%", height: "2.00%" }, // subtítulo
  { top: "66.93%", left: "32.01%", width: "2.62%", height: "1.73%" }, // área (Cirurgia)
  { top: "66.93%", left: "37.71%", width: "3.67%", height: "1.73%" }, // unidade (Clinica ABC)
  { top: "69.47%", left: "33.43%", width: "3.38%", height: "1.73%" }, // início (04/11/2025)
  { top: "69.47%", left: "40.93%", width: "4.20%", height: "1.73%" }, // vencimento (05/12/2025)
  // Card 2 — "versoes" / "Enfermagem" / "11/11/2025"
  { top: "61.6%", left: "47.83%", width: "5.02%",  height: "2.93%" }, // título
  { top: "64.0%", left: "47.83%", width: "3.52%",  height: "2.00%" }, // subtítulo (Manual)
  { top: "66.93%", left: "49.85%", width: "3.82%", height: "1.73%" }, // área (Enfermagem)
  { top: "66.93%", left: "56.60%", width: "3.75%", height: "1.73%" }, // unidade
  { top: "69.47%", left: "50.75%", width: "3.45%", height: "1.73%" }, // início (11/11/2025)
  { top: "69.47%", left: "58.50%", width: "3.97%", height: "1.73%" }, // vencimento
  // Card 3 — "vencido" / "Final" / "27/11/2025"
  { top: "61.6%", left: "65.37%", width: "5.10%",  height: "2.93%" }, // título
  { top: "64.0%", left: "65.37%", width: "9.82%",  height: "2.00%" }, // subtítulo
  { top: "66.93%", left: "67.24%", width: "1.72%", height: "1.73%" }, // área (Final)
  { top: "66.93%", left: "72.04%", width: "3.75%", height: "1.73%" }, // unidade
  { top: "69.47%", left: "68.37%", width: "3.38%", height: "1.73%" }, // início (27/11/2025)
  { top: "69.47%", left: "76.10%", width: "3.82%", height: "1.73%" }, // vencimento
];

// ── Blur sobre logo+nome no slide Elaboração ──────────────────────────────
// Sidebar em slide-14 fica em x=215-372, y=120-180.
const ELAB_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  { top: "16.00%", left: "16.12%", width: "11.77%", height: "8.00%" },
];

// ── Blur sobre logo+nome no slide Administração ───────────────────────────
// Sidebar em slide-15 fica em x=220-372, y=134-176 (logo+nome).
const ADMIN_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  { top: "17.87%", left: "16.49%", width: "11.39%", height: "5.60%" },
];

// ── Shots data (telas reais — adicionar posteriormente) ───────────────────
function buildShots(t: TFunction): Array<{ id: string; label: string; bar: string; img?: string; alt: string; capH: string; capT: string }> {
  const imgs: Record<string, string> = { home: shotHome, listagem: shotListagem, elaboracao: shotElab, admin: shotAdmin };
  return ["home", "listagem", "elaboracao", "admin"].map((id) => ({
    id,
    label: t(`tech.cases.medicina.shots.${id}.label`),
    bar: t(`tech.cases.medicina.shots.${id}.bar`),
    img: imgs[id],
    alt: t(`tech.cases.medicina.shots.${id}.alt`),
    capH: t(`tech.cases.medicina.shots.${id}.capH`),
    capT: t(`tech.cases.medicina.shots.${id}.capT`),
  }));
}
const TOTAL_SHOTS = 4;

// ── Component ──────────────────────────────────────────────────────────────
export default function MedCase() {
  const { t } = useTranslation();
  const SLIDES = buildSlides(t);
  const SHOTS = buildShots(t);
  const [idx, setIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);
  const deckRef = useRef<HTMLElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const shotsInViewRef = useRef(false);

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
        if (e.key === "ArrowLeft")  setSIdx(i => (i - 1 + TOTAL_SHOTS) % TOTAL_SHOTS);
        else if (e.key === "ArrowRight") setSIdx(i => (i + 1) % TOTAL_SHOTS);
        return;
      }
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
  const sPrev = () => setSIdx(i => Math.max(0, i - 1));
  const sNext = () => setSIdx(i => Math.min(TOTAL_SHOTS - 1, i + 1));

  return (
    <CaseSection id="case-medicina">
      <CaseInner>
        <CaseCounter>
          <CaseBadge>{t("tech.cases.common.badge")}</CaseBadge>
          <CaseBigName>{t("tech.cases.medicina.name")}<Dot>.</Dot></CaseBigName>
        </CaseCounter>

        <CaseSub>
          <Trans i18nKey="tech.cases.medicina.sub" components={{ strong: <strong /> }} />
        </CaseSub>

        <CaseSplit>
          <CaseText>
            <CtEye>{t("tech.cases.common.project")}</CtEye>
            <CtH>{t("tech.cases.medicina.why")}</CtH>
            <CtP>
              <Trans i18nKey="tech.cases.medicina.p1" components={{ strong: <strong /> }} />
            </CtP>

            <CtSub>{t("tech.cases.common.howMade")}</CtSub>
            <CtP>
              <Trans i18nKey="tech.cases.medicina.p2" components={{ strong: <strong /> }} />
            </CtP>
            <CtP>
              <Trans i18nKey="tech.cases.medicina.p3" components={{ strong: <strong /> }} />
            </CtP>

            <CtSub>{t("tech.cases.common.strategy")}</CtSub>
            <CtList>
              {(t("tech.cases.medicina.list", { returnObjects: true }) as string[]).map((_item, i) => (
                <li key={i}><Trans i18nKey={`tech.cases.medicina.list.${i}`} components={{ strong: <strong /> }} /></li>
              ))}
            </CtList>

            <CtFinal>{t("tech.cases.medicina.final")}</CtFinal>
          </CaseText>

          <CaseDeck ref={deckRef} aria-label={t("tech.cases.medicina.deckAriaLabel")}>
            <CdFrame>
              <CdStack>
                {SLIDES.map((s, i) => (
                  <CdSlide key={s.id} $active={idx === i}>
                    {s.img ? (
                      <CdiImage src={s.img} alt={s.alt} loading="lazy" />
                    ) : (
                      <SlidePlaceholder aria-label={s.alt}>
                        <PhTag>{s.cap}</PhTag>
                        <PhHint>{t("tech.cases.medicina.slidePlaceholderHint")}</PhHint>
                      </SlidePlaceholder>
                    )}
                    <CdiCaption>{s.cap}</CdiCaption>
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

            {/* Mini deck · telas reais */}
            <ShotsMini ref={shotsRef} aria-label={t("tech.cases.medicina.shotsAriaLabel")}>
              <ShotsMiniHead>
                <ShotsMiniH><Trans i18nKey="tech.cases.medicina.shotsHeading" components={{ em: <em /> }} /></ShotsMiniH>
              </ShotsMiniHead>
              <ShotsMiniFrame>
                <ShotsMiniStack>
                  {SHOTS.map((s, i) => (
                    <ShotsMiniSlide key={s.id} $active={sIdx === i}>
                      <ShotsMiniBar>
                        <Dot1 /><Dot2 /><Dot3 /><b>{s.bar}</b>
                      </ShotsMiniBar>
                      <ShotsMiniImgFrame>
                        {s.img ? (
                          <ShotsMiniImg src={s.img} alt={s.alt} loading="lazy" />
                        ) : (
                          <ShotPlaceholder aria-label={s.alt}>
                            <PhTagSm>{s.capH}</PhTagSm>
                            <PhHintSm>{t("tech.cases.medicina.slidePlaceholderHint")}</PhHintSm>
                          </ShotPlaceholder>
                        )}
                        {s.id === "home" && (
                          <BlurOverlay aria-hidden="true">
                            {HOME_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "listagem" && (
                          <BlurOverlay aria-hidden="true">
                            {LISTAGEM_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "elaboracao" && (
                          <BlurOverlay aria-hidden="true">
                            {ELAB_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "admin" && (
                          <BlurOverlay aria-hidden="true">
                            {ADMIN_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                      </ShotsMiniImgFrame>
                      <ShotsMiniCap><span>{s.capH}</span> · {s.capT}</ShotsMiniCap>
                    </ShotsMiniSlide>
                  ))}
                </ShotsMiniStack>
              </ShotsMiniFrame>
              <ShotsMiniControls>
                <CdBtn onClick={sPrev} disabled={sIdx === 0} aria-label={t("tech.cases.common.prev")}>←</CdBtn>
                <ShotsMiniDots>
                  {SHOTS.map((s, i) => (
                    <ShotsMiniDot
                      key={s.id}
                      $active={sIdx === i}
                      onClick={() => setSIdx(i)}
                      aria-label={t("tech.cases.common.screenAriaLabel", { n: i + 1 })}
                    >
                      {s.label}
                    </ShotsMiniDot>
                  ))}
                </ShotsMiniDots>
                <CdCounter>{pad(sIdx + 1)} / {pad(TOTAL_SHOTS)}</CdCounter>
                <CdBtn onClick={sNext} disabled={sIdx === TOTAL_SHOTS - 1} aria-label={t("tech.cases.common.next")}>→</CdBtn>
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
  @media (max-width: 400px)  { font-size: 38px; }
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

// ── Split (updated to align-items: stretch + flex CaseText) ───────────────
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

// ── Image slide content ───────────────────────────────────────────────────
const CdiImage = styled.img`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

// ── Placeholder (slot vazio enquanto não há imagem) ───────────────────────
const SlidePlaceholder = styled.div`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  background:
    radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 65%),
    repeating-linear-gradient(135deg, #1f1f1f 0, #1f1f1f 14px, #1a1a1a 14px, #1a1a1a 28px);
`;

const PhTag = styled.span`
  font-family: ${FONT_MONO};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  border: 1px dashed rgba(255,255,255,0.28);
  padding: 0.5rem 0.95rem;
  border-radius: 2px;
`;

const PhHint = styled.span`
  font-family: ${FONT_MONO};
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
`;

const ShotPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background:
    radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%),
    repeating-linear-gradient(135deg, #1f1f1f 0, #1f1f1f 12px, #1a1a1a 12px, #1a1a1a 24px);
`;

const PhTagSm = styled.span`
  font-family: ${FONT_MONO};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  border: 1px dashed rgba(255,255,255,0.26);
  padding: 0.4rem 0.75rem;
  border-radius: 2px;
`;

const PhHintSm = styled.span`
  font-family: ${FONT_MONO};
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
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

// ── Shots mini deck (real screenshots) ────────────────────────────────────
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
  color: #1a1a18;
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
  background: #1a1a18;
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
  object-fit: cover;
  object-position: top center;
  display: block;
  background: #fff;
`;

// Wrapper alinhado à imagem real (16:9, top-left): permite posicionar
// os blurs em % relativas à imagem original sem distorção do bar superior.
const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  pointer-events: none;
  z-index: 1;
`;

const BlurMask = styled.div`
  position: absolute;
  width: 2.2%;
  height: 3.2%;
  background: rgba(225, 230, 236, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 2px;
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
  background: ${p => p.$active ? "#1a1a18" : "transparent"};
  border: 1px solid ${p => p.$active ? "#1a1a18" : "rgba(0,0,0,0.14)"};
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
    border-color: ${p => p.$active ? "#1a1a18" : "rgba(0,0,0,0.32)"};
    color: ${p => p.$active ? "#fff" : "#1a1a18"};
  }
`;
