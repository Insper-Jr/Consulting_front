import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import Header from "../../components/header";
import Footer from "../../components/footerNovo";
import WppButton from "../../components/wppButton";
import ContactSection from "../../components/sectionContact";
import DireitoCTA from "./components/direitoCTA";

import capaPeDireito from "../../assets/direito/pe-direito/slide-03.png";
import capaSociety   from "../../assets/direito/society/slide-07.png";
import capaPrint     from "../../assets/direito/print/slide-15.png";

// ── Color tokens (mirror tech) ─────────────────────────────────────────────
import { RED_TITLE, RED, RED_DARK, BG_DARK, DARK, BG_CREAM, FONT_TITLE, FONT_BODY, TYPE } from "../../styles/tokens";

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

// ── Global Style: import fonts ─────────────────────────────────────────────
const DireitoGlobal = createGlobalStyle`
  html { scroll-behavior: smooth; }
`;

// ── Particle Network (canvas) hook ─────────────────────────────────────────
type NetOpts = {
  count?: number;
  dotColor?: string;
  lineColor?: (c: number) => string;
  glowEl?: HTMLElement | null;
  maxDist?: number;
  repel?: number;
  deadZone?: (W: number, H: number) => { x: number; y: number; w: number; h: number };
};

function useParticleNetwork(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapperRef: React.RefObject<HTMLElement | null>,
  opts: NetOpts = {}
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapperRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const mouse = { x: -9999, y: -9999 };
    const o = {
      count: 80,
      dotColor: "rgba(192,33,33,0.55)",
      lineColor: (c: number) => `rgba(192,33,33,${0.18 * c})`,
      maxDist: 140,
      repel: 100,
      ...opts,
    };

    let W = 0, H = 0;
    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    const makeP = (): Particle => {
      let x = 0, y = 0, tries = 0;
      do {
        x = Math.random() * W;
        y = Math.random() * H;
        tries++;
        if (!o.deadZone) break;
        const dz = o.deadZone(W, H);
        if (x < dz.x || x > dz.x + dz.w || y < dz.y || y > dz.y + dz.h) break;
      } while (tries < 12);
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      };
    };

    const init = () => {
      resize();
      particles = Array.from({ length: o.count }, makeP);
    };

    const update = (p: Particle) => {
      p.vx += (Math.random() - 0.5) * 0.06;
      p.vy += (Math.random() - 0.5) * 0.06;
      const sp = Math.hypot(p.vx, p.vy), max = 0.8;
      if (sp > max) { p.vx = (p.vx / sp) * max; p.vy = (p.vy / sp) * max; }
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < o.repel && d > 0) {
        const f = ((o.repel - d) / o.repel) * 1.2;
        p.vx += (dx / d) * f * 0.3;
        p.vy += (dy / d) * f * 0.3;
      }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    };

    let raf = 0;
    let running = true;
    const draw = () => {
      if (!running) return;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        update(particles[i]);
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = o.dotColor;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < o.maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = o.lineColor(1 - d / o.maxDist);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (o.glowEl) {
        o.glowEl.style.left = `${mouse.x}px`;
        o.glowEl.style.top = `${mouse.y}px`;
      }
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    init();
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, wrapperRef, opts]);
}

// ── Scopes data ────────────────────────────────────────────────────────────
type Scope = {
  num: string;
  tab: string;
  title: string;
  lede: string;
  detail: string;
  rows: { key: string; val: string }[];
  quote: string;
  bullets: string[];
  tags: string[];
};

