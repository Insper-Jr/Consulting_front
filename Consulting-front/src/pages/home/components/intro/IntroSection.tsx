import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BrasilJunior from "../../../../assets/awards/brasil_junior.png";
import Falconi      from "../../../../assets/awards/falconi.png";
import Fejesp       from "../../../../assets/awards/fejesp.png";
import Enej       from "../../../../assets/awards/enej.png";
import { useTranslation } from "react-i18next";

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2400) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.6 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return { count, ref };
}



// ─── Stat card ────────────────────────────────────────────────────────────────
const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <StatCard ref={ref}>
      <StatValue>{count}{suffix}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
};

// ─── Brazil map (vanilla JS animation inside useEffect) ───────────────────────
const BrazilMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    const container = containerRef.current;
    if (!container || container.querySelector("svg")) return;

    // ── Palette (Insper Jr brand on off-white bg) ──
    const P = {
      mapDot:     "rgba(140, 30, 30, 0.80)",
      sparkCore:  "#C02121",
      sparkTrail: "rgba(192, 33, 33, 0.92)",
      sparkDrop:  "rgba(150, 20, 20, 0.8)",
      hubFill:    "#C02121",
      hubGlow:    "rgba(192, 33, 33, 0.7)",
      cityFill:   "#8b1c1c",
      cityGlow:   "rgba(150, 30, 30, 0.7)",
      label:      "#691212",
    };

    // ── Brazil polygon (Natural Earth, 0-1000 space) ──
    const POLY: [number, number][] = [[522.3,960],[537.1,946.8],[547.2,924.8],[562.5,913.9],[582.3,895.3],[607.3,854.6],[623,841.8],[628.2,830.7],[632.3,807.3],[628.7,794.3],[631.8,777.2],[650.9,754],[677.5,735.7],[702.7,729],[718.4,718.5],[753.7,709.7],[778.2,709.7],[783.6,695.8],[801.9,685.9],[805.7,661.8],[828.4,631.6],[832.5,600.6],[839.4,591.5],[841.9,576.2],[848.2,540.6],[846.6,497],[852.9,480.1],[858.5,479.6],[875.2,459.4],[889.4,433.3],[921.1,401],[932.5,386],[941.5,347.5],[940,325.7],[930.1,304.2],[922,296.8],[902.9,295.8],[885.5,289.1],[856.7,263.2],[823.5,243.9],[789.9,244.9],[746.1,232.6],[720,239.8],[723.6,227],[712.6,213.3],[675.2,199.2],[646.9,190.9],[630,206.2],[629.1,183],[589.3,179.3],[582.3,172.3],[599.2,153.1],[598.7,137.1],[586.6,133.4],[574,92.8],[568.4,80.1],[560.7,81],[547.5,102.3],[540.5,119.3],[531.9,128.1],[518.2,123.4],[506.1,128.5],[496.4,123.9],[483.4,119],[473,121.3],[451,130.6],[437.2,88.9],[423.3,64.1],[406,42.1],[378.3,40],[370.7,48.6],[368.4,72.7],[359.6,63.4],[351.3,72.2],[326.4,81],[309.9,84.5],[285.6,84.3],[269,81.2],[264.7,83.3],[274.8,89.4],[273.9,104.9],[277.1,119.5],[281.4,132.9],[248.3,159.1],[230.8,160.7],[213.9,151.2],[204,130.1],[189.1,137.6],[176.1,137.8],[165.8,154.5],[157.7,190.2],[161.3,203.4],[150.7,277.1],[130.4,275.9],[127.3,279.4],[108.8,283.8],[83.2,299.8],[75.8,318.5],[78,331.1],[64.5,347.5],[58.5,351.7],[67.9,372.5],[80.5,386.7],[90.6,398],[98.9,410.3],[119,411],[137.4,397.3],[135.8,432.6],[158.8,431.2],[175.4,433.3],[192.1,425.6],[211.9,416.3],[223.6,407.5],[253,403.6],[250.5,421],[253.5,430],[251.7,445.5],[276,466.2],[301.2,470.1],[310.2,478.7],[325.2,483.3],[334.7,490],[348.8,489.8],[361.9,496.8],[367.3,516.9],[361,527.1],[369.5,554.2],[412.7,555.2],[409.4,568.6],[411.8,577.6],[424.2,584.1],[429.4,598.5],[419.2,627],[421.5,640.2],[414.3,645.1],[421,657.8],[419.5,689.3],[443.3,693.7],[452.5,689.3],[467.6,695.6],[471.9,702.5],[473.9,723.6],[476.6,732.7],[484.9,733.6],[493.5,729.9],[501.6,734.1],[498.4,760.5],[493.9,773.9],[497.1,814],[482,823.5],[456.6,846],[426.4,877.7],[441.1,875.2],[472.1,892.3],[495.3,907.4],[516,946.8],[522.3,960]];

    // ── Cities ──
    const SP = { name: "São Paulo", x: 673.8, y: 723.2, hub: true };
    const CITIES: Record<string, { name: string; x: number; y: number; hub?: boolean }> = {
      rio:         { name: "Rio de Janeiro", x: 751.6, y: 708.3 },
      brasilia:    { name: "Brasília",       x: 645.7, y: 543.4 },
      salvador:    { name: "Salvador",       x: 856.5, y: 478.0 },
      fortaleza:   { name: "Fortaleza",      x: 856.1, y: 263.6 },
      recife:      { name: "Recife",         x: 938.1, y: 363.9 },
      manaus:      { name: "Manaus",         x: 372.5, y: 249.6 },
      belem:       { name: "Belém",          x: 632.0, y: 211.1 },
      portoAlegre: { name: "Porto Alegre",   x: 570.4, y: 873.4 },
      curitiba:    { name: "Curitiba",       x: 614.4, y: 766.7 },
      belo:        { name: "Belo Horizonte", x: 734.4, y: 639.0 },
    };

    const LOOP = 10;
    const SCHEDULE = [
      { key: "rio",         start: 0.6,  travel: 0.9 },
      { key: "belo",        start: 1.1,  travel: 1.0 },
      { key: "brasilia",    start: 1.7,  travel: 1.2 },
      { key: "curitiba",    start: 2.3,  travel: 0.9 },
      { key: "salvador",    start: 3.0,  travel: 1.4 },
      { key: "portoAlegre", start: 3.6,  travel: 1.1 },
      { key: "recife",      start: 4.4,  travel: 1.6 },
      { key: "fortaleza",   start: 5.2,  travel: 1.7 },
      { key: "belem",       start: 6.0,  travel: 1.6 },
      { key: "manaus",      start: 6.8,  travel: 2.0 },
    ];

    // ── SVG helpers ──
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag: string, attrs: Record<string, string | number> = {}) => {
      const n = document.createElementNS(NS, tag);
      for (const k in attrs) n.setAttribute(k, String(attrs[k]));
      return n;
    };
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeOutCubic = (t: number) => { const u = t - 1; return u*u*u + 1; };
    const easeOutBack  = (t: number) => { const c = 1.70158, c3 = c+1, u = t-1; return 1 + c3*u*u*u + c*u*u; };

    // Point-in-polygon
    const pip = (x: number, y: number) => {
      let inside = false;
      for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) {
        const [xi, yi] = POLY[i], [xj, yj] = POLY[j];
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi))
          inside = !inside;
      }
      return inside;
    };

    // Dots
    const buildDots = (sp: number) => {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const [x, y] of POLY) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      const out: [number, number][] = [];
      for (let yy = minY; yy <= maxY; yy += sp) {
        const off = ((yy / sp) | 0) % 2 === 0 ? 0 : sp / 2;
        for (let xx = minX; xx <= maxX; xx += sp) {
          const cx = xx + off;
          if (pip(cx, yy)) out.push([cx, yy]);
        }
      }
      return out;
    };

    // Bezier helpers
    type Pt = { x: number; y: number };
    const ctrlPt = (a: Pt, b: Pt): Pt => {
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;
      const nx = -dy / dist, ny = dx / dist;
      const lift = dist * 0.28;
      const sign = ny < 0 ? 1 : -1;
      return { x: mx + nx * lift * sign, y: my + ny * lift * sign };
    };
    const bezier = (a: Pt, c: Pt, b: Pt, t: number): Pt => {
      const u = 1 - t;
      return { x: u*u*a.x + 2*u*t*c.x + t*t*b.x, y: u*u*a.y + 2*u*t*c.y + t*t*b.y };
    };
    const bezierLen = (a: Pt, c: Pt, b: Pt) => {
      let len = 0, prev = a;
      for (let i = 1; i <= 40; i++) {
        const p = bezier(a, c, b, i / 40);
        len += Math.hypot(p.x - prev.x, p.y - prev.y);
        prev = p;
      }
      return len;
    };

    // ── Build SVG ──
    const svg = mk("svg", { viewBox: "0 0 1000 1000" });
    (svg as SVGElement).style.width = "100%";
    (svg as SVGElement).style.height = "100%";
    (svg as SVGElement).style.display = "block";
    (svg as SVGElement).style.overflow = "visible";
    container.appendChild(svg);

    // Defs
    const defs = mk("defs");
    defs.innerHTML = `
      <radialGradient id="spGlow" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="rgba(192,33,33,0.05)"/>
        <stop offset="100%" stop-color="rgba(192,33,33,0)"/>
      </radialGradient>`;
    svg.appendChild(defs);

    // Glow behind SP
    svg.appendChild(mk("circle", { cx: SP.x, cy: SP.y, r: 380, fill: "url(#spGlow)" }));

    // Dots
    const dotsLayer = mk("g");
    svg.appendChild(dotsLayer);
    const dots = buildDots(13);
    const dotNodes: { el: SVGElement; phase: number }[] = [];
    for (const [dx, dy] of dots) {
      const c = mk("circle", { cx: dx, cy: dy, r: 3.2, fill: P.mapDot });
      dotsLayer.appendChild(c);
      dotNodes.push({ el: c as SVGElement, phase: (dx + dy) * 0.01 });
    }

    // Layers
    const connLayer  = mk("g"); svg.appendChild(connLayer);
    const pulseLayer = mk("g"); svg.appendChild(pulseLayer);
    const cityLayer  = mk("g"); svg.appendChild(cityLayer);

    // Pre-compute connections
    const spPt: Pt = { x: SP.x, y: SP.y };
    const connections = SCHEDULE.map(s => {
      const to: Pt = CITIES[s.key];
      const ctrl = ctrlPt(spPt, to);
      const len  = bezierLen(spPt, ctrl, to);
      const d    = `M ${spPt.x} ${spPt.y} Q ${ctrl.x} ${ctrl.y} ${to.x} ${to.y}`;

      const basePath = mk("path", { d, fill: "none", stroke: P.sparkTrail, "stroke-opacity": 0.14, "stroke-width": 1.2, "stroke-linecap": "round" });
      connLayer.appendChild(basePath);

      const trail = mk("path", { d, fill: "none", stroke: P.sparkTrail, "stroke-width": 2.4, "stroke-linecap": "round" });
      (trail as SVGElement).style.filter = `drop-shadow(0 0 5px ${P.sparkDrop})`;
      connLayer.appendChild(trail);

      const headGroup = mk("g");
      const headBlur  = mk("circle", { r: 9, fill: P.sparkTrail, opacity: 0.22 });
      (headBlur as SVGElement).style.filter = "blur(4px)";
      const headCore  = mk("circle", { r: 4.5, fill: P.sparkCore, opacity: 0.95 });
      (headCore as SVGElement).style.filter = `drop-shadow(0 0 8px ${P.sparkDrop})`;
      const headDot   = mk("circle", { r: 1.8, fill: "#ffffff" });
      headGroup.appendChild(headBlur);
      headGroup.appendChild(headCore);
      headGroup.appendChild(headDot);
      connLayer.appendChild(headGroup);

      const pulseOuter = mk("circle", { cx: to.x, cy: to.y, r: 4, fill: "none", stroke: P.sparkTrail, "stroke-width": 1.6, opacity: 0 });
      const pulseInner = mk("circle", { cx: to.x, cy: to.y, r: 4, fill: "none", stroke: P.sparkTrail, "stroke-width": 1.0, opacity: 0 });
      pulseLayer.appendChild(pulseOuter);
      pulseLayer.appendChild(pulseInner);

      return { s, to, ctrl, len, basePath, trail, headGroup, headBlur, headCore, headDot, pulseOuter, pulseInner };
    });

    // City nodes
    const buildCity = (pos: Pt & { name: string }, isHub: boolean) => {
      const g = mk("g");
      const r = isHub ? 7 : 5;
      const halo = mk("circle", { cx: pos.x, cy: pos.y, r: r * 2.2, fill: isHub ? "rgba(192,33,33,0.15)" : "rgba(192,33,33,0.10)", opacity: isHub ? 1 : 0.35 });
      (halo as SVGElement).style.filter = "blur(3px)";
      const ring = mk("circle", { cx: pos.x, cy: pos.y, r, fill: "none", stroke: P.cityGlow, "stroke-width": 1.2, opacity: 0 });
      const core = mk("circle", { cx: pos.x, cy: pos.y, r, fill: isHub ? P.hubFill : P.cityFill, opacity: isHub ? 1 : 0.35 });
      (core as SVGElement).style.filter = `drop-shadow(0 0 6px ${P.hubGlow})`;
      const inner = mk("circle", { cx: pos.x, cy: pos.y, r: r * 0.45, fill: "#ffffff", opacity: isHub ? 1 : 0.35 });
      const label = mk("text", { x: pos.x + r + 8, y: pos.y + 4, fill: P.label, "fill-opacity": isHub ? 0.9 : 0, "font-family": "Montserrat, sans-serif", "font-size": isHub ? 16 : 12, "font-weight": isHub ? 700 : 500 });
      label.textContent = pos.name;
      g.appendChild(halo); g.appendChild(ring); g.appendChild(core); g.appendChild(inner); g.appendChild(label);
      return { g, halo, ring, core, inner, label };
    };

    const cityNodes: Record<string, ReturnType<typeof buildCity>> = {};
    for (const key in CITIES) {
      const n = buildCity(CITIES[key] as Pt & { name: string }, false);
      cityLayer.appendChild(n.g);
      cityNodes[key] = n;
    }
    const hubNode = buildCity({ ...spPt, name: SP.name }, true);
    cityLayer.appendChild(hubNode.g);

    // ── Animation loop ──
    let startTs: number | null = null;
    let running = true;
    let rafId = 0;

    const paint = (time: number) => {
      // Dot shimmer
      for (const d of dotNodes) {
        const shimmer = 0.75 + 0.25 * Math.sin(time * 1.2 + d.phase);
        d.el.setAttribute("opacity", shimmer.toFixed(3));
      }

      // Connections
      for (const conn of connections) {
        const localT = (time - conn.s.start) / conn.s.travel;
        const active = localT >= 0 && localT <= 1.6;
        if (!active) {
          conn.basePath.setAttribute("stroke-dasharray", `0 ${conn.len}`);
          conn.trail.setAttribute("stroke-dasharray",    `0 ${conn.len}`);
          (conn.headGroup as SVGElement).style.opacity = "0";
          (conn.basePath as SVGElement).style.opacity  = "0";
          (conn.trail as SVGElement).style.opacity     = "0";
          conn.pulseOuter.setAttribute("opacity", "0");
          conn.pulseInner.setAttribute("opacity", "0");
          continue;
        }
        const pC = clamp(localT, 0, 1);
        const drawn = pC * conn.len;
        const visLen = 120;
        const afterglow = localT > 1 ? clamp(1 - (localT - 1) / 0.6, 0, 1) : 1;

        (conn.basePath as SVGElement).style.opacity = String(afterglow);
        (conn.trail as SVGElement).style.opacity    = String(afterglow);
        conn.basePath.setAttribute("stroke-dasharray", `${drawn} ${conn.len}`);
        conn.trail.setAttribute("stroke-dasharray",   `${visLen} ${conn.len * 2}`);
        conn.trail.setAttribute("stroke-dashoffset",  String((conn.len - drawn) - (conn.len - visLen)));

        if (localT <= 1) {
          (conn.headGroup as SVGElement).style.opacity = String(afterglow);
          const h = bezier(spPt, conn.ctrl, conn.to, pC);
          conn.headBlur.setAttribute("cx", String(h.x)); conn.headBlur.setAttribute("cy", String(h.y));
          conn.headCore.setAttribute("cx", String(h.x)); conn.headCore.setAttribute("cy", String(h.y));
          conn.headDot.setAttribute( "cx", String(h.x)); conn.headDot.setAttribute( "cy", String(h.y));
        } else {
          (conn.headGroup as SVGElement).style.opacity = "0";
        }

        // Arrival pulse
        const pulseT = (time - (conn.s.start + conn.s.travel)) / 1.2;
        if (pulseT >= 0 && pulseT <= 1) {
          const pe = easeOutCubic(pulseT);
          const pr = 4 + pe * 34, po = (1 - pe) * 0.9;
          conn.pulseOuter.setAttribute("r", String(pr)); conn.pulseOuter.setAttribute("opacity", String(po));
          conn.pulseInner.setAttribute("r", String(pr * 0.55)); conn.pulseInner.setAttribute("opacity", String(po * 0.7));
        } else {
          conn.pulseOuter.setAttribute("opacity", "0");
          conn.pulseInner.setAttribute("opacity", "0");
        }
      }

      // City nodes
      for (const ck in cityNodes) {
        const node = cityNodes[ck];
        const sch  = SCHEDULE.find(s => s.key === ck);
        const litAt = sch ? sch.start + sch.travel : null;
        let brightness = 0.3, ringOp = 0, ringScale = 0;
        if (litAt !== null && time >= litAt) {
          const since = time - litAt;
          brightness  = 0.3 + 0.7 * easeOutBack(clamp(since / 0.5, 0, 1));
          const settle = clamp(since / 0.4, 0, 1);
          ringOp    = (1 - settle) * 0.6;
          ringScale = 1 + settle * 2;
        }
        node.halo.setAttribute("opacity", String(brightness));
        node.core.setAttribute("opacity", String(brightness));
        node.inner.setAttribute("opacity", String(brightness));
        node.label.setAttribute("fill-opacity", String(brightness));
        if (ringOp > 0) { node.ring.setAttribute("r", String(5 * (1 + ringScale))); node.ring.setAttribute("opacity", String(ringOp)); }
        else node.ring.setAttribute("opacity", "0");
      }

      // Hub pulse
      const hp = 0.5 + 0.5 * Math.sin(time * 2.6);
      const hb = 0.85 + 0.15 * hp;
      hubNode.halo.setAttribute("opacity", String(hb));
      hubNode.core.setAttribute("opacity", String(hb));
      hubNode.inner.setAttribute("opacity", String(hb));
      hubNode.ring.setAttribute("r", String(7 * (1 + 0.35 * hp)));
      hubNode.ring.setAttribute("opacity", String(0.35 + 0.25 * hp));
    };

    const frame = (ts: number) => {
      if (!running) return;
      if (startTs == null) startTs = ts;
      const t = ((ts - startTs) / 1000) % LOOP;
      paint(t);
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    // Pause when offscreen
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { if (!running) { running = true; startTs = null; rafId = requestAnimationFrame(frame); } }
        else { running = false; cancelAnimationFrame(rafId); }
      });
    }, { threshold: 0.01 });
    io.observe(container);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(rafId); }
      else { if (!running) { running = true; startTs = null; rafId = requestAnimationFrame(frame); } }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      container.innerHTML = "";
    };
  }, []);

  return <MapContainer ref={containerRef} />;
};

