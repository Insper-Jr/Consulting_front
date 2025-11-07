import React, { useState } from "react";
import styled from "styled-components";
import img from '../../../assets/faq/arrow_faq.png'
// import removed as Line is declared locally

// Exemplo de dados (perguntas e respostas). Substitua conforme suas FAQs.
const faqs = [
  {
    question: "O que é uma Empresa Júnior?",
    answer: (
      <>
        Uma <strong>Empresa Júnior</strong> é uma organização sem fins lucrativos, gerida por estudantes universitários, que presta serviços e consultorias para empresas, empreendedores e sociedade em geral. O objetivo principal é <strong>proporcionar aos alunos uma experiência prática no mercado de trabalho</strong>, permitindo que apliquem os conhecimentos adquiridos em sala de aula na resolução de desafios reais.
      </>
    ),
  },
  {
    question: "Por que contratar uma Empresa Júnior?",
    answer: (
        <>
         Contratar uma <strong>Empresa Júnior</strong> é <strong>uma excelente escolha para empresas</strong>, empreendedores e organizações <strong>que buscam soluções inovadoras, de qualidade e a um custo acessível</strong>. Geridas por estudantes universitários com o apoio de professores e especialistas, essas empresas combinam conhecimento acadêmico atualizado com a vontade de entregar projetos eficientes e bem estruturados.
        </>
      ),
    },
  {
    question: "Por que escolher a Insper Jr.?",
    answer: (
        <>
            A Insper Jr. se destaca pela qualidade, inovação e profissionalismo em seus projetos. Além disso, oferecemos um <strong>atendimento personalizado</strong>, entendendo a fundo as necessidades de cada cliente para entregar soluções estratégicas e eficientes. Trabalhamos com metodologias modernas, suporte de professores e especialistas, <strong>garantindo análises embasadas e recomendações sólidas para o sucesso do seu negócio</strong>.
        </>
      ),
  },
  {
    question: "Quem vai executar meu projeto?",
    answer: (
        <>
            Os projetos da Insper Jr. são executados por <strong>consultores altamente capacitados</strong>, que estão <strong>cursando um dos sete cursos do Insper:</strong> Administração, Economia, Direito, Engenharia de Computação, Engenharia Mecânica, Engenharia Mecatrônica e Ciência da Computação.
        </>
      ),
  },
  {
    question: "Como posso contratar um serviço?",
    answer: (
        <>
           Basta preencher o <strong>formulário de diagnóstico gratuito</strong> no início da página para que nossa equipe entre em contato com você. Caso prefira, também estamos disponíveis pelo <strong>WhatsApp: (11) 9 9898-3364</strong>ou pelo <strong>E-mail: pedrodp@insperjr.com</strong>.
        </>
      ),
  },
  {
    question: "Como funciona o processo de desenvolvimento de um projeto?",
    answer: (
        <>
           Após o <strong>primeiro contato</strong> via formulário, telefone ou e-mail, agendamos uma <strong>reunião inicial</strong> para entender suas necessidades e desafios. Caso haja interesse em um de nossos projetos, elaboramos uma <strong>proposta personalizada</strong> detalhando escopo, metodologia e prazos. Com a aprovação, um <strong>time especializado é alocado</strong> para desenvolver a solução, garantindo um projeto estruturado, eficiente e alinhado aos seus objetivos.
        </>
      ),
  },
  {
    question: "Posso contratar mais de um serviço ao mesmo tempo?",
    answer: (
        <>
            <strong>Sim!</strong> A Insper Jr. pode e costuma desenvolver projetos simultâneos para um mesmo cliente. Por exemplo, podemos realizar um Plano de Marketing junto com uma Análise de Dados, ajudando a entender melhor o público-alvo e direcionar estratégias eficazes. Outra possibilidade é combinar Desenvolvimento Web com Planejamento Financeiro, garantindo não apenas uma plataforma digital funcional, mas também um modelo financeiro sustentável para seu negócio.
        </>
      ),
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // Se clicar na pergunta já aberta, fecha; caso contrário, abre a nova.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      <TitleBar>
        <Line />
        <Title>Perguntas Frequentes</Title>
        <Line />
      </TitleBar>

      <QuestionsContainer>
        {faqs.map((item, index) => {
          const isOpen = index === activeIndex;
          return (
            <QuestionItem key={index}>
              <QuestionHeader onClick={() => handleToggle(index)}>
                <QuestionText>{item.question}</QuestionText>
                <ArrowIcon isOpen={isOpen} src={img} alt="arrow icon" />
              </QuestionHeader>
              {/* Sempre renderiza o Answer e o Divider e passa isOpen */}
              <Answer isOpen={isOpen}>{item.answer}</Answer>
              <Divider isOpen={isOpen} />
            </QuestionItem>
          );
        })}
      </QuestionsContainer>
    </FAQContainer>
  );
};

export default FAQ;

/* ======================== Styled Components ======================== */

/* Container geral do FAQ */
const FAQContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  font-family: "Montserrat", sans-serif;
  color: #000;
  padding-top: 16px;
  padding-left: 0;

  @media (max-width: 600px) {
    padding:0;
  }
`;

/* Barra do título (com linhas nas laterais) */
const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  padding: 0;
   gap: 1rem;
  position: relative;
  width: 100%;
  }
`;
const Line = styled.div`
  height: 2px;
  background-color: black;
  width: 100%;
  `;

/* Título em si */
const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

/* Container para agrupar todas as perguntas */
const QuestionsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-top: 8px;
  }
`;

/* Cada bloco (pergunta + resposta) */
const QuestionItem = styled.div`
  margin-bottom: 20px;
  width: 90%;

  @media (max-width: 600px) {
    margin-bottom: 12px;
  }
`;

/* Cabeçalho da pergunta: texto e seta */
const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 12px 0;

  @media (max-width: 600px) {
    padding: 8px 0;
  }
`;

/* Texto da pergunta */
const QuestionText = styled.span`
  font-size: 28px;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

/* Ícone da seta (usando imagem) */
const ArrowIcon = styled.img<{ isOpen: boolean }>`
  width: 50px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "none")};

  @media (max-width: 600px) {
    width: 35px;
  }
`;

/* Resposta com transição de max-height e opacidade */
const Answer = styled.div<{ isOpen: boolean }>`
  font-size: 18px;
  line-height: 1.6;
  color: #000;
  text-indent: 2em;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0px")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: max-height 0.5s ease, opacity 0.5s ease;

  @media (max-width: 600px) {
    font-size: 13px;
    text-indent: 1em;
  }
`;

/* Divider com transição de margin-top */
const Divider = styled.hr<{ isOpen: boolean }>`
  border: none;
  border-top: 1px solid #000;
  margin: 0;
  margin-top: ${({ isOpen }) => (isOpen ? "8px" : "0px")};
  transition: margin-top 0.8s ease;
`;
