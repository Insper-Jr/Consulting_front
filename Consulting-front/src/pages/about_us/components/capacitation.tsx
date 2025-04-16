import React from 'react';
import styled from 'styled-components';
import img from '../../../assets/capacitation/aula.png';
import PartnerCarousel from './carroselPartners';

function CapacitationComponent() {
  return (
    <Container>
      {/* Overlay para tornar a imagem de fundo mais opaca */}
      <Overlay />

      <LeftSection>
        <Title>Capacitação</Title>
        <RedLine />
        <Description>
          Ao ingressar na Insper Jr., nossos consultores passam por 
          uma intensa capacitação, com mais de 200 horas de 
          treinamento. Assim, construímos uma equipe qualificada 
          e preparada para realizar os melhores projetos.
        </Description>
      </LeftSection>

      <WhiteRectangle>
        <PartnerCarousel />
      </WhiteRectangle>
    </Container>
  );
}

export default CapacitationComponent;

/* Estilização com styled-components */

// Container principal com a imagem de fundo
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 600px; /* Ajuste a altura conforme necessário */
  background: url(${img}) center center no-repeat;
  background-size: cover;
  position: relative; /* Necessário para posicionar o overlay absoluto */
  margin-top:50px;
  
  @media (max-width: 600px) {
    flex-direction: column;  /* Coloca as seções em coluna em telas pequenas */
    height: 600px;  /* Ajusta a altura para conteúdo */
    padding-bottom: 2rem;
  }
`;

// Overlay para deixar a imagem de fundo opaca.
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5; /* Ajuste a opacidade conforme necessário */
  z-index: 1;
`;

// Seção da esquerda com título, linha vermelha e descrição.
const LeftSection = styled.div`
  flex: 1;
  position: relative; 
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 50px;
  color: #fff;
  
  @media (max-width: 600px) {
    padding-left: 20px;
    padding-top: 20px;
  }
`;

// Título "Capacitação".
const Title = styled.h1`
  font-size: 50px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  
  @media (max-width: 1300px) {
    font-size: 60px;
  }
  
  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

// Linha vermelha abaixo do título.
const RedLine = styled.div`
  width: 350px;   /* Ajuste o tamanho conforme o design desejado */
  height: 2px;    /* Espessura da linha */
  background-color: #FF0000;
  margin-bottom: 1rem;  /* Espaçamento abaixo da linha */
  
  @media (max-width: 1300px) {
    width: 350px; 
  }
  
  @media (max-width: 600px) {
    width: 200px;
  }
`;

// Texto descritivo.
const Description = styled.p`
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  line-height: 1.5;
  max-width: 800px;
  margin-top: 50px;
  font-weight: 200;
  
  @media (min-width:1200px) and (max-width: 1300px) {
    font-size: 20px;
    max-width: 600px;
  }
  
  @media (max-width: 1200px){
    max-width: 500px;
    font-size: 20px;
  }
  
  @media (max-width: 600px) {
    font-size: 16px;
    max-width: 500px;
    margin-top: 30px;
  }
`;

// Retângulo branco à direita.
const WhiteRectangle = styled.div`
  width: 600px;
  height: 420px;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  margin-top: 180px;
  
  @media (min-width:1200px) and (max-width: 1300px){
    width: 500px;
  }
  
  @media (min-width: 600px) and (max-width: 1200px){
    width: 400px;
    height: 400px;
    margin-top: 250px;
  }
  
  @media (max-width: 600px){
    width: 70%;
    height: 200px;
    margin-top: 100px;

  }
`;
