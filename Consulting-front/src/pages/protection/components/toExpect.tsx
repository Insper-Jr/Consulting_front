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
        title: "Garanta a titularidade da sua obra",
        description:
          "Registramos e formalizamos a autoria de conteúdos como textos, vídeos, ilustrações e materiais institucionais.",
      },
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Evite uso indevido e plágio",
        description:
          "Protegemos seus direitos morais e patrimoniais, prevenindo cópias não autorizadas e conflitos sobre propriedade intelectual",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Atue com segurança em divulgações e licenciamento",
        description:
          "Estruturamos a proteção jurídica necessária para o uso, comercialização ou compartilhamento de suas criações.",
      },
    ],
    [
      {
        icon: <PencilSimple size={28} color="white" weight="bold" />,
        title: "Mapeie e adeque o uso de dados pessoais",
        description:
          "Identificamos os fluxos de coleta, uso e armazenamento de dados para garantir conformidade com a LGPD.",
      },
      {
        icon: <Target size={28} color="white" weight="bold" />,
        title: "Evite riscos legais e reputacionais",
        description:
          "Estruturamos políticas internas e cláusulas contratuais que reduzem vulnerabilidades e aumentam a segurança jurídica.",
      },
      {
        icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
        title: "Comunique com transparência e responsabilidade",
        description:
          "Alinhamos suas práticas às exigências da lei, reforçando a confiança de clientes, parceiros e colaboradores.",
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
