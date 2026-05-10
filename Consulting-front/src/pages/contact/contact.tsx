import styled from "styled-components";
import Footer from "@/components/footerNovo";
import WppButton from "@/components/wppButton";
import Hero from "./components/hero";

function Contact() {
  return (
    <HomeContainer>
      <WppButton/>
      <Hero/>
      <Footer/>
    </HomeContainer>
  )
}

export default Contact

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:100%;
`; 

