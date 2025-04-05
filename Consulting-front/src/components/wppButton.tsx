// src/components/WhatsAppWidget.tsx
import { useState } from "react";
import styled from "styled-components";
import whatsIcon from "../assets/whatsappIcon.png";
import bg from "../assets/backgrounds/wpp-background.png";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = () => {
    const { name, email, phone } = formData;
    const message = `Olá! Meu nome é ${name}, meu email é ${email} e meu telefone é ${phone}. Gostaria de saber mais sobre as soluções da Insper Jr.!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=5511944751602&text=${encoded}`, "_blank");
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
              placeholder="Nome *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="E-mail *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              placeholder="Telefone *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <SendButton onClick={handleSubmit}>Iniciar conversa</SendButton>
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
`;

const FloatingButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  img {
    width: 60px;
  }

  span {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #d4fdd1;
    padding: 5px 12px;
    border-radius: 20px;
    font-weight: bold;
    font-family: "Inter", sans-serif;
    color: #134c13;
    white-space: nowrap;
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
  padding: 1rem;
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
