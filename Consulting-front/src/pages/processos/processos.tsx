import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { useTranslation, Trans } from "react-i18next";
import type { TFunction } from "i18next";
import Header from "../../components/header";
import Footer from "../../components/footerNovo";
import WppButton from "../../components/wppButton";
import ContactSection from "../../components/sectionContact";
import ProcessosCase from "./components/processosCase";
import ProcessosCTA from "./components/processosCTA";
import ProcessImg from "../../assets/hero/process6.webp";
import { useParticles } from "../../hooks/useParticleBackground";
import { useParticleNetwork } from "../../hooks/useParticleNetwork";

// ── Color tokens ────────────────────────────────────────────────────────────
import { RED_TITLE, RED, RED_DARK, RED_DIM, BG_DARK, DARK, BG_CREAM, CREAM, FONT_TITLE, FONT_BODY, TYPE } from "../../styles/tokens";

const COLORS = {
  redTitle: RED_TITLE,
  redCTA:   RED,
  redDark:  RED_DARK,
  black:    BG_DARK,
  ink:      DARK,
  bg:       "#ffffff",
  cream:    BG_CREAM,
  lightCream: BG_CREAM,
};

const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

const ProcessosGlobal = createGlobalStyle`
  html { scroll-behavior: smooth; }
`;

// ── Scopes data ────────────────────────────────────────────────────────────
type Scope = {
  num: string;
  tab: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  side: { eyebrow: string; rows: { key: string; val: React.ReactNode }[]; quote: string };
  detail: React.ReactNode;
  bullets: string[];
  tags: string[];
};

const SCOPE_KEYS = ["otimizacao", "estoque"] as const;
const ROW_KEYS = ["entregaveis", "aplicacoes", "abordagem", "pontoDePartida", "sinergia"] as const;

function buildScopes(t: TFunction): Scope[] {
  const richStrong = { strong: <strong /> };

  return SCOPE_KEYS.map((key, i) => {
    const base = `processos.scopes.${key}`;
    return {
      num: String(i + 1).padStart(2, "0"),
      tab: t(`${base}.tab`),
      title: <Trans i18nKey={`${base}.title`} components={{ i: <i /> }} />,
      lede: <Trans i18nKey={`${base}.lede`} components={richStrong} />,
      side: {
        eyebrow: t(`${base}.sideEyebrow`),
        rows: ROW_KEYS.map((row) => ({
          key: t(`${base}.rows.${row}.label`),
          val: <Trans i18nKey={`${base}.rows.${row}.value`} components={richStrong} />,
        })),
        quote: t(`${base}.quote`),
      },
      detail: <Trans i18nKey={`${base}.detail`} components={richStrong} />,
      bullets: t(`${base}.bullets`, { returnObjects: true }) as string[],
      tags: t(`${base}.tags`, { returnObjects: true }) as string[],
    };
  });
}

