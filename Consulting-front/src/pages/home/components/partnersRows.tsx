import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";

import accenture from "../../../assets/partners/accenture.png";
import ambev from "../../../assets/partners/ambev.png";
import bain from "../../../assets/partners/bain.png";
import bcg from "../../../assets/partners/bcg.png";
import bloomberg from "../../../assets/partners/bloomberg.png";
import data from "../../../assets/partners/data.png";
import ey from "../../../assets/partners/ey.png";
import igc from "../../../assets/partners/igc.png";
import integration from "../../../assets/partners/integration.png";
import juliusBaer from "../../../assets/partners/julius-baer.svg";
import kearney from "../../../assets/partners/kearney.png";
import lek from "../../../assets/partners/lek.png";
import mckinsey from "../../../assets/partners/mckinsey.png";
import parthenon from "../../../assets/partners/parthenon.png";
import peers from "../../../assets/partners/peers.png";
import stone from "../../../assets/partners/stone.png";
import trading from "../../../assets/partners/trading-com-dados.png";
import visagio from "../../../assets/partners/visagio.png";
import xp from "../../../assets/partners/xp.png";

type Supporter = { name: string; src: string; boost?: number };

type Testimonial = { name: string; role: string; text: string };

const TESTIMONIAL_DURATION = 8000;

const SUPPORTERS: Supporter[] = [
  { name: "Accenture", src: accenture, boost: 1.0 },
  { name: "Ambev", src: ambev, boost: 0.84 },
  { name: "Bain & Company", src: bain, boost: 1.15 },
  { name: "BCG", src: bcg, boost: 0.96 },
  { name: "Bloomberg", src: bloomberg, boost: 0.95 },
  { name: "Data", src: data, boost: 0.98 },
  { name: "EY", src: ey, boost: 1.4 },
  { name: "IGC", src: igc, boost: 1.2 },
  { name: "Integration", src: integration, boost: 1.0 },
  { name: "Julius Baer", src: juliusBaer, boost: 1.0 },
  { name: "Kearney", src: kearney, boost: 1.0 },
  { name: "L.E.K.", src: lek, boost: 0.98 },
  { name: "McKinsey & Company", src: mckinsey, boost: 1.1 },
  { name: "Parthenon", src: parthenon, boost: 1.61 },
  { name: "Peers", src: peers, boost: 1.0 },
  { name: "Stone", src: stone, boost: 1.3 },
  { name: "Trading com Dados", src: trading, boost: 1.0 },
  { name: "Visagio", src: visagio, boost: 0.84 },
  { name: "XP Investimentos", src: xp, boost: 0.95 },
];

type Point = { x: number; y: number; z: number };

function fibonacciSphere(n: number): Point[] {
  const pts: Point[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    pts.push({ x, y, z });
  }
  return pts;
}

const R_MAX = 229;
const INITIAL_TILT = -18;
const RETURN_DELAY = 10000;
const RETURN_DURATION = 1500;
const AUTO_ROT_SPEED = 12;
const FLING_DECAY_RATE = 1.6;
const FLING_SETTLE_THRESHOLD = 0.4;

/* O raio do globo era fixo em 229px (458px de largura), então em telas estreitas
   ele estourava a viewport e era cortado pelo overflow:hidden da Section.
   Acima de 1100px o layout é de duas colunas e o tamanho original já cabe, então
   só encolhemos abaixo disso. O divisor 2.4, em vez de 2, reserva a folga que os
   logos ocupam ao se projetarem para fora do raio da esfera. */
