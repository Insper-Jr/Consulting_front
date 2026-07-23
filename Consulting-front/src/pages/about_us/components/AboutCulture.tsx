import React, { useRef, useState, useEffect, useCallback } from "react";
import styled, { keyframes, css, createGlobalStyle } from "styled-components";
import { useInView } from "@/hooks/useInView";
import Gestao44 from "../../../assets/gestoes/44a.jpg";
import Gestao45 from "../../../assets/gestoes/45a.png";
import Gestao46 from "../../../assets/gestoes/46a.png";
import Gestao47 from "../../../assets/gestoes/47a.jpg";
import Gestao48 from "../../../assets/gestoes/48a.jpg";
import Gestao49 from "../../../assets/gestoes/49a.jpg";
import Gestao50 from "../../../assets/gestoes/50a.png";

const RED      = "#C02121";
const RED_DEEP = "#7d1414";
const DARK     = "#1a1a18";
const MUTED    = "#7a746e";
const BG       = "#FAF2EA";
const CREAM    = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

/* ─── Keyframes ─────────────────────────────────────────────────── */

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const modalFadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const modalScaleIn = keyframes`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`;

/* ─── Global: lock scroll when modal is open ────────────────────── */

const GlobalLockScroll = createGlobalStyle`
  body { overflow: hidden; }
`;

/* ─── Types ──────────────────────────────────────────────────────── */

type Gestao = {
  id: string;
  label: string;
  year: string;
  image: string;
};

const GESTOES: Gestao[] = [
  { id: "g44", label: "44ª Gestão", year: "2023.1", image: Gestao44 },
  { id: "g45", label: "45ª Gestão", year: "2023.2", image: Gestao45 },
  { id: "g46", label: "46ª Gestão", year: "2024.1", image: Gestao46 },
  { id: "g47", label: "47ª Gestão", year: "2024.2", image: Gestao47 },
  { id: "g48", label: "48ª Gestão", year: "2025.1", image: Gestao48 },
  { id: "g49", label: "49ª Gestão", year: "2025.2", image: Gestao49 },
  { id: "g50", label: "50ª Gestão", year: "2026.1", image: Gestao50 },
];

type Pilar = {
  id: string;
  label: string;
  title: string;
  description: string;
  cx: number;
  cy: number;
};

const PILARES: Pilar[] = [
  { id: "superacao",    label: "Superação",       title: "Superação",       description: "Buscar sair da zona de conforto, crescer, lidar de maneira construtiva com as dificuldades e assumir novas responsabilidades.", cx: 50, cy: 28 },
  { id: "parceria",     label: "Parceria",         title: "Parceria",        description: "Estar disponível para ajudar, estar engajado e compartilhando conhecimento com o grupo, além de demonstrar quando precisa de ajuda.", cx: 28, cy: 50 },
  { id: "proatividade", label: "Proatividade",     title: "Proatividade",    description: "Correr atrás, ser presente, se motivar diante de desafios e ter iniciativa para transformar ideias em entregas.", cx: 72, cy: 50 },
  { id: "geracao",      label: "Geração de Valor", title: "Geração de Valor",description: "Mudar realidades, buscar trazer e explorar novos insumos, estar One Step Ahead em tudo que entregamos.", cx: 50, cy: 72 },
];

type Valor = { label: string; description: string };

const VALORES: Valor[] = [
  { label: "Colaboração",     description: "Construir junto e reconhecer que os melhores resultados nascem do trabalho coletivo." },
  { label: "Inconformismo",   description: "Questionar o que existe e buscar sempre entregar além do esperado." },
  { label: "Comprometimento", description: "Honrar os compromissos com clientes e com o time, entregando com consistência." },
  { label: "Excelência",      description: "Elevar o padrão em tudo que fazemos dentro de cada contexto." },
];

/* ─── Lightbox ───────────────────────────────────────────────────── */

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 4, 4, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${modalFadeIn} 0.3s ease forwards;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const LightboxContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: min(1100px, 96vw);
  width: 100%;
  animation: ${modalScaleIn} 0.35s ${SPRING} forwards;
`;

const LightboxImage = styled.img`
  width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 32px 80px -24px rgba(0, 0, 0, 0.8);
  display: block;
