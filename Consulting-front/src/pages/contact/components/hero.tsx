import React from "react";
import styled from "styled-components";
import backgroundImage from "../../../assets/fale_conosco/fundo-contato.png";
import Form from "@/components/forms";

const HeroComponent = () => {
  return (
    <BackgroundContainer>
      <Overlay />
      <ContentWrapper>
        <LeftContainer>
          <LeftText>
            Preencha o formulário e logo um especialista entrará em contato!
          </LeftText>
        </LeftContainer>
        <RightContainer>
          <Form />
        </RightContainer>
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default HeroComponent;

/* ================== Styled Components ================== */

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4); /* filtro escuro */
    z-index: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
  margin-top: 84px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(176, 11, 36, 0.8);

  @media (max-width: 900px) {
    background-color: transparent;
    padding: 1rem;
    text-align: center;
  }
`;

const LeftText = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  color: #fff;
  margin: 0;

  @media (max-width: 900px) {
    font-size: 26px;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
