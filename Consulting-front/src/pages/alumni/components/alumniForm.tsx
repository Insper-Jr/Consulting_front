import { useState, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useParticles } from "../../../hooks/useParticleBackground";
import {
  RED, RED_DEEP, BG_DARK,
  FONT_TITLE, FONT_BODY, TYPE, SPACING, SPRING,
  MUTED, BORDER_DARK,
} from "../../processos/components/tokens";

interface FormData {
  name:     string;
  year:     string;
  role:     string;
  company:  string;
  linkedin: string;
  contact:  string;
}

const INITIAL_STATE: FormData = {
  name: "", year: "", role: "", company: "", linkedin: "", contact: "",
};

const AlumniForm = () => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  const [g,   setG]   = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return;
    setG({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const [form,      setForm]      = useState<FormData>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = Object.values(form).every((v) => v.trim() !== "");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Section
      ref={wrapperRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }} />

      <Blueprint />

      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,33,33,0.12) 0%, transparent 65%)",
        left: g.x, top: g.y, transform: "translate(-50%,-50%)",
        opacity: hov ? 1 : 0, transition: "opacity .35s ease",
        pointerEvents: "none", zIndex: 1, mixBlendMode: "screen",
      }} />

      <Vignette />

      <Inner>
        <FormWrap>
          <Eyebrow>{t("alumni.form.eyebrow")}</Eyebrow>
          <Title>
            {t("alumni.form.title.line1")}<br />
            {t("alumni.form.title.line2")}
          </Title>
          <Subtitle>
            {t("alumni.form.subtitle")}
          </Subtitle>

          {submitted ? (
            <SuccessBox>
              <SuccessIcon aria-hidden="true">✓</SuccessIcon>
              <SuccessTitle>{t("alumni.form.success.title")}</SuccessTitle>
              <SuccessText>
                {t("alumni.form.success.text")}
              </SuccessText>
            </SuccessBox>
          ) : (
            <Form>
              <Row>
                <Field>
                  <Label htmlFor="name">{t("alumni.form.fields.name.label")}</Label>
                  <Input
                    id="name" name="name" type="text"
                    placeholder={t("alumni.form.fields.name.placeholder")} value={form.name}
                    onChange={handleChange} autoComplete="name"
                  />
                </Field>
                <Field>
                  <Label htmlFor="year">{t("alumni.form.fields.year.label")}</Label>
                  <Input
                    id="year" name="year" type="text"
                    placeholder={t("alumni.form.fields.year.placeholder")} value={form.year}
                    onChange={handleChange} maxLength={4}
                  />
                </Field>
              </Row>

              <Row>
                <Field>
                  <Label htmlFor="role">{t("alumni.form.fields.role.label")}</Label>
                  <Input
                    id="role" name="role" type="text"
                    placeholder={t("alumni.form.fields.role.placeholder")} value={form.role}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="company">{t("alumni.form.fields.company.label")}</Label>
                  <Input
                    id="company" name="company" type="text"
                    placeholder={t("alumni.form.fields.company.placeholder")} value={form.company}
                    onChange={handleChange}
                  />
                </Field>
              </Row>

              <Field>
                <Label htmlFor="linkedin">{t("alumni.form.fields.linkedin.label")}</Label>
                <Input
                  id="linkedin" name="linkedin" type="text"
                  placeholder={t("alumni.form.fields.linkedin.placeholder")} value={form.linkedin}
                  onChange={handleChange} autoComplete="url"
                />
              </Field>

              <Field>
                <Label htmlFor="contact">{t("alumni.form.fields.contact.label")}</Label>
                <Input
                  id="contact" name="contact" type="text"
                  placeholder={t("alumni.form.fields.contact.placeholder")} value={form.contact}
                  onChange={handleChange}
                />
              </Field>

              <Notice>
                {t("alumni.form.notice")}
              </Notice>

              <SubmitBtn
                onClick={handleSubmit}
                disabled={!isValid || loading}
                aria-label={t("alumni.form.submitButton")}
              >
                {loading ? <Spinner /> : t("alumni.form.submitButton")}
              </SubmitBtn>
            </Form>
          )}
        </FormWrap>
      </Inner>
    </Section>
  );
};

export default AlumniForm;

// ── Styled Components ──────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const Section = styled.div`
  position: relative;
  background: ${BG_DARK};
  padding: ${SPACING.sectionYLarge} 0;
  border-top: 1px solid ${BORDER_DARK};
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 640px) { padding: 60px 0; }
`;

const Blueprint = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .35;
  background-image:
    linear-gradient(rgba(192,33,33,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,33,33,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
`;

const Vignette = styled.div`
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 35%, rgba(14,4,4,0.92) 100%);
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${SPACING.innerPaddingX};
  animation: ${fadeUp} 0.5s ${SPRING} both;

  @media (max-width: 768px) { padding: 0 1.5rem; }
`;

const FormWrap = styled.div`
  max-width: 560px;
`;

const Eyebrow = styled.p`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: ${TYPE.eyebrow.ls};
  text-transform: uppercase;
  color: ${RED};
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.sectionH2.size};
  font-weight: ${TYPE.sectionH2.weight};
  line-height: ${TYPE.sectionH2.lh};
  letter-spacing: ${TYPE.sectionH2.ls};
  color: #ffffff;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.body.size};
  font-weight: ${TYPE.body.weight};
  line-height: ${TYPE.body.lh};
  color: ${MUTED};
  margin-bottom: 40px;

  @media (max-width: 640px) { margin-bottom: 28px; }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 580px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.eyebrow.size};
  font-weight: ${TYPE.eyebrow.weight};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${MUTED};
`;

const Input = styled.input`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.bodySmall.size};
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 11px 16px;
  outline: none;
  transition: border-color 0.2s ${SPRING};

  &::placeholder { color: rgba(255, 255, 255, 0.2); }
  &:focus { border-color: ${RED}; }

  @media (max-width: 640px) { font-size: 16px; padding: 13px 14px; }
`;

const Notice = styled.p`
  font-family: ${FONT_BODY};
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
  line-height: 1.5;
  padding-left: 12px;
  border-left: 2px solid rgba(192, 33, 33, 0.4);
  margin-top: 4px;
`;

const SubmitBtn = styled.button`
  font-family: ${FONT_TITLE};
  font-size: ${TYPE.body.size};
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  background: ${RED};
  border: none;
  border-radius: 4px;
  padding: 14px 36px;
  cursor: pointer;
  align-self: flex-start;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ${SPRING};
  margin-top: 8px;

  &:hover:not(:disabled) { background: ${RED_DEEP}; }
  &:disabled { opacity: 0.4; cursor: default; }

  @media (max-width: 580px) { align-self: stretch; padding: 16px 24px; }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const SuccessBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeUp} 0.4s ${SPRING} both;
`;

const SuccessIcon = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(192, 33, 33, 0.15);
  border: 1px solid rgba(192, 33, 33, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${RED};
`;

const SuccessTitle = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.subTitle.size};
  font-weight: 700;
  color: #ffffff;
`;

const SuccessText = styled.p`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.body.size};
  line-height: ${TYPE.body.lh};
  color: ${MUTED};
  max-width: 420px;
`;