// ── Page ────────────────────────────────────────────────────────────────────
function Direito() {
  const { t } = useTranslation();

  const scopeItems = t("direito.scopes.items", { returnObjects: true }) as Omit<Scope, "num">[];
  const SCOPES: Scope[] = scopeItems.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

  const heroIntroRef = useRef<HTMLDivElement>(null);
  const sharedCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  const integrationRef = useRef<HTMLElement>(null);
  const synergyCanvasRef = useRef<HTMLCanvasElement>(null);
  const integrationGlowRef = useRef<HTMLDivElement>(null);

  useParticleNetwork(sharedCanvasRef, heroIntroRef, {
    count: 75,
    maxDist: 120,
    dotColor: "rgba(230,90,90,0.63)",
    lineColor: (c: number) => `rgba(230,90,90,${0.252 * c})`,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

  useEffect(() => {
    const wrap = heroIntroRef.current;
    const glow = heroGlowRef.current;
    if (!wrap || !glow) return;
    let raf = 0;
    const onEnter = () => { glow.style.opacity = "1"; };
    const onLeave = () => { glow.style.opacity = "0"; };
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      });
    };
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("mousemove", onMove);
    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useParticleNetwork(heroCanvasRef, heroRef, {
    count: 75,
    maxDist: 120,
    dotColor: "rgba(230,90,90,0.63)",
    lineColor: (c: number) => `rgba(230,90,90,${0.252 * c})`,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

  useParticleNetwork(synergyCanvasRef, integrationRef, {
    count: 60,
    dotColor: "rgba(230,90,90,0.38)",
    lineColor: (c: number) => `rgba(230,90,90,${0.15 * c})`,
    maxDist: 110,
    repel: 90,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

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

  const heroWords: { text: string; accent?: boolean; delay: string }[] = [
    { text: t("direito.hero.words.word1"), delay: "0.55s" },
    { text: t("direito.hero.words.word2"), delay: "0.7s" },
    { text: t("direito.hero.words.word3"), accent: true, delay: "0.85s" },
    { text: t("direito.hero.words.word4"), accent: true, delay: "1.0s" },
    { text: t("direito.hero.words.word5"), delay: "1.15s" },
    { text: t("direito.hero.words.word6"), accent: true, delay: "1.3s" },
    { text: t("direito.hero.words.word7"), accent: true, delay: "1.45s" },
  ];

  return (
    <PageWrap>
      <DireitoGlobal />
      <WppButton />
      <Header />

      {/* Hero + Intro shared canvas */}
      <HeroIntroWrap ref={heroIntroRef}>
        <SharedCanvas ref={sharedCanvasRef} />
        <HeroGlow ref={heroGlowRef} />

        {/* Hero */}
        <Hero ref={heroRef}>
          <HeroCanvas ref={heroCanvasRef} />
          <HeroVignette />
          <HeroCenter>
            <HeroEyebrow>{t("direito.hero.eyebrow")}</HeroEyebrow>
            <HeroTitle>
              {heroWords.map((w, i) => (
                <Word key={i} $accent={!!w.accent} style={{ animationDelay: w.delay }}>
                  {w.text}
                </Word>
              ))}
            </HeroTitle>
            <HeroLine />
            <HeroSub>
              {t("direito.hero.sub")}
            </HeroSub>
          </HeroCenter>
          <HeroScroll>
            <HeroScrollDot />
            <HeroScrollLine />
          </HeroScroll>
        </Hero>

      </HeroIntroWrap>

      {/* Red animated bar above Nossos Escopos */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Section opening: Nossos Escopos */}
      <ScopesOpening>
        <OpeningEyebrow>{t("direito.scopesOpening.eyebrow")}</OpeningEyebrow>
        <OpeningTitle>{t("direito.scopesOpening.title")}</OpeningTitle>
        <OpeningDivider />
        <OpeningSubtitle>
          {t("direito.scopesOpening.subtitle")}
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
              <IndexBadge>{t("direito.scopes.badgeLabel")} {s.num}</IndexBadge>
              <IndexTitle>{s.tab}</IndexTitle>
              <IndexCTA>
                <span>{t("direito.scopesOpening.explore")}</span>
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
                  <CounterNum>{t("direito.scopes.badgeLabel")} {s.num}</CounterNum>
                  <ScopeName>{s.tab}</ScopeName>
                </ScopeCounter>
                <PanelTags>
                  {s.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </PanelTags>
              </ScopeHeader>

              <ScopeGrid>
                <ScopeMain>
                  <ScopeIntro>
                    <ScopeTitleH3 dangerouslySetInnerHTML={{ __html: s.title }} />
                    <Accent />
                    <ScopeLede dangerouslySetInnerHTML={{ __html: s.lede }} />
                  </ScopeIntro>

                  <PanelBody>
                    <PanelCol>
                      <ColLabel>{t("direito.scopes.howWeWork")}</ColLabel>
                      <ScopeDetail dangerouslySetInnerHTML={{ __html: s.detail }} />
                    </PanelCol>
                    <PanelCol>
                      <ColLabel>{t("direito.scopes.mainApplications")}</ColLabel>
                      <Bullets>
                        {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </Bullets>
                    </PanelCol>
                  </PanelBody>
                </ScopeMain>

                <PanelSide>
                  <SideCorner />
                  <SideEyebrow>{t("direito.scopes.fichaLabel")}</SideEyebrow>
                  <SideRows>
                    {s.rows.map((r, j) => (
                      <SideRow key={j}>
                        <SideKey>{r.key}</SideKey>
                        <SideVal dangerouslySetInnerHTML={{ __html: r.val }} />
                      </SideRow>
                    ))}
                  </SideRows>
                  <SideQuote>{s.quote}</SideQuote>
                </PanelSide>
              </ScopeGrid>
            </ScopePanel>
          </ScopesWrap>
        </ScopeSection>
      ))}

      {/* Red animated bar above Cases de Destaque */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Cases de Destaque — overview com links para páginas dedicadas */}
      <HighlightCases>
        <SectionHeader>
          <OpeningEyebrow>{t("direito.cases.eyebrow")}</OpeningEyebrow>
          <SectionTitle>{t("direito.cases.title")}</SectionTitle>
          <OpeningDivider />
        </SectionHeader>
        <SectionSubtitle>
          {t("direito.cases.subtitle")}
        </SectionSubtitle>
        <HighlightGrid>
          <HighlightCard to="/direito/pe-direito" aria-label={t("direito.cases.peDireito.ariaLabel")}>
            <HighlightCardTitle>{t("direito.cases.peDireito.title")}</HighlightCardTitle>
            <HighlightCardImage src={capaPeDireito} alt={t("direito.cases.peDireito.title")} loading="lazy" />
            <HighlightCardSubtitle>{t("direito.cases.peDireito.subtitle")}</HighlightCardSubtitle>
          </HighlightCard>
          <HighlightCard to="/direito/society" aria-label={t("direito.cases.society.ariaLabel")}>
            <HighlightCardTitle>{t("direito.cases.society.title")}</HighlightCardTitle>
            <HighlightCardImage src={capaSociety} alt={t("direito.cases.society.title")} loading="lazy" />
            <HighlightCardSubtitle>{t("direito.cases.society.subtitle")}</HighlightCardSubtitle>
          </HighlightCard>
          <HighlightCard to="/direito/print" aria-label={t("direito.cases.print.ariaLabel")}>
            <HighlightCardTitle>{t("direito.cases.print.title")}</HighlightCardTitle>
            <HighlightCardImage src={capaPrint} alt={t("direito.cases.print.title")} loading="lazy" />
            <HighlightCardSubtitle>{t("direito.cases.print.subtitle")}</HighlightCardSubtitle>
          </HighlightCard>
        </HighlightGrid>
      </HighlightCases>

      {/* Integration band — Sinergia entre Escopos */}
      <Integration ref={integrationRef}>
        <SynergyCanvas ref={synergyCanvasRef} />
        <CursorGlow ref={integrationGlowRef} />
        <IntegrationInner>
          <Kicker>{t("direito.integration.kicker")}</Kicker>
          <IntegrationTitle dangerouslySetInnerHTML={{ __html: t("direito.integration.title") }} />
          <IntegrationLede>
            {t("direito.integration.lede")}
          </IntegrationLede>
        </IntegrationInner>
      </Integration>

      {/* Red animated bar above Sobre a frente */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Sobre a frente */}
      <Intro id="sobre-frente">
        <SectionHeader>
          <OpeningEyebrow>{t("direito.about.eyebrow")}</OpeningEyebrow>
          <SectionTitle>{t("direito.about.title")}</SectionTitle>
          <OpeningDivider />
        </SectionHeader>

        <FrenteLede dangerouslySetInnerHTML={{ __html: t("direito.about.lede") }} />

        <PillarsGrid>
          {(t("direito.about.pillars", { returnObjects: true }) as { num: string; title: string; text: string }[]).map((p, i) => (
            <Pillar key={i}>
              <PillarNum>{p.num}</PillarNum>
              <PillarTitle>{p.title}</PillarTitle>
              <PillarText dangerouslySetInnerHTML={{ __html: p.text }} />
            </Pillar>
          ))}
        </PillarsGrid>

        <StatsBar>
          {(t("direito.about.stats", { returnObjects: true }) as { value: string; label: string }[]).map((s, i) => (
            <Stat key={i}><StatValue>{s.value}</StatValue><StatLabel>{s.label}</StatLabel></Stat>
          ))}
        </StatsBar>
      </Intro>

      {/* Red animated bar above Diferenciais */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Diferenciais */}
      <Diferenciais>
        <SectionHeader>
          <OpeningEyebrow>{t("direito.differentiators.eyebrow")}</OpeningEyebrow>
          <SectionTitle>{t("direito.differentiators.title")}</SectionTitle>
          <OpeningDivider />
        </SectionHeader>
        <SectionSubtitle>
          {t("direito.differentiators.subtitle")}
        </SectionSubtitle>
        <DifGrid ref={difCardsRef}>
          {(t("direito.differentiators.cards", { returnObjects: true }) as { num: string; title: string; text: string }[]).map((c, i) => (
            <DifCard data-dif-card key={i}>
              <DifAccent />
              <DifNum>{c.num}</DifNum>
              <DifTitle>{c.title}</DifTitle>
              <DifText>{c.text}</DifText>
            </DifCard>
          ))}
        </DifGrid>
      </Diferenciais>

      {/* Closing CTA + Contact */}
      <DireitoCTA />
      <ContactSection />

      <Footer />
    </PageWrap>
  );
}

export default Direito;

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

const HeroIntroWrap = styled.div`
  position: relative;
  overflow: hidden;
  background: #ffffff;
`;

const SharedCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const HeroGlow = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(192,33,33,0.18) 0%, transparent 65%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
  mix-blend-mode: screen;
  z-index: 1;
  will-change: left, top, opacity;
`;

const Hero = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${COLORS.black};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const HeroVignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(14,4,4,0.85) 100%);
  pointer-events: none;
  z-index: 1;
`;

const HeroCenter = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 0 24px;
  text-align: center;
  max-width: 760px;
`;

const HeroEyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${COLORS.redCTA};
  opacity: 0;
  animation: ${heroFadeIn} 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
`;

const HeroTitle = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: 48px;
  font-weight: 700;
  color: ${COLORS.cream};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 1300px) { font-size: 40px; }
  @media (max-width: 600px) { font-size: 30px; }
`;

const Word = styled.span<{ $accent?: boolean }>`
  display: inline-block;
  margin-right: 0.22em;
  opacity: 0;
  transform: translateY(28px);
  filter: blur(6px);
  animation: ${heroWordIn} 0.85s cubic-bezier(0.16,1,0.3,1) forwards;
  ${p => p.$accent && css`color: ${COLORS.redCTA};`}
  &:last-child { margin-right: 0; }
`;

const HeroLine = styled.div`
  width: 64px;
  height: 3px;
  background: ${COLORS.redCTA};
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${heroLineGrow} 0.7s cubic-bezier(0.16,1,0.3,1) 1.4s forwards;
`;

const HeroSub = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.cream};
  line-height: 1.5;
  max-width: 560px;
  margin: 0;
  opacity: 0;
  animation: ${heroFadeIn} 0.75s cubic-bezier(0.16,1,0.3,1) 1.55s forwards;

  @media (max-width: 600px) { font-size: 14px; }
`;

const HeroScroll = styled.div`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: ${heroFadeIn} 0.6s cubic-bezier(0.16,1,0.3,1) 2.1s forwards;
`;

const HeroScrollDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${COLORS.redCTA};
  animation: ${heroScrollBounce} 1.8s ease-in-out 2.5s infinite;
`;

const HeroScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(105,18,18,0.45), transparent);
`;

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

const ScopesOpening = styled.section`
  max-width: 1200px;
  margin: 5rem auto 0;
  padding: 0 2rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 3.5rem auto 0;
    padding: 0 1rem;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(26,26,24,0.08);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
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
  font-size: 19px;
  font-weight: 700;
  color: ${COLORS.ink};
  line-height: 1.2;
  letter-spacing: -0.015em;
  position: relative;
  padding-bottom: 0.6rem;
  max-width: 240px;

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

  @media (max-width: 700px) { font-size: 17px; }
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
  color: ${COLORS.ink};
  margin: 0 0 0.6rem;
  line-height: 1.25;
`;

const PillarText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  line-height: 1.55;
  color: #7a746e;
  margin: 0;
  strong { font-weight: 600; color: ${COLORS.ink}; }
`;

const StatsBar = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(0,0,0,0.08);
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
  color: ${COLORS.ink};

  @media (max-width: 600px) { font-size: 24px; }
`;

const StatLabel = styled.div`
  font-family: ${FONT_BODY};
  font-size: 16px;
  text-align: center;
  color: #7a746e;

  @media (max-width: 600px) { font-size: 13px; }
`;

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
  max-width: 720px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 56px;
    height: 3px;
    background: ${COLORS.redTitle};
  }

  @media (max-width: 700px) { font-size: 24px; }
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
  font-size: 16.5px;
  line-height: 1.6;
  color: #7a746e;
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
  color: #7a746e;
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
  font-size: 15px;
  line-height: 1.65;
  color: #7a746e;
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

const HighlightCases = styled.section`
  padding: 0 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 900px) {
    padding: 0 1rem 3.5rem;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-top: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const HighlightCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(26,26,24,0.08);
  border-top: 3px solid ${COLORS.redTitle};
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  & > img {
    border-radius: 0;
  }

  &::before {
    content: "Clique aqui";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: 0.6rem;
    background: ${COLORS.redTitle};
    color: #fff;
    font-family: ${FONT_TITLE};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    box-shadow: 0 6px 14px rgba(161, 15, 35, 0.32);
    opacity: 0;
    transform: translate(-50%, 8px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;
    z-index: 2;
    white-space: nowrap;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(0,0,0,0.12);
    border-color: rgba(161,15,35,0.35);

    &::before {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.redTitle};
    outline-offset: 3px;

    &::before {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const HighlightCardTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.ink};
  margin: 0;
  padding: 1.25rem 1.5rem 1rem;
  letter-spacing: -0.01em;
  line-height: 1.2;

  @media (max-width: 900px) { font-size: 20px; padding: 1rem 1.25rem 0.85rem; }
`;

const HighlightCardImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
  border-top: 1px solid rgba(26,26,24,0.06);
  border-bottom: 1px solid rgba(26,26,24,0.06);
`;

const HighlightCardSubtitle = styled.p`
  font-family: ${FONT_MONO};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${COLORS.redTitle};
  margin: 0;
  padding: 1rem 1.5rem 1.25rem;

  @media (max-width: 900px) { padding: 0.85rem 1.25rem 1rem; }
`;

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
  color: rgba(250,242,234,0.85);
  max-width: 820px;
  margin: 0 auto 2.5rem;
`;

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