// ── Page ────────────────────────────────────────────────────────────────────
function Processos() {
  const { t } = useTranslation();
  const SCOPES = buildScopes(t);

  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(heroWrapperRef, heroCanvasRef);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const integrationRef = useRef<HTMLElement>(null);
  const synergyCanvasRef = useRef<HTMLCanvasElement>(null);
  const integrationGlowRef = useRef<HTMLDivElement>(null);

  // Wire up synergy canvas (integration band)
  useParticleNetwork(synergyCanvasRef, integrationRef, {
    count: 60,
    dotColor: "rgba(230,90,90,0.38)",
    lineColor: (c: number) => `rgba(230,90,90,${0.15 * c})`,
    maxDist: 110,
    repel: 90,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

  // Integration glow follows cursor
  useEffect(() => {
    const sec = integrationRef.current;
    const glow = integrationGlowRef.current;
    if (!sec || !glow) return;
    let raf = 0;
    const onEnter = () => { glow.style.opacity = "1"; };
    const onLeave = () => { glow.style.opacity = "0"; };
    const onMove = (e: MouseEvent) => {
      const rect = sec.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      });
    };
    sec.addEventListener("mouseenter", onEnter);
    sec.addEventListener("mouseleave", onLeave);
    sec.addEventListener("mousemove", onMove);
    return () => {
      sec.removeEventListener("mouseenter", onEnter);
      sec.removeEventListener("mouseleave", onLeave);
      sec.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Diferenciais cards: fade in on scroll
  const difCardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = difCardsRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll("[data-dif-card]"));
    if (!("IntersectionObserver" in window)) {
      cards.forEach(c => c.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);

  const heroWords = (
    t("processos.hero.words", { returnObjects: true }) as { text: string; accent?: boolean }[]
  ).map((w, i) => ({ ...w, delay: 0.55 + i * 0.15 }));

  const PILLARS = ["dados", "integrada", "evolucao"] as const;
  const STATS = ["escopos", "cursos", "gestao", "anosInsper"] as const;
  const DIFS = ["rigor", "operacao", "porte"] as const;

  return (
    <PageWrap>
      <ProcessosGlobal />
      <WppButton />
      <Header />

      {/* Hero */}
      <HeroOuter ref={heroWrapperRef}>
        <PhotoBg />
        <GradientOverlay />
        <HeroVignette />
        <Blueprint />

        <canvas ref={heroCanvasRef} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 3,
        }} />

        <HeroGrid>
          <HeroInner>
            <HeroLeft>
              <HeroEyebrow $v={heroVisible}>{t("processos.hero.eyebrow")}</HeroEyebrow>

              <HeroTitle>
                {heroWords.map((w, i) => (
                  <Word key={i} $d={w.delay} $v={heroVisible} $accent={!!w.accent}>
                    {w.text}
                  </Word>
                ))}
              </HeroTitle>

              <HeroLine $v={heroVisible} />

              <HeroSub $v={heroVisible}>
                {t("processos.hero.subtitle")}
              </HeroSub>
            </HeroLeft>
          </HeroInner>
        </HeroGrid>

        <HeroScroll>
          <HeroScrollDot />
          <HeroScrollLine />
        </HeroScroll>

        {/* Wave para a seção seguinte */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, lineHeight: 0, zIndex: 5 }}>
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
            <path d="M0,72 L0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 Z"
              fill="#fff" />
          </svg>
        </div>
      </HeroOuter>

      {/* Red animated bar above Nossos Escopos */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Section opening: Nossos Escopos */}
      <ScopesOpening>
        <OpeningEyebrow>{t("processos.scopesOpening.eyebrow")}</OpeningEyebrow>
        <OpeningTitle>{t("processos.scopesOpening.title")}</OpeningTitle>
        <OpeningDivider />
        <OpeningSubtitle>
          {t("processos.scopesOpening.subtitle")}
        </OpeningSubtitle>

        <OpeningIndex>
          {SCOPES.map((s) => (
            <IndexCard
              key={s.num}
              href={`#escopo-${s.num}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(`escopo-${s.num}`);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  history.replaceState(null, '', `#escopo-${s.num}`);
                }
              }}
            >
              <IndexBadge>{t("processos.scopesOpening.badge", { num: s.num })}</IndexBadge>
              <IndexTitle>{s.tab}</IndexTitle>
              <IndexCTA>
                <span>{t("processos.scopesOpening.explore")}</span>
                <IndexArrow aria-hidden="true">→</IndexArrow>
              </IndexCTA>
            </IndexCard>
          ))}
        </OpeningIndex>
      </ScopesOpening>

      {SCOPES.map((s) => (
        <ScopeSection key={s.num} id={`escopo-${s.num}`}>
          <ScopesWrap>
            <ScopePanel role="tabpanel">
              <ScopeHeader>
                <ScopeCounter>
                  <CounterNum>{t("processos.scopesOpening.badge", { num: s.num })}</CounterNum>
                  <ScopeName>{s.tab}</ScopeName>
                </ScopeCounter>
                <PanelTags>
                  {s.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </PanelTags>
              </ScopeHeader>

              <ScopeGrid>
                <ScopeMain>
                  <ScopeIntro>
                    <ScopeTitleH3>{s.title}</ScopeTitleH3>
                    <Accent />
                    <ScopeLede>{s.lede}</ScopeLede>
                  </ScopeIntro>

                  <PanelBody>
                    <PanelCol>
                      <ColLabel>{t("processos.scopesOpening.howWeWorkLabel")}</ColLabel>
                      <ScopeDetail>{s.detail}</ScopeDetail>
                    </PanelCol>
                    <PanelCol>
                      <ColLabel>{t("processos.scopesOpening.mainApplicationsLabel")}</ColLabel>
                      <Bullets>
                        {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </Bullets>
                    </PanelCol>
                  </PanelBody>
                </ScopeMain>

                <PanelSide>
                  <SideCorner />
                  <SideEyebrow>{s.side.eyebrow}</SideEyebrow>
                  <SideRows>
                    {s.side.rows.map((r, j) => (
                      <SideRow key={j}>
                        <SideKey>{r.key}</SideKey>
                        <SideVal>{r.val}</SideVal>
                      </SideRow>
                    ))}
                  </SideRows>
                  <SideQuote>{s.side.quote}</SideQuote>
                </PanelSide>
              </ScopeGrid>
            </ScopePanel>
          </ScopesWrap>
        </ScopeSection>
      ))}

      {/* Red animated bar above Cases */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Cases de sucesso (Shipping I) */}
      <ProcessosCase />

      {/* Integration band — Sinergia entre Frentes */}
      <Integration ref={integrationRef}>
        <SynergyCanvas ref={synergyCanvasRef} />
        <CursorGlow ref={integrationGlowRef} />
        <IntegrationInner>
          <Kicker>{t("processos.integration.kicker")}</Kicker>
          <IntegrationTitle>
            <Trans i18nKey="processos.integration.title" components={{ span: <span /> }} />
          </IntegrationTitle>
          <IntegrationLede>
            {t("processos.integration.lede")}
          </IntegrationLede>
        </IntegrationInner>
      </Integration>

      {/* Red animated bar above Sobre a frente */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Sobre a frente */}
      <Intro id="sobre-frente">
        <SectionHeader>
          <OpeningEyebrow>{t("processos.about.eyebrow")}</OpeningEyebrow>
          <SectionTitle>{t("processos.about.title")}</SectionTitle>
          <OpeningDivider />
        </SectionHeader>

        <FrenteLede>
          {t("processos.about.lede")}
        </FrenteLede>

        <PillarsGrid>
          {PILLARS.map((p) => (
            <Pillar key={p}>
              <PillarNum>{t(`processos.about.pillars.${p}.num`)}</PillarNum>
              <PillarTitle>{t(`processos.about.pillars.${p}.title`)}</PillarTitle>
              <PillarText>
                <Trans i18nKey={`processos.about.pillars.${p}.text`} components={{ strong: <strong /> }} />
              </PillarText>
            </Pillar>
          ))}
        </PillarsGrid>

        <StatsBar>
          {STATS.map((s) => (
            <Stat key={s}>
              <StatValue>{t(`processos.about.stats.${s}.value`)}</StatValue>
              <StatLabel>{t(`processos.about.stats.${s}.label`)}</StatLabel>
            </Stat>
          ))}
        </StatsBar>
      </Intro>

      {/* Red animated bar above Diferenciais */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Diferenciais */}
      <Diferenciais>
        <SectionHeader>
          <OpeningEyebrow>{t("processos.diferenciais.eyebrow")}</OpeningEyebrow>
          <SectionTitle>{t("processos.diferenciais.title")}</SectionTitle>
          <OpeningDivider />
        </SectionHeader>
        <SectionSubtitle>
          {t("processos.diferenciais.subtitle")}
        </SectionSubtitle>
        <DifGrid ref={difCardsRef}>
          {DIFS.map((d) => (
            <DifCard key={d} data-dif-card>
              <DifAccent />
              <DifNum>{t(`processos.diferenciais.cards.${d}.num`)}</DifNum>
              <DifTitle>{t(`processos.diferenciais.cards.${d}.title`)}</DifTitle>
              <DifText>{t(`processos.diferenciais.cards.${d}.text`)}</DifText>
            </DifCard>
          ))}
        </DifGrid>
      </Diferenciais>

      {/* Closing CTA + Contact */}
      <ProcessosCTA />
      <ContactSection />

      <Footer />
    </PageWrap>
  );
}

