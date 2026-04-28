import styled, { keyframes } from "styled-components";

import accenture from "../../../assets/partners/accenture.png";
import ambev from "../../../assets/partners/ambev.png";
import bain from "../../../assets/partners/bain.png";
import bcg from "../../../assets/partners/bcg.png";
import bloomberg from "../../../assets/partners/bloomberg.png";
import ey from "../../../assets/partners/ey.png";
import igc from "../../../assets/partners/igc.png";
import integration from "../../../assets/partners/integration.png";
import juliusBaer from "../../../assets/partners/julius-baer.svg";
import kearney from "../../../assets/partners/kearney.png";
import lek from "../../../assets/partners/lek.png";
import mckinsey from "../../../assets/partners/mckinsey.png";
import parthenon from "../../../assets/partners/parthenon.webp";
import peers from "../../../assets/partners/peers.png";
import trading from "../../../assets/partners/trading-com-dados.png";
import visagio from "../../../assets/partners/visagio.png";
import xp from "../../../assets/partners/xp.png";

type Logo = { src: string; scale?: number };

const all: Logo[] = [
  { src: peers },
  { src: kearney },
  { src: accenture },
  { src: ey },
  { src: igc },
  { src: bain },
  { src: mckinsey },
  { src: bcg, scale: 0.85 },
  { src: parthenon, scale: 1.87 },
  { src: integration, scale: 1.4 },
  { src: xp, scale: 1.4 },
  { src: ambev },
  { src: lek },
  { src: visagio },
  { src: juliusBaer },
  { src: trading, scale: 1.4 },
  { src: bloomberg, scale: 1.25 },
];

const fila1 = all.slice(0, 6);
const fila2 = all.slice(6, 11);
const fila3 = all.slice(11);

const PartnersRows = () => {
  return (
    <Section>
      <TitleBlock>
        <Label>PARCEIROS</Label>
        <Title>Nossos Parceiros</Title>
        <RedLine />
      </TitleBlock>

      <Row>
        <Track speed="55s" reverse>
          {[...fila1, ...fila1, ...fila1].map((item, i) => (
            <LogoWrap key={`f1-${i}`} style={{ ["--scale" as string]: item.scale ?? 1 }}>
              <img src={item.src} alt={`Parceiro fila 1 ${i}`} />
            </LogoWrap>
          ))}
        </Track>
      </Row>

      <Row>
        <Track speed="60s">
          {[...fila2, ...fila2, ...fila2].map((item, i) => (
            <LogoWrap key={`f2-${i}`} style={{ ["--scale" as string]: item.scale ?? 1 }}>
              <img src={item.src} alt={`Parceiro fila 2 ${i}`} />
            </LogoWrap>
          ))}
        </Track>
      </Row>

      <Row>
        <Track speed="50s" reverse>
          {[...fila3, ...fila3, ...fila3].map((item, i) => (
            <LogoWrap key={`f3-${i}`} style={{ ["--scale" as string]: item.scale ?? 1 }}>
              <img src={item.src} alt={`Parceiro fila 3 ${i}`} />
            </LogoWrap>
          ))}
        </Track>
      </Row>
    </Section>
  );
};

export default PartnersRows;

const Section = styled.section`
  background: white;
  width: 100%;
  padding: 3rem 3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding-left: 2rem;

  @media (max-width: 600px) {
    padding-left: 1rem;
  }
`;

const Label = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #691212;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #080f0f;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const RedLine = styled.div`
  width: 48px;
  height: 4px;
  background: #691212;
  border-radius: 2px;
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.3333%); }
`;

const Row = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Track = styled.div<{ speed: string; reverse?: boolean }>`
  display: flex;
  width: max-content;
  animation: ${scroll} ${({ speed }) => speed} linear infinite;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "normal")};
`;

const LogoWrap = styled.div`
  flex-shrink: 0;
  height: 140px;
  min-width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;

  img {
    max-height: 70px;
    max-width: 160px;
    object-fit: contain;
    transform: scale(var(--scale, 1));
    transform-origin: center;
  }

  @media (max-width: 600px) {
    height: 90px;
    min-width: 140px;
    margin-right: 1.5rem;

    img {
      max-height: 45px;
      max-width: 95px;
    }
  }
`;
