import { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  RED, RED_LIGHT, RED_DEEP, BG_CREAM,
  FONT_TITLE, FONT_BODY, TYPE, SPACING, SPRING,
  MUTED, DARK, BORDER_LIGHT,
} from "../../processos/components/tokens";

// ── Constants ──────────────────────────────────────────────────────────────

const CARD_WIDTH      = 380;  // maior → menos cards visíveis
const GAP             = 16;
const SCROLL_PER_CARD = 35;   // vh por step — mais rápido

// ── Types ──────────────────────────────────────────────────────────────────

export interface Member {
  id:       number;
  name:     string;
  role:     string;
  company:  string;
  initials: string;
  photo?:   string;
  quote:    string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const MEMBERS: Member[] = [
  {
    id: 1, initials: "AM", name: "Ana Mello",
    role: "Analista de Estratégia", company: "McKinsey & Company",
    quote: "A Insper Jr foi onde aprendi que consultoria vai muito além de slides. É sobre entender o problema do cliente de verdade e ter coragem de propor soluções que importam.",
  },
  {
    id: 2, initials: "RC", name: "Rafael Costa",
    role: "Associado de Investimentos", company: "BTG Pactual",
    quote: "Entrar no BTG com um ano de Insper Jr fez toda diferença. Eu já sabia o que era ter responsabilidade real, lidar com cliente e entregar com prazo apertado.",
  },
  {
    id: 3, initials: "JS", name: "Julia Soares",
    role: "Consultora Júnior", company: "Bain & Company",
    quote: "Nenhum estágio ou matéria me preparou tanto quanto a vivência da empresa júnior. Você aprende fazendo — e erra com segurança, o que é um privilégio enorme.",
  },
  {
    id: 4, initials: "PL", name: "Pedro Lima",
    role: "Product Manager", company: "Nubank",
    quote: "O que mais carrego da Insper Jr é a mentalidade de dono. Isso é raro e valioso em qualquer carreira, seja em startup ou em grande empresa.",
  },
  {
    id: 5, initials: "BF", name: "Beatriz Ferreira",
    role: "Analista de M&A", company: "Itaú BBA",
    quote: "A Insper Jr me ensinou a liderar pessoas, não só projetos. Essa diferença eu sinto até hoje no trabalho — e nas equipes que construo.",
  },
  {
    id: 6, initials: "GT", name: "Gabriel Torres",
    role: "Consultor de Negócios", company: "Accenture",
    quote: "A vivência prática com clientes reais ainda na graduação foi o que me diferenciou nas entrevistas. Não tem como simular isso em sala de aula.",
  },
  {
    id: 7, initials: "LC", name: "Larissa Cruz",
    role: "Analista de Dados", company: "Goldman Sachs",
    quote: "Aprendi a trabalhar sob pressão, a comunicar resultados e a pensar em impacto. Tudo isso antes de sair da faculdade — foi um diferencial absurdo.",
  },
  {
    id: 8, initials: "FM", name: "Felipe Moura",
    role: "Engenheiro de Software", company: "XP Investimentos",
    quote: "A Insper Jr me deu contexto de negócio que a maioria dos devs não tem. Saber conectar tecnologia com resultado para o cliente mudou minha forma de trabalhar.",
  },
];

// ── Component ──────────────────────────────────────────────────────────────

const AlumniCarousel = () => {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [current,      setCurrent]      = useState(0);
  const [cardsVisible, setCardsVisible] = useState(2);
  const [modalOpen,    setModalOpen]    = useState(false);

  const maxIndex = Math.max(0, MEMBERS.length - cardsVisible);

  // ── Quantos cards cabem ───────────────────────────────────────────────
  useEffect(() => {
    const calc = () => {
      if (!viewportRef.current) return;
      const w = viewportRef.current.offsetWidth;
      setCardsVisible(Math.max(1, Math.floor((w + GAP) / (CARD_WIDTH + GAP))));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // ── Sticky scroll-driven ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect       = wrapper.getBoundingClientRect();
      const scrolledIn = -rect.top;
      if (scrolledIn <= 0) { setCurrent(0); return; }

      const scrollRange = wrapper.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.min(1, scrolledIn / scrollRange);
      setCurrent(Math.round(progress * maxIndex));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxIndex]);

  // ── Track translate ───────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(-${current * (CARD_WIDTH + GAP)}px)`;
  }, [current]);

