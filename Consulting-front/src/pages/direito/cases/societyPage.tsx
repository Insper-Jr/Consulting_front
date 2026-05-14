import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa       from "../../../assets/direito/society/slide-07.png";
import slideContexto   from "../../../assets/direito/society/slide-08.png";
import slideDesafios   from "../../../assets/direito/society/slide-09.png";
import slideEntregavel from "../../../assets/direito/society/slide-10.png";

export default function SocietyPage() {
  return (
    <CaseLayout>
      <LawCase
        id="case-society"
        badge="CASE EM DESTAQUE"
        bigName={<>Society I</>}
        sub={
          <>
            O <strong>Society I</strong> foi o <strong>primeiro projeto da frente de Direito no escopo de Societário</strong>, conduzido com o objetivo explícito de <strong>testar o escopo dentro da operação</strong> da Insper Jr. Mais do que uma entrega ao cliente, o projeto se tornou um <strong>aprendizado institucional</strong> sobre os limites do que a empresa júnior pode executar diretamente.
          </>
        }
        intro={{
          eyebrow: "O projeto",
          headline: <>Por que Society?</>,
          paragraphs: [
            <>
              O projeto chegou por <strong>indicação de um conhecido de uma professora</strong>, com objetivo claro de testar a viabilidade do escopo de <strong>Societário</strong> dentro da frente de Direito. O cliente era constituído como <strong>Sociedade Limitada (LTDA)</strong> e a demanda envolvia a <strong>alteração do quadro societário</strong>, em razão da saída de um dos sócios.
            </>,
            <>
              Ao longo da execução, ficou claro que parte das etapas necessárias <strong>fugia da autonomia institucional da Insper Jr.</strong> — exigindo comparecimento presencial em cartório e atos que só o próprio cliente pode praticar. O projeto não se concluiu na entrega tradicional, mas <strong>delimitou o escopo</strong> do que a frente passa a oferecer daí em diante.
            </>,
          ],
          subhead: "Estratégia",
          list: [
            <><strong>Análise da demanda real</strong> — entender exatamente o que a alteração societária exigia.</>,
            <><strong>Mapeamento das etapas externas</strong> — identificar passos dependentes de cartório, assinaturas e registros.</>,
            <><strong>Avaliação de autonomia</strong> — diagnosticar quais etapas a Insper Jr. poderia conduzir diretamente.</>,
            <><strong>Aprendizado institucional</strong> — converter o projeto em delimitação formal do escopo de Societário.</>,
          ],
        }}
        meta={[
          { label: "Cliente", value: "Sociedade Limitada (LTDA)" },
          { label: "Origem", value: "Indicação acadêmica" },
          { label: "Escopo", value: "Societário" },
        ]}
        steps={[
          { img: slideCapa,       alt: "Society I — escopo: societário",            cap: "01 · Capa" },
          { img: slideContexto,   alt: "Contexto: cliente LTDA com saída de sócio", cap: "02 · Contexto" },
          { img: slideDesafios,   alt: "Desafios do projeto Society I",             cap: "03 · Desafios" },
          { img: slideEntregavel, alt: "Entregáveis do projeto Society I",          cap: "04 · Entregáveis" },
        ]}
      />
    </CaseLayout>
  );
}