export default Processos;

// ── Styled Components ──────────────────────────────────────────────────────

const heroFadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const heroWordIn = keyframes`
  from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
`;
const heroLineGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;
const heroScrollBounce = keyframes`
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(6px); }
`;
const accentGrow = keyframes`
  to { transform: scaleX(1); }
`;
const redbarGrow = keyframes`
  to { transform: scaleX(1); }
`;
const PageWrap = styled.div`
  font-family: ${FONT_BODY};
  color: ${COLORS.ink};
  background: ${COLORS.bg};
  -webkit-font-smoothing: antialiased;
  width: 100%;
  overflow-x: hidden;
`;

// ── Hero + Intro shared canvas wrapper ──
const HeroOuter = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  isolation: isolate;
`;

/* Foto de fundo */
const PhotoBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url(${ProcessImg}) center center / cover no-repeat;
`;

/* Gradiente esquerda → direita para legibilidade do texto */
const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(14, 4, 4, 0.97) 0%,
    rgba(14, 4, 4, 0.85) 35%,
    rgba(14, 4, 4, 0.45) 65%,
    rgba(14, 4, 4, 0.15) 100%
  );
`;

const HeroVignette = styled.div`
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(14,4,4,0.35) 0%,
    transparent 20%,
    transparent 75%,
    rgba(14,4,4,0.75) 100%
  );
