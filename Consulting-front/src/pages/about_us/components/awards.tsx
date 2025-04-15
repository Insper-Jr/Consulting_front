import React from "react";
import styled from "styled-components";
// Ajuste os imports das imagens conforme a localização real em seu projeto
import falconiLogo from "../../../assets/awards/falconi.png";
import brasilJuniorLogo from "../../../assets/awards/brasil_junior.png";

const Awards = () => {
  return (
    <AwardsContainer>
      <AwardItem>
        <img src={falconiLogo} alt="Falconi" />
        <Text>Premio Falconi em gestão de empresas</Text>
      </AwardItem>

      <AwardItem>
        <img src={brasilJuniorLogo} alt="Brasil Júnior" />
        <Text>Considerados uma empresa de alto impacto pela Brasil Júnior</Text>
      </AwardItem>
    </AwardsContainer>
  );
};

export default Awards;

// =============== STYLED COMPONENTS ===============
const AwardsContainer = styled.section`
  display: flex;
  justify-content: center; /* Centraliza os elementos horizontalmente */
  align-items: flex-start;
  gap: 12rem; /* Espaçamento horizontal entre os itens */
  padding: 2rem;
  margin-top: 100px;

  /* Responsividade: em telas menores, empilhe os itens verticalmente */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  @media (max-width: 1300px) {
    gap: 5rem; /* Espaçamento horizontal entre os itens */
  }
`;

const AwardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza a imagem e o texto no eixo horizontal */
  text-align: center;  /* Centraliza o texto */
  img{
    width: 400px; /* Ajuste o tamanho da imagem conforme necessário */
    }
    @media (max-width: 1300px) {
    img{
      width: 200px; /* Ajuste o tamanho da imagem conforme necessário */
      }
  }
  @media (max-width: 600px) {
    img{
      width: 180px; /* Ajuste o tamanho da imagem conforme necessário */
      }
  }

`;

const Text = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  margin-top: 1rem;
  font-weight: 800;
  width: 500px; /* Largura máxima do texto */
  @media (max-width: 1300px) {
    font-size: 20px;
  }
  @media (max-width: 600px) {
    font-size: 15px;
      width: 300px; /* Largura máxima do texto */
  }
`;
