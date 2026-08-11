import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa       from "../../../assets/direito/print/slide-15.png";
import slideContexto   from "../../../assets/direito/print/slide-16.png";
import slideDesafios   from "../../../assets/direito/print/slide-17.png";
import slideEntregavel from "../../../assets/direito/print/slide-18.png";

type MetaItem = { label: string; value: string };
type StepText = { alt: string; cap: string };

export default function PrintPage() {
  const { t } = useTranslation();

  const paragraphs = t("direito.caseStudies.print.paragraphs", { returnObjects: true }) as string[];
  const list = t("direito.caseStudies.print.list", { returnObjects: true }) as string[];
  const meta = t("direito.caseStudies.print.meta", { returnObjects: true }) as MetaItem[];
  const stepsText = t("direito.caseStudies.print.steps", { returnObjects: true }) as StepText[];
  const stepImages = [slideCapa, slideContexto, slideDesafios, slideEntregavel];

  return (
    <CaseLayout>
      <LawCase
        id="case-print"
        badge={t("direito.caseStudies.print.badge")}
        bigName={t("direito.caseStudies.print.bigName")}
        sub={t("direito.caseStudies.print.sub")}
        intro={{
          eyebrow: t("direito.caseCommon.projectLabel"),
          headline: t("direito.caseStudies.print.headline"),
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
