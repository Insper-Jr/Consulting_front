import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa      from "../../../assets/direito/alicerce/slide-01-capa.png";
import slideContexto  from "../../../assets/direito/alicerce/slide-02-contexto.png";
import slideAnexo     from "../../../assets/direito/alicerce/slide-03-anexo.png";
import slideTabela    from "../../../assets/direito/alicerce/slide-04-tabela.png";
import slideConclusao from "../../../assets/direito/alicerce/slide-05-conclusao.png";

export default function AlicercePage() {
  return (
    <CaseLayout>
      <LawCase
        id="case-alicerce"
        badge="CASE EM DESTAQUE"
        bigName={<>Alicerce I</>}
        sub={
          <>
            O <strong>Alicerce I</strong> foi um projeto de <strong>elaboração contratual do zero</strong> conduzido pela frente de Direito da Insper Jr., que estruturou <strong>dois contratos completos</strong> — prestação de serviços e fornecimento — para uma empresa que operava com modelos genéricos e pouco aderentes à sua realidade. Por confidencialidade, a identidade e o setor de atuação do cliente são preservados.
          </>
        }
        intro={{
          eyebrow: "O projeto",
          headline: <>Por que Alicerce?</>,
          paragraphs: [
            <>
              O cliente contrata <strong>fornecedores e prestadores de serviço de forma recorrente</strong> e dependia de uma estrutura contratual eficiente para dar organização, previsibilidade e segurança a essas relações. Na prática, porém, usava <strong>contratos genéricos, sem padronização</strong> e com <strong>mecanismos frágeis de cobrança e responsabilização</strong>.
            </>,
            <>
              O objetivo foi <strong>desenvolver contratos personalizados</strong> — de prestação de serviços e de fornecimento — capazes de trazer clareza às obrigações, fortalecer a responsabilização e melhorar a gestão dos fornecedores, sem depender de uma equipe jurídica interna a cada nova contratação.
            </>,
          ],
          subhead: "Estratégia",
          list: [
            <><strong>Análise dos documentos atuais</strong> — leitura dos contratos em uso e alinhamentos com a empresa para identificar lacunas, riscos e oportunidades de melhoria.</>,
            <><strong>Contrato fixo + anexo variável</strong> — cláusulas gerais estáveis e uma <strong>Tabela de Especificações (Anexo I)</strong> preenchida a cada contratação, com a mesma validade jurídica do contrato principal.</>,
            <><strong>Cláusulas de proteção</strong> — objeto, prazo, obrigações das partes, aceite, pagamento, multas, garantias, rescisão e regras de subcontratação.</>,
            <><strong>Modelo replicável</strong> — estrutura desenhada para ser reaproveitada nas contratações seguintes, concentrando alterações apenas nas variáveis.</>,
          ],
        }}
        meta={[
          { label: "Cliente", value: "Preservado por confidencialidade" },
          { label: "Contexto", value: "Contratos genéricos e sem padronização" },
          { label: "Escopo", value: "Contratos" },
        ]}
        steps={[
          { img: slideCapa,      alt: "Alicerce I — elaboração contratual",                      cap: "01 · Capa" },
          { img: slideContexto,  alt: "Contexto: contratos genéricos e sem padronização",        cap: "02 · Contexto" },
          { img: slideAnexo,     alt: "O anexo do contrato: escopo, prazos e entregas",          cap: "03 · Anexo" },
          { img: slideTabela,    alt: "Tabela de especificações do contrato de prestação de serviços", cap: "04 · Tabela" },
          { img: slideConclusao, alt: "Conclusão: entregas e importância dos contratos",         cap: "05 · Conclusão" },
        ]}
      />
    </CaseLayout>
  );
}
