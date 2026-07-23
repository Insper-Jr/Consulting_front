import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import TechImg     from "../../../assets/hero/tech3.png";
import BussinesImg from "../../../assets/hero/business2.png";
import LawImg      from "../../../assets/hero/law2.png";
import ProcessImg  from "../../../assets/hero/process6.webp";
import { useTranslation } from "react-i18next";

const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
const FONT_BODY  = `'Inter', Helvetica, sans-serif`;

const SLIDE_DURATION = 6000;

interface Slide {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
  image?: string;
  gradient: string;
  overlayOpacity?: number;
}

const Hero = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const SLIDES: Slide[] = [
    {
      id: "business",
      label: t("hero.business.label"),
      title: t("hero.business.title"),
      subtitle: t("hero.business.subtitle"),
      ctaLabel: t("hero.business.cta"),
      ctaTo: "/overview",
      gradient: "linear-gradient(135deg, #0e0404 0%, #230606 55%, #691212 100%)",
      image: BussinesImg,
      overlayOpacity: 0.4,
    },
    {
      id: "direito",
      label: t("hero.law.label"),
      title: t("hero.law.title"),
      subtitle: t("hero.law.subtitle"),
      ctaLabel: t("hero.law.cta"),
      ctaTo: "/overview",
      gradient: "linear-gradient(135deg, #230606 0%, #691212 55%, #C02121 100%)",
      image: LawImg,
      overlayOpacity: 0.4,
    },
    {
      id: "tech",
      label: t("hero.tech.label"),
      title: t("hero.tech.title"),
      subtitle: t("hero.tech.subtitle"),
      ctaLabel: t("hero.tech.cta"),
      ctaTo: "/overview",
      gradient: "linear-gradient(135deg, #0e0404 0%, #0d1520 55%, #152035 100%)",
      image: TechImg,
      overlayOpacity: 0.4,
    },
    
    {
      id: "processos",
      label: t("hero.processes.label"),
      title: t("hero.processes.title"),
      subtitle: t("hero.processes.subtitle"),
      ctaLabel: t("hero.processes.cta"),
      ctaTo: "/processos",
      gradient: "linear-gradient(135deg, #0e0404 0%, #0e0e0e 55%, #181818 100%)",
      image: ProcessImg,
      overlayOpacity: 0.3,
    },
  ];

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToSlide((current + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, goToSlide]);

  const slide = SLIDES[current];

  return (
    <HeroSection>
      {SLIDES.map((s, i) => (
        <SlideBackground
          key={s.id}
          gradient={s.gradient}
          image={s.image}
          isActive={i === current}
          overlayOpacity={s.overlayOpacity}
        />
      ))}

      <HeroOverlay />

      <HeroContent>
        <ContentInner key={slide.id}>
          <HeroEyebrow>{slide.label}</HeroEyebrow>
          <HeroTitle>{slide.title}</HeroTitle>
          <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
          <HeroCTA to={slide.ctaTo}>{slide.ctaLabel} →</HeroCTA>
        </ContentInner>
      </HeroContent>

      <SlideIndicators>
        {SLIDES.map((s, i) => (
          <SlideIndicator key={s.id} onClick={() => goToSlide(i)}>
            <ProgressTrack>
              <ProgressFill
                key={`${i}-${animKey}`}
                isActive={i === current}
                isPast={i < current}
                duration={SLIDE_DURATION}
              />
            </ProgressTrack>
            <SlideLabel isActive={i === current}>{s.label}</SlideLabel>
          </SlideIndicator>
        ))}
      </SlideIndicators>
    </HeroSection>
  );
};

export default Hero;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

const SlideBackground = styled.div<{ gradient: string; image?: string; isActive: boolean; overlayOpacity?: number }>`
  position: absolute;
  inset: 0;
  background: ${({ image, gradient }) => image ? `url(${image})` : gradient};
  background-size: cover;
  background-position: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(14, 4, 4, ${({ overlayOpacity }) => overlayOpacity ?? 0});
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(14, 4, 4, 0.45) 0%,
    rgba(14, 4, 4, 0.35) 40%,
    rgba(14, 4, 4, 0.82) 100%
  );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 4rem 8rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 1.5rem 9rem;
  }
  @media (max-width: 480px) {
    padding: 0 1.25rem 7rem;
  }
`;

const ContentInner = styled.div`
  max-width: 680px;
`;

const HeroEyebrow = styled.span`
  display: inline-block;
  color: #C02121;
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 0.55s ease both;
  animation-delay: 0.05s;
`;

/* H1 — Montserrat Bold 48px */
const HeroTitle = styled.h1`
  color: #fff;
  font-family: ${FONT_TITLE};
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  animation: ${fadeInUp} 0.55s ease both;
  animation-delay: 0.15s;

  @media (max-width: 768px) { font-size: 36px; }
  @media (max-width: 480px) { font-size: 30px; }
`;

/* Body — Inter Regular 16px */
const HeroSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-family: ${FONT_BODY};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  max-width: 540px;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.55s ease both;
  animation-delay: 0.25s;
`;

/* CTA — Inter Bold 16px */
const HeroCTA = styled(Link)`
  display: inline-block;
  color: #fff;
  font-family: ${FONT_BODY};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  padding: 0.8rem 1.8rem;
  border: 2px solid #fff;
  border-radius: 4px;
  transition: background 0.25s, color 0.25s;
  animation: ${fadeInUp} 0.55s ease both;
  animation-delay: 0.35s;

  &:hover {
    background: #fff;
    color: #0e0404;
  }

  @media (max-width: 480px) { padding: 0.9rem 1.5rem; }
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  max-width: calc(100% - 32px);

  @media (max-width: 600px) {
    gap: 0.75rem;
    bottom: 1.5rem;
  }
`;

const SlideIndicator = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  min-width: 90px;
  flex: 1;

  @media (max-width: 600px) { min-width: 0; }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ isActive: boolean; isPast: boolean; duration: number }>`
  height: 100%;
  background: #C02121;
  border-radius: 2px;

  ${({ isActive, isPast, duration }) =>
    isActive
      ? css`animation: ${fillBar} ${duration}ms linear forwards;`
      : isPast
      ? css`width: 100%;`
      : css`width: 0%;`}
`;

/* Label dos slides — Montserrat */
const SlideLabel = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#fff" : "rgba(255, 255, 255, 0.45)")};
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.3s;
  white-space: nowrap;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;