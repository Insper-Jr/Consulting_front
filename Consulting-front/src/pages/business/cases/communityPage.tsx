import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";
import Rich, { useRichList } from "../../../i18n/rich";

import slideMercado        from "../../../assets/business/community/01-mercado-global.jpg";
import slideBenchmarks     from "../../../assets/business/community/02-benchmarks.jpg";
import slidePosicionamento from "../../../assets/business/community/03-posicionamento.jpg";
import shotPrecificacao    from "../../../assets/business/community/04-precificacao.jpg";
import shotFunil           from "../../../assets/business/community/05-funil.jpg";
import shotRoi             from "../../../assets/business/community/06-roi-b2b.jpg";
import shotKeywords        from "../../../assets/business/community/07-keywords.jpg";

/* Textos em pt.ts / en.ts sob business.cases.community */
const C = "business.cases.community";

export default function CommunityPage() {
  const { t } = useTranslation();
  const list = useRichList();

  const slides: CaseSlide[] = [
    { id: "mercado",        img: slideMercado,        alt: t(`${C}.slides.mercado.alt`),        cap: t(`${C}.slides.mercado.cap`) },
    { id: "benchmarks",     img: slideBenchmarks,     alt: t(`${C}.slides.benchmarks.alt`),     cap: t(`${C}.slides.benchmarks.cap`) },
    { id: "posicionamento", img: slidePosicionamento, alt: t(`${C}.slides.posicionamento.alt`), cap: t(`${C}.slides.posicionamento.cap`) },
  ];

  const shots: CaseShot[] = [
    { id: "preco",    label: t(`${C}.shots.preco.label`),    bar: "plano-de-marketing · precificacao-b2b",  img: shotPrecificacao, alt: t(`${C}.shots.preco.alt`),    capH: t(`${C}.shots.preco.capH`),    capT: t(`${C}.shots.preco.capT`) },
    { id: "funil",    label: t(`${C}.shots.funil.label`),    bar: "plano-de-marketing · funil-de-conteudo", img: shotFunil,        alt: t(`${C}.shots.funil.alt`),    capH: t(`${C}.shots.funil.capH`),    capT: t(`${C}.shots.funil.capT`) },
    { id: "roi",      label: t(`${C}.shots.roi.label`),      bar: "plano-de-marketing · roi-do-b2b",        img: shotRoi,          alt: t(`${C}.shots.roi.alt`),      capH: t(`${C}.shots.roi.capH`),      capT: t(`${C}.shots.roi.capT`) },
    { id: "keywords", label: t(`${C}.shots.keywords.label`), bar: "plano-de-marketing · midia-paga",        img: shotKeywords,     alt: t(`${C}.shots.keywords.alt`), capH: t(`${C}.shots.keywords.capH`), capT: t(`${C}.shots.keywords.capT`) },
  ];

  return (
    <CaseLayout>
      <CaseView
        id="case-community"
        name={t(`${C}.name`)}
        sub={<><Rich k={`${C}.sub`} /> {t("business.cases.confidential")}</>}
        eyebrow={t(`${C}.eyebrow`)}
        headline={t(`${C}.headline`)}
        intro={list(`${C}.intro`)}
        sections={[
          { title: t(`${C}.method.title`),       body: list(`${C}.method.body`) },
          { title: t(`${C}.plan.title`),         body: list(`${C}.plan.body`) },
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
