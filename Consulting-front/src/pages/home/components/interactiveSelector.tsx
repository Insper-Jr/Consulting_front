import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";

const RED = "#691212", BG = "#FAF2EA", FONT = `'Inter',Helvetica,sans-serif`;
const SPRING = "0.72s cubic-bezier(0.34,1.08,0.64,1)";
const SMOOTH = "0.55s cubic-bezier(0.4,0,0.2,1)";

const CONTENT: Record<string, { description: string; image: string }> = {
  "Finanças":                { description: "Apoiamos instituições financeiras a navegar regulações complexas e acelerar a transformação digital com segurança.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85" },
  "Saúde":                   { description: "Conectamos tecnologia e cuidado para melhorar processos clínicos, reduzir custos e ampliar o acesso à saúde.", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=900&q=85" },
  "Varejo":                  { description: "Ajudamos varejistas a criar experiências omnichannel que fidelizam clientes e aumentam a eficiência operacional.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=85" },
  "Energia":                 { description: "Aceleramos a transição energética com soluções que unem inovação, sustentabilidade e viabilidade econômica.", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85" },
  "Manufatura":              { description: "Modernizamos operações industriais com automação inteligente e análise de dados em tempo real.", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=85" },
  "Estratégia e Consultoria":{ description: "Traduzimos ambições de negócio em planos concretos, com foco em resultados mensuráveis e vantagem competitiva.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85" },
  "Tecnologia":              { description: "Desenvolvemos soluções robustas e escaláveis que resolvem problemas reais e evoluem com o seu negócio.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=85" },
  "Design":                  { description: "Criamos experiências centradas no usuário que combinam estética e funcionalidade para gerar impacto real.", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=85" },
  "Data & AI":               { description: "Transformamos dados em decisões com modelos de IA aplicados, governança sólida e foco em valor de negócio.", image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&q=85" },
};

const INDUSTRIES   = ["Finanças","Saúde","Varejo","Energia","Manufatura"];
const CAPABILITIES = ["Estratégia e Consultoria","Tecnologia","Design","Data & AI"];

// ─── Keyframes ─────────────────────────────────────────────────────────────────
const imgEnter  = keyframes`from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)}`;
const imgExit   = keyframes`from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(-30px)}`;
const slideUp   = keyframes`from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)}`;
const menuOpen  = keyframes`from{clip-path:inset(0 0 100% 0 round 16px);opacity:0} to{clip-path:inset(0 0 0% 0 round 16px);opacity:1}`;
const itemSlide = keyframes`from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)}`;

// ─── Styled Components ─────────────────────────────────────────────────────────
const Wrapper    = styled.div`position:relative;width:100%;overflow:hidden;background:${BG};transform:translateZ(0);margin-bottom:-2px;`;

const Section    = styled.section<{$active:boolean}>`
  width:100%;background:transparent;box-sizing:border-box;
  min-height:55vh;
  position:relative;
  display:flex;align-items:center;
  padding:100px 0 80px;
`;

const Left       = styled.div<{$active:boolean}>`
  display:flex;flex-direction:column;
  align-items:${p=>p.$active?"flex-start":"center"};
  text-align:${p=>p.$active?"left":"center"};
  width:50%;
  margin-left:${p=>p.$active?"0":"25%"};
  padding:0 48px;
  justify-content:center;
  position:relative;z-index:2;
  transition:margin-left ${SPRING};
`;

const Title      = styled.h2`font-family:${FONT};font-size:34px;font-weight:700;color:#1a1a18;letter-spacing:-0.025em;line-height:1.2;margin:0 0 14px;`;
const Subtitle   = styled.p<{$active:boolean}>`font-family:${FONT};font-size:15px;color:#7a746e;line-height:1.6;margin:0 0 36px;max-width:${p=>p.$active?340:420}px;transition:max-width ${SMOOTH};`;
const Controls   = styled.div`display:flex;gap:12px;align-items:center;flex-wrap:wrap;`;

const ImagePanel = styled.div<{$active:boolean}>`
  position:absolute;
  top:0;right:0;bottom:0;
  width:50%;
  overflow:hidden;
  opacity:${p=>p.$active?1:0};
  transform:${p=>p.$active?"translateX(0)":"translateX(100%)"};
  pointer-events:${p=>p.$active?"auto":"none"};
  transition:transform ${SPRING}, opacity 0.25s ease;
  z-index:1;
`;

const ImgWrap = styled.div`position:relative;width:100%;height:100%;overflow:hidden;`;
const Img     = styled.img<{$enter?:boolean;$exit?:boolean}>`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:2;${p=>p.$enter&&css`animation:${imgEnter} .55s cubic-bezier(.4,0,.2,1) both;`}${p=>p.$exit&&css`animation:${imgExit} .55s cubic-bezier(.4,0,.2,1) both;z-index:1;`}`;
const Overlay = styled.div`position:absolute;inset:0;background:linear-gradient(to top,rgba(22,5,5,.9) 0%,rgba(22,5,5,.22) 48%,transparent 68%);z-index:3;pointer-events:none;`;
const Caption = styled.div`position:absolute;bottom:0;left:0;right:0;padding:28px 26px 26px;z-index:4;display:flex;flex-direction:column;gap:10px;`;
const CapTag  = styled.span`font-family:${FONT};font-size:11px;font-weight:700;color:rgba(255,255,255,.48);text-transform:uppercase;letter-spacing:0.09em;animation:${slideUp} .42s .18s ease both;`;
const CapText = styled.p`font-family:${FONT};font-size:14px;color:rgba(255,255,255,.88);line-height:1.6;margin:0;animation:${slideUp} .42s .26s ease both;`;
const CapLink = styled.a`font-family:${FONT};font-size:13px;font-weight:700;color:#fff;text-decoration:none;align-self:flex-start;opacity:.88;animation:${slideUp} .42s .34s ease both;`;

// Dropdown
const DropWrap  = styled.div`position:relative;min-width:190px;`;
const DropBtn   = styled.button<{$open:boolean;$sel:boolean}>`width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 20px;border-radius:50px;font-family:${FONT};font-size:15px;font-weight:600;cursor:pointer;border:1.5px solid ${p=>p.$open||p.$sel?RED:"#d4c9c0"};background:${p=>p.$sel?RED:"transparent"};color:${p=>p.$sel?"#fff":"#6b6760"};`;
const BtnRight  = styled.span`display:flex;align-items:center;gap:6px;`;
const ClearBtn  = styled.span`font-size:16px;line-height:1;opacity:.7;padding:0 2px;&:hover{opacity:1;}`;
const Arrow     = styled.span<{$open:boolean}>`font-size:9px;opacity:.55;display:inline-block;transition:transform .25s;transform:${p=>p.$open?"rotate(180deg)":"rotate(0)"};`;
const Menu      = styled.div`position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border:1.5px solid #1a1a18;border-radius:16px;overflow:hidden;z-index:200;box-shadow:0 8px 32px rgba(0,0,0,.10);animation:${menuOpen} .28s cubic-bezier(.34,1.1,.64,1) both;`;
const MenuScroll= styled.div`max-height:220px;overflow-y:auto;padding:6px 0;`;
const MenuItem  = styled.div<{$sel:boolean;$idx:number}>`padding:11px 20px;font-family:${FONT};font-size:15px;cursor:pointer;font-weight:${p=>p.$sel?700:400};color:${p=>p.$sel?RED:"#1a1a18"};background:${p=>p.$sel?BG:"transparent"};animation:${itemSlide} .2s ${p=>p.$idx*.04}s ease both;`;
const WaveSvg   = styled.div`width:100%;overflow:hidden;line-height:0;background:${BG};`;

// ─── ImageCrossfade ────────────────────────────────────────────────────────────
function ImageCrossfade({ activeKey }: { activeKey: string }) {
  const [imgs, setImgs] = useState({ current: CONTENT[activeKey].image, prev: null as string | null });
  const prevKey = useRef(activeKey);
  useEffect(() => {
    if (activeKey === prevKey.current) return;
    setImgs(s => ({ current: CONTENT[activeKey].image, prev: s.current }));
    prevKey.current = activeKey;
    const t = setTimeout(() => setImgs(s => ({ ...s, prev: null })), 600);
    return () => clearTimeout(t);
  }, [activeKey]);
  return (
    <ImgWrap>
      {imgs.prev && <Img key={`x-${imgs.prev}`} src={imgs.prev} alt="" $exit />}
      <Img key={`e-${imgs.current}`} src={imgs.current} alt={activeKey} $enter />
      <Overlay />
      <Caption key={activeKey}>
        <CapTag>{activeKey}</CapTag>
        <CapText>{CONTENT[activeKey].description}</CapText>
        <CapLink href="/">Saiba mais →</CapLink>
      </Caption>
    </ImgWrap>
  );
}

// ─── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ placeholder, options, value, onChange }: { placeholder:string; options:string[]; value:string; onChange:(v:string)=>void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <DropWrap ref={ref}>
      <DropBtn onClick={() => setOpen(o => !o)} $open={open} $sel={value !== ""}>
        <span>{value || placeholder}</span>
        <BtnRight>
          {value && (
            <ClearBtn onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}>×</ClearBtn>
          )}
          <Arrow $open={open}>▼</Arrow>
        </BtnRight>
      </DropBtn>
      {open && (
        <Menu>
          <MenuScroll>
            {options.map((opt, idx) => (
              <MenuItem
                key={opt}
                $sel={value===opt}
                $idx={idx}
                onClick={() => { onChange(value === opt ? "" : opt); setOpen(false); }}
              >
                {opt}
              </MenuItem>
            ))}
          </MenuScroll>
        </Menu>
      )}
    </DropWrap>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function InteractiveSelector() {
  const [sel, setSel] = useState({ industry: "", capability: "" });
  const activeKey = sel.capability || sel.industry;
  const isActive  = activeKey !== "";
  const handle    = useCallback((f: "industry"|"capability") => (v: string) => setSel({ capability:"", industry:"", [f]: v }), []);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);
  return (
    <Wrapper ref={wrapperRef}>
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />
      <Section $active={isActive}>
        <Left $active={isActive}>
          <Title>Como podemos<br />te ajudar?</Title>
          <Subtitle $active={isActive}>Diga-nos o que você precisa e nós o conectaremos com a expertise certa — adaptada ao seu setor e objetivos.</Subtitle>
          <Controls>
            <Dropdown placeholder="Indústrias"  options={INDUSTRIES}   value={sel.industry}   onChange={handle("industry")} />
            <Dropdown placeholder="Capacidades" options={CAPABILITIES} value={sel.capability} onChange={handle("capability")} />
          </Controls>
        </Left>
      </Section>
      <ImagePanel $active={isActive}>
        {isActive && <ImageCrossfade activeKey={activeKey} />}
        {/* wave cut: mirrors the WaveSvg shape for the right-half panel */}
        <svg
          style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"calc(100vw / 16)", display:"block", pointerEvents:"none", zIndex:10 }}
          viewBox="0 0 720 90"
          preserveAspectRatio="none"
        >
          <path d="M0,90 L280,90 C380,90 430,40 530,40 L720,40 L720,90 Z" fill="#ffffff" />
        </svg>
      </ImagePanel>
      <WaveSvg>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display:"block",width:"100%" }}>
          <path d="M0,90 L1000,90 C1100,90 1150,40 1250,40 L1440,40 L1440,90 Z" fill="#ffffff" />
        </svg>
      </WaveSvg>
    </Wrapper>
  );
}
