import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const useCountUp = (target: number, duration: number, trigger: boolean, delay = 0) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    timeoutId = setTimeout(() => {
      let startTs: number | null = null;

      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const progress = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, target, duration, delay]);

  return count;
};

const FONT = `'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

const ctaPulse = keyframes`
  0%, 100% { box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px -10px rgba(192,33,33,0.7); }
  50%       { box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 12px 32px -8px rgba(192,33,33,0.9), 0 0 0 5px rgba(192,33,33,0.12); }
`;

const dotPulse = keyframes`
  0%, 100% { transform: scale(1);   box-shadow: 0 0 0 0   rgba(34,197,94,0.55); }
  60%       { transform: scale(1.2); box-shadow: 0 0 0 5px rgba(34,197,94,0); }
`;

const InscricaoCTA = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const projetos = useCountUp(500, 1800, visible, 300);
  const anos     = useCountUp(25,  1400, visible, 500);

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
    <Section id="inscricao">
      <Inner ref={innerRef} data-visible={String(visible)}>
        <Grid>
          <div>
            <span className="eyebrow">04 · Inscrição</span>
            <h2>Pronto para construir<br />algo <em>real</em>?</h2>
            <p className="sub">
              A inscrição leva menos de cinco minutos. Depois, é com a gente: você recebe
              tudo o que precisa saber por e-mail.
            </p>
            <div className="actions">
              <Cta href="#">Inscreva-se no Processo Seletivo <span className="arrow">→</span></Cta>
              <InsperNote>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Exclusivo para <strong>alunos Insper</strong> — use seu e-mail institucional
                <span className="email">@al.insper.edu.br</span>
              </InsperNote>
            </div>
          </div>

          <ImageBlock data-visible={String(visible)}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Membros da Insper Jr colaborando"
            />
            <div className="overlay" />
            <div className="live-tag">
              <span className="dot" /> Processo aberto
            </div>
            <div className="badge-row">
              <div className="badge">
                <span className="num">{projetos}+</span>
                <span className="lbl">Projetos entregues</span>
              </div>
              <div className="badge">
                <span className="num">{anos} anos</span>
                <span className="lbl">De experiência</span>
              </div>
            </div>
          </ImageBlock>
        </Grid>
      </Inner>
    </Section>
  );
};

export default InscricaoCTA;

const Section = styled.section`
  background: #F8EBE0;
  border-top: 1px solid rgba(8,15,15,0.10);
  border-bottom: 1px solid rgba(8,15,15,0.10);
  padding: 140px 0;
  font-family: ${FONT};
  color: #080F0F;
  @media (max-width: 980px) { padding: 80px 0; }
  @media (max-width: 640px) { padding: 60px 0; }
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
  @media (max-width: 600px) { padding: 0 20px; }
`;


const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;

  .eyebrow {
    display: inline-block;
    font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: #691212; margin-bottom: 18px;
  }

  h2 {
    margin: 0;
    font-size: clamp(36px, 4.4vw, 56px);
    line-height: 1.04; max-width: 14ch;
    letter-spacing: -0.02em; font-weight: 800;
  }

  h2 em { font-style: normal; color: #C02121; }

  .sub {
    margin: 20px 0 0;
    position: relative;
    padding-left: 16px;
    border-left: 2px solid #C02121;
    color: rgba(8,15,15,0.62);
    font-size: 18px; max-width: 46ch; line-height: 1.55;
  }

  .actions { margin-top: 36px; display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }

  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 40px; }
  @media (max-width: 640px) {
    gap: 32px;
    .sub { font-size: 16px; margin-top: 16px; }
    .actions { margin-top: 28px; align-items: stretch; }
  }
`;

const Cta = styled.a`
  display: inline-flex; align-items: center; gap: 10px;
  padding: 20px 32px; border-radius: 4px;
  background: #C02121; color: #fff;
  font-weight: 600; font-size: 17px; text-decoration: none; line-height: 1;
  animation: ${ctaPulse} 3s ease-in-out infinite;
  transition: background .2s, transform .2s;
  .arrow { transition: transform .25s; }
  &:hover {
    background: #a81b1b; transform: translateY(-1px);
    animation-play-state: paused;
  }
  &:hover .arrow { transform: translateX(4px); }
  @media (max-width: 640px) {
    justify-content: center; padding: 18px 24px; font-size: 16px;
  }
`;

const ImageBlock = styled.div`
  position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 4 / 3;

  img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transform: scale(1.04);
    transition: transform 0.7s ease-out 0.2s;
  }
  &[data-visible="true"] img { transform: scale(1); }

  .overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(8,15,15,0.72) 0%, rgba(8,15,15,0.1) 55%, transparent 100%);
  }

  .live-tag {
    position: absolute; top: 16px; right: 16px;
    display: flex; align-items: center; gap: 6px;
    background: rgba(8,15,15,0.55); border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(6px); color: #fff;
    font-family: ${MONO}; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    padding: 6px 12px; border-radius: 99px;
  }

  .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e; display: inline-block;
    animation: ${dotPulse} 2s ease-in-out infinite;
  }

  .badge-row {
    position: absolute; bottom: 20px; left: 20px; right: 20px;
    display: flex; align-items: flex-end; justify-content: space-between; gap: 12px;
  }

  .badge {
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
    backdrop-filter: blur(8px); padding: 10px 14px; border-radius: 8px; color: #fff;
    display: flex; flex-direction: column; gap: 3px;
  }

  .num { font-family: ${MONO}; font-size: 22px; font-weight: 700; line-height: 1; }
  .lbl { font-size: 11px; opacity: 0.7; letter-spacing: 0.06em; text-transform: uppercase; }
  @media (max-width: 600px) {
    .badge { padding: 8px 10px; }
    .num { font-size: 18px; }
    .lbl { font-size: 10px; }
    .badge-row { left: 14px; right: 14px; bottom: 14px; gap: 10px; }
  }
`;

const InsperNote = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  font-size: 13px;
  color: rgba(8,15,15,0.55);
  font-family: ${FONT};
  line-height: 1.4;

  strong { color: rgba(8,15,15,0.80); font-weight: 600; }

  .email {
    font-family: ${MONO};
    font-size: 12px;
    background: rgba(192,33,33,0.08);
    color: #C02121;
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid rgba(192,33,33,0.18);
  }

  svg { flex-shrink: 0; color: rgba(8,15,15,0.40); }

  @media (max-width: 640px) {
    font-size: 12px;
    .email { font-size: 11px; }
  }
`;
