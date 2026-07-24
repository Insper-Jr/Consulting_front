import React from "react";
import styled from "styled-components";
import Header from "../../components/header";
import Footer from "../../components/footerNovo";
import WppButton from "../../components/wppButton";
import ContactSection from "../../components/sectionContact";
import BusinessHero from "./components/businessHero";
import BusinessOpening from "./components/businessOpening";
import BusinessCases from "./components/businessCases";
import BusinessIntegration from "./components/businessIntegration";
import BusinessAbout from "./components/businessAbout";
import BusinessWhy from "./components/businessWhy";
import BusinessCTA from "./components/businessCTA";

function Business() {
  return (
    <PageContainer>
      <WppButton />
      <Header />
      <BusinessHero />
      <BusinessOpening />
      <BusinessCases />
      <BusinessIntegration />
      <BusinessAbout />
      <BusinessWhy />
      <BusinessCTA />
      <ContactSection />
      <Footer />
    </PageContainer>
  );
}

export default Business;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