`;

const LightboxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LightboxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LightboxLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.01em;
`;

const LightboxYear = styled.span`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${CREAM};
  opacity: 0.5;
  letter-spacing: 0.1em;
`;

const LightboxNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LightboxNav = styled.button`
  all: unset;
  cursor: pointer;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(250, 242, 234, 0.3);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${CREAM};
  transition: background 0.25s ease, border-color 0.25s ease;
  &:hover { background: rgba(250, 242, 234, 0.1); border-color: rgba(250, 242, 234, 0.6); }
`;

const LightboxCounter = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: ${CREAM};
  opacity: 0.45;
  min-width: 48px;
  text-align: center;
`;

const LightboxClose = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: -14px;
  right: -14px;
  width: 40px;
  height: 40px;
  background: rgba(250, 242, 234, 0.1);
  border: 1px solid rgba(250, 242, 234, 0.2);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${CREAM};
  transition: background 0.25s ease;
  &:hover { background: rgba(192, 33, 33, 0.5); border-color: ${RED}; }
`;

/* ─── Expand icon button (shown on active card) ──────────────────── */

const ExpandBtn = styled.button<{ $visible: boolean }>`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 30px;
  height: 30px;
  background: rgba(10, 4, 4, 0.65);
  border: 1px solid rgba(250, 242, 234, 0.25);
  border-radius: 5px;
  display: grid;
  place-items: center;
  color: ${CREAM};
  opacity: ${p => (p.$visible ? 1 : 0)};
  pointer-events: ${p => (p.$visible ? "auto" : "none")};
  transition: opacity 0.3s ease, background 0.2s ease;
  &:hover { background: rgba(192, 33, 33, 0.75); border-color: ${RED}; }
`;

/* ─── Section layout ─────────────────────────────────────────────── */

const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  & > * { min-width: 0; }
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const Left = styled.div<{ $visible: boolean }>`
  background: ${RED_DEEP};
  padding: 40px 56px 40px max(40px, calc((100vw - 1200px) / 2));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 28px;
  position: relative;
  overflow: hidden;
  min-height: 0;
  min-width: 0;
  opacity: 0;
  ${p => p.$visible && css`animation: ${slideLeft} 1s ${SPRING} 0s forwards;`}
  @media (max-width: 480px) { padding: 32px 20px; gap: 20px; }
`;

const Right = styled.div<{ $visible: boolean }>`
  background: ${BG};
  padding: 40px max(40px, calc((100vw - 1200px) / 2)) 40px 56px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 28px;
  min-width: 0;
  opacity: 0;
  ${p => p.$visible && css`animation: ${slideRight} 1s ${SPRING} 0.15s forwards;`}
  @media (max-width: 480px) { padding: 32px 20px; gap: 20px; }
`;

const Eyebrow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EyebrowLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${CREAM};
  opacity: 0.6;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const TitleMain = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0;
  @media (max-width: 480px) { font-size: 26px; }
`;

const TitleMuted = styled.span`
  opacity: 0.5;
  display: block;
`;

const TitleItalic = styled.span`
  font-style: italic;
  font-weight: 400;
  display: block;
`;

const TitleAccent = styled.div<{ $visible: boolean }>`
  width: ${p => (p.$visible ? "56px" : "0")};
  height: 3px;
  background: ${CREAM};
  transition: width 1s ${SPRING} 0.6s;
`;

const BodyText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  color: ${CREAM};
  line-height: 1.5;
  margin: 0;
  max-width: 440px;
  font-weight: 400;
  opacity: 0.88;
`;

const ExpandHint = styled.p`
  font-family: ${FONT_BODY};
  font-size: 12px;
  color: ${CREAM};
  opacity: 0.45;
  margin: -16px 0 0;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* ─── Carousel ───────────────────────────────────────────────────── */

const Carousel3D = styled.div`
  margin-top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 18px;
`;

const CarouselStage = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  perspective: 1400px;
  perspective-origin: 50% 50%;
  overflow: visible;
`;

