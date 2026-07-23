// src/pages/contact/components/hero.tsx
import styled from "styled-components";
import Header from "../../../components/header";
import DiagnosticForm from "../../../components/forms";

import teamBg from "../../../assets/fale_conosco/fundo-contato-novo.png";
import brasilJunior from "../../../assets/awards/brasil_junior.png";
import enej from "../../../assets/awards/enej.png";
import falconi from "../../../assets/awards/falconi.png";
import fejesp from "../../../assets/awards/fejesp.png";

const Hero = () => {
  const stats = [
    { n: "+1.500", l: "PROJETOS" },
    { n: "26", l: "ANOS" },
    { n: "NPS 90+", l: "SATISFAÇÃO" },
  ];

  const awards = [
    { src: brasilJunior, alt: "Brasil Junior", height: 44 },
    { src: enej, alt: "ENEJ", height: 70 },
    { src: falconi, alt: "Falconi", height: 44 },
    { src: fejesp, alt: "Fejesp", height: 44 },
  ];

  return (
    <Section>
      <PhotoLayer style={{ backgroundImage: `url(${teamBg})` }} />
      <SideGradient />
      <BottomVignette />

      <Header />

      <Content>
        <Left>
          <Headline>
            Seu desafio é<br />
            a nossa<br />
            <Highlight>inspiração.</Highlight>
          </Headline>

          <Lead>
            Preencha o formulário e um dos nossos especialistas entrará em contato
            em até 24h para entender seu desafio.
          </Lead>

          <Stats>
            {stats.map((s) => (
              <StatItem key={s.l}>
                <StatNumber>{s.n}</StatNumber>
                <StatLabel>{s.l}</StatLabel>
              </StatItem>
            ))}
          </Stats>

          <Awards>
            {awards.map((a) => (
              <AwardLogo
                key={a.alt}
                src={a.src}
                alt={a.alt}
                style={{ height: a.height }}
              />
            ))}
          </Awards>
        </Left>

        <Right>
          <DiagnosticForm />
        </Right>
      </Content>
    </Section>
  );
};

export default Hero;

/* ============================ Styled Components ============================ */

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  background: #080f0f;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
`;

const PhotoLayer = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 32%;
  z-index: 0;
`;

const SideGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    95deg,
    rgba(8, 15, 15, 0.78) 0%,
    rgba(8, 15, 15, 0.45) 38%,
    rgba(8, 15, 15, 0.15) 60%,
    rgba(8, 15, 15, 0.55) 100%
  );
  z-index: 1;
`;

const BottomVignette = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 280px;
  background: linear-gradient(180deg, transparent, rgba(8, 15, 15, 0.85));
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 460px;
  gap: 80px;
  padding: 160px 96px 96px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 56px;
    padding: 130px 48px 80px;
  }

  @media (max-width: 600px) {
    padding: 110px 20px 56px;
    gap: 40px;
  }
`;

const Left = styled.div`
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const Headline = styled.h1`
  color: #fff;
  margin: 20px 0 24px;
  font-size: 64px;
  line-height: 1.04;
  font-weight: 600;
  letter-spacing: -0.025em;
  max-width: 600px;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.6);

  @media (max-width: 900px) {
    font-size: 48px;
  }

  @media (max-width: 600px) {
    font-size: 38px;
  }

  @media (max-width: 380px) {
    font-size: 32px;
  }
`;

const Highlight = styled.span`
  color: #c02121;
  font-style: italic;
  font-weight: 500;
`;

const Lead = styled.p`
  color: rgba(255, 255, 255, 0.88);
  font-size: 16px;
  line-height: 1.7;
  font-weight: 400;
  max-width: 460px;
  margin: 0 0 56px;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6);

  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0 0 36px;
    font-size: 15px;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 48px;
  margin-bottom: 56px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 28px;
    margin-bottom: 40px;
  }
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const StatLabel = styled.div`
  font-family: "DM Mono", "JetBrains Mono", "Courier New", monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.16em;
  margin-top: 6px;
`;

const Awards = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;

  @media (max-width: 600px) { gap: 20px; }
`;

const AwardLogo = styled.img`
  width: auto;
  opacity: 0.85;
  filter: brightness(0) invert(1);

  @media (max-width: 600px) { height: 32px !important; }
`;

const Right = styled.div`
  min-width: 0;
  width: 100%;
`;
