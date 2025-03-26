import styled from "styled-components";
import backgroundImage from "@/assets/backgrounds/pem-background.png";

const Hero = () => {
  return (
    <HeroSection>
      <Content>
        <Title>Plano Estratégico de Marketing</Title>
        <Description>
          Estruturamos planos de marketing estratégicos com foco em posicionamento, alcance e conversão.
          Analisamos o mercado, o público-alvo e a concorrência para criar campanhas direcionadas e eficazes.
        </Description>
        <CallToAction>
          Quer saber como <strong>podemos ajudar seu negócio?</strong> Peça um <strong>diagnóstico gratuito</strong> e descubra a melhor solução para sua empresa!
        </CallToAction>
      </Content>
      <Forms>
        <Title>Formulário</Title>
      </Forms>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    min-height: 60vh;
  }
`;

const Content = styled.div`
  max-width: 600px;
  color: white;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const CallToAction = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;

  strong {
    font-weight: bold;
    color: white;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Forms = styled.div`
    background-color: white;
    height: 400px;
    width: 400px;
    border-radius: 10px;

    @media (max-width: 768px) {
      display: none;
    }
`;

