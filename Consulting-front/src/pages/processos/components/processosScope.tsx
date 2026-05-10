import React, { useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "../../../hooks/useInView";
import { useParticles } from "../../../hooks/useParticleBackground";

/* ─── Tokens ─────────────────────────────────────────── */
const RED        = "#C02121";
const DARK       = "#1a1a18";
const MUTED      = "#7a746e";
const BG_DARK    = "#0e0404";
const CREAM      = "#FAF2EA";
const BORDER     = "rgba(26,26,24,0.08)";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

/* ─── Animations ─────────────────────────────────────── */
const fadeUp  = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}`;
const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;
const panelIn = keyframes`
  from { opacity: 0; max-height: 0; }
  to   { opacity: 1; max-height: 800px; }
`;

/* ─── Data ───────────────────────────────────────────── */
interface Scope {
  title: string;
  short: string;
  full: string[];
  expect: { title: string; body: string }[];
  icon: React.ReactNode;
}

const SCOPES: Scope[] = [
  {
    title: "Mapeamento e Diagnóstico de Processos",
    short: "Entendemos e estruturamos seus processos, identificando gargalos, oportunidades de melhoria e organizando fluxos de trabalho para aumentar a eficiência operacional.",
    full: [
      "Atuamos na coleta e análise de informações da operação, mapeando fluxos, atividades e interdependências entre etapas produtivas ou administrativas.",
      "Realizamos o levantamento detalhado das operações por meio de entrevistas, observação e análise de dados, construindo fluxogramas que representam fielmente o funcionamento atual do sistema. Além disso, aplicamos técnicas de diagnóstico para identificar gargalos, retrabalhos e desperdícios, gerando hipóteses iniciais de melhoria.",
      "Esse processo permite ao cliente ter maior visibilidade sobre sua operação, facilitando o controle, a padronização e a tomada de decisões estratégicas baseadas em dados e não apenas em percepção",
    ],
    expect: [
      { title: "Visibilidade Operacional",        body: "Clareza sobre como seus processos realmente funcionam, com identificação de gargalos, retrabalhos e ineficiências ocultas." },
      { title: "Estruturação de Processos",       body: "Organização dos fluxos de trabalho por meio de fluxogramas e padronizações que facilitam a gestão e o controle da operação." },
      { title: "Base para Decisões Estratégicas", body: "Diagnósticos fundamentados em dados que permitem priorizar melhorias e direcionar esforços com maior assertividade." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 12h12M3 18h18"/>
        <circle cx="6" cy="6" r="1.2" fill="currentColor"/>
        <circle cx="6" cy="12" r="1.2" fill="currentColor"/>
        <circle cx="6" cy="18" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "Simulação de Processos",
    short: "Construímos modelos computacionais da sua operação para simular cenários, testar mudanças e prever impactos antes da implementação.",
    full: [
      "A simulação de processos permite analisar sistemas complexos de forma segura e eficiente, sem a necessidade de intervenções diretas na operação real. Neste escopo, desenvolvemos modelos computacionais que representam fielmente o funcionamento do sistema mapeado.",
      "A partir da coleta e análise de dados, como tempos operacionais (cronoanálise), capacidades e variabilidades, construímos simulações que possibilitam testar diferentes cenários e estratégias. Isso inclui mudanças em recursos, layout, demanda ou fluxo de atividades",
      "Com isso, conseguimos identificar gargalos ocultos, prever comportamentos do sistema e avaliar o impacto de decisões antes de sua implementação, reduzindo riscos e aumentando a assertividade das escolhas.",
    ],
    expect: [
      { title: "Teste de Cenários sem Risco",       body: "Avaliação de mudanças na operação sem necessidade de implementação real, reduzindo custos e riscos." },
      { title: "Identificação de Gargalos Ocultos", body: "Análise aprofundada do comportamento do sistema, revelando limitações que não são visíveis no dia a dia." },
      { title: "Apoio Quantitativo à Decisão",      body: "Insights baseados em modelos computacionais que aumentam a precisão e segurança na tomada de decisão." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h3l3-7 4 14 3-7h5"/>
      </svg>
    ),
  },
  {
    title: "Otimização de Processos e Operações",
    short: "Analisamos cenários e propomos melhorias para aumentar eficiência, reduzir custos e otimizar o desempenho da sua operação.",
    full: [
      "Após o entendimento e a simulação da operação, avançamos para a etapa de otimização, onde transformamos análises em soluções práticas e aplicáveis.",
      "Nossa equipe avalia diferentes cenários operacionais e propõe melhorias que podem envolver redistribuição de recursos, ajustes de fluxo, mudanças de layout ou redefinição de processos. O foco está sempre em maximizar eficiência, reduzir desperdícios e aumentar a produtividade.",
      "As recomendações são construídas com base em dados e validadas por meio de simulação, garantindo maior segurança na tomada de decisão. Ao final, entregamos um plano estruturado com sugestões claras e priorizadas, permitindo ao cliente implementar melhorias de forma estratégica e sustentável.",
    ],
    expect: [
      { title: "Aumento da Eficiência Operacional",   body: "Redução de desperdícios, melhor uso de recursos e aumento da produtividade da operação." },
      { title: "Recomendações Estratégicas Claras",   body: "Propostas estruturadas de melhoria com base em análises e simulações validadas." },
      { title: "Implementação Orientada a Resultado", body: "Direcionamento prático para execução das melhorias, com foco em impacto real e crescimento sustentável." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10M10 20V4M16 20V14M22 20V8"/>
        <path d="M2 20h22"/>
      </svg>
    ),
  },
];

/* ─── Section ────────────────────────────────────────── */
const Section = styled.section`
  background: ${CREAM};
  padding: 96px 0 0;
  @media (max-width: 960px) { padding: 72px 0 0; }
