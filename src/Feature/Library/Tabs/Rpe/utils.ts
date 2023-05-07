/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { getCurrentDate } from "Feature/Library/Tabs/utils";
import { type CliccItem } from "Models/Tabs/Clicc/@types";


export const getHtmlString = (
    language: string,
    data: CliccItem | undefined
) => {
    if (!data) return "";

    const {
        header_ar,
        header_fa,
        footnotes,
        footnotes_ar,
        footnotes_en,
        footnotes_fa,
        footnotes_fr,
        bodytext,
        bodytext_ar,
        bodytext_en,
        bodytext_fa,
        bodytext_fr,
        header,
    } = data;

    switch (language) {
        case "en":
            if (bodytext_en && footnotes_en)
                if (bodytext_en && footnotes_en)
                    return `${bodytext_en} <hr></hr> ${footnotes_en}`;
            if (bodytext_en && !footnotes_en && footnotes)
                return `${bodytext_en} <hr></hr> ${footnotes}`;
            if (!bodytext_fr && footnotes)
                return `${bodytext} <hr></hr> ${footnotes}`;
            return `${bodytext} <hr></hr>`;

        case "fr":
            if (bodytext_fr && footnotes_fr)
                return `${bodytext_fr} <hr></hr> ${footnotes_fr}`;
            if (bodytext_fr && !footnotes_fr && footnotes)
                return `${bodytext_fr} <hr></hr> ${footnotes}`;
            if (!bodytext_fr && footnotes)
                return `${bodytext} <hr></hr> ${footnotes}`;
            return `${bodytext} <hr></hr>`;

        case "ar":
            if (bodytext_ar && footnotes_ar && header_ar)
                return `${header_ar} ${bodytext_ar} <hr></hr> ${footnotes_ar}`;
            if (!bodytext_ar && !footnotes_ar && footnotes && header)
                return `${header} ${bodytext} <hr></hr> ${footnotes}`;
            if (bodytext_ar && !footnotes) return `${bodytext_ar} <hr><hr/>`;

            if (!footnotes) return `${bodytext} <hr></hr>`;

            return `${bodytext} <hr></hr> ${footnotes}`;
        case "fa":
            if (bodytext_fa && footnotes_fa && header_fa)
                return `${header_fa} ${bodytext_fa} <hr></hr> ${footnotes_fa}`;
            if (!bodytext_fa && !footnotes_fa && footnotes && header)
                return `${header} ${bodytext} <hr></hr> ${footnotes}`;
            if (bodytext_fa && !footnotes) return `${bodytext_fa} <hr><hr/>`;

            if (!footnotes) return `${bodytext} <hr></hr>`;

            return `${bodytext} <hr></hr> ${footnotes}`;
        default:
            return `${bodytext} <hr></hr>`;
    }
};

export const getCitationText = (
    currUrl: string,
    author?: string,
    header?: string
) => {
    const text = `${author ?? ""}, "${
        header ?? ""
    }", Mark Klamberg, Jonas Nilsson and Antonio Angotti (eds.), Commentary on the Law of the International Criminal Court - Rules of Procedure and Evidence, Lexsitus available at ${currUrl}, last accessed at ${getCurrentDate()}`;
    return text;
};
