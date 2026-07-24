import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation, Trans } from "react-i18next";

import {
  RED, BG_CREAM, DARK, MUTED,
  FONT_TITLE, FONT_BODY,
  SPRING, TYPE, SPACING,
} from "./tokens";

const FONT_MONO = `ui-monospace, "SF Mono", Menlo, monospace`;

/* ── Slide imports ───────────────────────────────────────────────────────── */
import capa from "../../../assets/shipping/capa.png";
import slide01 from "../../../assets/shipping/slide-01.png";
import slide02 from "../../../assets/shipping/slide-02.png";
import slide03 from "../../../assets/shipping/slide-03.png";
import slide04 from "../../../assets/shipping/slide-04.png";
import slide05 from "../../../assets/shipping/slide-05.png";
import slide06 from "../../../assets/shipping/slide-06.png";
import slide07 from "../../../assets/shipping/slide-07.png";
import slide08 from "../../../assets/shipping/slide-08.png";
import slide09 from "../../../assets/shipping/slide-09.png";
import slide10 from "../../../assets/shipping/slide-10.png";
import slide11 from "../../../assets/shipping/slide-11.png";
import slide12 from "../../../assets/shipping/slide-12.png";
import slide13 from "../../../assets/shipping/slide-13.png";
import slide14 from "../../../assets/shipping/slide-14.png";
import slide15 from "../../../assets/shipping/slide-15.png";
import slide16 from "../../../assets/shipping/slide-16.png";
import slide17 from "../../../assets/shipping/slide-17.png";
import slide18 from "../../../assets/shipping/slide-18.png";
import slide19 from "../../../assets/shipping/slide-19.png";
import slide20 from "../../../assets/shipping/slide-20.png";
import slide21 from "../../../assets/shipping/slide-21.png";
import slide22 from "../../../assets/shipping/slide-22.png";

/* Imagens fixas — as legendas (cap) vêm da tradução (i18n) */
const SLIDE_IMAGES = [
  slide01, slide02, slide03, slide04, slide05, slide06, slide07,
  slide08, slide09, slide10, slide11, slide12, slide13, slide14,
  slide15, slide16, slide17, slide18, slide19, slide20, slide21, slide22,
];
const TOTAL = SLIDE_IMAGES.length;

/* ── Keyframes ───────────────────────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
`;
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;


/* ════════════════════════════════════════════════════════════════════════
   DEFAULT EXPORT
   ════════════════════════════════════════════════════════════════════════ */

