import { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { RED, FONT_TITLE } from "../../../styles/tokens";

const FONT = `'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

const IconProjetos = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="5" y="13" width="30" height="22" rx="3" stroke="currentColor" strokeWidth="1.7"/>
    <path d="M13 13V10C13 8.5 14.3 7 16 7H24C25.7 7 27 8.5 27 10V13"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M5 22Q20 27 35 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="21" x2="20" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconCapacitacao = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <path d="M20 8L36 15L20 22L4 15Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    <path d="M10 18V27C13 31 17 33 20 33C23 33 27 31 30 27V18"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 15V25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    <circle cx="36" cy="27" r="2" fill="currentColor"/>
  </svg>
);

const IconRede = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.7"/>
    <circle cx="7"  cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="33" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="7"  cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="33" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="10"  y1="12" x2="16.5" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="30"  y1="12" x2="23.5" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="10"  y1="28" x2="16.5" y2="23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="30"  y1="28" x2="23.5" y2="23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const TAB_META = [
  { num: "01", Icon: IconProjetos },
  { num: "02", Icon: IconCapacitacao },
  { num: "03", Icon: IconRede },
];

type TabT = { title: string; category: string; description: string; bullets: string[] };

const Benefits = () => {
  const { t } = useTranslation();
  const TABS = (t("join.benefits.tabs", { returnObjects: true }) as TabT[]).map((tab, i) => ({
    ...tab,
    num: TAB_META[i].num,
    Icon: TAB_META[i].Icon,
  }));
  const statsT = t("join.benefits.stats", { returnObjects: true }) as { value: string; label: string }[];

  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
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

  const handleTab = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 200);
  };

  const b = TABS[active];

  return (
    <Section>
      <Inner ref={innerRef} data-visible={String(visible)}>
        <Head>
          <div className="left">
            <span className="eyebrow">{t("join.benefits.eyebrow")}</span>
            <h2>{t("join.benefits.titleLine1")}<br />{t("join.benefits.titleLine2")}</h2>
          </div>
          <p className="lead">
            {t("join.benefits.lead")}
          </p>
        </Head>

        <TabsWrapper>
          <TabBar role="tablist">
            {TABS.map((t, i) => (
              <TabBtn key={i} $active={i === active} role="tab" aria-selected={i === active} onClick={() => handleTab(i)}>
                <TabNum $active={i === active}>{t.num}</TabNum>
                <TabLabel $active={i === active}>{t.title}</TabLabel>
              </TabBtn>
            ))}
          </TabBar>

          <PanelWrap $fading={fading} role="tabpanel">
            <PanelLeft>
              <PanelCategory>{b.category}</PanelCategory>
              <PanelIconBox aria-hidden="true"><b.Icon /></PanelIconBox>
              <PanelTitle>{b.title}</PanelTitle>
              <GhostIcon aria-hidden="true"><b.Icon /></GhostIcon>
            </PanelLeft>

            <PanelRight>
              <PanelDesc>{b.description}</PanelDesc>
              <BulletList>
                {b.bullets.map((bullet, i) => (
                  <BulletItem key={i}><span className="dash" aria-hidden="true">•</span>{bullet}</BulletItem>
                ))}
              </BulletList>
            </PanelRight>
          </PanelWrap>
        </TabsWrapper>

        <StatsRow>
          {statsT.map((s, i) => (
            <Fragment key={s.label}>
              <Stat $idx={i}>
                <span className="val">{s.value}</span>
                <span className="lbl">{s.label}</span>
              </Stat>
              {i < statsT.length - 1 && <StatDivider />}
            </Fragment>
          ))}
        </StatsRow>
      </Inner>
    </Section>
  );
};

export default Benefits;

const Section = styled.section`
  background: #fff;
  padding: 80px 0 60px;
  border-top: 1px solid rgba(8,15,15,0.08);
  font-family: ${FONT};
  color: #080F0F;
  @media (max-width: 980px) { padding: 80px 0; }
  @media (max-width: 640px) { padding: 60px 0; }
`;

const Inner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  &[data-visible="true"] { opacity: 1; transform: none; }
  @media (max-width: 600px) { padding: 0 20px; }
`;


const Head = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: end;
  margin-bottom: 60px;
  padding-top: 8px;

  .left { display: flex; flex-direction: column; gap: 20px; }

  .eyebrow {
    font-family: ${FONT_TITLE};
    font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: ${RED};
  }

  h2 {
    font-family: ${FONT_TITLE};
    margin: 0;
    font-size: clamp(28px, 3.2vw, 40px);
    line-height: 1.1; letter-spacing: -0.02em; font-weight: 800;
  }

  .lead {
    margin: 0;
    position: relative;
    padding-left: 16px;
    border-left: 2px solid ${RED};
    color: rgba(8,15,15,0.62);
    font-size: 15px; line-height: 1.65; max-width: 42ch;
  }

  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 16px; margin-bottom: 40px; }
  @media (max-width: 640px) { gap: 14px; margin-bottom: 28px; }
`;

const TabsWrapper = styled.div`
  border: 1px solid rgba(8,15,15,0.10);
  box-shadow: 0 4px 24px -8px rgba(8,15,15,0.08);
  overflow: hidden;
