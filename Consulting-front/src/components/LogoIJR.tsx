import { Link } from "react-router-dom";
import MonogramImg from "../assets/ijr/monogram-white.png";
import WordmarkImg  from "../assets/ijr/wordmark-white.png";

/**
 * Logo animado da Insper Jr.
 * - Repouso: mostra só o monograma (JR)
 * - Hover: monograma some, wordmark "Insper Jr." desliza para dentro
 *
 * Props:
 *  height  — altura em px (default 40)
 *  color   — cor do texto/logo (default #fff)
 */
interface LogoIJRProps {
  height?: number;
  color?: string;
  href?: string;
}

const LogoIJR = ({ height = 40, color = "#fff", href = "/" }: LogoIJRProps) => {
  const h = height;
  // Aspect ratios from the HTML spec:
  // monogram: 450/581 ≈ 0.775
  // wordmark: 1237/322 ≈ 3.842
  const monoW   = h * 0.775;
  const wordW   = h * 3.842;
  const dur     = "520ms";
  const ease    = "cubic-bezier(.2, .7, .2, 1)";

  return (
    <Link
      to={href}
      aria-label="Insper Jr."
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        height: `${h}px`,
        width: `${monoW}px`,
        textDecoration: "none",
        color,
        cursor: "pointer",
        transition: `width ${dur} ${ease}`,
        flexShrink: 0,
      }}
      className="ijr-logo"
    >
      {/* Stage — overflow hidden para o slide funcionar */}
      <span style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "block" }}>

        {/* Monograma — visível no repouso, some no hover */}
        <span
          className="ijr-logo__mono"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0, top: 0,
            width: `${monoW}px`,
            height: "100%",
            background: color,
            WebkitMaskImage: `url(${MonogramImg})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskImage: `url(${MonogramImg})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "left center",
            transition: `opacity ${parseFloat(dur) * 0.6}ms ${ease}, transform ${dur} ${ease}`,
          }}
        />

        {/* Wordmark "Insper Jr." — aparece no hover */}
        <span
          className="ijr-logo__word"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0, top: 0,
            width: `${wordW}px`,
            height: "100%",
            opacity: 0,
            transform: "translateX(8px)",
            transition: `opacity ${parseFloat(dur) * 0.8}ms ${ease} 80ms, transform ${dur} ${ease} 80ms`,
            pointerEvents: "none",
          }}
        >
          {/* Parte branca (Insper) */}
          <span style={{
            position: "absolute", inset: 0,
            background: color,
            WebkitMaskImage: `url(${WordmarkImg})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskImage: `url(${WordmarkImg})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "left center",
          }} />
          {/* Parte vermelha (Jr.) — clip para a direita */}
          <span style={{
            position: "absolute", inset: 0,
            background: "#C02121",
            WebkitMaskImage: `url(${WordmarkImg})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskImage: `url(${WordmarkImg})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "left center",
            clipPath: "inset(0 0 0 74.5%)",
          }} />
        </span>
      </span>

      {/* CSS global para os estados hover/focus — injetado via <style> */}
      <style>{`
        .ijr-logo:hover,
        .ijr-logo:focus-visible {
          width: ${wordW}px !important;
          outline: none;
        }
        .ijr-logo:hover .ijr-logo__mono,
        .ijr-logo:focus-visible .ijr-logo__mono {
          opacity: 0 !important;
          transform: translateX(-2px) !important;
        }
        .ijr-logo:hover .ijr-logo__word,
        .ijr-logo:focus-visible .ijr-logo__word {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .ijr-logo,
          .ijr-logo__mono,
          .ijr-logo__word {
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </Link>
  );
};

export default LogoIJR;
