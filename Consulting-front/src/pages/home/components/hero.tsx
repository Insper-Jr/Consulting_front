import styled from "styled-components";
import Insper from "../../../assets/Insper.png"; // ajuste o caminho conforme necessário

const Hero = () => {
  return (
    <HeroSection>
      <Overlay />
      <HeroContent>
        <Title>
          Consultoria especializada em soluções inovadoras e personalizadas para decisões estratégicas
        </Title>
        <Subtitle>
          Transformando realidades com soluções inovadoras
        </Subtitle>
        <CTAButton>
          Clique aqui e faça um diagnóstico gratuito
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(${Insper});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 70%;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  margin-top: 1rem;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const CTAButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background-color: white;
  color: black;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;
