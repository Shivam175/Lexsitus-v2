import { useEffect, useState } from "react";
import TabModel from "Models/Tabs";
import { logger } from "utils/logger";

export const useIntroHtmlString = (language: string, path: string) => {
    const [introHtmlString, setIntroHtmlString] = useState<string>("");

    const getString = async () => {
        const htmlString = await TabModel.getIntroHtml(language, path);
        setIntroHtmlString(htmlString);
    };

    useEffect(() => {
        getString().catch((err: unknown) => {
            logger.error(err);
        });
    }, [language]);

    return {
        introHtmlString,
    };
};
