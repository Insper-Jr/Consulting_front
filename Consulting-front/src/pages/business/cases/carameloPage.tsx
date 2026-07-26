import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";

import slideDelivery   from "../../../assets/business/caramelo/01-delivery.jpg";
import slidePresencial from "../../../assets/business/caramelo/03-presencial.jpg";
import slideCapex      from "../../../assets/business/caramelo/04-capex.jpg";
import shotEcommerce   from "../../../assets/business/caramelo/02-ecommerce.jpg";

const SLIDES: CaseSlide[] = [
  { id: "delivery",   img: slideDelivery,   alt: "Transição de delivery próprio para aplicativos de entrega", cap: "01 · Canal digital" },
  { id: "presencial", img: slidePresencial, alt: "Inserção em modelo presencial como impulsionamento de vendas", cap: "02 · Canal presencial" },
  { id: "capex",      img: slideCapex,      alt: "CapEx inicial e estrutura operacional do modelo grab & go",  cap: "03 · CapEx" },
];

const SHOTS: CaseShot[] = [
  { id: "ecommerce", label: "E-commerce", bar: "viabilidade · comportamento-de-consumo", img: shotEcommerce, alt: "Relevância dos doces em plataformas de e-commerce", capH: "Demanda digital", capT: "o que sustenta a projeção de receita" },
];

export default function CarameloPage() {
  return (
    <CaseLayout>
      <CaseView
        id="case-caramelo"
        name="Projeto Caramelo"
        sub={
          <>
            Para mostrar como funciona o escopo de <strong>Planejamento Financeiro</strong>: a
            análise de viabilidade de uma <strong>confeitaria artesanal</strong> que operava em
            casa, no delivery próprio, e queria saber se valia a pena abrir uma loja física e com
            qual estrutura.
            O nome do projeto é fictício, para preservar a confidencialidade do cliente.
          </>
        }
        eyebrow="O projeto"
        headline="A pergunta não era quanto vender, era se valia abrir"
        intro={[
          <>
            A operação era pequena e autônoma: <strong>modelo home-office, entrega própria e
            baixa visibilidade de marca</strong>. Crescer exigia decisão de investimento, e não
            havia modelagem que sustentasse essa decisão.
          </>,
        ]}
        sections={[
          {
            title: "Como foi feito",
            body: [
              <>
                Antes do número veio o mercado: mapeamos o <strong>comportamento de consumo</strong>{" "}
                nos dois canais possíveis. No digital, a consolidação dos aplicativos de entrega
                como porta de entrada de novos comércios. No presencial, o peso da loja física
                como canal de divulgação e consolidação de marca.
              </>,
              <>
                Com a estratégia de canal definida, dimensionamos o <strong>CapEx inicial</strong>{" "}
                item a item (obra civil, marcenaria, fachada, equipamentos, área de cliente) em
                um modelo <em>grab &amp; go</em>, escolhido por reduzir investimento por metro
                quadrado sem perder impacto visual.
              </>,
              <>
                Em cima disso rodamos a <strong>projeção financeira completa</strong>: receita por
                canal, estrutura de custos, comparativo entre regimes tributários, geração de
                caixa e retorno do investimento ao longo do horizonte projetado.
              </>,
            ],
          },
          {
            title: "Entregas",
            list: [
              <><strong>Análise de mercado por canal</strong>: delivery por aplicativo e loja física.</>,
              <><strong>Dimensionamento do CapEx inicial</strong>, aberto por item de investimento.</>,
              <><strong>Projeção de receita, custos e margem</strong> para o horizonte do projeto.</>,
              <><strong>Comparativo de regimes tributários</strong> e recomendação de enquadramento.</>,
              <><strong>Projeção de geração de caixa</strong> e conversão de operação em caixa disponível.</>,
              <><strong>Modelagem econométrica</strong> testando o efeito do investimento em marketing sobre a receita.</>,
            ],
          },
          {
            title: "Sobre os números",
            body: [
              <>
                Os valores de investimento, receita e tributos deste projeto são{" "}
                <strong>dados do cliente</strong> e por isso aparecem ocultos nos slides. O que
                está visível é o método: como o mercado foi lido, como o investimento foi aberto
                e como a decisão foi sustentada.
              </>,
            ],
          },
        ]}
        closing="Canal definido · investimento dimensionado · decisão sustentada em número."
        slides={SLIDES}
        shots={SHOTS}
        shotsHeadline={<>O que sustenta <em>a projeção.</em></>}
      />
    </CaseLayout>
  );
}
