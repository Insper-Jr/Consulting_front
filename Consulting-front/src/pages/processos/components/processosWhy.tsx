import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "../../../hooks/useInView";

/* ─── Tokens ─────────────────────────────────────────── */
const RED        = "#C02121";
const DARK       = "#1a1a18";
const MUTED      = "#7a746e";
const CREAM      = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

/* ─── Animations ─────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const lineGrow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;

/* ─── Data ───────────────────────────────────────────── */
const ITEMS = [
  {
    title: "Membros treinados e supervisionados",
    body:  "Todo projeto é conduzido por alunos do Insper com capacitação específica na metodologia, com acompanhamento de professores e coordenadores experientes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Tecnologia de simulação real",
    body:  "Utilizamos ferramentas profissionais de simulação adotadas por grandes empresas e centros de pesquisa ao redor do mundo. Nada de planilhas e estimativas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8l3 3 2-2 3 3"/>
      </svg>
    ),
  },
  {
    title: "Foco no seu negócio",
    body:  "Nossos projetos são customizados para a realidade de cada cliente. Não trabalhamos com modelos prontos: entendemos a sua operação antes de qualquer recomendação.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <circle cx="12" cy="12" r="8"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    title: "Clareza em cada entrega",
    body:  "Relatórios e apresentações pensados para gestores, não para engenheiros. Você recebe conclusões claras, com linguagem acessível e recomendações prontas para agir.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

/* ─── Layout ─────────────────────────────────────────── */
const Section = styled.section`
  background: ${CREAM};
  padding: 56px 0;
  @media (max-width: 480px) { padding: 44px 0; }
`;

const Inner = styled.div`
  max-width: 1240px; margin: 0 auto; padding: 0 56px;
  display: flex; flex-direction: column; gap: 36px;
  @media (max-width: 768px) { padding: 0 28px; }
  @media (max-width: 480px) { padding: 0 20px; gap: 28px; }
`;

/* ─── Header ─────────────────────────────────────────── */
const Header = styled.div<{ $v: boolean }>`
  display: flex; flex-direction: column; gap: 16px; // ← era 10px
  max-width: 580px; opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.8s ${SPRING} 0.1s forwards;`}
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE}; font-size: 10px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase; color: ${RED};
`;

const H2 = styled.h2`
  font-family: ${FONT_TITLE}; font-size: 28px; font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.15; color: ${DARK}; margin: 0;
  i { font-style: italic; font-weight: 400; }
  @media (max-width: 480px) { font-size: 24px; }
`;

const Divider = styled.div<{ $v: boolean }>`
  width: 48px;  // ← era 32px
  height: 3px;  // ← era 2px
  background: ${RED};
  transform-origin: left;
  transform: ${p => p.$v ? "scaleX(1)" : "scaleX(0)"};
  animation: ${p => p.$v ? lineGrow : "none"} .5s .3s ${SPRING} both;
`;

const Lead = styled.p`
  font-family: ${FONT_BODY}; font-size: 15px; line-height: 1.65;
  color: ${MUTED}; margin: 0; max-width: 540px;
`;

/* ─── Grid ───────────────────────────────────────────── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(26,26,24,0.08);
  border: 1px solid rgba(26,26,24,0.08);

  @media (max-width: 800px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Card = styled.div<{ $v: boolean; $delay: number }>`
  background: #fff;
  padding: 24px 20px;
  display: flex; flex-direction: column; gap: 14px;
  border: 1px solid transparent;
  opacity: 0;
  ${p => p.$v && css`animation: ${fadeUp} 0.7s ${SPRING} ${p.$delay}s forwards;`}
  transition: background 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: rgba(192,33,33,0.04);
    border-color: rgba(192,33,33,0.35);
  }
`;

const CardAccent = styled.div`
  width: 20px; height: 2px; background: ${RED};
  transition: width 0.3s ${SPRING};
  ${Card}:hover & { width: 40px; }
`;

const IconWrap = styled.div`
  width: 36px; height: 36px;
  color: ${MUTED};
  transition: color 0.25s;
  svg { width: 100%; height: 100%; }
  ${Card}:hover & { color: ${RED}; }
`;

const CardBody = styled.div`
  display: flex; flex-direction: column; gap: 6px;
`;

const CardTitle = styled.span`
  font-family: ${FONT_TITLE}; font-size: 13px; font-weight: 700;
  color: ${DARK}; letter-spacing: 0.01em; line-height: 1.3;
`;

const CardText = styled.p`
  font-family: ${FONT_BODY}; font-size: 13px;
  color: ${MUTED}; line-height: 1.55; margin: 0;
`;

/* ─── Component ───────────────────────────────────────── */
export default function ProcessosWhy() {
  const { ref: hRef, visible: hV } = useInView();
  const { ref: gRef, visible: gV } = useInView();

  return (
    <Section>
      <Inner>
        <Header ref={hRef} $v={hV}>
          <Eyebrow>Por que a Insper Jr.</Eyebrow>
          <H2>Rigor técnico com <i>supervisão acadêmica</i></H2>
          <Divider $v={hV} />
          <Lead>
            Contrate uma consultoria com metodologia sólida, tecnologia de ponta e o
            respaldo do Insper. Projetos conduzidos por quem está dentro da instituição
            e do mercado ao mesmo tempo.
          </Lead>
        </Header>

        <Grid ref={gRef}>
          {ITEMS.map((it, i) => (
            <Card key={it.title} $v={gV} $delay={0.1 + i * 0.08}>
              <CardAccent />
              <IconWrap>{it.icon}</IconWrap>
              <CardBody>
                <CardTitle>{it.title}</CardTitle>
                <CardText>{it.body}</CardText>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}