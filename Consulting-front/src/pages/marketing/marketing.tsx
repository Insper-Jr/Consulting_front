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

function Marketing() {

  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Clients />
      <WhatToExpect />
    </>
  )
}

export default Marketing