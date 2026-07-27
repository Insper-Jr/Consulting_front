import styled from "styled-components";
import { Link } from "react-router-dom";
import { FONT_BODY } from "../styles/tokens";
import arrowIcon from "../assets/arrow-right.png"; // ajuste o caminho se necessário


interface SynergyCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const SynergyCard = ({ image, title, description, link }: SynergyCardProps) => {
  return (
    <CardLink to={link}>
      <Card>
        <CardImage src={image} alt={title} />
        <CardTitle>
          {title} <Arrow src={arrowIcon} alt="seta"/>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </Card>
    </CardLink>
  );
};

export default SynergyCard;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  width: 280px;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: black;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  @media(max-width:600px){
  font-size:20px;}
`;

const CardDescription = styled.p`
  font-family: ${FONT_BODY};
  font-size: 20px;
  text-align: left;
  line-height: 1.5;
  color: #333;
  @media(max-width:600px){
  font-size:15px;
  }
`;

const Arrow = styled.img`
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
  margin-left: 0.3rem;

  ${Card}:hover & {
    transform: translateX(8px);
  }
    @media(max-width:600px){
    width:30px;
    height:20px;
     margin-left: 0}
`;
