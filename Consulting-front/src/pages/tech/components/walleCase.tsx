import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

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

const TOTAL_SLIDES = 6;

// ── Component ──────────────────────────────────────────────────────────────
export default function WalleCase() {
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
          <CaseBadge>CASE EM DESTAQUE</CaseBadge>
          <CaseBigName>Wall-E<Dot>.</Dot></CaseBigName>
        </CaseCounter>

        <CaseSub>
          Para mostrar o nível de complexidade que conseguimos entregar dentro do escopo de <strong>Automação</strong>: o <strong>Wall-E</strong> — um <strong>ecossistema multi-agente</strong> em que quatro IAs especialistas, coordenadas por um classificador inteligente, automatizam ponta a ponta a jornada de atendimento de um cliente do setor de saúde.
        </CaseSub>

        <CaseSplit>
          <CaseText>
            <CtEye>O projeto</CtEye>
            <CtH>Por que Wall-E?</CtH>
            <CtP>
              O cliente, do setor de saúde B2B, atendia em um único canal de WhatsApp três públicos completamente diferentes — <strong>leads em prospecção</strong>, <strong>clientes ativos com dúvidas operacionais</strong> e <strong>clientes aguardando entrega</strong>. Com um time enxuto, o atendimento era reativo, leads esfriavam e dúvidas simples consumiam horas.
            </CtP>

            <CtSub>Como foi feito</CtSub>
            <CtP>
              A solução foi um <strong>ecossistema de quatro IAs especialistas</strong>, cada uma com prompt, base de conhecimento e escopo próprios — coordenadas por um classificador interno que observa cada mensagem, identifica a intenção e direciona para o agente certo, em tempo real.
            </CtP>
            <CtP>
              Construído inteiramente sobre <strong>n8n</strong>, integrando <strong>LLMs</strong> e APIs internas do cliente, sem dependência de plataformas SaaS de chatbot. Cada agente atua só dentro da própria especialidade — fora dela, transfere para humano.
            </CtP>

            <CtSub>Estratégia</CtSub>
            <CtList>
              <li><strong>Especialização por agente</strong> — separar prompt, base e escopo reduz alucinação e mantém cada conversa coerente.</li>
              <li><strong>Roteamento contínuo</strong> — a IA de Classificação re-avalia a cada turno, inclusive quando o assunto muda.</li>
              <li><strong>Humano no momento certo</strong> — premissa: em dúvida, transfere. Sem suposição.</li>
              <li><strong>Quatro camadas de barreira</strong> — anti-prompt injection, escopo estrito, controle de alucinação e compliance do setor saúde.</li>
            </CtList>

            <CtFinal>Quatro IAs · três jornadas cobertas · 24/7 · um canal único.</CtFinal>
          </CaseText>

          <CaseDeck ref={deckRef} aria-label="Apresentação do projeto walle">
            <CdFrame>
              <CdStack>
                <SlideCover  active={idx === 0} />
                <SlideArch   active={idx === 1} />
                <SlideSpecs  active={idx === 2} />
                <SlidePrat   active={idx === 3} />
                <SlideBarr   active={idx === 4} />
                <SlideRes    active={idx === 5} />
              </CdStack>
            </CdFrame>

            <CdControls>
              <CdBtn onClick={goPrev} disabled={idx === 0} aria-label="Anterior">←</CdBtn>
              <CdProgress>
                <CdFill style={{ width: `${((idx + 1) / TOTAL_SLIDES) * 100}%` }} />
              </CdProgress>
              <CdCounter>{pad(idx + 1)} / {pad(TOTAL_SLIDES)}</CdCounter>
              <CdBtn onClick={goNext} disabled={idx === TOTAL_SLIDES - 1} aria-label="Próximo">→</CdBtn>
            </CdControls>
          </CaseDeck>
        </CaseSplit>
      </CaseInner>
    </CaseSection>
  );
}

