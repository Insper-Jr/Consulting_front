import Header from "../../components/header"
import Clients from "../../components/clientes"
import styled from "styled-components";
import Hero from "./components/hero";
import Intro from './components/intro';
import SolutionsCarousel from "@/components/solutionsCarousel";
import CardCase from "./components/caseCard"
import Cases from "./components/sectionCases"

function Home() {
  return (
    <HomeContainer>
      <Header />
      <Hero />
      <Intro />
      <Clients />
      <SolutionsCarousel />
      <Card>
        <CardCase />
      </Card>
      <Cases />

    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`; 

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
`;

