import Header from "../../components/header"
import styled from "styled-components";
import Hero from "./components/hero";
import WppButton from "@/components/wppButton";
import WhoWeAre from "./components/whoWeAre";
import WhatsJunior from "./components/whatsjunior"
import OurTeam from "./components/ourTeam";
import InsperStats from "./components/stats";
import Awards from "./components/awards";

function About_Us() {
  return (
    <HomeContainer>
      <WppButton/>
      <Header />
      <Hero />
      <WhoWeAre />
      <WhatsJunior/>
      <OurTeam/>
      <InsperStats/>
      <Awards/>
    </HomeContainer>
  )
}

export default About_Us

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:100%;
`; 

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
`;

