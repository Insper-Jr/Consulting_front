import styled from "styled-components";
import introImg from "../../../assets/ourteam.png";
import flecha from "../../../assets/flecha.png";
import LineWithCircles from "./LineWithCircles";

// Cria uma versão estilizada do LineWithCircles
const StyledLineWithCircles = styled(LineWithCircles)`
  /* Exemplo de estilos: ajuste os valores conforme necessário */
  width: 240px;
@media (max-width: 1200px) {
    width: 180px;
  }
  @media (max-width: 800px) {
    width: 140px;
  }
`;

const ourTeam = () => {
  return (
    <IntroSection>
      <LeftContent>
        <DecoratedTitle>
          <h2>Nosso Time</h2>
          <StyledLineWithCircles/>
        </DecoratedTitle>
        <p>
          Nosso time é composto por <strong>60 membros</strong> de sete
          diferentes cursos do Insper (Administração, Economia, Direito, Ciência 
          da Computação, Engenharia da Computação, Engenharia Mecânica e Engenharia 
          Mecatrônica), garantindo uma <strong>visão ampla e 
          multidisciplinar</strong> para a execução de projetos.
        </p>
        <p>
          A diversidade de formações permite que nossas{" "}
          <strong>soluções sejam completas</strong>, considerando tanto aspectos 
          técnicos quanto sociais.
        </p>
        <p>
          Além disso, nosso rigoroso processo seletivo em quatro fases garante que os 
          membros selecionados tenham alto potencial e estejam alinhados com os valores 
          de excelência da Insper Jr.
        </p>
      </LeftContent>

      <RightContent>
        <ImageContainer>
          <img src={introImg} alt="Equipe Insper Jr." />
        </ImageContainer>
      </RightContent>
    </IntroSection>
  );
};

export default ourTeam;

// =============== STYLED COMPONENTS ===============

const IntroSection = styled.section`
  display: flex;
  gap: 2rem;
  padding: 4rem 2rem;
  align-items: flex-start;

  /* Responsividade: em telas menores, empilha os conteúdos */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
  }
`;

const LeftContent = styled.div`
  flex: 2;
  min-width: 300px;
  max-width: 900px;
  margin-left: 10px;

  p {
    font-family: "Poppins", sans-serif;
    font-size: 25px;
    margin-bottom: 1.2rem;
    margin-left: 15px;
    letter-spacing: 1px;
    line-height: 1.4; /* Ajuste para melhor leitura */
  }

  strong {
    font-weight: 600;
  }

  /* Responsividade: ajusta margens e largura em telas menores */
  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
    text-align: center;

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


  /* Título */
  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 40px;
    color: #A10F23;
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
  max-width: 550px;
  padding-top: 50px;
  margin-left: 25px;

  /* Responsividade: centraliza o conteúdo e ajusta o padding */
  @media (max-width: 768px) {
    padding-top: 20px;
    max-width: 100%;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;
