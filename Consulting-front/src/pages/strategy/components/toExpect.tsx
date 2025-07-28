import styled from "styled-components";
import { MagnifyingGlass,PencilSimple, Target  } from "phosphor-react";

interface WhatToExpectProps {
  selectedTab: number;
}

const WhatToExpect = ({ selectedTab }: WhatToExpectProps) => {
  const cardData = [
    [
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Contratos sob Medida e com Segurança Jurídica",
        description:
          "Elaboração e revisão de contratos que asseguram direitos, obrigações e mitigam riscos jurídicos.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Adequação às Especificidades de Cada Projeto",
        description:
          "Adequação dos instrumentos às necessidades específicas de cada operação e setor.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Instrumentos Estratégicos para o Negócio",
        description:
          "Abrangência de documentos estratégicos como Acordo de Sócios, Termo de Voluntariado, Vesting, entre outros.",
      },
    ],
    [
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Avaliação para Benefícios Tributários",
        description:
          "Estudo de viabilidade para imunidades e isenções tributárias com base nas atividades e natureza jurídica da organização.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Comparação de Regimes e Otimização Fiscal",
        description:
          "Análise comparativa dos regimes tributários para redução lícita da carga tributária.",
      },
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Planejamento Sustentável e em Conformidade",
        description:
          "Estruturação de planejamento que garanta conformidade, economia fiscal e sustentabilidade financeira.",
      },
    ],
    [
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Avaliação para Benefícios Tributários",
        description:
          "Estudo de viabilidade para imunidades e isenções tributárias com base nas atividades e natureza jurídica da organização.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Comparação de Regimes e Otimização Fiscal",
        description:
          "Análise comparativa dos regimes tributários para redução lícita da carga tributária.",
      },
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Planejamento Sustentável e em Conformidade",
        description:
          "Estruturação de planejamento que garanta conformidade, economia fiscal e sustentabilidade financeira.",
      },
    ],
  ];

  const cards = cardData[selectedTab];

  return (
    <Section>
      <Header>
        <StyledHR />
        <h2>O que esperar</h2>
        <StyledHR />
      </Header>

      <CardsWrapper>
        {cards.map((card, index) => (
          <Card key={index}>
            <IconWrapper>{card.icon}</IconWrapper>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </CardsWrapper>
    </Section>
  );
};

export default WhatToExpect;

// Estilos
const Section = styled.section`
  padding: 1rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%; // importante para o hr ter base

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    color: #A10F23;
    white-space: nowrap;
  }

  @media(max-width:600px){
    h2 {
      font-size:30px;
    }
  }
`;

const StyledHR = styled.hr`
  display: block;
  width: 100%;
  height: 2px;
  background-color: black;
  border: none;
  margin: 0;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;

const Card = styled.div`
  max-width: 350px;
  text-align: center;
  margin: 1rem;
`;

const IconWrapper = styled.div`
  background-color: #A10F23;
  border: 2px solid white;
  padding: 0.7rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const CardTitle = styled.h3`
  margin: 1rem 0 0.5rem;
  font-weight: 700;
  font-size: 23px;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const CardDescription = styled.p`
  font-size: 18px;
  font-family: "Inter", sans-serif;
  line-height: 1.5;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
