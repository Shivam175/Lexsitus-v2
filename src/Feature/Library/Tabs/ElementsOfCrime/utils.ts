export const getHtmlString = (footnotes?: string, bodytext?: string) => {
    if (!footnotes) return `${bodytext ?? ""} <hr></hr>`;

    return `${bodytext ?? ""} <hr></hr> ${footnotes}`;
};

export const getCitationText = (title?: string) => {
    const text = `International Criminal Court, Elements of Crimes, 11.06.2010, ${
        title ?? ""
    } (http://www.legal-tools.org/doc/3c0e2d)`;
    return text;
};
