import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
// import ar from "./locales/ar.json";
import fr from "./locales/fr.json";

const LangeParDefaut = localStorage.getItem("languegChanger");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: LangeParDefaut || "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
