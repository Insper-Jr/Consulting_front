import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa       from "../../../assets/direito/society/slide-07.png";
import slideContexto   from "../../../assets/direito/society/slide-08.png";
import slideDesafios   from "../../../assets/direito/society/slide-09.png";
import slideEntregavel from "../../../assets/direito/society/slide-10.png";

type MetaItem = { label: string; value: string };
type StepText = { alt: string; cap: string };

export default function SocietyPage() {
  const { t } = useTranslation();

  const paragraphs = t("direito.caseStudies.society.paragraphs", { returnObjects: true }) as string[];
  const list = t("direito.caseStudies.society.list", { returnObjects: true }) as string[];
  const meta = t("direito.caseStudies.society.meta", { returnObjects: true }) as MetaItem[];
  const stepsText = t("direito.caseStudies.society.steps", { returnObjects: true }) as StepText[];
  const stepImages = [slideCapa, slideContexto, slideDesafios, slideEntregavel];

  return (
    <CaseLayout>
      <LawCase
        id="case-society"
        badge={t("direito.caseStudies.society.badge")}
        bigName={t("direito.caseStudies.society.bigName")}
        sub={t("direito.caseStudies.society.sub")}
        intro={{
          eyebrow: t("direito.caseCommon.projectLabel"),
          headline: t("direito.caseStudies.society.headline"),
          paragraphs,
          subhead: t("direito.caseCommon.strategyLabel"),
          list,
        }}
        meta={meta}
        steps={stepImages.map((img, i) => ({ img, alt: stepsText[i].alt, cap: stepsText[i].cap }))}
      />
    </CaseLayout>
  );
}
