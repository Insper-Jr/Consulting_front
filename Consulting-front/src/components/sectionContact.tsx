import React from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { RED, RED_DARK } from "../styles/tokens";

const fadeUp = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}`;

const c = {
  black: "#080F0F", crimson: RED_DARK, red: RED,
};

const FONT = `'Inter', sans-serif`;

const Section = styled.section<{ $white?: boolean }>`
  background: ${p => p.$white ? "#fff" : "#FAF2EA"}; padding: 36px 24px; font-family: ${FONT};
`;
const Container = styled.div`max-width: 1040px; margin: 0 auto;`;

const Divider = styled.div`
  height: 1px; margin: 0 0 24px;
  background: linear-gradient(90deg, transparent, ${c.red} 20%, ${c.crimson} 50%, ${c.red} 80%, transparent);
`;

const TopRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap; animation: ${fadeUp} 0.5s ease both;
`;

const Title = styled.h2`
  font-family: ${FONT}; font-weight: 700; font-size: 32px;
  color: ${c.black}; margin: 0;
`;

const ContactButton = styled.a`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 20px; background: ${c.red}; color: #fff;
  font-family: ${FONT}; font-size: 16px; font-weight: 700;
  text-decoration: none; cursor: pointer; transition: background 0.2s ease;
  &:hover { background: ${c.crimson}; }
  svg { width: 15px; height: 15px; flex-shrink: 0; }
`;

export default function ContactSection({ $white }: { $white?: boolean }) {
  const { t } = useTranslation();

  return (
    <>
      <Section $white={$white}>
        <Container>
          <Divider />
          <TopRow>
            <Title>{t("sectionContact.title")}</Title>
            <ContactButton href="/contact">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {t("sectionContact.button")}
            </ContactButton>
          </TopRow>
        </Container>
      </Section>
    </>
  );
}
