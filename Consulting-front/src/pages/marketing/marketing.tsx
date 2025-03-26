import { useState } from 'react'
import Insper from "../../assets/Insper.png"
import Header from "../../components/header"
import Clients from "../../components/clientes"
import { Link } from "react-router-dom";
import { List, X, CaretDown } from "phosphor-react";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";
import Hero from "./components/Hero";
import Intro from './components/Intro';
import WhatToExpect from './components/toExpect';
import SuccessCase from './components/successCase';
import Synergy from './components/synergy';

function Marketing() {

  return (
    <>
      <MarketingContainer>
        <Header />
        <Hero />
        <Intro />
        <Clients />
        <WhatToExpect />
        <Card>
          <SuccessCase />
        </Card>
      </MarketingContainer>
      <Synergy />
    </>
  )
}

export default Marketing


const MarketingContainer = styled.div`
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