`;

const Inner = styled.div`
  max-width: 1240px; margin: 0 auto; padding: 0 56px;
  @media (max-width: 960px) { padding: 0 28px; }
`;

/* ─── Header ─────────────────────────────────────────── */
const Header = styled.div<{ $v: boolean }>`
  display: flex; flex-direction: column; gap: 20px;
  max-width: 680px; margin-bottom: 64px;
  opacity: ${p => p.$v ? 1 : 0};
  animation: ${p => p.$v ? fadeUp : "none"} .55s .05s ${SPRING} both;
`;
const Eyebrow = styled.span`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: ${RED};
`;
const H2 = styled.h2`
  font-family: ${FONT_TITLE}; font-size: 32px; font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.1; color: ${DARK}; margin: 0;
  i { font-style: italic; font-weight: 400; }
  @media (max-width: 960px) { font-size: 28px; }
`;
const HDivider = styled.div<{ $v: boolean }>`
  width: 48px; height: 3px; background: ${RED}; transform-origin: left;
  transform: ${p => p.$v ? "scaleX(1)" : "scaleX(0)"};
  animation: ${p => p.$v ? lineGrow : "none"} .5s .4s ${SPRING} both;
`;
const Lead = styled.p`
  font-family: ${FONT_BODY}; font-size: 16px; line-height: 1.65;
  color: ${MUTED}; max-width: 540px; margin: 0;
`;

/* ─── Pipeline ───────────────────────────────────────── */
/*
  Linha tracejada vai do centro do nó 1 ao centro do nó 3.
  Cada coluna tem 33.33% de largura. O nó tem 68px de diâmetro.
  Centro da col 1 ≈ 16.67%, centro da col 3 ≈ 83.33%.
  Usamos padding: 0 24px em cada Stage, então ajustamos com calc.
*/
const Pipeline = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  /* Linha do centro do nó 1 ao centro do nó 3 — cada coluna é 1/3, centros em 1/6 e 5/6 */
  &::before {
    content: "";
    position: absolute;
    top: 34px;
    left: calc(100% / 6);
    right: calc(100% / 6);
    height: 1px;
    background: repeating-linear-gradient(
      to right,
      rgba(26,26,24,.25) 0 6px,
      transparent 6px 12px
    );
    z-index: 0;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 32px;
    &::before { display: none; }
  }
`;

/* Cada Stage centraliza o nó horizontalmente, texto fica alinhado à esquerda */
const Stage = styled.div<{ $active: boolean }>`
  flex: 1;
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  align-items: center;       /* centraliza o nó */
  padding: 0 24px;
  cursor: default;
`;

