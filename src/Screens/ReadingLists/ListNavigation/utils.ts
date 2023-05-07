import { type ReadingListBase } from "Models/ReadingList/@types";

export const mapToListWithLink = (list: ReadingListBase[]) => list.map(({ title, id }) => ({
    title,
    link: `reading-lists/${id}`,
}));
