import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";

import slideMercado        from "../../../assets/business/community/01-mercado-global.jpg";
import slideBenchmarks     from "../../../assets/business/community/02-benchmarks.jpg";
import slidePosicionamento from "../../../assets/business/community/03-posicionamento.jpg";
import shotPrecificacao    from "../../../assets/business/community/04-precificacao.jpg";
import shotFunil           from "../../../assets/business/community/05-funil.jpg";
import shotRoi             from "../../../assets/business/community/06-roi-b2b.jpg";
import shotKeywords        from "../../../assets/business/community/07-keywords.jpg";

const SLIDES: CaseSlide[] = [
  { id: "mercado",        img: slideMercado,        alt: "Mercado global de saúde emocional em crescimento acelerado", cap: "01 · Mercado" },
  { id: "benchmarks",     img: slideBenchmarks,     alt: "Comparativo de players e lacunas do mercado",                cap: "02 · Benchmarks" },
  { id: "posicionamento", img: slidePosicionamento, alt: "Mapa de posicionamento competitivo",                         cap: "03 · Posicionamento" },
];

const SHOTS: CaseShot[] = [
  { id: "preco",    label: "Preço",    bar: "plano-de-marketing · precificacao-b2b",  img: shotPrecificacao, alt: "Estratégia de precificação para o B2B",         capH: "Precificação B2B",   capT: "benchmark de preço dos concorrentes" },
  { id: "funil",    label: "Funil",    bar: "plano-de-marketing · funil-de-conteudo", img: shotFunil,        alt: "Funil de conteúdo e perfil do founder",         capH: "Funil de conteúdo",  capT: "topo, meio e fundo por canal" },
  { id: "roi",      label: "ROI",      bar: "plano-de-marketing · roi-do-b2b",        img: shotRoi,          alt: "O que o B2B compra de verdade: análise de ROI", capH: "O que o B2B compra", capT: "retorno por tipo de intervenção" },
  { id: "keywords", label: "Keywords", bar: "plano-de-marketing · midia-paga",        img: shotKeywords,     alt: "Análise de keywords para mídia paga B2B",       capH: "Mídia paga",         capT: "CPC, volume e intenção de busca" },
];

export default function CommunityPage() {
  return (
    <CaseLayout>
      <CaseView
        id="case-community"
        name="Projeto Community"
        sub={
          <>
            Para mostrar como funciona o escopo de <strong>Estratégia de Marketing</strong>: o
            plano estratégico de marketing e operações de uma <strong>startup de saúde emocional
            digital</strong>, de onde ela compete até como conquista os primeiros usuários e as
            primeiras empresas contratantes.
            O nome do projeto é fictício, para preservar a confidencialidade do cliente.
          </>
        }
        eyebrow="O projeto"
        headline="Um posicionamento que ninguém no mercado ocupava"
        intro={[
          <>
            O cliente entrava em um mercado <strong>disputado por players globais</strong> e
            precisava de duas coisas ao mesmo tempo: descobrir onde ainda havia espaço e definir
            como chegar ao usuário final (B2C) e às empresas contratantes (B2B) sem verba para
            errar.
          </>,
        ]}
        sections={[
          {
            title: "Como foi feito",
            body: [
              <>
                Começamos pelo mercado: crescimento global do setor, onde a receita se concentra e
                quais casos internacionais funcionaram em países de renda e cultura parecidas com
                a brasileira, para separar <strong>o que dá para tropicalizar do que não dá</strong>.
              </>,
              <>
                Em seguida comparamos os concorrentes atributo por atributo (comunidade,
                moderação, preço, idioma, personalização, uso de IA) e encontramos a lacuna:{" "}
                <strong>nenhum player reunia comunidade anônima com protocolo de segurança e
                cuidado contínuo</strong>. Esse virou o posicionamento.
              </>,
            ],
          },
          {
            title: "Do posicionamento ao plano",
            body: [
              <>
                Com o território definido, estruturamos o go-to-market das duas frentes:
                precificação B2C e B2B ancorada em benchmark dos concorrentes,{" "}
                <strong>funil de conteúdo founder-led</strong> para aquisição orgânica e
                prospecção B2B ativa e passiva com análise de keywords, CPC e intenção de busca.
              </>,
            ],
          },
          {
            title: "Entregas",
            list: [
              <><strong>Estudo de mercado</strong> global e brasileiro, com benchmarks internacionais.</>,
              <><strong>Matriz competitiva</strong> e mapa de posicionamento por eixo de valor.</>,
              <><strong>Segmentação B2B e B2C</strong>: quem contrata, quem usa e o que cada um prioriza.</>,
              <><strong>Estratégia de precificação</strong> para as duas frentes, ancorada em benchmark.</>,
              <><strong>Plano de comunicação e promoção</strong>: canais, funil de conteúdo e mídia paga.</>,
              <><strong>Estrutura organizacional</strong> em três horizontes: curto, médio e longo prazo.</>,
            ],
          },
        ]}
        closing="Lacuna identificada · posicionamento definido · plano de aquisição pronto."
        slides={SLIDES}
        shots={SHOTS}
        shotsHeadline={<>Do posicionamento <em>à execução.</em></>}
      />
    </CaseLayout>
  );
}