const StageNode = styled.div<{ $active: boolean }>`
  width: 68px; height: 68px; border-radius: 50%;
  background: ${p => p.$active ? BG_DARK : CREAM};
  border: 1.5px solid ${p => p.$active ? RED : "rgba(26,26,24,.18)"};
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$active ? RED : DARK};
  transition: .3s; flex-shrink: 0; margin-bottom: 24px;
  cursor: pointer;
  svg { width: 28px; height: 28px; stroke-width: 1.4; }
  ${p => p.$active && `box-shadow: 0 0 0 6px rgba(192,33,33,.08);`}
  &:hover { border-color: ${RED}; }
`;

/* texto e botão centralizados dentro da coluna */
const StageBody = styled.div`
  width: 100%;
  text-align: center;
  display: flex; flex-direction: column;
  align-items: center;
`;

const StageTitle = styled.h3`
  font-family: ${FONT_TITLE}; font-size: 18px; font-weight: 700;
  letter-spacing: -0.01em; line-height: 1.2; color: ${DARK};
  margin: 0 0 10px;
`;

const StageText = styled.p`
  font-family: ${FONT_BODY}; font-size: 14px; line-height: 1.65;
  color: ${MUTED}; margin: 0 0 16px; flex: 1;
`;

/* "Ver mais" — explícito e intuitivo */
const VerMais = styled.button<{ $active: boolean }>`
  display: inline-flex; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; padding: 0;
  font-family: ${FONT_BODY}; font-size: 13px; font-weight: 600;
  color: ${p => p.$active ? "rgba(192,33,33,.5)" : RED};
  transition: gap .2s, color .2s;
  align-self: flex-start;

  svg {
    flex-shrink: 0;
    transition: transform .3s ${SPRING};
    transform: ${p => p.$active ? "rotate(45deg)" : "rotate(0)"};
  }

  &:hover { gap: 10px; }
`;

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

/* ─── Detail panel ───────────────────────────────────── */
const DetailWrap = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${p => p.$open ? "800px" : "0"};
  transition: max-height .55s ${SPRING};
  margin-top: 64px;
`;

const Detail = styled.div`
  position: relative;
  background: ${BG_DARK};
  overflow: hidden;
  isolation: isolate;
`;

const Blueprint = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .5;
  background-image:
    linear-gradient(rgba(192,33,33,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,33,33,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
`;

const Glow = styled.div<{ $on: boolean; $x: number; $y: number }>`
  position: absolute; width: 560px; height: 560px; border-radius: 50%;
  background: radial-gradient(circle, rgba(192,33,33,.14) 0%, transparent 65%);
  pointer-events: none; z-index: 1; mix-blend-mode: screen;
  transform: translate(-50%,-50%);
  left: ${p => p.$x}px; top: ${p => p.$y}px;
  opacity: ${p => p.$on ? 1 : 0}; transition: opacity .35s ease;
`;

/* 2 colunas: texto à esquerda, entregas à direita (coluna única vertical) */
const DetailInner = styled.div<{ $v: boolean }>`
  position: relative; z-index: 2;
  max-width: 1240px; margin: 0 auto; padding: 64px 80px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
  align-items: start;
  opacity: ${p => p.$v ? 1 : 0};
  transform: ${p => p.$v ? "translateY(0)" : "translateY(20px)"};
  transition: opacity .45s ${SPRING}, transform .45s ${SPRING};

  @media (max-width: 960px) {
    grid-template-columns: 1fr; padding: 48px 28px; gap: 40px;
  }
`;

const PanelTitle = styled.h3`
  font-family: ${FONT_TITLE}; font-size: 28px; font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.15; color: ${CREAM};
  margin: 0 0 20px;
`;

const PanelBody = styled.div`
  font-family: ${FONT_BODY}; font-size: 15px; line-height: 1.7;
  color: rgba(250,242,234,.6);
  p { margin: 0 0 14px; }
  p:last-child { margin: 0; }
`;

const PanelClose = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; padding: 0; margin-top: 28px;
  font-family: ${FONT_BODY}; font-size: 13px; font-weight: 600;
  color: rgba(250,242,234,.35); transition: color .2s;
  &:hover { color: rgba(250,242,234,.7); }
`;

/* Entregas — coluna única vertical, sem numeração */
const ExpectList = styled.div`
  display: flex; flex-direction: column;
