/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type SortOrder } from "Feature/Table/TableBody/TitleRow/@types";
import {
    type ReadingListTableColumn,
    type ReadingListTableRow,
} from "Screens/ReadingLists/ListContent/@types";
import { NOTE_SLUG } from "Screens/ReadingLists/ListNavigation/constants";

const compareText = (itemA: string, itemB: string) => {
    if (itemA < itemB) return -1;
    if (itemA > itemB) return 1;
    return 0;
};

const compareDocsByTitle = (
    itemA: ReadingListTableRow,
    itemB: ReadingListTableRow
) => {
    const firstTitle = itemA.row.docMetaData.elementValue?.title;
    const secondTitle = itemB.row.docMetaData.elementValue?.title;
    return compareText(firstTitle, secondTitle);
};

const compareDocsByType = (
    itemA: ReadingListTableRow,
    itemB: ReadingListTableRow
) => {
    const typeOfItemA = itemA.row.docIcon.elementProperties?.docType ?? "";
    const typeOfItemB = itemB.row.docIcon.elementProperties?.docType ?? "";
    return compareText(typeOfItemA, typeOfItemB);
};

const compareDocsByDate = (
    itemA: ReadingListTableRow,
    itemB: ReadingListTableRow
) =>
    (itemA.row.dateAdded.elementProperties?.isoDate ?? "").localeCompare(
        itemB.row.dateAdded.elementProperties?.isoDate ?? ""
    );

export const sortListHandler = (
    key: ReadingListTableColumn,
    order: SortOrder,
    readingList: ReadingListTableRow[],
    slug: string
) => {
    const list = [...readingList];
    const isDescending = order === "descending";
    switch (key) {
        case "docMetaData":
            list.sort(compareDocsByTitle);
            if (isDescending) list.reverse();
            break;
        case "docIcon":
            list.sort(compareDocsByType);
            if (isDescending) list.reverse();
            break;
        case "dateAdded":
            if (slug === NOTE_SLUG) break;
            list.sort(compareDocsByDate);
            if (isDescending) list.reverse();
            break;
        default:
            break;
    }

    return list;
};
