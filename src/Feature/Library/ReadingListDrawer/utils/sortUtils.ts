import { type ReadingListDrawerDoc, type SortParam } from "Feature/Library/ReadingListDrawer/@types";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import { type ReadingListItem } from "Models/ReadingList/@types";

export const compareText = (itemA: string, itemB: string) => {
    if (itemA < itemB) return -1;
    if (itemA > itemB) return 1;
    return 0;
};

export const compareByTitle = (
    itemA: ReadingListDrawerDoc,
    itemB: ReadingListDrawerDoc
) => {
    const titleOfItemA = itemA.document?.title ?? itemA.document?.header ?? "";
    const titleOfItemB = itemB.document?.title ?? itemB.document?.header ?? "";
    return compareText(titleOfItemA, titleOfItemB);
};

export const compareByType = (
    itemA: ReadingListDrawerDoc,
    itemB: ReadingListDrawerDoc
) => {
    const typeOfItemA = itemA?.docType ?? itemA?.content ?? "";
    const typeOfItemB = itemB?.docType ?? itemB?.content ?? "";
    return compareText(typeOfItemA, typeOfItemB);
};

export const compareByDate = (
    itemA: ReadingListDrawerDoc,
    itemB: ReadingListDrawerDoc
) => itemA.created.localeCompare(itemB.created);

export const sortList = (
    sortParam: SortParam,
    list: ReadingHistoryItem[] | ReadingListItem[]
) => {
    const localList = [...list];
    switch (sortParam) {
        case "Name":
            (localList ?? []).sort(compareByTitle);
            break;
        case "Kind":
            (localList ?? []).sort(compareByType);
            break;
        case "Date Added":
            (localList ?? []).sort(compareByDate);
            break;
        default:
            throw Error("Invalid sortParam");
    }

    return localList;
};