`;

const Blueprint = styled.div`
  position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: .25;
  background-image:
    linear-gradient(rgba(192,33,33,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,33,33,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
`;

const HeroGrid = styled.div`
  position: relative; z-index: 4; width: 100%;
  display: flex; align-items: center;
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 56px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 960px) { grid-template-columns: 1fr; padding: 0 28px; gap: 0; }
  @media (max-width: 480px) { padding: 0 20px; }
`;

const HeroLeft = styled.div`
  padding: 88px 0 48px 0;
  max-width: 620px;
  display: flex; flex-direction: column; justify-content: center;
  @media (max-width: 960px) { padding: 100px 0 48px; }
`;

const HeroEyebrow = styled.span<{ $v: boolean }>`
  font-family: ${FONT_TITLE}; font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: ${COLORS.redCTA};
  margin-bottom: 28px; opacity: 0;
  animation: ${p => p.$v ? heroFadeIn : "none"} .6s .15s cubic-bezier(0.16,1,0.3,1) forwards;
`;

const HeroTitle = styled.h1`
  font-family: ${FONT_TITLE}; font-size: 48px; font-weight: 700;
  line-height: 1.05; letter-spacing: -0.03em; color: ${CREAM}; margin: 0 0 28px;
  @media (max-width: 960px) { font-size: 42px; }
  @media (max-width: 480px) { font-size: 32px; margin: 0 0 20px; }
`;

const Word = styled.span<{ $d: number; $v: boolean; $accent?: boolean }>`
  display: inline-block; margin-right: .22em; opacity: 0;
  animation: ${p => p.$v ? heroWordIn : "none"} .85s ${p => p.$d}s cubic-bezier(0.16,1,0.3,1) forwards;
  ${p => p.$accent && css`color: ${COLORS.redCTA}; font-style: italic; font-weight: 400;`}
  &:last-child { margin-right: 0; }
`;

const HeroLine = styled.div<{ $v: boolean }>`
  width: 48px; height: 3px; background: ${COLORS.redCTA};
  transform-origin: left; margin-bottom: 28px; transform: scaleX(0);
  animation: ${p => p.$v ? heroLineGrow : "none"} .7s 1.4s cubic-bezier(0.16,1,0.3,1) forwards;
`;

const HeroSub = styled.p<{ $v: boolean }>`
  font-family: ${FONT_BODY}; font-size: 16px; line-height: 1.65;
  color: rgba(250,242,234,.6); max-width: 480px; margin: 0 0 40px; opacity: 0;
  animation: ${p => p.$v ? heroFadeIn : "none"} .75s 1.55s cubic-bezier(0.16,1,0.3,1) forwards;
`;

const HeroScroll = styled.div`
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  z-index: 4; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: ${heroFadeIn} 0.6s cubic-bezier(0.16,1,0.3,1) 2.1s forwards;

  @media (max-width: 480px) { display: none; }
`;

const HeroScrollDot = styled.div`
  width: 5px; height: 5px; border-radius: 50%; background: ${COLORS.redCTA};
  animation: ${heroScrollBounce} 1.8s ease-in-out 2.5s infinite;
`;

const HeroScrollLine = styled.div`
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, ${RED_DIM}, transparent);
`;

// ── Intro / Sobre a frente ──
const Intro = styled.section`
  padding: 0 2rem 4rem;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 1rem 2.5rem;
  }
