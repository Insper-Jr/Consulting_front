import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";
import styled, { css, keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import LogoIJR from "./LogoIJR";

type DropdownKey = "solucoes" | null;

const Header = () => {
  const { t, i18n } = useTranslation();

  const NAV_ITEMS = [
    { label: t("nav.solutions"), key: "solucoes", to: null },
    { label: t("nav.about"),     key: null,       to: "/about" },
    { label: t("nav.join"),      key: null,       to: "/join" },
    { label: t("nav.contact"),   key: null,       to: "/contact" },
  ] as const;

  const [isScrolled,     setIsScrolled]     = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [langOpen,       setLangOpen]       = useState(false);

  const lang = i18n.language === "en" ? "EN" : "PT";

  const navCloseTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langCloseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidebarCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Sidebar hover */
  const openSidebar = () => {
    if (sidebarCloseTimer.current) clearTimeout(sidebarCloseTimer.current);
    setSidebarOpen(true);
  };
  const scheduleSidebarClose = () => {
    sidebarCloseTimer.current = setTimeout(() => setSidebarOpen(false), 350); // era 220
  };
  const cancelSidebarClose = () => {
    if (sidebarCloseTimer.current) clearTimeout(sidebarCloseTimer.current);
  };

  /* Dropdown nav */
  const openNav = (key: DropdownKey) => {
    if (navCloseTimer.current) clearTimeout(navCloseTimer.current);
    setActiveDropdown(key);
  };
  const scheduleNavClose = () => {
    navCloseTimer.current = setTimeout(() => setActiveDropdown(null), 200);
  };
  const cancelNavClose = () => {
    if (navCloseTimer.current) clearTimeout(navCloseTimer.current);
  };

  /* Lang */
  const openLang = () => {
    if (langCloseTimer.current) clearTimeout(langCloseTimer.current);
    setLangOpen(true);
  };
  const scheduleLangClose = () => {
    langCloseTimer.current = setTimeout(() => setLangOpen(false), 300);
  };
  const cancelLangClose = () => {
    if (langCloseTimer.current) clearTimeout(langCloseTimer.current);
  };

  const isSolid = isScrolled || activeDropdown === "solucoes";

  return (
    <>
      {sidebarOpen && (
        <SidebarOverlay onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <Sidebar
        isOpen={sidebarOpen}
        onMouseEnter={cancelSidebarClose}
        onMouseLeave={scheduleSidebarClose}
      >
        {/* Topo com logo */}
        <SidebarHead>
          <LogoIJR height={28} color="#fff" />
        </SidebarHead>

        <SidebarDivider />

        {/* Links */}
        <SidebarLinks>
          {NAV_ITEMS.map((item, i) => (
            <SidebarNavLink
              key={item.label}
              to={item.to ?? (item.key === "solucoes" ? "/overview" : "/")}
              onClick={() => setSidebarOpen(false)}
            >
              <span>{item.label}</span>
              <SidebarArrow>→</SidebarArrow>
            </SidebarNavLink>
          ))}
        </SidebarLinks>

        <SidebarDivider />

        {/* Rodapé */}
        <SidebarBottom>
          <SidebarTagline>
            Consultoria universitária de alto impacto
          </SidebarTagline>
          <SidebarCTA to="/contact" onClick={() => setSidebarOpen(false)}>
            {t("nav.cta")}
          </SidebarCTA>
        </SidebarBottom>
      </Sidebar>

      <HoverTrigger
        onMouseEnter={openSidebar}
        onMouseLeave={scheduleSidebarClose}
      />

      {/* ── Header + Dropdown Zone ── */}
      <HeaderZone onMouseLeave={scheduleNavClose}>
        <HeaderWrap isSolid={isSolid}>

          {/* Esquerda — hover abre sidebar */}
          <HeaderLeft
            onMouseEnter={openSidebar}
            onMouseLeave={scheduleSidebarClose}
          >
            <HamburgerBtn aria-label="Menu">
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </HamburgerBtn>
            <LogoIJR height={30} color="#fff" />
            
          </HeaderLeft>

          {/* Centro */}
          <CenterNav>
            {NAV_ITEMS.map((item) =>
              item.key === "solucoes" ? (
                <NavBtn key={item.label} onMouseEnter={() => openNav("solucoes")}>
                  {item.label}
                  <Arrow isOpen={activeDropdown === "solucoes"}>
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Arrow>
                </NavBtn>
              ) : (
                <NavBtnLink key={item.label} to={item.to!} onMouseEnter={() => openNav(null)}>
                  {item.label}
                </NavBtnLink>
              )
            )}
          </CenterNav>

          {/* Direita */}
          <HeaderRight>
            <SearchWrap>
              <SearchIconBtn onClick={() => setSearchOpen((v) => !v)} aria-label="Buscar">
                <MagnifyingGlass size={19} color="white" weight="regular" />
              </SearchIconBtn>
              <SearchInput
                isOpen={searchOpen}
                type="text"
                placeholder={t("search")}
                autoFocus={searchOpen}
                onBlur={() => setSearchOpen(false)}
              />
            </SearchWrap>

            <LangWrap onMouseEnter={openLang} onMouseLeave={scheduleLangClose}>
              <LangCurrent>
                {lang}
                <LangCaret isOpen={langOpen}>▾</LangCaret>
              </LangCurrent>
              <LangBridge isOpen={langOpen} />
              <LangMenu isOpen={langOpen} onMouseEnter={cancelLangClose} onMouseLeave={scheduleLangClose}>
                <LangOpt isActive={lang === "PT"} onClick={() => { i18n.changeLanguage("pt"); setLangOpen(false); }}>PT</LangOpt>
                <LangOpt isActive={lang === "EN"} onClick={() => { i18n.changeLanguage("en"); setLangOpen(false); }}>EN</LangOpt>
              </LangMenu>
            </LangWrap>

            <HeaderCTA to="/contact">{t("nav.cta")}</HeaderCTA>
          </HeaderRight>
        </HeaderWrap>

        {/* ── Dropdown Soluções ── */}
        {activeDropdown === "solucoes" && (
          <DropdownPanel onMouseEnter={cancelNavClose} onMouseLeave={scheduleNavClose}>
            <DropdownInner>
              <DropCol>
                <DropColTitle>{t("dropdown.business.title")}</DropColTitle>
                <DropLink to="/marketing">{t("dropdown.business.marketing")}</DropLink>
                <DropLink to="/market">{t("dropdown.business.market")}</DropLink>
                <DropLink to="/operational">{t("dropdown.business.operational")}</DropLink>
                <DropLink to="/financial">{t("dropdown.business.financial")}</DropLink>
              </DropCol>
              <DropCol>
                <DropColTitle>{t("dropdown.tech.title")}</DropColTitle>
                <DropLink to="/data">{t("dropdown.tech.data")}</DropLink>
                <DropLink to="/products">{t("dropdown.tech.products")}</DropLink>
                <DropLink to="/devweb">{t("dropdown.tech.devweb")}</DropLink>
              </DropCol>
              <DropCol>
                <DropColTitle>{t("dropdown.law.title")}</DropColTitle>
                <DropSubTitle>{t("dropdown.law.creation.title")}</DropSubTitle>
                <DropLink to="/creation?tab=0">{t("dropdown.law.creation.planning")}</DropLink>
                <DropLink to="/creation?tab=1">{t("dropdown.law.creation.cnpj")}</DropLink>
                <DropLink to="/creation?tab=2">{t("dropdown.law.creation.docs")}</DropLink>
                <DropSubTitle>{t("dropdown.law.strategy.title")}</DropSubTitle>
                <DropLink to="/strategy?tab=0">{t("dropdown.law.strategy.contract")}</DropLink>
                <DropLink to="/strategy?tab=1">{t("dropdown.law.strategy.tax")}</DropLink>
                <DropSubTitle>{t("dropdown.law.protection.title")}</DropSubTitle>
                <DropLink to="/protection?tab=0">{t("dropdown.law.protection.ip")}</DropLink>
                <DropLink to="/protection?tab=1">{t("dropdown.law.protection.lgpd")}</DropLink>
              </DropCol>
            </DropdownInner>
          </DropdownPanel>
        )}
      </HeaderZone>
    </>
  );
};

export default Header;

// ── Styled Components ────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const HeaderZone = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 997;
  pointer-events: auto;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1099;
  animation: ${fadeIn} 0.2s ease;
`;

/* ── Sidebar melhorada ── */
const Sidebar = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  top: 0; left: 0;
  width: 300px;
  height: 100dvh;
  background: #0e0404;
  border-right: 1px solid rgba(192, 33, 33, 0.2);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 360px) { width: 100vw; }
`;

const SidebarHead = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 0 2rem;
`;

const SidebarLinks = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const SidebarNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.85rem 2rem;
  transition: color 0.2s, background 0.2s, padding-left 0.2s;

  &:hover {
    color: #fff;
    background: rgba(192, 33, 33, 0.08);
    padding-left: 2.3rem;
  }

  /* animação escalonada nos links quando abre */
  animation: ${slideIn} 0.3s ease both;
`;

const SidebarArrow = styled.span`
  margin-left: auto;
  opacity: 0;
  font-size: 0.8rem;
  color: #C02121;
  transition: opacity 0.2s, transform 0.2s;

  ${SidebarNavLink}:hover & {
    opacity: 1;
    transform: translateX(4px);
  }
`;

const SidebarBottom = styled.div`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarTagline = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.25);
  line-height: 1.5;
  margin: 0;
  letter-spacing: 0.01em;
`;

const SidebarCTA = styled(Link)`
  display: block;
  text-align: center;
  background: #C02121;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 2px;
  transition: background 0.25s;

  &:hover { background: #691212; }
`;

/* ── Header ── */
const HeaderWrap = styled.header<{ isSolid: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 4.5rem;
  background: ${({ isSolid }) => isSolid ? "rgba(14, 4, 4, 0.97)" : "transparent"};
  backdrop-filter: ${({ isSolid }) => isSolid ? "blur(8px)" : "none"};
  border-bottom: ${({ isSolid }) => isSolid ? "1px solid rgba(255,255,255,0.06)" : "none"};
  transition: background 0.3s ease, border-color 0.3s ease;
  z-index: 1000;
  font-family: "Montserrat", sans-serif;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: default;
  padding: 0.5rem 0.5rem 0.5rem 0;
`;

/* Hamburger — agora só visual, sem onClick */
const HamburgerBtn = styled.div`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  line-height: 0;
  opacity: 0.7;
  transition: opacity 0.2s;

  ${HeaderLeft}:hover & { opacity: 1; }
`;

const HamburgerLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: width 0.2s;

  &:nth-child(2) { width: 16px; }
  ${HeaderLeft}:hover &:nth-child(2) { width: 22px; }
`;

const CenterNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 900px) { display: none; }
`;

const navItemBase = css`
  color: rgba(255, 255, 255, 0.85);
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0.5rem 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
  &:hover { color: #fff; background: rgba(255, 255, 255, 0.07); }
`;

const NavBtn = styled.div`
  ${navItemBase}
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const NavBtnLink = styled(Link)`${navItemBase}`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 900px) { gap: 0.5rem; }
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const SearchIconBtn = styled.button`
  background: none; border: none; cursor: pointer;
  padding: 0.35rem; line-height: 0; opacity: 0.8; transition: opacity 0.2s;
  &:hover { opacity: 1; }
`;

const SearchInput = styled.input<{ isOpen: boolean }>`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px; color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem; padding: 0.35rem 0.6rem; outline: none;
  width: ${({ isOpen }) => (isOpen ? "160px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  overflow: hidden;
  transition: width 0.3s ease, opacity 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  &::placeholder { color: rgba(255, 255, 255, 0.4); }
  @media (max-width: 900px) { display: none; }
`;

const LangWrap = styled.div`
  position: relative;
  @media (max-width: 900px) { display: none; }
`;

const LangCurrent = styled.div`
  display: flex; align-items: center; gap: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em;
  cursor: pointer; padding: 0.4rem 0.5rem; border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  &:hover { color: #fff; background: rgba(255, 255, 255, 0.07); }
`;

const LangCaret = styled.span<{ isOpen: boolean }>`
  font-size: 0.7rem;
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const LangBridge = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute; top: 100%; left: 0; right: 0; height: 8px;
`;

const LangMenu = styled.div<{ isOpen: boolean }>`
  position: absolute; top: calc(100% + 8px); left: 50%;
  transform: translateX(-50%);
  background: rgba(14, 4, 4, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px; overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  min-width: 64px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.15s ease;
`;

const LangOpt = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#fff" : "rgba(255,255,255,0.6)")};
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
  padding: 0.55rem 1rem; cursor: pointer; text-align: center;
  transition: background 0.15s;
  &:hover { background: rgba(255, 255, 255, 0.07); color: #fff; }
`;

const HeaderCTA = styled(Link)`
  background: #C02121; color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em;
  text-decoration: none; padding: 0.55rem 1.1rem;
  border-radius: 4px; white-space: nowrap; transition: background 0.25s;
  &:hover { background: #691212; }
  @media (max-width: 900px) { display: none; }
`;

const DropdownPanel = styled.div`
  position: fixed; top: 4.5rem; left: 0; right: 0;
  background: rgba(14, 4, 4, 0.97);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 997; padding: 2.5rem 0;
  animation: ${fadeIn} 0.18s ease;
`;

const DropdownInner = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 0 2rem;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 1.5rem; }
`;

const DropCol = styled.div`
  display: flex; flex-direction: column; gap: 0.35rem;
`;

const DropColTitle = styled.h3`
  font-family: "Montserrat", sans-serif; color: #fff;
  font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 0.75rem;
  padding-bottom: 0.6rem; border-bottom: 2px solid #C02121;
`;

const DropSubTitle = styled.p`
  font-family: "Montserrat", sans-serif;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; margin-top: 0.75rem; margin-bottom: 0.25rem;
`;

const DropLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7); text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem; font-weight: 400; padding: 0.3rem 0;
  transition: color 0.2s, padding-left 0.2s;
  &:hover { color: #fff; padding-left: 0.4rem; }
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  width: 20px; height: 20px; border-radius: 50%;
  background: ${({ isOpen }) => isOpen ? "#C02121" : "rgba(192, 33, 33, 0.15)"};
  display: flex; align-items: center; justify-content: center;
  transition: background 0.25s ease;

  svg {
    width: 15px; height: 15px; display: block;
    transform: ${({ isOpen }) => isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.25s ease;
  }
`;

const HoverTrigger = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 56px;
  height: 100vh;
  z-index: 996;
  pointer-events: auto;
`;