  // ── Progress bar — completa em 100% quando current === maxIndex ───────
  const progress = maxIndex === 0 ? 100 : (current / maxIndex) * 100;

  return (
    <>
      <StickyWrapper
        ref={wrapperRef}
        style={{ height: `calc(100vh + ${maxIndex * SCROLL_PER_CARD}vh)` }}
      >
        <StickySection>

          <SectionHeader>
            <HeaderLeft>
              <Eyebrow>Onde estão</Eyebrow>
              <SectionTitle>Ex-membros em destaque</SectionTitle>
            </HeaderLeft>
            <HeaderRight>
              <Counter>
                <CounterCurrent>{String(current + 1).padStart(2, "0")}</CounterCurrent>
                <CounterSep>/</CounterSep>
                <CounterTotal>{String(MEMBERS.length).padStart(2, "0")}</CounterTotal>
              </Counter>
              <BtnVerTodos onClick={() => setModalOpen(true)}>
                Ver todos
              </BtnVerTodos>
            </HeaderRight>
          </SectionHeader>

          <Viewport ref={viewportRef}>
            <Track ref={trackRef}>
              {MEMBERS.map((m) => (
                <Card key={m.id}>
                  <PhotoWrap>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} />
                    ) : (
                      <PhotoPlaceholder>
                        <InitialsLabel>{m.initials}</InitialsLabel>
                      </PhotoPlaceholder>
                    )}
                  </PhotoWrap>
                  <CardBody>
                    <QuoteMark aria-hidden="true">"</QuoteMark>
                    <Quote>{m.quote}</Quote>
                    <CardDivider />
                    <MemberName>{m.name}</MemberName>
                    <MemberRole>{m.role}</MemberRole>
                    <CompanyTag>{m.company}</CompanyTag>
                  </CardBody>
                </Card>
              ))}
            </Track>
          </Viewport>

          <ProgressBar>
            <ProgressFill style={{ width: `${progress}%` }} />
          </ProgressBar>

          <ScrollHint $hidden={current === maxIndex}>
            Role para ver mais
          </ScrollHint>

        </StickySection>
      </StickyWrapper>

      {/* ── Modal Ver Todos ── */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Todos os ex-membros</ModalTitle>
              <CloseBtn onClick={() => setModalOpen(false)} aria-label="Fechar">✕</CloseBtn>
            </ModalHeader>
            <ModalGrid>
              {MEMBERS.map((m) => (
                <ModalCard key={m.id}>
                  <ModalPhotoWrap>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} />
                    ) : (
                      <PhotoPlaceholder>
                        <InitialsLabel $small>{m.initials}</InitialsLabel>
                      </PhotoPlaceholder>
                    )}
                  </ModalPhotoWrap>
                  <ModalName>{m.name}</ModalName>
                  <ModalRole>{m.role}</ModalRole>
                  <CompanyTag>{m.company}</CompanyTag>
                </ModalCard>
              ))}
            </ModalGrid>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};

export default AlumniCarousel;

// ── Styled Components ──────────────────────────────────────────────────────

const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const slideUp = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}`;

const StickyWrapper = styled.div`
  position: relative;
`;

const StickySection = styled.section`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: ${SPACING.sectionY} ${SPACING.innerPaddingX} 32px;
  border-bottom: 1px solid ${BORDER_LIGHT};

  @media (max-width: 768px) {
    padding: 56px 1.5rem 24px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const HeaderLeft  = styled.div``;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Eyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.sectionH2.size};
  font-weight: ${TYPE.sectionH2.weight};
  line-height: ${TYPE.sectionH2.lh};
  letter-spacing: ${TYPE.sectionH2.ls};
  color: ${DARK};
`;

const Counter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const CounterCurrent = styled.span`
  font-family: ${FONT_BODY};
  font-size: 28px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.03em;
