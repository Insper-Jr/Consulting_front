import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";
import { useInView } from "@/hooks/useInView";
import accenture     from "../../../assets/partners/accenture.png";
import ambev         from "../../../assets/partners/ambev.png";
import bain          from "../../../assets/partners/bain.png";
import bcg           from "../../../assets/partners/bcg.png";
import bloomberg     from "../../../assets/partners/bloomberg.png";
import ey            from "../../../assets/partners/ey.png";
import igc           from "../../../assets/partners/igc.png";
import integration   from "../../../assets/partners/integration.png";
import juliusBaer    from "../../../assets/partners/julius-baer.svg";
import kearney       from "../../../assets/partners/kearney.png";
import lek           from "../../../assets/partners/lek.png";
import mckinsey      from "../../../assets/partners/mckinsey.png";
import parthenon     from "../../../assets/partners/parthenon.webp";
import peers         from "../../../assets/partners/peers.png";
import trading       from "../../../assets/partners/trading-com-dados.png";
import visagio       from "../../../assets/partners/visagio.png";
import xp            from "../../../assets/partners/xp.png";

const RED        = "#C02121";
const BG         = "#0e0404";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const PARTNERS = [
  { name: "PEERS",              logo: peers      },
  { name: "Kearney",            logo: kearney    },
  { name: "Accenture",          logo: accenture  },
  { name: "EY",                 logo: ey         },
  { name: "IGC",                logo: igc        },
  { name: "Bain & Company",     logo: bain       },
  { name: "McKinsey & Company", logo: mckinsey   },
  { name: "BCG",                logo: bcg        },
  { name: "XP Investimentos",   logo: xp         },
  { name: "Ambev",              logo: ambev      },
  { name: "LEK",                logo: lek        },
  { name: "Visagio",            logo: visagio    },
  { name: "Julius Bär",         logo: juliusBaer },
  { name: "Trading com Dados",  logo: trading    },
  { name: "Bloomberg",          logo: bloomberg  },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 80px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Header = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.1s forwards;`}
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(250,242,234,0.08);
`;

const Label = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(250,242,234,0.3);
  white-space: nowrap;
`;

const LogoGrid = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px 40px;
  flex-wrap: wrap;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.2s forwards;`}
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  flex: 1;
  min-width: 100px;
`;

const LogoImg = styled.img`
  height: 100%;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.25;
  transition: opacity 0.25s ease;

  &:hover { opacity: 0.7; }
`;

const LogoPlaceholder = styled.div`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(250,242,234,0.2);
  text-transform: uppercase;
  transition: color 0.25s ease;

  &:hover { color: rgba(250,242,234,0.6); }
`;

export default function AboutPartners() {
  const wrapperRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const { ref, visible }             = useInView();
  const { ref: gridRef, visible: gridVisible } = useInView();

  useParticles(wrapperRef as React.RefObject<HTMLDivElement>, canvasRef);

  return (
    <Section ref={wrapperRef}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <Inner style={{ position: "relative", zIndex: 1 }}>
        <Header ref={ref} $visible={visible}>
          <Line />
          <Label>Nossos parceiros</Label>
          <Line />
        </Header>

        <LogoGrid ref={gridRef} $visible={gridVisible}>
          {PARTNERS.map(p => (
            <LogoItem key={p.name}>
              {p.logo
                ? <LogoImg src={p.logo} alt={p.name} />
                : <LogoPlaceholder>{p.name}</LogoPlaceholder>
              }
            </LogoItem>
          ))}
        </LogoGrid>
      </Inner>
    </Section>
  );
}