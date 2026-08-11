import styled from "styled-components";
import { MagnifyingGlass,PencilSimple, Target  } from "phosphor-react";
import { useTranslation } from "react-i18next";

interface WhatToExpectProps {
  selectedTab: number;
}

interface CardText {
  title: string;
  description: string;
}

const WhatToExpect = ({ selectedTab }: WhatToExpectProps) => {
  const { t } = useTranslation();

  const iconData = [
    [
      <MagnifyingGlass size={28} color="white" weight="bold" />,
      <PencilSimple size={28} color="white" weight="bold" />,
      <Target size={28} color="white" weight="bold" />,
    ],
    [
      <PencilSimple size={28} color="white" weight="bold" />,
      <Target size={28} color="white" weight="bold" />,
      <MagnifyingGlass size={28} color="white" weight="bold" />,
    ],
  ];

  const tabsText = t("protection.toExpect.tabs", { returnObjects: true }) as CardText[][];

  const cards = tabsText[selectedTab].map((card, index) => ({
    ...card,
    icon: iconData[selectedTab][index],
  }));

  return (
    <Section>
      <Header>
        <StyledHR />
        <h2>{t("protection.toExpect.heading")}</h2>
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
    color: #C02121;
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
  background-color: #C02121;
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
