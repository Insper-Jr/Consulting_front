import React from "react";
import styled from "styled-components";

// Agora o componente recebe `className` e o passa para o LineContainer
interface LineWithCirclesProps {
  className?: string;
}

const LineWithCircles: React.FC<LineWithCirclesProps> = ({ className }) => {
  return (
    <LineContainer className={className}>
      <Circle />
      <Line />
      <Circle />
    </LineContainer>
  );
};

export default LineWithCircles;

// ========== STYLED COMPONENTS ==========
const LineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 16px;    /* Ajuste o tamanho do círculo aqui */
  height: 16px;
  border-radius: 50%;
  background-color: #A10F23; /* Cor do círculo */
  margin: 0;
`;

const Line = styled.div`
  flex: 1;  /* Faz a linha ocupar todo o espaço horizontal disponível */
  height: 2px; /* Espessura da linha */
  background-color: #A10F23; /* Cor da linha */
  margin: 0; /* Espaçamento horizontal entre os círculos e a linha */
  width: 100%;

`;
