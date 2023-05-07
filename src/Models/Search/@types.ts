/* eslint-disable @typescript-eslint/naming-convention */
export interface SearchResultItem {
    item_slug: string;
    id: string;
    doc_type: string;
    menuItemId: string[];
    metadata: VideoMetaData | PdfMetaData[];
    title: string;
    header?: string;
    bodytext?: string;
}
export interface Search {
    results: SearchResultItem[];
    total: number;
}

export interface PdfMetaData {
    name: string;
    val: string;
}

export type VideoMetaData = Record<string, string>;