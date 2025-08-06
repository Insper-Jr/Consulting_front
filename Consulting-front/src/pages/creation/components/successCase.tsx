import styled from "styled-components";
import pedireito from "../../../assets/creation/pe-direito.png";
import { useState } from "react";

const SuccessCase = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Wrapper>
    <Intro>CASE DE SUCESSO</Intro>
    <Container hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={pedireito} alt="Consultoria estratégica" />
      <TextContent>
        <Title>
        PÉ DIREITO I
        </Title>
        <Description>
        O projeto tinha como objetivo reforçar a segurança jurídica e padronizar documentos essenciais para as operações de uma organização do terceiro setor. Foram entregues três instrumentos estratégicos: um Contrato de Parceria claro e objetivo, que facilita a formalização de novos acordos; um Termo de Voluntariado revisado conforme o Marco Legal, trazendo mais segurança às relações institucionais; e um Termo de Uso de Imagem adequado à LGPD, garantindo transparência na comunicação. Uma entrega completa para quem busca crescer com solidez e conformidade.
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

    @media (max-width: 1200px) {
    width: 800px;
    height: 450px;
    gap: 1rem;
  }
  @media (max-width: 800px) {
    width: 80%;
    height: auto;
    flex-direction: column;
    gap: 1rem;
  }
  @media (max-width: 500px) {
      border-right: 0px solid #A10F23;
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
