import { type DocumentType } from "Models/ReadingList/@types";

export type RowActionType = "Button" | "Link" | "ExternalLink";

export interface RowActionIcon {
    actionId: string;
    icon: string;
    actionType: RowActionType;
}

export interface ActionHandlerArgs {
    actionKey: string;
    docId: string;
    title: string;
    listItemId?: string;
    listId?: string;
    docType?: DocumentType;
}