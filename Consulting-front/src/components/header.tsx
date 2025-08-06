import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { List, X, CaretDown } from "phosphor-react";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDropdown = () => {
    if (closeTimeoutRef.current !== undefined) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo as={Link} to="/">
        <img src={LogoWR} alt="Insper Jr."/>
      </Logo>

      <Nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/about">Sobre Nós</NavLink>

        <DropdownContainer
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <DropdownTrigger to="/overview">
            Serviços <CaretDown size={12} style={{ marginLeft: 4 }} />
          </DropdownTrigger>

          {dropdownOpen && (
            <DropdownMenu>
              <DropdownSection>
                <DropdownTitle>Business</DropdownTitle>
                <DropdownItem to="/marketing">Plano Estratégico de Marketing</DropdownItem>
                <DropdownItem to="/market">Análise Mercadológica</DropdownItem>
                <DropdownItem to="/operational">Plano Operacional</DropdownItem>
                <DropdownItem to="/financial">Viabilidade Financeira</DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownTitle>Engenharia & Tecnologia</DropdownTitle>
                <DropdownItem to="/data">Análise de Dados</DropdownItem>
                <DropdownItem to="/products">Desenvolvimento de Produtos</DropdownItem>
                <DropdownItem to="/devweb">Desenvolvimento Web</DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownTitle>Direito</DropdownTitle>
                <DropdownSubTitle>Criação e Estruturação</DropdownSubTitle>
                <DropdownItem to="/creation?tab=0">Planejamento Societário</DropdownItem>
                <DropdownItem to="/creation?tab=1">Emissão de CNPJ</DropdownItem>
                <DropdownItem to="/creation?tab=2">Documentos Constitutivos</DropdownItem>
                <DropdownSubTitle>Operação e Estratégia</DropdownSubTitle>
                <DropdownItem to="/strategy?tab=0">Contratos</DropdownItem>
                <DropdownItem to="/strategy?tab=1">Planejamento Tributário / Imunidades e Isenções Tributárias</DropdownItem>
                <DropdownSubTitle>Proteção e Regularização</DropdownSubTitle>
                <DropdownItem to="/protection?tab=0">Propriedade Intelectual / Direitos Autorais</DropdownItem>
                <DropdownItem to="/protection?tab=1">LGPD</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          )}
        </DropdownContainer>

        <ContactButton to="/contact">Fale Conosco</ContactButton>
      </Nav>

      {!menuOpen && (
        <MobileMenu onClick={() => setMenuOpen(true)}>
          <List size={32} color="white" />
        </MobileMenu>
      )}

      <MobileNav isOpen={menuOpen}>
        <MobileNavContent>
          <CloseButton onClick={() => setMenuOpen(false)}>
            <X size={32} color="white" />
          </CloseButton>

          <NavLink to="/" onClick={() => setMenuOpen(false)}>Início</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>Sobre Nós</NavLink>
          <NavLink to="/overview" onClick={() => setMenuOpen(false)}>Serviços</NavLink>

          <DropdownSection>
            <DropdownTitle>Business</DropdownTitle>
            <DropdownItem to="/marketing" onClick={() => setMenuOpen(false)}>Plano Estratégico de Marketing</DropdownItem>
            <DropdownItem to="/market" onClick={() => setMenuOpen(false)}>Análise Mercadológica</DropdownItem>
            <DropdownItem to="/operational" onClick={() => setMenuOpen(false)}>Plano Operacional</DropdownItem>
            <DropdownItem to="/financial" onClick={() => setMenuOpen(false)}>Viabilidade Financeira</DropdownItem>
          </DropdownSection>
          
          <DropdownSection>
            <DropdownTitle>Engenharia & Tecnologia</DropdownTitle>
            <DropdownItem to="/data" onClick={() => setMenuOpen(false)}>Análise de Dados</DropdownItem>
            <DropdownItem to="/products" onClick={() => setMenuOpen(false)}>Desenvolvimento de Produtos</DropdownItem>
            <DropdownItem to="/devweb" onClick={() => setMenuOpen(false)}>Desenvolvimento Web</DropdownItem>
          </DropdownSection>
          
          <DropdownSection>
            <DropdownTitle>Direito</DropdownTitle>
            <DropdownSubTitle>Criação e Estruturação</DropdownSubTitle>
            <DropdownItem to="/creation?tab=0" onClick={() => setMenuOpen(false)}>Planejamento Societário</DropdownItem>
            <DropdownItem to="/creation?tab=1" onClick={() => setMenuOpen(false)}>Emissão de CNPJ</DropdownItem>
            <DropdownItem to="/creation?tab=2" onClick={() => setMenuOpen(false)}>Documentos Constitutivos</DropdownItem>
            <DropdownSubTitle>Operação e Estratégia</DropdownSubTitle>
            <DropdownItem to="/strategy?tab=0" onClick={() => setMenuOpen(false)}>Contratos</DropdownItem>
            <DropdownItem to="/strategy?tab=1" onClick={() => setMenuOpen(false)}>Planejamento Tributário / Imunidades e Isenções Tributárias</DropdownItem>
            <DropdownSubTitle>Proteção e Regularização</DropdownSubTitle>
            <DropdownItem to="/protection?tab=0" onClick={() => setMenuOpen(false)}>Propriedade Intelectual / Direitos Autorais</DropdownItem>
            <DropdownItem to="/protection?tab=1" onClick={() => setMenuOpen(false)}>LGPD</DropdownItem>
          </DropdownSection>

          {/* Espaçador flexível */}
          
          <ContactButton 
            to="/contact" 
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: 'auto', flexShrink: 0 }}
          >
            Fale Conosco
          </ContactButton>
          
          {/* Espaço extra no final */}
          <div style={{ height: '2rem', flexShrink: 0 }}></div>
        </MobileNavContent>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;

