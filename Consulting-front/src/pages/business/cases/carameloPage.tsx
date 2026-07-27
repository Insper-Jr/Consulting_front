import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import CaseView, { type CaseSlide, type CaseShot } from "../components/caseView";
import Rich, { useRichList } from "../../../i18n/rich";

import slideDelivery   from "../../../assets/business/caramelo/01-delivery.jpg";
import slidePresencial from "../../../assets/business/caramelo/03-presencial.jpg";
import slideCapex      from "../../../assets/business/caramelo/04-capex.jpg";
import shotEcommerce   from "../../../assets/business/caramelo/02-ecommerce.jpg";

/* Textos em pt.ts / en.ts sob business.cases.caramelo */
const C = "business.cases.caramelo";

export default function CarameloPage() {
  const { t } = useTranslation();
  const list = useRichList();

  const slides: CaseSlide[] = [
    { id: "delivery",   img: slideDelivery,   alt: t(`${C}.slides.delivery.alt`),   cap: t(`${C}.slides.delivery.cap`) },
    { id: "presencial", img: slidePresencial, alt: t(`${C}.slides.presencial.alt`), cap: t(`${C}.slides.presencial.cap`) },
    { id: "capex",      img: slideCapex,      alt: t(`${C}.slides.capex.alt`),      cap: t(`${C}.slides.capex.cap`) },
  ];

  const shots: CaseShot[] = [
    { id: "ecommerce", label: t(`${C}.shots.ecommerce.label`), bar: "viabilidade · comportamento-de-consumo", img: shotEcommerce, alt: t(`${C}.shots.ecommerce.alt`), capH: t(`${C}.shots.ecommerce.capH`), capT: t(`${C}.shots.ecommerce.capT`) },
  ];

  return (
    <CaseLayout>
      <CaseView
        id="case-caramelo"
        name={t(`${C}.name`)}
        sub={<><Rich k={`${C}.sub`} /> {t("business.cases.confidential")}</>}
        eyebrow={t(`${C}.eyebrow`)}
        headline={t(`${C}.headline`)}
        intro={list(`${C}.intro`)}
        sections={[
          { title: t(`${C}.method.title`),       body: list(`${C}.method.body`) },
          { title: t(`${C}.deliverables.title`), list: list(`${C}.deliverables.list`) },
          { title: t(`${C}.numbers.title`),      body: list(`${C}.numbers.body`) },
        ]}
        closing={t(`${C}.closing`)}
        slides={slides}
        shots={shots}
        shotsHeadline={<>{t(`${C}.shotsHeadlineMain`)} <em>{t(`${C}.shotsHeadlineAccent`)}</em></>}
      />
    </CaseLayout>
  );
}
