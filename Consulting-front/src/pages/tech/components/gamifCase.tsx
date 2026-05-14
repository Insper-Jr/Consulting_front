import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import slideProblema   from "../../../assets/gamificacao/slides/01-problema.png";
import slideSolucao    from "../../../assets/gamificacao/slides/02-solucao.png";
import slidePlataforma from "../../../assets/gamificacao/slides/03-plataforma.png";

import painel01Visao        from "../../../assets/gamificacao/slides/painel/01-visao.png";
import painel02Acomp        from "../../../assets/gamificacao/slides/painel/02-acomp.png";
import painel03Gestao       from "../../../assets/gamificacao/slides/painel/03-gestao.png";
import painel04Equipes      from "../../../assets/gamificacao/slides/painel/04-equipes.png";
import painel05Funcionarios from "../../../assets/gamificacao/slides/painel/05-funcionarios.png";
import painel06Validacoes   from "../../../assets/gamificacao/slides/painel/06-validacoes.png";
import painel07Cargos       from "../../../assets/gamificacao/slides/painel/07-cargos.png";
import painel08Dashboard    from "../../../assets/gamificacao/slides/painel/08-dashboard.png";
import painel09Dashboard2   from "../../../assets/gamificacao/slides/painel/09-dashboard2.png";
import painel10Operario     from "../../../assets/gamificacao/slides/painel/10-operario.png";
import painel11Ranking      from "../../../assets/gamificacao/slides/painel/11-operario-ranking.png";
import painel12Top20        from "../../../assets/gamificacao/slides/painel/12-operario-top20.png";

// ── Tokens (mirrors parent page) ──────────────────────────────────────────
const C = {
  redTitle: "#A10F23",
  redCTA: "#C02121",
  redDark: "#691212",
  ink: "#1a1a1a",
};

const FONT_TITLE = `"Montserrat", Helvetica, sans-serif`;
const FONT_BODY  = `"Inter", Helvetica, sans-serif`;
const FONT_MONO  = `ui-monospace, "SF Mono", Menlo, monospace`;

// ── Slide deck data ─────────────────────────────────────────────────────────
const SLIDES = [
  { id: "problema",   img: slideProblema,   alt: "Baixa Produtividade e Falta de Engajamento em Obras", cap: "01 · Problema" },
  { id: "solucao",    img: slideSolucao,    alt: "Aumento da Produtividade Através de Gamificação",     cap: "02 · Solução" },
  { id: "plataforma", img: slidePlataforma, alt: "Nossa Solução: Plataforma de Gamificação Para Obras", cap: "03 · Plataforma" },
];
const TOTAL_SLIDES = SLIDES.length;

// ── Shots data (painel do gestor — 10 telas) ───────────────────────────────
// Blurs sobre o slide "Gestão de Obras" (4 cards: 3 no topo + 1 abaixo).
// Coordenadas em % do recorte 16:9 (2667x1500).
// Cada card tem: (1) título+código  (2) responsável  (3) data início
// (4) data fim previsto  (5) número de blocos. Width/height opcionais
// sobrescrevem o default 4%x3.5% do BlurMask.
const GESTAO_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Títulos + códigos (existentes — usam default 4%x3.5%)
  { top: "40.2%", left: "25.2%" }, // Vizcaya / VIZ
  { top: "40.2%", left: "46.1%" }, // Villa Lobos / CPF.01.0001
  { top: "40.2%", left: "67.1%" }, // Teste / OBR-001
  { top: "65.4%", left: "25.2%" }, // Bs Gold / BSG
  // Vizcaya — campos sensíveis (offset x=53 para limpar ícones)
  { top: "45.73%", left: "25.98%", width: "5.70%", height: "1.47%" }, // resp
  { top: "49.20%", left: "25.98%", width: "5.14%", height: "1.87%" }, // inicio
  { top: "53.07%", left: "25.98%", width: "5.14%", height: "1.87%" }, // fim
  { top: "55.60%", left: "26.24%", width: "2.74%", height: "1.33%" }, // blocos (shift +7px, narrow)
  // Villa Lobos
  { top: "45.73%", left: "46.83%", width: "5.70%", height: "1.47%" },
  { top: "49.20%", left: "46.83%", width: "5.14%", height: "1.87%" },
  { top: "53.07%", left: "46.83%", width: "5.14%", height: "1.87%" },
  { top: "55.60%", left: "47.09%", width: "2.74%", height: "1.33%" }, // blocos
  // Teste
  { top: "45.73%", left: "67.68%", width: "5.70%", height: "1.47%" },
  { top: "49.20%", left: "67.68%", width: "5.14%", height: "1.87%" },
  { top: "53.07%", left: "67.68%", width: "5.14%", height: "1.87%" },
  { top: "55.60%", left: "67.94%", width: "2.74%", height: "1.33%" }, // blocos
  // Bs Gold (segunda linha, +25% no top)
  { top: "70.73%", left: "25.98%", width: "5.70%", height: "1.47%" },
  { top: "74.20%", left: "25.98%", width: "5.14%", height: "1.87%" },
  { top: "78.07%", left: "25.98%", width: "5.14%", height: "1.87%" },
  { top: "80.60%", left: "26.24%", width: "2.74%", height: "1.33%" }, // blocos
  // Contadores Pacotes/Ativos/Trilhas Ativas — calibrados per-card via pixel-detect
  // Vizcaya (4/0/0)
  { top: "58.27%", left: "25.20%", width: "0.60%", height: "1.20%" }, // pacotes
  { top: "58.27%", left: "28.12%", width: "0.55%", height: "1.20%" }, // ativos
  { top: "58.27%", left: "30.67%", width: "0.55%", height: "1.20%" }, // trilhas
  // Villa Lobos (2/0/0)
  { top: "58.27%", left: "46.12%", width: "0.51%", height: "1.20%" },
  { top: "58.27%", left: "49.01%", width: "0.59%", height: "1.20%" },
  { top: "58.27%", left: "51.59%", width: "0.55%", height: "1.20%" },
  // Teste (3/0/0)
  { top: "58.27%", left: "67.04%", width: "0.51%", height: "1.20%" },
  { top: "58.27%", left: "69.93%", width: "0.55%", height: "1.20%" },
  { top: "58.27%", left: "72.48%", width: "0.59%", height: "1.20%" },
  // Bs Gold (1/0/0)
  { top: "83.40%", left: "25.20%", width: "0.45%", height: "1.20%" },
  { top: "83.40%", left: "28.01%", width: "0.59%", height: "1.20%" },
  { top: "83.40%", left: "30.60%", width: "0.55%", height: "1.20%" },
];

