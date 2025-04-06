import React from "react";
import styled from "styled-components";

// Contêiner geral do formulário
const FormContainer = styled.div`
  width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* Para telas entre 800px e 1200px */
  @media (min-width: 800px) and (max-width: 1200px) {
    width: 350px;
  }

  /* Quando a tela for menor que 800px, diminui o tamanho do componente */
  @media (max-width: 800px) {
    width: 300px;
    height: 450px;
  }

`;

// Título do formulário centralizado
const FormTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  color: #000;
  margin-bottom: 8px;
  text-align: center;
@media (max-width: 800px) {
    font-size: 15px;
  }
`;

// Elemento <form> em si
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Container de cada campo
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffefe;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px; /* Reduzido */
  height: 30px; /* Altura reduzida */
    @media (max-width: 800px) {
    height: 20px;
  }
`;

// Extensão do FieldWrapper para o campo de TextArea (maior)
const FieldWrapperTextArea = styled(FieldWrapper)`
  height: auto;
  min-height: 100px; /* Tamanho maior para o container do TextArea */
    @media (max-width: 800px) {
    max-height: 20px;
  }
`;

// Título do campo
const FieldTitle = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 12px; /* Reduzido */
  font-weight: 500;
  color: #6D6D6D;
  padding-left: 5px;
  @media (max-width: 800px) {
    font-size: 10px;
  }
`;

// Input estilizado
const FieldInput = styled.input`
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px; /* Reduzido */
  color: #333;
  width: 100%;
  padding: 5px; /* Reduzido */
  background-color: transparent;

  &::placeholder {
    color: #AAAAAA;
  }
  
  &:focus {
    color: #000;
  }
    @media (max-width: 800px) {
    font-size: 9px;
  }
`;

// TextArea estilizado (menor que os demais)
const FieldTextArea = styled.textarea`
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px; /* Reduzido */
  color: #333;
  width: 100%;
  padding: 5px; /* Reduzido */
  background-color: transparent;
  resize: none;
  height: 60px; /* Menor que os demais */

  &::placeholder {
    color: #AAAAAA;
  }
  
  &:focus {
    color: #000;
  }
    @media (max-width: 800px) {
    font-size: 9px;
  }
`;

// Botão de envio reduzido e centralizado
const SubmitButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-size: 14px; /* Reduzido */
  background-color: #a10f23;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px; /* Menor tamanho */
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  align-self: center; /* Centraliza o botão */

  &:hover {
    background-color: #8c0c1e;
  }
    @media (max-width: 800px) {
        font-size: 12px;
        padding: 5px 10px; /* Menor tamanho */
    }
`;

// Componente final
const DiagnosticForm = () => {
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Lógica de envio do formulário
  };

  return (
    <FormContainer>
      <FormTitle>Diagnóstico Gratuito</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FieldWrapper>
          <FieldTitle>Nome completo</FieldTitle>
          <FieldInput type="text" placeholder="Digite seu nome" required />
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Email</FieldTitle>
          <FieldInput type="email" placeholder="Digite seu email" required />
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Telefone</FieldTitle>
          <FieldInput type="tel" placeholder="Digite seu telefone" required />
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Nome da empresa</FieldTitle>
          <FieldInput type="text" placeholder="Digite o nome da sua empresa" />
        </FieldWrapper>

        <FieldWrapperTextArea className="textarea-container">
          <FieldTitle>Como podemos te ajudar</FieldTitle>
          <FieldTextArea placeholder="Uma breve descrição de como poderíamos te ajudar" required />
        </FieldWrapperTextArea>

        <SubmitButton type="submit">Enviar</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default DiagnosticForm;
