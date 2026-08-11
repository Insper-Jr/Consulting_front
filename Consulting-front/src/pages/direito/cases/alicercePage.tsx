import { useTranslation } from "react-i18next";
import CaseLayout from "./caseLayout";
import LawCase from "../components/lawCase";

import slideCapa      from "../../../assets/direito/alicerce/slide-01-capa.png";
import slideContexto  from "../../../assets/direito/alicerce/slide-02-contexto.png";
import slideAnexo     from "../../../assets/direito/alicerce/slide-03-anexo.png";
import slideTabela    from "../../../assets/direito/alicerce/slide-04-tabela.png";
import slideConclusao from "../../../assets/direito/alicerce/slide-05-conclusao.png";

type MetaItem = { label: string; value: string };
type StepText = { alt: string; cap: string };

export default function AlicercePage() {
  const { t } = useTranslation();

  const paragraphs = t("direito.caseStudies.alicerce.paragraphs", { returnObjects: true }) as string[];
  const list = t("direito.caseStudies.alicerce.list", { returnObjects: true }) as string[];
  const meta = t("direito.caseStudies.alicerce.meta", { returnObjects: true }) as MetaItem[];
  const stepsText = t("direito.caseStudies.alicerce.steps", { returnObjects: true }) as StepText[];
  const stepImages = [slideCapa, slideContexto, slideAnexo, slideTabela, slideConclusao];

  return (
    <CaseLayout>
      <LawCase
        id="case-alicerce"
        badge={t("direito.caseStudies.alicerce.badge")}
        bigName={t("direito.caseStudies.alicerce.bigName")}
        sub={t("direito.caseStudies.alicerce.sub")}
        intro={{
          eyebrow: t("direito.caseCommon.projectLabel"),
          headline: t("direito.caseStudies.alicerce.headline"),
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
