import styled, { keyframes } from "styled-components";

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
  return (
    <CarouselWrapper>
      <TitleWrapper>
        <TitleText>
          <span>Nossos</span>
          <span>Clientes</span>
        </TitleText>
        <RedBar />
      </TitleWrapper>

      <Slider>
        <SlideTrack>
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <LogoWrapper key={index}>
              <img src={logo} alt={`Cliente ${index}`} />
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
  padding: 24px 32px;
  gap: 32px;
  max-width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 600px) {
    padding: 16px;
    gap: 16px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #6d1622;
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
  height: 60px;
  background-color: #6d1622;

  @media (max-width: 600px) {
    height: 40px;
  }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Slider = styled.div`
  overflow: hidden;
  flex: 1;
  max-width: 100%;
`;

const SlideTrack = styled.div`
  display: flex;
  width: 200%;
  animation: ${scroll} 30s linear infinite;
`;

const LogoWrapper = styled.div`
  height: 40px;
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;

  img {
    max-height: 50px;
    max-width: 100%;
    object-fit: contain;
    
    @media (max-width: 600px) {
    height: 30px;
  }
  }

`;
