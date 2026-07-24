import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa       from "../../../assets/direito/print/slide-15.png";
import slideContexto   from "../../../assets/direito/print/slide-16.png";
import slideDesafios   from "../../../assets/direito/print/slide-17.png";
import slideEntregavel from "../../../assets/direito/print/slide-18.png";

export default function PrintPage() {
  return (
    <CaseLayout>
      <LawCase
        id="case-print"
        badge="CASE EM ANDAMENTO"
        bigName={<>Print I</>}
        sub={
          <>
            O <strong>Print I</strong> é um projeto <strong>multi-escopo em andamento</strong> que combina <strong>três frentes de atuação</strong> da área de Direito — <strong>Contratos, Tributário e Propriedade Industrial</strong> — para um cliente com <strong>dois CNPJs</strong> que prestam o mesmo serviço sob regimes tributários distintos. Demonstra a capacidade da frente em entregar valor combinado, não escopo isolado.
          </>
        }
        intro={{
          eyebrow: "O projeto",
          headline: <>Por que Print?</>,
          paragraphs: [
            <>
              O cliente possui <strong>dois CNPJs</strong> que prestam o mesmo tipo de serviço, porém com <strong>regimes tributários diferentes</strong>. A configuração gera uma operação fragmentada — com impactos sobre contratos, fiscalização e estrutura societária — que exige análise jurídica articulada sobre as três frentes simultaneamente.
            </>,
            <>
              O projeto está em <strong>execução com três frentes paralelas</strong> de atuação, sendo um marco interno da Insper Jr.: a primeira entrega que combina <strong>Contratos + Tributário + Propriedade Industrial</strong> em um mesmo cliente.
            </>,
          ],
          subhead: "Estratégia",
          list: [
            <><strong>Análise tributária integrada</strong> — comparar a operação sob os dois regimes e mapear caminhos de adequação.</>,
            <><strong>Revisão contratual coordenada</strong> — assegurar que os instrumentos refletem a divisão entre os CNPJs.</>,
            <><strong>Frente de propriedade industrial</strong> — apoiar o cliente em registros que protegem a operação.</>,
            <><strong>Coordenação multi-escopo</strong> — uma única banca técnica acompanha as três frentes para garantir coerência.</>,
          ],
        }}
        meta={[
          { label: "Cliente", value: "2 CNPJs · mesmo serviço" },
          { label: "Frentes", value: "3 paralelas" },
          { label: "Escopos", value: "Contratos · Tributário · PI" },
        ]}
        steps={[
          { img: slideCapa,       alt: "Print I — escopos: contratos, tributário e propriedade industrial", cap: "01 · Capa" },
          { img: slideContexto,   alt: "Contexto: cliente com dois CNPJs e regimes distintos",              cap: "02 · Contexto" },
          { img: slideDesafios,   alt: "Desafios do projeto Print I",                                       cap: "03 · Desafios" },
          { img: slideEntregavel, alt: "Status / entregáveis do projeto Print I",                           cap: "04 · Status" },
        ]}
      />
    </CaseLayout>
  );
}
