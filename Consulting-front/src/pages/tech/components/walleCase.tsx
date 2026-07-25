import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
const C = {
  redTitle: "#A10F23",
  redCTA: "#C02121",
  redDark: "#691212",
  ink: "#1a1a1a",
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;
const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

const SLIDES: { src: string; label: string; portrait?: boolean }[] = [
  { src: slide01, label: "Contexto do projeto — escopo, problema do cliente e objetivo" },
  { src: slide02, label: "Desenvolvimento da solução — organização dos caminhos de atendimento" },
  { src: slide03, label: "Desenvolvimento da solução — IA central com base de conhecimento (RAG)" },
  { src: slide04, label: "Desenvolvimento da solução — modelagem dos fluxos de IA no n8n" },
  { src: slide05, label: "Desenvolvimento da solução — fluxo de ingestão de SAC" },
  { src: slide06, label: "Desenvolvimento da solução — fluxo de ingestão de Vendas" },
  { src: slide07, label: "Desenvolvimento da solução — Agente de Atendimento integrado ao WhatsApp" },
  { src: slide08, label: "Resultados do projeto — processo manual transformado em fluxo automatizado" },
  { src: slide09, label: "Resultados do projeto — atendimento por IA no WhatsApp", portrait: true },
];

const TOTAL_SLIDES = SLIDES.length;

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
          O <strong>Wall-E</strong> nasceu de uma <strong>atuação integrada entre frentes</strong>: antes da camada tecnológica, conduzimos um <strong>estudo operacional dos fluxos de venda e SAC</strong> do cliente para assegurar a experiência ponta a ponta. Só com a jornada mapeada e refinada, o escopo de <strong>Inteligência Artificial</strong> construiu o <strong>ecossistema multi-agente</strong> — quatro IAs especialistas, coordenadas por um classificador inteligente, que cobrem todo o atendimento de um cliente do setor de saúde.
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

          <CaseDeck ref={deckRef} aria-label="Apresentação do projeto Wall-E">
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
