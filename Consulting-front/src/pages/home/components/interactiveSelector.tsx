import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";

interface Selections { industry: string; capability: string; }

const BG   = "#FAF2EA";
const RED  = "#691212";
const FONT = `'Inter', Helvetica, sans-serif`;
const EASE = "0.7s cubic-bezier(0.4, 0, 0.2, 1)";

const CONTENT: Record<string, string> = {
  "Finanças":                 "Apoiamos instituições financeiras a navegar regulações complexas e acelerar a transformação digital com segurança.",
  "Saúde":                    "Conectamos tecnologia e cuidado para melhorar processos clínicos, reduzir custos e ampliar o acesso à saúde.",
  "Varejo":                   "Ajudamos varejistas a criar experiências omnichannel que fidelizam clientes e aumentam a eficiência operacional.",
  "Energia":                  "Aceleramos a transição energética com soluções que unem inovação, sustentabilidade e viabilidade econômica.",
  "Manufatura":               "Modernizamos operações industriais com automação inteligente e análise de dados em tempo real.",
  "Estratégia e Consultoria": "Traduzimos ambições de negócio em planos concretos, com foco em resultados mensuráveis e vantagem competitiva.",
  "Tecnologia":               "Desenvolvemos soluções robustas e escaláveis que resolvem problemas reais e evoluem com o seu negócio.",
  "Design":                   "Criamos experiências centradas no usuário que combinam estética e funcionalidade para gerar impacto real.",
  "Data & AI":                "Transformamos dados em decisões com modelos de IA aplicados, governança sólida e foco em valor de negócio.",
};

const CAPABILITIES    = ["Estratégia e Consultoria", "Tecnologia", "Design", "Data & AI"];
const INDUSTRIES      = ["Finanças", "Saúde", "Varejo", "Energia", "Manufatura"];
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80";

const Wrapper        = styled.div`position: relative; width: 100%;`;
const ParticleCanvas = styled.canvas`position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;`;
const ContentBlock   = styled.div`display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center; width: 100%;`;
const SelectRow      = styled.div`display: flex; gap: 16px; align-items: center;`;
const DropdownWrapper = styled.div`position: relative; min-width: 200px;`;
const DropdownMenu   = styled.div`position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: #fff; border: 1.5px solid #1a1a18; border-radius: 16px; overflow: hidden; z-index: 100; box-shadow: 0 8px 24px rgba(0,0,0,0.08);`;
const ImageBox       = styled.div`border-radius: 6px; overflow: hidden; position: relative; box-shadow: 0 0 0 1px rgba(176,48,48,0.1), 0 12px 40px rgba(0,0,0,0.08);`;

const Section = styled.div`
  width: 100%; background: ${BG}; padding: 120px 0 40px;
  box-sizing: border-box; margin-top: -1px; min-height: 55vh;
  display: flex; align-items: center;
`;
const Inner = styled.div<{ $active: boolean }>`
  max-width: 900px; margin: 0 auto; padding: 0 48px;
  display: grid;
  grid-template-columns: ${({ $active }) => ($active ? "1fr 1fr" : "1fr 0fr")};
  gap: ${({ $active }) => ($active ? "64px" : "0px")};
  align-items: center;
  transition: grid-template-columns ${EASE}, gap ${EASE};
  position: relative; z-index: 1;
`;
const Title = styled.h2`
  font-family: ${FONT}; font-size: 32px; font-weight: 700;
  color: #1a1a18; letter-spacing: -0.02em; line-height: 1.2; margin: 0;
`;
const Description = styled.p`
  font-family: ${FONT}; font-size: 16px; font-weight: 400;
  color: #6b6760; line-height: 1.5; margin: 0; max-width: 400px;
`;
const RightPanel = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "100%" : "0%")};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  display: flex; flex-direction: column; gap: 16px;
  transition: width ${EASE}, opacity ${EASE};
`;
const DropdownScroll = styled.div`
  max-height: 240px; overflow-y: auto; padding: 8px 0;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #d0c8c0; border-radius: 4px; }
