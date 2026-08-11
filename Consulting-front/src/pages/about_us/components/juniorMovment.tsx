import React from "react";
import styled from "styled-components";
import { RED_TITLE, FONT_TITLE } from "../../../styles/tokens";
import brasil_junior from "../../../assets/awards/brasil_junior.png";
import fejesp from "../../../assets/awards/fejesp.png";

const Movement = () => {
  return (
    <CardContainer>
      <MovmentTitleWrapper>
        <MovmentLine />
        <h2>Movimento Empresa Júnior</h2>
        <MovmentLine />
      </MovmentTitleWrapper>
      <ContentWrapper>
        <LeftContainer>
          <p>
            O Movimento Empresa Júnior (MEJ) reúne estudantes universitários que, por meio de empresas juniores, aplicam seus conhecimentos acadêmicos na prática, desenvolvendo projetos de consultoria e contribuindo para o impacto social e econômico. Essas empresas, geridas por alunos, conectam a universidade ao mercado, promovendo aprendizado e inovação.
          </p>
          <br/>
          <p>
            A Brasil Júnior, confederação nacional do MEJ, e a FEJESP, que representa as empresas juniores de São Paulo, fortalecem o movimento ao oferecer suporte estratégico, promover eventos e fomentar padrões de excelência. Juntas, essas organizações impulsionam o crescimento sustentável do MEJ e formam líderes comprometidos com a transformação da sociedade.
            </p>
        </LeftContainer>
        <RightContainer>
          <Logo src={brasil_junior} alt="Brasil Júnior" />
          <Logo src={fejesp} alt="FEJESP" />
        </RightContainer>
      </ContentWrapper>
    </CardContainer>
  );
};

export default Movement;

// Container principal do card
const CardContainer = styled.div`
  width: 100%;
  background: #fff;
  margin-top: 100px;
`;

// Wrapper para o título com linhas laterais
const MovmentTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;

  h2 {
    font-family: ${FONT_TITLE};
    font-size: 36px;
    color: ${RED_TITLE};
    white-space: nowrap;
    margin: 0;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 26px;
    }
  }
`;

// Linha horizontal que preenche o espaço
const MovmentLine = styled.div`
  height: 2px;
  background-color: #000;
  flex: 1;
width: 100%;
`;

// Container para o conteúdo principal do card (texto + logotipos)
const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
    margin: 80px 50px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

// Container da área de texto
const LeftContainer = styled.div`
  flex: 2;
  max-width: 1000px;

  p {
    font-family: ${FONT_TITLE};
    font-size: 20px;
    color: #333;
    line-height: 1.5;
    margin: 0;
  }
    @media (max-width: 1200px) { 
    p{
      font-size: 16px;}
    }

`;

// Container da área de logotipos
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 150px;
  align-items: center;
        @media (max-width: 1200px) { 
       gap: 300px;
    }
        @media (max-width: 600px) {
               gap: 150px;
     }
`;

// Estilização para as imagens (logotipos)
const Logo = styled.img`
  width: 250px;
  height: auto;
      @media (max-width: 1200px) {
       width: 250px;  
    }
    @media (max-width: 600px) {
         width: 200px;  
     }
`;