// ── Slides ─────────────────────────────────────────────────────────────────
function SlideCover({ active }: { active: boolean }) {
  return (
    <CdSlide $active={active}>
      <CdiCover>
        <CdiGrid />
        <CdiCoverOrbit />
        <CdiCoverDot />
        <CdiCorner>Live · 2025</CdiCorner>
        <CdiCoverContent>
          <CdiPill>Case · Automação</CdiPill>
          <CdiBigName>Wall-E<Dot>.</Dot></CdiBigName>
          <CdiTag>Ecossistema multi-agente sobre <strong>WhatsApp Business</strong> — quatro IAs especialistas, um único canal.</CdiTag>
          <CdiMeta>
            <div><span>Setor</span>Saúde · B2B</div>
            <div><span>Canal</span>WhatsApp</div>
            <div><span>Stack</span>n8n · LLMs</div>
            <div><span>Agentes</span>4 IAs</div>
          </CdiMeta>
        </CdiCoverContent>
      </CdiCover>
    </CdSlide>
  );
}

function SlideArch({ active }: { active: boolean }) {
  return (
    <CdSlide $active={active}>
      <CdiArch>
        <CdiCorner>Hub &amp; Spoke</CdiCorner>
        <CdiEye>Arquitetura</CdiEye>
        <CdiH>Um <em>orquestrador,</em> três especialistas.</CdiH>
        <CdiArchStage>
          <CdiArchSvg viewBox="0 0 300 160" preserveAspectRatio="none" aria-hidden="true">
            <path d="M150 30 C150 60, 60 70, 50 130" />
            <path d="M150 30 C150 70, 150 80, 150 130" />
            <path d="M150 30 C150 60, 240 70, 250 130" />
          </CdiArchSvg>
          <CdiOrch>
            <CdiOrchPill>Orquestrador</CdiOrchPill>
            <CdiOrchName>IA de Classificação</CdiOrchName>
            <CdiOrchTag>Roteia · Observa · Transfere</CdiOrchTag>
          </CdiOrch>
          <CdiSpokes>
            <CdiSp><CdiSpNum>01</CdiSpNum><CdiSpName>IA de Vendas</CdiSpName><CdiSpTag>funil &amp; qualificação</CdiSpTag></CdiSp>
            <CdiSp><CdiSpNum>02</CdiSpNum><CdiSpName>IA de SAC</CdiSpName><CdiSpTag>suporte operacional</CdiSpTag></CdiSp>
            <CdiSp><CdiSpNum>03</CdiSpNum><CdiSpName>IA de Rastreio</CdiSpName><CdiSpTag>status &amp; logística</CdiSpTag></CdiSp>
          </CdiSpokes>
        </CdiArchStage>
      </CdiArch>
    </CdSlide>
  );
}

function SlideSpecs({ active }: { active: boolean }) {
  const cards = [
    {
      num: "01", eye: "Vendas", name: "Conduz o lead.",
      desc: "Qualifica, responde sobre produtos e prepara o handoff humano no momento certo.",
      tags: ["Funil ToFu → BoFu", "Catálogo & preço", "Agendamento humano"],
    },
    {
      num: "02", eye: "SAC", name: "Resolve dúvidas.",
      desc: "Suporte operacional sobre uso, integrações e plataforma. Em dúvida, transfere.",
      tags: ["Base de conhecimento", "Triagem inicial", "Fallback humano"],
    },
    {
      num: "03", eye: "Rastreio", name: "Devolve status.",
      desc: "Consulta sistemas internos e retorna o estado consolidado do pedido em tempo real.",
      tags: ["Integração via API", "5 fases logísticas", "ETA & nota fiscal"],
    },
  ];
  return (
    <CdSlide $active={active}>
      <CdiSpecs>
        <CdiCorner>Especialização</CdiCorner>
        <CdiEye>Especialistas</CdiEye>
        <CdiH>Cada agente, <em>uma especialidade.</em></CdiH>
        <CdiSpecsGrid>
          {cards.map(c => (
            <CdiCard key={c.num}>
              <CdiCardNum>{c.num}</CdiCardNum>
              <CdiCardEye>{c.eye}</CdiCardEye>
              <CdiCardName>{c.name}</CdiCardName>
              <CdiCardDesc>{c.desc}</CdiCardDesc>
              <CdiCardTags>
                {c.tags.map(t => <CdiCardTag key={t}>{t}</CdiCardTag>)}
              </CdiCardTags>
            </CdiCard>
          ))}
        </CdiSpecsGrid>
      </CdiSpecs>
    </CdSlide>
  );
}

