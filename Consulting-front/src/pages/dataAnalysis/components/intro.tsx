import styled from "styled-components";
import img1 from "../../../assets/data-img1.png";
import img2 from "../../../assets/data-img2.png";


const Intro = () => {
  return (
    <IntroSection>
      <TextBox>
        <Title>Sobre o escopo</Title>
        <Paragraph>
        Em um mercado competitivo, <strong>tomar decisões baseadas em dados concretos é essencial</strong> para o crescimento sustentável do seu negócio. Nossa equipe de engenharia estrutura, analisa e interpreta grandes volumes de informações para identificar padrões, otimizar processos e prever tendências. Aplicamos metodologias avançadas de análise estatística, machine learning e visualização de dados para transformar números em insights valiosos.        
        </Paragraph>
        <Paragraph>
        Utilizamos <strong>Python</strong> para realizar desde a coleta e tratamento de dados até modelagens preditivas, extraindo informações estratégicas que ajudam sua empresa a tomar decisões mais precisas. Além disso, desenvolvemos <strong>dashboards interativos no Power BI</strong>, proporcionando uma visualização clara e intuitiva dos indicadores-chave do seu negócio. Dessa forma, garantimos que dados complexos se tornem acessíveis e acionáveis, facilitando a análise em tempo real e as tomadas de decisão.        
        </Paragraph>
        <Paragraph>
          <strong> Quer utilizar dados a favor do seu negócio?</strong> Peça um diagnóstico gratuito e descubra como podemos te ajudar!
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
