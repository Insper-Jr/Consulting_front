/*
  Tipos da seção de ex-membros (/alumni).
  A fonte dos dados é o ATLAS (rota pública /publico/ex-membros), editada pela
  diretoria na aba Institucional. Ver repository.ts.
*/

/** Um ex-membro como a API pública do ATLAS devolve (campos em PT/EN). */
export interface ExMembroApi {
  id:            number;
  nome:          string;
  cargo_pt:      string;
  cargo_en:      string | null;
  area_pt:       string | null;
  area_en:       string | null;
  empresa:       string;
  empresa_en:    string | null;
  depoimento_pt: string | null;
  depoimento_en: string | null;
  linkedin:      string | null;
  ordem:         number;
  tem_foto:      boolean;
  foto_versao:   number;
}

/** Modelo já resolvido no idioma atual, usado pelos componentes visuais. */
export interface Member {
  id:        string;
  name:      string;
  role:      string;
  area?:     string;
  company:   string;
  photo?:    string;
  initials?: string;
  quote:     string;
  linkedin?: string;
}

export type Lang = "pt" | "en";

/** Quantos ex-membros aparecem no carrossel; o restante só no modal "Ver todos". */
export const CAROUSEL_LIMIT = 8;

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Converte o registro da API em Member no idioma pedido (EN cai para PT quando vazio). */
export function apiToMember(m: ExMembroApi, lang: Lang, photoUrl?: string): Member {
  const pick = (pt: string | null, en: string | null) =>
    (lang === "en" && en && en.trim()) ? en : (pt ?? "");

  const area = pick(m.area_pt, m.area_en);
  return {
    id:       String(m.id),
    name:     m.nome,
    role:     pick(m.cargo_pt, m.cargo_en),
    area:     area || undefined,
    company:  pick(m.empresa, m.empresa_en),
    photo:    photoUrl,
    initials: initialsOf(m.nome),
    quote:    pick(m.depoimento_pt, m.depoimento_en),
    linkedin: m.linkedin || undefined,
  };
}
