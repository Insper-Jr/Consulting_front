import styled from "styled-components";
import Insper from "../../../assets/Insper.png"; // ajuste o caminho conforme necessário
import Form from "@/components/formsHome";
import { useState } from "react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeroSection>
      <Overlay />
      {isOpen && (
        <FormWrapper onClick={handleClick}>
          <FormBox onClick={(e) => e.stopPropagation()}>
            <Form onClose={handleClick} />
          </FormBox>
        </FormWrapper>
      )}
      <HeroContent>
        <Title>
          Consultoria especializada em soluções inovadoras e personalizadas para decisões estratégicas
        </Title>
        <Subtitle>
          Transformando realidades com soluções inovadoras
        </Subtitle>
        <CTAButton onClick={handleClick}>
          Clique aqui e faça um diagnóstico gratuito
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

const FormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    height: 80vh;
  }
`;

const FormBox = styled.div`
  position: fixed;
  top: 90px;
  height: auto;
  z-index: 1000;
`;

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
  font-size: 24px;  /* Tamanho base para telas pequenas */
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 36px;
  }

  @media (min-width: 1024px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 20px;  /* Tamanho base para telas pequenas */
  margin-top: 1rem;

  @media (min-width: 768px) {
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 36px;
  }
`;

const CTAButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background-color: white;
  color: black;
  font-family: 'Inter', sans-serif;
  font-size: 12px;  /* Tamanho base para telas pequenas */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  &:hover {
    background-color: #BB0B24;
  }
`;
