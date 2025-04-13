import React from "react";
import styled from "styled-components";

const InsperStats = () => {
  // Dados de exemplo: ajuste conforme necessário
  const stats = [
    { value: "+500", label: "Projetos Realizados" },
    { value: "+24", label: "Anos de Mercado" },
    { value: "+60", label: "Membros" },
    { value: "+90", label: "Índice NPS" },
  ];

  return (
    <StatsSection>
      {/* Título centralizado com linhas nas laterais */}
      <TitleWrapper>
        <Line />
        <h2>Estatísticas da Insper Jr.</h2>
        <Line />
      </TitleWrapper>

      {/* Container com os 4 indicadores */}
      <SecondContainer>
      <StatsRow>
        {stats.map((stat, idx) => (
          <StatCard key={idx}>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsRow>
      </SecondContainer>
    </StatsSection>
  );
};

export default InsperStats;

// =============== STYLED COMPONENTS ===============
const StatsSection = styled.section`
    padding: 0;
  max-width: 100%;
  margin: 0;
`;

const TitleWrapper = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 40px;
    color: #A10F23;
    white-space: nowrap;
  }
@media (max-width: 600px) {
  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 26px;
    color: #A10F23;
    white-space: nowrap;
  }
  }
`;

const Line = styled.div`
  height: 2px;
  background-color: #000; /* Cor da linha */
  width: 100%; /* Largura da linha */

`;

const SecondContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`;
const StatsRow = styled.div`
  display: flex;
  justify-content: space-around; /* Distribui as estatísticas horizontalmente */
  flex-wrap: wrap; /* Permite quebrar linha em telas pequenas */
  gap: 1rem;       /* Espaço entre as estatísticas no wrap */
  width: 70%;
 @media (max-width: 1300px) {
     width: 90%;
}


`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;  /* Largura mínima para cada bloco */
`;

const StatValue = styled.span`
    font-family: "Montserrat", sans-serif;
  font-size: 40px;  /* Tamanho grande para o valor numérico */
  font-weight: bold;
  color: #000; 
  @media (max-width: 1300px) {
    font-size: 35px;
}
     @media (max-width: 600px) {
    font-size: 25px;
} /* Pequeno espaçamento acima do label */
`;

const StatLabel = styled.span`
    font-family: "Montserrat", sans-serif;
  font-size:30px;
  color: #000;
  margin-top: 4px; 
@media (max-width: 1300px) {
    font-size: 25px;
} /* Pequeno espaçamento acima do label */
 @media (max-width: 600px) {
    font-size: 15px;
} /* Pequeno espaçamento acima do label */
`;
