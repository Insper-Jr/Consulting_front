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
        title: "Análise Estratégica da Estrutura Societária",
        description:
          "Mapeamento das estruturas societárias possíveis e recomendação da mais adequada ao perfil dos sócios e modelo de negócios.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Prevenção de Conflitos e Fortalecimento da Governança",
        description:
          "Avaliação de riscos, governança e organização da participação societária com foco na prevenção de conflitos.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Base Jurídica Sólida para Crescimento",
        description:
          "Criação de uma base jurídica sólida e estratégica para o crescimento do empreendimento.",
      },
    ],
    [
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Escolha da Natureza Jurídica e Preparação Documental",
        description:
          "Definição da natureza jurídica e preenchimento de documentos conforme exigências da Receita Federal.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Registro e Acompanhamento até o CNPJ",
        description:
          "Protocolo e acompanhamento do processo de registro até a obtenção do CNPJ.",
      },
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Formalização com Segurança e Eficiência",
        description:
          "Garantia de regularidade, celeridade e segurança jurídica na formalização da entidade.",
      },
    ],
    [
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Elaboração Personalizada dos Documentos Fundamentais",
        description:
          "Elaboração personalizada dos documentos constitutivos conforme a missão, estrutura e área de atuação da organização.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Redação Clara e Jurídica Segura",
        description:
          "Redação clara e juridicamente segura, com atenção à legislação vigente e melhores práticas.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Apoio à Governança e Alinhamento Institucional",
        description:
          "Alinhamento institucional e suporte à governança desde o início da operação.",
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
