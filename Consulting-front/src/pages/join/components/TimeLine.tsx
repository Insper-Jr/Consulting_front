import { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";

type FrenteId = "business" | "tech" | "direito" | "processos";
type Step = { num: string; label: string; desc: string };

const FONT = `'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

const FRENTES: { id: FrenteId; label: string; editalUrl: string; steps: Step[] }[] = [
  {
    id: "business", label: "Business", editalUrl: "#edital-business",
    steps: [
      { num: "01", label: "Prova GMAT",           desc: "Prova de lógica, raciocínio técnico e questões de atualidades." },
      { num: "02", label: "Dinâmica em grupo",     desc: "Simulação de case de consultoria nas áreas financeira e de marketing mercadológico." },
      { num: "03", label: "Entrevista individual", desc: "Avaliação de raciocínio analítico e postura profissional em formato de case individual." },
      { num: "04", label: "Trainee",               desc: "Business plan completo: análise mercadológica, plano operacional, escopo financeiro e estratégia de marketing (~3 meses)." },
    ],
  },
  {
    id: "tech", label: "Tech", editalUrl: "#edital-tech",
    steps: [
      { num: "01", label: "Dinâmica em grupo", desc: "Desafio colaborativo avaliando lógica, comunicação e resolução de problemas técnicos." },
      { num: "02", label: "Case e entrevista", desc: "Desenvolvimento de case em Dev Web ou Análise de Dados, seguido de entrevista técnica." },
      { num: "03", label: "Trainee",           desc: "Projeto real em Dev Web ou Análise de Dados com entregas incrementais ao longo do semestre." },
    ],
  },
  {
    id: "direito", label: "Direito", editalUrl: "#edital-direito",
    steps: [
      { num: "01", label: "Dinâmica em grupo", desc: "Exercício de argumentação jurídica e avaliação de conhecimento do ordenamento." },
      { num: "02", label: "Case individual",   desc: "Resolução de case nas áreas de contratos, direito tributário ou societário." },
      { num: "03", label: "Trainee",           desc: "Escopo de trabalho em contrato, societário, tributário e propriedade intelectual." },
    ],
  },
  {
    id: "processos", label: "Processos", editalUrl: "#edital-processos",
    steps: [
      { num: "01", label: "Dinâmica em grupo", desc: "Exercício colaborativo de mapeamento e análise crítica de processos." },
      { num: "02", label: "Case individual",   desc: "Diagnóstico de processo e proposta de melhoria com indicadores de desempenho." },
      { num: "03", label: "Entrevista",        desc: "Discussão sobre metodologias de melhoria contínua e experiências anteriores." },
      { num: "04", label: "Trainee",           desc: "Redesenho de processo real de um cliente, com acompanhamento da implementação." },
    ],
  },
];

const GlobalAnim = createGlobalStyle`
  @keyframes trackLeave {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(110%); }
  }
  @keyframes trackEnter {
    from { opacity: 0; transform: translateX(-110%); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;

const TimeLine = () => {
  const [selected, setSelected]               = useState<FrenteId>("business");
  const [displayedFrente, setDisplayedFrente] = useState<FrenteId>("business");
  const busyRef  = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = FRENTES.find((f) => f.id === displayedFrente) ?? FRENTES[0];

  const handleSelect = (id: FrenteId) => {
    if (id === selected || busyRef.current) return;
    busyRef.current = true;
    setSelected(id);

    const el = trackRef.current;
    if (!el) return;

    // Dispara animação de saída pela direita
    el.style.animation = "trackLeave 0.6s cubic-bezier(0.4,0,1,1) forwards";

    setTimeout(() => {
      // Troca o conteúdo enquanto o elemento está fora da tela (translateX 110%)
      setDisplayedFrente(id);

      // Reseta a animação e força reflow para o browser registrar a mudança
      el.style.animation = "none";
      void el.offsetWidth;

      // Dispara animação de entrada pela esquerda
      el.style.animation = "trackEnter 1.05s cubic-bezier(0.25,0,0.1,1) forwards";

      setTimeout(() => { busyRef.current = false; }, 850);
    }, 560);
  };

  return (
    <Section>
      <GlobalAnim />
      <Inner ref={innerRef} data-visible={String(visible)}>
        <Head>
          <div className="left">
            <span className="eye
            brow">03 · Etapas do Processo Seletivo</span>
            <h2>O processo de cada frente.</h2>
          </div>
          <EditalBlock>
            <EditalMeta><span className="dot" /><span>Processo seletivo aberto</span></EditalMeta>
            <EditalFrente key={current.id}>Frente <strong>{current.label}</strong></EditalFrente>
            <EditalCta href={current.editalUrl} target="_blank" rel="noopener noreferrer">
              Acessar edital
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <path d="M2 11 L11 2M11 2 H5M11 2 V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </EditalCta>
          </EditalBlock>
        </Head>

        <Pills role="tablist" aria-label="Selecione uma frente">
          {FRENTES.map((f) => (
            <Pill key={f.id} role="tab" type="button" aria-selected={selected === f.id} $active={selected === f.id} onClick={() => handleSelect(f.id)}>
              <span className="dot" />{f.label}
            </Pill>
          ))}
        </Pills>

        <TrackWrap>
          <Track ref={trackRef} $cols={current.steps.length}>
            <Rail />
            {current.steps.map((s) => (
              <StepItem key={s.num}>
                <Node>{s.num}</Node>
                <h4>{s.label}</h4>
                <p>{s.desc}</p>
              </StepItem>
            ))}
          </Track>
        </TrackWrap>
      </Inner>
    </Section>
  );
};

export default TimeLine;

const Section = styled.section`
  background: #fff;
  padding: 120px 0;
  border-top: 1px solid rgba(8,15,15,0.10);
  font-family: ${FONT};
  color: #080F0F;
  @media (max-width: 980px) { padding: 80px 0; }
`;

const Inner = styled.div`
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  &[data-visible="true"] { opacity: 1; transform: none; }
  @media (max-width: 600px) { padding: 0 24px; }
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: end; margin-bottom: 48px;

  .left { display: flex; flex-direction: column; gap: 18px; }
  .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #691212; }
  h2 { margin: 0; font-size: clamp(28px, 3.2vw, 40px); line-height: 1.1; letter-spacing: -0.02em; font-weight: 800; }

  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 24px; margin-bottom: 32px; }
`;

const EditalBlock = styled.div`
  display: flex; flex-direction: column; gap: 10px;
  padding-left: 16px; border-left: 2px solid #C02121;
`;

const EditalMeta = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-family: ${MONO}; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(8,15,15,0.45);
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
`;

const EditalFrente = styled.p`
  margin: 0; font-size: 15px; color: rgba(8,15,15,0.65); line-height: 1.4;
  strong { color: #080F0F; font-weight: 700; }
`;

const EditalCta = styled.a`
  display: inline-flex; align-items: center; gap: 7px; align-self: flex-start;
  padding: 9px 16px; background: #C02121; color: #fff;
  font-size: 13px; font-weight: 700; letter-spacing: 0.02em; text-decoration: none;
  transition: background 0.2s, gap 0.2s;
  &:hover { background: #a01a1a; gap: 10px; }
`;

const Pills = styled.div`display: inline-flex; gap: 10px; flex-wrap: wrap; margin-bottom: 64px;`;

const Pill = styled.button<{ $active: boolean }>`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 999px;
  font-family: inherit; font-size: 14px; font-weight: 500; white-space: nowrap; cursor: pointer;
  background: ${({ $active }) => $active ? "#080F0F" : "transparent"};
  color:      ${({ $active }) => $active ? "#fff"    : "#080F0F"};
  border: 1px solid ${({ $active }) => $active ? "#080F0F" : "rgba(8,15,15,0.18)"};
  transition: all 0.25s;
  &:hover { border-color: #080F0F; }
  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${({ $active }) => $active ? "#C02121" : "rgba(8,15,15,0.2)"};
    transform:  ${({ $active }) => $active ? "scale(1.4)" : "scale(1)"};
    transition: all 0.25s; flex-shrink: 0;
  }
`;

const TrackWrap = styled.div`
  overflow: hidden;
  margin: 0 -9999px;
  padding: 0 9999px;
`;

const Track = styled.div<{ $cols: number }>`
  position: relative; display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  padding-top: 8px;
  animation: trackEnter 0.65s cubic-bezier(0.25,0,0.1,1) forwards;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 36px; }
`;

const Rail = styled.div`
  position: absolute; left: 28px; right: 28px; top: 36px;
  height: 1px; background: rgba(8,15,15,0.12); z-index: 0;
  @media (max-width: 980px) { display: none; }
`;

const StepItem = styled.div`
  position: relative; z-index: 1; padding: 0 14px;
  &:first-child { padding-left: 0; }
  &:last-child  { padding-right: 0; }
  h4 { margin: 0 0 8px; font-size: 16px; font-weight: 700; letter-spacing: -0.01em; }
  p  { margin: 0; color: rgba(8,15,15,0.62); font-size: 13px; line-height: 1.55; }
  @media (max-width: 980px) {
    display: grid; grid-template-columns: 56px 1fr;
    grid-template-rows: auto auto; column-gap: 16px; padding: 0;
    h4 { grid-column: 2; align-self: center; margin: 0 0 4px; }
    p  { grid-column: 2; }
  }
`;

const Node = styled.div`
  width: 56px; height: 56px; border-radius: 50%;
  display: grid; place-items: center; margin-bottom: 24px;
  font-family: ${MONO}; font-size: 13px; font-weight: 700;
  background: #fff; border: 2px solid #C02121; color: #C02121;
  box-shadow: 0 4px 16px -6px rgba(192,33,33,0.35);
  @media (max-width: 980px) { margin-bottom: 0; grid-row: 1 / 3; align-self: start; }
`;