// src/components/WhatsAppWidget.tsx
import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FONT_BODY } from "../styles/tokens";
import { useTranslation } from "react-i18next";
import whatsIcon from "../assets/whatsappIcon.png";
import bg from "../assets/backgrounds/wpp-background.png";

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

const WhatsAppWidget = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartChat = () => {
    if (!formData.name || !formData.message) {
      toast.error(t("shared.wppButton.requiredFieldsError"));
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      category: "engagement",
      action: "click",
      label: "whatsapp_button"
    });

    const message = t("shared.wppButton.prefilledMessage", { name: formData.name, message: formData.message });

    const whatsappURL = `https://api.whatsapp.com/send?phone=5511998983364&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    setIsOpen(!isOpen);
    setFormData({ name: "", message: "" });
  };

  return (
    <Wrapper>
      {isOpen && (
        <FormContainer>
          <FormBody>
            <Greeting>
              {t("shared.wppButton.greeting.line1")} <br />
              {t("shared.wppButton.greeting.line2")}
            </Greeting>
            <Input
              name="name"
              placeholder={t("shared.wppButton.namePlaceholder")}
              value={formData.name}
              onChange={handleChange}
            />
            <InputMessage
              name="message"
              placeholder={t("shared.wppButton.messagePlaceholder")}
              maxLength={100}
              value={formData.message}
              onChange={handleChange}
            />
            <SendButton onClick={handleStartChat}>{t("shared.wppButton.startChatButton")}</SendButton>
          </FormBody>
        </FormContainer>
      )}

      <FloatingButton onClick={() => {setIsOpen(!isOpen); setFormData({ name: "", message: "" })}}>
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
    bottom: 250px;
    right: 5px;
  }
`;

const FloatingButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 80px;
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
  font-family: ${FONT_BODY};
`;

const Input = styled.input`
  background-color: #d4fdd1;
  border: none;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-family: ${FONT_BODY};
`;

const InputMessage = styled.textarea`
  background-color: #d4fdd1;
  border: none;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-family: ${FONT_BODY};
  height: 60px;
  resize: none;
`;

const SendButton = styled.button`
  background-color: #075e54;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  font-family: ${FONT_BODY};

  &:hover {
    background-color: #064c44;
  }
`;