// ── Blurs do slide "Gestão de Equipes" — 16 campos sensíveis ──────────────
// Cabeçalho da obra: Vizcaya / VIZ / 10 pavimentos / 3 datas (Início, Fim
// Previsto, Fim Contrato). Cards A1 e B1: títulos + 4 nomes de funcionários
// cada (2 profissionais + 2 auxiliares). Coordenadas pixel-detect via 8x zoom.
const EQUIPES_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Cabeçalho da obra
  { top: "30.67%", left: "24.18%", width: "4.54%", height: "2.40%" }, // Vizcaya
  { top: "34.20%", left: "24.18%", width: "1.01%", height: "1.20%" }, // VIZ
  { top: "34.20%", left: "25.87%", width: "3.71%", height: "1.20%" }, // 10 pavimentos
  { top: "37.47%", left: "25.83%", width: "2.96%", height: "1.13%" }, // 27/01/2026
  { top: "37.47%", left: "32.88%", width: "2.92%", height: "1.13%" }, // 26/02/2026
  { top: "37.47%", left: "40.12%", width: "2.96%", height: "1.13%" }, // 28/02/2026
  // Card A1
  { top: "51.07%", left: "24.90%", width: "2.00%", height: "2.50%" }, // A1
  { top: "58.80%", left: "25.65%", width: "5.36%", height: "1.07%" }, // Daniel Jorge De Lima
  { top: "62.27%", left: "25.61%", width: "5.36%", height: "1.20%" }, // Jeova Santos Targino
  { top: "68.67%", left: "25.65%", width: "4.54%", height: "1.07%" }, // Lucas Freitas Silva
  { top: "72.13%", left: "25.61%", width: "6.52%", height: "1.20%" }, // Joao Manoel Lima Duarte
  // Card B1
  { top: "51.07%", left: "45.82%", width: "2.00%", height: "2.50%" }, // B1
  { top: "58.80%", left: "46.64%", width: "6.45%", height: "1.07%" }, // Francisco Silveira Queiroz
  { top: "62.27%", left: "46.64%", width: "5.36%", height: "1.20%" }, // Daniel Jorge De Lima (B1)
  { top: "68.67%", left: "46.61%", width: "5.70%", height: "1.07%" }, // Agnaldo Ferreira Vidal
  { top: "72.13%", left: "46.61%", width: "8.92%", height: "1.20%" }, // Claudio Henrique De Paula Moreno
];

