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
import EscoposTabs from "./components/escoposTabs";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

function Creation() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchParams] = useSearchParams();
    const tabFromURL = parseInt(searchParams.get("tab") ?? "0") || 0;
    useEffect(() => {
      setSelectedTab(tabFromURL); // seta o tab com base no parâmetro da URL
    }, [tabFromURL]);

  return (
    <>
      <CreationContainer>
        <WppButton/>
        <Header />
        <Hero /> 
        <EscoposTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Clients />
        <WhatToExpect selectedTab={selectedTab} />
         <Depoimentos /> 
         <Card>
          <SuccessCase />
        </Card> 
         <Footer />
      </CreationContainer>

    </>
  )
}

export default Creation


const CreationContainer = styled.div`
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