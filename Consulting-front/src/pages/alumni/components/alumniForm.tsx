import { useState, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
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
          <Eyebrow>Comunidade</Eyebrow>
          <Title>
            Fez parte da Insper Jr?<br />
            Reconecte-se.
          </Title>
          <Subtitle>
            Preencha abaixo para solicitar entrada na nossa comunidade de
            ex-membros. Nossa equipe entrará em contato em até 3 dias úteis.
          </Subtitle>

          {submitted ? (
            <SuccessBox>
              <SuccessIcon aria-hidden="true">✓</SuccessIcon>
              <SuccessTitle>Solicitação enviada!</SuccessTitle>
              <SuccessText>
                Recebemos seus dados. O diretor institucional entrará em
                contato em breve para confirmar sua entrada no grupo.
              </SuccessText>
            </SuccessBox>
          ) : (
            <Form>
              <Row>
                <Field>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name" name="name" type="text"
                    placeholder="Seu nome" value={form.name}
                    onChange={handleChange} autoComplete="name"
                  />
                </Field>
                <Field>
                  <Label htmlFor="year">Ano de saída</Label>
                  <Input
                    id="year" name="year" type="text"
                    placeholder="Ex: 2022" value={form.year}
                    onChange={handleChange} maxLength={4}
                  />
                </Field>
              </Row>

              <Row>
                <Field>
                  <Label htmlFor="role">Cargo atual</Label>
                  <Input
                    id="role" name="role" type="text"
                    placeholder="Ex: Analista" value={form.role}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company" name="company" type="text"
                    placeholder="Onde você está hoje" value={form.company}
                    onChange={handleChange}
                  />
                </Field>
              </Row>

              <Field>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin" name="linkedin" type="text"
                  placeholder="linkedin.com/in/seuperfil" value={form.linkedin}
                  onChange={handleChange} autoComplete="url"
                />
              </Field>

              <Field>
                <Label htmlFor="contact">WhatsApp ou e-mail</Label>
                <Input
                  id="contact" name="contact" type="text"
                  placeholder="Para entrarmos em contato" value={form.contact}
                  onChange={handleChange}
                />
              </Field>

              <Notice>
                As solicitações passam por uma etapa de validação pelo
                diretor institucional antes da adição ao grupo.
              </Notice>

              <SubmitBtn
                onClick={handleSubmit}
                disabled={!isValid || loading}
                aria-label="Enviar solicitação"
              >
                {loading ? <Spinner /> : "Enviar solicitação"}
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
  max-width: 1240px;
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
  font-family: ${FONT_BODY};
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