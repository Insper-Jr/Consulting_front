import { useState, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";
import { useParticles } from "../../../hooks/useParticleBackground";
import { config } from "../../../config/config";
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
  email:    string;
  whatsapp: string;
}

const INITIAL_STATE: FormData = {
  name: "", year: "", role: "", company: "", linkedin: "", email: "", whatsapp: "",
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const FIELD_LABELS: Record<keyof FormData, string> = {
  name:     "Nome completo",
  year:     "Ano de saída",
  role:     "Cargo atual",
  company:  "Empresa",
  linkedin: "LinkedIn",
  email:    "E-mail",
  whatsapp: "WhatsApp",
};

const isFormField = (campo: unknown): campo is keyof FormData =>
  typeof campo === "string" && campo in INITIAL_STATE;

/* O backend responde 422 com as mensagens do Pydantic em ingles. Traduz para o
   texto que o usuario ve; se aparecer uma regra nova que ainda nao esta mapeada,
   cai no fallback em vez de mostrar ingles na tela. */
const traduzirErro = (campo: keyof FormData, msg: string): string => {
  // Validador proprio do backend lanca ValueError, e o Pydantic prefixa a mensagem
  if (msg.startsWith("Value error, ")) return msg.replace("Value error, ", "");

  if (campo === "year" && msg.includes("pattern")) {
    return "Informe o ano com 4 dígitos. Ex: 2022.";
  }
  if (msg.includes("valid email")) return "Digite um e-mail válido.";

  const min = msg.match(/at least (\d+) characters/);
  if (min) return `Precisa ter ao menos ${min[1]} caracteres.`;

  const max = msg.match(/at most (\d+) characters/);
  if (max) return `Deve ter no máximo ${max[1]} caracteres.`;

  return "Valor inválido.";
};

const extrairErros = async (response: Response): Promise<FieldErrors> => {
  const body = await response.json().catch(() => null);
  const detail = body?.detail;
  if (!Array.isArray(detail)) return {};

  const erros: FieldErrors = {};
  for (const item of detail) {
    // loc vem como ["body", "<campo>"]
    const campo = Array.isArray(item?.loc) ? item.loc[item.loc.length - 1] : null;
    if (isFormField(campo)) erros[campo] = traduzirErro(campo, String(item?.msg ?? ""));
  }
  return erros;
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

  // Honeypot: fica fora do FormData de proposito, senao o isValid (que exige
  // todos os campos preenchidos) travaria o botao para sempre.
  const [honeypot, setHoneypot] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Some o erro assim que o usuario mexe no campo, para nao acusar o que ele ja corrigiu
    setFieldErrors((prev) => (prev[name as keyof FormData] ? { ...prev, [name]: undefined } : prev));
  };

  const isValid = Object.values(form).every((v) => v.trim() !== "");

  /* Espelha as regras do CreateAlumniDTO no backend. Sem isso o usuario so
     descobre o problema depois do round-trip que volta 422. */
  const validateForm = () => {
    const erros: FieldErrors = {};

    if (form.name.trim().length < 2)     erros.name = "Precisa ter ao menos 2 caracteres.";
    if (!/^\d{4}$/.test(form.year))      erros.year = "Informe o ano com 4 dígitos. Ex: 2022.";
    if (form.role.trim().length < 2)     erros.role = "Precisa ter ao menos 2 caracteres.";
    if (form.company.trim().length < 2)  erros.company = "Precisa ter ao menos 2 caracteres.";
    if (form.linkedin.trim().length < 3) erros.linkedin = "Precisa ter ao menos 3 caracteres.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      erros.email = "Digite um e-mail válido.";
    }
    if (form.whatsapp.replace(/\D/g, "").length < 8) {
      erros.whatsapp = "Digite um WhatsApp válido.";
    }

    setFieldErrors(erros);
    if (Object.keys(erros).length > 0) {
      toast.error("Revise os campos destacados.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/api/alumni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      if (!response.ok) {
        // 422 = o backend reprovou algum campo. Mostra qual, em vez de um erro generico.
        if (response.status === 422) {
          const erros = await extrairErros(response);
          const campos = Object.keys(erros) as (keyof FormData)[];
          if (campos.length > 0) {
            setFieldErrors(erros);
            toast.error(`Revise: ${campos.map((c) => FIELD_LABELS[c]).join(", ")}.`);
            return;
          }
        }
        throw new Error(`Falha no envio (HTTP ${response.status})`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao enviar a solicitação. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
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
              {/* Isca anti-spam: invisivel para humanos, bots preenchem tudo.
                  Se chegar preenchido no backend, a solicitacao e descartada. */}
              <Honeypot
                type="text" name="website" tabIndex={-1}
                autoComplete="off" aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <Row>
                <Field>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name" name="name" type="text"
                    placeholder="Seu nome" value={form.name}
                    onChange={handleChange} autoComplete="name"
                    $invalid={!!fieldErrors.name}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "name-erro" : undefined}
                  />
                  {fieldErrors.name && <FieldMsg id="name-erro">{fieldErrors.name}</FieldMsg>}
                </Field>
                <Field>
                  <Label htmlFor="year">Ano de saída</Label>
                  <Input
                    id="year" name="year" type="text"
                    placeholder="Ex: 2022" value={form.year}
                    onChange={handleChange} maxLength={4}
                    $invalid={!!fieldErrors.year}
                    aria-invalid={!!fieldErrors.year}
                    aria-describedby={fieldErrors.year ? "year-erro" : undefined}
                  />
                  {fieldErrors.year && <FieldMsg id="year-erro">{fieldErrors.year}</FieldMsg>}
                </Field>
              </Row>

              <Row>
                <Field>
                  <Label htmlFor="role">Cargo atual</Label>
                  <Input
                    id="role" name="role" type="text"
                    placeholder="Ex: Analista" value={form.role}
                    onChange={handleChange}
                    $invalid={!!fieldErrors.role}
                    aria-invalid={!!fieldErrors.role}
                    aria-describedby={fieldErrors.role ? "role-erro" : undefined}
                  />
                  {fieldErrors.role && <FieldMsg id="role-erro">{fieldErrors.role}</FieldMsg>}
                </Field>
                <Field>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company" name="company" type="text"
                    placeholder="Onde você está hoje" value={form.company}
                    onChange={handleChange}
                    $invalid={!!fieldErrors.company}
                    aria-invalid={!!fieldErrors.company}
                    aria-describedby={fieldErrors.company ? "company-erro" : undefined}
                  />
                  {fieldErrors.company && <FieldMsg id="company-erro">{fieldErrors.company}</FieldMsg>}
                </Field>
              </Row>

              <Field>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin" name="linkedin" type="text"
                  placeholder="linkedin.com/in/seuperfil" value={form.linkedin}
                  onChange={handleChange} autoComplete="url"
                  $invalid={!!fieldErrors.linkedin}
                  aria-invalid={!!fieldErrors.linkedin}
                  aria-describedby={fieldErrors.linkedin ? "linkedin-erro" : undefined}
                />
                {fieldErrors.linkedin && <FieldMsg id="linkedin-erro">{fieldErrors.linkedin}</FieldMsg>}
              </Field>

              <Row>
                <Field>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email" name="email" type="email"
                    placeholder="seu@email.com" value={form.email}
                    onChange={handleChange} autoComplete="email"
                    $invalid={!!fieldErrors.email}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-erro" : undefined}
                  />
                  {fieldErrors.email && <FieldMsg id="email-erro">{fieldErrors.email}</FieldMsg>}
                </Field>
                <Field>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp" name="whatsapp" type="tel"
                    placeholder="(11) 99999-9999" value={form.whatsapp}
                    onChange={handleChange} autoComplete="tel"
                    $invalid={!!fieldErrors.whatsapp}
                    aria-invalid={!!fieldErrors.whatsapp}
                    aria-describedby={fieldErrors.whatsapp ? "whatsapp-erro" : undefined}
                  />
                  {fieldErrors.whatsapp && <FieldMsg id="whatsapp-erro">{fieldErrors.whatsapp}</FieldMsg>}
                </Field>
              </Row>

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

/* $invalid e prop transiente ($) de proposito: sem o prefixo o styled-components
   repassa o atributo ao DOM e o React reclama de prop desconhecida no console. */
const Input = styled.input<{ $invalid?: boolean }>`
  font-family: ${FONT_BODY};
  font-size: ${TYPE.bodySmall.size};
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ $invalid }) => ($invalid ? RED : "rgba(255, 255, 255, 0.1)")};
  border-radius: 4px;
  padding: 11px 16px;
  outline: none;
  transition: border-color 0.2s ${SPRING};

  &::placeholder { color: rgba(255, 255, 255, 0.2); }
  &:focus { border-color: ${RED}; }

  @media (max-width: 640px) { font-size: 16px; padding: 13px 14px; }
`;

const FieldMsg = styled.span`
  font-family: ${FONT_BODY};
  font-size: 12px;
  line-height: 1.4;
  color: ${RED};
`;

/* Isca anti-spam. Nao usa display:none nem visibility:hidden de proposito --
   sao os primeiros sinais que bots checam para pular o campo. Fica fora da
   tela, sem foco por teclado e escondido de leitores de tela. */
const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
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