// ─── Componente principal ─────────────────────────────────────────────────────
const IntroSection = () => {
  const { t } = useTranslation();
  const STATS = [
    { value: 550, suffix: "+", label: t("intro.stats.projects") },
    { value: 25,  suffix: "+", label: t("intro.stats.years")    },
    { value: 60,  suffix: "+", label: t("intro.stats.members")  },
    { value: 90,  suffix: "+", label: t("intro.stats.nps")      },
  ];
    return(
  <Section>
    <TextBlock>
      <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
      <SectionTitle>{t("intro.title")}</SectionTitle>
      <Divider />
      <Body>{t("intro.body")}</Body>
      <SubNote>{t("intro.mapLabel")}</SubNote>
      <SaibaMaisLink to="/about">{t("intro.cta")} <Arrow>→</Arrow></SaibaMaisLink>
    </TextBlock>

    <BottomRow>
      <MapCol>
        <BrazilMap />
      </MapCol>
      <RightCol>
        <StatsGrid>
          {STATS.map(s => <StatItem key={s.label} {...s} />)}
        </StatsGrid>
      

        <AwardsRow>
           <AwardsLabel>{t("intro.awards")}</AwardsLabel>
          <AwardsList>
            <AwardImg src={BrasilJunior} alt="Brasil Júnior" />
            <AwardImg src={Falconi} alt="Falconi" />
            <AwardImg src={Fejesp} alt="FEJESP" />
            <AwardImg src={Enej} alt='Encontro Nacional de Empresas Juniores' size="5.5rem" />
          </AwardsList>
        </AwardsRow>
      </RightCol>
    </BottomRow>
  </Section>
  );
}

