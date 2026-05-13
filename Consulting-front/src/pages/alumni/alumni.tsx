// alumni.tsx

import styled from "styled-components";
import Header            from "../../components/header";
import WppButton         from "@/components/wppButton";
import Footer            from "@/components/footerNovo";
import AlumniHero        from "./components/alumniHero";
import AlumniTicker      from "./components/alumniTicker";
import AlumniCarousel    from "./components/alumniCarousel";
import AlumniForm        from "./components/alumniForm";

function Alumni() {
  return (
    <PageContainer>
      <WppButton />
      <Header />

      <HeroWrap>
        <AlumniHero />
        <TickerAnchor>
          <AlumniTicker />
        </TickerAnchor>
      </HeroWrap>

      <AlumniCarousel />
      <AlumniForm />
      <Footer />
    </PageContainer>
  );
}

export default Alumni;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeroWrap = styled.div`
  position: relative;
`;

const TickerAnchor = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
`;