`;
const DropdownTrigger = styled.button<{ $open: boolean; $selected: boolean }>`
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-radius: 50px;
  border: 1px solid ${({ $open, $selected }) => ($open || $selected ? RED : "#d4c9c0")};
  background: ${({ $selected }) => ($selected ? RED : "transparent")};
  color: ${({ $selected }) => ($selected ? "#F5E6DC" : "#6b6760")};
  font-family: ${FONT}; font-size: 16px; font-weight: 700;
  cursor: pointer; transition: all 0.2s ease;
  &:focus { outline: none; }
  &:hover { border-color: ${RED}; color: ${({ $selected }) => ($selected ? "#F5E6DC" : RED)}; }
`;
const DropdownItem = styled.div<{ $active: boolean }>`
  padding: 12px 20px; font-family: ${FONT}; font-size: 16px; font-weight: 400;
  color: ${({ $active }) => ($active ? RED : "#1a1a18")};
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  cursor: pointer; transition: background 0.15s ease;
  background: ${({ $active }) => ($active ? BG : "transparent")};
  &:hover { background: ${BG}; color: ${RED}; }
`;
const InfoText = styled.p`font-family: ${FONT}; font-size: 16px; font-weight: 400; color: #6b6760; line-height: 1.5; margin: 0;`;
const InfoLink = styled.a`
  font-family: ${FONT}; font-size: 16px; font-weight: 700;
  color: ${RED}; text-decoration: none; transition: opacity 0.2s ease;
  &:hover { opacity: 0.7; }
  &::after { content: " →"; }
`;

interface DropdownProps { placeholder: string; options: string[]; value: string; onChange: (val: string) => void; }

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <DropdownWrapper ref={ref}>
      <DropdownTrigger $open={open} $selected={value !== ""} onClick={() => setOpen(o => !o)}>
        <span>{value || placeholder}</span>
        <span style={{ display: "inline-block", transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", fontSize: 10, color: "#6b6760" }}>▼</span>
      </DropdownTrigger>
      {open && (
        <DropdownMenu>
          <DropdownScroll>
            {options.map(opt => (
              <DropdownItem key={opt} $active={value === opt} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</DropdownItem>
            ))}
          </DropdownScroll>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};

const InteractiveSelector: React.FC = () => {
  const [selections, setSelections] = useState<Selections>({ industry: "", capability: "" });
  const activeKey = selections.capability || selections.industry;
  const isActive  = activeKey !== "";
  const handle = useCallback(
    (field: keyof Selections) => (val: string) => setSelections({ capability: "", industry: "", [field]: val }), []
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  return (
    <Wrapper ref={wrapperRef}>
      <ParticleCanvas ref={canvasRef} />
      <Section>
        <Inner $active={isActive}>
          <ContentBlock>
            <Title>Como podemos te ajudar?</Title>
            <Description>Diga-nos o que você precisa e nós o conectaremos com a expertise certa — adaptada ao seu setor e objetivos.</Description>
            <SelectRow>
              <Dropdown placeholder="Indústrias"  options={INDUSTRIES}   value={selections.industry}   onChange={handle("industry")} />
              <Dropdown placeholder="Capacidades" options={CAPABILITIES} value={selections.capability} onChange={handle("capability")} />
            </SelectRow>
          </ContentBlock>
          <RightPanel $active={isActive}>
            <ImageBox>
              <img src={PLACEHOLDER_IMG} alt="Visual context" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(176,48,48,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />
            </ImageBox>
            {activeKey && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <InfoText>{CONTENT[activeKey]}</InfoText>
                <InfoLink href="/">Saiba mais</InfoLink>
              </div>
            )}
          </RightPanel>
        </Inner>
      </Section>
      <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, background: BG }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,90 L1000,90 C1100,90 1150,40 1250,40 L1440,40 L1440,90 Z" fill="#ffffff" />
        </svg>
      </div>
    </Wrapper>
  );
};

export default InteractiveSelector;
