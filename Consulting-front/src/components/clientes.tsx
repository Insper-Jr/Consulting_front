import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

import einstein from "../assets/clients/albert_einstein.png";
import alcoa from "../assets/clients/alcoa.png";
import ambev from "../assets/clients/ambev.png";
import carrefour from "../assets/clients/carrefour.png";
import cittamobi from "../assets/clients/cittamobi.png";
import faber from "../assets/clients/faber_castell.png";
import focus from "../assets/clients/focus.png";
import prefeitura from "../assets/clients/prefeiturasp.png";
import vitalab from "../assets/clients/vitalab.png";
import wise from "../assets/clients/wise.png";

const clientLogos = [
  prefeitura,
  vitalab,
  wise,
  einstein,
  alcoa,
  ambev,
  carrefour,
  cittamobi,
  faber,
  focus,
];

const Carousel = () => {
  const { t } = useTranslation();

  return (
    <CarouselWrapper>
      <TitleWrapper>
        <TitleText>
          <span>{t("shared.clientes.titleLine1")}</span>
          <span>{t("shared.clientes.titleLine2")}</span>
        </TitleText>
        <RedBar />
      </TitleWrapper>

      <Slider>
        <SlideTrack>
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <LogoWrapper key={index}>
              <img src={logo} alt={t("shared.clientes.logoAlt", { index })} />
            </LogoWrapper>
          ))}
        </SlideTrack>
      </Slider>
    </CarouselWrapper>
  );
};

export default Carousel;

// --------------------------- Estilos ---------------------------

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  gap: 3rem;
  max-width: 100%;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    padding: 16px 32px;
    gap: 24px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 34px;
  color: #C02121;
  line-height: 1.1;

  span {
    display: block;
  }

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const RedBar = styled.div`
  width: 4px;
  height: 80px;
  background-color: #C02121;

  @media (max-width: 600px) {
    height: 45px;
  }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-30%); }

`;

const Slider = styled.div`
  overflow: hidden;
  max-width: 80%;

    @media (max-width: 1200px) {
    max-width: 70%;
  }
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const SlideTrack = styled.div`
  display: flex;
  width: 200%;
  animation: ${scroll} 10s linear infinite;
`;

const LogoWrapper = styled.div`
  height: 80px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4rem;

  img {
    max-height: 60px;
    max-width: 100%;
    object-fit: contain;
  }
      @media (max-width: 600px) {
    height: 60px;
    min-width: 120px;
    margin-right: 32px;
    
    img {
      max-height: 25px;
    }
  }
`;