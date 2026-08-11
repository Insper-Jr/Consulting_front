import styled from "styled-components";
import substituicao from "../../../assets/strategy/substituicao.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SuccessCase = () => {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <Wrapper>
    <Intro>{t("strategy.successCase.label")}</Intro>
    <Container hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={substituicao} alt={t("strategy.successCase.imageAlt")} />
      <TextContent>
        <Title>
          {t("strategy.successCase.title")}
        </Title>
        <Description>
        {t("strategy.successCase.description")}
        </Description>
      </TextContent>
    </Container>
    </Wrapper>
  );
};

export default SuccessCase;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

`;

const Intro = styled.div`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: semibold;
    align-self: flex-start;
    margin-bottom: 1rem;
`;

const Container = styled.div<{ hovered: boolean }>`
  max-width: 1200px;
  height: 350px;
  display: flex;
  flex-direction: row;
  border-top: ${({ hovered }) => (hovered ? "2px solid #C02121" : "2px solid #929090")};
  border-bottom: ${({ hovered }) => (hovered ? "2px solid #C02121" : "2px solid #929090")};
  border-right: ${({ hovered }) => (hovered ? "2px solid #C02121" : "0px solid #C02121")};
  transition: border 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

    @media (max-width: 1200px) {
    width: 800px;
    height: 450px;
    gap: 1rem;
  }
  @media (max-width: 800px) {
    width: 80%;
    height: auto;
    flex-direction: column;
    gap: 1rem;
  }
  @media (max-width: 500px) {
      border-right: 0px solid #C02121;
  }
`;

const Image = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 800px) {
    width: 100%;
    height: 200px;
  }
`;

const TextContent = styled.div`
  width: 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  @media (max-width: 800px) {
    width: 100%;
    padding: 1rem;
  }
`;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  color:#C02121;

  @media (max-width: 800px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 0rem;
  color: #333;

  @media (max-width: 800px) {
    font-size: 15px;
  }
`;
