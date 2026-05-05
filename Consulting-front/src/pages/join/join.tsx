import styled from "styled-components";
import Header from "../../components/header";
import Footer from "@/components/footerNovo";
import WppButton from "@/components/wppButton";
import Hero from "./components/Hero";
import Valores from "./components/Valores";
import Benefits from "./components/Benefits";
import InscricaoCTA from "./components/InscricaoCTA";
import TimeLine from "./components/TimeLine";

function Join() {
  return (
    <JoinContainer>
      <WppButton />
      <Header />
      <Hero />
      <Valores />
      <Benefits />
      <TimeLine />
      <InscricaoCTA />
      <Footer />
    </JoinContainer>
  );
}

export default Join;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
