/* eslint-disable @typescript-eslint/naming-convention */
export interface PdfEntity {
    created: string;
    id: string;
    item_slug: string;
    menuItemId: string[];
    metadata: PdfMetaData[];
    pdfURL: string;
    title: string;
    updated: string;
}

export interface HtmlEntity {
    bodytext: string;
    created: string;
    footnotes: string;
    header: string;
    id: string;
    item_slug: string;
    menuItemId: string[];
}

export interface DigestEntity {
    created: string;
    edit_date: string;
    edited: boolean;
    id: string;
    item_slug: string;
    menuItemId: string[];
    sections: DigestSection[];
    title: string;
    updated: string;
}

export interface PdfMetaData {
    name: string;
    val: string;
}

export interface CasePrepDialogListItem {
    id: string;
    item_slug: string;
    title: string;
}
export interface DigestSection {
    header: string;
    bodytext: string;
}
