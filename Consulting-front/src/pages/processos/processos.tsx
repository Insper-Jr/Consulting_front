import React from "react";
import styled from "styled-components";
import Header              from "../../components/header";
import WppButton           from "@/components/wppButton";
import Footer              from "@/components/footerNovo";
import ContactSection from "../../components/sectionContact";
import ProcessosHero    from "./components/processosHero";
import ProcessosScope   from "./components/processosScope";
import ProcessosOutcome from "./components/processosOutcome";
import ProcessosWhy     from "./components/processosWhy";
import ProcessosCTA     from "./components/processosCTA";


function Processos() {
  return (
    <PageContainer>
      <WppButton />
      <Header />
      <ProcessosHero />
      <ProcessosScope />
      <ProcessosOutcome />
      <ProcessosWhy />
      <ProcessosCTA />
      <ContactSection />
      <Footer />
    </PageContainer>
  );
}

export default Processos;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;