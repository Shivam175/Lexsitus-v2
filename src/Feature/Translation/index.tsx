import { type FC } from "react";
import { useTranslation } from "react-i18next";

export interface TranslateProps {
    keyLang: string;
}

const Translate: FC<TranslateProps> = ({ keyLang }) => {
    const { t } = useTranslation();

    return <>{t(`${keyLang}`)}</>;
};

export default Translate;