`;

// ── Section header ──
const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem auto 0;
  max-width: 1100px;
  padding: 0 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${COLORS.ink};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 600px) { font-size: 26px; }
`;

const SectionSubtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  max-width: 700px;
  margin: 0 auto 3rem;
  text-align: center;
  color: #7a746e;
  padding: 0 1rem;

  @media (max-width: 600px) { font-size: 14px; }
`;

// ── Scopes Opening (editorial chapter intro) ──
const ScopesOpening = styled.section`
  max-width: 1200px;
  margin: 5rem auto 0;
  padding: 0 2rem 4rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 3.5rem auto 0;
    padding: 0 1rem 3rem;
  }
`;

const OpeningEyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #C02121;
  margin: 0 0 0.9rem;
`;

const OpeningTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${COLORS.ink};
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
`;

const OpeningDivider = styled.div`
  width: 3rem;
  height: 3px;
  background: #C02121;
  border-radius: 2px;
  margin: 1rem auto 1.6rem;
`;

const OpeningSubtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #7a746e;
  max-width: 700px;
  margin: 0 auto 3rem;

  @media (max-width: 600px) { font-size: 14px; }
`;

const OpeningIndex = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 720px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(26,26,24,0.08);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const IndexArrow = styled.span`
  display: inline-block;
  font-family: ${FONT_TITLE};
  font-size: 15px;
  line-height: 1;
  color: ${COLORS.redTitle};
  transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
`;

const IndexCard = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  text-decoration: none;
  color: ${COLORS.ink};
  text-align: center;
  cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);

  &:hover {
    transform: translateY(-2px);
  }

  &:hover ${IndexArrow} {
    transform: translateX(5px);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.redTitle};
    outline-offset: 4px;
  }
`;

const IndexBadge = styled.span`
  font-family: ${FONT_MONO};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: ${COLORS.redTitle};
  text-transform: uppercase;
`;

const IndexTitle = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.ink};
  line-height: 1.15;
  letter-spacing: -0.015em;
  position: relative;
  padding-bottom: 0.6rem;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 32px;
    height: 2px;
    background: ${COLORS.redTitle};
    transform: translateX(-50%);
  }

  @media (max-width: 700px) { font-size: 20px; }
`;

const IndexCTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${FONT_TITLE};
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${COLORS.redTitle};
  margin-top: 0.15rem;
`;

const FrenteLede = styled.p`
  max-width: 920px;
  margin: 0 auto 3rem;
  text-align: center;
  font-family: ${FONT_BODY};
  font-size: 19px;
  line-height: 1.7;
  color: #2a2a2a;
  strong { font-weight: 600; color: ${COLORS.ink}; }

  @media (max-width: 900px) { font-size: 17px; }
