import styled from "styled-components";
import Header              from "../../components/header";
import WppButton           from "@/components/wppButton";
import Footer              from "@/components/footerNovo";
import AboutHero           from "./components/AboutHero/AboutHero";
import AboutContent        from "./components/AboutContent/AboutContent";
import AboutHistory        from "./components/AboutHistory";
import AboutJuniorMovement from "./components/AboutJuniorMovement";
import AboutTeam           from "./components/AboutTeam";
import AboutPartners       from "./components/AboutPartners";
import AboutCredibility    from "./components/AboutCredibility";
import OurCulture          from "./components/culture";
import AboutRecognitions   from "./components/AboutRecognitions";
import AboutCTA            from "./components/AboutCTA";
import ContactSection from "../home/components/sectionContact";

function About_Us() {
  return (
    <PageContainer>
      <WppButton />
      <Header />
      <AboutHero />
      <AboutContent />
      <AboutHistory />
      <AboutJuniorMovement />
      <AboutTeam />
      <AboutPartners />
      <OurCulture />
      <AboutCredibility />
      <AboutRecognitions />
      <AboutCTA />
      <ContactSection />
      <Footer />
    </PageContainer>
  );
}

export default About_Us;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;