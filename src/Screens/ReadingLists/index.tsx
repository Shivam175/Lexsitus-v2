import {  useState, type FC } from "react";
import ListContent from "./ListContent";
import ListNavigation from "./ListNavigation";
import {
    LEXSITUS_READING_LIST,
} from "./ListNavigation/constants";
import PageTemplate from "Feature/PageTemplate";
import { useStoreState } from "Stores";

const leftNavigation = "bg-grey8 pt-[20px] pb-[20px] grow-0 shrink-0 basis-[250px]";
const listContent = "w-[100%] h-[100%] grow-1";

const ReadingListsLayout: FC = () => {
    const [currentListTitle, setCurrentListTitle] = useState<string>(
        LEXSITUS_READING_LIST[0].title
    );
    const { User } = useStoreState(({ UserStore: { User } }) => ({ User }));

    const setListTitle = (title: string) => {
        setCurrentListTitle(title);
    };

    return (
        <div className="mt-[40px] flex flex-row">
            <div className={leftNavigation}>
                <ListNavigation setCurrentListTitle={setListTitle} user={User}/>
            </div>
            <div className={listContent}>
                <ListContent currentListTitle={currentListTitle} user={User}/>
            </div>
        </div>
    );
};

const ReadingLists: FC = () => (
    <PageTemplate>
        <ReadingListsLayout />
    </PageTemplate>
);

export default ReadingLists;
