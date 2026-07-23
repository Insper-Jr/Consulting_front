import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa       from "../../../assets/direito/pe-direito/slide-03.png";
import slideContexto   from "../../../assets/direito/pe-direito/slide-04.png";
import slideDesafios   from "../../../assets/direito/pe-direito/slide-05.png";
import slideEntregavel from "../../../assets/direito/pe-direito/slide-06.png";

export default function PeDireitoPage() {
  return (
    <CaseLayout>
      <LawCase
        id="case-pe-direito"
        badge="CASE EM DESTAQUE"
        bigName={<>Pé Direito I</>}
        sub={
          <>
            O <strong>Pé Direito I</strong> foi o <strong>primeiro projeto executado pela frente de Direito</strong> da Insper Jr., conduzido para uma ONG cliente. Mais do que uma entrega, o projeto serviu como <strong>teste de viabilidade do escopo de Contratos</strong> recém-estruturado — e validou o modelo de atuação consultiva da frente.
          </>
        }
        intro={{
          eyebrow: "O projeto",
          headline: <>Por que Pé Direito?</>,
          paragraphs: [
            <>
              A cliente, uma <strong>ONG do terceiro setor</strong>, mantinha relações comerciais com empresas parceiras que, formalmente, eram tratadas como <strong>doações</strong> — mas envolviam <strong>contrapartida financeira</strong>, o que descaracterizava juridicamente a operação como doação pura e gerava riscos tributários e reputacionais.
            </>,
            <>
              O objetivo do projeto foi <strong>identificar corretamente a natureza jurídica</strong> dessas relações e estruturar contratos adequados às necessidades da ONG — preservando o vínculo com os parceiros e reduzindo a exposição fiscal.
            </>,
          ],
          subhead: "Estratégia",
          list: [
            <><strong>Diagnóstico jurídico</strong> — identificar o tipo de contrato que melhor representava a relação real entre ONG e empresas.</>,
            <><strong>Análise tributária integrada</strong> — avaliar o impacto fiscal de cada modelo contratual possível.</>,
            <><strong>Modelagem flexível</strong> — optar por contrato atípico, com maior margem de redação personalizada.</>,
            <><strong>Documentos complementares</strong> — completar o ecossistema jurídico com termos de voluntariado e uso de imagem.</>,
          ],
        }}
        meta={[
          { label: "Setor", value: "Terceiro Setor · ONG" },
          { label: "Contexto", value: "Doações com contrapartida" },
          { label: "Escopo", value: "Contratos" },
        ]}
        steps={[
          { img: slideCapa,       alt: "Pé Direito I — escopo: contratos",                cap: "01 · Capa" },
          { img: slideContexto,   alt: "Contexto: ONG com contrato de doação inadequado", cap: "02 · Contexto" },
          { img: slideDesafios,   alt: "Desafios do projeto Pé Direito I",                cap: "03 · Desafios" },
          { img: slideEntregavel, alt: "Entregáveis do projeto Pé Direito I",             cap: "04 · Entregáveis" },
        ]}
      />
    </CaseLayout>
  );
}
