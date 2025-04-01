import React, { useState } from "react";
import styled from "styled-components";
import { CaretLeft, CaretRight, Quotes } from "phosphor-react";
import LogoCarrefour from "../assets/logo_carrefour_white.png";
import LogoAlbertEinstein from "../assets/logo_albert_white.png";
import LogoAlcoa from "../assets/logo_alcoa_white.png";
import LogoAmbev from "../assets/logo_ambev_white.png";
import LogoCittamobi from "../assets/logo_cittamobi_white.png";
import LogoVitalab from "../assets/logo_vitalab_white.png";
import LogoWise from "../assets/logo_wise_white.png";

// Define a interface para os dados de um depoimento
interface Testimonial {
  name: string;
  role: string;
  text: string;
  companyLogo: string;
}

// Array de depoimentos – para adicionar novos, basta incluir um novo objeto
const testimonialsData: Testimonial[] = [
  {
    name: "Wagner da Silva",
    role: "Gerente de Operações",
    text: "Um prazer poder contar com a Insper Jr! Fiquei muito satisfeito com o projeto desenvolvido. Espero reencontrá-los em oportunidades futuras!",
    companyLogo: LogoCarrefour,
  },
  {
    name: "Jorge Marques",
    role: "Diretor de Vendas",
    text: "  A Insper Jr. demonstrou um nível excepcional de profissionalismo e comprometimento. A equipe de consultores sempre esteve disponível.",
    companyLogo: LogoAmbev,
  },
  {
    name: "Ricardo Tavares",
    role: "Diretor de Estratégia",
    text: "  Desde o primeiro contato, ficou claro o nível de profissionalismo e dedicação da Insper Jr. O projeto foi conduzido com seriedade e atenção aos detalhes.",
    companyLogo: LogoAlbertEinstein,
  },
  {
    name: "Ana Luiza Mendes",
    role: "Gerente de Projetos",
    text: "  A Insper Jr. nos surpreendeu com a qualidade da análise e a profundidade das soluções propostas. A equipe foi extremamente proativa e eficiente!",
    companyLogo: LogoAlcoa,
  },
  {
    name: "Mariana Costa",
    role: "Coordenadora de Operações",
    text: "   A equipe da Insper Jr. demonstrou grande conhecimento técnico e compromisso com prazos e qualidade.",
    companyLogo: LogoWise,
  },
  // Adicione quantos depoimentos desejar...
];

/* Componente TestimonialCard
   Recebe um depoimento via props e renderiza o card com os dois retângulos sobrepostos,
   ícone de aspas, conteúdo (nome, cargo, depoimento) e o container de logo + linha. */
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <CardContainer>
      <BackgroundRect />
      <ForegroundRect>
        <QuotesIcon>
          <Quotes size={32} weight="fill" color="#A10F23" />
        </QuotesIcon>
        <CardName>{testimonial.name}</CardName>
        <CardRole>{testimonial.role}</CardRole>
        <CardText>{testimonial.text}</CardText>
        <CompanyLogosContainer>
          <CompanyLogo src={testimonial.companyLogo} alt="Company Logo" />
          <RedLine />
        </CompanyLogosContainer>
      </ForegroundRect>
    </CardContainer>
  );
};

/* Componente principal que usa o TestimonialCard e implementa o carrossel */
const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === testimonialsData.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <SectionContainer>
      <LeftSide>
        <Title>O que dizem sobre nós?</Title>
        <Description>
          Na Insper Jr., a satisfação dos nossos clientes é a nossa prioridade.
          Cada projeto é desenvolvido com compromisso e excelência, garantindo
          soluções personalizadas para cada desafio. Nosso time trabalha lado a
          lado com os clientes, ouvindo suas necessidades e entregando resultados
          concretos.
        </Description>
        <Description>
          Acreditamos que o impacto do nosso trabalho vai além da consultoria:
          buscamos construir parcerias de confiança, agregando valor real e
          promovendo o crescimento sustentável dos negócios.
        </Description>
      </LeftSide>
      <RightSide>
        <CarouselContainer>
          <TestimonialCard testimonial={currentTestimonial} />
          <Arrows>
            <ArrowButton onClick={handlePrev} disabled={isFirst}>
              <CaretLeft size={28} weight="bold" />
            </ArrowButton>
            <ArrowButton onClick={handleNext} disabled={isLast}>
              <CaretRight size={28} weight="bold" />
            </ArrowButton>
          </Arrows>
        </CarouselContainer>
      </RightSide>
    </SectionContainer>
  );
};

