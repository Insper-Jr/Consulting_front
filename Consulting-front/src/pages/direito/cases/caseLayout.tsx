import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { CaretLeft } from "phosphor-react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/footerNovo";
import WppButton from "../../../components/wppButton";

const COLORS = {
  redTitle: "#A10F23",
  redCTA: "#C02121",
  ink: "#1a1a1a",
  bg: "#ffffff",
  greenLight: "#dcfce7",
  greenLightHover: "#bbf7d0",
  greenInk: "#166534",
  greenBorder: "#86efac",
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY = `"Inter", Helvetica, sans-serif`;

const CaseGlobal = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');
`;

type CaseLayoutProps = {
  children: React.ReactNode;
};

export default function CaseLayout({ children }: CaseLayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === "number" && idx > 0) {
      navigate(-1);
    } else {
      navigate("/direito");
    }
  };

  return (
    <PageWrap>
      <CaseGlobal />
      <WppButton />

      <BackButtonWrap>
        <BackButton type="button" onClick={handleBack} aria-label={t("direito.caseCommon.backAria")}>
          <CaretLeft size={16} weight="bold" />
          <span>{t("direito.caseCommon.back")}</span>
        </BackButton>
      </BackButtonWrap>

      <CaseContent>{children}</CaseContent>

      <Footer />
    </PageWrap>
  );
}

const PageWrap = styled.div`
  font-family: ${FONT_BODY};
  color: ${COLORS.ink};
  background: ${COLORS.bg};
  -webkit-font-smoothing: antialiased;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
`;

const BackButtonWrap = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 999;

  @media (max-width: 900px) {
    top: 1rem;
    left: 1rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${COLORS.greenInk};
  background: ${COLORS.greenLight};
  border: 1px solid ${COLORS.greenBorder};
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(22, 101, 52, 0.15);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: ${COLORS.greenLightHover};
    border-color: ${COLORS.greenInk};
    box-shadow: 0 6px 18px rgba(22, 101, 52, 0.25);
    transform: translateY(-1px);

    svg {
      transform: translateX(-3px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.greenInk};
    outline-offset: 3px;
  }
`;

const CaseContent = styled.div`
  & > section:first-of-type {
    padding-top: 2rem;
  }

  & > section:first-of-type p:first-of-type > span:first-of-type {
    align-self: flex-end;
  }

  @media (max-width: 900px) {
    & > section:first-of-type {
      padding-top: 1.5rem;
    }

    & > section:first-of-type p:first-of-type > span:first-of-type {
      align-self: flex-start;
      margin-top: 3rem;
    }
  }
`;