/* Styled Components */

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0; 
  left: 0; 
  right: 0;
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ isScrolled }) => (isScrolled ? "#000" : "transparent")};
  transition: background 0.3s ease; 
  z-index: 1000;
  overflow: visible;

  /* configurações globais de fonte */
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
`;

const Logo = styled.div`
  img { height: 3rem; }
`;

const Nav = styled.nav`
  display: flex; 
  gap: 2rem; 
  align-items: center;
  @media (max-width: 800px) { display: none; }
`;

const NavLink = styled(Link)`
  color: #fff; 
  text-decoration: none;
  &:hover { opacity: 0.7; }
`;

const ContactButton = styled(Link)`
  background: #BB0B24; 
  color: #fff;
  padding: 0.5rem 1rem; 
  border-radius: 8px;
  font-weight: bold; 
  text-decoration: none;
  &:hover { opacity: 0.8; }
`;

const DropdownContainer = styled.div``;

const DropdownTrigger = styled(Link)`
  color: #fff; 
  display: flex; 
  align-items: center;
  text-decoration: none;
  &:hover { opacity: 0.8; }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%; 
  transform: translateX(-50%);
  display: flex; 
  gap: 2rem;
  background: rgba(0,0,0,0.95);
  padding: 1rem; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1100;
`;

const DropdownSection = styled.div`
  display: flex; 
  flex-direction: column;
`;

const DropdownTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  margin: 0.5rem 0; 
  color: #fff;
  font-size: 16px;
`;

const DropdownSubTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  margin: 0.75rem 0 0.25rem; 
  color: #fff;
  font-size: 16px;
`;

const DropdownItem = styled(Link)`
  color: #fff; 
  text-decoration: none;
  padding: 0.5rem 0;
  font-size: 14px;
  padding-left: 10px;
  &:hover { 
    opacity: 0.8;
  }
`;

const MobileMenu = styled.div`
  display: none; 
  cursor: pointer; 
  margin-right: 2rem;
  @media (max-width: 800px) { 
    display: block; 
  }
`;

const MobileNav = styled.div<{ isOpen: boolean }>`
  position: fixed; 
  top: 0; 
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 280px; 
  height: 100vh;
  height: 100dvh;
  background: #871223;
  transition: right 0.3s ease; 
  z-index: 1200;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 320px) {
    width: 100vw;
  }
`;

const MobileNavContent = styled.div`
  flex: 1;
  padding: 5rem 1.5rem 1rem;
  display: flex; 
  flex-direction: column; 
  gap: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  
  /* Força o último item a ter espaço */
  padding-bottom: 3rem !important;
  
  /* Webkit scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6);
  }
`;

const CloseButton = styled.button`
  position: absolute; 
  top: 1rem; 
  right: 1rem;
  background: none; 
  border: none; 
  cursor: pointer;
  z-index: 1;
`;