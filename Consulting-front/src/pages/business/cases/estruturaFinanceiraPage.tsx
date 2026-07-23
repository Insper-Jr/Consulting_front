import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../../components/header";
import Footer from "../../../components/footerNovo";
import WppButton from "../../../components/wppButton";

const RED        = "#A10F23";
const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 6rem;
  text-align: center;
`;

const Eyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${RED};
  margin: 0 0 1rem;
`;

const Title = styled.h1`
  font-family: ${FONT_TITLE};
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0e0404;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem;
`;

const Badge = styled.span`
  display: inline-block;
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(161,15,35,0.7);
  border: 1px solid rgba(161,15,35,0.3);
  padding: 6px 14px;
  border-radius: 2px;
  margin-bottom: 2rem;
`;

const Body = styled.p`
  font-family: ${FONT_BODY};
  font-size: 16px;
  line-height: 1.65;
  color: #6a6560;
  max-width: 480px;
  margin: 0 0 2.5rem;
`;

const BackLink = styled(Link)`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  color: ${RED};
  text-decoration: none;
  letter-spacing: 0.05em;
  &:hover { text-decoration: underline; }
`;

export default function EstruturaFinanceiraPage() {
  return (
    <PageWrap>
      <WppButton />
      <Header />
      <Main>
        <Eyebrow>Planejamento Financeiro</Eyebrow>
        <Title>Estrutura Financeira para Captação</Title>
        <Badge>Em breve</Badge>
        <Body>Este case está sendo documentado e estará disponível em breve.</Body>
        <BackLink to="/business">← Voltar para Business</BackLink>
      </Main>
      <Footer />
    </PageWrap>
  );
}