const useGlobeRadius = () => {
  const compute = () => {
    if (typeof window === "undefined") return R_MAX;
    const vw = window.innerWidth;
    if (vw >= 1100) return R_MAX;
    return Math.max(96, Math.min(R_MAX, (vw - 80) / 2.4));
  };

  const [radius, setRadius] = useState(compute);

  useEffect(() => {
    const onResize = () => setRadius(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return radius;
};

const PartnersRows = () => {
  const { t } = useTranslation();
  const R = useGlobeRadius();
  // Logos acompanham a escala do globo para não ficarem gigantes na esfera menor.
  const logoScale = R / R_MAX;
  const TESTIMONIALS = t("home.partnersRows.testimonials", { returnObjects: true }) as Testimonial[];

  const [angle, setAngle] = useState(0);
  const [tilt, setTilt] = useState(INITIAL_TILT);
  const [isDragging, setIsDragging] = useState(false);
  const PAGES = Math.ceil(TESTIMONIALS.length / 2);
  const [activePage, setActivePage] = useState(0);
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivePage((p) => (p + 1) % PAGES);
      setPageKey((k) => k + 1);
    }, TESTIMONIAL_DURATION);
    return () => clearTimeout(timer);
  }, [activePage, PAGES]);

  const goToPage = (i: number) => {
    setActivePage(i);
    setPageKey((k) => k + 1);
  };

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(performance.now());
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const dragStartTiltRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const angularVelocityRef = useRef(AUTO_ROT_SPEED);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returningRef = useRef(false);
  const returnStartRef = useRef(0);
  const returnFromTiltRef = useRef(0);
  const tiltRef = useRef(tilt);

  useEffect(() => {
    tiltRef.current = tilt;
  }, [tilt]);

  useEffect(() => {
    const tick = (now: number) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      if (!draggingRef.current) {
        const v = angularVelocityRef.current;
        setAngle((a) => {
          let next = (a + v * dt) % 360;
          if (next < 0) next += 360;
          return next;
        });
        const target = AUTO_ROT_SPEED;
        const next =
          target + (v - target) * Math.exp(-dt * FLING_DECAY_RATE);
        angularVelocityRef.current =
          Math.abs(next - target) < FLING_SETTLE_THRESHOLD ? target : next;
      }
      if (returningRef.current) {
        const elapsed = now - returnStartRef.current;
        const t = Math.min(1, elapsed / RETURN_DURATION);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const newTilt =
          returnFromTiltRef.current +
          (INITIAL_TILT - returnFromTiltRef.current) * eased;
        setTilt(newTilt);
        if (t >= 1) returningRef.current = false;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const now = performance.now();
      const dt = (now - lastMoveTimeRef.current) / 1000;
      if (dt > 0 && lastMoveTimeRef.current > 0) {
        const dxStep = e.clientX - lastMoveXRef.current;
        const v = (dxStep * 0.4) / dt;
        dragVelocityRef.current =
          dragVelocityRef.current * 0.6 + v * 0.4;
      }
      lastMoveXRef.current = e.clientX;
      lastMoveTimeRef.current = now;

      const dx = e.clientX - dragStartXRef.current;
      const dy = e.clientY - dragStartYRef.current;
      const nextAngle = (dragStartAngleRef.current + dx * 0.4) % 360;
      setAngle(nextAngle < 0 ? nextAngle + 360 : nextAngle);
      const nextTilt = Math.max(
        -85,
        Math.min(85, dragStartTiltRef.current + dy * 0.4)
      );
      setTilt(nextTilt);
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setIsDragging(false);
      lastRef.current = performance.now();
      angularVelocityRef.current = Math.max(
        -1200,
        Math.min(1200, dragVelocityRef.current)
      );
      if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
      returnTimerRef.current = setTimeout(() => {
        returnFromTiltRef.current = tiltRef.current;
        returnStartRef.current = performance.now();
        returningRef.current = true;
      }, RETURN_DELAY);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (returnTimerRef.current) {
      clearTimeout(returnTimerRef.current);
      returnTimerRef.current = null;
    }
    returningRef.current = false;
    draggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragStartAngleRef.current = angle;
    dragStartTiltRef.current = tilt;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  const { points, pairs } = useMemo(() => {
    const N = SUPPORTERS.length * 2;
    const pts = fibonacciSphere(N);
    const candidates: { i: number; j: number; score: number }[] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dot = -(
          pts[i].x * pts[j].x +
          pts[i].y * pts[j].y +
          pts[i].z * pts[j].z
        );
        candidates.push({ i, j, score: dot });
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    const pairOf = new Array(N).fill(-1);
    for (const c of candidates) {
      if (pairOf[c.i] === -1 && pairOf[c.j] === -1) {
        pairOf[c.i] = c.j;
        pairOf[c.j] = c.i;
      }
    }
    const pp: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      if (pairOf[i] > i) pp.push([i, pairOf[i]]);
    }
    return { points: pts, pairs: pp };
  }, []);

  const buildSupporterAssignment = useCallback(
    (pairs: [number, number][]): Supporter[] => {
      const N = SUPPORTERS.length * 2;
      const shuffle = <T,>(arr: T[]): T[] => {
        for (let k = arr.length - 1; k > 0; k--) {
          const r = Math.floor(Math.random() * (k + 1));
          [arr[k], arr[r]] = [arr[r], arr[k]];
        }
        return arr;
      };
      const shuffledPairs = shuffle([...pairs]);
      const shuffledLogos = shuffle([...SUPPORTERS]);
      const supByIndex: Supporter[] = new Array(N);
      for (let p = 0; p < shuffledPairs.length; p++) {
        const sup = shuffledLogos[p % shuffledLogos.length];
        supByIndex[shuffledPairs[p][0]] = sup;
        supByIndex[shuffledPairs[p][1]] = sup;
      }
      return supByIndex;
    },
    []
  );

  const [pointSupporters, setPointSupporters] = useState<Supporter[]>(() =>
    buildSupporterAssignment(pairs)
  );
  const [nextPointSupporters, setNextPointSupporters] = useState<
    Supporter[] | null
  >(null);
  const [shuffleProgress, setShuffleProgress] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let rafId: number;
    const SHUFFLE_INTERVAL = 60000;
    const FADE_DURATION = 1200;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        const next = buildSupporterAssignment(pairs);
        setNextPointSupporters(next);
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min(1, (now - start) / FADE_DURATION);
          setShuffleProgress(t);
          if (t < 1) {
            rafId = requestAnimationFrame(animate);
          } else {
            setPointSupporters(next);
            setNextPointSupporters(null);
            setShuffleProgress(0);
            scheduleNext();
          }
        };
        rafId = requestAnimationFrame(animate);
      }, SHUFFLE_INTERVAL);
    };
    scheduleNext();
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [pairs, buildSupporterAssignment]);

  const angleRad = (angle * Math.PI) / 180;
  const tiltRad = (tilt * Math.PI) / 180;
  const cosA = Math.cos(angleRad);
  const sinA = Math.sin(angleRad);
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);

  const placed = points.map((p, i) => {
    let x = p.x * cosA + p.z * sinA;
    let z = -p.x * sinA + p.z * cosA;
    let y = p.y;
    const y2 = y * cosT - z * sinT;
    const z2 = y * sinT + z * cosT;
    y = y2;
    z = z2;

    const depth = (z + 1) / 2;
    const eased = Math.pow(depth, 1.6);
    const scale = 0.32 + eased * 1.15;
    const opacity = 0.06 + eased * 0.94;
    const blur = (1 - depth) * 3.0;
    const zIndex = Math.round(z * 1000);

    return {
      idx: i,
      left: x * R,
      top: -y * R,
      scale,
      opacity,
      blur,
      zIndex,
    };
  });

  const project = (px: number, py: number, pz: number) => {
    const x = px * cosA + pz * sinA;
    const z = -px * sinA + pz * cosA;
    const y = py;
    const y2 = y * cosT - z * sinT;
    const z2 = y * sinT + z * cosT;
    return { x: x * R, y: -y2 * R, z: z2 };
  };

  const SEG = 48;
  const meridianLines: { d: string; opacity: number; key: string }[] = [];
  const meridianCount = 12;
  for (let m = 0; m < meridianCount; m++) {
    const phi = (m / meridianCount) * Math.PI * 2;
    const cosP = Math.cos(phi);
    const sinP = Math.sin(phi);
    const pts: string[] = [];
    let zSum = 0;
    for (let s = 0; s <= SEG; s++) {
      const lat = -Math.PI / 2 + (s / SEG) * Math.PI;
      const r = Math.cos(lat);
      const px = r * cosP;
      const py = Math.sin(lat);
      const pz = r * sinP;
      const proj = project(px, py, pz);
      pts.push(`${proj.x.toFixed(2)},${proj.y.toFixed(2)}`);
      zSum += proj.z;
    }
    const avgZ = zSum / (SEG + 1);
    const facing = (avgZ + 1) / 2;
    const opacity = 0.025 + facing * 0.055;
    meridianLines.push({ d: `M ${pts.join(" L ")}`, opacity, key: `mer-${m}` });
  }

  const parallelLines: { d: string; opacity: number; key: string }[] = [];
  const parallelCount = 7;
  for (let p = 1; p < parallelCount; p++) {
    const lat = -Math.PI / 2 + (p / parallelCount) * Math.PI;
    const r = Math.cos(lat);
    const py = Math.sin(lat);
    const pts: string[] = [];
    let zSum = 0;
    for (let s = 0; s <= SEG; s++) {
      const lon = (s / SEG) * Math.PI * 2;
      const px = r * Math.cos(lon);
      const pz = r * Math.sin(lon);
      const proj = project(px, py, pz);
      pts.push(`${proj.x.toFixed(2)},${proj.y.toFixed(2)}`);
      zSum += proj.z;
    }
    const avgZ = zSum / (SEG + 1);
    const facing = (avgZ + 1) / 2;
    const opacity = 0.02 + facing * 0.045;
    parallelLines.push({
      d: `M ${pts.join(" L ")} Z`,
      opacity,
      key: `par-${p}`,
    });
  }

  const pairStart = activePage * 2;
  const currentPair = [
    TESTIMONIALS[pairStart],
    TESTIMONIALS[pairStart + 1],
  ].filter(Boolean);

  return (
    <Section>
      <Layout>
      <LeftCol>
        <TitleBlock>
          <Label>{t("home.partnersRows.label")}</Label>
          <Title>{t("home.partnersRows.title")}</Title>
          <RedLine />
        </TitleBlock>
        <Stage>
        <Globe
          $dragging={isDragging}
          onMouseDown={onMouseDown}
          style={{ width: R * 2, height: R * 2 }}
        >
          <Shadow style={{ top: `calc(50% + ${R + 10}px)`, width: R * 1.6 }} />

          <Wire
            viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`}
            width={R * 2}
            height={R * 2}
          >
            <circle
              cx="0"
              cy="0"
              r={R}
              fill="none"
              stroke="#0a0a0a"
              strokeOpacity="0.06"
              strokeWidth="1"
            />
            {parallelLines.map(({ d, opacity, key }) => (
              <path
                key={key}
                d={d}
                fill="none"
                stroke="#0a0a0a"
                strokeOpacity={opacity}
                strokeWidth="1"
              />
            ))}
            {meridianLines.map(({ d, opacity, key }) => (
              <path
                key={key}
                d={d}
                fill="none"
                stroke="#0a0a0a"
                strokeOpacity={opacity}
                strokeWidth="1"
              />
            ))}
          </Wire>

          {placed.map((it) => {
            const cur = pointSupporters[it.idx];
            const nxt = nextPointSupporters ? nextPointSupporters[it.idx] : null;
            const transitioning = !!nxt && nxt.name !== cur.name;
            const curOpacity =
              it.opacity * (transitioning ? 1 - shuffleProgress : 1);
            const nxtOpacity = transitioning
              ? it.opacity * shuffleProgress
              : 0;
            const curBoost = cur.boost ?? 1;
            const nxtBoost = nxt?.boost ?? 1;
            return (
              <LogoSlot
                key={it.idx}
                style={{
                  transform: `translate(-50%, -50%) translate3d(${it.left}px, ${it.top}px, 0) scale(${it.scale})`,
                  filter:
                    it.blur > 0.05 ? `blur(${it.blur.toFixed(2)}px)` : "none",
                  zIndex: it.zIndex,
                }}
              >
                <LogoImg
                  src={cur.src}
                  alt={cur.name}
                  style={{
                    opacity: curOpacity,
                    transform: `translate(-50%, -50%) scale(${curBoost})`,
                    maxWidth: 96 * logoScale,
                    maxHeight: 48 * logoScale,
                  }}
                />
                {transitioning && nxt && (
                  <LogoImg
                    src={nxt.src}
                    alt={nxt.name}
                    style={{
                      opacity: nxtOpacity,
                      transform: `translate(-50%, -50%) scale(${nxtBoost})`,
                      maxWidth: 96 * logoScale,
                      maxHeight: 48 * logoScale,
                    }}
                  />
                )}
              </LogoSlot>
            );
          })}
        </Globe>
        </Stage>
      </LeftCol>

      <TestimonialPane>
        <TestimonialTitleBlock>
          <TestimonialLabel>{t("home.partnersRows.testimonialsLabel")}</TestimonialLabel>
          <TestimonialTitle>{t("home.partnersRows.testimonialsTitle")}</TestimonialTitle>
          <TestimonialRedLine />
        </TestimonialTitleBlock>

        <QuotePair key={pageKey}>
          {currentPair.map((t, i) => (
            <QuoteCard key={i}>
              <QuoteMark>"</QuoteMark>
              <QuoteText>{t.text}</QuoteText>
              <Person>
                <PersonName>{t.name}</PersonName>
                <PersonRole>{t.role}</PersonRole>
              </Person>
            </QuoteCard>
          ))}
        </QuotePair>

        <Indicators>
          {Array.from({ length: PAGES }).map((_, i) => (
            <Indicator key={i} onClick={() => goToPage(i)}>
              <ProgressTrack>
                <ProgressFill
                  key={`${i}-${pageKey}`}
                  $isActive={i === activePage}
                  $isPast={i < activePage}
                  $duration={TESTIMONIAL_DURATION}
                />
              </ProgressTrack>
            </Indicator>
          ))}
        </Indicators>
      </TestimonialPane>
      </Layout>
    </Section>
  );
};

export default PartnersRows;

const Section = styled.section`
  background: white;
  width: 100%;
  padding: 2.4rem 2.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow: hidden;

  @media (max-width: 600px) { padding: 2rem 1.25rem; }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
`;

const Label = styled.span`
  font-family: 'Montserrat', Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #C02121;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: 'Montserrat', Helvetica, sans-serif;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #080F0F;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const RedLine = styled.div`
  width: 3rem;
  height: 3px;
  background: #C02121;
  border-radius: 2px;
`;

const COL_MIN_HEIGHT = `${R_MAX * 2 + 220}px`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: 2.4rem;
  align-items: stretch;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: ${COL_MIN_HEIGHT};

  @media (max-width: 1100px) {
    min-height: 0;
  }
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  perspective: 1600px;
  padding: 20px 0 40px;

  @media (max-width: 1100px) {
    justify-content: center;
  }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

const TestimonialPane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 4rem;
  padding-bottom: 40px;

  @media (max-width: 1100px) {
    padding-left: 0;
    padding-bottom: 0;
  }
`;

const TestimonialTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
  margin-bottom: 1.25rem;
`;

const TestimonialLabel = styled.span`
  font-family: 'Montserrat', Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #C02121;
  text-transform: uppercase;
`;

const TestimonialTitle = styled.h3`
  font-family: 'Montserrat', Helvetica, sans-serif;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #080F0F;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const TestimonialRedLine = styled.div`
  width: 3rem;
  height: 3px;
  background: #C02121;
  border-radius: 2px;
`;

const QuotePair = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.6rem;
  margin-left: 1.2rem;
  flex: 1;
  animation: ${fadeInUp} 0.55s ease forwards;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    margin-left: 0;
  }
`;

const QuoteCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 384px;
  height: 100%;
`;

const QuoteMark = styled.span`
  font-family: Georgia, serif;
  font-size: 51px;
  line-height: 1;
  color: #691212;
  font-weight: 700;
  display: block;
  margin-bottom: -0.75rem;
`;

const QuoteText = styled.p`
  font-family: "Inter", sans-serif;
  font-style: italic;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #3a3a3a;
  margin: 0;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: auto;
  padding-top: 0.75rem;
`;

const PersonName = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #080f0f;
  margin: 0;
`;

const PersonRole = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #6b6760;
  margin: 0;
`;

const Indicators = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.75rem;
`;

const Indicator = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  flex: 1;
  cursor: pointer;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(105, 18, 18, 0.18);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{
  $isActive: boolean;
  $isPast: boolean;
  $duration: number;
}>`
  height: 100%;
  background: #c02121;
  border-radius: 2px;

  ${({ $isActive, $isPast, $duration }) =>
    $isActive
      ? css`
          animation: ${fillBar} ${$duration}ms linear forwards;
        `
      : $isPast
      ? css`
          width: 100%;
        `
      : css`
          width: 0%;
        `}
`;

const Globe = styled.div<{ $dragging: boolean }>`
  position: relative;
  transform-style: preserve-3d;
  cursor: ${({ $dragging }) => ($dragging ? "grabbing" : "grab")};
  touch-action: none;
`;

const Wire = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Shadow = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.18),
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(2px);
  pointer-events: none;
`;

const LogoSlot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  will-change: transform, opacity;
  transform-origin: center;
  pointer-events: none;
`;

const LogoImg = styled.img`
  display: block;
  max-width: 96px;
  max-height: 48px;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  position: absolute;
  left: 50%;
  top: 50%;
`;
