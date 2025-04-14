import { useEffect, useState } from "react";
import styled from "styled-components";
import introImg from "../../../assets/intro.png";
import flecha from "../../../assets/flecha.png";

const Intro = () => {
  const stats = [
    { label: "Projetos Realizados", value: 500 },
    { label: "Anos de Mercado", value: 24 },
    { label: "Membros", value: 60 },
    { label: "Índice NPS", value: 90 },
  ];

  return (
    <IntroSection>
      <UpperSection>
        <TextContent>
          <DecoratedTitle>
            <h2>Nosso Trabalho</h2>
          </DecoratedTitle>
          <p>
            Nossos escopos de Business e Engenharia foram desenvolvidos para atuar em sinergia, garantindo análises estratégicas e soluções operacionais que se complementam. Personalizamos cada projeto conforme sua necessidade, criando estratégias isoladas ou combinadas para maximizar seus resultados. Nosso compromisso é entregar a melhor solução para garantir um futuro sólido e sustentável para sua empresa.
          </p>
        </TextContent>
        <ImageContainer>
          <img src={introImg} alt="Equipe Insper Jr." />
        </ImageContainer>
      </UpperSection>

      <StatsBar>
        {stats.map((item, index) => (
          <Stat key={index}>
            <AnimatedNumber end={item.value} />
            <Label>{item.label}</Label>
          </Stat>
        ))}
      </StatsBar>
    </IntroSection>
  );
};

export default Intro;

// Hook de animação de número
const AnimatedNumber = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 30);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [end]);

  return <Value>{count}+</Value>;
};

/* ======================= STYLED ======================== */

const IntroSection = styled.section`
  padding: 2rem 2rem 2rem 2rem;
  width: 80%;
  align-self: center;
`;

const UpperSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextContent = styled.div`
  min-width: 280px;
  max-width: 600px;

  p {
    font-family: "Inter", sans-serif;
    font-size: 18px;
    text-align: justify;
  }

  strong {
    font-weight: 600;
  }
`;

const DecoratedTitle = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    font-weight: 700;
    margin: 0;
    color: #A10F23;
  }

  @media(max-width: 768px) {
    h2 {
      font-size: 28px;
    }
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 500px;

  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const StatsBar = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Value = styled.div`
  font-size: 32px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  color: #000;

  @media(max-width: 600px) {
    font-size: 24px;
  }
`;

const Label = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  text-align: center;

  @media(max-width: 600px) {
    font-size: 13px;
  }
`;
