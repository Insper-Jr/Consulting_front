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
          <Title>
            <Line />
            Nossos <span>parceiros</span> que impulsionam nossas soluções:
          </Title>
          <Carousel>
            <Track>
              {logos.map((logo, index) => (
                <Logo key={index}>
                  <img src={logo} alt={`Parceiro ${index}`} />
                </Logo>
              ))}
            </Track>
          </Carousel>
        </CarouselWrapper>
      );
    };
  
  export default PartnersCarousel;
  
  const CarouselWrapper = styled.section`
  padding: 3rem 0rem;
  background: white;
  overflow: hidden;
`;


const Title = styled.h2`
font-family: "Montserrat", sans-serif;
font-size: 36px;
font-weight: 600;
text-align: center;
margin-bottom: 3rem;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 1rem;

span {
    color: #A10F23;
    }
    
    @media (max-width: 600px) {
        font-size: 18px;
        }
`;
        
const Line = styled.div`
    width: 300px;
    border: 2px solid #A10F23;
`
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Carousel = styled.div`
  overflow: hidden;
  width: 80%;
`;

const Track = styled.div`
  display: flex;
  gap: 3rem;
  animation: ${scroll} 30s linear infinite;
  width: max-content;
`;

const Logo = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 50px;
    width: auto;

    @media (max-width: 600px) {
      height: 35px;
    }
  }
`;