// ── Blurs do slide "Gestão de Funcionários" — 12 campos sensíveis ─────────
// Mesma estrutura de cabeçalho do slide equipes (Vizcaya/VIZ/datas) +
// 4 números de stats (Total/Profissionais/Auxiliares/Ativos) + 2 nomes
// de funcionários da lista. Coordenadas pixel-detect.
const FUNC_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Cabeçalho da obra (mesmas posições do slide equipes)
  { top: "30.67%", left: "24.18%", width: "4.54%", height: "2.40%" }, // Vizcaya
  { top: "34.20%", left: "24.18%", width: "1.01%", height: "1.20%" }, // VIZ
  { top: "34.20%", left: "25.87%", width: "3.71%", height: "1.20%" }, // 10 pavimentos
  { top: "37.47%", left: "25.83%", width: "2.96%", height: "1.13%" }, // 27/01/2026
  { top: "37.47%", left: "32.88%", width: "2.92%", height: "1.13%" }, // 26/02/2026
  { top: "37.47%", left: "40.12%", width: "2.96%", height: "1.13%" }, // 28/02/2026
  // 4 stat numbers (47/21/26/47) — apenas o dígito, sem o ícone
  // Dígitos em y=830-847 (~18px). Mask y=825-852 com margem mínima.
  { top: "55.00%", left: "26.30%", width: "1.20%", height: "1.80%" }, // Total 47
  { top: "55.00%", left: "41.92%", width: "0.94%", height: "1.80%" }, // Profissionais 21
  { top: "55.00%", left: "57.52%", width: "1.16%", height: "1.80%" }, // Auxiliares 26
  { top: "55.00%", left: "73.12%", width: "1.16%", height: "1.80%" }, // Ativos 47
  // 2 employee names
  { top: "74.33%", left: "25.80%", width: "5.77%", height: "1.20%" }, // Agnaldo Ferreira Vidal
  { top: "79.73%", left: "25.80%", width: "7.72%", height: "1.13%" }, // Alan Gerfeson Pereira Da Silva
];

// ── Blurs do slide "Gestão de Cargos" — 20 campos sensíveis ───────────────
// 4 stats grandes (16/9/7/205) + 4 subtítulos abaixo + 6 nomes de cargos
// (Bombeiro/Carpinteiro/Eletricista/Ferreiro/Gesseiro/Operador de Betoneira)
// + 6 números de funcionários por cargo (11/5/10/0/1/1).
const CARGOS_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // 4 big stat numbers
  { top: "36.33%", left: "25.20%", width: "1.31%", height: "2.67%" }, // 16
  { top: "36.33%", left: "40.83%", width: "3.52%", height: "2.67%" }, // 9 (icon + digit)
  { top: "36.33%", left: "56.39%", width: "3.56%", height: "2.67%" }, // 7 (icon + digit)
  { top: "36.33%", left: "71.99%", width: "4.20%", height: "2.67%" }, // 205
  // Pequenos números do subtítulo — dígitos em y=586-595, ~10px tall
  { top: "38.87%", left: "25.16%", width: "0.41%", height: "1.07%" }, // 0
  { top: "38.87%", left: "40.91%", width: "0.79%", height: "1.07%" }, // 102
  { top: "38.87%", left: "56.51%", width: "0.79%", height: "1.07%" }, // 103
  // 6 cargo names (left column) + 6 Funcionários counts (middle column)
  { top: "55.00%", left: "25.80%", width: "2.62%", height: "2.00%" }, // Bombeiro
  { top: "55.00%", left: "59.96%", width: "0.67%", height: "2.00%" }, // 11
  { top: "60.27%", left: "25.80%", width: "2.96%", height: "1.87%" }, // Carpinteiro
  { top: "60.27%", left: "60.07%", width: "0.49%", height: "1.87%" }, // 5
  { top: "65.53%", left: "25.80%", width: "2.55%", height: "1.87%" }, // Eletricista
  { top: "65.53%", left: "59.96%", width: "0.75%", height: "1.87%" }, // 10
  { top: "70.80%", left: "25.80%", width: "2.14%", height: "2.13%" }, // Ferreiro
  { top: "70.80%", left: "60.07%", width: "0.49%", height: "2.13%" }, // 0
  { top: "76.13%", left: "25.80%", width: "2.29%", height: "1.87%" }, // Gesseiro
  { top: "76.13%", left: "60.10%", width: "0.37%", height: "1.87%" }, // 1
  { top: "81.33%", left: "25.80%", width: "5.89%", height: "1.93%" }, // Operador de Betoneira
  { top: "81.33%", left: "60.10%", width: "0.37%", height: "1.93%" }, // 1
];

// ── Blurs do slide "Dashboard de Desempenho" — 6 campos sensíveis ─────────
// 4 stats no topo (2/21/A1/Daniel Jorge De Lima) + 2 equipes na tabela (A1/B1).
const DASH2_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  { top: "30.87%", left: "34.23%", width: "0.60%", height: "1.33%" }, // 2 Equipes Listadas
  { top: "30.87%", left: "47.88%", width: "0.82%", height: "1.33%" }, // 21 Funcionários Listados
  { top: "30.87%", left: "61.57%", width: "0.94%", height: "1.33%" }, // A1 Equipe em 1° Lugar
  { top: "30.87%", left: "72.37%", width: "6.94%", height: "1.33%" }, // Daniel Jorge De Lima
  { top: "71.67%", left: "30.30%", width: "0.82%", height: "1.47%" }, // A1 (tabela equipes)
  { top: "75.47%", left: "30.33%", width: "0.75%", height: "1.53%" }, // B1 (tabela equipes)
  // Alertas operacionais
  { top: "69.13%", left: "56.62%", width: "10.87%", height: "1.07%" }, // Prazo da obra vencido
  { top: "73.13%", left: "56.62%", width: "8.70%", height: "1.07%" }, // Nenhum pacote encerrado
];

