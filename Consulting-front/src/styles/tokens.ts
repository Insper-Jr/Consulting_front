/* ─────────────────────────────────────────────────────────────────────────
   IJR · Design Tokens centrais — fonte única de tipografia e cores do site.
   Qualquer componente novo deve importar daqui em vez de redeclarar valores.
   Ver relatório de auditoria (Etapa 1) e decisões da Etapa 2 para contexto.
   ─────────────────────────────────────────────────────────────────────── */

/* Cores institucionais */
export const RED        = "#C02121"; // CTAs, botões, links, destaques de marca
export const RED_TITLE  = "#A10F23"; // títulos de seção (tom intencionalmente distinto do CTA)
export const RED_DARK   = "#691212"; // hover / dim dos elementos acima
export const RED_DEEP   = "#7d1414"; // vermelho profundo (badges/hover específicos — distinto de RED_DARK)
export const RED_DIM    = "rgba(105,18,18,0.45)";
export const RED_LIGHT  = "rgba(192,33,33,0.08)";

export const DARK       = "#1a1a18";
export const MUTED      = "#7a746e";
export const BG_DARK    = "#0e0404";
export const BG_CREAM   = "#FAF2EA";
export const CREAM      = "#FAF2EA";

/* Bordas e overlays */
export const BORDER_LIGHT = "rgba(26,26,24,0.12)";
export const BORDER_SOFT  = "rgba(26,26,24,0.08)";
export const BORDER_DARK  = "rgba(250,242,234,0.08)";

/* Tipografia */
export const FONT_TITLE = `'Montserrat', Helvetica, sans-serif`;
export const FONT_BODY  = `'Inter', Helvetica, sans-serif`;

/* Easing */
export const SPRING = "cubic-bezier(0.16,1,0.3,1)";

/* Escala tipográfica única do site (Etapa 2) */
export const TYPE = {
  /* Hero — título de topo de página */
  hero:        { size: "48px", weight: 700, lh: 1.1,  ls: "-0.03em" },
  /* Título de seção */
  sectionH2:   { size: "32px", weight: 700, lh: 1.1,  ls: "-0.02em" },
  /* Título de bloco de fechamento (CTA final de página, ex.: AboutCTA / InscricaoCTA) */
  closingTitle:{ size: "38px", weight: 700, lh: 1.1,  ls: "-0.03em" },
  /* Subtítulo (dentro de blocos, cards expandidos, painéis) */
  subTitle:    { size: "20px", weight: 400, lh: 1.3,  ls: "-0.01em" },
  /* Eyebrow — sempre Montserrat 700, 11px, tracking 0.18em */
  eyebrow:     { size: "11px", weight: 700, ls: "0.18em" },
  /* Corpo de texto */
  body:        { size: "16px", weight: 400, lh: 1.5 },
  /* Corpo pequeno em cards */
  bodySmall:   { size: "14px", weight: 400, lh: 1.65 },
  /* CTA — botões e links importantes */
  cta:         { size: "16px", weight: 700, lh: 1.2 },
  /* Métrica grande */
  bigStat:     { size: "28px", weight: 700, ls: "-0.02em" },
};

/* Espaçamentos padronizados */
export const SPACING = {
  /* Section vertical padding */
  sectionY:        "72px",
  sectionYLarge:   "100px",
  /* Inner container */
  innerMaxWidth:   "1200px",
  innerPaddingX:   "48px",
  /* Header gap (eyebrow → title → divider → body) */
  headerGap:       "28px",
  /* Divider acentuado abaixo de títulos */
  dividerWidth:    "48px",
  dividerHeight:   "3px",
};
