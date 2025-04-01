import styled from "styled-components";
import SynergyCard from "@/components/synergyCard";
import imgFinancial from "../../../assets/synergy/financial.png";
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
          image={imgMarket}
          title="Analise de Mercado"
          description="Aproveite o planejamento financeiro para alinhar seus investimentos às tendências e oportunidades do mercado. Com uma análise mercadológica precisa, você direciona recursos de forma estratégica, maximizando retornos e minimizando riscos."
          link="/mercadologica"
        />

        <SynergyCard
          image={imgFinancial}
          title="Analise de Dados"
          description="Utilize dados para tomar decisões financeiras mais embasadas. A análise de dados ajuda a identificar padrões, prever cenários e ajustar estratégias, garantindo um planejamento financeiro sólido e adaptável."
          link="/dados"
        />

      </CardsWrapper>
    </Section>
  );
};

export default Synergy;
const Section = styled.section`
  padding: 64px 0px;
  text-align: center;
  width:100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  /* Removemos o flex-direction: column para manter os itens na mesma linha */
  flex-wrap: nowrap; /* Garante que os itens não quebrem a linha */
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  color: #A10F23;
  white-space: nowrap;
  padding-left: 32px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Line = styled.hr`
  flex-grow: 1;
  height: 2px;
  background-color: black;
  border: none;
  margin: 0;
  width: 0px;
`;

const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  margin: 24px auto 32px auto;
  max-width: 800px;
  @media(max-width:768px){
  font-size:15px;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  flex-wrap: wrap;
  margin-top: 32px;
`;
