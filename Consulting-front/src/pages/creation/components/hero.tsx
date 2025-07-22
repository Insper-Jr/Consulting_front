import styled from "styled-components";
import backgroundImage from "@/assets/backgrounds/financial-background.png";
import DiagnosticForm from "@/components/forms";


const Hero = () => {
  return (
    <HeroSection>
      <Content>
        <Title>Criação e Estruturação</Title>
        <Description>
        Da projeção à automatização, estruturamos planejamentos financeiros estratégicos com foco em viabilidade, sustentabilidade e crescimento. Analisamos receitas, custos e investimentos para criar um plano financeiro sólido e alinhado aos objetivos do negócio. 
        </Description>
        <CallToAction>
          Quer saber como <strong>podemos ajudar seu negócio?</strong> Peça um <strong>diagnóstico gratuito</strong> e descubra a melhor solução para sua empresa!
        </CallToAction>
      </Content>
      <DiagnosticForm/>
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

  /* Para telas entre 600px e 1300px */
  @media (min-width: 600px) and (max-width: 1300px) {
    padding-top: 40px;
    height: 800px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    padding: 30px;
    height: 1200px;
    flex-direction: column;
  }
`;

const Content = styled.div`
  max-width: 600px;
  color: white;

  /* Para telas entre 600px e 1300px */
  @media (min-width: 600px) and (max-width: 1300px) {
    max-width: 300px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    max-width: 320px;
    height:250px;
    margin-botttom: 20px;
  }
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;

  /* Para telas entre 600px e 1300px */
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
  margin-bottom: 24px;

  /* Para telas entre 600px e 1300px */
  @media (min-width: 600px) and (max-width: 1300px) {
    font-size: 18px;
    margin-bottom: 20px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    font-size: 18px;
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

  /* Para telas entre 600px e 1300px */
  @media (min-width: 600px) and (max-width: 1300px) {
    font-size: 18px;
  }

  /* Para telas menores que 600px */
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
