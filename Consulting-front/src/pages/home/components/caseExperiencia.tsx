import styled from "styled-components";
import experiencia from "../../../assets/cases/experiencia.png";
import { useState } from "react";

const Experiencia = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Container hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={experiencia} alt="Consultoria estratégica" />
      <TextContent>
        <Title>
          EXPERIENCIA I
        </Title>
        <Description>
          O projeto foi um Bussines Plan completo para elaborar um curso de experiência do cliente. Os consultores realizaram um estudo de mercado para retirar insights valiosos que ajudaram na estruturação operacional do curso, assim como na sua estratégia de marketing. Por fim, o alinhamento da operação possibilitou que a equipe realizasse uma analise de viabilidade financeira do projeto.
        </Description>
      </TextContent>
    </Container>
  );
};

export default Experiencia;

const Container = styled.div<{ hovered: boolean }>`
  width: 40%;
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

  @media (max-width: 1200px) {
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

  @media (max-width: 1200px) {
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

  @media (max-width: 1200px) {
    width: 95%;
    padding: 1rem;
  }
`;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 0rem;
  color: #333;

  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;
