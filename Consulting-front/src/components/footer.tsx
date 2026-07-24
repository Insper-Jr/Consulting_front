import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin
} from "phosphor-react";


import Logo from "@/assets/ijr/insperjr-white-red.png"


const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      {/* Coluna 1 (logo e slogan) */}
      <ColumnLeft>
        <LogoWrapper>
          <Link to="/">
            <LogoImg src={Logo} alt="Insper Jr." />
          </Link>
        </LogoWrapper>
        <Slogan>{t("shared.footer.slogan")}</Slogan>
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
        <Title>{t("shared.footer.navTitle")}</Title>
        <FooterLink to="/">{t("shared.footer.nav.home")}</FooterLink>
        <FooterLink to="/about">{t("shared.footer.nav.about")}</FooterLink>
        <FooterLink to="/overview">{t("shared.footer.nav.services")}</FooterLink>
      </ColumnCenter>

      {/* Coluna 3 (Contato) */}
      <ColumnCenter>
        <Title>{t("shared.footer.contactTitle")}</Title>
        <ExternalLink
          href="https://wa.me/5511998983364"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo
            size={30}
            weight="bold"
            style={{ marginRight: "8px", color: "inherit" }}
          />
          (11) 9 9898-3364
        </ExternalLink>
        <ExternalLink href="mailto:pedrodp@insperjr.com">
          <EnvelopeSimple
            size={30}
            weight="bold"
            style={{ marginRight: "8px", color: "inherit" }}
          />
          pedrodp@insperjr.com
        </ExternalLink>
      </ColumnCenter>

      {/* Coluna 4 (Endereço) */}
      <ColumnCenter>
        <Title>{t("shared.footer.addressTitle")}</Title>
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
          {t("shared.footer.address.line1")} <br />
          {t("shared.footer.address.line2")} <br />
          {t("shared.footer.address.line3")}
        </ExternalLink>
      </ColumnCenter>
    </FooterContainer>
  );
};

export default Footer;

/* ========== Styled Components ========== */
const FooterContainer = styled.footer`
  z-index: 999;
  margin-top: -20px;
  background: #000;
  color: #fff;
  max-width: 100%;

  font-size: 1.1rem;
  font-family: "Inter", sans-serif;

  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
    max-width: 100%;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
`;

/* Coluna da esquerda */
const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  text-align: left;
  max-width: 250px;
  margin: 0;

  @media (max-width: 1200px) {
    max-width: 220px;
  }

  @media (max-width: 600px) {
    max-width: 200px;
  }
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

  @media (max-width: 1200px) {
    max-width: 220px;
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    max-width: 200px;
    gap: 1rem;
  }
`;

/* Wrapper do logo (se quiser manter a imagem sem corte) */
const LogoWrapper = styled.div`
  width: 200px; 
  height: auto; 

  @media (max-width: 1200px) {
    width: 180px;
  }

  @media (max-width: 600px) {
    width: 150px;
  }
`;

const LogoImg = styled.img`
  width: 250px; 
  height: auto;

  @media (max-width: 1200px) {
    width: 220px;
  }

  @media (max-width: 600px) {
    width: 180px;
  }
`;

/* Centraliza o texto do slogan */
const Slogan = styled.p`
  margin-bottom: 1rem;
  font-weight: 400;
  text-align: center;
  width: 100%;
  font-size: 1rem;

  @media (max-width: 1200px) {
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
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
  font-size: 1.5rem;

  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

/* Links internos */
const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #C02121;
  }

  @media (max-width: 1200px) {
    font-size: 0.95rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

/* Links externos */
const ExternalLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: #C02121;
  }

  @media (max-width: 1200px) {
    font-size: 0.95rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

/* Ícones de redes sociais (coluna 1) */
const SocialIcons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; 
  gap: 1rem;

  @media (max-width: 1200px) {
    gap: 0.8rem;
  }

  @media (max-width: 600px) {
    gap: 0.6rem;
  }
`;

/* Cada ícone individual */
const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.2rem;

  &:hover {
    color: #C02121;
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;
