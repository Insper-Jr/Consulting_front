import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, X, CaretDown } from "phosphor-react";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo>
        <img src={LogoWR} alt="Insper Jr."/>
      </Logo>
      <Nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/about">Sobre Nós</NavLink>
        <DropdownContainer
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLink to="/services">Serviços</NavLink>
          {dropdownOpen && (
            <DropdownMenu>
              <DropdownItem to="/marketing">Plano estratégico de Marketing</DropdownItem>
              <DropdownItem to="/Mercadologica">Analise Mercadologica</DropdownItem>
              <DropdownItem to="/Operacional">Plano Operacional</DropdownItem>
              <DropdownItem to="/Financeiro">Viabilidade Financeira</DropdownItem>
              <DropdownItem to="/DevWeb">Desenvolvimento Web</DropdownItem>
              <DropdownItem to="/MVP">Desenvolvimento de Produtos</DropdownItem>
              <DropdownItem to="/Dados">Analise de dados</DropdownItem>
            </DropdownMenu>
          )}
        </DropdownContainer>
        <ContactButton to="/contact">Fale Conosco</ContactButton>
      </Nav>
      <MobileMenu onClick={() => setMenuOpen(true)}>
        <List size={32} color="white" />
      </MobileMenu>     
      <MobileNav isOpen={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}>
          <X size={32} color="white" />
        </CloseButton>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Início</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>Sobre Nós</NavLink>
        <StyledButton onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}>
          Serviços <CaretDown size={16} />
        </StyledButton>
        {mobileDropdownOpen && (
          <MobileDropdownMenu>
            <DropdownItem to="/PEM">Plano Estratégico de Marketing</DropdownItem>
            <DropdownItem to="/Mercadologica">Análise Mercadológica</DropdownItem>
            <DropdownItem to="/Operacional">Plano Operacional</DropdownItem>
            <DropdownItem to="/Financeiro">Viabilidade Financeira</DropdownItem>
            <DropdownItem to="/DevWeb">Desenvolvimento Web</DropdownItem>
            <DropdownItem to="/MVP">Desenvolvimento de Produtos</DropdownItem>
            <DropdownItem to="/Dados">Análise de Dados</DropdownItem>
          </MobileDropdownMenu>
        )}
        <ContactButton to="/contact" onClick={() => setMenuOpen(false)}>Fale Conosco</ContactButton>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ isScrolled }) => (isScrolled ? "black" : "transparent")};
  transition: background 0.3s ease;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-family: "Montserrat", sans-serif;
`;

const Logo = styled.div`
  img {
    height: 3rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ContactButton = styled(Link)`
  background: red;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  margin-right: 2rem;
  &:hover {
    opacity: 0.8;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #871223;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const DropdownItem = styled(Link)`
  padding: 10px;
  color: white;
  text-decoration: none;
  width: 100%;
  border-bottom: 1px solid white;
  &:hover {
  opacity: 0.7;
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
  width: 200px;
  height: 100vh;
  background: #871223;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2rem;
  gap: 1rem;
  transition: right 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const MobileDropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  padding: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;  
  &:hover {
    opacity: 0.7;
  }
`;
