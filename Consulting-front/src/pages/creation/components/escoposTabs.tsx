import styled from "styled-components";
import img1 from "@/assets/financial-img1.png";
import img2 from "@/assets/financial-img2.png";
import { useEffect, useState } from "react";

const options = [
  {
    title: "Planejamento Societário",
    content: [
      "Evidencia as possíveis <strong>estruturas societárias para o negócio</strong>, considerando suas características, objetivos e perspectivas de crescimento.",
      "A partir da análise do perfil dos sócios, do modelo de operação, dos riscos envolvidos e das particularidades do setor, estudamos os tipos societários mais adequados e a forma ideal de organizar a participação societária.",
      "Com isso, a <strong>empresa inicia suas atividades com uma base sólida</strong>, organizada e preparada para crescer, minimizando riscos e prevenindo conflitos futuros."
    ]
  },
  {
    title: "Emissão de CNPJ",
    content: [
      "Tem por objetivo à <strong>obtenção do número de CNPJ</strong> da entidade perante a Receita Federal, garantindo sua existência jurídica plena.",
      "Envolve a definição da natureza jurídica mais adequada, a organização e o preenchimento da documentação necessária e o acompanhamento do processo até a efetivação do registro.",
      "O serviço busca assegurar <strong>celeridade, regularidade e conformidade</strong> com os procedimentos administrativos exigidos."
    ]
  },
  {
    title: "Documentos Constitutivos",
    content: [
      "Consiste na elaboração dos principais documentos jurídicos necessários para a <strong>constituição formal da organização</strong>, como o Estatuto Social, o Regimento Interno e o Termo de Voluntariado.",
      "A redação é personalizada de acordo com a natureza e as especificidades do projeto, visando <strong>assegurar clareza organizacional, segurança jurídica e adequação às exigências legais vigentes.</strong>",
    ]
  },
];

export const EscoposTabs = () => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleTabChange = (index: number) => {
    if (index === selected || isAnimating) return;
    setDirection(index > selected ? "left" : "right");
    setPrevSelected(selected);
    setIsAnimating(true);
    setTimeout(() => {
      setSelected(index);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <TabContainer>
      <TabHeader>
        {options.map((opt, idx) => (
          <TabButton
            key={idx}
            active={selected === idx}
            onClick={() => handleTabChange(idx)}
          >
            {opt.title}
          </TabButton>
        ))}
      </TabHeader>

      <ContentWrapper>
        {isAnimating && (
          <ContentSlider animateOut direction={direction}>
            <TextBox>
              <Title>{options[prevSelected].title}</Title>
              {options[prevSelected].content.map((p, i) => (
                <Paragraph key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </TextBox>
            <ImagesBox>
              <ImageBack src={img1} alt="Imagem de fundo" />
              <ImageFront src={img2} alt="Imagem sobreposta" />
            </ImagesBox>
          </ContentSlider>
        )}

        <ContentSlider animateIn={isAnimating} direction={direction}>
          <TextBox>
            <Title>{options[selected].title}</Title>
            {options[selected].content.map((p, i) => (
              <Paragraph key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </TextBox>
          <ImagesBox>
            <ImageBack src={img1} alt="Imagem de fundo" />
            <ImageFront src={img2} alt="Imagem sobreposta" />
          </ImagesBox>
        </ContentSlider>
      </ContentWrapper>

      <Dots>
        {options.map((_, i) => (
          <Dot key={i} active={i === selected} onClick={() => handleTabChange(i)} />
        ))}
      </Dots>
    </TabContainer>
    
  );
};

export default EscoposTabs;


const TabContainer = styled.section`
  padding: 4rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 2rem;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  font-family: "Inter", sans-serif;
  font-size: 25px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#A10F23" : "#1d1d1d")};
  position: relative;
  cursor: pointer;
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;

  &::after {
    content: "";
    display: block;
    height: 2px;
    background-color: ${({ active }) => (active ? "#A10F23" : "transparent")};
    transition: all 0.3s ease;
    width: 100%;
  }

  @media (max-width: 768px) {
    background-color: ${({ active }) => (active ? "#A10F23" : "#f8f9fa")};
    color: ${({ active }) => (active ? "white" : "#1d1d1d")};
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    font-size: 16px;
    text-align: left;
    border: 1px solid ${({ active }) => (active ? "#A10F23" : "#e9ecef")};

    &::after {
      display: none;
    }

    &:hover {
      background-color: ${({ active }) => (active ? "#A10F23" : "#e9ecef")};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0.8rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  height: auto;
  min-height: 420px;

  @media (max-width: 900px) {
    min-height: auto;
  }
`;

const ContentSlider = styled.div<{
  animateIn?: boolean;
  animateOut?: boolean;
  direction?: "left" | "right";
}>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  opacity: ${({ animateOut }) => (animateOut ? 0 : 1)};
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform: ${({ animateIn, animateOut, direction }) => {
  if (animateOut)
    return direction === "left" ? "translateX(-150%)" : "translateX(150%)";
  if (animateIn)
    return direction === "left" ? "translateX(150%)" : "translateX(-150%)";
  return "translateX(0)";
}};


  @media (max-width: 900px) {
    flex-direction: column;
    position: static;
    transform: none;
    opacity: 1;
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

  @media (max-width: 600px) {
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

  @media (max-width: 1300px) {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
`;

const ImagesBox = styled.div`
  position: relative;
  height: 100%;
  width: 600px;
  aspect-ratio: 1 / 1;

  @media (max-width: 1300px) {
    width: 550px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
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

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12rem;

  @media (max-width: 600px) {
    margin-top: 6rem;
  }
  @media (max-width: 480px) {
    margin-top: 4rem;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#A10F23" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 8px;
    height: 8px;
  }
`;
