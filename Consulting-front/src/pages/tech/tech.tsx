import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import Header from "../../components/header";
import Footer from "../../components/footerNovo";
import WppButton from "../../components/wppButton";
import WalleCase from "./components/walleCase";
import GamifCase from "./components/gamifCase";

// ── Color tokens (from HTML reference) ──────────────────────────────────────
const COLORS = {
  redTitle: "#A10F23",
  redCTA:   "#C02121",
  redDark:  "#691212",
  black:    "#0e0404",
  ink:      "#1a1a1a",
  bg:       "#ffffff",
  cream:    "#FAF2EA",
  lightCream: "#faf6f1",
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;
const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

// ── Global Style: import fonts ─────────────────────────────────────────────
const TechGlobal = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');
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
  title: React.ReactNode;
  lede: React.ReactNode;
  side: { eyebrow: string; rows: { key: string; val: React.ReactNode }[]; quote: string };
  detail: React.ReactNode;
  bullets: string[];
  tags: string[];
};

const SCOPES: Scope[] = [
  {
    num: "01",
    tab: "Dados",
    title: <>Dados que viram <i>decisão</i>.</>,
    lede: <>Responsável por <strong>transformar dados em inteligência estratégica</strong> — da estruturação e modelagem dos bancos ao desenvolvimento de <strong>dashboards interativos</strong> e modelos de machine learning para apoio à tomada de decisão.</>,
    side: {
      eyebrow: "Ficha do escopo",
      rows: [
        { key: "Produto-chave", val: <><strong>Dashboards interativos</strong> (React + Python)</> },
        { key: "Bancos de dados", val: <>· SQL (PostgreSQL, Supabase, SQL Workbench)<br />· NoSQL</> },
        { key: "Aplicações", val: <>Visualização estratégica, análise exploratória e diagnóstica, Machine Learning (previsão, classificação, clusterização)</> },
        { key: "Sinergia", val: <>Forte integração com Desenvolvimento Web — dashboards embarcados em plataformas</> },
      ],
      quote: "Desenvolvimento orientado ao problema — não à ferramenta.",
    },
    detail: <>Nossa abordagem é <strong>orientada ao problema</strong> e não restrita a ferramentas específicas. Estruturamos e modelamos os dados conforme a necessidade do cliente, integramos com outras frentes (ex: dashboards dentro de plataformas web) e entregamos <strong>documentação técnica detalhada</strong> de todos os métodos utilizados. O produto-chave são os dashboards — front-end em React e back-end em Python, conectados ao banco em tempo real.</>,
    bullets: [
      "Dashboards interativos",
      "Visualização de dados estratégicos",
      "Análise exploratória e diagnóstica",
      "Modelos de Machine Learning — previsão, classificação e clusterização",
      "Apoio à tomada de decisão baseada em dados",
    ],
    tags: ["Python", "React", "SQL", "PostgreSQL", "Supabase", "SQL Workbench", "NoSQL", "Machine Learning"],
  },
  {
    num: "02",
    tab: "Desenvolvimento Web",
    title: <>Plataformas <i>completas</i>.</>,
    lede: <>Focado na <strong>criação de plataformas digitais completas (fullstack)</strong> — de componentes isolados a sistemas inteiros. Arquitetura modular e escalável, com integração nativa a dados, automações e agentes de IA.</>,
    side: {
      eyebrow: "Ficha do escopo",
      rows: [
        { key: "Produto-chave", val: <><strong>Plataformas digitais completas</strong> (fullstack)</> },
        { key: "Stack", val: <>· React no front<br />· Python no back</> },
        { key: "Versionamento", val: <>GitHub — controle de branches e documentação completa</> },
        { key: "Aplicações", val: <>Sistemas web personalizados, plataformas institucionais e operacionais, soluções interativas</> },
        { key: "Sinergia", val: <>Comunicação direta com Dados, Automação e agentes de IA</> },
      ],
      quote: "Do componente isolado ao sistema completo — arquitetura modular e escalável.",
    },
    detail: <>Trabalhamos com <strong>desenvolvimento fullstack</strong> (frontend + backend), priorizando arquitetura modular e escalável. Integramos com banco de dados e soluções analíticas, conversamos diretamente com automações e agentes de IA, e organizamos os projetos em <strong>repositórios bem documentados</strong>. A flexibilidade do escopo permite entregar desde um dashboard isolado até uma plataforma completa, passando por soluções híbridas.</>,
    bullets: [
      "Sistemas web personalizados",
      "Plataformas institucionais e operacionais",
      "Aplicações com integração de dados",
      "Soluções interativas",
    ],
    tags: ["React", "Python", "GitHub"],
  },
  {
    num: "03",
    tab: "Automação",
    title: <>Processos que <i>se movem</i> sozinhos.</>,
    lede: <><strong>Fluxos automatizados e agentes inteligentes</strong> que otimizam processos, reduzem atividades repetitivas e integram sistemas. Atuamos com <strong>n8n</strong> e programação customizada, sempre a partir de um mapeamento prévio da operação.</>,
    side: {
      eyebrow: "Ficha do escopo",
      rows: [
        { key: "Produto-chave", val: <><strong>Fluxos automatizados</strong> e <strong>agentes inteligentes</strong> (chatbots)</> },
        { key: "Ferramenta principal", val: <>n8n — com programação customizada</> },
        { key: "Integrações", val: <>APIs e sistemas externos · canais WhatsApp, plataformas web e sistemas internos</> },
        { key: "Aplicações", val: <>Processos operacionais, comunicações automáticas, chatbots e execução baseada em inputs</> },
      ],
      quote: "Onde há repetição, há um fluxo a ser automatizado.",
    },
    detail: <>Desenvolvemos <strong>fluxos baseados em lógica de negócio</strong>, sempre a partir de um mapeamento operacional prévio, e criamos agentes conversacionais inteligentes que integram diretamente com Desenvolvimento Web e Dados. Um exemplo dessa atuação é o <strong>Wall-E</strong>, construído em n8n a partir do mapeamento da equipe de Business — uma das iniciativas sinérgicas entre Engenharia e Business da Insper Jr.</>,
    bullets: [
      "Automação de processos operacionais",
      "Envio automático de comunicações (e-mails, mensagens)",
      "Chatbots (WhatsApp, plataformas web, etc.)",
      "Integração entre sistemas e plataformas",
      "Execução automática baseada em inputs definidos",
    ],
    tags: ["n8n", "APIs", "WhatsApp", "Agentes de IA", "Chatbots"],
  },
];

