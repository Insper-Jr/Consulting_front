import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";

import slideDiagnostico  from "../../../assets/business/quimica/01-diagnostico.jpg";
import slideMacroetapas  from "../../../assets/business/quimica/02-macroetapas.jpg";
import slidePlanoAcao    from "../../../assets/business/quimica/07-plano-acao.jpg";
import shotIshikawaCom   from "../../../assets/business/quimica/03-ishikawa-comercial.jpg";
import shotGargaloLeads  from "../../../assets/business/quimica/04-gargalo-leads.jpg";
import shotSolucao       from "../../../assets/business/quimica/05-solucao-pricing.jpg";
import shotIshikawaLog   from "../../../assets/business/quimica/06-ishikawa-logistica.jpg";

const SLIDES: CaseSlide[] = [
  { id: "diagnostico", img: slideDiagnostico, alt: "Diagnóstico da jornada do cliente por triangulação de fontes", cap: "01 · Diagnóstico" },
  { id: "macroetapas", img: slideMacroetapas, alt: "Mapeamento da operação em macroetapas",                        cap: "02 · Jornada" },
  { id: "plano",       img: slidePlanoAcao,   alt: "Plano de ação final em três horizontes",                       cap: "03 · Plano de ação" },
];

const SHOTS: CaseShot[] = [
  { id: "ishikawa-com", label: "Comercial", bar: "diagnostico · ishikawa-comercial",  img: shotIshikawaCom,  alt: "Diagrama de Ishikawa da área comercial",     capH: "Causa-raiz comercial", capT: "por que a promessa não se cumpre" },
  { id: "leads",        label: "Leads",     bar: "gargalo · filtro-de-leads",         img: shotGargaloLeads, alt: "Gargalo de ausência de filtro estruturado de leads", capH: "Filtro de leads",  capT: "entrada sem qualificação" },
  { id: "pricing",      label: "Pricing",   bar: "solucao · automacao-de-pricing",    img: shotSolucao,      alt: "Solução de automação do fluxo de pricing",   capH: "Automação de pricing", capT: "integração e fim do Excel paralelo" },
  { id: "ishikawa-log", label: "Logística", bar: "diagnostico · ishikawa-logistica",  img: shotIshikawaLog,  alt: "Diagrama de Ishikawa da logística",          capH: "Causa-raiz logística", capT: "atrasos, avarias e transportadoras" },
];

export default function QuimicaPage() {
  return (
    <CaseLayout>
      <CaseView
        id="case-quimica"
        name="Projeto Química"
        sub={
          <>
            Para mostrar como funciona o escopo de <strong>Plano Operacional</strong>: o
            diagnóstico da jornada do cliente em uma <strong>distribuidora industrial B2B</strong>,
            do primeiro contato comercial ao pós-venda, achando onde o pedido trava e o
            retrabalho nasce.
            O nome do projeto é fictício, para preservar a confidencialidade do cliente.
          </>
        }
        eyebrow="O projeto"
        headline="O pedido passava por cinco áreas e três sistemas que não conversavam"
        intro={[
          <>
            A operação era fragmentada: vendedor sem visão do estoque comprometido, pricing feito
            à mão em planilha, particularidades do cliente registradas de forma inconsistente e
            informação duplicada entre sistemas. O resultado aparecia no fim da linha:{" "}
            <strong>pedido incorreto, retrabalho e promessa não cumprida</strong>.
          </>,
        ]}
        sections={[
          {
            title: "Como foi feito",
            body: [
              <>
                O diagnóstico foi construído por <strong>triangulação de três fontes</strong>:
                entrevistas presenciais em profundidade com as áreas, formulário próprio aplicado
                aos operadores do dia a dia e a base de não conformidades da própria operação.
                Só entrou no relatório o ponto de fricção validado por <strong>pelo menos duas
                fontes</strong>.
              </>,
              <>
                Com o material em mãos, mapeamos a jornada do pedido em{" "}
                <strong>cinco macroetapas</strong> (contato inicial, cotação, administrativo de
                vendas, logística e melhoria contínua) e rodamos{" "}
                <strong>diagrama de Ishikawa</strong> em cada uma para separar sintoma de
                causa-raiz.
              </>,
            ],
          },
          {
            title: "Das causas às soluções",
            body: [
              <>
                Cada gargalo recebeu uma solução dimensionada: formulário estruturado de
                particularidades como <em>gate</em> obrigatório, automação do fluxo de pricing com
                integração ao ERP, auditoria e SLA por transportadora e agente de IA para
                classificar e direcionar não conformidades.
              </>,
            ],
          },
          {
            title: "Entregas",
            list: [
              <><strong>Mapeamento AS-IS</strong> da jornada do pedido em cinco macroetapas.</>,
              <><strong>Diagramas de Ishikawa</strong> por área, separando sintoma de causa-raiz.</>,
              <><strong>Gargalos priorizados</strong> com impacto operacional descrito e evidência.</>,
              <><strong>Soluções dimensionadas</strong> por gargalo, com ferramenta e responsável.</>,
              <><strong>Plano de ação em três horizontes</strong>: 0 a 3, 3 a 6 e 6 a 12 meses.</>,
              <><strong>Blueprint da operação</strong> como base para a plataforma integrada futura.</>,
            ],
          },
        ]}
        closing="Operação mapeada · causa-raiz isolada · plano de ação com horizonte e dono."
        slides={SLIDES}
        shots={SHOTS}
        shotsHeadline={<>Da causa-raiz <em>à solução.</em></>}
      />
    </CaseLayout>
  );
}
