import { useState } from 'react'
import Insper from "../../assets/Insper.png"
import Header from "../../components/header"
import Clients from "../../components/clientes"
import { Link } from "react-router-dom";
import { List, X, CaretDown } from "phosphor-react";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";
import Hero from "./components/hero";
import Intro from './components/intro';
import WhatToExpect from './components/toExpect';
import SuccessCase from './components/successCase';
import Synergy from './components/synergy';
import Depoimentos from '@/components/depoimentos';
import Footer from '@/components/footer';

function Operational() {

  return (
    <>
      <OperacionalContainer>
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
      </OperacionalContainer>

    </>
  )
}

export default Operational


const OperacionalContainer = styled.div`
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