import styled from "styled-components";
import img1 from "../../../assets/market-img1.png";
import img2 from "../../../assets/market-img2.png";


const Intro = () => {
  return (
    <IntroSection>
      <TextBox>
        <Title>Sobre o escopo</Title>
        <Paragraph>
        Entender o mercado exige pesquisa, estratégia e análise aprofundada para garantir que seu negócio se posicione de forma competitiva e eficiente.
         Nossa equipe trabalha <strong>com estudos de mercado, mapeamento de concorrência e identificação de oportunidades</strong>, aplicando metodologias ágeis para transformar dados em insights estratégicos e acionáveis.
        </Paragraph>
        <Paragraph>

        Atuamos desde a coleta de informações até a formulação de estratégias, focando na compreensão do comportamento do consumidor, nas tendências do setor e nos diferenciais competitivos. Com um processo flexível e validado junto ao cliente, fornecemos análises que orientam decisões assertivas e impulsionam o crescimento sustentável do seu negócio.
        </Paragraph>
        <Paragraph>
          <strong>Quer entender melhor o mercado e tomar decisões estratégicas?</strong> Peça um diagnóstico gratuito e fortaleça sua empresa com dados e insights valiosos!
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
    font-size:30px;
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