// ── Blurs do slide "Visão do Operário: Seleção de Obra" — 20 campos ───────
// 4 cards (3 no topo + 1 abaixo). Cada card tem 5 elementos sensíveis.
// IMPORTANTE: Card 1 (Vizcaya) não tem subtítulo "Gestor", mas cards 2/3/4
// têm — por isso os números/datas ficam em Y diferente.
const OPERARIO_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Card 1 — Vizcaya (sem Gestor: digits/date em y=520-534)
  { top: "27.00%", left: "14.92%", width: "2.02%", height: "2.47%" }, // VIZ tag
  { top: "30.13%", left: "14.92%", width: "3.00%", height: "2.67%" }, // Vizcaya
  { top: "34.33%", left: "15.22%", width: "1.05%", height: "1.67%" }, // 2 equipes
  { top: "34.33%", left: "17.17%", width: "1.01%", height: "1.67%" }, // 4 pacotes
  { top: "34.33%", left: "34.12%", width: "3.07%", height: "1.67%" }, // 27/01/2026
  // Card 2 — Villa Lobos (com Gestor: digits/date em y=540-556)
  { top: "27.00%", left: "39.37%", width: "4.80%", height: "2.47%" }, // CPP.01.0001 tag
  { top: "30.13%", left: "39.37%", width: "4.69%", height: "2.67%" }, // Villa Lobos
  { top: "35.73%", left: "39.48%", width: "1.01%", height: "1.73%" }, // 1 equipes
  { top: "35.73%", left: "41.62%", width: "0.97%", height: "1.73%" }, // 2 pacotes
  { top: "35.73%", left: "58.64%", width: "2.92%", height: "1.73%" }, // 31/12/2022
  // Card 3 — Teste (com Gestor: digits/date em y=540-556)
  { top: "27.00%", left: "63.78%", width: "3.37%", height: "2.47%" }, // OBR-001 tag
  { top: "30.13%", left: "63.78%", width: "2.51%", height: "2.67%" }, // Teste
  { top: "35.73%", left: "63.89%", width: "1.16%", height: "1.73%" }, // 3 equipes
  { top: "35.73%", left: "66.10%", width: "0.94%", height: "1.73%" }, // 3 pacotes
  { top: "35.73%", left: "82.79%", width: "3.26%", height: "1.73%" }, // 03/03/2026
  // Card 4 — Bs Gold (com Gestor, linha de baixo: digits/date em y=820-836)
  { top: "45.40%", left: "14.92%", width: "2.02%", height: "2.47%" }, // BSG tag
  { top: "48.53%", left: "14.92%", width: "3.00%", height: "2.67%" }, // Bs Gold
  { top: "54.40%", left: "15.00%", width: "1.05%", height: "1.60%" }, // 1 equipes
  { top: "54.40%", left: "17.40%", width: "0.64%", height: "1.60%" }, // 1 pacotes
  { top: "54.40%", left: "34.12%", width: "3.07%", height: "1.60%" }, // 30/09/2023
];

// ── Blurs do slide "Visão do Operário: Ranking de Equipes" — 2 campos ─────
// A1 (yellow, 1° lugar) e B1 (white, 2° lugar) no pódio 8-bit.
const RANKING_OP_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  { top: "41.07%", left: "54.82%", width: "1.27%", height: "1.67%" }, // A1 (yellow)
  { top: "49.00%", left: "43.91%", width: "1.01%", height: "1.40%" }, // B1 (white)
];

// ── Blurs do slide "Top 20 Funcionários" — todos os nomes ─────────────────
// Pódio (3) + lista left (4) + middle (4) + right (3) = 14 nomes.
const TOP20_BLURS: Array<{ top: string; left: string; width?: string; height?: string }> = [
  // Pódio
  { top: "41.13%", left: "45.49%", width: "9.45%", height: "1.80%" }, // Daniel Jorge De Lima (1°)
  { top: "49.13%", left: "34.87%", width: "7.76%", height: "1.40%" }, // Jeova Santos Targino (2°)
  { top: "52.80%", left: "57.26%", width: "8.40%", height: "1.40%" }, // Alexsandro Verissimo (3°)
  // Lista — coluna esquerda
  { top: "71.27%", left: "17.20%", width: "12.50%", height: "1.67%" }, // 4 — Antonio Benedito De Paula Rocha
  { top: "75.13%", left: "17.20%", width: "8.85%", height: "1.40%" }, // 5 — Antonio Castelo Branco
  { top: "78.87%", left: "17.20%", width: "7.45%", height: "1.53%" }, // 6 — Carlos Alberto Silva
  { top: "82.60%", left: "17.20%", width: "10.25%", height: "1.40%" }, // 7 — Edneudo Dos Santos Matos
  // Lista — coluna do meio
  { top: "71.27%", left: "41.78%", width: "9.55%", height: "1.67%" }, // 10 — Francisco Cardoso Gomes
  { top: "75.13%", left: "41.78%", width: "13.05%", height: "1.40%" }, // 11 — Francisco Roberto Andre De Moura
  { top: "78.87%", left: "41.78%", width: "9.95%", height: "1.53%" }, // 12 — Francisco Sales Freire Filho
  { top: "82.60%", left: "41.78%", width: "9.55%", height: "1.40%" }, // 13 — Francisco Silveira Queiroz
  // Lista — coluna direita
  { top: "71.55%", left: "66.40%", width: "11.70%", height: "1.40%" }, // 16 — Jose Carlos Fernandes De Souza
  { top: "76.20%", left: "66.40%", width: "9.70%", height: "1.27%" }, // 17 — Jose Wilson Lino De Souza
  { top: "80.93%", left: "66.52%", width: "6.94%", height: "1.40%" }, // 18 — Luis Chaves Freitas
];

