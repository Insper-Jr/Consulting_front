// src/components/WhatsAppWidget.tsx
import React, { useState } from "react";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import whatsIcon from "../assets/whatsappIcon.png";
import bg from "../assets/backgrounds/wpp-background.png";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartChat = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    const message = `Olá, me chamo ${formData.name}, meu e-mail é ${formData.email} e meu telefone é ${formData.phone}. Gostaria de saber mais sobre as soluções da Insper Jr.`;
    
    const whatsappURL = `https://api.whatsapp.com/send?phone=5511944751602&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Wrapper>
      {isOpen && (
        <FormContainer>
          <FormBody>
            <Greeting>
              Olá! Interessado em alavancar seu negócio? <br />
              Preencha seus dados abaixo e um de nossos especialistas entrará em contato para sugerir as melhores soluções!
            </Greeting>
            <Input
              name="name"
              placeholder="Nome *"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="phone"
              placeholder="Telefone *"
              value={formData.phone}
              onChange={handleChange}
            />
            <SendButton onClick={handleStartChat}>Iniciar conversa</SendButton>
          </FormBody>
        </FormContainer>
      )}

      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        <img src={whatsIcon} alt="WhatsApp" />
      </FloatingButton>
    </Wrapper>
  );
};

export default WhatsAppWidget;

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 600px) {
    bottom: 100px;
    right: 10px;
  }
`;

const FloatingButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  img {
    width: 60px;
  }
`;

const FormContainer = styled.div`
  width: 360px;
  background-image: url(${bg});
  background-size: cover;
  border-radius: 16px;
  box-shadow: 0px 4px 15px rgba(0,0,0,0.3);
  overflow: hidden;
  animation: slideUp 0.3s ease-in-out;
`;

const FormBody = styled.div`
  padding: 6rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
`;

const Greeting = styled.div`
  background-color: white;
  padding: 0.8rem;
  font-size: 14px;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: "Inter", sans-serif;
`;

const Input = styled.input`
  background-color: #d4fdd1;
  border: none;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-family: "Inter", sans-serif;
`;

const SendButton = styled.button`
  background-color: #075e54;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Inter", sans-serif;

  &:hover {
    background-color: #064c44;
  }
`;
