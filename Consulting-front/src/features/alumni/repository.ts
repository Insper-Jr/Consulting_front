/*
  Leitura dos ex-membros na API pública do ATLAS.
  Só GET, sem login: a rota devolve apenas os publicados, na ordem definida
  pela diretoria, e só os campos que o site exibe.
*/

import { ATLAS_API_URL } from "../../config/config";
import type { ExMembroApi } from "./types";

const TIMEOUT_MS = 8000;

export async function listPublished(): Promise<ExMembroApi[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // `no-store`: sem isto o navegador segura a resposta pelo max-age que a
    // API manda, e uma edição feita no ATLAS só aparecia depois de minutos,
    // mesmo recarregando a página. A lista é pequena; buscar sempre é barato.
    const res = await fetch(`${ATLAS_API_URL}/publico/ex-membros`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ExMembroApi[];
    return Array.isArray(data) ? data : [];
  } finally {
    clearTimeout(timer);
  }
}

/** URL pública da foto; `foto_versao` na query fura o cache quando ela troca. */
export function photoUrl(m: ExMembroApi): string | undefined {
  if (!m.tem_foto) return undefined;
  return `${ATLAS_API_URL}/publico/ex-membros/${m.id}/foto?v=${m.foto_versao}`;
}
