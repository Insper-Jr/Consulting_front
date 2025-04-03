import styled from "styled-components";
import solar from "../../../assets/cases/solar.png";
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
          SOLAR I
        </Title>
        <Description>
        O projeto teve como foco principal auxiliar na estruturação financeira de uma startup que unia os mercados de cosméticos e esportes, com produtos de autocuidado voltados para atletas e entusiastas. O financeiro foi um dos pilares mais robustos do projeto, destacando-se pela utilização de ferramentas estatísticas avançadas para simular prazos de pagamento e projetar o decaimento do WACC por meio de uma função logarítmica simulada em R. A planilha financeira desenvolvida foi altamente detalhada e automatizada. Além disso, foram criadas premissas financeiras sólidas e alinhadas às expectativas do cliente, garantindo que as projeções fossem realistas e aplicáveis ao contexto do negócio. Essa abordagem permitiu uma visão clara e embasada da viabilidade financeira da startup, contribuindo para a tomada de decisões estratégicas e a atração de potenciais investidores.
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
