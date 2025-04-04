import styled from "styled-components";
import SynergyCard from "@/components/synergyCard";
import imgFinancial from "../../../assets/synergy/financial.png";
import imgMarketing from "../../../assets/synergy/marketing.png";

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
          image={imgMarketing}
          title="Plano Estratégico de Marketing"
          description="Utilize dados para entender o comportamento do consumidor e o desempenho das campanhas. A análise de dados permite criar estratégias de marketing mais assertivas, personalizadas e orientadas a resultados."
          link="/marketing"
        />

        <SynergyCard
          image={imgFinancial}
          title="Viabilidade Financeira"
          description="Transforme dados em decisões financeiras estratégicas. Com a análise de dados, você identifica padrões de custos, receitas e oportunidades, garantindo um planejamento financeiro mais preciso e eficiente."
          link="/financial"
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
  flex-wrap: wrap;
  margin-top: 32px;
gap: 80px;
`;
