import { useLocation, generatePath } from "react-router-dom";

export const generatePathUrl = (pathString: string, params = {}) => generatePath(pathString, params);
export const changePathLanguage = (path: string, language = "en") => {
    const pathSplit = path.split("/");
    pathSplit[1] = language;
    return pathSplit.join("/");
};

export const useLocationPath = () => {
    const location = useLocation();
    const path = location.pathname;
    return {
        generatePathUrl,
        changePathLanguage : (language: string) => changePathLanguage(path, language),
    };
};