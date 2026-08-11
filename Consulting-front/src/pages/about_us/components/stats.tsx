import React, { useRef, useState, useEffect, RefObject } from "react";
import styled from "styled-components";
import { RED_TITLE, FONT_TITLE } from "../../../styles/tokens";

// Hook customizado: pode ser colocado em um arquivo separado se preferir
const useOnScreen = (ref: RefObject<HTMLElement | null>, rootMargin: string = "0px"): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);
  
  return isIntersecting;
};

export { useOnScreen };

// Componente que anima a contagem do número
interface AnimatedNumberProps {
  target: number;
  isVisible: boolean;
  duration?: number;
}

const AnimatedNumber = ({ target, isVisible, duration = 2000 }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return; // Só inicia a animação se o componente estiver visível
    let start = 0;
    const increment = target / (duration / 50);
    
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isVisible, target, duration]);
  
  return <>+{count}</>;
};

const InsperStats = () => {
  // Valores dos dados
  const stats = [
    { value: 500, label: "Projetos Realizados" },
    { value: 24, label: "Anos de Mercado" },
    { value: 60, label: "Membros" },
    { value: 90, label: "Índice NPS" },
  ];

  // Tipando a referência para um HTMLDivElement
  const statsRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(statsRef, "0px");

  return (
    <StatsSection ref={statsRef}>
      <TitleWrapper>
        <Line />
        <h2>Estatísticas da Insper Jr.</h2>
        <Line />
      </TitleWrapper>

      <SecondContainer>
        <StatsRow>
          {stats.map((stat, idx) => (
            <StatCard key={idx}>
              <StatValue>
                <AnimatedNumber target={stat.value} isVisible={isVisible} />
              </StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsRow>
      </SecondContainer>
    </StatsSection>
  );
};

export default InsperStats;

// =============== STYLED COMPONENTS ===============
const StatsSection = styled.section`
  padding: 0;
  max-width: 100%;
  margin: 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-family: ${FONT_TITLE};
    font-size: 36px;
    color: ${RED_TITLE};
    white-space: nowrap;
  }
  
  @media (max-width: 600px) {
    h2 {
      font-family: ${FONT_TITLE};
      font-size: 26px;
      color: ${RED_TITLE};
      white-space: nowrap;
    }
  }
`;

const Line = styled.div`
  height: 2px;
  background-color: #000;
  width: 100%;
`;

const SecondContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  width: 70%;
  
  @media (max-width: 1300px) {
    width: 90%;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
`;

const StatValue = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #000;
  
  @media (max-width: 1300px) {
    font-size: 35px;
  }
  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const StatLabel = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  color: #000;
  margin-top: 4px;
  
  @media (max-width: 1300px) {
    font-size: 25px;
  }
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