function SlidePrat({ active }: { active: boolean }) {
  const chats = [
    { msg: "Quanto custa esse produto?", route: "Vendas" },
    { msg: "Como integro com meu ERP?", route: "SAC" },
    { msg: "Cadê meu pedido?", route: "Rastreio" },
  ];
  return (
    <CdSlide $active={active}>
      <CdiPrat>
        <CdiCorner>Demo · 04</CdiCorner>
        <CdiEye>Na prática</CdiEye>
        <CdiH>Resposta certa, <em>no agente certo.</em></CdiH>
        <CdiChats>
          {chats.map((c, i) => (
            <CdiChat key={i}>
              <CdiChatBubble>"{c.msg}"</CdiChatBubble>
              <CdiArrow>
                <svg viewBox="0 0 24 8" aria-hidden="true"><path d="M2 4 L22 4 M18 1 L22 4 L18 7" /></svg>
                <div>ROTEIA</div>
              </CdiArrow>
              <CdiRoute><span>IA de</span>{c.route}</CdiRoute>
            </CdiChat>
          ))}
        </CdiChats>
        <CdiPratFoot>premissa <strong>·</strong> em dúvida, transfere para humano <strong>·</strong> sem alucinação</CdiPratFoot>
      </CdiPrat>
    </CdSlide>
  );
}

function SlideBarr({ active }: { active: boolean }) {
  const layers = [
    { n: "01", h: "Anti-prompt injection", t: "Sanitiza entrada e isola instruções do usuário do prompt-sistema." },
    { n: "02", h: "Escopo estrito", t: "Cada agente só responde dentro da sua especialidade declarada." },
    { n: "03", h: "Anti-alucinação", t: "Sem informação na base, escala para humano em vez de inventar." },
    { n: "04", h: "Compliance", t: "Tratamento adequado de dados sensíveis no contexto da saúde." },
  ];
  return (
    <CdSlide $active={active}>
      <CdiBarr>
        <CdiCorner>Defense-in-depth · 4 camadas</CdiCorner>
        <CdiEye>Barreiras</CdiEye>
        <CdiH>Quatro camadas, <em>em todos os agentes.</em></CdiH>
        <CdiBarrStage>
          <CdiBarrVis>
            <CdiBarrRing $level={1}><span>01</span></CdiBarrRing>
            <CdiBarrRing $level={2}><span>02</span></CdiBarrRing>
            <CdiBarrRing $level={3}><span>03</span></CdiBarrRing>
            <CdiBarrRing $level={4}><span>04</span></CdiBarrRing>
            <CdiBarrCore>Wall-E</CdiBarrCore>
          </CdiBarrVis>
          <CdiBarrList>
            {layers.map(l => (
              <CdiBarrC key={l.n}>
                <CdiBarrCN>{l.n}</CdiBarrCN>
                <div><strong>{l.h}</strong>{l.t}</div>
              </CdiBarrC>
            ))}
          </CdiBarrList>
        </CdiBarrStage>
      </CdiBarr>
    </CdSlide>
  );
}

function SlideRes({ active }: { active: boolean }) {
  return (
    <CdSlide $active={active}>
      <CdiRes>
        <CdiCorner>Resultado · 06</CdiCorner>
        <CdiEye>Resultado</CdiEye>
        <CdiH>Uma solução completa, <em>em um único canal.</em></CdiH>
        <CdiResStage>
          <CdiResHero>
            <CdiResHeroNum>24<sup>/7</sup></CdiResHeroNum>
            <CdiResHeroLab>disponibilidade contínua,<br />sem fila de espera.</CdiResHeroLab>
            <CdiResHeroRule />
          </CdiResHero>
          <CdiStats>
            <div><strong>4</strong><span>agentes especialistas operando em paralelo</span></div>
            <div><strong>3</strong><span>jornadas cobertas <br />(vendas · suporte · pós)</span></div>
            <div><strong>1</strong><span>canal único — sem mudança no comportamento do cliente</span></div>
          </CdiStats>
        </CdiResStage>
      </CdiRes>
    </CdSlide>
  );
}

// ── Animations ─────────────────────────────────────────────────────────────
const cdiPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

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
  aspect-ratio: 4/3;
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

const CdImgBase = `
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.25rem 2rem;
  background: linear-gradient(180deg, #fff 0%, #faf6f1 100%);
  overflow: hidden;
`;

