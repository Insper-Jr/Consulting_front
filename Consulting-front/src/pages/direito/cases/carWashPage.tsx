import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa         from "../../../assets/direito/car-wash/slide-01-capa.jpg";
import slideFranqueador  from "../../../assets/direito/car-wash/slide-02-franqueador.jpg";
import slideCof          from "../../../assets/direito/car-wash/slide-03-cof.png";
import slideModelos      from "../../../assets/direito/car-wash/slide-04-modelos.png";
import slideRecomendacao from "../../../assets/direito/car-wash/slide-05-recomendacao.png";

export default function CarWashPage() {
  return (
    <CaseLayout>
      <LawCase
        id="case-car-wash"
        badge="CASE EM DESTAQUE"
        bigName={<>Car Wash I</>}
        sub={
          <>
            O <strong>Car Wash I</strong> foi um projeto consultivo que mapeou o caminho jurídico para o cliente <strong>transformar sua operação em uma franquia</strong> — dos documentos obrigatórios do franqueador aos modelos de distribuição de insumos e à estrutura societária mais adequada para abrigar a nova atividade. Por confidencialidade, a identidade do cliente é preservada.
          </>
        }
        intro={{
          eyebrow: "O projeto",
          headline: <>Como se tornar franqueador?</>,
          paragraphs: [
            <>
              O cliente queria <strong>expandir a operação pelo modelo de franquia</strong> e precisava entender, antes de qualquer decisão, o que a legislação exige de um franqueador: <strong>titularidade da marca</strong>, adequação das atividades no CNPJ, <strong>Circular de Oferta de Franquia (COF)</strong> nos termos da Lei nº 13.966/2019 e um <strong>contrato de franquia</strong> coerente com o que a COF promete.
            </>,
            <>
              Em paralelo, o projeto avaliou <strong>como os insumos chegariam aos franqueados</strong> — revenda pelo próprio franqueador ou intermediação com comissão — e <strong>onde alojar a nova atividade</strong>: em um novo CNPJ ou por alteração do CNPJ existente. Cada caminho foi analisado sob os efeitos societários, tributários (Simples Nacional) e de risco, terminando em uma <strong>recomendação fundamentada</strong>.
            </>,
          ],
          subhead: "Estratégia",
          list: [
            <><strong>Requisitos do franqueador</strong> — marca, atividades no CNPJ e os documentos obrigatórios da relação de franquia.</>,
            <><strong>COF e contrato de franquia</strong> — o que a lei exige informar e como isso se traduz nas cláusulas do contrato.</>,
            <><strong>Distribuição de insumos</strong> — comparação entre revenda e intermediação: faturamento, tributação, logística, controle de preço e risco de venda casada.</>,
            <><strong>Estrutura societária</strong> — novo CNPJ x alteração da atividade, comparados por governança, proteção patrimonial, custo e atratividade para investidores.</>,
          ],
        }}
        meta={[
          { label: "Cliente", value: "Preservado por confidencialidade" },
          { label: "Demanda", value: "Estruturação de franquia" },
          { label: "Escopo", value: "Societário · Tributário" },
        ]}
        steps={[
          { img: slideCapa,         alt: "Car Wash I — capa do projeto",                              cap: "01 · Capa" },
          { img: slideFranqueador,  alt: "Como ser um franqueador",                                   cap: "02 · Franqueador" },
          { img: slideCof,          alt: "Circular de Oferta de Franquia: o que é e para que serve",  cap: "03 · COF" },
          { img: slideModelos,      alt: "Comparação entre revenda e intermediação de insumos",       cap: "04 · Modelos" },
          { img: slideRecomendacao, alt: "Comparação e recomendação: novo CNPJ x alteração da atividade", cap: "05 · Recomendação" },
        ]}
      />
    </CaseLayout>
  );
}
