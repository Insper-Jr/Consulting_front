import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useParticles } from "../../../hooks/useParticleBackground";

const RED = "#691212", BG = "#FAF2EA", FONT = `'Inter',Helvetica,sans-serif`;
const SPRING = "0.72s cubic-bezier(0.34,1.08,0.64,1)";
const SMOOTH = "0.55s cubic-bezier(0.4,0,0.2,1)";

const IMAGES: Record<string, string> = {
  // Frentes
  business:       "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85",
  tech:           "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=85",
  direito:        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85",
  processos:      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=85",
  // Escopos — Business
  market:         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85",
  marketing:      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85",
  financial:      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85",
  operational:    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=900&q=85",
  // Escopos — Tech
  web:            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85",
  data:           "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",
  ai:             "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=900&q=85",
  // Escopos — Direito
  contracts:      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&q=85",
  corporate:      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85",
  ip:             "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=900&q=85",
  tax:            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=85",
  // Escopos — Processos
  mapping:        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=85",
  simulation:     "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&q=85",
  optimization:   "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=900&q=85",
};

const FRENTE_IDS = ["business","tech","direito","processos"] as const;
type FrenteId = typeof FRENTE_IDS[number];

/* Cada frente e os escopos que ela oferece — a mesma lista das páginas
   /business, /tech, /direito e /processos. */
const ESCOPOS_BY_FRENTE: Record<FrenteId, readonly string[]> = {
  business:  ["market","marketing","financial","operational"],
  tech:      ["web","data","ai"],
  direito:   ["contracts","corporate","ip","tax"],
  processos: ["mapping","simulation","optimization"],
};

const FRENTE_PATHS: Record<FrenteId, string> = {
  business:  "/business",
  tech:      "/tech",
  direito:   "/direito",
  processos: "/processos",
};

const ALL_ESCOPO_IDS = FRENTE_IDS.flatMap(f => ESCOPOS_BY_FRENTE[f]);

/* Cada página de frente renderiza seus escopos com id="escopo-01", "escopo-02"…
   na mesma ordem de ESCOPOS_BY_FRENTE, então a âncora sai do índice. Se a ordem
   dos escopos mudar em uma dessas páginas, ajustar a lista acima junto. */
const ESCOPO_ANCHOR: Record<string, string> = Object.fromEntries(
  FRENTE_IDS.flatMap(f =>
    ESCOPOS_BY_FRENTE[f].map((e, i) => [e, `escopo-${String(i + 1).padStart(2, "0")}`] as const)
  )
);

/* Escopo → frente a que pertence, para o link "Saiba mais" e para
   sincronizar os dois dropdowns. */
const ESCOPO_FRENTE: Record<string, FrenteId> = Object.fromEntries(
  FRENTE_IDS.flatMap(f => ESCOPOS_BY_FRENTE[f].map(e => [e, f] as const))
);

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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 0 40px;
    min-height: auto;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    align-items: center;
    text-align: center;
    padding: 0 1.25rem 2rem;
  }
`;

const Title      = styled.h2`font-family:${FONT};font-size:34px;font-weight:700;color:#1a1a18;letter-spacing:-0.025em;line-height:1.2;margin:0 0 14px;
  @media (max-width: 480px) { font-size: 26px; }
`;
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

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: ${p=>p.$active?"240px":"0"};
    transform: none;
    transition: height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
  }
`;

