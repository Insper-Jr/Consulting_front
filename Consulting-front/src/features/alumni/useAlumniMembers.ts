import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { listPublished, photoUrl } from "./repository";
import { fallbackMembers } from "./fallback";
import { apiToMember, type ExMembroApi, type Lang, type Member } from "./types";

type Source = "atlas" | "fallback";

/**
 * Lista de ex-membros para a página pública.
 *
 * Busca os publicados na API pública do ATLAS (ordem = definida pela
 * diretoria na aba Institucional). Enquanto carrega, se a chamada falhar
 * ou se a lista vier vazia, mostra a lista estática (fallback.ts) para a
 * seção nunca aparecer vazia.
 *
 * A resolução de idioma é feita no cliente, então trocar PT/EN não refaz a busca.
 */
export function useAlumniMembers(): { members: Member[]; source: Source; loading: boolean } {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("en") ? "en" : "pt";

  const [rows, setRows]       = useState<ExMembroApi[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listPublished()
      .then((data) => { if (!cancelled) setRows(data); })
      .catch((err) => { console.warn("[alumni] usando lista estática:", err?.message ?? err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const members = useMemo<Member[]>(() => {
    if (rows && rows.length > 0) {
      return rows.map((m) => apiToMember(m, lang, photoUrl(m)));
    }
    return fallbackMembers(lang);
  }, [rows, lang]);

  return { members, source: rows && rows.length > 0 ? "atlas" : "fallback", loading };
}
