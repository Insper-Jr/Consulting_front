import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa         from "../../../assets/direito/car-wash/slide-01-capa.jpg";
import slideFranqueador  from "../../../assets/direito/car-wash/slide-02-franqueador.jpg";
import slideCof          from "../../../assets/direito/car-wash/slide-03-cof.png";
import slideModelos      from "../../../assets/direito/car-wash/slide-04-modelos.png";
import slideRecomendacao from "../../../assets/direito/car-wash/slide-05-recomendacao.png";

type MetaItem = { label: string; value: string };
type StepText = { alt: string; cap: string };

export default function CarWashPage() {
  const { t } = useTranslation();

  const paragraphs = t("direito.caseStudies.carWash.paragraphs", { returnObjects: true }) as string[];
  const list = t("direito.caseStudies.carWash.list", { returnObjects: true }) as string[];
  const meta = t("direito.caseStudies.carWash.meta", { returnObjects: true }) as MetaItem[];
  const stepsText = t("direito.caseStudies.carWash.steps", { returnObjects: true }) as StepText[];
  const stepImages = [slideCapa, slideFranqueador, slideCof, slideModelos, slideRecomendacao];

  return (
    <CaseLayout>
      <LawCase
        id="case-car-wash"
        badge={t("direito.caseStudies.carWash.badge")}
        bigName={t("direito.caseStudies.carWash.bigName")}
        sub={t("direito.caseStudies.carWash.sub")}
        intro={{
          eyebrow: t("direito.caseCommon.projectLabel"),
          headline: t("direito.caseStudies.carWash.headline"),
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