`;

const PillarsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Pillar = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  position: relative;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.06);
    border-color: rgba(161,15,35,0.25);
  }
`;

const PillarNum = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: ${COLORS.redTitle};
  margin-bottom: 0.6rem;
  display: block;
`;

const PillarTitle = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 19px;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.6rem;
  line-height: 1.25;
`;

const PillarText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  line-height: 1.55;
  color: #4a4a4a;
  margin: 0;
  strong { font-weight: 600; color: ${COLORS.ink}; }
`;

// ── Stats ──
const StatsBar = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(0,0,0,0.08);

  @media (max-width: 600px) { margin-top: 2.5rem; padding-top: 1.5rem; gap: 1.25rem; }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: #000;

  @media (max-width: 600px) { font-size: 24px; }
`;

const StatLabel = styled.div`
  font-family: ${FONT_BODY};
  font-size: 16px;
  text-align: center;
  color: #555;

  @media (max-width: 600px) { font-size: 13px; }
`;

// ── Red bar ──
const RedBarWrap = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;
`;

const RedBar = styled.div`
  height: 2px;
  width: 100%;
  background: rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, ${COLORS.redTitle} 0%, ${COLORS.redCTA} 50%, ${COLORS.redTitle} 100%);
    transform-origin: left center;
    transform: scaleX(0);
    animation: ${redbarGrow} 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }
`;

// ── Scopes (one section per scope) ──
const ScopeSection = styled.section`
  min-height: 100vh;
  /* topo reservado para o header fixo, para o conteúdo caber em uma tela */
  padding: calc(72px + 1rem) 2rem 1.5rem;
  scroll-margin-top: 72px;
  display: flex;
  align-items: stretch;
  background: #ffffff;
  border-top: 1px solid rgba(26,26,24,0.06);

  &:nth-of-type(even) { background: ${COLORS.lightCream}; }

  @media (min-width: 901px) and (max-height: 700px) {
    padding: calc(72px + 0.5rem) 2rem 1rem;
  }

  @media (max-width: 900px) {
    min-height: auto;
    padding: 3rem 1rem;
  }
`;

const ScopesWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ScopePanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.1rem;

  @media (min-width: 901px) and (max-height: 700px) { gap: 0.6rem; }
`;

const ScopeHeader = styled.div`
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  align-items: end;
  gap: 2.5rem;

  @media (max-width: 1024px) { gap: 1.75rem; }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ScopeCounter = styled.p`
  font-family: ${FONT_TITLE};
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  line-height: 1;
`;

const CounterNum = styled.span`
  font-family: ${FONT_MONO};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: ${COLORS.redTitle};
`;

const ScopeName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.sectionH2.size};
  font-weight: 800;
  letter-spacing: -0.035em;
  text-transform: none;
  color: ${COLORS.ink};
  line-height: 1;
  position: relative;
  padding-bottom: 0.5rem;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 56px;
    height: 3px;
    background: ${COLORS.redTitle};
  }

  @media (max-width: 1100px) { font-size: 28px; }
  @media (max-width: 700px) { font-size: 24px; }
  @media (min-width: 901px) and (max-height: 700px) { font-size: 28px; padding-bottom: 0.35rem; }
`;

const ScopeGrid = styled.div`
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
  flex: 1;

  @media (max-width: 1024px) { gap: 1.75rem; }
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 1.5rem; }
`;

const ScopeMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  min-width: 0;
  height: 100%;

  @media (min-width: 901px) and (max-height: 700px) { gap: 0.75rem; }
`;

const ScopeIntro = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScopeTitleH3 = styled.h3`
  color: ${COLORS.ink};
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.subTitle.size};
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;

  i {
    font-style: italic;
    font-weight: 400;
    color: ${COLORS.redTitle};
  }

  @media (min-width: 901px) and (max-height: 700px) { font-size: 18px; }
  @media (max-width: 900px) { font-size: 18px; }
