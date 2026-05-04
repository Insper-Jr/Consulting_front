import React, { useRef, useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "@/hooks/useInView";
import Gestao44 from "../../../assets/gestoes/44a.jpg";
import Gestao49e50 from "../../../assets/gestoes/49-50.jpg";



const RED      = "#C02121";
const RED_DEEP = "#7d1414";
const DARK     = "#1a1a18";
const MUTED    = "#7a746e";
const BG       = "#FAF2EA";
const CREAM    = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";



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


type Gestao = {
  id: string;
  label: string;
  year: string;
  image: string;
};

const GESTOES: Gestao[] = [
  { id: "g47", label: "43ª e 44ª Gestão", year: "2022", image: Gestao44},
  { id: "g49", label: "45ª e 46ª Gestão", year: "2023", image: "/images/gestoes/45-46.jpg" },
  { id: "g51", label: "47ª e 48ª Gestão", year: "2024", image: "/images/gestoes/47-48.jpg" },
  { id: "g53", label: "49ª e 50ª Gestão", year: "2025", image: Gestao49e50 },
  { id: "g55", label: "51ª e 52ª Gestão", year: "2026", image: "/images/gestoes/51-52.jpg" },
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
  {
    id: "superacao",
    label: "Superação",
    title: "Superação",
    description:
      "Buscar sair da zona de conforto, crescer, lidar de maneira construtiva com as dificuldades e assumir novas responsabilidades.",
    cx: 50,
    cy: 28,
  },
  {
    id: "parceria",
    label: "Parceria",
    title: "Parceria",
    description:
      "Estar disponível para ajudar, estar engajado e compartilhando conhecimento com o grupo, além de demonstrar quando precisa de ajuda.",
    cx: 28,
    cy: 50,
  },
  {
    id: "proatividade",
    label: "Proatividade",
    title: "Proatividade",
    description:
      "Correr atrás, ser presente, se motivar diante de desafios e ter iniciativa para transformar ideias em entregas.",
    cx: 72,
    cy: 50,
  },
  {
    id: "geracao",
    label: "Geração de Valor",
    title: "Geração de Valor",
    description:
      "Mudar realidades, buscar trazer e explorar novos insumos, estar One Step Ahead em tudo que entregamos.",
    cx: 50,
    cy: 72,
  },
];

type Valor = { label: string; description: string };

const VALORES: Valor[] = [
  { label: "Colaboração",     description: "Construir junto e reconhecer que os melhores resultados nascem do trabalho coletivo." },
  { label: "Inconformismo",   description: "Questionar o que existe e buscar sempre entregar além do esperado." },
  { label: "Comprometimento", description: "Honrar os compromissos com clientes e com o time, entregando com consistência." },
  { label: "Excelência",      description: "Elevar o padrão em tudo que fazemos dentro de cada contexto." },
];


const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1fr;

  /* CRITICAL: previne overflow de filhos quebrando o grid */
  & > * { min-width: 0; }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div<{ $visible: boolean }>`
  background: ${RED_DEEP};
  padding: 40px 56px 40px max(40px, calc((100vw - 1200px) / 2));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  position: relative;
  overflow: hidden;
  min-height: 0;
  min-width: 0;
  opacity: 0;

  ${p => p.$visible && css`animation: ${slideLeft} 1s ${SPRING} 0s forwards;`}
`;

const Right = styled.div<{ $visible: boolean }>`
  background: ${BG};
  padding: 40px max(40px, calc((100vw - 1200px) / 2)) 40px 56px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  min-width: 0;
  opacity: 0;
  ${p => p.$visible && css`animation: ${slideRight} 1s ${SPRING} 0.15s forwards;`}
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
  gap: 0;
  margin-top: 0;
`;

const TitleMain = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${CREAM};
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0 0 14px;
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
  margin-bottom: 14px;
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

const CarouselCard = styled.button<{
  $rotate: number;
  $radius: number;
  $active: boolean;
}>`
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
  box-shadow:
    0 24px 48px -16px rgba(0, 0, 0, 0.55),
    0 8px 16px -8px rgba(0, 0, 0, 0.4);
  outline: 1px solid rgba(250, 242, 234, 0.08);
  transition: outline 0.4s ${SPRING}, filter 0.4s ${SPRING};
  filter: ${p => (p.$active ? "none" : "brightness(0.5) saturate(0.8)")};

  &:focus-visible {
    outline: 2px solid ${CREAM};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background:
    repeating-linear-gradient(
      135deg,
      rgba(250, 242, 234, 0.04) 0 12px,
      rgba(250, 242, 234, 0.0) 12px 24px
    ),
    linear-gradient(180deg, #3a1010 0%, #1f0707 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(250, 242, 234, 0.45);
  font-family: ${FONT_BODY};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: linear-gradient(
    180deg,
    rgba(10, 4, 4, 0) 0%,
    rgba(10, 4, 4, 0.85) 100%
  );
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
  border: 1px solid rgba(250, 242, 234, 0.3);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${CREAM};
  transition: background 0.3s ${SPRING}, border-color 0.3s ${SPRING};

  &:hover {
    background: rgba(250, 242, 234, 0.08);
    border-color: rgba(250, 242, 234, 0.6);
  }
`;

const ArrowGroup = styled.div`
  display: flex;
  gap: 8px;
`;


const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  margin: 16px 0 0;
  font-style: italic;
`;

/* Diagrama */

const VennWrap = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 32px;
  align-items: center;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const VennStage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 380px;
  justify-self: center;
`;

const VennCircle = styled.button<{
  $cx: number;
  $cy: number;
  $active: boolean;
  $tone: "red" | "muted";
}>`
  all: unset;
  cursor: pointer;
  position: absolute;
  width: 58%;
  aspect-ratio: 1 / 1;
  left: ${p => p.$cx}%;
  top: ${p => p.$cy}%;
  transform: translate(-50%, -50%) scale(${p => (p.$active ? 1.04 : 1)});
  border-radius: 50%;
  background: ${p =>
    p.$tone === "red"
      ? p.$active
        ? "rgba(192,33,33,0.92)"
        : "rgba(192,33,33,0.78)"
      : p.$active
      ? "rgba(180,170,160,0.85)"
      : "rgba(180,170,160,0.7)"};
  mix-blend-mode: multiply;
  transition: transform 0.5s ${SPRING}, background 0.4s ${SPRING},
    box-shadow 0.4s ${SPRING};
  display: grid;
  place-items: center;
  text-align: center;
  box-shadow: ${p =>
    p.$active ? "0 14px 40px -16px rgba(192,33,33,0.55)" : "none"};

  &:focus-visible {
    outline: 2px solid ${RED};
    outline-offset: 4px;
  }
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


const PilarDetail = styled.div<{ $key: string }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 24px 24px 24px;
  border-left: 3px solid ${RED};
  background: rgba(192, 33, 33, 0.04);
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
  border-top: 1px solid rgba(26, 26, 24, 0.12);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ValorItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  padding: 20px 20px 20px 0;
  border-bottom: 1px solid rgba(26, 26, 24, 0.12);

  &:nth-child(odd) {
    padding-right: 28px;
    border-right: 1px solid rgba(26, 26, 24, 0.12);
  }

  &:nth-child(even) {
    padding-left: 28px;
  }

  @media (max-width: 720px) {
    &:nth-child(odd) {
      padding-right: 0;
      border-right: none;
    }
    &:nth-child(even) {
      padding-left: 0;
    }
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


export default function CulturaSection() {
  const { ref: sectionRef, visible } = useInView();
  const [gestaoIdx, setGestaoIdx] = useState(GESTOES.length - 2);
  const [pilarId, setPilarId] = useState<string>(PILARES[0].id);

  const total = GESTOES.length;
  const step = 360 / total;
  const angle = -gestaoIdx * step;
  const radius = 360;

  const next = useCallback(
    () => setGestaoIdx(i => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setGestaoIdx(i => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(next, 4500);
    return () => window.clearInterval(id);
  }, [visible, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const activePilar = PILARES.find(p => p.id === pilarId) ?? PILARES[0];

  return (
    <Section ref={sectionRef}>
      {/* ----------- LEFT ----------- */}
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
                    onClick={() => setGestaoIdx(i)}
                    aria-label={g.label}
                  >
                    
                    <CardImage src={g.image} alt={g.label} />
                    <CardOverlay>
                      <CardLabel>{g.label}</CardLabel>
                      <CardYear>{g.year}</CardYear>
                    </CardOverlay>
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
                  <path
                    d="M9 2L4 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavArrow>
              <NavArrow onClick={next} aria-label="Próxima gestão">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavArrow>
            </ArrowGroup>
          </CarouselFooter>
        </Carousel3D>
      </Left>

      {/* ----------- RIGHT ----------- */}
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

          <PilarDetail $key={activePilar.id} key={activePilar.id}>
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
  );
}
