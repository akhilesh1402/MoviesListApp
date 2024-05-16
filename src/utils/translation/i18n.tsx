import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnglish from './languages/english.json';
import translationArabic from './languages/arabic.json';
import store from "../../store/store";

const resources = {
    en: {
        translation: translationEnglish
    },
    ab: {
        translation: translationArabic
    }
}

const currentLang = store.getState().language.selectedLanguage;

i18next
    .use(initReactI18next)
    .init({
        lng: currentLang,
        compatibilityJSON: 'v3',
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18next;