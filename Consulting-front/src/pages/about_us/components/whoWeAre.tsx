import styled from "styled-components";
import introImg from "../../../assets/whoweare.png";
import flecha from "../../../assets/flecha.png";
import LineWithCircles from "./LineWithCircles";

// Cria uma versão estilizada do LineWithCircles
const StyledLineWithCircles = styled(LineWithCircles)`
  /* Exemplo de estilos: ajuste os valores conforme necessário */
  width: 300px;
@media (max-width: 1200px) {
    width: 230px;
  }
  @media (max-width: 800px) {
    width: 170px;
  }
`;
const Intro = () => {
  return (
    <IntroSection>
      <LeftContent>
        <DecoratedTitle>
          <h2>Quem Somos?</h2>
          <StyledLineWithCircles/>
        </DecoratedTitle>
        <p>
          A <strong>Insper Jr.</strong> é uma empresa júnior de consultoria sem
          fins lucrativos, formada por alunos de graduação do Insper. Há mais de
          24 anos no mercado, somos movidos pelo propósito de{" "}
          <strong>transformar realidades</strong> por meio de{" "}
          <strong>soluções estratégicas e inovadoras. </strong>
        </p>
        <p>
          Todos os ganhos obtidos são reinvestidos em nossa estrutura e na
          capacitação dos nossos membros, garantindo um ambiente de aprendizado
          prático e desenvolvimento profissional. Nossa missão é{" "}
          <strong>conectar conhecimento acadêmico à realidade do mercado</strong>, entregando projetos de alto impacto que geram valor e impulsionam o crescimento de nossos clientes.
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

export default Intro;

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
    font-size: 20px;
    margin-bottom: 1.2rem;
    margin-left: 15px;
    letter-spacing: 1px;
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

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    color: #A10F23;
    margin: 0;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 22px;
    }
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
  margin-left:25px;

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
