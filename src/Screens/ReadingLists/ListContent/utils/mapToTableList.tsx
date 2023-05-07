/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-negated-condition */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import dayjs from "dayjs";
import config from "Config";
import { findReadingDoc, getReadingDocPath } from "Feature/Library/ReadingListDrawer/utils/readingDocUtils";
import { type RowActionIcon } from "Feature/Table/TableBody/BodyContent/DataRow/RowActionsList/@types";
import { type BaseNote } from "Models/Note/@types";
import { type ReadingListItem } from "Models/ReadingList/@types";
import { type ReadingListTableRow } from "Screens/ReadingLists/ListContent/@types";
import ReadingDocIcon from "Screens/ReadingLists/ListContent/ReadingDocIcon";
import { NOTE_SLUG } from "Screens/ReadingLists/ListNavigation/constants";
import {
    type ReadingActionIcon,
} from "Screens/ReadingLists/readingListDocMapping";

const BASE_URL: string = config.get("BASE_URL");

const getReadingDocName = (docType: string) => {
    const doc = findReadingDoc("docType", docType);
    return doc?.docName ?? "";
};

const mapToTableActionsList = (actionList: ReadingActionIcon[]) => actionList.map((icon: ReadingActionIcon) => ({
    actionId: icon,
    icon,
    actionType: icon === "link" ? "ExternalLink" : "Button",
} as RowActionIcon));

const getReadingDocActions = (docType: string) => {
    const doc = findReadingDoc("docType", docType);
    return mapToTableActionsList(doc?.actionList ?? []);
};

export const mapToTableReadingList = (
    list: ReadingListItem[] | BaseNote[],
    id: string
) => {
    let mappedList: ReadingListTableRow[] = [];
    if (id !== NOTE_SLUG) {
        mappedList = list.map((element) => {
            element = element as ReadingListItem;
            const { docType } = element;
            const link = getReadingDocPath(element);
            const dateStringFormat = dayjs(element.created).format(
                "D MMM YYYY"
            );
            const docName = getReadingDocName(docType);
            const readingDocIcon = (
                <ReadingDocIcon docName={docName} docType={docType} />
            );
            const readingDocActions = getReadingDocActions(docType);
            return {
                rowId: element.id,
                row: {
                    docMetaData: {
                        elementValue: {
                            title:
                                element.document.header ??
                                element.document.title,
                            link,
                        },
                        columnType: "Link",
                    },
                    docIcon: {
                        elementValue: readingDocIcon,
                        elementProperties: {
                            docType,
                        },
                        columnType: "ReactNode",
                    },
                    dateAdded: {
                        elementValue: dateStringFormat,
                        elementProperties: {
                            isoDate: element.created,
                        },
                    },
                    docActionsList: {
                        elementValue: readingDocActions,
                        elementProperties: {
                            externalLink: element.document?.pdfURL ?? BASE_URL,
                            docType,
                            title:
                                element.document.header ??
                                element.document.title,
                            docId: element.docId,
                        },
                        columnType: "ActionList",
                    },
                },
            };
        });
    } else {
        const docType = "Note";
        mappedList = list.map((element) => {
            element = element as BaseNote;
            const readingDocIcon = (
                <ReadingDocIcon docName={"Note"} docType={docType} />
            );
            const readingDocActions = getReadingDocActions(docType);
            return {
                rowId: element.id,
                row: {
                    docMetaData: {
                        elementValue: {
                            title: element.title,
                            link: `/lectures/${element.id}?type=Note`,
                        },
                        columnType: "Link",
                    },
                    docIcon: {
                        elementValue: readingDocIcon,
                        columnType: "ReactNode",
                        elementProperties: {
                            docType,
                        },
                    },
                    dateAdded: {
                        elementValue: "",
                    },
                    docActionsList: {
                        elementValue: readingDocActions,
                        columnType: "ActionList",
                        elementProperties: {
                            docType,
                            title: element.title,
                            docId: element.id,
                        },
                    },
                },
            };
        });
    }

    return mappedList;
};
