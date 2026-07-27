import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";
import Rich, { useRichList } from "../../../i18n/rich";

import slideContexto   from "../../../assets/business/wine/01-contexto.jpg";
import slideProblemas  from "../../../assets/business/wine/02-problemas.jpg";
import slideResultados from "../../../assets/business/wine/06-resultados.jpg";
import shotDados       from "../../../assets/business/wine/03-dados.jpg";
import shotBenchs      from "../../../assets/business/wine/04-benchs.jpg";
import shotValor       from "../../../assets/business/wine/05-valor.jpg";

/* Textos em pt.ts / en.ts sob business.cases.wine */
const C = "business.cases.wine";

export default function WinePage() {
  const { t } = useTranslation();
  const list = useRichList();

  const slides: CaseSlide[] = [
    { id: "contexto",   img: slideContexto,   alt: t(`${C}.slides.contexto.alt`),   cap: t(`${C}.slides.contexto.cap`) },
    { id: "problemas",  img: slideProblemas,  alt: t(`${C}.slides.problemas.alt`),  cap: t(`${C}.slides.problemas.cap`) },
    { id: "resultados", img: slideResultados, alt: t(`${C}.slides.resultados.alt`), cap: t(`${C}.slides.resultados.cap`) },
  ];

  const shots: CaseShot[] = [
    { id: "dados",  label: t(`${C}.shots.dados.label`),  bar: "analise-mercadologica · fontes-de-dados",  img: shotDados,  alt: t(`${C}.shots.dados.alt`),  capH: t(`${C}.shots.dados.capH`),  capT: t(`${C}.shots.dados.capT`) },
    { id: "benchs", label: t(`${C}.shots.benchs.label`), bar: "analise-mercadologica · benchmarks",       img: shotBenchs, alt: t(`${C}.shots.benchs.alt`), capH: t(`${C}.shots.benchs.capH`), capT: t(`${C}.shots.benchs.capT`) },
    { id: "valor",  label: t(`${C}.shots.valor.label`),  bar: "analise-mercadologica · geracao-de-valor", img: shotValor,  alt: t(`${C}.shots.valor.alt`),  capH: t(`${C}.shots.valor.capH`),  capT: t(`${C}.shots.valor.capT`) },
  ];

  return (
    <CaseLayout>
      <CaseView
        id="case-wine"
        name={t(`${C}.name`)}
        sub={<><Rich k={`${C}.sub`} /> {t("business.cases.confidential")}</>}
        eyebrow={t(`${C}.eyebrow`)}
        headline={t(`${C}.headline`)}
        intro={list(`${C}.intro`)}
        sections={[
          { title: t(`${C}.challenge.title`),    body: list(`${C}.challenge.body`) },
          { title: t(`${C}.method.title`),       body: list(`${C}.method.body`) },
          { title: t(`${C}.deliverables.title`), list: list(`${C}.deliverables.list`) },
          { title: t(`${C}.impact.title`),       body: list(`${C}.impact.body`) },
        ]}
        closing={t(`${C}.closing`)}
        slides={slides}
        shots={shots}
        shotsHeadline={<>{t(`${C}.shotsHeadlineMain`)} <em>{t(`${C}.shotsHeadlineAccent`)}</em></>}
      />
    </CaseLayout>
  );
}
