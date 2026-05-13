import styled, { keyframes } from "styled-components";
import { RED, FONT_TITLE, TYPE, SPRING } from "../../processos/components/tokens";

const COMPANIES = [
  "McKinsey & Company",
  "BTG Pactual",
  "Nubank",
  "Bain & Company",
  "Itaú BBA",
  "Accenture",
  "Goldman Sachs",
  "XP Investimentos",
  "Santander",
  "BCG",
];

const AlumniTicker = () => {
  return (
    <Section>
      <Track>
        {/* duplicado para loop contínuo sem salto */}
        {[...COMPANIES, ...COMPANIES].map((name, i) => (
          <Item key={i}>
            <span>{name}</span>
            <Sep aria-hidden="true">·</Sep>
          </Item>
        ))}
      </Track>
    </Section>
  );
};

export default AlumniTicker;

// ── Styled Components ──────────────────────────────────────────────────────

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Section = styled.div`
  background: ${RED};
  overflow: hidden;
  padding: 13px 0;
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 28s linear infinite;

  &:hover { animation-play-state: paused; }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 4px;

  span {
    font-family: ${FONT_TITLE};
    font-size: ${TYPE.eyebrow.size};
    font-weight: ${TYPE.eyebrow.weight};
    letter-spacing: ${TYPE.eyebrow.ls};
    text-transform: uppercase;
    color: #ffffff;
    white-space: nowrap;
  }
`;

const Sep = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
`;