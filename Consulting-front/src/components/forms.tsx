// src/components/forms.tsx
import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { RED, RED_DARK, FONT_TITLE } from "../styles/tokens";
import { useTranslation } from "react-i18next";

const DiagnosticForm = () => {
  const { t } = useTranslation();
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
      toast.error(t("shared.forms.errors.requiredFields"));
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error(t("shared.forms.errors.invalidEmail"));
      return false;
    }
    if (mobile_phone.replace(/\D/g, "").length < 8) {
      toast.error(t("shared.forms.errors.invalidPhone"));
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
      toast.success(t("shared.forms.success.submitted"));
      setForm({
        name: "",
        email: "",
        mobile_phone: "",
        company_name: "",
        cf_description: "",
      });
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error(t("shared.forms.errors.submitFailed"));
    }
  };

  return (
    <FormCard>
      <AccentLine />
      <FormTitle>{t("shared.forms.title")}</FormTitle>

      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <FieldLabel>{t("shared.forms.fields.name.label")}</FieldLabel>
          <FieldInput
            type="text"
            name="name"
            placeholder={t("shared.forms.fields.name.placeholder")}
            value={form.name}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>{t("shared.forms.fields.email.label")}</FieldLabel>
          <FieldInput
            type="email"
            name="email"
            placeholder={t("shared.forms.fields.email.placeholder")}
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>{t("shared.forms.fields.phone.label")}</FieldLabel>
          <FieldInput
            type="tel"
            name="mobile_phone"
            placeholder={t("shared.forms.fields.phone.placeholder")}
            value={form.mobile_phone}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>{t("shared.forms.fields.company.label")}</FieldLabel>
          <FieldInput
            type="text"
            name="company_name"
            placeholder={t("shared.forms.fields.company.placeholder")}
            value={form.company_name}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <FieldLabel>{t("shared.forms.fields.description.label")}</FieldLabel>
          <FieldTextArea
            name="cf_description"
            rows={2}
            placeholder={t("shared.forms.fields.description.placeholder")}
            value={form.cf_description}
            onChange={handleChange}
            required
          />
        </Field>
        <SubmitButton type="submit">{t("shared.forms.submitButton")}</SubmitButton>
      </StyledForm>
    </FormCard>
  );
};

export default DiagnosticForm;

/* ================== Styled Components ================== */

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  background: rgba(8, 15, 15, 0.55);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 26px 28px;
  position: relative;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
  font-family: ${FONT_TITLE};

  @media (max-width: 600px) {
    padding: 22px 20px;
  }
`;

const AccentLine = styled.div`
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${RED}, transparent);
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
  background: ${RED};
  box-shadow: 0 0 12px ${RED};
`;

const StatusText = styled.span`
  color: ${RED};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const FormTitle = styled.h3`
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 18px;
  letter-spacing: -0.01em;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  margin-bottom: 6px;
`;

const inputBase = `
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 9px 14px;
  color: #fff;
  font-size: 14px;
  font-family: ${FONT_TITLE};
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
  background: ${RED};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${FONT_TITLE};
  transition: background 0.2s;

  &:hover {
    background: ${RED_DARK};
  }
`;
