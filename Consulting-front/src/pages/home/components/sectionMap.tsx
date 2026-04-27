import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
`;

const c = {
  black: "#080F0F", red: "#C02121", linen: "#F5E6DC",
  border: "#E0D6CF", maroon: "rgba(35,6,6,0.25)", linenAlpha: "rgba(245,230,220,0.08)",
};

const FONT = `'Inter', sans-serif`;

const Section = styled.section`
  width: 100%; max-width: 1100px; margin: 0 auto;
  font-family: ${FONT}; padding: 4rem 0;
`;

const Header = styled.div`text-align: center; margin-bottom: 2rem;`;

const Eyebrow = styled.p`
  font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: ${c.red}; margin: 0 0 0.6rem;
`;

const Title = styled.h2`
  font-family: ${FONT}; font-size: 32px; font-weight: 700;
  color: ${c.black}; margin: 0;
`;

const Nav = styled.div`display: flex; border-top: 1px solid ${c.border};`;

const Tab = styled.span`
  padding: 0.85rem 1.5rem; font-size: 16px; font-weight: 700;
  color: ${c.black}; background: ${c.linen};
  border-top: 2px solid ${c.red}; margin-top: -1px;
`;

const Wrap = styled.div`
  display: flex; height: 420px; overflow: hidden;
  border-radius: 0 0 4px 4px; box-shadow: 0 8px 40px rgba(8,15,15,0.12);
`;

const Panel = styled.div`
  width: 36%; flex-shrink: 0; background: ${c.red};
  padding: 2.5rem 2rem; display: flex; flex-direction: column;
  justify-content: space-between; position: relative; overflow: hidden;
  &::before {
    content: ''; position: absolute; bottom: -60px; left: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: ${c.maroon}; pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: -40px; right: -40px;
    width: 140px; height: 140px; border-radius: 50%;
    background: ${c.linenAlpha}; pointer-events: none;
  }
`;

const OfficeName = styled.p`
  font-family: ${FONT}; font-size: 20px; font-weight: 400;
  color: #fff; margin: 0 0 1.25rem;
`;

const Address = styled.address`
  font-size: 16px; font-weight: 400;
  color: rgba(255,255,255,0.85); line-height: 1.5; font-style: normal;
  strong { font-weight: 700; color: #fff; display: block; margin-bottom: 0.25rem; }
`;

const MapsLink = styled.a`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 16px; font-weight: 700; color: #fff; text-decoration: none;
  margin-top: 1.5rem; padding-bottom: 2px;
  border-bottom: 1px solid rgba(255,255,255,0.4); width: fit-content;
  transition: border-color 0.2s, opacity 0.2s;
  &:hover { border-color: #fff; opacity: 0.9; }
  &:hover span { transform: translateX(4px); }
  span { display: inline-block; transition: transform 0.2s; }
`;

const MapFrame = styled.div`
  flex: 1;
  iframe { width: 100%; height: 100%; border: 0; display: block; }
  @media (max-width: 680px) { height: 280px; }
`;

export default function OfficeMap() {
  return (
    <>
      <GlobalStyle />
      <Section>
        <Header>
          <Eyebrow>Onde estamos</Eyebrow>
          <Title>Nosso escritório</Title>
        </Header>

        <Nav>
          <Tab>São Paulo</Tab>
        </Nav>

        <Wrap>
          <Panel>
            <div>
              <OfficeName>São Paulo</OfficeName>
              <Address>
                <strong>Insper Jr.</strong>
                R. Quatá, 200 — 1º Andar<br />
                Vila Olímpia<br />
                04546-042 São Paulo, SP<br />
                Brasil
              </Address>
            </div>
            <MapsLink
              href="https://www.google.com/maps/place/R.+Quat%C3%A1,+200+-+1%C2%BA+Andar+-+Vila+Ol%C3%ADmpia,+S%C3%A3o+Paulo+-+SP,+04546-041/@-23.5990549,-46.675479,17z"
              target="_blank" rel="noopener noreferrer"
            >
              Abrir no Google Maps <span>→</span>
            </MapsLink>
          </Panel>

          <MapFrame>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0!2d-46.675479!3d-23.5990549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5753605b7ef1%3A0xe4a8a4037abb6338!2sR.%20Quat%C3%A1%2C%20200%20-%20Vila%20Ol%C3%ADmpia%2C%20S%C3%A3o+Paulo%20-%20SP%2C%2004546-041!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Localização do escritório — Vila Olímpia, São Paulo"
            />
          </MapFrame>
        </Wrap>
      </Section>
    </>
  );
}
