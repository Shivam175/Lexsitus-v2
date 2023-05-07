import { generatePath } from "react-router-dom";

export const urlPathGenerator = (lang: string, path?: string) => {
    if (!path) {
        return lang;
    }

    const url = `/${lang}/${path}`;
    return url;
};


export const generatePathUrl = (pathString: string, params = {}) => generatePath(pathString, params);
