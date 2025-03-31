import styled from "styled-components";
import consultoria from "../../../assets/cases/consultoria.png";
import { useState } from "react";

const CaseCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Container hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={consultoria} alt="Consultoria estratégica" />
      <TextContent>
        <Title>
          Como a consultoria estratégica pode <br /> alavancar seu negócio
        </Title>
        <Description>
          No cenário competitivo atual, tomar decisões estratégicas embasadas pode ser a diferença entre o crescimento e a estagnação. A consultoria estratégica auxilia empresas a identificar oportunidades, otimizar processos e criar vantagens competitivas. Descubra como essa abordagem pode transformar sua empresa!
        </Description>
      </TextContent>
    </Container>
  );
};

export default CaseCard;

const Container = styled.div<{ hovered: boolean }>`
  width: 80%;
  max-width: 1200px;
  height: 350px;
  display: flex;
  flex-direction: row;
  border-top: ${({ hovered }) => (hovered ? "2px solid #A10F23" : "2px solid #929090")};
  border-bottom: ${({ hovered }) => (hovered ? "2px solid #A10F23" : "2px solid #929090")};
  transition: border 0.3s ease, transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 900px) {
    width: 90%;
    height: auto;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Image = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 900px) {
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

  @media (max-width: 900px) {
    width: 100%;
    padding: 1rem;
  }
`;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 0rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
