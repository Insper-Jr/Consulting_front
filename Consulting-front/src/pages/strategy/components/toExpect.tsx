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
        title: "Formalize relações com segurança e clareza",
        description:
          "Elaboramos e revisamos contratos que definem direitos, deveres e previnem conflitos em todas as fases do seu negócio.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Alinhe documentos aos seus objetivos estratégicos",
        description:
          "Criamos instrumentos sob medida como: Contrato de Prestação de Serviços, Acordo de Sócios, Vesting, Termo de Voluntariado entre outros; ajustando-os à sua realidade.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Garanta validade e conformidade legal",
        description:
          "As minutas seguem a legislação vigente e refletem boas práticas de governança, contribuindo para decisões seguras e escaláveis.",
      },
    ],
    [
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Reduza custos com inteligência fiscal",
        description:
          "Estudamos os regimes tributários disponíveis e identificamos a estrutura mais econômica e segura para sua operação.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Aproveite benefícios legais com segurança",
        description:
          "Analisamos a possibilidade de imunidades e isenções previstas em lei, de acordo com a natureza da sua atividade.",
      },
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Ganhe previsibilidade e sustentabilidade",
        description:
          "Estruturamos seu planejamento fiscal com foco em regularidade jurídica, controle financeiro e crescimento saudável.",
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
