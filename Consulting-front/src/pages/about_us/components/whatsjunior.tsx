import styled from "styled-components";
import { RED_TITLE, FONT_TITLE } from "../../../styles/tokens";
import whatIsJuniorImg from "../../../assets/whatIsJunior.png"; // Ajuste o caminho conforme sua estrutura de pastas
import flecha from "../../../assets/flecha.png";
import LineWithCircles from "./LineWithCircles";

// Cria uma versão estilizada do LineWithCircles
const StyledLineWithCircles = styled(LineWithCircles)`
  width: 640px;
@media (max-width: 1200px) {
    width:480px;
  }
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const WhatIsJunior = () => {
  return (
    <IntroSection>
      <RightContent>
        <ImageContainer>
          <img src={whatIsJuniorImg} alt="Ilustração sobre Empresa Júnior" />
        </ImageContainer>
      </RightContent>
      <LeftContent>
        <DecoratedTitle>
          <h2>O que é uma Empresa Júnior?</h2>
          <StyledLineWithCircles />
        </DecoratedTitle>
        
        <p>
          <strong>Empresas juniores</strong> são organizações formadas e geridas
          por estudantes de ensino superior, que aplicam na prática seus
          conhecimentos acadêmicos por meio de projetos de consultoria. O objetivo
          principal é desenvolver habilidades técnicas e comportamentais dos
          membros, proporcionando uma experiência profissional real.
        </p>
        
        <p>
          Na <strong>Insper Jr.</strong>, os clientes têm acesso a um time altamente
          capacitado, inserido em um dos principais ecossistemas de negócios e
          inovação do país, o Insper.
        </p>
        
        <p>
          Atrelado a isso e sendo uma empresa júnior, oferecemos{" "}
          <strong>soluções estratégicas de alta qualidade a um custo competitivo</strong>,
          além de uma <strong>visão jovem e disruptiva</strong>, trazendo novas
          perspectivas para solucionar desafios.
        </p>
      </LeftContent>
    </IntroSection>
  );
};

export default WhatIsJunior;

// =============== STYLED COMPONENTS ===============

const IntroSection = styled.section`
  display: flex;
  gap: 2rem;
  padding: 2rem 2rem;
  align-items: flex-start;

  /* Responsividade: em telas menores, empilha os conteúdos */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    margin-left:0;
  }
`;

const LeftContent = styled.div`
  flex: 2;
  min-width: 300px;
  max-width: 900px;

  p {
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    margin-bottom: 1.2rem;
    margin-left: 15px;
    letter-spacing: 1px;
  }

  strong {
    font-weight: 600;
  }

  /* Responsividade: ajusta margens, largura e ordem em telas menores */
  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
    text-align: center;
    order: 1;

    p {
      margin-left: 0;
      font-size: 15px;
    }
  }

  @media (max-width: 1200px) {
    p {
      margin-left: 0;
      font-size: 15px;
    }
  }
`;

const DecoratedTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  h2 {
    font-family: ${FONT_TITLE};
    font-size: 36px;
    color: ${RED_TITLE};
    margin: 0;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 22px;
    }
      margin-left: 0;
      padfing-left:0;
  }
@media (min-width: 600px) and (max-width: 1200px) {
  h2 {
    margin-left: 0;
    font-size: 30px;
  }
}
`;

const RightContent = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  padding-top: 50px;
  margin-left: 25px;

  /* Responsividade: centraliza o conteúdo, ajusta o padding e a ordem */
  @media (max-width: 768px) {
    padding-top: 20px;
    max-width: 100%;
    text-align: center;
    order: 2;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  img {
    width: 85%;
    height: auto;
    max-height: 500px;
    border-radius: 5px;
  }
`;
