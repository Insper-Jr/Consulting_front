import { useState } from 'react'
import Caes from "./CaseCaes"
import Experiencia from "./CaseExperiencia"
import styled from "styled-components";


const Cases = () => {
    const [hovered, setHovered] = useState(false);
  
    return (
      <Wrapper>
        <Header>
            <Line />
            <h2>Cases de Sucesso</h2>
            <Line />
        </Header>

        <Subtitle>
        Transformamos desafios em resultados! Nossos cases de sucesso mostram como nossas soluções impactam diferentes setores, gerando valor real para nossos clientes.      
        </Subtitle>
        <GrupoCases>
        <Caes />
        <Experiencia />
        </GrupoCases>
      </Wrapper>
    );
  };

export default Cases;
  
export const Wrapper = styled.section`
  padding: 4rem 0rem;
  text-align: center;
`;

const GrupoCases = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
`;   

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    color: #A10F23;
    white-space: nowrap;
  }
`;

export const Line = styled.div`
  height: 2px;
  background-color: black;
  width: 100%;
  `;

export const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 2rem auto;
`;