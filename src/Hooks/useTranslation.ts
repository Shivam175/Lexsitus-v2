import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { useEffect } from "react";
import { useTranslation, initReactI18next } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { langValue } from "constants/language";


void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        fallbackLng: "en",
        detection: {
            order: [
                "querystring",
                "cookie",
                "localStorage",
                "sessionStorage",
                "navigator",
                "htmlTag",
                "path",
                "subdomain",
            ],
            caches: ["localStorage", "cookie"],
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },

        react: { useSuspense: false },
    });



export const useSetupTranslation = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { language, changeLanguage  } = i18n;

    const setCurrentLanguage = async (lang: string) => {
        await changeLanguage(lang);
    };
    
    const { translation } = useParams<{ translation: string }>();
   

    useEffect(() => {
        if (translation && langValue.includes(translation)) {
            void setCurrentLanguage(translation);
        } else {
            navigate("/en");
            void setCurrentLanguage("en");
        }
        
        
    }, [translation]);

    const languageSetup = {
        currentLanguage: language,
        setCurrentLanguage,
    };

    return languageSetup;
};


export const useCurrentLanguage = () => {
    const { i18n } = useTranslation();
    const { language } = i18n;
    return { language };
};