const SHOTS = [
  { id: "visao",        label: "Visão",      bar: "painel-do-gestor · visao-geral",         img: painel01Visao,        alt: "Painel do Gestor — Visão Consolidada",            capH: "Visão consolidada",      capT: "todas as obras em um só lugar" },
  { id: "acomp",        label: "Acomp.",     bar: "painel-do-gestor · acompanhamento",      img: painel02Acomp,        alt: "Painel do Gestor — Acompanhamento de Obras",      capH: "Acompanhamento",         capT: "status, progresso e alertas" },
  { id: "gestao",       label: "Obras",      bar: "painel-do-gestor · gestao-obras",        img: painel03Gestao,       alt: "Painel do Gestor — Gestão de Obras",              capH: "Gestão de obras",        capT: "crie, organize e monitore" },
  { id: "equipes",      label: "Equipes",    bar: "painel-do-gestor · gestao-equipes",      img: painel04Equipes,      alt: "Painel do Gestor — Gestão de Equipes",            capH: "Gestão de equipes",      capT: "monte e gerencia times" },
  { id: "funcionarios", label: "Func.",      bar: "painel-do-gestor · gestao-funcionarios", img: painel05Funcionarios, alt: "Painel do Gestor — Gestão de Funcionários",       capH: "Gestão de funcionários", capT: "lista por cargo e matrícula" },
  { id: "validacoes",   label: "Validações", bar: "painel-do-gestor · validacoes",          img: painel06Validacoes,   alt: "Painel do Gestor — Validação de Tarefas",         capH: "Validação de tarefas",   capT: "aprovações antes de pontuar" },
  { id: "cargos",       label: "Cargos",     bar: "painel-do-gestor · gestao-cargos",       img: painel07Cargos,       alt: "Painel do Gestor — Gestão de Cargos",             capH: "Gestão de cargos",       capT: "funcionários por categoria" },
  { id: "dash1",        label: "Dashboard",  bar: "painel-do-gestor · dashboard-obra",      img: painel08Dashboard,    alt: "Painel do Gestor — Dashboard de Desempenho",      capH: "Dashboard de desempenho",capT: "avanço, presença, pontuação" },
  { id: "dash2",        label: "Ranking",    bar: "painel-do-gestor · dashboard-ranking",   img: painel09Dashboard2,   alt: "Painel do Gestor — Ranking e Alertas",            capH: "Ranking e alertas",      capT: "equipes, pontuação e atrasos" },
  { id: "operario",     label: "Operário",   bar: "painel-gamificado · selecione-obra",     img: painel10Operario,     alt: "Visão do Operário — Seleção de Obra (8-bit)",     capH: "Visão do operário",      capT: "interface gamificada 8-bit" },
  { id: "ranking_op",   label: "Ranking",    bar: "painel-gamificado · ranking-equipes",    img: painel11Ranking,      alt: "Visão do Operário — Ranking de Equipes (8-bit)",  capH: "Ranking de equipes",     capT: "competição em tempo real" },
  { id: "top20",        label: "Top 20",     bar: "painel-gamificado · top-20-funcionarios",img: painel12Top20,        alt: "Visão do Operário — Top 20 Funcionários (8-bit)", capH: "Top 20 funcionários",    capT: "pódio e ranking individual" },
];
const TOTAL_SHOTS = SHOTS.length;

