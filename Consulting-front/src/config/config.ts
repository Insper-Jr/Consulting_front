export const config = {
    apiBaseUrl: window.location.origin == 'http://localhost:5173' ? "http://localhost:8000" : "https://consulting-back.onrender.com"
  }

export const INSCRICAO_URL = "https://gestaopessoasijr.vercel.app/inscricao";

/*
  API do ATLAS (plataforma interna da IJR). A seção de ex-membros de /alumni é
  lida da rota pública `/publico/ex-membros`, editada pela diretoria na aba
  Institucional do ATLAS. Sem variável definida, aponta para a produção.
  Para testar contra um ATLAS local: VITE_ATLAS_API_URL=http://localhost:8000
  em .env.local.
*/
export const ATLAS_API_URL: string =
  (import.meta.env.VITE_ATLAS_API_URL as string | undefined) ||
  "https://atlas-back-production-xcfvgh.up.railway.app";