export default function ProcessosCases() {
  const [open, setOpen] = useState(false);
  const savedY = useRef(0);

  const handleOpen = () => {
    savedY.current = window.scrollY;
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <CasesSection onOpen={handleOpen} />
      {open && <ShippingDetail onBack={handleClose} savedScroll={savedY.current} />}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CASES SECTION — card único centralizado
   ════════════════════════════════════════════════════════════════════════ */

function CasesSection({ onOpen }: { onOpen: () => void }) {
  const { t } = useTranslation();

  return (
    <Section id="cases">
      <Inner>
        <SectionHeader>
          <Eyebrow>{t("processos.case.eyebrow")}</Eyebrow>
          <SectionH2>
            {t("processos.case.headingPre")} <em>{t("processos.case.headingItalic")}</em>
          </SectionH2>
          <RedBar />
          <SectionLead>
            {t("processos.case.lead")}
          </SectionLead>
        </SectionHeader>

        <CardRow>
          <CaseCard
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && onOpen()}
            aria-label={t("processos.case.openAriaLabel")}
          >
            <CardCover>
              <CardImg
                src={capa}
                alt={t("processos.case.coverAlt")}
                loading="lazy"
              />
              <CardOverlay />
              <CardBadge>{t("processos.case.badge")}</CardBadge>
              <CardArrow aria-hidden="true">→</CardArrow>
            </CardCover>

            <CardBody>
              <CardTag>{t("processos.case.tag")}</CardTag>
              <CardTitle>{t("processos.case.title")}</CardTitle>
              <CardDesc>
                {t("processos.case.desc")}
              </CardDesc>
              <CardFooter>
                <CardMeta>{t("processos.case.meta")}</CardMeta>
                <CardCta>{t("processos.case.cta")}</CardCta>
              </CardFooter>
            </CardBody>
          </CaseCard>
        </CardRow>
      </Inner>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SHIPPING DETAIL
   Rende como overlay fixo (position: fixed, inset: 0) que cobre toda a
   viewport. Scroll próprio — a página por baixo fica congelada.
   ════════════════════════════════════════════════════════════════════════ */

function ShippingDetail({ onBack, savedScroll }: { onBack: () => void; savedScroll: number }) {
  const { t } = useTranslation();
  const slideCaptions = t("processos.case.slides", { returnObjects: true }) as string[];
  const SLIDES = SLIDE_IMAGES.map((img, i) => ({ img, cap: slideCaptions[i] }));

  const [idx,  setIdx]  = useState(0);
  const [full, setFull] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goPrev = () => setIdx(i => Math.max(0, i - 1));
  const goNext = () => setIdx(i => Math.min(TOTAL - 1, i + 1));
  const pad    = (n: number) => String(n).padStart(2, "0");

  /*
    1. Scroll-lock: position:fixed + top negativo preserva a posição da página.
    2. History: pushState cria entrada extra no histórico para interceptar
       o gesto/botão "voltar" do browser (popstate) e fechar o overlay
       em vez de navegar para outra rota.
  */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top      = `-${savedScroll}px`;
    document.body.style.width    = "100%";

    history.pushState({ caseOverlay: true }, "");
    let closedByPopState = false;
    const handlePop = () => { closedByPopState = true; onBack(); };
    window.addEventListener("popstate", handlePop);

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.width    = "";
      window.scrollTo({ top: savedScroll, behavior: "instant" });
      window.removeEventListener("popstate", handlePop);
      // replaceState remove a entrada extra silenciosamente — sem disparar
      // popstate, sem o React Router interpretar como navegação de rota.
      // (history.back() dispararia popstate e o React Router iria para a homepage)
      if (!closedByPopState) history.replaceState(null, document.title, window.location.href);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")            goPrev();
      else if (e.key === "ArrowRight")      goNext();
      else if (e.key === "Escape" && full)  setFull(false);
      else if (e.key === "Escape" && !full) onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full, onBack]);

  useEffect(() => {
    thumbRefs.current[idx]?.scrollIntoView({
      behavior: "smooth", block: "nearest", inline: "center",
    });
  }, [idx]);

  return (
    <>
      {/* Fullscreen slide */}
      {full && (
        <Fullscreen onClick={() => setFull(false)}>
          <FullImg src={SLIDES[idx].img} alt={SLIDES[idx].cap} />
          <FullClose onClick={() => setFull(false)} aria-label={t("processos.case.fullCloseAria")}>✕</FullClose>
          <FullNav onClick={e => e.stopPropagation()}>
            <FullNavBtn onClick={goPrev} disabled={idx === 0} aria-label={t("processos.case.prevAria")}>←</FullNavBtn>
            <FullCounter>{pad(idx + 1)} / {pad(TOTAL)}</FullCounter>
            <FullNavBtn onClick={goNext} disabled={idx === TOTAL - 1} aria-label={t("processos.case.nextAria")}>→</FullNavBtn>
          </FullNav>
        </Fullscreen>
      )}

      {/* Overlay: cobre 100% da viewport */}
      <Overlay>

        {/* Topbar: não scrollável, sempre visível */}
        <OverlayTopBar>
          <BackBtn onClick={onBack} aria-label={t("processos.case.backAriaLabel")}>
            {t("processos.case.backBtn")}
          </BackBtn>
        </OverlayTopBar>

        {/* Corpo com scroll independente */}
        <OverlayBody>
          <OverlayInner>

            {/* Cabeçalho */}
            <DetailHeader>
              <DetailBadge>{t("processos.case.detailBadge")}</DetailBadge>
              <DetailTitle>
                {t("processos.case.title")}<TitleDot>.</TitleDot>
              </DetailTitle>
              <DetailIntro>
                <Trans i18nKey="processos.case.detailIntro" components={{ strong: <strong /> }} />
              </DetailIntro>
            </DetailHeader>

            {/* Split texto | deck */}
            <DetailSplit>

              <TextCol>
                <CtEyebrow>{t("processos.case.ctEyebrow")}</CtEyebrow>
                <CtTitle>{t("processos.case.ctTitle")}</CtTitle>
                <CtBody>
                  <Trans i18nKey="processos.case.ctBody1" components={{ strong: <strong /> }} />
                </CtBody>

                <CtLabel>{t("processos.case.ctLabelHow")}</CtLabel>
                <CtBody>
                  <Trans i18nKey="processos.case.ctBody2" components={{ strong: <strong /> }} />
                </CtBody>
                <CtBody>
                  {t("processos.case.ctBody3")}
                </CtBody>

                <CtLabel>{t("processos.case.ctLabelResults")}</CtLabel>
                <CtList>
                  <li><Trans i18nKey="processos.case.ctListItem1" components={{ strong: <strong /> }} /></li>
                  <li><Trans i18nKey="processos.case.ctListItem2" components={{ strong: <strong /> }} /></li>
                  <li><Trans i18nKey="processos.case.ctListItem3" components={{ strong: <strong /> }} /></li>
                  <li><Trans i18nKey="processos.case.ctListItem4" components={{ strong: <strong /> }} /></li>
                  <li><Trans i18nKey="processos.case.ctListItem5" components={{ strong: <strong /> }} /></li>
                </CtList>

                <CtTagLine>{t("processos.case.ctTagLine")}</CtTagLine>
              </TextCol>

              {/* Deck: largura fixa, sticky dentro do scroll do overlay */}
              <DeckCol>
                <DeckFrame
                  onClick={() => setFull(true)}
                  title={t("processos.case.deckFrameTitle")}
                  aria-label={t("processos.case.deckFrameAria")}
                >
                  <DeckStack>
                    {SLIDES.map((s, i) => (
                      <DeckSlide key={i} $active={idx === i}>
                        <DeckImg
                          src={s.img}
                          alt={s.cap}
                          loading={i <= 1 ? "eager" : "lazy"}
                        />
                        <DeckCaption>{s.cap}</DeckCaption>
                      </DeckSlide>
                    ))}
                  </DeckStack>
                  <ExpandHint aria-hidden="true">{t("processos.case.expandHint")}</ExpandHint>
                </DeckFrame>

                <DeckControls>
                  <NavBtn onClick={goPrev} disabled={idx === 0} aria-label={t("processos.case.prevAria")}>←</NavBtn>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${((idx + 1) / TOTAL) * 100}%` }} />
                  </ProgressBar>
                  <SlideCounter>{pad(idx + 1)} / {pad(TOTAL)}</SlideCounter>
                  <NavBtn onClick={goNext} disabled={idx === TOTAL - 1} aria-label={t("processos.case.nextAria")}>→</NavBtn>
                </DeckControls>

                <ThumbStrip role="list" aria-label={t("processos.case.thumbStripAria")}>
                  {SLIDES.map((s, i) => (
                    <ThumbBtn
                      key={i}
                      ref={el => { thumbRefs.current[i] = el; }}
                      $active={idx === i}
                      onClick={() => setIdx(i)}
                      aria-label={s.cap}
                      aria-pressed={idx === i}
                      role="listitem"
                    >
                      <ThumbImg src={s.img} alt="" loading="lazy" />
                    </ThumbBtn>
                  ))}
                </ThumbStrip>
              </DeckCol>

            </DetailSplit>
          </OverlayInner>
        </OverlayBody>
      </Overlay>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STYLED — Section
   ════════════════════════════════════════════════════════════════════════ */

const Section = styled.section`
  background: ${BG_CREAM};
  padding: ${SPACING.sectionY} 0 48px;
`;

const Inner = styled.div`
  max-width: ${SPACING.innerMaxWidth};
  margin: 0 auto;
  padding: 0 ${SPACING.innerPaddingX};
  @media (max-width: 768px) { padding: 0 24px; }
`;

const SectionHeader = styled.div`
  max-width: 600px;
  margin-bottom: 40px;
  display: flex; flex-direction: column; gap: 14px;
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
`;

const SectionH2 = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.sectionH2.size};
  font-weight: ${TYPE.sectionH2.weight};
  letter-spacing: ${TYPE.sectionH2.ls};
  line-height: ${TYPE.sectionH2.lh};
  color: ${DARK}; margin: 0;
  em { font-style: italic; font-weight: 400; }
`;

const RedBar = styled.div`
  width: ${SPACING.dividerWidth};
  height: ${SPACING.dividerHeight};
  background: ${RED};
  transform-origin: left;
  animation: ${lineGrow} .45s .15s ${SPRING} both;
`;

const SectionLead = styled.p`
  font-family: ${FONT_BODY};
  font-size: 14.5px; line-height: 1.65; color: ${MUTED}; margin: 0;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: center;
`;

const CaseCard = styled.div`
  background: #fff;
  border: 1px solid rgba(26,26,24,.1);
  border-radius: 6px; overflow: hidden; cursor: pointer;
  width: 100%; max-width: 460px;
  animation: ${fadeUp} .5s .1s ${SPRING} both;
  transition: box-shadow .28s ease, transform .28s ${SPRING};
  &:hover, &:focus-visible {
    box-shadow: 0 14px 36px -10px rgba(26,26,24,.16);
    transform: translateY(-3px);
  }
  &:focus-visible { outline: 2px solid ${RED}; outline-offset: 2px; }
`;

const CardCover = styled.div`
  position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden;
`;

const CardImg = styled.img`
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .45s ${SPRING};
  ${CaseCard}:hover & { transform: scale(1.04); }
`;

const CardOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 35%, rgba(14,4,4,.55) 100%);
`;

const CardBadge = styled.span`
  position: absolute; top: 12px; left: 12px;
  font-family: ${FONT_MONO}; font-size: 9.5px; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase;
  color: #fff; background: ${RED}; padding: 3px 8px; border-radius: 2px;
`;

const CardArrow = styled.span`
  position: absolute; bottom: 14px; right: 16px;
  font-size: 17px; color: #fff; opacity: 0; transform: translateX(-6px);
  transition: opacity .22s, transform .22s ${SPRING};
  ${CaseCard}:hover & { opacity: 1; transform: translateX(0); }
`;

const CardBody = styled.div`
  padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 7px;
`;

const CardTag = styled.span`
  font-family: ${FONT_MONO}; font-size: 9.5px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase; color: ${RED};
`;

const CardTitle = styled.h3`
  font-family: ${FONT_TITLE}; font-size: 20px; font-weight: 700;
  letter-spacing: -.02em; color: ${DARK}; margin: 0;
`;

const CardDesc = styled.p`
  font-family: ${FONT_BODY}; font-size: 13px; line-height: 1.62;
  color: ${MUTED}; margin: 0;
`;

const CardFooter = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 4px; padding-top: 11px;
  border-top: 1px solid rgba(26,26,24,.08);
`;

const CardMeta = styled.span`
  font-family: ${FONT_MONO}; font-size: 10px;
  color: rgba(26,26,24,.35); letter-spacing: .06em;
`;

const CardCta = styled.span`
  font-family: ${FONT_BODY}; font-size: 12.5px; font-weight: 600; color: ${RED};
`;

/* ════════════════════════════════════════════════════════════════════════
   STYLED — Overlay
   Estrutura: Overlay (fixed, flex-col) > OverlayTopBar (fixo) + OverlayBody (scroll)
   ════════════════════════════════════════════════════════════════════════ */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: #fff;
  display: flex;
  flex-direction: column;
  animation: ${slideInUp} .28s ${SPRING} both;
`;

const OverlayTopBar = styled.div`
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid rgba(26,26,24,.08);
  /* padding próprio — não usa innerMaxWidth, fica rente à esquerda */
  padding: 0 40px;
  @media (max-width: 768px) { padding: 0 24px; }
`;

const OverlayInner = styled.div`
  max-width: ${SPACING.innerMaxWidth};
  margin: 0 auto;
  padding: 0 ${SPACING.innerPaddingX};
  @media (max-width: 768px) { padding: 0 24px; }
`;

/* flex: 1 + overflow-y: auto → scroll independente da página por baixo */
const OverlayBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const BackBtn = styled.button`
  background: none; border: none; cursor: pointer;
  font-family: ${FONT_BODY}; font-size: 13px; font-weight: 600; color: ${MUTED};
  padding: 18px 0;
  display: inline-flex; align-items: center; gap: 6px;
  transition: color .18s;
  &:hover { color: ${DARK}; }
`;

const DetailHeader = styled.div`
  display: flex; flex-direction: column; gap: 16px;
  padding: 64px 0 40px;
  border-bottom: 1px solid rgba(26,26,24,.07);
  margin-bottom: 48px;
`;

const DetailBadge = styled.span`
  font-family: ${FONT_MONO}; font-size: 10.5px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: ${RED};
  padding: 3px 8px; border: 1px solid rgba(192,33,33,.32);
  border-radius: 2px; align-self: flex-start;
`;

const DetailTitle = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 800; letter-spacing: -.04em;
  color: ${DARK}; line-height: 1; margin: 0;
  display: inline-block; padding-bottom: 16px; position: relative;
  &::after {
    content: ""; position: absolute; left: 0; bottom: 0;
    width: 56px; height: 3px; background: ${RED};
  }
`;

const TitleDot = styled.span`color: ${RED};`;

const DetailIntro = styled.p`
  font-family: ${FONT_BODY}; font-size: 15.5px; line-height: 1.7;
  color: #444; max-width: 720px; margin: 0;
  strong { color: ${DARK}; font-weight: 600; }
`;

/*
  Flexbox garante controle real das larguras.
  Texto: flex 1, min-width 0 (não deixa o conteúdo estourar).
  Deck: 480px fixos, não cresce nem encolhe.
*/
const DetailSplit = styled.div`
  display: flex;
  align-items: start;
  gap: 56px;
  @media (max-width: 1024px) { flex-direction: column; gap: 40px; }
`;

const TextCol = styled.article`
  flex: 1; min-width: 0;
  font-family: ${FONT_BODY};
  display: flex; flex-direction: column;
`;

const CtEyebrow = styled.p`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: ${RED}; margin: 0 0 6px;
`;

const CtTitle = styled.h3`
  font-family: ${FONT_TITLE}; font-size: 24px; font-weight: 700;
  letter-spacing: -.02em; line-height: 1.2; color: ${DARK}; margin: 0 0 16px;
`;

const CtLabel = styled.p`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase; color: ${DARK};
  margin: 24px 0 10px; padding-left: 10px; border-left: 2px solid ${RED};
`;

const CtBody = styled.p`
  font-size: 14.5px; line-height: 1.75; color: #555; margin: 0 0 10px;
  strong { color: ${DARK}; font-weight: 600; }
`;

const CtList = styled.ul`
  list-style: none; padding: 0; margin: 0 0 24px; display: grid; gap: 10px;
  li {
    font-size: 14px; line-height: 1.6; color: #555;
    padding-left: 1.3rem; position: relative;
    &::before { content: "→"; position: absolute; left: 0; color: ${RED}; font-weight: 700; }
    strong { color: ${DARK}; font-weight: 600; }
  }
`;

const CtTagLine = styled.p`
  font-family: ${FONT_MONO}; font-size: 11px; font-weight: 600;
  letter-spacing: .06em; color: ${RED}; margin: auto 0 0;
  padding-top: 16px; border-top: 1px dashed rgba(26,26,24,.14);
`;

const DeckCol = styled.div`
  width: 480px;
  flex-shrink: 0;
  display: flex; flex-direction: column; gap: 10px;
  @media (max-width: 1024px) { width: 100%; }
`;

const DeckFrame = styled.div`
  position: relative; width: 100%; aspect-ratio: 16 / 9;
  background: #111; border-radius: 6px; overflow: hidden; cursor: zoom-in;
  box-shadow: 0 12px 40px -10px rgba(26,26,24,.22), 0 0 0 1px rgba(26,26,24,.07);
`;

const DeckStack = styled.div`position: absolute; inset: 0;`;

const DeckSlide = styled.figure<{ $active: boolean }>`
  position: absolute; inset: 0; margin: 0;
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(18px)"};
  transition: opacity .4s ease, transform .45s ${SPRING};
`;

const DeckImg = styled.img`
  width: 100%; height: 100%; object-fit: contain; display: block; background: #fff;
`;

const DeckCaption = styled.figcaption`
  position: absolute; left: 0; right: 0; bottom: 0; padding: .5rem .8rem;
  background: linear-gradient(180deg, transparent 0%, rgba(14,4,4,.88) 100%);
  font-family: ${FONT_MONO}; font-size: 9px; letter-spacing: .15em;
  text-transform: uppercase; color: rgba(255,255,255,.75);
  pointer-events: none; z-index: 2;
`;

const ExpandHint = styled.div`
  position: absolute; top: 10px; right: 12px;
  font-family: ${FONT_MONO}; font-size: 9px; letter-spacing: .06em;
  color: rgba(255,255,255,.4); pointer-events: none; z-index: 2;
`;

const DeckControls = styled.div`display: flex; align-items: center; gap: 8px;`;

const NavBtn = styled.button`
  width: 32px; height: 32px; border-radius: 50%;
  background: #fff; border: 1px solid rgba(26,26,24,.13); color: ${DARK};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; font-family: ${FONT_MONO}; font-size: 13px;
  transition: background .2s, border-color .2s, color .2s;
  &:hover:not(:disabled) { background: ${RED}; border-color: ${RED}; color: #fff; }
  &:disabled { opacity: .25; cursor: not-allowed; }
`;

const ProgressBar = styled.div`
  flex: 1; height: 2px; background: rgba(26,26,24,.1);
  border-radius: 2px; overflow: hidden; position: relative;
`;

const ProgressFill = styled.div`
  position: absolute; top: 0; left: 0; height: 100%; background: ${RED};
  border-radius: 2px; transition: width .45s ${SPRING};
`;

const SlideCounter = styled.span`
  font-family: ${FONT_MONO}; font-size: 10px;
  color: rgba(26,26,24,.38); letter-spacing: .13em; flex-shrink: 0;
`;

const ThumbStrip = styled.div`
  display: flex; gap: 5px; overflow-x: auto; padding-bottom: 4px;
  scrollbar-width: thin; scrollbar-color: rgba(192,33,33,.25) transparent;
  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(192,33,33,.3); border-radius: 2px; }
`;

const ThumbBtn = styled.button<{ $active: boolean }>`
  flex-shrink: 0; width: 54px; aspect-ratio: 16 / 9;
  border-radius: 3px; overflow: hidden;
  border: 2px solid ${p => p.$active ? RED : "transparent"};
  padding: 0; cursor: pointer; background: none;
  opacity: ${p => p.$active ? 1 : 0.5};
  transition: opacity .18s, border-color .18s;
  &:hover { opacity: 1; }
`;

const ThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: cover; display: block;
`;

/* Fullscreen */
const Fullscreen = styled.div`
  position: fixed; inset: 0; background: rgba(8,2,2,.97); z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  animation: ${fadeIn} .18s ease; cursor: zoom-out;
`;

const FullImg = styled.img`
  max-width: 94vw; max-height: 90vh; object-fit: contain; border-radius: 3px;
  box-shadow: 0 40px 80px -20px rgba(0,0,0,.5);
`;

const FullClose = styled.button`
  position: fixed; top: 18px; right: 22px;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14);
  color: rgba(255,255,255,.8); width: 38px; height: 38px; border-radius: 50%;
  cursor: pointer; font-size: 15px;
  display: flex; align-items: center; justify-content: center;
  transition: background .18s;
  &:hover { background: rgba(192,33,33,.45); }
`;

const FullNav = styled.div`
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 14px;
  background: rgba(14,4,4,.8); backdrop-filter: blur(8px);
  padding: 9px 18px; border-radius: 40px;
  border: 1px solid rgba(255,255,255,.08);
`;

const FullNavBtn = styled.button`
  background: none; border: none; color: rgba(255,255,255,.75);
  font-size: 16px; cursor: pointer; padding: 3px 6px; transition: color .18s;
  &:hover:not(:disabled) { color: #fff; }
  &:disabled { opacity: .22; cursor: not-allowed; }
`;

const FullCounter = styled.span`
  font-family: ${FONT_MONO}; font-size: 10.5px; color: rgba(255,255,255,.45);
  letter-spacing: .13em; min-width: 50px; text-align: center;
`;