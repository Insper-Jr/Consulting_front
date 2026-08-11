import Header from "../../components/header"
import Clients from "../../components/clientes"
import styled from "styled-components";
import Hero from "./components/hero";
import Intro from './components/intro/IntroSection';
import SolutionsCarousel from "@/components/solutionsCarousel";
import CardCase from "./components/caseCard"
import Cases from "./components/sectionCases"
import TestimonialsSection from "@/components/depoimentos";
import Footer from "@/components/footerNovo";
import FAQ from "./components/Faq";
import Hero_Break from "@/components/transformeBreak";
import WppButton from "@/components/wppButton";
import InteractiveSelector from "./components/interactiveSelector";
import SectionMap from "./components/sectionMap";
import ContactSection from "../../components/sectionContact";
import PartnersRows from "./components/partnersRows";


function Home() {
  return (
    <HomeContainer>
      <WppButton/>
      <Header />
      <Hero />
      <Intro />
      <PartnersRows />

      <InteractiveSelector />
      <SectionMap />
      <ContactSection $white />
      {/* <Hero_Break/> */}
      <Footer/>
    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:100%;
`; 

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
`;