`;

const Accent = styled.div`
  width: 56px;
  height: 3px;
  background: ${COLORS.redTitle};
  margin: 0.7rem 0 0.85rem;
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${accentGrow} 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;

  @media (min-width: 901px) and (max-height: 700px) { margin: 0.45rem 0 0.55rem; }
`;

const ScopeLede = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15.5px;
  line-height: 1.55;
  color: #5a5550;
  margin: 0;
  strong { color: ${COLORS.ink}; font-weight: 600; }

  @media (min-width: 901px) and (max-height: 700px) { font-size: 14.5px; line-height: 1.5; }
  @media (max-width: 600px) { font-size: 14px; }
`;

const PanelSide = styled.aside`
  display: flex;
  flex-direction: column;
  background: rgba(161, 15, 35, 0.035);
  border: 1px solid rgba(26,26,24,0.08);
  border-left: 3px solid ${COLORS.redTitle};
  padding: 1.15rem 1.4rem 1.1rem;
  position: relative;

  @media (min-width: 901px) and (max-height: 700px) { padding: 0.85rem 1.2rem 0.8rem; }
`;

const SideCorner = styled.div`
  content: "";
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  width: 26px;
  height: 26px;
  border-top: 2px solid rgba(161,15,35,0.25);
  border-right: 2px solid rgba(161,15,35,0.25);
`;

const SideEyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${COLORS.redTitle};
  margin: 0 0 0.6rem;
`;

const SideRows = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
`;

const SideRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(26,26,24,0.08);
  &:first-of-type { padding-top: 0.25rem; }
  &:last-of-type { border-bottom: none; padding-bottom: 0.25rem; }
`;

const SideKey = styled.span`
  font-family: ${FONT_MONO};
  font-size: 10.5px;
  color: rgba(26,26,24,0.5);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const SideVal = styled.span`
  font-family: ${FONT_BODY};
  font-size: 14px;
  color: ${COLORS.ink};
  line-height: 1.45;
  font-weight: 500;
  strong { color: ${COLORS.redTitle}; font-weight: 700; }
`;

const SideQuote = styled.p`
  margin: 0.85rem 0 0;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(26,26,24,0.08);
  font-family: ${FONT_BODY};
  font-size: 13.5px;
  line-height: 1.55;
  color: #5a5550;
  font-style: italic;
  &::before {
    content: "\\201C";
    font-family: ${FONT_TITLE};
    font-size: 26px;
    color: ${COLORS.redTitle};
    line-height: 0;
    position: relative;
    top: 6px;
    margin-right: 4px;
  }
`;

const PanelBody = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  border-top: 1px solid rgba(26,26,24,0.12);
  border-bottom: 1px solid rgba(26,26,24,0.12);
  flex: 1;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    flex: 0 1 auto;
  }
`;

const PanelCol = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.15rem 2rem 1.15rem 0;
  & + & {
    padding: 1.15rem 0 1.15rem 2.25rem;
    border-left: 1px solid rgba(26,26,24,0.12);
  }

  @media (min-width: 901px) and (max-height: 700px) {
    padding: 0.75rem 1.35rem 0.75rem 0;
    & + & { padding: 0.75rem 0 0.75rem 1.6rem; }
  }

  @media (max-width: 900px) {
    padding: 1.1rem 0;
    & + & {
      padding: 1.1rem 0;
      border-left: none;
      border-top: 1px solid rgba(26,26,24,0.12);
    }
  }
`;

const ColLabel = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${COLORS.redTitle};
  margin: 0 0 0.65rem;

  @media (min-width: 901px) and (max-height: 700px) { margin: 0 0 0.45rem; }
`;

const ScopeDetail = styled.p`
  font-family: ${FONT_BODY};
  font-size: 14.5px;
  line-height: 1.55;
  color: #3a3530;
  margin: 0;
  strong { color: ${COLORS.ink}; font-weight: 600; }

  @media (min-width: 901px) and (max-height: 700px) { font-size: 13.5px; line-height: 1.45; }