export default IntroSection;

// ── Styled Components ─────────────────────────────────────────────────────────
const Section = styled.section`
  background: #FAF4F0;
  padding: 6rem 0 6rem 0;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  overflow: hidden;
`;
const TextBlock = styled.div`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  align-items: center;
  text-align: center;
  padding: 0 4rem;  /* padding só no texto */
`;
const Eyebrow = styled.span`
  color: #C02121; font-family: "Montserrat", sans-serif;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
`;
const SectionTitle = styled.h2`
  color: #080F0F; font-family: "Montserrat", sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 800;
  letter-spacing: -0.02em; line-height: 1.1; margin: 0;
`;
const Divider = styled.div`width: 3rem; height: 3px; background: #C02121; border-radius: 2px;`;
const Body = styled.p`
  color: #444; font-family: "Montserrat", sans-serif;
  font-size: 1rem; font-weight: 400; line-height: 1.75; margin: 0; max-width: 700px;
`;
const Arrow = styled.span`display: inline-block; transition: transform 0.2s;`;
const SaibaMaisLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 0.4rem;
  color: #C02121; font-family: "Montserrat", sans-serif;
  font-size: 0.9rem; font-weight: 700; text-decoration: none;
  transition: gap 0.2s; width: fit-content;
  &:hover { gap: 0.75rem; ${Arrow} { transform: translateX(3px); } }
