import styled from "styled-components";
import { BookmarkSimple, User, MagnifyingGlass } from "phosphor-react";

const WhatToExpect = () => {
  const cards = [
    {
      icon: <BookmarkSimple size={28} color="white" weight="bold" />,
      title: "Definição de Objetivos",
      description:
        "Estabeleça metas claras e mensuráveis para orientar o crescimento da marca, fortalecer a presença no mercado e aumentar a captação de clientes",
    },
    {
      icon: <User size={28} color="white" weight="bold" />,
      title: "Segmentação do Público-Alvo",
      description:
        "Identifique os diferentes perfis de consumidores, analisando comportamentos, necessidades e preferências para criar estratégias de marketing mais eficazes e personalizadas",
    },
    {
      icon: <MagnifyingGlass size={28} color="white" weight="bold" />,
      title: "Canais de Comunicação",
      description:
        "Seleção dos melhores meios de divulgação, como redes sociais, marketing digital, publicidade tradicional e parcerias estratégicas, para garantir maior alcance e engajamento do público",
    },
  ];

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
     h2{
     font-size:30px;
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
`;

const CardDescription = styled.p`
  font-size: 18px;
  font-family: "Inter", sans-serif;
  line-height: 1.5;
`;
