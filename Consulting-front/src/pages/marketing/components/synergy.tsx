import styled from "styled-components";
import SynergyCard from "@/components/synergyCard";
import imgData from "../../../assets/synergy/data.png";
import imgMarket from "../../../assets/synergy/market.png";

const Synergy = () => {
  return (
    <Section>
      <Header>
        <Title>Melhore seu projeto com soluções sinérgicas</Title>
        <Line />
      </Header>

      <Subtitle>
        A Insper Jr. valoriza muito que cada projeto tem uma solução. Personalize seu projeto adicionando novos escopos, deixando sua solução mais completa!
      </Subtitle>

      <CardsWrapper>
        <SynergyCard
          image={imgData}
          title="Analise de Dados"
          description="Transforme dados em ações! Analise desempenho, comportamento do cliente e eficácia de campanhas para tomar decisões embasadas e maximizar resultados."
          link="/dados"
        />

        <SynergyCard
          image={imgMarket}
          title="Analise de Mercado"
          description="Entenda seu mercado, concorrência e público-alvo com insights precisos para alinhar estratégias às demandas reais e posicionar sua marca de forma competitiva."
          link="/mercadologica"
        />
      </CardsWrapper>
    </Section>
  );
};

export default Synergy;

const Section = styled.section`
  padding: 4rem 0rem;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  color: #A10F23;
  white-space: nowrap;
  padding-left: 2rem;
`;

const Line = styled.hr`
  flex-grow: 1;
  height: 2px;
  background-color: black;
  border: none;
  margin: 0;
  width: 100%;
`;

const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  margin: 1.5rem auto 2rem auto;
  max-width: 800px;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;
