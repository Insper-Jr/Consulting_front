import React, { useState } from "react";
import styled from "styled-components";
import { CaretLeft, CaretRight } from "phosphor-react";
import TestimonialCard from "./testimonialCard";

import LogoCarrefour from "../assets/logo_carrefour_white.png";
import LogoAlbertEinstein from "../assets/logo_albert_white.png";
import LogoAlcoa from "../assets/logo_alcoa_white.png";
import LogoAmbev from "../assets/logo_ambev_white.png";
import LogoWise from "../assets/logo_wise_white.png";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  companyLogo?: string;
}


const testimonialsData: Testimonial[] = [
  {
    name: "Carlos Henrique",
    role: "CEO",
    text: "Nossa startup precisava de uma estratégia clara para se posicionar no mercado. A Insper Jr. nos ajudou a entender melhor o comportamento do usuário e a mapear oportunidades de diferenciação. Além disso, a análise financeira trouxe insights valiosos sobre precificação e monetização. O trabalho foi muito bem estruturado e agregou muito valor ao nosso planejamento.",
  },
  {
    name: "Ana Beatriz",
    role: "Co-fundadora",
    text: "Não sabíamos muito bem como estruturar nossa ideia e por em prática no mercado. A consultoria da Insper Jr. nos ajudou a definir um modelo de negócios viável, entender qual público-alvo priorizar e quais parcerias estratégicas buscar. Com o estudo detalhado, conseguimos evitar erros iniciais e lançar o projeto de forma mais segura. Foi um investimento que valeu muito a pena!",
  },
  {
    name: "Mariana Torres",
    role: "Diretora de Expansão",
    text: "Estávamos prontos para expandir nossa atuação para uma nova região, mas faltava clareza sobre onde e como começar. O plano de negócios desenvolvido pela Insper Jr. foi essencial para tomar essa decisão com segurança. A análise de mercado identificou tendências e lacunas importantes, enquanto o plano estratégico de marketing nos ajudou a definir nosso posicionamento. Já os planos operacional e financeiro nos deram uma visão concreta de como escalar com eficiência. O projeto foi além das nossas expectativas.",
  },
  {
    name: "Rafaela Lima",
    role: "Fundadora",
    text: "Como empreendedor de primeira viagem, eu tinha uma ideia com muito potencial, mas precisava de apoio para estruturá-la. A Insper Jr. me ajudou a transformar essa ideia em um modelo de negócio viável e bem fundamentado. A análise de mercado trouxe dados valiosos sobre o setor, o plano estratégico de marketing definiu com precisão como e para quem comunicar minha proposta, e os planos operacional e financeiro me deram segurança para tirar o projeto do papel. Foi um divisor de águas para minha jornada empreendedora.",
  },
  {
    name: "André Campos",
    role: " Ex-CEO e Fundador",
    text: "Depois de anos empreendendo, decidi vender meu negócio, mas não sabia como definir um valor justo nem como apresentar isso para o mercado. A Insper Jr. foi essencial nesse processo. O valuation trouxe uma visão clara e bem embasada do valor da empresa, considerando tanto os números quanto o potencial do negócio. Além disso, o pitch criado pela equipe me deu confiança para conversar com investidores e conduzir as negociações com muito mais segurança. O trabalho foi técnico, profissional e realmente fez a diferença no desfecho da venda.",
  },
  {
    name: "Luiza Menezes",
    role: "Diretora de Operações",
    text: "Queríamos expandir nossa operação, mas precisávamos ganhar eficiência e melhorar nossa margem. A Insper Jr. entrou de cabeça e trouxe um diagnóstico completo, com sugestões práticas que conseguimos aplicar rapidamente. A planejamento operacional identificou gargalos importantes e estruturou todos os processos da nova expansão, enquanto o plano financeiro reorganizou nossa estrutura de custos de forma clara e eficiente. Saímos do projeto com mais controle, mais rentabilidade e uma visão muito mais estratégica do nosso negócio.",
  },
  {
    name: "Felipe Rocha",
    role: "Co-Fundador e CEO",
    text: "Estávamos nos preparando para captar investimento, mas sabíamos que precisávamos profissionalizar nossa apresentação e embasar melhor nosso plano de crescimento. A Insper Jr. nos ajudou justamente com isso. A análise mercadológica mostrou o potencial do setor com dados atualizados e consolidou nossa visão de longo prazo e o plano financeiro deu robustez às nossas projeções. O material final não só impressionou os investidores, como também nos deu mais clareza interna. Foi um marco na nossa trajetória.",
  },
  // Adicione quantos depoimentos desejar...
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === testimonialsData.length - 1;

  const handleNext = () => !isLast && setCurrentIndex((prev) => prev + 1);
  const handlePrev = () => !isFirst && setCurrentIndex((prev) => prev - 1);

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
          <TestimonialCard testimonial={testimonialsData[currentIndex]} />
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

/* ========== Styled Components ========== */

const SectionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  background-color: #fff;
  width: 100%;
`;

const LeftSide = styled.div`
  flex: 2;
  margin-left: 80px;
  max-width: 700px;

  @media (max-width: 1200px) {
    max-width: 500px;
    margin-left: 50px;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 10px;
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #a10f23;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 15px;
  text-align: justify;
  text-indent: 32px;
  margin-top: 5px;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 500px;
  height: 340px;

  @media (max-width: 1300px) {
    width: 400px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Arrows = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#5C0E15" : "#a10f23")};
  border: none;
  color: #fff;
  padding: 8px 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#5C0E15" : "#87061b")};
  }
`;