const ImgWrap = styled.div`position:relative;width:100%;height:100%;overflow:hidden;`;
const Img     = styled.img<{$enter?:boolean;$exit?:boolean}>`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:2;${p=>p.$enter&&css`animation:${imgEnter} .55s cubic-bezier(.4,0,.2,1) both;`}${p=>p.$exit&&css`animation:${imgExit} .55s cubic-bezier(.4,0,.2,1) both;z-index:1;`}`;
const Overlay = styled.div`position:absolute;inset:0;background:linear-gradient(to top,rgba(22,5,5,.9) 0%,rgba(22,5,5,.22) 48%,transparent 68%);z-index:3;pointer-events:none;`;
const Caption = styled.div`position:absolute;bottom:0;left:0;right:0;padding:28px 26px 26px;z-index:4;display:flex;flex-direction:column;gap:10px;`;
const CapTag  = styled.span`font-family:${FONT};font-size:11px;font-weight:700;color:rgba(255,255,255,.48);text-transform:uppercase;letter-spacing:0.09em;animation:${slideUp} .42s .18s ease both;`;
const CapText = styled.p`font-family:${FONT};font-size:14px;color:rgba(255,255,255,.88);line-height:1.6;margin:0;animation:${slideUp} .42s .26s ease both;`;
const CapLink = styled(Link)`font-family:${FONT};font-size:13px;font-weight:700;color:#fff;text-decoration:none;align-self:flex-start;opacity:.88;animation:${slideUp} .42s .34s ease both;`;

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
  const { t } = useTranslation();
  const [imgs, setImgs] = useState({ current: IMAGES[activeKey], prev: null as string | null });
  const prevKey = useRef(activeKey);
  useEffect(() => {
    if (activeKey === prevKey.current) return;
    setImgs(s => ({ current: IMAGES[activeKey], prev: s.current }));
    prevKey.current = activeKey;
    const timer = setTimeout(() => setImgs(s => ({ ...s, prev: null })), 600);
    return () => clearTimeout(timer);
  }, [activeKey]);
  const isFrente = (FRENTE_IDS as readonly string[]).includes(activeKey);
  const labelKey = isFrente
    ? `interactiveSelector.frentes.${activeKey}`
    : `interactiveSelector.escopos.${activeKey}`;
  /* Frente e escopo levam para a mesma URL, a da página da frente. No caso do
     escopo, o alvo do scroll viaja no state da rota e o ScrollToTop posiciona a
     página na altura dele, sem sujar a URL com hash. */
  const to = FRENTE_PATHS[isFrente ? (activeKey as FrenteId) : ESCOPO_FRENTE[activeKey]];
  const scrollTo = isFrente ? undefined : ESCOPO_ANCHOR[activeKey];
  return (
    <ImgWrap>
      {imgs.prev && <Img key={`x-${imgs.prev}`} src={imgs.prev} alt="" $exit />}
      <Img key={`e-${imgs.current}`} src={imgs.current} alt={activeKey} $enter />
      <Overlay />
      <Caption key={activeKey}>
        <CapTag>{t(labelKey)}</CapTag>
        <CapText>{t(`interactiveSelector.descriptions.${activeKey}`)}</CapText>
        <CapLink to={to} state={scrollTo ? { scrollTo } : undefined}>{t("interactiveSelector.learnMore")}</CapLink>
      </Caption>
    </ImgWrap>
  );
}

// ─── Dropdown ──────────────────────────────────────────────────────────────────
type DropOption = { id: string; label: string };
function Dropdown({ placeholder, options, value, onChange }: { placeholder:string; options:DropOption[]; value:string; onChange:(v:string)=>void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, maxH: 160 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(o => o.id === value)?.label ?? "";

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
        <span>{selectedLabel || placeholder}</span>
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
                key={opt.id}
                $sel={value === opt.id}
                $idx={idx}
                onClick={() => { onChange(value === opt.id ? "" : opt.id); setOpen(false); }}
              >
                {opt.label}
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
  const { t } = useTranslation();
  const [sel, setSel] = useState({ frente: "", escopo: "" });
  const activeKey = sel.escopo || sel.frente;
  const isActive  = activeKey !== "";

  // Trocar de frente descarta o escopo, a menos que ele pertença à nova frente.
  const handleFrente = useCallback((v: string) => {
    setSel(s => ({
      frente: v,
      escopo: v && ESCOPO_FRENTE[s.escopo] === v ? s.escopo : "",
    }));
  }, []);

  // Escolher um escopo já posiciona a frente correspondente; limpá-lo mantém a frente.
  const handleEscopo = useCallback((v: string) => {
    setSel(s => (v ? { frente: ESCOPO_FRENTE[v], escopo: v } : { ...s, escopo: "" }));
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  useParticles(wrapperRef, canvasRef);

  const frentesList = FRENTE_IDS.map(id => ({ id, label: t(`interactiveSelector.frentes.${id}`) }));
  // Sem frente escolhida, o dropdown lista todos os escopos das quatro frentes.
  const escoposList = (sel.frente ? ESCOPOS_BY_FRENTE[sel.frente as FrenteId] : ALL_ESCOPO_IDS)
    .map(id => ({ id, label: t(`interactiveSelector.escopos.${id}`) }));

  return (
    <Wrapper ref={wrapperRef}>
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />
      <Section $active={isActive}>
        <Left $active={isActive}>
          <Title>{t("interactiveSelector.titleLine1")}<br />{t("interactiveSelector.titleLine2")}</Title>
          <Subtitle $active={isActive}>{t("interactiveSelector.subtitle")}</Subtitle>
          <Controls>
            <Dropdown placeholder={t("interactiveSelector.frentesLabel")} options={frentesList} value={sel.frente} onChange={handleFrente} />
            <Dropdown placeholder={t("interactiveSelector.escoposLabel")} options={escoposList} value={sel.escopo} onChange={handleEscopo} />
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
