import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes, css } from "styled-components";
import { useParticles } from "../../../hooks/useParticleBackground";

const RED = "#691212", BG = "#FAF2EA", FONT = `'Inter',Helvetica,sans-serif`;
const SPRING = "0.72s cubic-bezier(0.34,1.08,0.64,1)";
const SMOOTH = "0.55s cubic-bezier(0.4,0,0.2,1)";

const CONTENT: Record<string, { description: string; image: string }> = {
  "Finanças":                    { description: "Apoiamos instituições financeiras a navegar regulações complexas e acelerar a transformação digital com segurança.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85" },
  "Saúde":                       { description: "Conectamos tecnologia e cuidado para melhorar processos clínicos, reduzir custos e ampliar o acesso à saúde.", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=900&q=85" },
  "Varejo":                      { description: "Ajudamos varejistas a criar experiências omnichannel que fidelizam clientes e aumentam a eficiência operacional.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=85" },
  "Energia":                     { description: "Aceleramos a transição energética com soluções que unem inovação, sustentabilidade e viabilidade econômica.", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85" },
  "Manufatura":                  { description: "Modernizamos operações industriais com automação inteligente e análise de dados em tempo real.", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=85" },
  "Plano Estratégico de Marketing": { description: "Estruturamos planos de marketing com base em dados, posicionamento claro e metas que conectam marca e resultado.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85" },
  "Análise Mercadológica":       { description: "Mapeamos mercados, concorrentes e oportunidades para embasar decisões estratégicas com precisão.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85" },
  "Plano Operacional":           { description: "Transformamos estratégia em execução com processos claros, indicadores e responsabilidades bem definidas.", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=900&q=85" },
  "Viabilidade Financeira":      { description: "Avaliamos a rentabilidade e os riscos do seu projeto antes de qualquer compromisso de capital.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85" },
  "Análise de Dados":            { description: "Extraímos padrões e insights de grandes volumes de dados para orientar decisões mais inteligentes.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85" },
  "Desenvolvimento de Produtos": { description: "Do conceito ao lançamento: estruturamos o ciclo de vida do produto com foco em valor e escalabilidade.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=85" },
  "Desenvolvimento Web":         { description: "Construímos interfaces e sistemas web robustos, performáticos e pensados para converter.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85" },
  "Criação e Estruturação":      { description: "Ajudamos a materializar ideias em estruturas sólidas — societárias, operacionais e de marca.", image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=900&q=85" },
  "Planejamento Societário":     { description: "Estruturamos a governança e a participação societária para garantir alinhamento e longevidade.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85" },
  "Emissão de CNPJ":             { description: "Simplificamos a abertura da sua empresa com agilidade, segurança e zero burocracia desnecessária.", image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=900&q=85" },
  "Documentos Constitutivos":    { description: "Elaboramos contratos sociais, estatutos e atas com precisão jurídica e linguagem clara.", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&q=85" },
  "Operação e Estratégia":       { description: "Integramos visão estratégica e eficiência operacional para gerar resultados sustentáveis.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=85" },
  "Contratos":                   { description: "Redigimos e revisamos contratos que protegem seus interesses e antecipam riscos.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85" },
  "Planejamento Tributário":     { description: "Reduzimos a carga fiscal do seu negócio de forma legal, estruturada e alinhada ao crescimento.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=85" },
  "Proteção e Regularização":    { description: "Regularizamos ativos e garantimos conformidade para que seu negócio opere com segurança jurídica.", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&q=85" },
  "Propriedade Intelectual":     { description: "Protegemos marcas, patentes e criações para preservar o que torna o seu negócio único.", image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=900&q=85" },
  "LGPD":                        { description: "Implementamos adequação à Lei Geral de Proteção de Dados com governança, processos e treinamento.", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=900&q=85" },
};

const INDUSTRIES   = ["Finanças","Saúde","Varejo","Energia","Manufatura"];
const CAPABILITIES = [
  "Plano Estratégico de Marketing","Análise Mercadológica","Plano Operacional",
  "Viabilidade Financeira","Análise de Dados",
  "Desenvolvimento de Produtos","Desenvolvimento Web","Criação e Estruturação",
  "Planejamento Societário","Emissão de CNPJ","Documentos Constitutivos","Operação e Estratégia",
  "Contratos","Planejamento Tributário","Proteção e Regularização",
  "Propriedade Intelectual","LGPD",
];

// ─── Keyframes ─────────────────────────────────────────────────────────────────
const imgEnter  = keyframes`from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)}`;
const imgExit   = keyframes`from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(-30px)}`;
const slideUp   = keyframes`from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)}`;
const menuOpen  = keyframes`from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)}`;
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
const Menu      = styled.div<{$top:number;$left:number;$width:number}>`position:fixed;top:${p=>p.$top}px;left:${p=>p.$left}px;width:${p=>p.$width}px;background:#fff;border:1.5px solid #1a1a18;border-radius:16px;overflow:hidden;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.12);animation:${menuOpen} .22s ease both;`;
const MenuScroll= styled.div<{$maxH:number}>`max-height:${p=>p.$maxH}px;overflow-y:auto;padding:3px 0;`;
const MenuItem  = styled.div<{$sel:boolean;$idx:number}>`padding:7px 16px;font-family:${FONT};font-size:13px;cursor:pointer;font-weight:${p=>p.$sel?700:400};color:${p=>p.$sel?RED:"#1a1a18"};background:${p=>p.$sel?BG:"transparent"};animation:${itemSlide} .2s ${p=>p.$idx*.03}s ease both;&:hover{background:${p=>p.$sel?"#f0ddd0":"#F5EBE2"};}`;
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
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, maxH: 160 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const available = window.innerHeight - r.bottom - 24;
      setPos({ top: r.bottom + 8, left: r.left, width: r.width, maxH: Math.min(160, available) });
    }
    setOpen(o => !o);
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const inWrap = wrapRef.current?.contains(e.target as Node);
      const inMenu = menuRef.current?.contains(e.target as Node);
      if (!inWrap && !inMenu) setOpen(false);
    };
    const onScroll = (e: Event) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  return (
    <DropWrap ref={wrapRef}>
      <DropBtn ref={btnRef} onClick={openMenu} $open={open} $sel={value !== ""}>
        <span>{value || placeholder}</span>
        <BtnRight>
          {value && (
            <ClearBtn onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}>×</ClearBtn>
          )}
          <Arrow $open={open}>▼</Arrow>
        </BtnRight>
      </DropBtn>
      {open && createPortal(
        <Menu ref={menuRef} $top={pos.top} $left={pos.left} $width={pos.width}>
          <MenuScroll $maxH={pos.maxH}>
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
        </Menu>,
        document.body
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
