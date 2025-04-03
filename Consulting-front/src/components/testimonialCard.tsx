import styled from "styled-components";
import { Quotes } from "phosphor-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  companyLogo?: string;
}

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
        {testimonial.companyLogo && (
          <CompanyLogosContainer>
            <CompanyLogo src={testimonial.companyLogo} alt="Company Logo" />
            <RedLine />
          </CompanyLogosContainer>
        )}
      </ForegroundRect>
    </CardContainer>
  );
};

export default TestimonialCard;

/* ================== Styled Components ================== */

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackgroundRect = styled.div`
  width: 100%;
  height: 100%;
  background-color: #707070;
`;

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

const QuotesIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;

  @media (max-width: 600px) {
    top: 0px;
    left: 5px;
  }
`;

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

const CompanyLogo = styled.img`
  height: 45px;

  @media (max-width: 1200px) {
    height: 40px;
  }

  @media (max-width: 600px) {
    height: 35px;
  }
`;

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

