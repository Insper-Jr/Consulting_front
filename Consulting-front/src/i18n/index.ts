import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./pt";
import en from "./en";
import { sharedTranslations } from "./pages/shared";
import { escoposTranslations } from "./pages/escopos";
import { aboutJoinTranslations } from "./pages/aboutJoin";
import { contactAlumniTranslations } from "./pages/contactAlumni";
import { processosHomeTranslations } from "./pages/processosHome";
import { techTranslations } from "./pages/tech";
import { direitoTranslations } from "./pages/direito";
import { businessTranslations } from "./pages/business";

const pageFragments = [
  sharedTranslations,
  escoposTranslations,
  aboutJoinTranslations,
  contactAlumniTranslations,
  processosHomeTranslations,
  techTranslations,
  direitoTranslations,
  businessTranslations,
];

const ptResources = pageFragments.reduce(
  (acc, fragment) => ({ ...acc, ...fragment.pt }),
  pt
);
const enResources = pageFragments.reduce(
  (acc, fragment) => ({ ...acc, ...fragment.en }),
  en
);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptResources },
      en: { translation: enResources },
    },
    lng: "pt",
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
  });

export default i18n;
