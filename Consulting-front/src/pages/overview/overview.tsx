import Header from "../../components/header"
import styled from "styled-components";
import Hero from "./components/hero";
import Intro from './components/intro';
import SolutionsCarousel from "@/components/solutionsCarousel";
import CardCase from "@/pages/home/components/caseCard"
import Cases from "@/pages/home/components/sectionCases"
import TestimonialsSection from "@/components/depoimentos";
import Footer from "@/components/footer";
import Hero_Break from "@/components/transformeBreak";
import WppButton from "@/components/wppButton";
import PartnersCarousel from "./components/partners";


function Overview() {
  return (
    <HomeContainer>
      <WppButton/>
      <Header />
      <Hero />
      <SolutionsCarousel />
      <Intro />
      <PartnersCarousel />
      <Card>
        <CardCase />
      </Card>
      <Cases />
      <TestimonialsSection />
      <Hero_Break/>
      <Footer/>
    </HomeContainer>
  )
}

export default Overview

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

