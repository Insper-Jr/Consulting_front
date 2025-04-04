import styled from "styled-components";
import backgroundImage from "@/assets/backgrounds/financial-background.png";

const Hero = () => {
  return (
    <HeroSection>
      <Content>
        <Title>Desenvolvimento de Produto</Title>
        <Description>
        Da concepção à validação, estruturamos o desenvolvimento de produtos inovadores com foco em viabilidade, funcionalidade e diferenciação no mercado. Aplicamos metodologias ágeis para transformar ideias em soluções concretas e competitivas.
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
  max-width: 100%;
  height: 800px; /* Altura padrão em pixels */
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  /* Para telas entre 600px e 1200px */
  @media (min-width: 600px) and (max-width: 1300px) {
    padding-top: 40px;
    height: 800px;
    width: 100%;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
   max-width: 100%;
    padding: 40px 16px;
    height: 700px;
    flex-direction: column;
  }
`;

const Content = styled.div`
  max-width: 800px;
  color: white;

  /* Para telas entre 600px e 1200px */
  @media (min-width: 600px) and (max-width: 1300px) {
    max-width: 300px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    max-width: 320px;
  }
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px; /* 16px equivalentes a 1rem */

  /* Para telas entre 600px e 1200px */
  @media (min-width: 600px) and (max-width: 1300px) {
    font-size: 30px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 24px; /* 24px equivalentes a 1.5rem */

  /* Para telas entre 600px e 1200px */
  @media (min-width: 600px) and (max-width: 1300px) {
    font-size: 18px;
    margin-bottom: 20px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    font-size: 15px;
    margin-bottom: 16px;
  }
`;

const CallToAction = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;

  strong {
    font-weight: bold;
    color: white;
  }

  /* Para telas entre 600px e 1200px */
  @media (min-width: 600px) and (max-width: 1300px) {
    font-size: 18px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const Forms = styled.div`
  background-color: white;
  height: 400px;
  width: 400px;
  border-radius: 10px;

  /* Para telas entre 600px e 1200px */
  @media (min-width: 600px) and (max-width: 1300px) {
    height: 350px;
    width: 350px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    height: 300px;
    width: 300px;
  }
`;
