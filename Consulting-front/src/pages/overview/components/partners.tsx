import styled, { keyframes } from "styled-components";
import accenture from "@/assets/partners/accenture.png";
import ambev from "@/assets/partners/ambev.png";
import bain from "@/assets/partners/bain.png";
import bcg from "@/assets/partners/bcg.png";
import data from "@/assets/partners/data.png";
import ey from "@/assets/partners/ey.png";
import igc from "@/assets/partners/igc.png";
import kearney from "@/assets/partners/kearney.png";
import lek from "@/assets/partners/lek.png";
import mckinsey from "@/assets/partners/mckinsey.png";
import peers from "@/assets/partners/peers.png";
import stone from "@/assets/partners/stone.png";
import trading from "@/assets/partners/trading-com-dados.png";
import visagio from "@/assets/partners/visagio.png";
import xp from "@/assets/partners/xp.png";

const logos = [
    accenture,
    ambev,
    bain,
    bcg,
    data,
    ey,
    igc,
    kearney,
    lek,
    mckinsey,
    peers,
    stone,
    trading,
    visagio,
    xp,
  ];

  const PartnersCarousel = () => {
    return (
        <CarouselWrapper>
          <TitleWrapper>
            <Line />
            <TitleRow>
              <Title>
                Nossos <span>parceiros</span> que impulsionam nossas soluções:
              </Title>
            </TitleRow>
          </TitleWrapper>
          <Slider>
            <SlideTrack>
              {[...logos, ...logos].map((logo, index) => (
                <LogoWrapper key={index}>
                  <img src={logo} alt={`Cliente ${index}`} />
                </LogoWrapper>
              ))}
            </SlideTrack>
          </Slider>
        </CarouselWrapper>
      );
    };
  
  export default PartnersCarousel;
  
  const CarouselWrapper = styled.section`
  padding: 3rem 0rem;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
        
const TitleWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 250px;
  border: 2px solid #A10F23;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-left: 250px;

  span {
    color: #A10F23;
  }

  @media (max-width: 600px) {
    margin-left: 0px;
    font-size: 20px;
  }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
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