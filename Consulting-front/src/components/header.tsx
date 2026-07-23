import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";
import styled, { css, keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import LogoIJR from "./LogoIJR";

type DropdownKey = "solucoes" | null;
type SubFrente = { label: string; to: string };
type Frente =
  | { label: string; to: string;  sub?: never }
  | { label: string; to?: never; sub: SubFrente[] };


const Header = () => {
  const { t, i18n } = useTranslation();

  const NAV_ITEMS = [
    { label: t("nav.solutions"), key: "solucoes", to: null       },
    { label: t("nav.about"),     key: null,       to: "/about"   },
    { label: t("nav.alumni"),    key: null,       to: "/alumni"  },
    { label: t("nav.join"),      key: null,       to: "/join"    },
    { label: t("nav.contact"),   key: null,       to: "/contact" },
  ] as const;

  const FRENTES: Frente[] = [
    { label: t("frentes.business"), to: "/overview?frente=business" },
    { label: t("frentes.direito"),  to: "/direito"  },
    {
      label: t("frentes.engenharia"),
      sub: [
        { label: t("frentes.tech"),      to: "/tech" },
        { label: t("frentes.processos"), to: "/processos"            },
      ],
    },
  ];

  const [isScrolled,     setIsScrolled]     = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [langOpen,       setLangOpen]       = useState(false);
  const [sidebarSolOpen, setSidebarSolOpen] = useState(false);
  const [sidebarEngOpen, setSidebarEngOpen] = useState(false);
  const [engSubOpen,     setEngSubOpen]     = useState(false);

  const lang = i18n.language === "en" ? "EN" : "PT";

  const navCloseTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langCloseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidebarCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const engSubTimer       = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSidebar = () => {
    if (sidebarCloseTimer.current) clearTimeout(sidebarCloseTimer.current);
    setSidebarOpen(true);
  };
  const scheduleSidebarClose = () => {
    sidebarCloseTimer.current = setTimeout(() => setSidebarOpen(false), 350);
  };
  const cancelSidebarClose = () => {
    if (sidebarCloseTimer.current) clearTimeout(sidebarCloseTimer.current);
  };

  const openNav = (key: DropdownKey) => {
    if (navCloseTimer.current) clearTimeout(navCloseTimer.current);
    setActiveDropdown(key);
  };
  const scheduleNavClose = () => {
    navCloseTimer.current = setTimeout(() => {
      setActiveDropdown(null);
      setEngSubOpen(false);
    }, 200);
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

  const openEngSub = () => {
    if (engSubTimer.current) clearTimeout(engSubTimer.current);
    setEngSubOpen(true);
  };
  const closeEngSub = () => {
    engSubTimer.current = setTimeout(() => setEngSubOpen(false), 200);
  };

  const isSolid = isScrolled;

  return (
    <>
      {sidebarOpen && (
        <SidebarOverlay onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onMouseEnter={cancelSidebarClose}
        onMouseLeave={scheduleSidebarClose}
      >
        <SidebarHead>
          <LogoIJR height={28} color="#fff" />
        </SidebarHead>

        <SidebarDivider />

        <SidebarLinks>
          {NAV_ITEMS.map((item) =>
            item.key === "solucoes" ? (
              <SidebarSolWrapper
                key={item.label}
                onMouseEnter={() => setSidebarSolOpen(true)}
                onMouseLeave={() => setSidebarSolOpen(false)}
              >
                <SidebarNavLink to="/overview" onClick={() => setSidebarOpen(false)}>
                  <span>{item.label}</span>
                  <SidebarSolCaret isOpen={sidebarSolOpen}>▾</SidebarSolCaret>
                </SidebarNavLink>

                <SidebarSubMenu isOpen={sidebarSolOpen}>
                  {FRENTES.map((f) =>
                    f.sub ? (
                      <SidebarEngWrapper
                        key={f.label}
                        onMouseEnter={() => setSidebarEngOpen(true)}
                        onMouseLeave={() => setSidebarEngOpen(false)}
                      >
                        <SidebarSubLinkDiv>
                          <span>{f.label}</span>
                          <SidebarSolCaret isOpen={sidebarEngOpen}>▾</SidebarSolCaret>
                        </SidebarSubLinkDiv>
                        <SidebarSubSubMenu isOpen={sidebarEngOpen}>
                          {f.sub.map((s) => (
                            <SidebarSubSubLink
                              key={s.label}
                              to={s.to}
                              onClick={() => {
                                setSidebarOpen(false);
                                setSidebarSolOpen(false);
                                setSidebarEngOpen(false);
                              }}
                            >
                              {s.label}
                            </SidebarSubSubLink>
                          ))}
                        </SidebarSubSubMenu>
                      </SidebarEngWrapper>
                    ) : (
                      <SidebarSubLink
                        key={f.label}
                        to={f.to}
                        onClick={() => {
                          setSidebarOpen(false);
                          setSidebarSolOpen(false);
                        }}
                      >
                        {f.label}
                      </SidebarSubLink>
                    )
                  )}
                </SidebarSubMenu>
              </SidebarSolWrapper>
            ) : (
              <SidebarNavLink
                key={item.label}
                to={item.to!}
                onClick={() => setSidebarOpen(false)}
              >
                <span>{item.label}</span>
                <SidebarArrow>→</SidebarArrow>
              </SidebarNavLink>
            )
          )}
        </SidebarLinks>

        <SidebarDivider />

        <SidebarBottom>
          <SidebarTagline>Consultoria universitária de alto impacto</SidebarTagline>
          <SidebarCTA to="/contact" onClick={() => setSidebarOpen(false)}>
            {t("nav.cta")}
          </SidebarCTA>
        </SidebarBottom>
      </Sidebar>

      <HoverTrigger
        onMouseEnter={openSidebar}
        onMouseLeave={scheduleSidebarClose}
      />

      <HeaderZone>
        <HeaderWrap isSolid={isSolid}>

          <HeaderLeft>
            <HamburgerBtn
              onMouseEnter={openSidebar}
              onMouseLeave={scheduleSidebarClose}
              aria-label="Menu"
            >
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </HamburgerBtn>
            <LogoIJR height={30} color="#fff" />
          </HeaderLeft>

          <CenterNav>
            {NAV_ITEMS.map((item) =>
              item.key === "solucoes" ? (
                <NavItemWrapper
                  key={item.label}
                  onMouseEnter={() => openNav("solucoes")}
                  onMouseLeave={scheduleNavClose}
                >
                  <NavBtn>
                    {item.label}
                    <Arrow isOpen={activeDropdown === "solucoes"}>
                      <svg viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2"
                          fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Arrow>
                  </NavBtn>

                  {activeDropdown === "solucoes" && (
                    <SmallDropdown
                      onMouseEnter={cancelNavClose}
                      onMouseLeave={scheduleNavClose}
                    >
                      {FRENTES.map((f) =>
                        f.sub ? (
                          <EngWrapper
                            key={f.label}
                            onMouseEnter={openEngSub}
                            onMouseLeave={closeEngSub}
                          >
                            <EngDropRow>
                              <span>{f.label}</span>
                              <EngCaret $open={engSubOpen}>▾</EngCaret>
                            </EngDropRow>
                            <AccordionSub $open={engSubOpen}>
                              {f.sub.map((s) => (
                                <AccordionLink
                                  key={s.label}
                                  to={s.to}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setEngSubOpen(false);
                                  }}
                                >
                                  {s.label}
                                </AccordionLink>
                              ))}
                            </AccordionSub>
                          </EngWrapper>
                        ) : (
                          <SmallDropLink
                            key={f.label}
                            to={f.to}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {f.label}
                          </SmallDropLink>
                        )
                      )}
                    </SmallDropdown>
                  )}
                </NavItemWrapper>
              ) : (
                <NavBtnLink
                  key={item.label}
                  to={item.to!}
                  onMouseEnter={() => openNav(null)}
                >
                  {item.label}
                </NavBtnLink>
              )
            )}
          </CenterNav>

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
              <LangMenu
                isOpen={langOpen}
                onMouseEnter={cancelLangClose}
                onMouseLeave={scheduleLangClose}
              >
                <LangOpt isActive={lang === "PT"}
                  onClick={() => { i18n.changeLanguage("pt"); setLangOpen(false); }}>
                  PT
                </LangOpt>
                <LangOpt isActive={lang === "EN"}
                  onClick={() => { i18n.changeLanguage("en"); setLangOpen(false); }}>
                  EN
                </LangOpt>
              </LangMenu>
            </LangWrap>

            <HeaderCTA to="/contact">{t("nav.cta")}</HeaderCTA>
          </HeaderRight>
        </HeaderWrap>
      </HeaderZone>
    </>
  );
};

export default Header;

// ── Styled Components ─────────────────────────────────────────────────────────

const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const slideIn = keyframes`from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}`;

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
  animation: ${slideIn} 0.3s ease both;
  &:hover { color: #fff; background: rgba(192, 33, 33, 0.08); padding-left: 2.3rem; }
`;

const SidebarArrow = styled.span`
  margin-left: auto;
  opacity: 0;
  font-size: 0.8rem;
  color: #C02121;
  transition: opacity 0.2s, transform 0.2s;
  ${SidebarNavLink}:hover & { opacity: 1; transform: translateX(4px); }
`;

const SidebarSolWrapper = styled.div`display: flex; flex-direction: column;`;

const SidebarSolCaret = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  font-size: 0.85rem;
  color: #C02121;
  opacity: 0.85;
  transition: transform 0.25s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const SidebarSubMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "320px" : "0")};
  transition: max-height 0.42s ease;
  background: rgba(0, 0, 0, 0.25);
`;

const SidebarSubLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.6rem 2rem 0.6rem 2.75rem;
  border-left: 2px solid transparent;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  &:hover { color: #fff; background: rgba(192, 33, 33, 0.08); border-left-color: #C02121; }
`;

const SidebarEngWrapper = styled.div`display: flex; flex-direction: column;`;

const SidebarSubLinkDiv = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Montserrat", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.6rem 2rem 0.6rem 2.75rem;
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  &:hover { color: #fff; background: rgba(192, 33, 33, 0.08); }
`;

const SidebarSubSubMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "120px" : "0")};
  transition: max-height 0.35s ease;
  background: rgba(0, 0, 0, 0.35);
`;

const SidebarSubSubLink = styled(Link)`
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  padding: 0.5rem 2rem 0.5rem 3.5rem;
  border-left: 2px solid transparent;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  &:hover { color: #fff; background: rgba(192, 33, 33, 0.08); border-left-color: #C02121; }
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

const HeaderWrap = styled.header<{ isSolid: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 4.5rem;
  background: ${({ isSolid }) => isSolid ? "rgba(14, 4, 4, 0.97)" : "transparent"};
  backdrop-filter: ${({ isSolid }) => (isSolid ? "blur(8px)" : "none")};
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

const NavItemWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
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

const SmallDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 8px;
  background: transparent;
  z-index: 998;
  &::after {
    content: "";
    position: absolute;
    top: 8px; left: 0; right: 0; bottom: 0;
    background: rgba(14, 4, 4, 0.97);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(192, 33, 33, 0.08);
    z-index: -1;
  }
  animation: ${fadeIn} 0.12s ease;
`;

const SmallDropLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.68rem 1.25rem;
  min-width: 180px;
  border-left: 2px solid transparent;
  transition: color 0.15s, background 0.15s, border-color 0.15s, padding-left 0.15s;
  &:hover { color: #fff; background: rgba(192, 33, 33, 0.1); border-left-color: #C02121; padding-left: 1.5rem; }
  &:first-child { border-radius: 5px 5px 0 0; padding-top: 0.9rem; }
  &:last-child  { border-radius: 0 0 5px 5px; padding-bottom: 0.9rem; }
`;

const EngWrapper = styled.div``;

const EngDropRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.72);
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.68rem 1.25rem;
  min-width: 180px;
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  &:hover { color: #fff; background: rgba(192, 33, 33, 0.1); border-left-color: #C02121; }
`;

const EngCaret = styled.span<{ $open: boolean }>`
  font-size: 0.75rem;
  color: #C02121;        // ← era opacity: 0.6 sem cor definida
  transition: transform 0.25s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
`;

const AccordionSub = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "120px" : "0")};
  transition: max-height 0.3s ease;
  border-top: ${({ $open }) => ($open ? "1px solid rgba(255,255,255,0.06)" : "none")};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  @media (max-width: 900px) { gap: 0.5rem; }
`;

const SearchWrap = styled.div`display: flex; align-items: center; gap: 0.4rem;`;

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
  top: 0; left: 0;
  width: 56px;
  height: 100vh;
  z-index: 996;
  pointer-events: auto;
`;

const AccordionLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.78rem;         // ← menor que o normal (0.875rem)
  font-weight: 500;
  padding: 0.55rem 1.25rem 0.55rem 2rem;  // ← recuado à esquerda
  border-left: 2px solid transparent;
  transition: color 0.15s, background 0.15s, border-color 0.15s, padding-left 0.15s;

  &:hover {
    color: #fff;
    background: rgba(192, 33, 33, 0.08);
    border-left-color: #C02121;
    padding-left: 2.25rem;
  }
`;