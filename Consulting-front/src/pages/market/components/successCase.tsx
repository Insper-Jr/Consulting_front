import styled from "styled-components";
import solar from "../../../assets/cases/preparo.png";
import { useState } from "react";

const SuccessCase = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Wrapper>
    <Intro>CASE DE SUCESSO</Intro>
    <Container hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={solar} alt="Consultoria estratégica" />
      <TextContent>
        <Title>
          PREPARO I
        </Title>
        <Description>
        O PreparoI teve como objetivoa realização de uma  análise mercadológica para umastartup do ramo  educacional. Esta tinha o objetivo de conectar  jovensuniversitários destaques a grandes  empresasdo mercado de trabalho. Assim,  identificamosospossíveis cenários em que a  empresa atuaria, emtermos econômicos e sociais,  além da estimativa de um tamanho de mercado  (TAM). Junto a isso, devido a importância de  identificar seus concorrentes, construímos um  mapaconcorrencial, que deu uma boa visão  sobrea diferenciação da empresa, em relação às  demais. Logo, conseguimosidentificar as  oportunidades e ameaças do cenário socio-  econômico, e as forças e fraquezas da empresa,em  relação aos seus competidores. Tudoisso, ajudou a  tornar mais claro o caminho em que startup  seguirá.
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
  border-top: ${({ hovered }) => (hovered ? "2px solid #A10F23" : "2px solid #929090")};
  border-bottom: ${({ hovered }) => (hovered ? "2px solid #A10F23" : "2px solid #929090")};
  border-right: ${({ hovered }) => (hovered ? "2px solid #A10F23" : "0px solid #A10F23")};
  transition: border 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 800px) {
    width: 80%;
    height: auto;
    flex-direction: column;
    gap: 1rem;
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
  color:#A10F23;

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