const CdiEye = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: ${C.redTitle};
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  position: relative;
  z-index: 2;
  &::before { content: ""; display: block; width: 18px; height: 1.5px; background: ${C.redTitle}; }
`;

const CdiH = styled.h5`
  font-family: ${FONT_TITLE};
  font-size: 22px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: -0.02em;
  line-height: 1.18;
  margin: 0 0 1.2rem;
  position: relative;
  z-index: 2;
  em { font-style: italic; color: ${C.redTitle}; font-weight: 700; }
`;

const CdiCorner = styled.div`
  position: absolute;
  top: 1.4rem;
  right: 1.6rem;
  font-family: ${FONT_MONO};
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: rgba(0,0,0,0.35);
  text-transform: uppercase;
  z-index: 3;
  pointer-events: none;
  &::before {
    content: "●";
    color: ${C.redTitle};
    margin-right: 0.4rem;
    font-size: 8px;
    animation: ${cdiPulse} 2.4s ease-in-out infinite;
  }
`;

// ── Slide 01 — Cover ──────────────────────────────────────────────────────
const CdiCover = styled.div`
  ${CdImgBase}
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(135deg, #fff 0%, #fbf5ee 60%, #f5e9dc 100%);
  padding: 2rem 2.2rem;
`;

const CdiGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(26,26,26,0.045) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(26,26,26,0.045) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse at 70% 30%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 70% 30%, #000 30%, transparent 75%);
`;

const CdiCoverOrbit = styled.div`
  position: absolute;
  top: -40%;
  right: -30%;
  width: 120%;
  height: 160%;
  border-radius: 50%;
  border: 1px dashed rgba(161,15,35,0.18);
  pointer-events: none;
  &::before {
    content: "";
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    border: 1px dashed rgba(161,15,35,0.12);
  }
  &::after {
    content: "";
    position: absolute;
    inset: 18%;
    border-radius: 50%;
    border: 1px dashed rgba(161,15,35,0.08);
  }
`;

const CdiCoverDot = styled.div`
  position: absolute;
  top: 14%;
  right: 18%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${C.redTitle};
  box-shadow: 0 0 0 6px rgba(161,15,35,0.15), 0 0 0 12px rgba(161,15,35,0.08);
`;

const CdiCoverContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const CdiPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${FONT_MONO};
  font-size: 9.5px;
  letter-spacing: 0.24em;
  color: ${C.redTitle};
  text-transform: uppercase;
  padding: 0.45rem 0.85rem;
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(161,15,35,0.3);
  border-radius: 2px;
  margin-bottom: 1.1rem;
  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${C.redTitle};
  }
`;

const CdiBigName = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 84px;
  font-weight: 800;
  color: ${C.ink};
  letter-spacing: -0.055em;
  line-height: 0.88;
  margin: 0 0 0.25rem;
  @media (max-width: 700px) { font-size: 56px; }
`;

const CdiTag = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: #555;
  margin: 0.4rem 0 1.4rem;
  line-height: 1.55;
  max-width: 380px;
  strong { color: ${C.ink}; font-weight: 600; }
`;

const CdiMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 0.85rem;
  > div {
    font-family: ${FONT_TITLE};
    font-size: 12px;
    font-weight: 600;
    color: ${C.ink};
    padding-right: 0.5rem;
    border-right: 1px solid rgba(0,0,0,0.08);
    &:last-child { border-right: none; }
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
  }
`;

// ── Slide 02 — Architecture ───────────────────────────────────────────────
const CdiArch = styled.div`
  ${CdImgBase}
  padding: 1.6rem 2rem 2.2rem;
`;

const CdiArchStage = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
  margin-top: 0.5rem;
`;

const CdiArchSvg = styled.svg`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  pointer-events: none;
  path {
    stroke: rgba(161,15,35,0.4);
    stroke-width: 1.2;
    fill: none;
    stroke-dasharray: 3 3;
  }
`;

const CdiOrch = styled.div`
  position: relative;
  background: linear-gradient(135deg, ${C.redTitle}, ${C.redDark});
  color: #fff;
  padding: 0.85rem 1.4rem;
  border-radius: 6px;
  text-align: center;
  min-width: 240px;
  box-shadow: 0 8px 24px -8px rgba(161,15,35,0.5);
  z-index: 2;
  &::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 8px;
    border: 1px solid rgba(161,15,35,0.25);
    pointer-events: none;
  }
