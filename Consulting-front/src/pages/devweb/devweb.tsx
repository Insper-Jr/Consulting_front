import WppButton from "@/components/wppButton";
import Header from "../../components/header"
import Clients from "../../components/clientes"
import styled from "styled-components";
import Hero from "./components/hero";
import Intro from './components/intro';
import WhatToExpect from './components/toExpect';
import SuccessCase from './components/successCase';
import Synergy from './components/synergy';
import Depoimentos from '@/components/depoimentos';
import Footer from '@/components/footer';

function DevWeb() {

  return (
    <>
      <DevWebContainer>
        <WppButton/>
        <Header />
        <Hero /> 
        <Intro /> 
        <Clients />
        <WhatToExpect />
         <Depoimentos /> 
         <Card>
          <SuccessCase />
        </Card> 
         <Synergy /> 
         <Footer />
      </DevWebContainer>

    </>
  )
}

export default DevWeb


const DevWebContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width:100%;
`; 

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
  margin-top:50px;
`;