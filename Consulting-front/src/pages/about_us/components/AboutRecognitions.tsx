import React from "react";
import styled, { keyframes, css } from "styled-components";
import BrasilJunior from "../../../assets/awards/brasil_junior.png";
import Falconi      from "../../../assets/awards/falconi.png";
import Fejesp       from "../../../assets/awards/fejesp.png";
import Enej         from "../../../assets/awards/enej.png";
import { useInView } from "../../../hooks/useInView";

const RED        = "#C02121";
const DARK       = "#1a1a18";
const MUTED      = "#7a746e";
const BG         = "#FAF2EA";
const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;
const SPRING     = "cubic-bezier(0.16,1,0.3,1)";

const RECOGNITIONS = [
  {
    logo: BrasilJunior,
    name: "Brasil Júnior",
    description: "Confederação nacional do Movimento Empresa Júnior, que certifica empresas de alto impacto em todo o Brasil.",
  },
  {
    logo: Falconi,
    name: "Falconi",
    description: "Prêmio concedido a organizações que demonstram excelência em gestão e comprometimento com resultados.",
  },
  {
    logo: Fejesp,
    name: "FEJESP",
    description: "Federação das Empresas Juniores do Estado de São Paulo, que fomenta padrões de qualidade e representa o MEJ paulista.",
  },
  {
    logo: Enej,
    name: "ENEJ",
    description: "Encontro Nacional de Empresas Juniores, maior evento do MEJ no Brasil, onde participamos e nos destacamos.",
  },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${BG};
  width: 100%;
  padding: 56px 0;
  box-sizing: border-box;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Header = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 520px;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.1s forwards;`}
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${RED};
`;

const Title = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: clamp(22px, 2.6vw, 28px);
  font-weight: 700;
  color: ${DARK};
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
`;

const Divider = styled.div`
  width: 32px;
  height: 2px;
  background: ${RED};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(26,26,24,0.08);
  border: 1px solid rgba(26,26,24,0.08);

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RecognitionCard = styled.div<{ $visible: boolean; $delay: number }>`
  background: #fff;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  border: 1px solid transparent;
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.7s ${SPRING} ${p.$delay}s forwards;`}
  transition: background 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: rgba(192,33,33,0.05);
    border-color: rgba(192,33,33,0.45);
  }
`;

const CardAccent = styled.div`
  width: 20px;
  height: 2px;
  background: ${RED};
  transition: width 0.3s ${SPRING};

  ${RecognitionCard}:hover & {
    width: 40px;
  }
`;

const LogoWrap = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 100%;
  width: auto;
  max-width: 100px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: filter 0.25s ease, opacity 0.25s ease;

  ${RecognitionCard}:hover & {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  color: ${DARK};
  letter-spacing: 0.02em;
`;

const CardText = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${MUTED};
  line-height: 1.55;
  margin: 0;
`;

export default function AboutRecognitions() {
  const { ref: headerRef, visible: headerVisible } = useInView();
  const { ref: gridRef,   visible: gridVisible   } = useInView();

  return (
    <Section>
      <Inner>
        <Header ref={headerRef} $visible={headerVisible}>
          <Eyebrow>Credibilidade</Eyebrow>
          <Title>Reconhecimentos que importam</Title>
          <Divider />
        </Header>

        <Grid ref={gridRef}>
          {RECOGNITIONS.map((r, i) => (
            <RecognitionCard key={r.name} $visible={gridVisible} $delay={0.1 + i * 0.08}>
              <CardAccent />
              <LogoWrap>
                <Logo src={r.logo} alt={r.name} />
              </LogoWrap>
              <CardBody>
                <CardName>{r.name}</CardName>
                <CardText>{r.description}</CardText>
              </CardBody>
            </RecognitionCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
