import { useState } from 'react'
import Insper from "../../assets/Insper.png"
import Header from "../../components/header"
import Clients from "../../components/clientes"
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";
import Hero from "./components/hero";
import Intro from './components/intro';

function Home() {

  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Clients />
    </>
  )
}

export default Home
