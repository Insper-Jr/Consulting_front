import styled, { createGlobalStyle } from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@400;500&display=swap');
`;

const icons = {
  email: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.118 1.528 5.849L.057 23.5l5.797-1.521A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.367l-.36-.215-3.714.974.992-3.629-.233-.372A9.818 9.818 0 1 1 12 21.818z"/></svg>,
};

const Wrap = styled.footer`
  background: #111110;
  color: #e8e4dc;
  font-family: 'DM Sans', sans-serif;
  padding: 0 72px;
  box-sizing: border-box;
  /* Linha decorativa no topo com gradiente da paleta */
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, #230606, #691212, #C02121, #691212, #230606) 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1px 1fr 1px 1fr;
  gap: 0 48px;
  padding: 56px 0 48px;
`;

const Divider = styled.div`
  width: 1px;
  /* Gradiente vertical com o vermelho escuro da paleta */
  background: linear-gradient(to bottom, transparent, #691212 30%, #691212 70%, transparent);
  align-self: stretch;
`;

const BrandLogo = styled.img`
  height: 56px;
  width: auto;
  margin-bottom: 16px;
  margin-left: -37px;
  display: block;
`;

const BrandDesc = styled.p`
  font-size: 13px;
  color: rgba(232,228,220,0.5);
  line-height: 1.7;
  font-weight: 300;
  max-width: 260px;
  margin: 0 0 24px;
`;

const Label = styled.p`
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(232,228,220,0.35);
  font-weight: 500;
  margin: 0 0 20px;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLink = styled.a`
  font-size: 14px;
  color: rgba(232,228,220,0.75);
  text-decoration: none;
  font-weight: 300;
  transition: color 0.2s, padding-left 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  /* Bolinha vermelha que aparece no hover */
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #C02121;
    opacity: 0;
    transition: opacity 0.2s;
    flex-shrink: 0;
  }

  &:hover {
    color: #e8e4dc;
    padding-left: 2px;
    &::before { opacity: 1; }
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: rgba(232,228,220,0.75);
  font-size: 13px;
  font-weight: 300;
  transition: color 0.2s;
  &:hover { color: #e8e4dc; }
  &:hover span {
    border-color: #C02121;
    background: rgba(192,33,33,0.12);
    color: #C02121;
  }
`;

const IconBox = styled.span`
  width: 32px;
  height: 32px;
  /* Borda com tom escuro da paleta por padrão */
  border: 1px solid #691212;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(232,228,220,0.6);
  transition: border-color 0.2s, background 0.2s, color 0.2s;
`;

const BottomBar = styled.div`
  border-top: 1px solid #230606;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LegalText = styled.span`
  font-size: 11px;
  color: rgba(232,228,220,0.3);
  font-weight: 300;
  letter-spacing: 0.02em;
`;

const LegalLink = styled.a`
  font-size: 11px;
  color: rgba(232,228,220,0.3);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s;
  &:hover { color: #C02121; }
`;


const areas = ["Business", "Engenharia & Tecnologia", "Direito", "Processos"];

const contacts = [
  { label: "pedrodp@insperjr.com", href: "mailto:pedrodp@insperjr.com", icon: icons.email },
  { label: "LinkedIn", href: "https://br.linkedin.com/company/insper-jr-consulting", icon: icons.linkedin },
  { label: "Instagram", href: "https://www.instagram.com/insperjr", icon: icons.instagram },
  { label: "(11) 99898-3364", href: "https://api.whatsapp.com/send/?phone=5511998983364&text&type=phone_number&app_absent=0", icon: icons.whatsapp },
];

const legalLinks = [
  { label: "Política de privacidade", href: "#" },
  { label: "Termos de uso", href: "#" },
];


export default function Footer() {
  return (
    <>
      <GlobalFonts />
      <Wrap>
        <Grid>
          <div>
            <BrandLogo src={LogoWR} alt="Insper Jr." />
            <BrandDesc>Transformando realidades com soluções inovadoras</BrandDesc>
          </div>
          <Divider />
          <div>
            <Label>Nossas Áreas</Label>
            <NavList>
              {areas.map(a => <li key={a}><NavLink href="#">{a}</NavLink></li>)}
            </NavList>
          </div>
          <Divider />
          <div>
            <Label>Contato</Label>
            <ContactList>
              {contacts.map(c => (
                <ContactLink key={c.label} href={c.href}>
                  <IconBox>{c.icon}</IconBox>
                  {c.label}
                </ContactLink>
              ))}
            </ContactList>
          </div>
        </Grid>
        <BottomBar>
          <LegalText>© 2026 Insper Jr. Todos os direitos reservados.</LegalText>
          <div style={{ display: "flex", gap: "28px" }}>
            {legalLinks.map(l => <LegalLink key={l.label} href={l.href}>{l.label}</LegalLink>)}
          </div>
        </BottomBar>
      </Wrap>
    </>
  );
}