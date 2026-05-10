import styled, { keyframes } from "styled-components";

const FONT = `'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

const Hero = () => (
  <Section id="hero">
    <Inner>
      <Eyebrow><span /> Processo Seletivo · 2026.2</Eyebrow>
      <Title>
        Construa sua próxima<br />
        grande experiência<br />
        <span className="accent">na Insper Jr.</span>
      </Title>
      <Subtitle>
        Inscrições abertas para nossas frentes. Trabalhe em projetos reais,
        com clientes reais, ao lado de pessoas que querem crescer junto.
      </Subtitle>
      <Actions>
        <Primary href="#inscricao">
          Inscreva-se no Processo Seletivo <span className="arrow">→</span>
        </Primary>
      </Actions>
    </Inner>

  </Section>
);

export default Hero;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;


const Section = styled.section`
  position: relative; min-height: 100vh; display: flex; align-items: center;
  color: #fff; overflow: hidden; background: #080F0F; font-family: ${FONT};

  &::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(120% 80% at 80% 30%, rgba(192,33,33,0.32), transparent 55%),
      radial-gradient(80% 60% at 10% 90%, rgba(35,6,6,0.7), transparent 60%),
      linear-gradient(180deg, #0c1414 0%, #080F0F 60%, #0a0303 100%);
  }
  &::after {
    content: ''; position: absolute; inset: 0;
    background:
      linear-gradient(90deg, rgba(8,15,15,0.85) 0%, rgba(8,15,15,0.55) 35%, rgba(8,15,15,0.15) 65%, rgba(8,15,15,0.35) 100%),
      linear-gradient(180deg, rgba(8,15,15,0) 60%, rgba(8,15,15,0.55) 100%);
  }
`;

const Inner = styled.div`
  position: relative; z-index: 1; width: 100%; max-width: 1240px;
  margin: 0 auto; padding: 140px 32px 120px;
  @media (max-width: 600px) { padding: 120px 24px 96px; }
`;

const Eyebrow = styled.div`
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
  color: #C02121; margin-bottom: 28px; animation: ${fadeInUp} 0.6s ease both;
  span { width: 28px; height: 1px; background: #C02121; }
`;

const Title = styled.h1`
  margin: 0; max-width: 14ch;
  font-size: clamp(40px, 5.4vw, 64px); line-height: 1.04;
  letter-spacing: -0.03em; font-weight: 800;
  animation: ${fadeInUp} 0.7s ease both 0.08s;
  .accent { color: #C02121; }
`;

const Subtitle = styled.p`
  margin: 24px 0 0; max-width: 60ch;
  color: rgba(255,255,255,0.78); font-size: 18px; line-height: 1.55;
  animation: ${fadeInUp} 0.7s ease both 0.16s;
`;

const Actions = styled.div`
  margin-top: 44px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
  animation: ${fadeInUp} 0.7s ease both 0.24s;
`;

const btn = `
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 26px; border-radius: 4px; font-weight: 600; font-size: 16px;
  cursor: pointer; text-decoration: none; line-height: 1;
  transition: background .2s, color .2s, border-color .2s, transform .2s, box-shadow .25s;
  .arrow { transition: transform .25s; }
  &:hover .arrow { transform: translateX(4px); }
`;

const Primary = styled.a`
  ${btn} background: #C02121; color: #fff; border: 0;
  box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px -10px rgba(192,33,33,0.7);
  &:hover {
    background: #a81b1b; transform: translateY(-1px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 14px 28px -10px rgba(192,33,33,0.85);
  }
`;