`;

const ExpectLabel = styled.div`
  font-family: ${FONT_BODY}; font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase;
  color: rgba(250,242,234,.35); margin-bottom: 24px;
  display: flex; align-items: center; gap: 10px;
  &::before { content: ""; display: block; width: 18px; height: 2px; background: ${RED}; }
`;

const ExpectItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,.07);
  &:last-child { border-bottom: none; }
`;

const ExpectTitle = styled.div`
  font-family: ${FONT_TITLE}; font-size: 15px; font-weight: 700;
  color: ${CREAM}; margin-bottom: 6px; letter-spacing: -0.01em;
`;

const ExpectText = styled.div`
  font-family: ${FONT_BODY}; font-size: 13px; line-height: 1.6;
  color: rgba(250,242,234,.5);
`;

const ChevUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

/* ─── Component ───────────────────────────────────────── */
export default function ProcessosScope() {
  const [active, setActive]   = useState<number | null>(null);
  const [panelVis, setPanelVis] = useState(false);   /* controla a animação do conteúdo */
  const detailRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(detailRef, canvasRef);

  const { ref: hRef, visible: hV } = useInView(0.1);
  const { ref: pRef, visible: pV } = useInView(0.1);

  const [g, setG]     = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = detailRef.current?.getBoundingClientRect();
    if (!r) return;
    setG({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const toggle = (i: number) => {
    const next = active === i ? null : i;
    setPanelVis(false);
    setActive(next);
    if (next !== null) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize")); /* reinicializa canvas do useParticles */
        setPanelVis(true);
      }, 320);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 120);
    }
  };

  const cur = active !== null ? SCOPES[active] : null;

  return (
    <Section id="escopos">
      <Inner>
        <Header ref={hRef} $v={hV}>
          <Eyebrow>Nossos escopos</Eyebrow>
          <H2>O que podemos fazer pela sua <i>operação</i></H2>
          <HDivider $v={hV} />
          <Lead>
            Três escopos complementares que cobrem desde o entendimento inicial
            dos seus processos até a recomendação de melhorias validadas por simulação.
          </Lead>
        </Header>

        <Pipeline
          ref={pRef as React.RefObject<HTMLDivElement>}
          style={{ opacity: pV ? 1 : 0, transition: "opacity .55s" }}
        >
          {SCOPES.map((s, i) => {
            const isActive = active === i;
            return (
              <Stage key={s.title} $active={isActive}>
                <StageNode $active={isActive} onClick={() => toggle(i)}>{s.icon}</StageNode>
                <StageBody>
                  <StageTitle>{s.title}</StageTitle>
                  <StageText>{s.short}</StageText>
                  <VerMais $active={isActive} onClick={() => toggle(i)}>
                    {isActive ? "Fechar" : "Ver mais"}
                    <PlusIcon />
                  </VerMais>
                </StageBody>
              </Stage>
            );
          })}
        </Pipeline>
      </Inner>

      {/* Detail panel — visível apenas quando um escopo está selecionado */}
      <DetailWrap $open={active !== null}>
        <Detail
          ref={detailRef}
          onMouseMove={onMove}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        >
          <canvas ref={canvasRef} style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 0,
          }} />
          <Blueprint />
          <Glow $on={hov} $x={g.x} $y={g.y} />

          {cur && (
            <DetailInner $v={panelVis}>
              {/* Esquerda: título + descrição */}
              <div>
                <PanelTitle>{cur.title}</PanelTitle>
                <PanelBody>
                  {cur.full.map((p, i) => <p key={i}>{p}</p>)}
                </PanelBody>
                <PanelClose onClick={() => setActive(null)}>
                  <ChevUp />
                  Fechar detalhes
                </PanelClose>
              </div>

              {/* Direita: entregas em coluna única, sem numeração */}
              <div>
                <ExpectLabel>O que esperar do projeto</ExpectLabel>
                <ExpectList>
                  {cur.expect.map(e => (
                    <ExpectItem key={e.title}>
                      <ExpectTitle>{e.title}</ExpectTitle>
                      <ExpectText>{e.body}</ExpectText>
                    </ExpectItem>
                  ))}
                </ExpectList>
              </div>
            </DetailInner>
          )}
        </Detail>
      </DetailWrap>
    </Section>
  );
}