import styled from "styled-components";

import logoVitalab from "../../../assets/clients/vitalab.png";
import logoCarrefour from "../../../assets/clients/carrefour.png";
import logoWise from "../../../assets/clients/wise.png";
import logoFaberCastell from "../../../assets/clients/faber_castell.png";

type Testimonial = {
  name: string;
  role: string;
  text: string;
  companyLogo?: string;
  logoScale?: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Rafaela Lima",
    role: "Fundadora",
    text: "Como empreendedor de primeira viagem, eu tinha uma ideia com muito potencial, mas precisava de apoio para estruturá-la. A Insper Jr. me ajudou a transformar essa ideia em um modelo de negócio viável e bem fundamentado. A análise de mercado trouxe dados valiosos sobre o setor, o plano estratégico de marketing definiu com precisão como e para quem comunicar minha proposta, e os planos operacional e financeiro me deram segurança para tirar o projeto do papel. Foi um divisor de águas para minha jornada empreendedora.",
    companyLogo: logoVitalab,
  },
  {
    name: "Mariana Torres",
    role: "Diretora de Expansão",
    text: "Estávamos prontos para expandir nossa atuação para uma nova região, mas faltava clareza sobre onde e como começar. O plano de negócios desenvolvido pela Insper Jr. foi essencial para tomar essa decisão com segurança. A análise de mercado identificou tendências e lacunas importantes, enquanto o plano estratégico de marketing nos ajudou a definir nosso posicionamento. Já os planos operacional e financeiro nos deram uma visão concreta de como escalar com eficiência. O projeto foi além das nossas expectativas.",
    companyLogo: logoCarrefour,
    logoScale: 1.4,
  },
  {
    name: "Felipe Rocha",
    role: "Co-Fundador e CEO",
    text: "Estávamos nos preparando para captar investimento, mas sabíamos que precisávamos profissionalizar nossa apresentação e embasar melhor nosso plano de crescimento. A Insper Jr. nos ajudou justamente com isso. A análise mercadológica mostrou o potencial do setor com dados atualizados e consolidou nossa visão de longo prazo e o plano financeiro deu robustez às nossas projeções. O material final não só impressionou os investidores, como também nos deu mais clareza interna. Foi um marco na nossa trajetória.",
    companyLogo: logoWise,
    logoScale: 1.4,
  },
  {
    name: "André Campos",
    role: "Ex-CEO e Fundador",
    text: "Depois de anos empreendendo, decidi vender meu negócio, mas não sabia como definir um valor justo nem como apresentar isso para o mercado. A Insper Jr. foi essencial nesse processo. O valuation trouxe uma visão clara e bem embasada do valor da empresa, considerando tanto os números quanto o potencial do negócio. Além disso, o pitch criado pela equipe me deu confiança para conversar com investidores e conduzir as negociações com muito mais segurança. O trabalho foi técnico, profissional e realmente fez a diferença no desfecho da venda.",
    companyLogo: logoFaberCastell,
    logoScale: 1.4,
  },
];

const ClientsSay = () => {
  return (
    <Section>
      <TitleWrapper>
        <RedBar />
        <TitleGroup>
          <Title>
            O que <span>nossos clientes</span> dizem
          </Title>
          <Subtitle>Depoimentos</Subtitle>
        </TitleGroup>
      </TitleWrapper>
      <Grid>
        {testimonials.map((t, i) => (
          <Card key={i}>
            <LogoSlot
              style={{ ["--logo-scale" as string]: t.logoScale ?? 1 }}
            >
              {t.companyLogo && <img src={t.companyLogo} alt="" />}
            </LogoSlot>
            <Quote>“{t.text}”</Quote>
            <Person>
              <Name>{t.name}</Name>
              <Role>{t.role}</Role>
            </Person>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ClientsSay;

const Section = styled.section`
  background: white;
  padding: 4rem 4rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem 3rem;
    gap: 2rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 600px) {
    gap: 0.75rem;
  }
`;

const RedBar = styled.div`
  width: 4px;
  height: 56px;
  background-color: #691212;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #080f0f;
  margin: 0;
  line-height: 1.2;

  span {
    color: #691212;
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #080f0f;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 2rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const LogoSlot = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  img {
    max-height: 50px;
    max-width: 180px;
    object-fit: contain;
    transform: scale(var(--logo-scale, 1));
    transform-origin: left center;
  }

  @media (max-width: 600px) {
    height: 50px;
    margin-bottom: 1rem;

    img {
      max-height: 40px;
      max-width: 140px;
    }
  }
`;

const Quote = styled.p`
  font-family: "Inter", sans-serif;
  font-style: italic;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #080f0f;
  margin: 0;
`;

const Name = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: #080f0f;
  margin: 0;
`;

const Role = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #080f0f;
  margin: 0;
`;