// ── Component ──────────────────────────────────────────────────────────────
export default function GamifCase() {
  const [idx, setIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);
  const deckRef = useRef<HTMLElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const shotsInViewRef = useRef(false);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => { inViewRef.current = e.isIntersecting; },
      { threshold: 0.3 }
    );
    io.observe(deck);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sh = shotsRef.current;
    if (!sh || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => { shotsInViewRef.current = e.isIntersecting; },
      { threshold: 0.3 }
    );
    io.observe(sh);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (shotsInViewRef.current) {
        if (e.key === "ArrowLeft")  setSIdx(i => (i - 1 + TOTAL_SHOTS) % TOTAL_SHOTS);
        else if (e.key === "ArrowRight") setSIdx(i => (i + 1) % TOTAL_SHOTS);
        return;
      }
      if (!inViewRef.current) return;
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % TOTAL_SLIDES);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const goPrev = () => setIdx(i => Math.max(0, i - 1));
  const goNext = () => setIdx(i => Math.min(TOTAL_SLIDES - 1, i + 1));
  const sPrev = () => setSIdx(i => Math.max(0, i - 1));
  const sNext = () => setSIdx(i => Math.min(TOTAL_SHOTS - 1, i + 1));

  return (
    <CaseSection id="case-gamificacao">
      <CaseInner>
        <CaseCounter>
          <CaseBadge>CASE EM DESTAQUE</CaseBadge>
          <CaseBigName>Gamificação<Dot>.</Dot></CaseBigName>
        </CaseCounter>

        <CaseSub>
          Para mostrar como entregamos <strong>plataformas digitais completas</strong> dentro do escopo de <strong>Desenvolvimento Web</strong>: o projeto <strong>Gamificação</strong> — uma plataforma fullstack que centraliza toda a operação de uma empresa de construção civil em um único lugar e, no mesmo sistema, engaja a equipe de campo com pontos, ranking e KPIs de segurança.
        </CaseSub>

        <CaseSplit>
          <CaseText>
            <CtEye>O projeto</CtEye>
            <CtH>Por que Gamificação?</CtH>
            <CtP>
              O cliente, do setor de <strong>construção civil</strong>, tinha sua operação espalhada — obras, validações, cargos e usuários em planilhas e sistemas paralelos — e dificuldade em <strong>engajar a equipe de campo</strong> (pedreiros, eletricistas, bombeiros e carpinteiros) no dia a dia da obra.
            </CtP>

            <CtSub>Como foi feito</CtSub>
            <CtP>
              Construímos uma <strong>plataforma fullstack</strong> com dois lados conectados: um <strong>painel corporativo</strong> para a gestão (visão geral, obras, validações, dashboards) e um <strong>painel gamificado</strong> em estética 8-bit para o operário — com ranking de equipes, top funcionários e quadro de pontos.
            </CtP>
            <CtP>
              Stack <strong>React + Vite</strong> no front, <strong>FastAPI</strong> no back com migrações <strong>Alembic</strong>, e <strong>Supabase</strong> como base — Postgres com <strong>triggers</strong> e funções internas para automatizar pontuação, validações e cálculo de progresso em tempo real.
            </CtP>

            <CtSub>Estratégia</CtSub>
            <CtList>
              <li><strong>Operação centralizada</strong> — obras, pacotes, blocos e atividades em um único lugar, com progresso real por obra.</li>
              <li><strong>Engajamento por gamificação</strong> — pontos por atividade concluída, ranking de equipes e top de funcionários atualizado em tempo real.</li>
              <li><strong>Triggers no banco</strong> — atribuição de pontos, cálculo de progresso e validações disparadas direto pelo Postgres.</li>
              <li><strong>Dois mundos, uma base</strong> — gestão e campo enxergam a mesma fonte de verdade, em UIs desenhadas para cada contexto.</li>
            </CtList>

            <CtFinal>Uma plataforma · dois públicos · operação e engajamento no mesmo lugar.</CtFinal>
          </CaseText>

          <CaseDeck ref={deckRef} aria-label="Apresentação do projeto Gamificação">
            <CdFrame>
              <CdStack>
                {SLIDES.map((s, i) => (
                  <CdSlide key={s.id} $active={idx === i}>
                    <CdiImage src={s.img} alt={s.alt} loading="lazy" />
                    <CdiCaption>{s.cap}</CdiCaption>
                  </CdSlide>
                ))}
              </CdStack>
            </CdFrame>

            <CdControls>
              <CdBtn onClick={goPrev} disabled={idx === 0} aria-label="Anterior">←</CdBtn>
              <CdProgress>
                <CdFill style={{ width: `${((idx + 1) / TOTAL_SLIDES) * 100}%` }} />
              </CdProgress>
              <CdCounter>{pad(idx + 1)} / {pad(TOTAL_SLIDES)}</CdCounter>
              <CdBtn onClick={goNext} disabled={idx === TOTAL_SLIDES - 1} aria-label="Próximo">→</CdBtn>
            </CdControls>

            {/* Mini deck · telas reais */}
            <ShotsMini ref={shotsRef} aria-label="Telas reais da plataforma Gamificação">
              <ShotsMiniHead>
                <ShotsMiniH>Como aparece <em>no canteiro.</em></ShotsMiniH>
              </ShotsMiniHead>
              <ShotsMiniFrame>
                <ShotsMiniStack>
                  {SHOTS.map((s, i) => (
                    <ShotsMiniSlide key={s.id} $active={sIdx === i}>
                      <ShotsMiniBar>
                        <Dot1 /><Dot2 /><Dot3 /><b>{s.bar}</b>
                      </ShotsMiniBar>
                      <ShotsMiniImgFrame>
                        <ShotsMiniImg src={s.img} alt={s.alt} loading="lazy" />
                        {s.id === "gestao" && (
                          <BlurOverlay aria-hidden="true">
                            {GESTAO_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "equipes" && (
                          <BlurOverlay aria-hidden="true">
                            {EQUIPES_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "funcionarios" && (
                          <BlurOverlay aria-hidden="true">
                            {FUNC_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "cargos" && (
                          <BlurOverlay aria-hidden="true">
                            {CARGOS_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "dash2" && (
                          <BlurOverlay aria-hidden="true">
                            {DASH2_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "operario" && (
                          <BlurOverlay aria-hidden="true">
                            {OPERARIO_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "ranking_op" && (
                          <BlurOverlay aria-hidden="true">
                            {RANKING_OP_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                        {s.id === "top20" && (
                          <BlurOverlay aria-hidden="true">
                            {TOP20_BLURS.map((pos, j) => (
                              <BlurMask key={j} style={pos} />
                            ))}
                          </BlurOverlay>
                        )}
                      </ShotsMiniImgFrame>
                      <ShotsMiniCap><span>{s.capH}</span> · {s.capT}</ShotsMiniCap>
                    </ShotsMiniSlide>
                  ))}
                </ShotsMiniStack>
              </ShotsMiniFrame>
              <ShotsMiniControls>
                <CdBtn onClick={sPrev} disabled={sIdx === 0} aria-label="Anterior">←</CdBtn>
                <ShotsMiniDots>
                  {SHOTS.map((s, i) => (
                    <ShotsMiniDot
                      key={s.id}
                      $active={sIdx === i}
                      onClick={() => setSIdx(i)}
                      aria-label={`Tela ${i + 1}`}
                    >
                      {s.label}
                    </ShotsMiniDot>
                  ))}
                </ShotsMiniDots>
                <CdCounter>{pad(sIdx + 1)} / {pad(TOTAL_SHOTS)}</CdCounter>
                <CdBtn onClick={sNext} disabled={sIdx === TOTAL_SHOTS - 1} aria-label="Próximo">→</CdBtn>
              </ShotsMiniControls>
            </ShotsMini>
          </CaseDeck>
        </CaseSplit>
      </CaseInner>
    </CaseSection>
  );
}


// ── Styled: case header ────────────────────────────────────────────────────
const CaseSection = styled.section`
  background: #fff;
  color: ${C.ink};
  padding: 5rem 2rem 7rem;
  position: relative;
  margin-top: 0;

  @media (max-width: 700px) { padding: 3rem 1.25rem 4rem; }
`;

const CaseInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding-top: 0;
`;

const CaseCounter = styled.p`
  font-family: ${FONT_TITLE};
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  line-height: 1;
`;

const CaseBadge = styled.span`
  font-family: ${FONT_MONO};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: ${C.redTitle};
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(161,15,35,0.4);
  border-radius: 2px;
`;

const CaseBigName = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 88px;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: ${C.ink};
  line-height: 1;
  position: relative;
  padding-bottom: 1rem;
  display: inline-block;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 88px;
    height: 4px;
    background: ${C.redTitle};
  }
  @media (max-width: 1100px) { font-size: 64px; }
  @media (max-width: 700px)  { font-size: 48px; }
  @media (max-width: 400px)  { font-size: 38px; }
`;

const Dot = styled.span`
  color: ${C.redTitle};
`;

const CaseSub = styled.p`
  font-family: ${FONT_BODY};
  font-size: 17px;
  max-width: 780px;
  margin: 0 0 3rem;
  text-align: left;
  color: #333;
  line-height: 1.65;
  strong { color: ${C.ink}; font-weight: 600; }
`;

// ── Split (updated to align-items: stretch + flex CaseText) ───────────────
const CaseSplit = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.1fr;
  gap: 3rem;
  align-items: stretch;
  @media (max-width: 1100px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const CaseText = styled.article`
  font-family: ${FONT_BODY};
  display: flex;
  flex-direction: column;
`;

const CtEye = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: ${C.redTitle};
  text-transform: uppercase;
  margin: 0 0 0.65rem;
`;

const CtH = styled.h3`
  font-family: ${FONT_TITLE};
  font-size: 32px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 1.4rem;
`;

const CtSub = styled.p`
  font-family: ${FONT_TITLE};
  font-size: 13px;
  font-weight: 700;
  color: ${C.ink};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 1.75rem 0 0.65rem;
  padding-left: 0.85rem;
  border-left: 2px solid ${C.redTitle};
`;

const CtP = styled.p`
  font-size: 14.5px;
  line-height: 1.7;
  color: #444;
  margin: 0 0 0.9rem;
  strong { color: ${C.ink}; font-weight: 600; }
`;

const CtList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: grid;
  gap: 0.65rem;
  li {
    font-size: 13.5px;
    line-height: 1.55;
    color: #555;
    padding-left: 1.25rem;
    position: relative;
    &::before {
      content: "→";
      position: absolute;
      left: 0;
      color: ${C.redTitle};
      font-weight: 700;
    }
    strong { color: ${C.ink}; font-weight: 600; }
  }
`;

const CtFinal = styled.p`
  font-family: ${FONT_MONO};
  font-size: 12px;
  color: ${C.redTitle};
  font-weight: 600;
  letter-spacing: 0.06em;
  margin: auto 0 0;
  padding-top: 1.25rem;
  border-top: 1px dashed rgba(0,0,0,0.15);
`;

// ── Deck ──────────────────────────────────────────────────────────────────
const CaseDeck = styled.aside`
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 1100px) { position: relative; top: 0; max-width: 680px; margin: 0 auto; width: 100%; }
`;

const CdFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: ${C.ink};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 60px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06);
`;

const CdStack = styled.div`
  position: absolute;
  inset: 0;
`;

const CdSlide = styled.figure<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(24px)"};
  transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
`;

// ── Image slide content ───────────────────────────────────────────────────
const CdiImage = styled.img`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  background: #fff;
`;

const CdiCaption = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.65rem 0.95rem;
  background: linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.78) 50%, rgba(26,26,26,0.94) 100%);
  font-family: ${FONT_MONO};
  font-size: 10.5px;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
  z-index: 2;
  pointer-events: none;
`;


// ── Controls ──────────────────────────────────────────────────────────────
const CdControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CdBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.15);
  color: ${C.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: ${FONT_MONO};
  font-size: 16px;
  flex-shrink: 0;
  &:hover:not(:disabled) {
    background: ${C.redTitle};
    border-color: ${C.redTitle};
    color: #fff;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CdProgress = styled.div`
  flex: 1;
  height: 2px;
  background: rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
`;

const CdFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${C.redTitle};
  transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
`;

const CdCounter = styled.span`
  font-family: ${FONT_MONO};
  font-size: 11px;
  color: #888;
  letter-spacing: 0.16em;
  flex-shrink: 0;
`;

// ── Shots mini deck (real screenshots) ────────────────────────────────────
const ShotsMini = styled.div`
  margin-top: 2rem;
  padding-top: 1.6rem;
  border-top: 1px dashed rgba(0,0,0,0.16);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const ShotsMiniHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ShotsMiniH = styled.h4`
  font-family: ${FONT_TITLE};
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  line-height: 1.18;
  margin: 0;
  em {
    font-style: italic;
    color: ${C.redTitle};
    font-weight: 700;
  }
`;

const ShotsMiniFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #1a1a1a;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 14px 36px -16px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.07);
`;

const ShotsMiniImgFrame = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: block;
  background: #fff;
`;

const ShotsMiniStack = styled.div`
  position: absolute;
  inset: 0;
`;

const ShotsMiniSlide = styled.figure<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  opacity: ${p => p.$active ? 1 : 0};
  pointer-events: ${p => p.$active ? "auto" : "none"};
  transform: ${p => p.$active ? "translateX(0)" : "translateX(20px)"};
  transition: opacity 0.5s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
`;

const ShotsMiniBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.32rem;
  padding: 0.38rem 0.6rem;
  background: #2a2a2a;
  font-family: ${FONT_MONO};
  font-size: 9px;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.05em;
  flex: 0 0 auto;
  b {
    margin-left: 0.45rem;
    font-weight: 600;
    color: rgba(255,255,255,0.78);
  }
`;

const Dot1 = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff5f57;
  display: block;
  flex: 0 0 auto;
`;

const Dot2 = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #febc2e;
  display: block;
  flex: 0 0 auto;
`;

const Dot3 = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #28c840;
  display: block;
  flex: 0 0 auto;
`;

const ShotsMiniImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  background: #fff;
`;

// Wrapper alinhado à imagem real (16:9, top-left): permite posicionar
// os blurs em % relativas à imagem original sem distorção do bar superior.
const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  pointer-events: none;
  z-index: 1;
`;

const BlurMask = styled.div`
  position: absolute;
  width: 4%;
  height: 3.5%;
  background: rgba(225, 230, 236, 0.55);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  border-radius: 2px;
`;

const ShotsMiniCap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.55rem 0.75rem;
  background: linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.85) 60%, rgba(26,26,26,0.96) 100%);
  font-family: ${FONT_MONO};
  font-size: 10px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.78);
  span {
    font-family: ${FONT_TITLE};
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.005em;
  }
`;

const ShotsMiniControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

const ShotsMiniDots = styled.div`
  flex: 1;
  display: flex;
  gap: 0.32rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ShotsMiniDot = styled.button<{ $active: boolean }>`
  appearance: none;
  background: ${p => p.$active ? "#1a1a1a" : "transparent"};
  border: 1px solid ${p => p.$active ? "#1a1a1a" : "rgba(0,0,0,0.14)"};
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  font-family: ${FONT_MONO};
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${p => p.$active ? "#fff" : "rgba(0,0,0,0.55)"};
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    border-color: ${p => p.$active ? "#1a1a1a" : "rgba(0,0,0,0.32)"};
    color: ${p => p.$active ? "#fff" : "#1a1a1a"};
  }
`;
