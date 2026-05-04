import React from "react";
import AboutHero           from "./AboutHero/AboutHero";
import AboutContent        from "./AboutContent/AboutContent";
import AboutHistory        from "./AboutHistory.tsx";
import AboutJuniorMovement from "./AboutJuniorMovement";
import AboutTeam           from "./AboutTeam";
import OurCulture          from "./culture";
import AboutRecognitions   from "./AboutRecognitions";

export default function About_Us() {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <AboutHistory />
      <AboutJuniorMovement />
      <AboutTeam />
      <OurCulture />
      <AboutRecognitions />
    </>
  );
}