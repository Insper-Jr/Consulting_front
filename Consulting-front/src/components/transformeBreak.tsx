import styled from "styled-components";
import backgroundImage from "../assets/fale_conosco/fundo-contato.png";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  return (
    <BackgroundContainer>
        <LeftContainer>
          <LeftText>
            <>
            Transforme seu negócio <br></br>agora!
            </>
          </LeftText>
        </LeftContainer>
        <RightContainer>
          <StyledButton to="/overview">Conheça nossos serviços</StyledButton>
          <StyledButton to="/contact" >Faça um diagnóstico gratuito</StyledButton>
        </RightContainer>
    </BackgroundContainer>
  );
};

export default HeroComponent;

/* ================== Styled Components ================== */

const BackgroundContainer = styled.div`
  margin-top:50px;
  width: 100%;
  height: 700px; /* ajuste a altura conforme necessário */
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 600px;
    margin-top: 30px;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 40px;
  /* Ajuste o background para a tonalidade vermelha desejada – use rgba para transparência se preferir */
  background-color: rgba(176, 11, 36, 0.8);
  display:flex;
  align-items: center;
  justify-content:center;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    padding: 30px 20px;
  }
`;

const LeftText = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  color: #fff;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 25px;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 150px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 40px;
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    gap: 30px;
    padding: 20px;
  }
`;

const StyledButton = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  padding: 16px 50px;
  border: none;
  background-color: #a10f23;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  min-width: 200px;

  &:hover {
    background-color: #87061b;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 14px 30px;
    min-width: 250px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 12px 24px;
    min-width: 220px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 20px;
    min-width: 200px;
  }

  @media (max-width: 350px) {
    font-size: 12px;
    padding: 8px 16px;
    min-width: 180px;
  }
`;