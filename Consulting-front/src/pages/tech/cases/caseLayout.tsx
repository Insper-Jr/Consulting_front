import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { CaretLeft } from "phosphor-react";
import Footer from "../../../components/footerNovo";
import WppButton from "../../../components/wppButton";

// ── Color tokens ──────────────────────────────────────────────────────────
const COLORS = {
  redTitle: "#A10F23",
  redCTA: "#C02121",
  ink: "#1a1a1a",
  bg: "#ffffff",
  greenLight: "#dcfce7",     // verde claro de fundo
  greenLightHover: "#bbf7d0",// hover um pouco mais saturado
  greenInk: "#166534",       // texto/ícone verde escuro
  greenBorder: "#86efac",    // borda verde clara
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
  const navigate = useNavigate();

  // Scroll para o topo ao montar a página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleBack = () => {
    // Usa history back se houver entrada anterior nesta sessão de app
    // (assim o browser restaura o scroll da /tech). Caso contrário,
    // navega diretamente para /tech (entrada via URL direta).
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === "number" && idx > 0) {
      navigate(-1);
    } else {
      navigate("/tech");
    }
  };

  return (
    <PageWrap>
      <CaseGlobal />
      <WppButton />

      <BackButtonWrap>
        <BackButton type="button" onClick={handleBack} aria-label="Voltar para a página de Tecnologia">
          <CaretLeft size={16} weight="bold" />
          <span>Voltar</span>
        </BackButton>
      </BackButtonWrap>

      <CaseContent>{children}</CaseContent>

      <Footer />
    </PageWrap>
  );
}

// ── Styled Components ─────────────────────────────────────────────────────
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
  /* O case é renderizado dentro dessa wrapper.
     Reduz o padding-top da primeira <section> do case
     para aproveitar o espaço liberado pelo Header removido. */
  & > section:first-of-type {
    padding-top: 2rem;
  }

  /* Move o badge "CASE EM DESTAQUE" para o lado direito,
     evitando sobreposição com o botão "Voltar" no canto superior esquerdo. */
  & > section:first-of-type p:first-of-type > span:first-of-type {
    align-self: flex-end;
  }

  @media (max-width: 900px) {
    & > section:first-of-type {
      padding-top: 1.5rem;
    }

    /* Em telas pequenas, volta o badge para a esquerda */
    & > section:first-of-type p:first-of-type > span:first-of-type {
      align-self: flex-start;
      margin-top: 3rem;
    }
  }
`;
