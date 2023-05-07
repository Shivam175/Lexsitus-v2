import {  type FC } from "react";
import {
    LEXSITUS_LIST_PROPS,
    LEXSITUS_READING_LIST,
    MY_LIST_PROPS,
} from "./constants";
import { mapToListWithLink } from "./utils";
import IconList, { type IconListProps, type ListItem } from "Components/IconList";
import { type User } from "Models/Users/@types";
import { useGetAllReadingLists } from "Screens/ReadingLists/useGetAllReadingLists";

export interface ListNavigationProps {
    setCurrentListTitle: (title: string) => void;
    user: User | undefined;
}

const ListNavigation: FC<ListNavigationProps> = ({
    setCurrentListTitle,
    user,
}) => {
    const listOfReadingLists = useGetAllReadingLists(user?.id ?? "");

    const listWithLink: ListItem[] = mapToListWithLink(listOfReadingLists);

    const lexsitusReadingListProps: IconListProps = {
        ...LEXSITUS_LIST_PROPS,
        list: LEXSITUS_READING_LIST,
        onClick: setCurrentListTitle,
    };

    const myReadingListProps: IconListProps = {
        ...MY_LIST_PROPS,
        list: listWithLink,
        onClick: setCurrentListTitle,
    };
    return (
        <>
            <IconList {...lexsitusReadingListProps} />
            <IconList {...myReadingListProps} />
        </>
    );
};

export default ListNavigation;
