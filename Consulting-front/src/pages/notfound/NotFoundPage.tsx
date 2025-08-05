import Header from "../../components/header"
import SolutionsCarousel from "@/components/solutionsCarousel";

import TestimonialsSection from "@/components/depoimentos";
import Footer from "@/components/footer";

import Hero_Break from "@/components/transformeBreak";
import WppButton from "@/components/wppButton";
import styled from "styled-components";
import Background from "./components/background";

function NotFoundPage() {
  return (
    <HomeContainer>
      <Header />
        <Background />
      <Footer/>
    </HomeContainer>
  )
}

export default NotFoundPage

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

