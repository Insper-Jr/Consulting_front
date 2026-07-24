import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

const FONT = `'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;

const IconExcelencia = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="16" r="12" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M20 10 L21.8 15.5 H27.5 L23 18.8 L24.8 24.3 L20 21 L15.2 24.3 L17 18.8 L12.5 15.5 H18.2 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M14 27 L11 37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M26 27 L29 37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M11 37 L29 37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M14.5 31.5 L25.5 31.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconComprometimento = () => (
  <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
    <path d="M2 20 C2 20 6 14 10 15 L16 17 C16 17 18 12 22 12 C24 12 25 13 25 13 L30 10 C32 9 34 10 34 12 C36 10 38 11 38 13 C40 11 42 13 41 15 L35 22 C33 24 30 25 27 25 L18 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 20 L2 30 C2 31 3 32 4 32 L10 32 C11 32 12 31 12 30 L12 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconColaboracao = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="10" r="5" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="8"  cy="28" r="5" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="32" cy="28" r="5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M15 13 C12 16 10 20 11 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M25 13 C28 16 30 20 29 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 31 C16 34 24 34 27 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconInconformismo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M6 6 L30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 6 L6 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const VALOR_ICONS = [IconInconformismo, IconExcelencia, IconColaboracao, IconComprometimento];

type ValorItemT = { title: string; desc: string };

const drawIn = keyframes`to { stroke-dashoffset: 0; }`;

const Valores = () => {
  const { t } = useTranslation();
  const VALORES = (t("join.valores.items", { returnObjects: true }) as ValorItemT[]).map(
    (v, i) => ({ ...v, Icon: VALOR_ICONS[i] })
  );

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

  return (
    <Section>
      <Inner ref={innerRef} data-visible={String(visible)}>
        <Head>
          <div className="left">
            <span className="eyebrow">{t("join.valores.eyebrow")}</span>
            <h2>{t("join.valores.titleLine1")}<br />{t("join.valores.titleLine2")}</h2>
          </div>
          <div className="lead-block">
            <p className="lead-sub">
              {t("join.valores.leadSub")}
            </p>
          </div>
        </Head>

        <Grid>
          {VALORES.map((v, i) => (
            <Card key={v.title} $idx={i}>
              <IconWrap $idx={i}>
                <v.Icon />
              </IconWrap>
              <TitleWrap>
                <h4>{v.title}</h4>
              </TitleWrap>
              <p>{v.desc}</p>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};

export default Valores;

const Section = styled.section`
  background: #FAF2EA;
  padding: 120px 0;
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
  gap: 60px; align-items: end; margin-bottom: 64px;

  .left { display: flex; flex-direction: column; gap: 18px; }
  .eyebrow { font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #C02121; }
  h2 { font-family: ${FONT_TITLE}; margin: 0; font-size: clamp(28px, 3.2vw, 40px); line-height: 1.1; letter-spacing: -0.02em; font-weight: 800; }
  .lead-block { position: relative; padding-left: 16px; border-left: 2px solid #C02121; }
  .lead-sub { margin: 0; color: rgba(8,15,15,0.52); font-size: 15px; line-height: 1.65; max-width: 38ch; }

  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 16px; margin-bottom: 40px; }
  @media (max-width: 640px) { margin-bottom: 28px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(8,15,15,0.10);
  @media (max-width: 980px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

const IconWrap = styled.div<{ $idx: number }>`
  margin-bottom: 28px; color: #C02121;
  svg { display: block; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
  svg path, svg circle { stroke-dasharray: 300; stroke-dashoffset: 300; }
  [data-visible="true"] & svg path,
  [data-visible="true"] & svg circle {
    animation: ${drawIn} 0.65s ease forwards;
    animation-delay: ${({ $idx }) => $idx * 150 + 100}ms;
  }
`;

const TitleWrap = styled.div`
  margin-bottom: 10px;
  h4 {
    font-family: ${FONT_TITLE};
    margin: 0; display: inline-block; position: relative;
    font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #080F0F;
    transition: color 0.2s ease;
    &::after {
      content: ''; position: absolute; left: 0; bottom: -3px;
      height: 1.5px; width: 0; background: #C02121;
      transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }
  @media (max-width: 640px) { h4 { font-size: 19px; } }
`;

const Card = styled.div<{ $idx: number }>`
  padding: 32px 24px 32px 0;
  border-right: 1px solid rgba(8,15,15,0.10);
  cursor: default;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.4s ease-out ${({ $idx }) => $idx * 80}ms,
              transform 0.4s ease-out ${({ $idx }) => $idx * 80}ms;

  &:last-child { border-right: 0; }
  &:not(:first-child) { padding-left: 24px; }
  [data-visible="true"] & { opacity: 1; transform: none; }

  &:hover ${IconWrap} svg { transform: translateY(-5px); }
  &:hover ${TitleWrap} h4 { color: #C02121; }
  &:hover ${TitleWrap} h4::after { width: 100%; }

  p { margin: 0; color: rgba(8,15,15,0.62); font-size: 13px; line-height: 1.6; }

  @media (max-width: 980px) {
    padding: 24px 0 !important; border-right: 0;
    border-bottom: 1px solid rgba(8,15,15,0.10);
    &:last-child { border-bottom: 0; }
  }
`;
