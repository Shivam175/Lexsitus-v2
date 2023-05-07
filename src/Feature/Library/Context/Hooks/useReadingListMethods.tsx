import useHandleAuthAction from "./useHandleAuthAction";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import {
    type ReadingListBase,
    type EmptyReadingList,
    type GetReadingList,
    type ReadingList,
    type RenameListParams,
    type RequestParams,
} from "Models/ReadingList/@types";
import { useStoreActions } from "Stores";

export interface ReadingListMethods {
    getReadingList: (
        params: GetReadingList
    ) => Promise<ReadingList | undefined>;
    createReadingList: (id: string) => Promise<EmptyReadingList | undefined>;
    renameReadingList: (
        params: RenameListParams
    ) => Promise<EmptyReadingList | undefined>;
    setCurrentReadingListId: (payload: string) => void;
    getAllReadingLists: (
        params: RequestParams
    ) => Promise<ReadingListBase[] | undefined>;
    getReadingHistory: (
        params: RequestParams
    ) => Promise<ReadingHistoryItem[] | undefined>;
    setReadingList: (payload: ReadingList) => void;
    setUserHistoryList: (payload: ReadingHistoryItem[]) => void;
}

const useReadingListMethods = () => {
    const handleAuthAction = useHandleAuthAction();
    const {
        getReadingList,
        createReadingList,
        renameReadingList,
        setCurrentReadingListId,
        getAllReadingLists,
        getReadingHistory,
        setReadingList,
        setUserHistoryList,
    } = useStoreActions(
        ({
            UserStore: {
                getReadingList,
                createReadingList,
                renameReadingList,
                setCurrentReadingListId,
                getAllReadingLists,
                getReadingHistory,
                setReadingList,
                setUserHistoryList,
            },
        }) => ({
            getReadingList,
            createReadingList,
            renameReadingList,
            setCurrentReadingListId,
            getAllReadingLists,
            getReadingHistory,
            setReadingList,
            setUserHistoryList,
        })
    );

    const handleGetReadingList = async (params: GetReadingList) =>
        handleAuthAction(async () => getReadingList(params));

    const handleCreateReadingList = async (id: string) =>
        handleAuthAction(async () => createReadingList(id));

    const handleRenameReadingList = async (params: RenameListParams) =>
        handleAuthAction(async () => renameReadingList(params));

    const handleGetAllReadingLists = async (params: RequestParams) =>
        handleAuthAction(async () => getAllReadingLists(params));

    const handleGetReadingHistory = async (params: RequestParams) =>
        handleAuthAction(async () => getReadingHistory(params));

    const handleSetReadingListId = async (id: string) =>
        handleAuthAction(() => {
            setCurrentReadingListId(id); 
        });

    const handleSetReadingList = async (list: ReadingList) =>
        handleAuthAction(() => {
            setReadingList(list); 
        });

    const handleSetUserHistoryList = async (list: ReadingHistoryItem[]) =>
        handleAuthAction(() => {
            setUserHistoryList(list); 
        });

    return {
        getReadingList: handleGetReadingList,
        createReadingList: handleCreateReadingList,
        renameReadingList: handleRenameReadingList,
        setCurrentReadingListId: handleSetReadingListId,
        getAllReadingLists: handleGetAllReadingLists,
        getReadingHistory: handleGetReadingHistory,
        setReadingList: handleSetReadingList,
        setUserHistoryList: handleSetUserHistoryList,
    };
};

export default useReadingListMethods;
