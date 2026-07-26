import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";

import slideContexto   from "../../../assets/business/wine/01-contexto.jpg";
import slideProblemas  from "../../../assets/business/wine/02-problemas.jpg";
import slideResultados from "../../../assets/business/wine/06-resultados.jpg";
import shotDados       from "../../../assets/business/wine/03-dados.jpg";
import shotBenchs      from "../../../assets/business/wine/04-benchs.jpg";
import shotValor       from "../../../assets/business/wine/05-valor.jpg";

const SLIDES: CaseSlide[] = [
  { id: "contexto",   img: slideContexto,   alt: "Contexto do projeto: plataforma para o consumidor de vinho premium", cap: "01 · Contexto" },
  { id: "problemas",  img: slideProblemas,  alt: "Principais desafios da análise mercadológica",                        cap: "02 · Desafios" },
  { id: "resultados", img: slideResultados, alt: "Resultados encontrados e plano de ação",                              cap: "03 · Resultados" },
];

const SHOTS: CaseShot[] = [
  { id: "dados",  label: "Dados",   bar: "analise-mercadologica · fontes-de-dados",   img: shotDados,  alt: "Como contornamos a falta de dados do segmento", capH: "Cruzamento de fontes",   capT: "dados públicos + pesquisa autoral" },
  { id: "benchs", label: "Benchs",  bar: "analise-mercadologica · benchmarks",        img: shotBenchs, alt: "Como contornamos o acesso a benchmarks",       capH: "Acesso a benchmarks",    capT: "cliente oculto e networking" },
  { id: "valor",  label: "Valor",   bar: "analise-mercadologica · geracao-de-valor",  img: shotValor,  alt: "Cadeia de geração de valor da análise",         capH: "Geração de valor",       capT: "da operação atual às parcerias" },
];

export default function WinePage() {
  return (
    <CaseLayout>
      <CaseView
        id="case-wine"
        name="Projeto Wine"
        sub={
          <>
            Para mostrar como funciona o escopo de <strong>Análise Mercadológica</strong>: o
            projeto de entrada no Brasil de uma <strong>plataforma internacional de vinhos
            premium</strong>. A tarefa era dimensionar um mercado sem estatística confiável,
            entender o consumidor de luxo e apontar quais adaptações o modelo precisava para
            funcionar aqui.
            O nome do projeto é fictício, para preservar a confidencialidade do cliente.
          </>
        }
        eyebrow="O projeto"
        headline="Entrar em um mercado que quase não tem dado público"
        intro={[
          <>
            O cliente queria <strong>estruturar do zero a operação brasileira</strong> de uma
            plataforma que acompanha o vinho da vinícola até a mesa. A dúvida não era se havia
            demanda, e sim <strong>qual era o tamanho real dela</strong> e o que precisava mudar
            para o modelo funcionar no Brasil.
          </>,
        ]}
        sections={[
          {
            title: "O desafio",
            body: [
              <>
                O mercado de vinhos de luxo é <strong>pequeno, disperso e pouco documentado</strong>:
                as estatísticas brasileiras tratam o setor de forma agregada, a tributação é
                complexa e muda com frequência, o mercado ilegal distorce o volume e o público
                consumidor é discreto, <strong>difícil de trazer para uma pesquisa</strong>.
              </>,
            ],
          },
          {
            title: "Como foi feito",
            body: [
              <>
                Em vez de depender de uma fonte só, montamos a leitura de mercado por{" "}
                <strong>cruzamento</strong>: bases públicas, pesquisa autoral com o público-alvo,
                abordagem de <strong>cliente oculto</strong> junto a players do setor e networking
                para chegar a benchmarks que não estão disponíveis publicamente.
              </>,
              <>
                Com o mercado dimensionado, avaliamos a <strong>operação internacional existente</strong>,
                o cenário concorrencial brasileiro e as barreiras alfandegárias e cambiais que
                afetam a viabilidade da tropicalização.
              </>,
            ],
          },
          {
            title: "Entregas",
            list: [
              <><strong>Dimensionamento do mercado consumidor</strong> brasileiro do segmento premium.</>,
              <><strong>Pesquisa autoral</strong> com consumidores, somada a bases públicas e benchmarks.</>,
              <><strong>Análise concorrencial</strong>: quem concorre de forma direta e indireta, e por quê.</>,
              <><strong>Recomendações de tropicalização</strong>: ticket médio, objetivos de desempenho e foco em experiência.</>,
              <><strong>Mapeamento de parcerias estratégicas</strong> com hotéis, vinícolas e restaurantes, com contatos.</>,
            ],
          },
          {
            title: "O que mudou",
            body: [
              <>
                A análise <strong>redirecionou o produto</strong>: o app deixou de ser apenas o
                acompanhamento do vinho da vinícola até a taça e passou a incluir vinhos
                brasileiros exclusivos, marketplace de importadoras e gestão de confrarias. A
                decisão saiu dos insights da mercadológica.
              </>,
            ],
          },
        ]}
        closing="Mercado dimensionado · produto redirecionado · parcerias mapeadas."
        slides={SLIDES}
        shots={SHOTS}
        shotsHeadline={<>Como a análise <em>foi construída.</em></>}
      />
    </CaseLayout>
  );
}