`;

const CdiOrchPill = styled.div`
  font-family: ${FONT_MONO};
  font-size: 8.5px;
  letter-spacing: 0.24em;
  color: rgba(255,255,255,0.78);
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const CdiOrchName = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const CdiOrchTag = styled.div`
  font-family: ${FONT_MONO};
  font-size: 8.5px;
  color: rgba(255,255,255,0.65);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

const CdiSpokes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.55rem;
  width: 100%;
  margin-top: 4.2rem;
  position: relative;
  z-index: 2;
`;

const CdiSp = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 0.7rem 0.8rem;
  border-radius: 4px;
  text-align: left;
  position: relative;
  box-shadow: 0 2px 8px -4px rgba(0,0,0,0.06);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${C.redTitle};
    border-radius: 4px 4px 0 0;
  }
`;

const CdiSpNum = styled.span`
  font-family: ${FONT_MONO};
  font-size: 9px;
  color: ${C.redTitle};
  font-weight: 700;
  letter-spacing: 0.16em;
  margin-bottom: 0.25rem;
  display: block;
`;

const CdiSpName = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 12px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: -0.01em;
  margin-bottom: 0.15rem;
`;

const CdiSpTag = styled.div`
  font-family: ${FONT_MONO};
  font-size: 9px;
  color: #888;
  letter-spacing: 0.05em;
`;

// ── Slide 03 — Specs ──────────────────────────────────────────────────────
const CdiSpecs = styled.div`
  ${CdImgBase}
  padding: 1.6rem 1.6rem 2rem;
`;

const CdiSpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  flex: 1;
`;

const CdiCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 0.95rem 0.8rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(180deg, rgba(161,15,35,0.06), transparent);
  }
`;

const CdiCardNum = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.7rem;
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 800;
  color: rgba(161,15,35,0.12);
  letter-spacing: -0.04em;
  line-height: 1;
  z-index: 1;
`;

const CdiCardEye = styled.div`
  font-family: ${FONT_MONO};
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: ${C.redTitle};
  text-transform: uppercase;
  margin-bottom: 0.55rem;
  position: relative;
  z-index: 2;
`;

const CdiCardName = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 15px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: -0.015em;
  margin-bottom: 0.45rem;
  position: relative;
  z-index: 2;
`;

const CdiCardDesc = styled.p`
  font-family: ${FONT_BODY};
  font-size: 10.5px;
  color: #555;
  line-height: 1.45;
  margin-bottom: 0.7rem;
  margin-top: 0;
  position: relative;
  z-index: 2;
`;

const CdiCardTags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: auto;
  position: relative;
  z-index: 2;
`;

const CdiCardTag = styled.div`
  font-family: ${FONT_MONO};
  font-size: 8.5px;
  color: #666;
  letter-spacing: 0.04em;
  padding-left: 0.6rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    width: 3px;
    height: 3px;
    background: ${C.redTitle};
    border-radius: 50%;
  }
