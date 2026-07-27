import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";
import Rich, { useRichList } from "../../../i18n/rich";

import slideDiagnostico  from "../../../assets/business/quimica/01-diagnostico.jpg";
import slideMacroetapas  from "../../../assets/business/quimica/02-macroetapas.jpg";
import slidePlanoAcao    from "../../../assets/business/quimica/07-plano-acao.jpg";
import shotIshikawaCom   from "../../../assets/business/quimica/03-ishikawa-comercial.jpg";
import shotGargaloLeads  from "../../../assets/business/quimica/04-gargalo-leads.jpg";
import shotSolucao       from "../../../assets/business/quimica/05-solucao-pricing.jpg";
import shotIshikawaLog   from "../../../assets/business/quimica/06-ishikawa-logistica.jpg";

/* Textos em pt.ts / en.ts sob business.cases.quimica */
const C = "business.cases.quimica";

export default function QuimicaPage() {
  const { t } = useTranslation();
  const list = useRichList();

  const slides: CaseSlide[] = [
    { id: "diagnostico", img: slideDiagnostico, alt: t(`${C}.slides.diagnostico.alt`), cap: t(`${C}.slides.diagnostico.cap`) },
    { id: "macroetapas", img: slideMacroetapas, alt: t(`${C}.slides.macroetapas.alt`), cap: t(`${C}.slides.macroetapas.cap`) },
    { id: "plano",       img: slidePlanoAcao,   alt: t(`${C}.slides.plano.alt`),       cap: t(`${C}.slides.plano.cap`) },
  ];

  const shots: CaseShot[] = [
    { id: "ishikawa-com", label: t(`${C}.shots.ishikawaCom.label`), bar: "diagnostico · ishikawa-comercial", img: shotIshikawaCom,  alt: t(`${C}.shots.ishikawaCom.alt`), capH: t(`${C}.shots.ishikawaCom.capH`), capT: t(`${C}.shots.ishikawaCom.capT`) },
    { id: "leads",        label: t(`${C}.shots.leads.label`),       bar: "gargalo · filtro-de-leads",        img: shotGargaloLeads, alt: t(`${C}.shots.leads.alt`),       capH: t(`${C}.shots.leads.capH`),      capT: t(`${C}.shots.leads.capT`) },
    { id: "pricing",      label: t(`${C}.shots.pricing.label`),     bar: "solucao · automacao-de-pricing",   img: shotSolucao,      alt: t(`${C}.shots.pricing.alt`),     capH: t(`${C}.shots.pricing.capH`),    capT: t(`${C}.shots.pricing.capT`) },
    { id: "ishikawa-log", label: t(`${C}.shots.ishikawaLog.label`), bar: "diagnostico · ishikawa-logistica", img: shotIshikawaLog,  alt: t(`${C}.shots.ishikawaLog.alt`), capH: t(`${C}.shots.ishikawaLog.capH`), capT: t(`${C}.shots.ishikawaLog.capT`) },
  ];

  return (
    <CaseLayout>
      <CaseView
        id="case-quimica"
        name={t(`${C}.name`)}
        sub={<><Rich k={`${C}.sub`} /> {t("business.cases.confidential")}</>}
        eyebrow={t(`${C}.eyebrow`)}
        headline={t(`${C}.headline`)}
        intro={list(`${C}.intro`)}
        sections={[
          { title: t(`${C}.method.title`),       body: list(`${C}.method.body`) },
          { title: t(`${C}.solutions.title`),    body: list(`${C}.solutions.body`) },
          { title: t(`${C}.deliverables.title`), list: list(`${C}.deliverables.list`) },
        ]}
        closing={t(`${C}.closing`)}
        slides={slides}
        shots={shots}
        shotsHeadline={<>{t(`${C}.shotsHeadlineMain`)} <em>{t(`${C}.shotsHeadlineAccent`)}</em></>}
      />
    </CaseLayout>
  );
}
