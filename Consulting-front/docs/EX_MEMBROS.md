# Ex-membros em destaque (/alumni)

A lista de ex-membros da página `/alumni` **não fica mais no código**. Ela é editada pela
diretoria no **ATLAS → Sistema → Institucional** e lida pelo site por uma rota pública
só de leitura da API do ATLAS.

| Peça | Onde |
|---|---|
| Edição (cadastrar, editar, ordenar, ocultar, remover, foto) | ATLAS, aba Institucional (caixa `pode_acessar_institucional`, diretoria) |
| Fonte de dados | `GET {ATLAS_API_URL}/publico/ex-membros` e `/publico/ex-membros/{id}/foto` |
| Leitura no site | `src/features/alumni/repository.ts` → `useAlumniMembers()` → `alumniCarousel.tsx` |
| Fallback | `src/features/alumni/fallback.ts` (lista fixa antiga) |
| URL da API | `src/config/config.ts` (`ATLAS_API_URL`, sobrescrevível por `VITE_ATLAS_API_URL`) |

Regras de exibição:
- Só **publicados** aparecem, na **ordem** definida no ATLAS.
- Os **8 primeiros** vão para o carrossel; o restante só em "Ver todos".
- Textos em inglês são opcionais: vazios, o site mostra o português.
- Sem foto, aparecem as iniciais.
- Se a API falhar ou devolver vazio, o site mostra a lista fixa antiga. Nada quebra.

Para testar com um ATLAS local, crie `.env.local` com `VITE_ATLAS_API_URL=http://localhost:8000`
(ver `.env.example`).