// ── Page ────────────────────────────────────────────────────────────────────
function Tech() {
  const heroIntroRef = useRef<HTMLDivElement>(null);
  const sharedCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  const integrationRef = useRef<HTMLElement>(null);
  const synergyCanvasRef = useRef<HTMLCanvasElement>(null);
  const integrationGlowRef = useRef<HTMLDivElement>(null);

  // Wire up hero/intro shared canvas (visible behind the white intro section)
  useParticleNetwork(sharedCanvasRef, heroIntroRef, {
    count: 75,
    maxDist: 120,
    dotColor: "rgba(230,90,90,0.63)",
    lineColor: (c: number) => `rgba(230,90,90,${0.252 * c})`,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

  // Hero glow follows cursor (radial gradient that lights up on hover)
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

  // Wire up hero canvas (visible on top of the dark hero background)
  useParticleNetwork(heroCanvasRef, heroRef, {
    count: 75,
    maxDist: 120,
    dotColor: "rgba(230,90,90,0.63)",
    lineColor: (c: number) => `rgba(230,90,90,${0.252 * c})`,
    deadZone: (W, H) => ({ x: W * 0.22, y: H * 0.18, w: W * 0.56, h: H * 0.64 }),
  });

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

  const heroWords: { text: string; accent?: boolean; delay: string }[] = [
    { text: "Tecnologia", delay: "0.55s" },
    { text: "que",        delay: "0.7s" },
    { text: "resolve",    accent: true, delay: "0.85s" },
    { text: "problemas",  accent: true, delay: "1.0s" },
    { text: "reais",      accent: true, delay: "1.15s" },
    { text: "de",         delay: "1.3s" },
    { text: "negócio.",   delay: "1.45s" },
  ];

  return (
    <PageWrap>
      <TechGlobal />
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
            <HeroEyebrow>Frente de Engenharia &amp; Tecnologia</HeroEyebrow>
            <HeroTitle>
              {heroWords.map((w, i) => (
                <Word key={i} $accent={!!w.accent} style={{ animationDelay: w.delay }}>
                  {w.text}
                </Word>
              ))}
            </HeroTitle>
            <HeroLine />
            <HeroSub>
              Unimos engenharia, dados, automação e desenvolvimento de software para criar soluções digitais sob medida — desde a estruturação de bancos de dados até agentes inteligentes integrados ao seu ecossistema.
            </HeroSub>
          </HeroCenter>
          <HeroScroll>
            <HeroScrollDot />
            <HeroScrollLine />
          </HeroScroll>
        </Hero>

        {/* Sobre a frente */}
        <Intro id="sobre-frente">
          <SectionHeader>
            <Line $hidden />
            <SectionTitle>Sobre a frente</SectionTitle>
            <Line $hidden />
          </SectionHeader>

          <FrenteLede>
            Desde 2017, desenvolvemos soluções digitais e tecnológicas que unem engenharia, dados, automação e desenvolvimento de software para gerar impacto real em empresas e organizações. Nossa atuação evolui constantemente em tecnologias, metodologias e materiais internos — sempre buscando a melhor solução para cada projeto, sem se limitar a ferramentas ou padrões específicos.
          </FrenteLede>

          <PillarsGrid>
            <Pillar>
              <PillarNum>01 — Multidisciplinar</PillarNum>
              <PillarTitle>Cinco cursos, uma frente</PillarTitle>
              <PillarText>
                Reunimos alunos de <strong>Engenharia da Computação, Mecânica, Mecatrônica, Produção e Ciência da Computação</strong>, garantindo visão multidisciplinar e acesso a diferentes áreas do universo tech.
              </PillarText>
            </Pillar>
            <Pillar>
              <PillarNum>02 — Integrada</PillarNum>
              <PillarTitle>Três escopos que conversam</PillarTitle>
              <PillarText>
                A atuação se divide em <strong>Dados, Desenvolvimento Web e Automação</strong>. A divisão é apenas organizacional: os escopos funcionam de forma integrada dentro de uma mesma solução.
              </PillarText>
            </Pillar>
            <Pillar>
              <PillarNum>03 — Sob medida</PillarNum>
              <PillarTitle>Soluções completas</PillarTitle>
              <PillarText>
                Combinamos dashboards analíticos, bancos de dados, automações e agentes inteligentes em uma única plataforma — <strong>adaptada ao contexto e às necessidades de cada cliente</strong>.
              </PillarText>
            </Pillar>
          </PillarsGrid>

          <StatsBar>
            <Stat><StatValue>3+</StatValue><StatLabel>Escopos integrados</StatLabel></Stat>
            <Stat><StatValue>5</StatValue><StatLabel>Cursos de Engenharia</StatLabel></Stat>
            <Stat><StatValue>8+</StatValue><StatLabel>Anos de Atuação</StatLabel></Stat>
            <Stat><StatValue>24+</StatValue><StatLabel>Anos de Insper Jr.</StatLabel></Stat>
          </StatsBar>
        </Intro>
      </HeroIntroWrap>

      {/* Red animated bar */}
      <RedBarWrap><RedBar /></RedBarWrap>

      {/* Section: Nossos Escopos */}
      <SectionHeader>
        <Line $hidden />
        <SectionTitle>Nossos Escopos</SectionTitle>
        <Line $hidden />
      </SectionHeader>
      <SectionSubtitle>
        Três frentes que operam de forma integrada — e podem ser combinadas para entregar soluções tecnológicas completas dentro de um mesmo ecossistema.
      </SectionSubtitle>

      {SCOPES.map((s, i) => (
        <React.Fragment key={s.num}>
          <ScopeSection>
            <ScopesWrap>
              <ScopePanel role="tabpanel">
                <ScopeCounter>
                  <CounterNum>ESCOPO {s.num}</CounterNum>
                  <ScopeName>{s.tab}</ScopeName>
                </ScopeCounter>

                <PanelTop>
                  <PanelLeft>
                    <ScopeTitleH3>{s.title}</ScopeTitleH3>
                    <Accent />
                    <ScopeLede>{s.lede}</ScopeLede>
                  </PanelLeft>
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
                </PanelTop>

                <PanelBody>
                  <PanelCol>
                    <ColLabel>Como atuamos</ColLabel>
                    <ScopeDetail>{s.detail}</ScopeDetail>
                  </PanelCol>
                  <PanelCol>
                    <ColLabel>Principais aplicações</ColLabel>
                    <Bullets>
                      {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </Bullets>
                  </PanelCol>
                </PanelBody>

                <PanelTags>
                  <TagsLabel>Tecnologias</TagsLabel>
                  {s.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </PanelTags>
              </ScopePanel>
            </ScopesWrap>
          </ScopeSection>

          {/* Case Gamificação after Escopo 02 (Desenvolvimento Web) */}
          {i === 1 && <GamifCase />}
        </React.Fragment>
      ))}

      {/* Case Wall-E (after Escopo 03 — Automação) */}
      <WalleCase />

      {/* Integration band */}
      <Integration ref={integrationRef}>
        <SynergyCanvas ref={synergyCanvasRef} />
        <CursorGlow ref={integrationGlowRef} />
        <IntegrationInner>
          <Kicker>Sinergia entre Escopos</Kicker>
          <IntegrationTitle>
            Soluções que <span>conversam entre si</span> em um mesmo ecossistema
          </IntegrationTitle>
          <IntegrationLede>
            A divisão dos escopos é apenas organizacional. Em um único projeto é possível combinar dashboards analíticos, bancos de dados, automações e agentes inteligentes — entregando uma solução completa, adaptada ao contexto e às necessidades do cliente.
          </IntegrationLede>
          <IntegrationGrid>
            <IntCard>
              <IntCardTitle>Dados + Web</IntCardTitle>
              <IntCardText>Dashboards interativos embarcados diretamente em plataformas, conectados ao banco em tempo real.</IntCardText>
            </IntCard>
            <IntCard>
              <IntCardTitle>Web + Automação</IntCardTitle>
              <IntCardText>Fluxos automatizados disparados a partir de eventos da plataforma, conectando sistemas internos e externos.</IntCardText>
            </IntCard>
            <IntCard>
              <IntCardTitle>Automação + IA</IntCardTitle>
              <IntCardText>Agentes inteligentes operando em WhatsApp, plataformas próprias e sistemas internos com base em fluxos estruturados.</IntCardText>
            </IntCard>
          </IntegrationGrid>
        </IntegrationInner>
      </Integration>

      {/* Diferenciais */}
      <Diferenciais>
        <SectionHeader>
          <Line $hidden />
          <SectionTitle>Diferenciais</SectionTitle>
          <Line $hidden />
        </SectionHeader>
        <SectionSubtitle>
          O que faz a frente de Tecnologia da Insper Jr. se destacar no mercado.
        </SectionSubtitle>
        <DifGrid ref={difCardsRef}>
          <DifCard data-dif-card>
            <DifAccent />
            <DifNum>01</DifNum>
            <DifTitle>Multidisciplinaridade</DifTitle>
            <DifText>Reunimos alunos de cinco cursos de Engenharia e Ciência da Computação, garantindo visão multidisciplinar e acesso a diferentes áreas do universo tech.</DifText>
          </DifCard>
          <DifCard data-dif-card>
            <DifAccent />
            <DifNum>02</DifNum>
            <DifTitle>Adaptação tecnológica</DifTitle>
            <DifText>Não nos limitamos a uma única stack ou metodologia. Cada solução é desenvolvida considerando o contexto, objetivo e necessidade do cliente — com flexibilidade e assertividade técnica.</DifText>
          </DifCard>
          <DifCard data-dif-card>
            <DifAccent />
            <DifNum>03</DifNum>
            <DifTitle>Integração entre escopos</DifTitle>
            <DifText>Dados, Desenvolvimento Web e Automação atuam em conjunto, possibilitando entregas completas em que diferentes soluções conversam dentro de um mesmo ecossistema.</DifText>
          </DifCard>
        </DifGrid>
      </Diferenciais>

      {/* Closing CTA */}
      <Closing>
        <ClosingTitle>Vamos transformar seu desafio em solução?</ClosingTitle>
        <ClosingText>
          Mais de duas décadas de Insper Jr. e centenas de projetos: conhecimento técnico, visão estratégica e inovação aplicada.
        </ClosingText>
        <ClosingLink to="/contact">Solicite um diagnóstico gratuito</ClosingLink>
      </Closing>

      <Footer />
    </PageWrap>
  );
}

export default Tech;

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

// ── Hero ──
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
  font-size: 56px;
  font-weight: 700;
  color: ${COLORS.cream};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 1300px) { font-size: 44px; }
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

// ── Intro / Sobre a frente ──
const Intro = styled.section`
  padding: 5rem 2rem 2rem;
  width: 80%;
  max-width: 1240px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    padding: 3.5rem 1rem 1rem;
  }
`;

// ── Section header ──
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 5rem auto 1rem;
  max-width: 1100px;
  padding: 0 2rem;
`;

const Line = styled.div<{ $hidden?: boolean }>`
  height: 2px;
  background: #000;
  width: 100%;
  ${p => p.$hidden && css`opacity: 0;`}
`;

const SectionTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 36px;
  color: ${COLORS.redTitle};
  white-space: nowrap;
  margin: 0;
  font-weight: 700;

  @media (max-width: 600px) { font-size: 26px; }
`;

const SectionSubtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  color: #333;
  padding: 0 1rem;

  @media (max-width: 600px) { font-size: 15px; }
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
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid rgba(26,26,24,0.06);

  &:nth-of-type(even) { background: ${COLORS.lightCream}; }
`;

const ScopesWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
`;

const ScopePanel = styled.div`
  display: block;
`;

const ScopeCounter = styled.p`
  font-family: ${FONT_TITLE};
  margin: 0 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  line-height: 1;
`;

const CounterNum = styled.span`
  font-family: ${FONT_MONO};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: ${COLORS.redTitle};
  opacity: 1;
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(161,15,35,0.4);
  border-radius: 2px;
`;

const ScopeName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 88px;
  font-weight: 800;
  letter-spacing: -0.035em;
  text-transform: none;
  color: ${COLORS.ink};
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
    background: ${COLORS.redTitle};
  }

  @media (max-width: 1100px) { font-size: 64px; }
  @media (max-width: 700px) { font-size: 48px; }
`;

const PanelTop = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 4rem;
  align-items: stretch;
  margin-bottom: 3rem;

  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const PanelLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ScopeTitleH3 = styled.h3`
  color: ${COLORS.ink};
  font-family: ${FONT_TITLE};
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;

  i {
    font-style: italic;
    font-weight: 400;
    color: ${COLORS.redTitle};
  }

  @media (max-width: 900px) { font-size: 36px; }
`;

const Accent = styled.div`
  width: 56px;
  height: 3px;
  background: ${COLORS.redTitle};
  margin: 1.25rem 0 1.5rem;
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${accentGrow} 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
`;

const ScopeLede = styled.p`
  font-family: ${FONT_BODY};
  font-size: 17px;
  line-height: 1.65;
  color: #5a5550;
  margin: 0;
  max-width: 520px;
  strong { color: ${COLORS.ink}; font-weight: 600; }

  @media (max-width: 600px) { font-size: 16px; }
`;

const PanelSide = styled.aside`
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: ${COLORS.lightCream};
  border: 1px solid rgba(26,26,24,0.08);
  border-left: 3px solid ${COLORS.redTitle};
  padding: 1.75rem 1.75rem 1.5rem;
  position: relative;
`;

const SideCorner = styled.div`
  content: "";
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  width: 28px;
  height: 28px;
  border-top: 2px solid rgba(161,15,35,0.25);
  border-right: 2px solid rgba(161,15,35,0.25);
`;

const SideEyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${COLORS.redTitle};
  margin: 0 0 1.25rem;
`;

const SideRows = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(26,26,24,0.08);
  &:first-of-type { padding-top: 0; }
  &:last-of-type { border-bottom: none; }
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
  line-height: 1.4;
  font-weight: 500;
  strong { color: ${COLORS.redTitle}; font-weight: 700; }
`;

const SideQuote = styled.p`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(26,26,24,0.08);
  font-family: ${FONT_BODY};
  font-size: 13px;
  line-height: 1.55;
  color: #5a5550;
  font-style: italic;
  &::before {
    content: "\\201C";
    font-family: ${FONT_TITLE};
    font-size: 28px;
    color: ${COLORS.redTitle};
    line-height: 0;
    position: relative;
    top: 6px;
    margin-right: 4px;
  }
`;

const PanelBody = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  border-top: 1px solid rgba(26,26,24,0.12);
  border-bottom: 1px solid rgba(26,26,24,0.12);

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const PanelCol = styled.div`
  padding: 2rem 2rem 2rem 0;
  & + & {
    padding: 2rem 0 2rem 2.5rem;
    border-left: 1px solid rgba(26,26,24,0.12);
  }

  @media (max-width: 900px) {
    padding: 2rem 0;
    & + & {
      padding: 2rem 0;
      border-left: none;
      border-top: 1px solid rgba(26,26,24,0.12);
    }
  }
`;

const ColLabel = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${COLORS.redTitle};
  margin: 0 0 1.25rem;
`;

const ScopeDetail = styled.p`
  font-family: ${FONT_BODY};
  font-size: 15px;
  line-height: 1.7;
  color: #3a3530;
  margin: 0;
  strong { color: ${COLORS.ink}; font-weight: 600; }
`;

const Bullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  counter-reset: entrega;

  li {
    font-family: ${FONT_BODY};
    font-size: 14.5px;
    line-height: 1.45;
    padding: 0.85rem 0 0.85rem 2.1rem;
    position: relative;
    color: ${COLORS.ink};
    border-bottom: 1px solid rgba(26,26,24,0.07);
    counter-increment: entrega;
    &:last-child { border-bottom: none; }
    &::before {
      content: counter(entrega, decimal-leading-zero);
      position: absolute;
      left: 0;
      top: 0.95em;
      font-family: ${FONT_TITLE};
      font-size: 11px;
      font-weight: 700;
      color: ${COLORS.redTitle};
      letter-spacing: 0.05em;
    }
  }
`;

const PanelTags = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
`;

const TagsLabel = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7a746e;
  margin-right: 0.5rem;
`;

const Tag = styled.span`
  font-family: ${FONT_MONO};
  font-size: 12px;
  font-weight: 500;
  color: ${COLORS.ink};
  background: transparent;
  border: 1px solid rgba(26,26,24,0.18);
  padding: 0.45rem 0.85rem;
  border-radius: 2px;
  transition: border-color 0.2s ease, color 0.2s ease;
  &:hover { border-color: ${COLORS.redTitle}; color: ${COLORS.redTitle}; }
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
  font-size: 38px;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: #fff;
  font-weight: 700;
  span { color: ${COLORS.redCTA}; }

  @media (max-width: 800px) { font-size: 28px; }
`;

const IntegrationLede = styled.p`
  font-family: ${FONT_BODY};
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255,255,255,0.78);
  max-width: 820px;
  margin: 0 auto 2.5rem;
`;

const IntegrationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 980px;
  margin: 0 auto;

  @media (max-width: 800px) { grid-template-columns: 1fr; }
`;

const IntCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-top: 2px solid ${COLORS.redCTA};
  padding: 1.75rem 1.5rem;
  text-align: left;
  border-radius: 4px;
  transition: background 0.25s ease, border-color 0.25s ease;
  &:hover {
    background: rgba(192,33,33,0.05);
    border-color: rgba(192,33,33,0.45);
    border-top-color: ${COLORS.redCTA};
  }
`;

const IntCardTitle = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #fff;
`;

const IntCardText = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  margin: 0;
  text-align: left;
  line-height: 1.55;
  font-family: ${FONT_BODY};
`;

// ── Diferenciais ──
const Diferenciais = styled.section`
  padding: 5rem 2rem;
  max-width: 1240px;
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

// ── Closing ──
const Closing = styled.section`
  background: linear-gradient(135deg, ${COLORS.redTitle} 0%, ${COLORS.redDark} 100%);
  color: #fff;
  padding: 4rem 2rem;
  text-align: center;
`;

const ClosingTitle = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 0.75rem;
`;

const ClosingText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 17px;
  margin: 0 0 1.75rem;
  opacity: 0.92;
`;

const ClosingLink = styled(Link)`
  display: inline-block;
  background: #fff;
  color: ${COLORS.redTitle};
  font-family: ${FONT_TITLE};
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.95rem 1.75rem;
  border-radius: 4px;
  text-decoration: none;
  transition: transform 0.2s ease;
  &:hover { transform: translateY(-2px); }
`;
