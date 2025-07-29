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
        title: "Defina o melhor modelo societário",
        description:
          "Analisamos o perfil dos sócios, operação e riscos para recomendar a estrutura mais adequada ao seu negócio.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Garanta uma base sólida desde o início",
        description:
          "Organizamos a participação societária com foco em crescimento, segurança jurídica e prevenção de conflitos.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Evite problemas futuros",
        description:
          "Com escolhas estratégicas desde a fundação, sua empresa ganha eficiência, estabilidade e governança.",
      },
    ],
    [
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Defina, registre e formalize com segurança",
        description:
          "Estruturamos a natureza jurídica e conduzimos todo o processo de emissão do CNPJ, da documentação ao registro final.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Escolha a natureza jurídica ideal",
        description:
          "Analisamos o tipo societário mais adequado ao seu caso para assegurar alinhamento com os objetivos do negócio.",
      },
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Garanta conformidade e agilidade",
        description:
          "Preparamos e acompanhamos a documentação necessária, assegurando regularidade e rapidez no registro.",
      },
    ],
    [
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Elabore documentos sob medida para sua organização",
        description:
          "Redigimos Estatuto Social, Regimento Interno e Termo de Voluntariado com base nas necessidades e especificidades do seu projeto.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Garanta clareza e segurança jurídica",
        description:
          "Estruturamos textos claros e coerentes, que refletem a realidade da organização e previnem conflitos futuros.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Esteja em conformidade com a legislação",
        description:
          "As minutas seguem rigorosamente as normas legais vigentes, assegurando validade e regularidade desde o início.",
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