`;

const CounterSep = styled.span`
  font-family: ${FONT_BODY};
  font-size: 14px;
  color: ${MUTED};
`;

const CounterTotal = styled.span`
  font-family: ${FONT_BODY};
  font-size: 14px;
  color: ${MUTED};
`;

const BtnVerTodos = styled.button`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
  background: transparent;
  border: 1.5px solid ${RED};
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ${SPRING}, color 0.25s ${SPRING};
  &:hover { background: ${RED}; color: #ffffff; }
`;

// ── Carousel ───────────────────────────────────────────────────────────────

const Viewport = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;        // ← centraliza os cards no eixo vertical
`;

const Track = styled.div`
  display: flex;
  gap: ${GAP}px;
  height: 100%;
  transition: transform 0.3s ease-out;
`;

const Card = styled.div`
  flex: 0 0 ${CARD_WIDTH}px;
  max-height: 440px;          // ← reduzido
  align-self: flex-start;
  background: ${BG_CREAM};
  border-radius: 8px;
  padding: 16px;              // ← era 20px
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PhotoWrap = styled.div`
  width: 100%;
  height: 160px;              // ← altura fixa, não cresce com a largura
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
  flex-shrink: 0;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1.5px dashed rgba(192, 33, 33, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InitialsLabel = styled.span<{ $small?: boolean }>`
  font-family: ${FONT_BODY};
  font-size: ${({ $small }) => ($small ? "16px" : "32px")};
  font-weight: 700;
  color: rgba(192, 33, 33, 0.2);
  letter-spacing: 0.04em;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const QuoteMark = styled.span`
  font-family: Georgia, serif;
  font-size: 48px;
  line-height: 0.7;
  color: ${RED};
  margin-bottom: 10px;
  flex-shrink: 0;
  user-select: none;
`;

const Quote = styled.blockquote`
  font-family: ${FONT_BODY};
  font-size: 13px;
  font-weight: 400;
  line-height: 1.65;
  color: ${DARK};
  font-style: italic;
  margin-bottom: 12px;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;      // ← era 4
  -webkit-box-orient: vertical;
`;

const CardDivider = styled.div`
  width: 32px;
  height: 2px;
  background: ${RED};
  margin-bottom: 12px;
  flex-shrink: 0;
`;

const MemberName = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.body.size};
  font-weight: 700;
  color: ${DARK};
  margin-bottom: 2px;
  flex-shrink: 0;
`;

const MemberRole = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.bodySmall.size};
  color: ${MUTED};
  margin-bottom: 12px;
  flex-shrink: 0;
`;

const CompanyTag = styled.span`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${RED_DEEP};
  background: ${RED_LIGHT};
  padding: 5px 10px;
  border-radius: 3px;
  align-self: flex-start;
  flex-shrink: 0;
`;

// ── Progress ───────────────────────────────────────────────────────────────

const ProgressBar = styled.div`
  height: 2px;
  background: ${BORDER_LIGHT};
  border-radius: 2px;
  margin-top: 20px;
  flex-shrink: 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${RED};
  border-radius: 2px;
  transition: width 0.3s ease-out;
`;

const ScrollHint = styled.p<{ $hidden: boolean }>`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${MUTED};
  text-align: center;
  margin-top: 10px;
  flex-shrink: 0;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

// ── Modal ──────────────────────────────────────────────────────────────────

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 4, 4, 0.75);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 960px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px;
  animation: ${slideUp} 0.3s ${SPRING};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const ModalTitle = styled.h3`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.sectionH2.size};
  font-weight: ${TYPE.sectionH2.weight};
  letter-spacing: ${TYPE.sectionH2.ls};
  color: ${DARK};
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${MUTED};
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
  &:hover { color: ${DARK}; }
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModalCard = styled.div`
  background: ${BG_CREAM};
  border-radius: 8px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ModalPhotoWrap = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

const ModalName = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.bodySmall.size};
  font-weight: 700;
  color: ${DARK};
`;

const ModalRole = styled.p`
  font-family: ${FONT_BODY};
  font-size: 12px;
  color: ${MUTED};
`;