/* eslint-disable @typescript-eslint/naming-convention */
import { type HtmlEntity } from "Models/Tabs/@types";

export type MenuDocType = "rome_statute_commentary" | "rpe_commentary";

export interface CliccItem extends HtmlEntity {
    author: string;
    bodytext_ar?: string;
    bodytext_fr?: string;
    bodytext_en?: string;
    bodytext_fa?: string;
    footnotes_ar?: string;
    footnotes_fr?: string;
    footnotes_en?: string;
    footnotes_fa?: string;
    header_ar?: string;
    header_fr?: string;
    header_en?: string;
    header_fa?: string;
    language: string;
    menu_doc_type: MenuDocType;
    children?: string[];
    contentChildren?: string[];
}

export interface CommentarySearchListItem {
    results: Array<Pick<CliccItem, "header" | "id" | "item_slug">>;
    total: number;
}
