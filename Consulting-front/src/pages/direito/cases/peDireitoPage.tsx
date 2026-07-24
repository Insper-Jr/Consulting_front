import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa       from "../../../assets/direito/pe-direito/slide-03.png";
import slideContexto   from "../../../assets/direito/pe-direito/slide-04.png";
import slideDesafios   from "../../../assets/direito/pe-direito/slide-05.png";
import slideEntregavel from "../../../assets/direito/pe-direito/slide-06.png";

type MetaItem = { label: string; value: string };
type StepText = { alt: string; cap: string };

export default function PeDireitoPage() {
  const { t } = useTranslation();

  const paragraphs = t("direito.caseStudies.peDireito.paragraphs", { returnObjects: true }) as string[];
  const list = t("direito.caseStudies.peDireito.list", { returnObjects: true }) as string[];
  const meta = t("direito.caseStudies.peDireito.meta", { returnObjects: true }) as MetaItem[];
  const stepsText = t("direito.caseStudies.peDireito.steps", { returnObjects: true }) as StepText[];
  const stepImages = [slideCapa, slideContexto, slideDesafios, slideEntregavel];

  return (
    <CaseLayout>
      <LawCase
        id="case-pe-direito"
        badge={t("direito.caseStudies.peDireito.badge")}
        bigName={t("direito.caseStudies.peDireito.bigName")}
        sub={t("direito.caseStudies.peDireito.sub")}
        intro={{
          eyebrow: t("direito.caseCommon.projectLabel"),
          headline: t("direito.caseStudies.peDireito.headline"),
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
