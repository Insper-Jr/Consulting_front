import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";

const fadeUp = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}`;
const shimmer = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
`;

const c = {
  black: "#080F0F", crimson: "#691212", red: "#C02121",
  gray: "#6B7280", grayLight: "#E5E7EB", grayMid: "#9CA3AF",
};

const FONT = `'Inter', sans-serif`;

const Section = styled.section`
  background: #FAF2EA; padding: 36px 24px; font-family: ${FONT};
`;
const Container = styled.div`max-width: 1040px; margin: 0 auto;`;

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

const Divider = styled.div`
  height: 1px; margin: 24px 0;
  background: linear-gradient(90deg, transparent, ${c.red} 20%, ${c.crimson} 50%, ${c.red} 80%, transparent);
`;

const NewsletterRow = styled.div`
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 24px; flex-wrap: wrap; animation: ${fadeUp} 0.5s 0.12s ease both;
`;

const Copy = styled.div`flex: 1; min-width: 200px;`;

const Label = styled.p`
  font-family: ${FONT}; font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: ${c.red}; margin: 0 0 6px;
`;

const Heading = styled.h3`
  font-family: ${FONT}; font-weight: 400; font-size: 20px;
  color: ${c.black}; margin: 0 0 4px; line-height: 1.3;
`;

const Sub = styled.p`
  font-family: ${FONT}; font-size: 16px; font-weight: 400;
  color: ${c.gray}; margin: 0; line-height: 1.5; max-width: 340px;
`;

const Form = styled.div`display: flex; flex: 1; min-width: 260px; max-width: 420px;`;

const EmailInput = styled.input`
  flex: 1; padding: 10px 14px;
  border: 1px solid ${c.grayLight}; border-right: none;
  background: #fff; font-family: ${FONT};
  font-size: 16px; color: ${c.black}; outline: none;
  transition: border-color 0.2s;
  &::placeholder { color: ${c.grayMid}; }
  &:focus { border-color: ${c.crimson}; }
`;

const SubmitBtn = styled.button<{ $loading?: boolean }>`
  padding: 10px 18px; border: none; cursor: pointer;
  background: ${({ $loading }) => $loading ? c.crimson : c.black};
  color: #fff; font-family: ${FONT};
  font-size: 16px; font-weight: 700;
  text-transform: uppercase; white-space: nowrap;
  transition: background 0.2s; position: relative; overflow: hidden;
  &::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
    background-size: 200% 100%;
    animation: ${({ $loading }) => $loading ? shimmer : "none"} 1.2s linear infinite;
  }
  &:hover:not(:disabled) { background: ${c.crimson}; }
  &:disabled { cursor: not-allowed; }
`;

const Success = styled.p`font-family: ${FONT}; font-size: 16px; color: ${c.red}; margin: 0;`;

export default function ContactSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1800);
  };

  return (
    <>
      <GlobalStyle />
      <Section>
        <Container>
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
          <Divider />
          <NewsletterRow>
            <Copy>
              <Label>{t("sectionContact.newsletterLabel")}</Label>
              <Heading>{t("sectionContact.newsletterHeading")}</Heading>
              <Sub>{t("sectionContact.newsletterSub")}</Sub>
            </Copy>
            <div style={{ flex: 1, minWidth: 260, maxWidth: 420 }}>
              {status === "done" ? (
                <Success>{t("sectionContact.success")}</Success>
              ) : (
                <Form>
                  <EmailInput
                    type="email" placeholder={t("sectionContact.emailPlaceholder")} value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={status === "loading"}
                  />
                  <SubmitBtn onClick={handleSubmit} disabled={status === "loading"} $loading={status === "loading"}>
                    {status === "loading" ? t("sectionContact.submitting") : t("sectionContact.submitBtn")}
                  </SubmitBtn>
                </Form>
              )}
            </div>
          </NewsletterRow>
        </Container>
      </Section>
    </>
  );
}
