import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretLeft, CaretRight } from "phosphor-react";
// Importação das imagens dos parceiros
import accentureImg from '../../../assets/partners/accenture.png';
import ambevImg from '../../../assets/partners/ambev.png';
import bainImg from '../../../assets/partners/bain.png';
import bcgImg from '../../../assets/partners/bcg.png';
import dataImg from '../../../assets/partners/data.png';
import eyImg from '../../../assets/partners/ey.png';
import igcImg from '../../../assets/partners/igc.png';
import kearneyImg from '../../../assets/partners/kearney.png';
import lekImg from '../../../assets/partners/lek.png';
import mckinseyImg from '../../../assets/partners/mckinsey.png';
import peersImg from '../../../assets/partners/peers.png';
import stoneImg from '../../../assets/partners/stone.png';
import tradingImg from '../../../assets/partners/trading-com-dados.png';
import visagioImg from '../../../assets/partners/visagio.png';
import xpImg from '../../../assets/partners/xp.png';

// Array de slides, cada um contendo 3 parceiros
const slides = [
  [
    { src: accentureImg, alt: 'Accenture' },
    { src: ambevImg, alt: 'Ambev' },
    { src: bainImg, alt: 'Bain' },
  ],
  [
    { src: bcgImg, alt: 'BCG' },
    { src: dataImg, alt: 'Data' },
    { src: eyImg, alt: 'EY' },
  ],
  [
    { src: igcImg, alt: 'IGC' },
    { src: kearneyImg, alt: 'Kearney' },
    { src: lekImg, alt: 'L.E.K.' },
  ],
  [
    { src: mckinseyImg, alt: 'McKinsey & Company' },
    { src: peersImg, alt: 'Peers' },
    { src: stoneImg, alt: 'Stone' },
  ],
  [
    { src: tradingImg, alt: 'Trading com Dados' },
    { src: visagioImg, alt: 'Visagio' },
    { src: xpImg, alt: 'XP' },
  ],
];

function PartnerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Função para ir ao slide anterior (com wrap-around)
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Função para ir ao próximo slide (com wrap-around)
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <CarouselContainer>
      {/* Botão para slide anterior usando o ícone estilizado */}

        <StyledCaretLeft size={80} weight="light" onClick={handlePrev} />

      {/* Área do slide atual */}
      <SlideWrapper>
        {slides[currentSlide].map((logo, index) => (
          <Logo key={index} src={logo.src} alt={logo.alt} />
        ))}
      </SlideWrapper>

      {/* Botão para próximo slide usando o ícone estilizado */}
        <StyledCaretRight size={80} weight="light" onClick={handleNext}/>

    </CarouselContainer>
  );
}

export default PartnerCarousel;

/* ============================
       Styled-components
   ============================ */

// Contêiner principal do carrossel
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px; /* Ajuste conforme necessário */
  margin: 0 auto;
  position: relative;
`;



// Ícone estilizado para seta à esquerda
const StyledCaretLeft = styled(CaretLeft)`
margin-right: 100px;
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
     @media (max-width: 1200px) {
     margin-right: 80px;
        }
    @media (max-width: 600px) {
    margin-right: 50px;
        }
`;

// Ícone estilizado para seta à direita
const StyledCaretRight = styled(CaretRight)`
margin-left: 100px;
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
 @media (max-width: 1200px) {
     margin-left: 80px;
        }
@media (max-width: 600px) {
    margin-left: 50px;
        }
`;

// Área que contém o slide atual
const SlideWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column; /* Caso queira exibir os logos lado a lado, utilize "row" */
  align-items: center;
  justify-content: center;
  gap: 5rem; /* Espaço entre os logos */
  transition: all 0.5s ease;
    @media (max-width: 1200px) {
     gap: 3rem; /* Espaço entre os logos */
        }
`;

// Cada logo exibido no slide
const Logo = styled.img`
  width: 300px;
  height: 100px;
  object-fit: contain;
  @media (min-width:1200px) and (max-width: 1300px) {
    width: 200px;
        }
    @media (max-width: 1200px) {
    width: 150px;
        }
        @media (max-width: 600px) {
    width: 100px;
        }
`;
