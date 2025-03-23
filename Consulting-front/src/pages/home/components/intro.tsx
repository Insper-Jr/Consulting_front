import { useEffect, useState } from "react";
import styled from "styled-components";
import introImg from "../../../assets/intro.png";
import flecha from "../../../assets/flecha.png";

const Intro = () => {
  const stats = [
    { label: "Anos de Mercado", value: 24 },
    { label: "Projetos Realizados", value: 500 },
    { label: "Membros", value: 60 },
    { label: "Índice NPS", value: 90 },
  ];

  return (
    <IntroSection>
      <LeftContent>
        <DecoratedTitle>
          <img src={flecha} alt="Flecha decorativa" />
          <h2>Insper Jr.</h2>
        </DecoratedTitle>
        <p>
          Fundada em 2001, a <strong>Insper Jr.</strong> é a <strong>Empresa Júnior do Insper</strong>, uma das faculdades de negócios mais renomadas do Brasil. Formada pelos alunos, a Insper Jr. é uma empresa de consultoria que visa <strong>impactar</strong> a sociedade por meio da superação de <strong>desafios</strong>.
        </p>
        <p>
          Com mais de <strong>24 anos de mercado</strong> e <strong>500 projetos realizados</strong>, a empresa se destaca pela excelência na entrega de soluções estratégicas e inovadoras para negócios de diversos setores.
        </p>
        <RedButton>Saiba mais</RedButton>
      </LeftContent>

      <RightContent>
        <ImageContainer>
          <img src={introImg} alt="Equipe Insper Jr." />
          <StatsBar>
            {stats.map((item, index) => (
              <Stat key={index}>
                <AnimatedNumber end={item.value} />
                <Label>{item.label}</Label>
              </Stat>
            ))}
          </StatsBar>
        </ImageContainer>
      </RightContent>
    </IntroSection>
  );
};

export default Intro;

// Hook de animação de número
const AnimatedNumber = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s
    const increment = end / (duration / 30);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 30);

    return () => clearInterval(interval);
  }, [end]);

  return <Value>{count}+</Value>;
};


const IntroSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 4rem 2rem;
  justify-content: center;
  align-items: flex-start;
`;

const LeftContent = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 550px;

  p {
    font-family: "Inter", sans-serif;
    font-size: 20px;
    margin-bottom: 1.2rem;
  }

  strong {
    font-weight: 600;
  }
`;

const RedButton = styled.button`
  background-color: #BB0B24;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #A10F23;
  }
`;

const DecoratedTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  img {
    width: 30%;
    height: auto;
  }

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 40px;
    color: #6D1622;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 32px;
    }
  }
`;


const RightContent = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 550px;
`;

const ImageContainer = styled.div`
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: #BB0B24;
  padding: 1rem;
  border-radius: 10px;
  color: white;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 100px;
`;

const Value = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

const Label = styled.div`
  font-size: 14px;
  font-family: "Inter", sans-serif;
  text-align: center;
`;
