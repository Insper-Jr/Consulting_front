import { useRef, useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import {
  RED, RED_LIGHT, RED_DEEP, BG_CREAM,
  FONT_TITLE, FONT_BODY, TYPE, SPACING, SPRING,
  MUTED, DARK, BORDER_LIGHT,
} from "../../processos/components/tokens";
import GiovannaFava from "../../../assets/alumni/GiovannaFava.png";
import FernandoMauad from "../../../assets/alumni/FernandoMauad.png";
import MateusMarinheiro from "../../../assets/alumni/MateusMarinheiro.png";
import GuilhermeKaidei from "../../../assets/alumni/GuilhermeKaidei.png";
import GabrielDebiagi from "../../../assets/alumni/GabrielDebiagi.png";
import CharlizeSuarez from "../../../assets/alumni/CharlizeSuarez.png";
import LeonardoElias from "../../../assets/alumni/LeonardoElias.png";
import MariaFernandaMelo from "../../../assets/alumni/MariaFernandaMelo.png";
import TomasMiele from "../../../assets/alumni/TomasMiele.png";
import JoaoFaraco from "../../../assets/alumni/JoaoFaraco.png";
import HenriqueManequini from "../../../assets/alumni/HenriqueManequini.png"


// ── Constants ──────────────────────────────────────────────────────────────

const CARD_WIDTH      = 380;
const GAP             = 16;
const SCROLL_PER_CARD = 35;

const AVATAR_SIZE  = 108;
const STRIP_HEIGHT = 72;
const AVATAR_BLEED = 54;

// ── Types ──────────────────────────────────────────────────────────────────

export interface Member {
  id:        number;
  name:      string;
  role:      string;
  area?:     string;
  company?:  string;
  photo?:    string;
  initials?: string;
  quote:     string;
  linkedin?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
// Para reordenar: basta alterar os ids em sequência (1, 2, 3...)
// O carousel segue a ordem do array.

const MEMBERS: Member[] = [
  {
    id: 2,
    name:     "Fernando Mauad",
    role:     "Associate Director",
    area:     "Investment Banking",
    company:  "UBS",
    photo:    FernandoMauad,
    linkedin: "https://www.linkedin.com/in/fernando-saad-mauad-8a4479164/",
    quote:    "A Insper Jr teve um papel importante na minha formação, tanto pela vivência prática e proximidade com o mercado quanto pelas relações e experiências construídas ao longo do caminho. É um período que lembro com muito orgulho e gratidão.",
  },
  {
    id: 8,
    name:     "Maria Fernanda Melo",
    role:     "Associate Consultant",
    company:  "Bain & Company",
    photo:    MariaFernandaMelo,
    linkedin: "https://www.linkedin.com/in/maria-fernanda-melo-8b6bba248/",
    quote:    "Sou muito grata pela resiliência, comprometimento e organização que desenvolvi na Insper Jr. e acredito que a minha experiência como consultora e diretora contribuíram muito para o meu desempenho no mercado de trabalho hoje em dia.",
  },  
  {
    id: 5,
    name:     "Gabriel Debiagi",
    role:     "Empresário",
    company:  "Empreendedorismo",
    photo:    GabrielDebiagi,
    linkedin: "https://www.linkedin.com/in/gabriel-debiagi-698321153/",
    quote:    "A Junior abriu todas as portas pra mim. Durante a Junior, conheci muita gente, fiz muitos contatos por conta dos treinamentos e das mentorias — e foi assim que fui convidado pela Ambev pra participar de um projeto de inovação. Entreguei o projeto e fui convidado pra estagiar no escritório central da América Latina da Ambev, sem processo seletivo. Entrei no trade marketing, um ano depois fui aprovado no trainee — eram 90 vagas pra 100 mil candidatos — e tenho certeza que foi muito por conta do desenvolvimento que tive na Junior. Depois de um ano de trainee, fui transferido pra Salvador pra assumir uma gerência de vendas de clientes de segmento VIP. Em menos de três anos, cheguei a um cargo de gerência na Ambev. Depois saí pra empreender, que sempre foi meu sonho. Minha família tem negócios em Campos do Jordão e eu assumi a gestão. Hoje, em menos de cinco anos após a Junior, toco três empresas, estou abrindo a quarta, e tenho quase 50 funcionários sob minha responsabilidade. A Junior foi o período mais feliz e mais marcante da minha carreira — ela que abriu tudo.",
  },
  {
    id: 4,
    name:     "Guilherme Katayama Kaidei",
    role:     "AI Intern",
    company:  "McKinsey & Company",
    photo:    GuilhermeKaidei,
    linkedin: "https://www.linkedin.com/in/guilherme-kaidei/",
    quote:    "Estar na Insper Jr. foi uma experiência essencial para o meu desenvolvimento profissional. Ter a oportunidade de trabalhar com pessoas de diferentes cursos, todas com o objetivo em comum de contribuir para o crescimento da empresa, me proporcionou muito aprendizado, troca de experiências e desenvolvimento tanto técnico quanto interpessoal. Durante meu tempo na empresa, também tive meu primeiro contato com projetos voltados para clientes reais, entendendo na prática a responsabilidade e o impacto de entregar soluções que geravam valor de verdade. Essa vivência me ajudou a desenvolver uma visão mais próxima da dinâmica do mercado de trabalho e foi fundamental para me preparar para os próximos passos da minha carreira, trazendo mais maturidade, senso de responsabilidade e visão profissional.",
  },
  {
    id: 11,
    name:     "Henrique Manequini",
    role:     "Analista",
    area: "Investment banking",
    company:  "G5 Partners",
    photo:    HenriqueManequini,
    linkedin: "https://www.linkedin.com/in/henrique-manequini-rocha-pinto-7a16b223a/",
    quote:    "A Insper Jr. teve um papel enorme na minha formação. Foi onde aprendi, na prática, a lidar com clientes de verdade, construir relações e trabalhar bem em equipe. As visitas a empresas e o contato com o mercado me ajudaram a entender de perto como as coisas funcionam e me mostraram que era na área em que eu queria estar. Além disso, desenvolvi soft skills e construi uma rede que me acompanha até hoje.",
  },  
  {
    id: 7,
    name:     "Leonardo Fernandes Farah Elias",
    role:     "Analista - Investment Banking",
    company:  "XP Inc.",
    photo:    LeonardoElias,
    linkedin: "https://www.linkedin.com/in/leonardo-fernandes-farah-elias-24a5041aa/",
    quote:    "Na IJR, pude assumir, ainda na graduação, responsabilidades que normalmente só viriam após anos de mercado, liderando times, tocando projetos e lidando com clientes. Tenho certeza que essa experiência acelerou meu desenvolvimento e abriu portas importantes no início da minha carreira.",
  }, 
  {
    id: 3,
    name:     "Mateus Marinheiro",
    role:     "Estagiário de Dados e IA",
    company:  "Galápagos Capital",
    photo:    MateusMarinheiro,
    linkedin: "https://www.linkedin.com/in/mateus-marinheiro-4a19b0324/",
    quote:    "Fiquei na Insper Jr. por 1 ano e 6 meses e, olhando para trás, tenho certeza de que foi uma das experiências mais marcantes da minha trajetória no Insper. Durante o período de trainee, tudo ainda era muito nebuloso para mim e eu ainda estava entendendo como a entidade funcionava, mas, depois da aprovação, percebi que estava entrando não só em uma empresa, mas em uma verdadeira família. Sem dúvida, foram os melhores semestres que vivi dentro da faculdade, tanto pelas pessoas quanto pelas experiências que tive. Além do desenvolvimento técnico na área de tecnologia, a Insper Jr. também me proporcionou aprendizados que iam muito além da engenharia, principalmente dentro do núcleo comercial, onde desenvolvi habilidades de comunicação, negociação e relacionamento que vou levar para toda a vida.",
  },
  {
    id: 1,
    name:     "Giovanna Fava Steinberg",
    role:     "Founder",
    company:  "PROTS Snacks",
    photo:    GiovannaFava,
    linkedin: "https://www.linkedin.com/in/giovanna-fava-steinberg",
    quote:    "Minha experiência na IJR foi muito enriquecedora, tanto profissionalmente quanto pessoalmente, além de ter sido os melhores anos que tive na faculdade. Tenho amigos que fiz na empresa júnior que mantenho até hoje.",
  },
  {
    id: 9,
    name:     "Tomas Miele",
    role:     "Data Analytics Intern",
    company:  "LTS Investments",
    photo:    TomasMiele,
    linkedin: "https://www.linkedin.com/in/tomas-miele/",
    quote:    "Durante minha passagem pela Jr, tive a oportunidade de atuar em múltiplos projetos que me proporcionaram uma vivência próxima ao dia a dia corporativo, lidando com prazos, desafios e impactos reais para empresas parceiras. Entre as experiências, participei do desenvolvimento de um website para uma empresa, em que tivemos o desafio de atender às necessidades e expectativas do cliente ao longo de todo o projeto. Essa experiência foi fundamental para meu desenvolvimento profissional, permitindo desenvolver habilidades técnicas e de trabalho em equipe em um ambiente com demandas e desafios reais.",
  },  
  {
    id: 10,
    name:     "João Gabriel Faraco",
    role:     "Estagiário de Data Science",
    area: "Cartão de Crédito",
    company:  "Galapagos Capital",
    photo:    JoaoFaraco,
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-gabriel-faraco-871a8628a/",
    quote:    "Fazer parte da Insper Junior foi uma experiência muito importante na minha trajetória no Insper. Além de representar meu primeiro contato com o mercado de trabalho, foi um período de grande aprendizado e desenvolvimento profissional. Também tive a oportunidade de construir conexões e trabalhar com pessoas que contribuíram bastante para minha formação.",
  },
  // {
  //   id: 6,
  //   name:     "Charlize Suarez",
  //   role:     "Estagiária de IB - M&A",
  //   company:  "Galapagos Capital",
  //   photo:    CharlizeSuarez,
  //   linkedin: "https://www.linkedin.com/in/charlize-suarez-325581265/",
  //   quote:    "",
  // },
  // {
  //   id: 12,
  //   initials: "EG", 
  //   name:     "Enzo Gargiulo",
  //   role:     "Investor relations",
  //   company:  "SPX Capital",
  //   linkedin: "https://www.linkedin.com/in/enzogargiulo/",
  //   quote:    "",
  // },
  
];

// ── Component ──────────────────────────────────────────────────────────────

const AlumniCarousel = () => {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [current,        setCurrent]        = useState(0);
  const [cardsVisible,   setCardsVisible]   = useState(2);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const maxIndex = Math.max(0, MEMBERS.length - cardsVisible);

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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(-${current * (CARD_WIDTH + GAP)}px)`;
  }, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
                <Card
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedMember(m)}
                  aria-label={`Ver depoimento completo de ${m.name}`}
                >
                  <CardStrip>
                    <AvatarRing>
                      {m.photo ? (
                        <AvatarImg src={m.photo} alt={m.name} />
                      ) : (
                        <AvatarInitials>{m.initials}</AvatarInitials>
                      )}
                    </AvatarRing>
                  </CardStrip>

                  <CardBody>
                    <QuoteMark aria-hidden="true">"</QuoteMark>
                    <Quote>{m.quote}</Quote>
                    <CardDivider />
                    <MemberMeta>
                      <MemberName>{m.name}</MemberName>
                      <MemberRole>{m.role}</MemberRole>
                    </MemberMeta>
                    <CardFooter>
                      <CompanyTag>{m.company}</CompanyTag>
                      <ReadMore>Ver depoimento →</ReadMore>
                    </CardFooter>
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

      {/* ── Modal split — depoimento completo ── */}
      {selectedMember && (
        <SplitOverlay onClick={() => setSelectedMember(null)}>
          <SplitBox onClick={(e) => e.stopPropagation()}>

            <SplitLeft>
              {selectedMember.photo ? (
                <SplitPhoto src={selectedMember.photo} alt={selectedMember.name} />
              ) : (
                <SplitInitials>{selectedMember.initials}</SplitInitials>
              )}
              <SplitPhotoGradient />
            </SplitLeft>

            <SplitRight>
              <SplitCloseBtn onClick={() => setSelectedMember(null)} aria-label="Fechar">✕</SplitCloseBtn>

              <SplitEyebrow>Depoimento</SplitEyebrow>
              <SplitQuoteMark aria-hidden="true">"</SplitQuoteMark>
              <SplitQuote>{selectedMember.quote}</SplitQuote>

              <SplitDivider />

              <SplitMeta>
                <SplitName>{selectedMember.name}</SplitName>
                <SplitRole>{selectedMember.role}</SplitRole>
                {selectedMember.area && (
                  <SplitArea>{selectedMember.area}</SplitArea>
                )}
                <CompanyTag style={{ marginTop: "10px" }}>{selectedMember.company}</CompanyTag>
                {selectedMember.linkedin && (
                  <LinkedInLink
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.554v-5.57c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.667H9.356V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Ver perfil no LinkedIn
                  </LinkedInLink>
                )}
              </SplitMeta>
            </SplitRight>

          </SplitBox>
        </SplitOverlay>
      )}

      {/* ── Modal ver todos ── */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Todos os ex-membros</ModalTitle>
              <CloseBtn onClick={() => setModalOpen(false)} aria-label="Fechar">✕</CloseBtn>
            </ModalHeader>
            <ModalGrid>
              {MEMBERS.map((m) => (
                <ModalCard
                  key={m.id}
                  onClick={() => { setModalOpen(false); setSelectedMember(m); }}
                >
                  <ModalAvatarWrap>
                    {m.photo ? (
                      <ModalAvatarImg src={m.photo} alt={m.name} />
                    ) : (
                      <ModalAvatarInitials>{m.initials}</ModalAvatarInitials>
                    )}
                  </ModalAvatarWrap>
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

// ── Animations ─────────────────────────────────────────────────────────────

const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const slideUp = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}`;
const slideIn = keyframes`from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}`;

// ── Layout ─────────────────────────────────────────────────────────────────

const StickyWrapper = styled.div`position: relative;`;

const StickySection = styled.section`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: ${SPACING.sectionY} ${SPACING.innerPaddingX} 32px;
  border-bottom: 1px solid ${BORDER_LIGHT};

  @media (max-width: 768px) { padding: 56px 1.5rem 24px; }
  @media (max-width: 768px) {
    padding: 56px 1.5rem 24px;
  }
  @media (max-width: 480px) {
    padding: 48px 1rem 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-shrink: 0;

  @media (max-width: 640px) { flex-direction: column; align-items: flex-start; gap: 16px; }
`;

const HeaderLeft  = styled.div``;
const HeaderRight = styled.div`display: flex; align-items: center; gap: 20px;`;

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

const Counter     = styled.div`display: flex; align-items: baseline; gap: 4px;`;

const CounterCurrent = styled.span`
  font-family: ${FONT_BODY};
  font-size: 28px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.03em;
`;

const CounterSep   = styled.span`font-family: ${FONT_BODY}; font-size: 14px; color: ${MUTED};`;
const CounterTotal = styled.span`font-family: ${FONT_BODY}; font-size: 14px; color: ${MUTED};`;

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

  @media (max-width: 640px) { padding: 12px 22px; }
`;

// ── Carousel ───────────────────────────────────────────────────────────────

const Viewport = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Track = styled.div`
  display: flex;
  gap: ${GAP}px;
  height: 100%;
  transition: transform 0.3s ease-out;
`;

// ── Card ───────────────────────────────────────────────────────────────────

const Card = styled.div`
  flex: 0 0 ${CARD_WIDTH}px;
  max-height: 460px;
  align-self: flex-start;
  background: ${BG_CREAM};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: visible;
  box-shadow: 0 2px 12px rgba(14, 4, 4, 0.07);
  cursor: pointer;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(192, 33, 33, 0.14);
    transform: translateY(-4px);
  }

  &:focus-visible {
    outline: 2px solid ${RED};
    outline-offset: 3px;
  }
`;

const CardStrip = styled.div`
  position: relative;
  width: 100%;
  height: ${STRIP_HEIGHT}px;
  border-radius: 12px 12px 0 0;
  flex-shrink: 0;
  background-image:
    linear-gradient(rgba(192,33,33,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,33,33,.06) 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #0e0404;
`;

const AvatarRing = styled.div`
  position: absolute;
  bottom: -${AVATAR_BLEED}px;
  left: 20px;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  border-radius: 50%;
  border: 2.5px solid rgba(192, 33, 33, 0.55);
  background: ${BG_CREAM};
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(14, 4, 4, 0.18);
  z-index: 2;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

const AvatarInitials = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_BODY};
  font-size: 34px;
  font-weight: 700;
  color: rgba(192, 33, 33, 0.35);
  letter-spacing: 0.04em;
  background: ${BG_CREAM};
`;

const CardBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${AVATAR_BLEED + 14}px 20px 20px;
  overflow: hidden;
`;

const QuoteMark = styled.span`
  position: absolute;
  top: 10px;
  right: 18px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 64px;
  line-height: 0.9;
  color: ${RED};
  user-select: none;
  pointer-events: none;
  opacity: 0.85;
`;

const Quote = styled.blockquote`
  font-family: ${FONT_BODY};
  font-size: 13.5px;
  font-weight: 400;
  line-height: 1.7;
  color: ${DARK};
  font-style: italic;
  margin: 0 0 14px;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const CardDivider = styled.div`
  width: 28px;
  height: 2px;
  background: ${RED};
  margin-bottom: 12px;
  flex-shrink: 0;
`;

const MemberMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 14px;
  flex-shrink: 0;
`;

const MemberName = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  font-weight: 700;
  color: ${DARK};
  margin: 0;
  line-height: 1.3;
`;

const MemberRole = styled.p`
  font-family: ${FONT_BODY};
  font-size: 12.5px;
  color: ${MUTED};
  margin: 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ReadMore = styled.span`
  font-family: ${FONT_BODY};
  font-size: 12px;
  font-weight: 600;
  color: ${RED};
  letter-spacing: 0.02em;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${Card}:hover & { opacity: 1; }
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

// ── Modal split ────────────────────────────────────────────────────────────

const SplitOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 4, 4, 0.78);
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.22s ease;
`;

const SplitBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  border-radius: 14px;
  overflow: hidden;
  animation: ${slideUp} 0.3s ${SPRING};
`;

const SplitLeft = styled.div`
  position: relative;
  flex: 0 0 380px;
  background: #0e0404;
  overflow: hidden;

  @media (max-width: 680px) { display: none; }
`;

const SplitPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`;

const SplitInitials = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_BODY};
  font-size: 72px;
  font-weight: 700;
  color: rgba(192, 33, 33, 0.25);
  background: #0e0404;
`;

const SplitPhotoGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(14,4,4,0.7), transparent);
  pointer-events: none;
`;

/* ── FIX: flex-start garante que "DEPOIMENTO" nunca sai da tela ── */
const SplitRight = styled.div`
  flex: 1;
  background: ${BG_CREAM};
  padding: 48px 44px 44px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow-y: auto;
  animation: ${slideIn} 0.35s ${SPRING};
`;

const SplitCloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 18px;
  color: ${MUTED};
  cursor: pointer;
  padding: 6px;
  line-height: 1;
  transition: color 0.2s;
  &:hover { color: ${DARK}; }
`;

const SplitEyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
  margin-bottom: 20px;
`;

const SplitQuoteMark = styled.span`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 80px;
  line-height: 0.8;
  color: ${RED};
  display: block;
  margin-bottom: 12px;
  user-select: none;
`;

/* ── FIX: max-height + scroll interno — meta nunca sai da tela ── */
const SplitQuote = styled.blockquote`
  font-family: ${FONT_BODY};
  font-size: 17px;
  font-weight: 400;
  line-height: 1.75;
  color: ${DARK};
  font-style: italic;
  margin: 0 0 28px;
  overflow-y: auto;
  max-height: 280px;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(192,33,33,0.25) transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(192,33,33,0.25); border-radius: 2px; }
`;

const SplitDivider = styled.div`
  width: 36px;
  height: 2px;
  background: ${RED};
  margin-bottom: 20px;
  flex-shrink: 0;
`;

/* ── FIX: margin-top auto gruda o meta no rodapé em textos curtos ── */
const SplitMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding-top: 4px;
`;

const SplitName = styled.p`
  font-family: ${FONT_BODY};
  font-size: 18px;
  font-weight: 700;
  color: ${DARK};
  margin: 0 0 4px;
`;

const SplitRole = styled.p`
  font-family: ${FONT_BODY};
  font-size: 14px;
  color: ${MUTED};
  margin: 0;
`;

const SplitArea = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${RED};
  margin: 6px 0 0;
`;

// ── Modal ver todos ────────────────────────────────────────────────────────

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

  @media (max-width: 640px) { padding: 24px 20px; max-height: 90vh; }
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

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const ModalCard = styled.div`
  background: ${BG_CREAM};
  border-radius: 8px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(192, 33, 33, 0.1);
    transform: translateY(-2px);
  }
`;

const ModalAvatarWrap = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(192, 33, 33, 0.3);
  margin-bottom: 10px;
`;

const ModalAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

const ModalAvatarInitials = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_BODY};
  font-size: 18px;
  font-weight: 700;
  color: rgba(192, 33, 33, 0.3);
  background: #fff;
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

const LinkedInLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-family: ${FONT_BODY};
  font-size: 13px;
  font-weight: 600;
  color: #0077B5;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.7; }
`;