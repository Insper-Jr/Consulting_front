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
import SolutionsCarousel from "@/components/solutionsCarousel";

function Home() {

  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Clients />
      <SolutionsCarousel />
    </>
  )
}

export default Home

const Teste = styled.div`
  height: 800px;
`;