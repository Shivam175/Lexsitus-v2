import { getCurrentDate } from "Feature/Library/Tabs/utils";
import { type DigestSection } from "Models/Tabs/@types";

export const getHtmlString = (sections?: DigestSection[]) => {
    let string = "";
    sections?.forEach((section) => {
        string += `<h1>${section.header}</h1> ${section.bodytext}`;
    });

    return string;
};

export const getCitationText = (currUrl: string) => {
    const text = `Morten Bergsmo et al. (eds.), Elements Digest, Lexsitus, at ${currUrl} ( accessed on ${getCurrentDate()})`;
    return text;
};
