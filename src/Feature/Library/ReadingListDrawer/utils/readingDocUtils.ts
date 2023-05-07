import { type ReadingListItem } from "Models/ReadingList/@types";
import {
    readingDocMapping,
    type ReadingDocMapping,
} from "Screens/ReadingLists/readingListDocMapping";

export const findReadingDoc = (key: keyof ReadingDocMapping, value: string) =>
    readingDocMapping.find((doc: ReadingDocMapping) => doc[key] === value);

export const getReadingDocPath = (item: ReadingListItem) => {
    const { docType } = item;
    const doc = findReadingDoc("docType", docType);
    const docPath = doc?.path ?? "";
    return `/${docPath}/${item.docId}?type=${docType}`;
};
