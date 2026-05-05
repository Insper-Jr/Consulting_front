// src/components/forms.tsx
import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

const DiagnosticForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_phone: "",
    company_name: "",
    cf_description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, mobile_phone, cf_description } = form;
    if (!name || !email || !mobile_phone || !cf_description) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Digite um e-mail válido");
      return false;
    }
    if (mobile_phone.replace(/\D/g, "").length < 8) {
      toast.error("Digite um celular válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name) form.company_name = "Não informado";
    if (!validateForm()) return;

    try {
      const response = await fetch(
        "https://consulting-back.onrender.com/api/lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) throw new Error("Erro no envio");
      toast.success("Formulário enviado com sucesso!");
      setForm({
        name: "",
        email: "",
        mobile_phone: "",
        company_name: "",
        cf_description: "",
      });
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  };

  return (
    <FormCard>
      <AccentLine />
      <FormTitle>Comece o seu diagnóstico</FormTitle>

      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <FieldLabel>Nome Completo</FieldLabel>
          <FieldInput
            type="text"
            name="name"
            placeholder="Digite seu nome"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Celular</FieldLabel>
          <FieldInput
            type="tel"
            name="mobile_phone"
            placeholder="Digite seu número de celular"
            value={form.mobile_phone}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Nome da Empresa</FieldLabel>
          <FieldInput
            type="text"
            name="company_name"
            placeholder="Digite o nome da sua empresa"
            value={form.company_name}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <FieldLabel>Como podemos te ajudar</FieldLabel>
          <FieldTextArea
            name="cf_description"
            rows={3}
            placeholder="Uma breve descrição de como poderíamos te ajudar"
            value={form.cf_description}
            onChange={handleChange}
            required
          />
        </Field>
        <SubmitButton type="submit">Enviar Diagnóstico →</SubmitButton>
      </StyledForm>
    </FormCard>
  );
};

export default DiagnosticForm;

/* ================== Styled Components ================== */

const FormCard = styled.div`
  width: 420px;
  max-width: 100%;
  background: rgba(8, 15, 15, 0.55);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 36px;
  position: relative;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
  font-family: "Montserrat", sans-serif;

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

const AccentLine = styled.div`
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c02121, transparent);
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c02121;
  box-shadow: 0 0 12px #c02121;
`;

const StatusText = styled.span`
  color: #c02121;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const FormTitle = styled.h3`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 28px;
  letter-spacing: -0.01em;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.label`
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const inputBase = `
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 12px 14px;
  color: #fff;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, background 0.2s;

  &::placeholder { color: rgba(255, 255, 255, 0.35); }
  &:focus { border-color: rgba(192, 33, 33, 0.5); background: rgba(255, 255, 255, 0.06); }
`;

const FieldInput = styled.input`
  ${inputBase}
`;

const FieldTextArea = styled.textarea`
  ${inputBase}
  resize: none;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  width: 100%;
  background: #c02121;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  transition: background 0.2s;

  &:hover {
    background: #8c0c1e;
  }
`;
