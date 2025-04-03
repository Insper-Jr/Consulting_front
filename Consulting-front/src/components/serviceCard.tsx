import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import arrow from "../assets/arrow-right.png";

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  onHoverChange?: (hovering: boolean) => void;
}

const ServiceCard = ({ title, description, link, onHoverChange }: ServiceCardProps) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onClick={() => navigate(link)}
      onMouseEnter={() => { setHovered(true); onHoverChange?.(true); }}
      onMouseLeave={() => { setHovered(false); onHoverChange?.(false); }}
    >
      <CardTitle hovered={hovered}>{title}</CardTitle>
      <CardDescription hovered={hovered}>{description}</CardDescription>
      <LearnMore hovered={hovered}>
        Ler mais <img src={arrow} alt="arrow" />
      </LearnMore>
    </Card>
  );
};

export default ServiceCard;

const Card = styled.div`
  width: 250px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 600px) {
    width: 200px;
    height: 250px;
    padding: 16px;
  }
`;

const CardTitle = styled.h3<{ hovered: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: ${({ hovered }) => (hovered ? "25px" : "30px")};
  color: black;
  margin-bottom: ${({ hovered }) => (hovered ? "0px" : "auto")};
  transition: all 0.3s ease;
  transform: ${({ hovered }) => (hovered ? "translateY(-10px)" : "translateY(0)")};
  text-align: left;

  @media (max-width: 600px) {
    font-size: 20px;
    transform: translateY(-10px);
    margin-bottom: 0px;

  }
`;

const CardDescription = styled.p<{ hovered: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 15px;
  color: #333;
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  height: ${({ hovered }) => (hovered ? "100%" : "0px")};
  overflow: hidden;
  transition: opacity 0.8s ease, height 0.8s ease;
  text-align: left;

  @media (max-width: 600px) {
    opacity: 1;
    height: 100%;
    font-size: 13px;
  }
`;

const LearnMore = styled.div<{ hovered: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #A10F23;
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: ${({ hovered }) => (hovered ? "11px" : "0px")};
  transition: gap 0.3s ease;

  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  
  }

  &:hover {
    img {
      transform: translateX(5px);
    }
  }

  @media (max-width: 600px) {
    font-size: 10px;
    img {
      width: 15px;
      height: 15px;
    }
  }
`;

