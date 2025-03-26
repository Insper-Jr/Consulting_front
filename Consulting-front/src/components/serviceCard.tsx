import styled from "styled-components";
import { CaretRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import arrow from "../assets/arrow-right.png";

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ title, description, link }: ServiceCardProps) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onClick={() => navigate(link)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardTitle hovered={hovered}>{title}</CardTitle>
      <CardDescription hovered={hovered}>{description}</CardDescription>
      <LearnMore hovered={hovered}>
        Ler mais <img src= {arrow}/>
      </LearnMore>
    </Card>
  );
};

export default ServiceCard;

const Card = styled.div`
  width: 250px;
  height: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const CardTitle = styled.h3<{ hovered: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: ${({ hovered }) => (hovered ? "25px" : "30px")};
  color: black;
  margin-bottom: ${({ hovered }) => (hovered ? "0rem" : "auto")};
  transition: all 0.3s ease;
  transform: ${({ hovered }) => (hovered ? "translateY(-10px)" : "translateY(0)")};
  text-align: left;
`;

const CardDescription = styled.p<{ hovered: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 15px;
  color: #333;
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  height: ${({ hovered }) => (hovered ? "100%" : "0")};
  overflow: hidden;
  transition: opacity 0.8s ease, height 0.8s ease;
  text-align: left;
`;

const LearnMore = styled.div<{ hovered: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #A10F23;
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: ${({ hovered }) => (hovered ? "0.7rem" : "0rem")};
  transition: gap 0.3s ease;
  img {
    width: 24px;
    height : 24px;
    }
`;

