import { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";
import { RED, FONT_TITLE, TYPE, SPACING } from "../../../styles/tokens";

type FrenteId = "business" | "tech" | "direito" | "processos";
type Step = { num: string; label: string; desc: string };
type StepT = { label: string; desc: string };
type FrenteT = { id: FrenteId; label: string; steps: StepT[] };

const FONT = `'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

const PS_ABERTO: Record<FrenteId, boolean> = {
  business: true,
  tech: true,
  direito: true,
  processos: false,
};

const STEP_NUMS = ["01", "02", "03", "04"];

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
  const { t } = useTranslation();
  const FRENTES: { id: FrenteId; label: string; steps: Step[] }[] = (
    t("join.timeline.frentes", { returnObjects: true }) as FrenteT[]
  ).map(f => ({
    id: f.id,
    label: f.label,
    steps: f.steps.map((s, i) => ({ num: STEP_NUMS[i], label: s.label, desc: s.desc })),
  }));

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
            <span className="eyebrow">{t("join.timeline.eyebrow")}</span>
            <h2>{t("join.timeline.title")}</h2>
          </div>
          <StatusBlock>
            <StatusMeta $open={PS_ABERTO[current.id]}>
              <span className="dot" />
              <span>{t(PS_ABERTO[current.id] ? "join.timeline.statusOpen" : "join.timeline.statusClosed")}</span>
            </StatusMeta>
            <StatusFrente key={current.id}>{t("join.timeline.frentePre")}<strong>{current.label}</strong>{t("join.timeline.frenteSuffix")}</StatusFrente>
          </StatusBlock>
        </Head>

        <Pills role="tablist" aria-label={t("join.timeline.pillsAriaLabel")}>
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
  @media (max-width: 640px) { padding: 60px 0; }
`;

const Inner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${SPACING.innerPaddingX};
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  &[data-visible="true"] { opacity: 1; transform: none; }
  @media (max-width: 600px) { padding: 0 20px; }
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: end; margin-bottom: 48px;

  .left { display: flex; flex-direction: column; gap: 18px; }
  .eyebrow { font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${RED}; }
  h2 { font-family: ${FONT_TITLE}; margin: 0; font-size: ${TYPE.sectionH2.size}; line-height: 1.1; letter-spacing: -0.02em; font-weight: ${TYPE.sectionH2.weight}; }

  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 24px; margin-bottom: 32px; }
`;

const StatusBlock = styled.div`
  display: flex; flex-direction: column; gap: 10px;
  padding-left: 16px; border-left: 2px solid ${RED};
`;

const StatusMeta = styled.div<{ $open: boolean }>`
  display: flex; align-items: center; gap: 8px;
  font-family: ${MONO}; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(8,15,15,0.45);
  .dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    background: ${({ $open }) => $open ? "#22c55e" : "rgba(8,15,15,0.28)"};
  }
`;

const StatusFrente = styled.p`
  margin: 0; font-size: 15px; color: rgba(8,15,15,0.65); line-height: 1.4;
  strong { color: #080F0F; font-weight: 700; }
`;

const Pills = styled.div`
  display: inline-flex; gap: 10px; flex-wrap: wrap; margin-bottom: 64px;
  @media (max-width: 640px) { margin-bottom: 40px; gap: 8px; }
`;

const Pill = styled.button<{ $active: boolean }>`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 999px;
  font-family: inherit; font-size: 14px; font-weight: 500; white-space: nowrap; cursor: pointer;
  background: ${({ $active }) => $active ? "#080F0F" : "transparent"};
  color:      ${({ $active }) => $active ? "#fff"    : "#080F0F"};
  border: 1px solid ${({ $active }) => $active ? "#080F0F" : "rgba(8,15,15,0.18)"};
  transition: all 0.25s;
  &:hover { border-color: #080F0F; }
  @media (max-width: 640px) { padding: 11px 16px; }
  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${({ $active }) => $active ? "${RED}" : "rgba(8,15,15,0.2)"};
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
  @media (max-width: 640px) { gap: 28px; }
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
  h4 { font-family: ${FONT_TITLE}; margin: 0 0 8px; font-size: ${TYPE.subTitle.size}; font-weight: 700; letter-spacing: -0.01em; }
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
  background: #fff; border: 2px solid ${RED}; color: ${RED};
  box-shadow: 0 4px 16px -6px rgba(192,33,33,0.35);
  @media (max-width: 980px) { margin-bottom: 0; grid-row: 1 / 3; align-self: start; }
`;