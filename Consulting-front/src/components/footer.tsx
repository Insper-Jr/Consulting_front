import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin
} from "phosphor-react";

import Logo from "@/assets/ijr/insperjr-white-red.png"

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {/* Coluna 1 (logo e slogan) */}
      <ColumnLeft>
        <LogoWrapper>
          <LogoImg src={Logo} alt="Insper Jr." />
        </LogoWrapper>
        <Slogan>Transformando realidades com soluções inovadoras!</Slogan>
        <Line />
        <SocialIcons>
          <SocialIcon
            href="https://www.instagram.com/insperjr"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Ícone maior (size=30) */}
            <InstagramLogo size={30} weight="bold" />
          </SocialIcon>
          <SocialIcon
            href="https://br.linkedin.com/company/insper-jr-consulting"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={30} weight="bold" />
          </SocialIcon>
        </SocialIcons>
      </ColumnLeft>

      {/* Coluna 2 (Navegação) */}
      <ColumnCenter>
        <Title>Navegação</Title>
        <FooterLink to="/">Início</FooterLink>
        <FooterLink to="/about">Sobre nós</FooterLink>
        <FooterLink to="/services">Serviços</FooterLink>
      </ColumnCenter>

      {/* Coluna 3 (Contato) */}
      <ColumnCenter>
        <Title>Contato</Title>
        <ExternalLink
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo
            size={30}
            weight="bold"
            style={{ marginRight: "8px", color: "inherit" }}
          />
          (11) 9 9999-9999
        </ExternalLink>
        <ExternalLink href="mailto:insperjr@gmail.com">
          <EnvelopeSimple
            size={30}
            weight="bold"
            style={{ marginRight: "8px", color: "inherit" }}
          />
          insperjr@gmail.com
        </ExternalLink>
      </ColumnCenter>

      {/* Coluna 4 (Endereço) */}
      <ColumnCenter>
        <Title>Endereço</Title>
        <ExternalLink
          href="https://www.google.com/maps/place/R.+Quat%C3%A1,+200+-+1%C2%BA+Andar+-+Vila+Ol%C3%ADmpia,+S%C3%A3o+Paulo+-+SP,+04546-041/@-23.5990549,-46.675479,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce5753605b7ef1:0xe4a8a4037abb6338!8m2!3d-23.5990549!4d-46.675479?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin
            size={40}
            weight="bold"
            style={{ marginRight: "8px", color: "inherit" }}
          />
          R. Quatá, 200 (1º Andar) <br />
          Vila Olímpia, São Paulo - SP <br />
          04546-042
        </ExternalLink>
      </ColumnCenter>
    </FooterContainer>
  );
};

export default Footer;

/* ========== Styled Components ========== */

const FooterContainer = styled.footer`
  background: #000;
  color: #fff;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  font-size: 1.1rem;
  font-family: "Inter", sans-serif;

  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  flex-wrap: wrap;
`;

/* Coluna da esquerda */
const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  text-align: left;
  max-width: 250px;
  margin: 0;
`;

/* Demais colunas (centralizadas) */
const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 250px;
  margin: 1rem 0;
  gap: 2rem;
`;

/* Wrapper do logo (se quiser manter a imagem sem corte) */
const LogoWrapper = styled.div`
  width: 200px; 
  height: auto; 
`;

const LogoImg = styled.img`
  width: 250px; 
  height: auto;
`;

/* Centraliza o texto do slogan */
const Slogan = styled.p`
  margin-bottom: 1rem;
  font-weight: 400;
  text-align: center;
  width: 100%;
`;

/* Linha branca de separação */
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin: 1rem 0;
`;

/* Título de cada coluna */
const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

/* Links internos */
const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #a10f23;
  }
`;

/* Links externos */
const ExternalLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex; 
  align-items: center;

  &:hover {
    color: #a10f23;
  }
`;

/* Ícones de redes sociais (coluna 1) */
const SocialIcons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; 
  gap: 1rem;
`;

/* Cada ícone individual */
const SocialIcon = styled.a`
  color: #fff;

  &:hover {
    color: #a10f23;
  }
`;
