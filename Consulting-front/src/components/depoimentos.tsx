import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
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


const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  const testimonialsData: Testimonial[] = [
    {
      name: t("shared.depoimentos.testimonials.t1.name"),
      role: t("shared.depoimentos.testimonials.t1.role"),
      text: t("shared.depoimentos.testimonials.t1.text"),
    },
    {
      name: t("shared.depoimentos.testimonials.t2.name"),
      role: t("shared.depoimentos.testimonials.t2.role"),
      text: t("shared.depoimentos.testimonials.t2.text"),
    },
    {
      name: t("shared.depoimentos.testimonials.t3.name"),
      role: t("shared.depoimentos.testimonials.t3.role"),
      text: t("shared.depoimentos.testimonials.t3.text"),
    },
    {
      name: t("shared.depoimentos.testimonials.t4.name"),
      role: t("shared.depoimentos.testimonials.t4.role"),
      text: t("shared.depoimentos.testimonials.t4.text"),
    },
    {
      name: t("shared.depoimentos.testimonials.t5.name"),
      role: t("shared.depoimentos.testimonials.t5.role"),
      text: t("shared.depoimentos.testimonials.t5.text"),
    },
    {
      name: t("shared.depoimentos.testimonials.t6.name"),
      role: t("shared.depoimentos.testimonials.t6.role"),
      text: t("shared.depoimentos.testimonials.t6.text"),
    },
    {
      name: t("shared.depoimentos.testimonials.t7.name"),
      role: t("shared.depoimentos.testimonials.t7.role"),
      text: t("shared.depoimentos.testimonials.t7.text"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === testimonialsData.length - 1;

  const handleNext = () => !isLast && setCurrentIndex((prev) => prev + 1);
  const handlePrev = () => !isFirst && setCurrentIndex((prev) => prev - 1);

  return (
    <SectionContainer>
      <LeftSide>
        <Title>{t("shared.depoimentos.title")}</Title>
        <Description>
          {t("shared.depoimentos.descriptionParagraph1")}
        </Description>
        <Description>
          {t("shared.depoimentos.descriptionParagraph2")}
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