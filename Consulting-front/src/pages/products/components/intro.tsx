import styled from "styled-components";
import img1 from "../../../assets/products-img1.png";
import img2 from "../../../assets/products-img2.png";


const Intro = () => {
  return (
    <IntroSection>
      <TextBox>
        <Title>Sobre o escopo</Title>
        <Paragraph>
        <strong>Criar um novo produto exige planejamento, testes e validação</strong>, garantindo que sua solução atenda às necessidades do mercado de forma eficiente e inovadora. Nossa equipe trabalha com design de produto, prototipagem e validação técnica, aplicando metodologias ágeis para transformar ideias em soluções concretas e escaláveis.

        </Paragraph>
        <Paragraph>

        Nossa equipe atua desde a idealização até a materialização do produto, focando na viabilidade técnica e na experiência do usuário. Com um processo flexível e validado junto ao cliente, trabalhamos para transformar conceitos em soluções concretas, garantindo inovação e impacto real.
        </Paragraph>
        <Paragraph>
          <strong>Quer tirar sua ideia do papel?</strong> Peça um diagnóstico gratuito e transforme seu projeto em realidade!
        </Paragraph>
      </TextBox>

      <ImagesBox>
        <ImageBack src={img1} alt="Imagem de fundo" />
        <ImageFront src={img2} alt="Imagem sobreposta" />
      </ImagesBox>
    </IntroSection>
  );
};

export default Intro;

const IntroSection = styled.section`
  padding: 4rem 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  max-width:100%;

  @media (max-width: 600px) {
    padding-left:80px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TextBox = styled.div`
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  width: 70%;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  color: #A10F23;
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  margin-bottom: 1rem;
      @media(max-width:600px){
    font-size: 28px;
    }

`;

const Paragraph = styled.p`
  font-size: 22px;
  line-height: 1.5;
  margin-bottom: 0.3rem;
  text-align: justify;
  width: 80%;

  strong {
    font-weight: bold;
  }
    @media(max-width:1300px){
    font-size:20px;
    }
    @media(max-width:600px){
     width: 100%;
       text-align: justify;
    font-size:15px;}
`;

const ImagesBox = styled.div`
  position: relative;
  height: 100%;
   width: 600px;
  aspect-ratio: 1 / 1;
      @media(max-width:1300px){
      width: 550px;
    }
    @media(max-width:600px){
    width:300px;}

`;

const ImageBack = styled.img`
  position: relative;
  width: 80%;
  border-radius: 10px;
  z-index: 1;

`;

const ImageFront = styled.img`
  position: absolute;
  bottom: -20px;
  left: -30px;
  width: 80%;
  border-radius: 10px;
  z-index: 2;
`;
