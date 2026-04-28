import styled from "styled-components";

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Rafaela Lima",
    role: "Fundadora",
    text: "Como empreendedor de primeira viagem, eu tinha uma ideia com muito potencial, mas precisava de apoio para estruturá-la. A Insper Jr. me ajudou a transformar essa ideia em um modelo de negócio viável e bem fundamentado. A análise de mercado trouxe dados valiosos sobre o setor, o plano estratégico de marketing definiu com precisão como e para quem comunicar minha proposta, e os planos operacional e financeiro me deram segurança para tirar o projeto do papel. Foi um divisor de águas para minha jornada empreendedora.",
  },
  {
    name: "Mariana Torres",
    role: "Diretora de Expansão",
    text: "Estávamos prontos para expandir nossa atuação para uma nova região, mas faltava clareza sobre onde e como começar. O plano de negócios desenvolvido pela Insper Jr. foi essencial para tomar essa decisão com segurança. A análise de mercado identificou tendências e lacunas importantes, enquanto o plano estratégico de marketing nos ajudou a definir nosso posicionamento. O projeto foi além das nossas expectativas.",
  },
  {
    name: "Felipe Rocha",
    role: "Co-Fundador e CEO",
    text: "Estávamos nos preparando para captar investimento, mas sabíamos que precisávamos profissionalizar nossa apresentação e embasar melhor nosso plano de crescimento. A Insper Jr. nos ajudou justamente com isso. O material final não só impressionou os investidores, como também nos deu mais clareza interna. Foi um marco na nossa trajetória.",
  },
  {
    name: "André Campos",
    role: "Ex-CEO e Fundador",
    text: "Depois de anos empreendendo, decidi vender meu negócio, mas não sabia como definir um valor justo nem como apresentar isso para o mercado. A Insper Jr. foi essencial nesse processo. O trabalho foi técnico, profissional e realmente fez a diferença no desfecho da venda.",
  },
];

const ClientsSay = () => {
  return (
    <Section>
      <TitleBlock>
        <Label>DEPOIMENTOS</Label>
        <Title>O que eles dizem</Title>
        <RedLine />
      </TitleBlock>
      <Grid>
        {testimonials.map((t, i) => (
          <Card key={i}>
            <QuoteMark>"</QuoteMark>
            <Quote>{t.text}</Quote>
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
  padding: 5rem 4rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: 600px) {
    padding: 3rem 1.5rem 4rem;
    gap: 2.5rem;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

const Label = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #691212;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #080f0f;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const RedLine = styled.div`
  width: 48px;
  height: 4px;
  background: #691212;
  border-radius: 2px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuoteMark = styled.span`
  font-family: Georgia, serif;
  font-size: 42px;
  line-height: 1;
  color: #691212;
  font-weight: 700;
  display: block;
  margin-bottom: -0.25rem;
`;

const Quote = styled.p`
  font-family: "Inter", sans-serif;
  font-style: italic;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: #3a3a3a;
  margin: 0;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.5rem;
`;

const Name = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #080f0f;
  margin: 0;
`;

const Role = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #6b6760;
  margin: 0;
`;
