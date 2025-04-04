import styled from "styled-components";
import SynergyCard from "@/components/synergyCard";
import imgMarketing from "../../../assets/synergy/marketing.png";
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
          image={imgMarketing}
          title="Plano Estratégico de Marketing"
          description="Desenvolva um site alinhado às suas metas de marketing. Com uma plataforma funcional e estratégica, você potencializa campanhas, atrai leads e converte visitantes em clientes."
          link="/marketing"
        />
        <SynergyCard
          image={imgMarket}
          title="Analise de Mercado"
          description="Entenda o comportamento do seu público online e o que a concorrência está fazendo. Um site bem desenvolvido, aliado a insights de mercado, garante uma presença digital competitiva e relevante."
          link="/market"
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