`;

const TabBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #F6F3F0;
  border-bottom: 1px solid rgba(8,15,15,0.10);
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const TabBtn = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex; flex-direction: column; gap: 6px;
  padding: 22px 28px 18px;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  border: none;
  border-right: 1px solid rgba(8,15,15,0.08);
  cursor: pointer; text-align: left;
  transition: background 0.2s;
  outline: none;

  &::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px;
    background: ${RED};
    transform: scaleY(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.25s ease;
  }

  &:last-child { border-right: none; }
  &:hover { background: ${({ $active }) => ($active ? "#fff" : "rgba(8,15,15,0.025)")}; }
  &:focus-visible { outline: 2px solid ${RED}; outline-offset: -2px; }

  @media (max-width: 640px) {
    border-right: none;
    border-bottom: 1px solid rgba(8,15,15,0.08);
    flex-direction: row; align-items: center; gap: 14px; padding: 16px 22px;
    &:last-child { border-bottom: none; }
  }
`;

const TabNum = styled.span<{ $active: boolean }>`
  font-size: 10px; font-weight: 700; letter-spacing: 0.16em; line-height: 1;
  color: ${({ $active }) => ($active ? "${RED}" : "rgba(8,15,15,0.28)")};
  transition: color 0.2s;
`;

const TabLabel = styled.span<{ $active: boolean }>`
  font-size: 14px; line-height: 1.35;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#080F0F" : "rgba(8,15,15,0.42)")};
  transition: color 0.2s;
`;

const PanelWrap = styled.div<{ $fading: boolean }>`
  display: grid;
  grid-template-columns: 5fr 7fr;
  min-height: 300px;
  opacity: ${({ $fading }) => ($fading ? 0 : 1)};
  transform: translateY(${({ $fading }) => ($fading ? "10px" : "0")});
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const PanelLeft = styled.div`
  position: relative; overflow: hidden;
  background: linear-gradient(145deg, #C82222 0%, #9E1919 100%);
  padding: 48px 40px;
  display: flex; flex-direction: column; justify-content: flex-end;

  &::after {
    content: "";
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg, transparent, transparent 24px,
      rgba(255,255,255,0.025) 24px, rgba(255,255,255,0.025) 25px
    );
    pointer-events: none;
  }
  @media (max-width: 720px) { padding: 36px 28px; }
  @media (max-width: 600px) { padding: 28px 20px; }
`;

const PanelCategory = styled.span`
  display: block; margin-bottom: 24px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(255,255,255,0.52);
`;

const PanelIconBox = styled.div`
  position: relative; z-index: 1;
  color: rgba(255,255,255,0.75); margin-bottom: 20px;
`;

const PanelTitle = styled.h4`
  font-family: ${FONT_TITLE};
  position: relative; z-index: 1; margin: 0;
  font-size: clamp(20px, 2.2vw, 28px); font-weight: 800;
  color: #fff; line-height: 1.18; letter-spacing: -0.02em;
`;

const GhostIcon = styled.div`
  position: absolute; bottom: 18px; right: 18px;
  color: rgba(255,255,255,0.06);
  transform: scale(3.5); transform-origin: bottom right; pointer-events: none;
  @media (max-width: 600px) { transform: scale(2.4); }
`;

const PanelRight = styled.div`
  background: #fff;
  padding: 48px 52px;
  display: flex; flex-direction: column; justify-content: center; gap: 32px;
  border-left: 1px solid rgba(8,15,15,0.07);
  @media (max-width: 720px) { border-left: none; border-top: 1px solid rgba(8,15,15,0.07); padding: 36px 32px; }
  @media (max-width: 600px) { padding: 32px 24px; }
`;

const PanelDesc = styled.p`
  margin: 0;
  font-size: 16px; line-height: 1.72; color: rgba(8,15,15,0.62); max-width: 46ch;
`;

const BulletList = styled.ul`
  margin: 0; padding: 0; list-style: none;
  display: flex; flex-direction: column; gap: 12px;
`;

const BulletItem = styled.li`
  display: flex; align-items: baseline; gap: 12px;
  font-size: 14px; font-weight: 500; color: rgba(8,15,15,0.68); line-height: 1.4;
  .dash { color: ${RED}; font-weight: 700; flex-shrink: 0; }
`;

const StatsRow = styled.div`
  display: flex; align-items: center;
  margin-top: 48px; padding-top: 40px;
  @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: 28px; margin-top: 32px; padding-top: 28px; }
`;

const Stat = styled.div<{ $idx: number }>`
  flex: 1; display: flex; flex-direction: column; gap: 4px;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.4s ease-out ${({ $idx }) => $idx * 120}ms,
              transform 0.4s ease-out ${({ $idx }) => $idx * 120}ms;
  [data-visible="true"] & { opacity: 1; transform: none; }

  .val {
    font-family: ${MONO};
    font-size: clamp(22px, 2.4vw, 30px); font-weight: 700;
    color: ${RED}; letter-spacing: -0.02em; line-height: 1;
  }
  .lbl { font-size: 13px; color: rgba(8,15,15,0.52); letter-spacing: 0.01em; }
`;

const StatDivider = styled.div`
  width: 1px; height: 40px;
  background: rgba(8,15,15,0.10); margin: 0 40px; flex-shrink: 0;
  @media (max-width: 600px) { display: none; }
`;