const CarouselTrack = styled.div<{ $angle: number; $radius: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;
  height: 210px;
  margin: -105px 0 0 -230px;
  transform-style: preserve-3d;
  transform: translateZ(${p => -p.$radius}px) rotateY(${p => p.$angle}deg);
  transition: transform 0.9s ${SPRING};
`;

const CarouselCard = styled.button<{ $rotate: number; $radius: number; $active: boolean }>`
  all: unset;
  cursor: pointer;
  position: absolute;
  inset: 0;
  width: 340px;
  height: 210px;
  transform: rotateY(${p => p.$rotate}deg) translateZ(${p => p.$radius}px);
  transform-style: preserve-3d;
  border-radius: 6px;
  overflow: hidden;
  background: #2a0a0a;
  box-shadow: 0 24px 48px -16px rgba(0,0,0,0.55), 0 8px 16px -8px rgba(0,0,0,0.4);
  outline: 1px solid rgba(250,242,234,0.08);
  transition: outline 0.4s ${SPRING}, filter 0.4s ${SPRING};
  filter: ${p => (p.$active ? "none" : "brightness(0.5) saturate(0.8)")};
  &:focus-visible { outline: 2px solid ${CREAM}; }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: linear-gradient(180deg, rgba(10,4,4,0) 0%, rgba(10,4,4,0.85) 100%);
`;

const CardLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.005em;
`;

const CardYear = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  color: ${CREAM};
  opacity: 0.55;
  letter-spacing: 0.12em;
`;

/* ─── Carousel footer ────────────────────────────────────────────── */

const CarouselFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.button<{ $active: boolean }>`
  all: unset;
  cursor: pointer;
  width: ${p => (p.$active ? "20px" : "6px")};
  height: 6px;
  border-radius: 3px;
  background: ${p => (p.$active ? CREAM : "rgba(250,242,234,0.3)")};
  transition: all 0.4s ${SPRING};
`;

const ActiveLabel = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${CREAM};
  opacity: 0.7;
`;

const NavArrow = styled.button`
  all: unset;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(250,242,234,0.3);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${CREAM};
  transition: background 0.3s ${SPRING}, border-color 0.3s ${SPRING};
  &:hover { background: rgba(250,242,234,0.08); border-color: rgba(250,242,234,0.6); }
`;

const ArrowGroup = styled.div`
  display: flex;
  gap: 8px;
`;

/* ─── Right side ─────────────────────────────────────────────────── */

const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const RightEyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
`;

const RightTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
`;

const RightTitleMuted = styled.span`
  display: block;
  opacity: 0.4;
`;

const Hint = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${MUTED};
  margin: 0;
  font-style: italic;
`;

const VennWrap = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 40px;
  align-items: center;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const VennStage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 380px;
  justify-self: center;
`;

const VennCircle = styled.button<{ $cx: number; $cy: number; $active: boolean; $tone: "red" | "muted" }>`
  all: unset;
  cursor: pointer;
  position: absolute;
  width: 43.5%;
  aspect-ratio: 1 / 1;
  left: ${p => p.$cx}%;
  top: ${p => p.$cy}%;
  transform: translate(-50%, -50%) scale(${p => (p.$active ? 1.04 : 1)});
  border-radius: 50%;
  background: ${p =>
    p.$tone === "red"
      ? p.$active ? "rgba(192,33,33,0.92)" : "rgba(192,33,33,0.78)"
      : p.$active ? "rgba(180,170,160,0.85)" : "rgba(180,170,160,0.7)"};
  mix-blend-mode: multiply;
  transition: transform 0.5s ${SPRING}, background 0.4s ${SPRING}, box-shadow 0.4s ${SPRING};
  display: grid;
  place-items: center;
  text-align: center;
  box-shadow: ${p => p.$active ? "0 14px 40px -16px rgba(192,33,33,0.55)" : "none"};
  &:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }
`;

const VennLabel = styled.span<{ $active: boolean }>`
  font-family: ${FONT_TITLE};
  font-size: clamp(13px, 1.4vw, 16px);
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.005em;
  line-height: 1.1;
  padding: 0 8px;
  opacity: ${p => (p.$active ? 1 : 0.92)};
  pointer-events: none;
`;

const PilarDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 24px;
  border-left: 3px solid ${RED};
  background: rgba(192,33,33,0.04);
  min-height: 180px;
  animation: ${fadeUp} 0.5s ${SPRING};
`;

const PilarTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 20px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.01em;
  margin: 0;
`;

const PilarDesc = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  color: ${DARK};
  opacity: 0.78;
  line-height: 1.6;
  margin: 0;
`;

const Valores = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid rgba(26,26,24,0.12);
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const ValorItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  padding: 20px 20px 20px 0;
  border-bottom: 1px solid rgba(26,26,24,0.12);
  &:nth-child(odd)  { padding-right: 28px; border-right: 1px solid rgba(26,26,24,0.12); }
  &:nth-child(even) { padding-left: 28px; }
  @media (max-width: 720px) {
    &:nth-child(odd)  { padding-right: 0; border-right: none; }
    &:nth-child(even) { padding-left: 0; }
  }
`;

const ValorNum = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 22px;
  font-weight: 700;
  font-style: italic;
  color: ${RED};
  line-height: 1;
  letter-spacing: -0.02em;
`;

const ValorBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ValorLabel = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 15px;
  font-weight: 700;
  color: ${DARK};
  margin: 0;
  letter-spacing: -0.005em;
`;

const ValorText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${MUTED};
  line-height: 1.55;
  margin: 0;
`;

/* ─── SVG icons ──────────────────────────────────────────────────── */

function IconExpand() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Lightbox component ─────────────────────────────────────────── */

interface LightboxProps {
  gestoes: Gestao[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ gestoes, initialIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const total = gestoes.length;

  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev]);

  const g = gestoes[idx];

  return (
    <>
      <GlobalLockScroll />
      <LightboxOverlay onClick={onClose} role="dialog" aria-modal="true" aria-label={`Foto da ${g.label}`}>
        <LightboxContent onClick={e => e.stopPropagation()}>
          <LightboxClose onClick={onClose} aria-label="Fechar">
            <IconClose />
          </LightboxClose>

          <LightboxImage src={g.image} alt={`Foto da ${g.label} – ${g.year}`} />

          <LightboxFooter>
            <LightboxInfo>
              <LightboxLabel>{g.label}</LightboxLabel>
              <LightboxYear>{g.year}</LightboxYear>
            </LightboxInfo>

            <LightboxNavGroup>
              <LightboxNav onClick={prev} aria-label="Gestão anterior">
                <IconArrowLeft />
              </LightboxNav>
              <LightboxCounter>{idx + 1} / {total}</LightboxCounter>
              <LightboxNav onClick={next} aria-label="Próxima gestão">
                <IconArrowRight />
              </LightboxNav>
            </LightboxNavGroup>
          </LightboxFooter>
        </LightboxContent>
      </LightboxOverlay>
    </>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */

export default function CulturaSection() {
  const { ref: sectionRef, visible } = useInView();
  const [gestaoIdx, setGestaoIdx] = useState(GESTOES.length - 2);
  const [pilarId, setPilarId] = useState<string>(PILARES[0].id);
  // Lightbox state: null = closed, number = index of gestão to show
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const total = GESTOES.length;
  const step = 360 / total;
  const angle = -gestaoIdx * step;
  const radius = 360;

  const next = useCallback(() => setGestaoIdx(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setGestaoIdx(i => (i - 1 + total) % total), [total]);

  // Auto-advance only when lightbox is closed
  useEffect(() => {
    if (!visible || lightboxIdx !== null) return;
    const id = window.setInterval(next, 4500);
    return () => window.clearInterval(id);
  }, [visible, next, lightboxIdx]);

  // Arrow keys for carousel only when lightbox is closed
  useEffect(() => {
    if (lightboxIdx !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, lightboxIdx]);

  const activePilar = PILARES.find(p => p.id === pilarId) ?? PILARES[0];

  return (
    <>
      <Section ref={sectionRef}>
        {/* ── LEFT ────────────────────────────────────────────── */}
        <Left $visible={visible}>
          <Eyebrow>
            <EyebrowLabel>As Gestões</EyebrowLabel>
          </Eyebrow>

          <TitleBlock>
            <TitleMain>
              <TitleMuted>Quem fez</TitleMuted>
              <TitleItalic>história</TitleItalic>
            </TitleMain>
            <TitleAccent $visible={visible} />
            <BodyText>
              Conheça quem moldou a empresa nos últimos anos.
            </BodyText>
          </TitleBlock>

          <ExpandHint>
            <IconExpand />
            Clique na foto em destaque para ver os membros
          </ExpandHint>

          <Carousel3D>
            <CarouselStage>
              <CarouselTrack $angle={angle} $radius={radius}>
                {GESTOES.map((g, i) => {
                  const active = i === gestaoIdx;
                  return (
                    <CarouselCard
                      key={g.id}
                      $rotate={i * step}
                      $radius={radius}
                      $active={active}
                      onClick={() => {
                        if (active) {
                          // If already active, open lightbox
                          setLightboxIdx(i);
                        } else {
                          // Otherwise, bring to front
                          setGestaoIdx(i);
                        }
                      }}
                      aria-label={active ? `Ampliar foto da ${g.label}` : `Ver ${g.label}`}
                    >
                      <CardImage src={g.image} alt={g.label} />
                      <CardOverlay>
                        <CardLabel>{g.label}</CardLabel>
                        <CardYear>{g.year}</CardYear>
                      </CardOverlay>
                      {/* Expand icon only visible on active card */}
                      <ExpandBtn
                        $visible={active}
                        onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                        aria-label={`Ampliar foto da ${g.label}`}
                        tabIndex={active ? 0 : -1}
                      >
                        <IconExpand />
                      </ExpandBtn>
                    </CarouselCard>
                  );
                })}
              </CarouselTrack>
            </CarouselStage>

            <CarouselFooter>
              <ActiveLabel>{GESTOES[gestaoIdx].label}</ActiveLabel>
              <Dots>
                {GESTOES.map((g, i) => (
                  <Dot
                    key={g.id}
                    $active={i === gestaoIdx}
                    onClick={() => setGestaoIdx(i)}
                    aria-label={`Ir para ${g.label}`}
                  />
                ))}
              </Dots>
              <ArrowGroup>
                <NavArrow onClick={prev} aria-label="Gestão anterior">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </NavArrow>
                <NavArrow onClick={next} aria-label="Próxima gestão">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </NavArrow>
              </ArrowGroup>
            </CarouselFooter>
          </Carousel3D>
        </Left>

        {/* ── RIGHT ───────────────────────────────────────────── */}
        <Right $visible={visible}>
          <RightHeader>
            <RightEyebrow>Identidade</RightEyebrow>
            <RightTitle>
              <RightTitleMuted>Nossa</RightTitleMuted>
              Cultura
            </RightTitle>
            <Hint>Clique em um pilar para ver sua descrição.</Hint>
          </RightHeader>

          <VennWrap>
            <VennStage>
              {PILARES.map(p => {
                const tone: "red" | "muted" =
                  p.id === "superacao" || p.id === "geracao" ? "red" : "muted";
                return (
                  <VennCircle
                    key={p.id}
                    $cx={p.cx}
                    $cy={p.cy}
                    $active={p.id === pilarId}
                    $tone={tone}
                    onClick={() => setPilarId(p.id)}
                    aria-pressed={p.id === pilarId}
                  >
                    <VennLabel $active={p.id === pilarId}>{p.label}</VennLabel>
                  </VennCircle>
                );
              })}
            </VennStage>

            <PilarDetail key={activePilar.id}>
              <PilarTitle>{activePilar.title}</PilarTitle>
              <PilarDesc>{activePilar.description}</PilarDesc>
            </PilarDetail>
          </VennWrap>

          <Valores>
            {VALORES.map((v, i) => (
              <ValorItem key={v.label}>
                <ValorNum>0{i + 1}</ValorNum>
                <ValorBody>
                  <ValorLabel>{v.label}</ValorLabel>
                  <ValorText>{v.description}</ValorText>
                </ValorBody>
              </ValorItem>
            ))}
          </Valores>
        </Right>
      </Section>

      {/* ── LIGHTBOX ── rendered outside Section via portal-like sibling */}
      {lightboxIdx !== null && (
        <Lightbox
          gestoes={GESTOES}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}