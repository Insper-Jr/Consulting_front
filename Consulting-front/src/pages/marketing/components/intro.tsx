import styled from "styled-components";
import img1 from "../../../assets/pem-img1.png";
import img2 from "../../../assets/pem-img2.png";

const Intro = () => {
  return (
    <IntroSection>
      <TextBox>
        <Title>Sobre o escopo</Title>
        <Paragraph>
          Elaborar um plano de marketing eficiente exige estratégia, análise de mercado e adaptação contínua para garantir que sua marca se posicione de forma competitiva e impactante.
          Nossa equipe trabalha <strong>análise de estratégias de marketing dos concorrentes, definição de público-alvo e desenvolvimento de campanhas</strong>, aplicando metodologias ágeis para criar estratégias personalizadas e de alto desempenho.
        </Paragraph>
        <Paragraph>
          Atuamos criando um plano estratégico de marketing, focando na comunicação assertiva e nos melhores canais para alcançar seu público. Com um processo flexível e orientado a resultados, desenvolvemos ações que fortalecem sua marca, aumentam sua visibilidade e geram conversões reais.
        </Paragraph>
        <Paragraph>
          <strong>Quer impulsionar sua marca?</strong> Peça um diagnóstico gratuito e leve seu negócio ao próximo nível!
        </Paragraph>
      </TextBox>

      <ImagesBox>
        <ImageBack src={img2} alt="Imagem de fundo" />
        <ImageFront src={img1} alt="Imagem sobreposta" />
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
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    padding: 4rem 2rem;
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
`;

const ImagesBox = styled.div`
  position: relative;
  min-width: 300px;
  height: 100%;
  max-width: 550px;
  aspect-ratio: 1 / 1;
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
