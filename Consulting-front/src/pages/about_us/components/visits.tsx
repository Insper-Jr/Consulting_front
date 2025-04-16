import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretLeft, CaretRight } from "phosphor-react";

// Importação das fotos das visitas
import img1 from '../../../assets/visits/bain.png';
import img2 from '../../../assets/visits/ubs.png';
import img3 from '../../../assets/visits/visita-insper.png';

// Exemplo de slides: cada sub-array pode conter uma ou mais imagens.
// Aqui, cada "slide" contém somente 1 imagem, mas você pode agrupar mais se quiser.
const slides = [
  [
    { src: img1, alt: 'Visita Bain 1' },
  ],
  [
    { src: img2, alt: 'Visita Bain 2' },
  ],
  [
    { src: img3, alt: 'Visita Insper' },
  ],
];

function VisitCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Voltar ao slide anterior (com wrap-around)
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Avançar ao próximo slide (com wrap-around)
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <CarouselContainer>
      {/* Seta esquerda */}
      <StyledCaretLeft size={80} weight="light" onClick={handlePrev} />

      {/* Área que exibe o slide atual */}
      <SlideWrapper>
        {slides[currentSlide].map((image, index) => (
          <Photo key={index} src={image.src} alt={image.alt} />
        ))}
      </SlideWrapper>

      {/* Seta direita */}
      <StyledCaretRight size={80} weight="light" onClick={handleNext} />
    </CarouselContainer>
  );
}

export default VisitCarousel;

/* ============================
       Styled-components
   ============================ */

// Contêiner principal do carrossel
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Ajuste conforme desejar */
  margin-top: 50px;
  position: relative;
`;

// Ícone estilizado para seta à esquerda
const StyledCaretLeft = styled(CaretLeft)`
  margin-right: 100px;
  cursor: pointer;
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
  cursor: pointer;
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

// Área do slide atual
const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Se quiser as fotos lado a lado, troque para row */
  align-items: center;
  justify-content: center;
  gap: 3rem;
  transition: all 0.5s ease;
`;

// Cada foto exibida no slide
const Photo = styled.img`
  width: 800px;    /* Ajuste conforme necessário */
  height: 400px; 
  object-fit: cover; /* ou 'contain' dependendo do efeito desejado */

  @media (max-width: 1200px) {
    width: 800px;
    height: 400px; 
  }
  @media (max-width: 600px) {
    width: 250px;
      height: 150px; 
  }
`;