`;
const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
  width: 100%;
`;
const MapCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-left: -250px;  /* vaza para a esquerda */
  margin-top: -8rem;
`;
const MapContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 850px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #230606 0%, #691212 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.5rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  align-items: flex-start;  /* troca por: */
  align-items: center;
  text-align: center;
  transition: box-shadow 0.25s, transform 0.25s;
  &:hover {
    box-shadow: 0 8px 36px rgba(192,33,33,0.3);
    transform: translateY(-3px);
  }
`;

const StatValue = styled.span`
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
`;

const StatLabel = styled.span`
  color: rgba(255,255,255,0.5);
  font-family: "Montserrat", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.4;
`;

const SubNote = styled.span`
  color: #999;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  gap: 3rem;
  letter-spacing: 0.03em;
`;

const AwardsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  border-top: 1px solid rgba(8, 15, 15, 0.08);
  padding-top: 2.5rem;
`;
const AwardsLabel = styled.span`
  color: #999;
  font-family: "Montserrat", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
`;

const AwardsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
`;

const AwardImg = styled.img<{ size?: string }>`
  height: ${({ size }) => size || "3rem"};
  object-fit: contain;
  opacity: 0.65;
  filter: grayscale(100%);
  transition: opacity 0.25s, filter 0.25s;

  &:hover {
    opacity: 1;
    filter: grayscale(0%);
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 3rem 0 0;
  margin-left: -2rem;
`;