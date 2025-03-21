import { useState } from 'react'
import Insper from "../../assets/Insper.png"
import Header from "../../components/header"
import Clients from "../../components/clientes"
import { Link } from "react-router-dom";
import { List, X, CaretDown } from "phosphor-react";
import styled from "styled-components";
import LogoWR from "../assets/ijr/insperjr-white-red.png";

function Home() {

  return (
    <>
      <Header />
      <Teste>
        {/* <img src={Insper} alt="Insper" /> */}
        <h1>Consulting</h1>
        <p>Consulting is a consulting company that helps you with your business</p>
        <button>Get Started</button>
      </Teste>
      <Clients />
    </>
  )
}

export default Home

const Teste = styled.div`
  height: 800px;
`;