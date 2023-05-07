
/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createContext,
    useEffect,
    useState,
    type FC,
    type PropsWithChildren,
} from "react";
import { type TabInterface } from "Components/TabComponent";
import { SKIP_NUMBER_SEARCH_DIALOG } from "Feature/Library/LibrarySearchDialog/constants";
import useAsyncTask from "Hooks/useAsyncTask";
import SearchModel from "Models/Search";
import { type Search, type SearchResultItem } from "Models/Search/@types";
import { type JSONType } from "Typings/@types";
import { logger } from "utils/logger";

interface SearchDialogueContextProps {
    searchText: string;
    setSearchText: (text: string) => void;
    currentTab?: TabInterface;
    setCurrentTab: (tab: TabInterface) => void;
    skipNumber: number;
    setSkipNumber: (num: number) => void;
    contentTypes: string;
    setContentTypes: (type: string) => void;
    totalPages: number;
    searchedData: SearchResultItem[];

}


export const SearchDialogContext = createContext<SearchDialogueContextProps>({
    searchText: "",
    setSearchText() { },
    currentTab: undefined,
    setCurrentTab() { },
    contentTypes: "",
    setContentTypes() { },
    skipNumber: 0,
    setSkipNumber() { },
    totalPages: 0,
    searchedData: [],

});

export const useSearchDialogContext = (): SearchDialogueContextProps => {

    const [searchText, setSearchText] = useState<string>("");
    const [contentTypes, setContentTypes] = useState<string>("");
    const [skipNumber, setSkipNumber] = useState<number>(0);
    const [searchedData, setSearchedData] = useState<SearchResultItem[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentTab, setCurrentTab] = useState<TabInterface>();


    const searchDataItem = useAsyncTask<[number, string], Search>(
        async (itemLimit, inputText) => {
            try {

                const filteredParams: JSONType = {
                    limit: itemLimit,
                    skip: skipNumber,
                    term: inputText,

                };

                if (contentTypes) {
                    filteredParams.content_type = contentTypes;
                }

                if (currentTab) {
                    if (currentTab.addFilter) {
                        filteredParams.menu_doc_type = currentTab.addFilter.menu_doc_type;
                    }

                    if (currentTab.docType !== "allResults") filteredParams.doc_type = currentTab.docType;
                }

                return await SearchModel.getAllSearchItem(filteredParams);
            } catch (error: unknown) {
                logger.log(error);
            }
        },
    );



    const fetchSearchData = async () => {
        if (!searchText) return;
        const data = await searchDataItem.run(
            SKIP_NUMBER_SEARCH_DIALOG,
            searchText,
        );
        if (!data) return;
        setSearchedData(data?.results);
        setTotalPages(data.total);
    };

    const sendSearchTracks = async () => {
        if (!searchText) return;
        await SearchModel.trackSearch({
            resultsCount: totalPages,
            searchText
        });
    };

    useEffect(() => {
        setSkipNumber(0);
        sendSearchTracks().catch((err: unknown) => {
            logger.log(err);
        });
    }, [searchText]);

    useEffect(() => {
        fetchSearchData().catch((err: unknown) => {
            logger.log(err);
        });
    }, [contentTypes, skipNumber, searchText, currentTab]);

    return {
        searchText,
        setSearchText,
        currentTab,
        setCurrentTab,
        contentTypes,
        setContentTypes,
        skipNumber,
        setSkipNumber,
        totalPages,
        searchedData,
    };
};

const SearchDialogContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const {
        searchText,
        setSearchText,
        contentTypes,
        setContentTypes,
        skipNumber,
        setSkipNumber,
        totalPages,
        searchedData,
        currentTab,
        setCurrentTab,

    } = useSearchDialogContext();
    return (
        <SearchDialogContext.Provider
            value={{
                searchText,
                setSearchText,
                contentTypes,
                setContentTypes,
                skipNumber,
                setSkipNumber,
                totalPages,
                searchedData,
                currentTab,
                setCurrentTab,
            }}
        >
            {children}
        </SearchDialogContext.Provider>
    );
};

export default SearchDialogContextProvider;
