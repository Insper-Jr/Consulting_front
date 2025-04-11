import React, {useState} from "react";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

// Componente final
const DiagnosticForm = ({onClose} : {onClose: () => void}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_phone: "",
    company_name: "",
    cf_description: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const validateForm = () => {
    const {name, email, mobile_phone, company_name, cf_description} = form

    if (!name || !email || !mobile_phone || !company_name || !cf_description) {
      toast.error("Por favor, preencha todos os campos obrigatórios.")
      return false
    }

    if (!email.includes("@") || !email.includes(".")){
      toast.error("Digite um e-mail válido")
      return false
    }

    if (mobile_phone.replace(/\D/g, "").length < 8) {
      toast.error("Digite um mobile_phone válido.")
      return false
    }

    return true
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name) {
      form.company_name = "Não informado"
    }

    if (!validateForm()) return

    try {
      const response = await fetch("https://consulting-back.onrender.com/api/rdstation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          },
        body: JSON.stringify(form),
      });

      
      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (!response.ok) throw new Error("Erro no envio");

      toast.success("Formulário enviado com sucesso!");
      setForm({name: "", email: "", mobile_phone: "", company_name: "", cf_description: ""}) 
      onClose(); 
    } catch (error) {
      
      console.error("Erro na requisição:", error);
      toast.error("Erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  };

  return (
    <FormContainer onClick={(e) => e.stopPropagation()} >
      <CloseButton onClick={onClose}>×</CloseButton>
      <FormTitle>Diagnóstico Gratuito</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FieldWrapper>
          <FieldTitle>Nome Completo</FieldTitle>
          <FieldInput type="text" 
          name="name"
          placeholder="Digite seu nome" 
          value={form.name}
          onChange={handleChange}
          required/>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Email</FieldTitle>
          <FieldInput type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
            required/>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Celular</FieldTitle>
          <FieldInput type="tel" 
          name="mobile_phone"
          placeholder="Digite seu número de celular" 
          value={form.mobile_phone} 
          onChange={handleChange}
          required />
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Nome da Empresa</FieldTitle>
          <FieldInput type="text" 
          name="company_name"
          placeholder="Digite o nome da sua empresa"
          value={form.company_name} 
          onChange={handleChange}
          />
        </FieldWrapper>

        <FieldWrapperTextArea className="textarea-container">
          <FieldTitle>Como podemos te ajudar</FieldTitle>
          <FieldTextArea 
          name="cf_description"
          placeholder="Uma breve descrição de como poderíamos te ajudar" 
          value={form.cf_description} 
          onChange={handleChange}
          required />
        </FieldWrapperTextArea>

        <SubmitButton type="submit">Enviar</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default DiagnosticForm;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

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
