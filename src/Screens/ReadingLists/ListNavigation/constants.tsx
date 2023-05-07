import { type ListItem } from "Components/IconList";

export const NOTE_SLUG = "notes";

export const DOC_LIST_SLUG = "all";

export const LEXSITUS_READING_LIST: ListItem[] = [
    { title: "All Documents", link: `reading-lists/${DOC_LIST_SLUG}` },
    { title: "All Notes", link: `reading-lists/${NOTE_SLUG}` },
];

export const LIST_ICON = <span className="material-icons">list</span>;

export const LEXSITUS_LIST_PROPS = {
    listHeading: "Lexsitus Reading List",
    icon: LIST_ICON,
};

export const MY_LIST_PROPS = {
    listHeading: "My Reading List",
    icon: LIST_ICON,
};