`;

const Bullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  align-content: space-between;
  flex: 1;
  counter-reset: entrega;

  li {
    font-family: ${FONT_BODY};
    font-size: 14px;
    line-height: 1.4;
    padding: 0.45rem 0 0.45rem 2rem;
    position: relative;
    color: ${COLORS.ink};
    border-bottom: 1px solid rgba(26,26,24,0.07);
    counter-increment: entrega;
    &:last-child { border-bottom: none; }
    &::before {
      content: counter(entrega, decimal-leading-zero);
      position: absolute;
      left: 0;
      top: 0.75em;
      font-family: ${FONT_TITLE};
      font-size: 10.5px;
      font-weight: 700;
      color: ${COLORS.redTitle};
      letter-spacing: 0.05em;
    }
  }

  @media (min-width: 901px) and (max-height: 700px) {
    li { padding: 0.32rem 0 0.32rem 1.6rem; font-size: 13px; line-height: 1.35; }
  }
`;

const PanelTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const Tag = styled.span`
  font-family: ${FONT_MONO};
  font-size: 11.5px;
  font-weight: 500;
  color: ${COLORS.ink};
  transition: color 0.2s ease;
  &:hover { color: ${COLORS.redTitle}; }
  &:not(:last-child)::after {
    content: "·";
    margin: 0 0.5rem;
    color: rgba(26,26,24,0.3);
  }
`;

// ── Integration band ──
const Integration = styled.section`
  margin-top: 4rem;
  background: ${COLORS.black};
  color: #fff;
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;

const SynergyCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const CursorGlow = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(192,33,33,0.156) 0%, transparent 65%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
  left: 50%;
  top: 50%;
  will-change: left, top, opacity;
`;

const IntegrationInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const Kicker = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: ${COLORS.redCTA};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const IntegrationTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  margin: 0 0 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${COLORS.cream};
  font-weight: 700;
  span { color: ${COLORS.redCTA}; }

  @media (max-width: 800px) { font-size: 26px; }
`;

const IntegrationLede = styled.p`
  font-family: ${FONT_BODY};
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255,255,255,0.78);
  max-width: 820px;
  margin: 0 auto 2.5rem;
`;

// ── Diferenciais ──
const Diferenciais = styled.section`
  padding: 0 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DifGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(26,26,24,0.08);
  border: 1px solid rgba(26,26,24,0.08);
  margin-top: 2.5rem;

  @media (max-width: 800px) { grid-template-columns: 1fr; }
`;

const DifCard = styled.div`
  background: #fff;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  border: 1px solid transparent;
  opacity: 0;
  transform: translateY(16px);
  transition: background 0.25s ease, border-color 0.25s ease,
              opacity 0.7s cubic-bezier(0.16,1,0.3,1),
              transform 0.7s cubic-bezier(0.16,1,0.3,1);

  &.in-view { opacity: 1; transform: translateY(0); }
  &:nth-child(1).in-view { transition-delay: 0s, 0s, 0.10s, 0.10s; }
  &:nth-child(2).in-view { transition-delay: 0s, 0s, 0.18s, 0.18s; }
  &:nth-child(3).in-view { transition-delay: 0s, 0s, 0.26s, 0.26s; }

  &:hover {
    background: rgba(192,33,33,0.05);
    border-color: rgba(192,33,33,0.45);
  }
`;

const DifAccent = styled.div`
  width: 20px;
  height: 2px;
  background: ${COLORS.redCTA};
  transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
  ${DifCard}:hover & { width: 40px; }
`;

const DifNum = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: ${COLORS.redCTA};
  text-transform: uppercase;
  margin: 0;
`;

const DifTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: ${COLORS.ink};
  letter-spacing: 0.02em;
`;

const DifText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  line-height: 1.55;
  color: #7a746e;
  margin: 0;
`;