`;

// ── Slide 04 — In practice ────────────────────────────────────────────────
const CdiPrat = styled.div`
  ${CdImgBase}
  padding: 1.5rem 1.8rem 3.2rem;
  background: linear-gradient(180deg, #fff 0%, #f5ede1 100%);
`;

const CdiChats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: center;
`;

const CdiChat = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.6rem;
  align-items: center;
`;

const CdiChatBubble = styled.div`
  background: #fff;
  border-radius: 10px 10px 10px 2px;
  padding: 0.6rem 0.8rem;
  font-family: ${FONT_BODY};
  font-size: 11.5px;
  color: ${C.ink};
  box-shadow: 0 2px 6px -2px rgba(0,0,0,0.08);
  position: relative;
  &::before {
    content: "USER";
    display: block;
    font-family: ${FONT_MONO};
    font-size: 7.5px;
    letter-spacing: 0.18em;
    color: #999;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }
`;

const CdiArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  font-family: ${FONT_MONO};
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: ${C.redTitle};
  font-weight: 700;
  svg { width: 24px; height: 8px; }
  svg path { stroke: ${C.redTitle}; stroke-width: 1.5; fill: none; }
`;

const CdiRoute = styled.div`
  background: linear-gradient(135deg, ${C.redTitle}, ${C.redDark});
  color: #fff;
  border-radius: 4px;
  padding: 0.55rem 0.65rem;
  font-family: ${FONT_TITLE};
  font-size: 11.5px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.01em;
  box-shadow: 0 4px 12px -4px rgba(161,15,35,0.4);
  span {
    display: block;
    font-family: ${FONT_MONO};
    font-size: 7.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
    margin-bottom: 0.18rem;
  }
`;

const CdiPratFoot = styled.div`
  margin-top: 0.7rem;
  padding-top: 0.55rem;
  border-top: 1px dashed rgba(0,0,0,0.15);
  font-family: ${FONT_MONO};
  font-size: 9.5px;
  color: #666;
  letter-spacing: 0.06em;
  text-align: center;
  strong { color: ${C.redTitle}; font-weight: 700; }
`;

// ── Slide 05 — Barriers ───────────────────────────────────────────────────
const CdiBarr = styled.div`
  ${CdImgBase}
  padding: 1.6rem 1.8rem 2rem;
`;

const CdiBarrStage = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 1.2rem;
  align-items: center;
`;

const CdiBarrVis = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CdiBarrRing = styled.div<{ $level: number }>`
  position: absolute;
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  ${p => p.$level === 1 && `inset: 0; border-color: rgba(161,15,35,0.35);`}
  ${p => p.$level === 2 && `inset: 14%; border-color: rgba(161,15,35,0.45);`}
  ${p => p.$level === 3 && `inset: 28%; border-color: rgba(161,15,35,0.6);`}
  ${p => p.$level === 4 && `inset: 36%; border-color: rgba(161,15,35,0.85);`}

  span {
    position: absolute;
    top: -7px;
    background: #fff;
    padding: 0 0.4rem;
    font-family: ${FONT_MONO};
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: ${C.redTitle};
    text-transform: uppercase;
  }
`;

const CdiBarrCore = styled.div`
  position: absolute;
  width: 46%;
  height: 46%;
  left: 27%;
  top: 27%;
  background: ${C.redTitle};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  box-shadow: 0 0 0 6px rgba(161,15,35,0.12);
`;

const CdiBarrList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const CdiBarrC = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 0.55rem 0.75rem;
  border-radius: 3px;
  font-family: ${FONT_BODY};
  font-size: 11px;
  color: #444;
  line-height: 1.4;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem;
  align-items: start;
  strong {
    display: block;
    font-family: ${FONT_TITLE};
    font-size: 11.5px;
    font-weight: 700;
    color: ${C.ink};
    margin-bottom: 0.1rem;
  }
`;

const CdiBarrCN = styled.div`
  font-family: ${FONT_MONO};
  font-size: 9.5px;
  font-weight: 700;
  color: ${C.redTitle};
  letter-spacing: 0.1em;
  padding-top: 1px;
`;

// ── Slide 06 — Result ─────────────────────────────────────────────────────
const CdiRes = styled.div`
  ${CdImgBase}
  padding: 1.8rem 2rem 2.2rem;
  background: linear-gradient(135deg, #fff 0%, #fbf5ee 100%);
`;

const CdiResStage = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.5rem;
  align-items: center;
`;

const CdiResHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CdiResHeroNum = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 120px;
  font-weight: 800;
  color: ${C.redTitle};
  letter-spacing: -0.07em;
  line-height: 0.85;
  margin: 0;
  sup {
    font-family: ${FONT_TITLE};
    font-size: 32px;
    font-weight: 600;
    color: ${C.redTitle};
    vertical-align: top;
    letter-spacing: -0.02em;
    margin-left: 0.1em;
  }
`;

const CdiResHeroLab = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 14px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: -0.01em;
  margin-top: 0.45rem;
  line-height: 1.3;
`;

const CdiResHeroRule = styled.div`
  width: 48px;
  height: 2px;
  background: ${C.redTitle};
  margin-top: 0.85rem;
`;

const CdiStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(0,0,0,0.1);
  > div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.85rem;
    align-items: baseline;
    padding: 0.65rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    strong {
      font-family: ${FONT_TITLE};
      font-size: 28px;
      font-weight: 800;
      color: ${C.ink};
      letter-spacing: -0.025em;
      line-height: 1;
    }
    span {
      font-family: ${FONT_BODY};
      font-size: 11px;
      color: #555;
      line-height: 1.4;
    }
  }
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
