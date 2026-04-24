import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, MagnifyingGlass } from "phosphor-react";
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
  const [headerHovered,  setHeaderHovered]  = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [langOpen,       setLangOpen]       = useState(false);

  const lang = i18n.language === "en" ? "EN" : "PT";

  const navCloseTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const openNav = (key: DropdownKey) => {
    if (navCloseTimer.current) clearTimeout(navCloseTimer.current);
    setActiveDropdown(key);
  };
  const scheduleNavClose = () => {
    navCloseTimer.current = setTimeout(() => setActiveDropdown(null), 1200);
  };
  const cancelNavClose = () => {
    if (navCloseTimer.current) clearTimeout(navCloseTimer.current);
  };

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

  const isSolid = isScrolled || headerHovered || sidebarOpen || !!activeDropdown;

  return (
    <>
      {sidebarOpen && <SidebarOverlay onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <Sidebar isOpen={sidebarOpen}>
        <SidebarTop>
          <SidebarCloseBtn onClick={() => setSidebarOpen(false)} aria-label="Fechar menu">
            <X size={24} weight="bold" />
          </SidebarCloseBtn>
        </SidebarTop>
        <SidebarLinks>
          {NAV_ITEMS.map((item) => (
            <SidebarNavLink
              key={item.label}
              to={item.to ?? (item.key === "solucoes" ? "/overview" : "/")}
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </SidebarNavLink>
          ))}
        </SidebarLinks>
        <SidebarBottom>
          <SidebarCTA to="/contact" onClick={() => setSidebarOpen(false)}>
            {t("nav.cta")}
          </SidebarCTA>
        </SidebarBottom>
      </Sidebar>

      {/* ── Header + Dropdown Zone ── */}
      <HeaderZone onMouseLeave={() => { setHeaderHovered(false); scheduleNavClose(); }}>
        <HeaderWrap
          isSolid={isSolid}
          onMouseEnter={() => { setHeaderHovered(true); cancelNavClose(); }}
        >
          {/* Esquerda */}
          <HeaderLeft>
            <HamburgerBtn onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
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

        {/* ── Dropdown Nossas Soluções ── */}
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

// ── Styled Components ─────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
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
  background: rgba(0, 0, 0, 0.55);
  z-index: 1099;
  animation: ${fadeIn} 0.25s ease;
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  top: 0; left: 0;
  width: 320px;
  height: 100dvh;
  background: #080F0F;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 360px) { width: 100vw; }
`;

const SidebarTop = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  justify-content: flex-end;
`;

const SidebarCloseBtn = styled.button`
  background: none; border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer; padding: 0.4rem;
  border-radius: 4px; transition: color 0.2s; line-height: 0;
  &:hover { color: #fff; }
`;

const SidebarLinks = styled.nav`
  flex: 1;
  display: flex; flex-direction: column;
  padding: 1rem 2rem; gap: 0.25rem;
`;

const SidebarNavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 1.05rem; font-weight: 500; letter-spacing: 0.02em;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: color 0.2s, padding-left 0.2s;
  &:hover { color: #fff; padding-left: 0.5rem; }
  &:last-child { border-bottom: none; }
`;

const SidebarBottom = styled.div`padding: 2rem;`;

const SidebarCTA = styled(Link)`
  display: block; text-align: center;
  background: #C02121; color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  text-decoration: none; padding: 0.85rem 1.5rem;
  border-radius: 4px; transition: background 0.25s;
  &:hover { background: #691212; }
`;

const HeaderWrap = styled.header<{ isSolid: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 4.5rem;
  background: ${({ isSolid }) => isSolid ? "rgba(8, 15, 15, 0.97)" : "transparent"};
  backdrop-filter: ${({ isSolid }) => isSolid ? "blur(8px)" : "none"};
  border-bottom: ${({ isSolid }) => isSolid ? "1px solid rgba(255,255,255,0.06)" : "none"};
  transition: background 0.3s ease, border-color 0.3s ease;
  z-index: 1000;
  font-family: "Montserrat", sans-serif;
`;

const HeaderLeft = styled.div`
  display: flex; align-items: center; gap: 1.25rem;
`;

const HamburgerBtn = styled.button`
  background: none; border: none; cursor: pointer;
  padding: 0.4rem; display: flex; flex-direction: column;
  gap: 5px; line-height: 0; transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const HamburgerLine = styled.span`
  display: block; width: 22px; height: 2px;
  background: #fff; border-radius: 2px;
`;

const CenterNav = styled.nav`
  display: flex; align-items: center; gap: 0.25rem;
  position: absolute; left: 50%; transform: translateX(-50%);
  @media (max-width: 900px) { display: none; }
`;

const navItemBase = css`
  color: rgba(255, 255, 255, 0.85);
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem; font-weight: 500;
  letter-spacing: 0.02em; text-decoration: none;
  padding: 0.5rem 0.85rem; border-radius: 4px;
  cursor: pointer; transition: color 0.2s, background 0.2s;
  white-space: nowrap;
  &:hover { color: #fff; background: rgba(255, 255, 255, 0.07); }
`;

const NavBtn = styled.div`${navItemBase}`;
const NavBtnLink = styled(Link)`${navItemBase}`;

const HeaderRight = styled.div`
  display: flex; align-items: center; gap: 0.75rem;
  @media (max-width: 900px) { gap: 0.5rem; }
`;

const SearchWrap = styled.div`
  display: flex; align-items: center; gap: 0.4rem;
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
  font-size: 0.7rem; transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const LangBridge = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute; top: 100%; left: 0; right: 0; height: 8px;
`;

const LangMenu = styled.div<{ isOpen: boolean }>`
  position: absolute; top: calc(100% + 8px); left: 50%;
  transform: translateX(-50%);
  background: rgba(8, 15, 15, 0.97);
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
  background: rgba(8, 15, 15, 0.97);
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