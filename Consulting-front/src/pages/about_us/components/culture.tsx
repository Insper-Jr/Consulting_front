import React from "react";
import styled from "styled-components";

/**
 * Exemplo de conteúdo que pode ser exibido
 * (título + descrição para cada pilar).
 */
const culturaItems = [
  {
    title: "Parceria:",
    description:
      "Estar disponível para ajudar, estar engajado e compartilhando conhecimento com o grupo, além de demonstrar quando precisa de ajuda",
  },
  {
    title: "Geração de Valor:",
    description:
      "Mudar realidades, buscar trazer e explorar novos insumos, estar One Step Ahead",
  },
  {
    title: "Superação:",
    description:
      "Buscar sair da zona de conforto, crescer, lidar de maneira construtiva com as dificuldades e assumir novas responsabilidades",
  },
  {
    title: "Proatividade:",
    description:
      "Correr atrás, ser presente, se motivar diante de desafios e ter iniciativa",
  },
];

function OurCulture() {
  return (
    <CulturaSection>
      <CulturaTitleWrapper>
        <CulturaLine />
        <h2>Nossa Cultura</h2>
        <CulturaLine />
      </CulturaTitleWrapper>

      <CulturaContainer>
        {culturaItems.map((item, index) => (
          <CulturaCard key={index}>
            <CulturaCardTitle>{item.title}</CulturaCardTitle>
            <CulturaCardText>{item.description}</CulturaCardText>
          </CulturaCard>
        ))}
      </CulturaContainer>
    </CulturaSection>
  );
}

export default OurCulture;

/* ============================
      Styled-components
============================ */

// Seção principal
const CulturaSection = styled.section`
  padding: 2rem 0;
  max-width: 100%;
  margin-top: 80px;
`;

// Título + linhas
const CulturaTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    color: #a10f23;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 26px;
    }
  }
`;

// Linha horizontal (igual ao Line no exemplo anterior)
const CulturaLine = styled.div`
  height: 2px;
  background-color: #000;
  width: 100%;
`;

// Contêiner principal para os itens de cultura
const CulturaContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* permite quebra de linha se necessário */
  gap: 6rem;
  width: 80%;
  margin: 0 auto; /* centraliza o container */

  @media (max-width: 1300px) {
    width: 90%;
      gap: 2.5rem;
  }
`;

// Cada "cartão" de cultura (coluna)
const CulturaCard = styled.div`
  flex: 1 1 200px; /* permite que cada card ocupe espaço flexível */
  display: flex;
  flex-direction: column;
  max-width: 300px; /* limite de largura para cada card */
`;

// Título dentro de cada cartão
const CulturaCardTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 22px;
  color: #000;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    font-size: 18px;
  }
        @media (min-width:600px) and (max-width: 1200px) {
    font-size: 18px;
  }
`;

// Texto descritivo de cada cartão
const CulturaCardText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: #333;
  line-height: 1.4;

  @media (max-width: 600px) {
    font-size: 14px;
  }
    @media (min-width:600px) and (max-width: 1200px) {
    font-size: 14px;
  }
`;
