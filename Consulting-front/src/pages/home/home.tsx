import { Component, useState } from 'react'
import Insper from "../../assets/Insper.png"
import Header from "../../components/header"
import Clients from "../../components/clientes"
import { Link } from "react-router-dom";
import { List, X, CaretDown } from "phosphor-react";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";
import Hero from "./components/Hero";
import Intro from './components/Intro';
import SolutionsCarousel from "@/components/solutionsCarousel";
import CardCase from "./components/CaseCard"


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