export default TestimonialsSection;
/* ================== Styled Components ================== */

/* ================== Styled Components ================== */

/* Container da seção */
const SectionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap:50px;
  background-color: #fff;
  width: 100%;
  margin-top:80px;
`;

/* Lado esquerdo (título e textos) */
const LeftSide = styled.div`
  flex: 2;
  margin-left: 80px;
  padding: 0;
  max-width:700px;


  @media (max-width: 1300px) {
    max-width: 600px;
    margin-left: 100px;
  }
  @media (max-width: 1200px) {
    max-width: 500px;
    margin-left: 50px;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

/* Lado direito (carrossel) */
const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1300px) {
    width: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

/* Título com fonte Montserrat */
const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #a10f23;
  margin-bottom: 16px;

  @media (max-width: 1200px) {
    font-size: 32px;
  }

  @media (max-width: 600px) {
    font-size: 28px;
    text-align: center;
  }
`;

/* Descrição com fonte Inter, justificado e indentado */
const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  color: #000;
  text-align: justify;
  text-indent: 32px;
  margin-top: 5px;

  @media (max-width: 1300px) {
    font-size: 16px;
    text-indent: 20px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    text-indent: 16px;
    text-align: center;
  }
`;

/* Container do card do carrossel */
const CarouselContainer = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  margin-top: 30px;

  @media (max-width: 1300px) {
    width: 400px;
    height: 300px;
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 250px;
    margin-top: 20px;
  }
`;

/* Container do card (TestimonialCard) */
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

/* Retângulo de fundo (#707070) */
const BackgroundRect = styled.div`
  width: 100%;
  height: 100%;
  background-color: #707070;
`;

/* Retângulo frontal (#3B3B3B) */
const ForegroundRect = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 100%;
  height: 100%;
  background-color: #3b3b3b;
  z-index: 1;
  padding: 16px 32px;
  box-sizing: border-box;
  color: #fff;
  font-family: "Poppins", sans-serif;

  @media (max-width: 1200px) {
    padding: 12px 24px;
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
  }
`;

/* Ícone de aspas */
const QuotesIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;

  @media (max-width: 600px) {
    top: 0px;
    left: 5px;
  }
`;

/* Nome em Poppins bold */
const CardName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin: 24px 0 4px 0;

  @media (max-width: 1200px) {
    font-size: 16px;
    margin: 21px 0 3px 0;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    margin: 16px 0 3px 0;
    text-align: center;
  }
`;

/* Cargo em Poppins itálico */
const CardRole = styled.p`
  font-family: "Poppins", sans-serif;
  font-style: italic;
  font-size: 14px;
  margin: 0;
  opacity: 0.9;

  @media (max-width: 1200px) {
    font-size: 13px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    text-align: center;
  }
`;

/* Texto do depoimento */
const CardText = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  margin-top: 12px;
  line-height: 1.3;
  text-align: justify;
  text-indent: 32px;

  @media (max-width: 1200px) {
    font-size: 13px;
    text-indent: 24px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    text-indent: 16px;
    text-align: center;
  }
`;

/* Container para a logo da empresa e linha vermelha */
const CompanyLogosContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (max-width: 1200px) {
    bottom: 15px;
    left: 15px;
  }

  @media (max-width: 600px) {
    bottom: 10px;
    left: 10px;
  }
`;

/* Imagem da logo da empresa */
const CompanyLogo = styled.img`
  height: 45px;

  @media (max-width: 1200px) {
    height: 40px;
  }

  @media (max-width: 600px) {
    height: 35px;
  }
`;

/* Linha vermelha */
const RedLine = styled.div`
  width: 80px;
  height: 1.5px;
  background-color: #a10f23;

  @media (max-width: 1200px) {
    width: 70px;
  }

  @media (max-width: 600px) {
    width: 60px;
  }
`;

/* Container das setas */
const Arrows = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  display: flex;
  gap: 8px;
  z-index: 2;

  @media (max-width: 1200px) {
    bottom: -8px;
    right: -8px;
  }

  @media (max-width: 600px) {
    bottom: -5px;
    right: -5px;
  }
`;

/* Botão das setas */
const ArrowButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#5C0E15" : "#a10f23")};
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#5C0E15" : "#87061b")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1200px) {
    padding: 6px 9px;
  }

  @media (max-width: 600px) {
    padding: 5px 8px;
  }
`;
