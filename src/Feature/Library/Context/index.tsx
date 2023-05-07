/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createContext,
    useEffect,
    useState,
    type FC,
    type PropsWithChildren,
    type ReactNode,
} from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { type LibraryDocument } from "./@types";
import useHandleAuthAction from "./Hooks/useHandleAuthAction";
import useReadingListMethods, {
    type ReadingListMethods,
} from "./Hooks/useReadingListMethods";
import {
    DEFAULT_EMPTY_READING_LIST,
    DEFAULT_READING_LIST,
    EXCLUDE_FROM_HISTORY,
} from "./constants";
import { tabMapping, type TabMapping } from "./tabMapping";
import {
    findLibraryTab,
    getLibraryTabComponent,
    addToReadingHistory,
} from "./utils";
import config from "Config";
import { useAddToReadingList } from "Feature/Library/Tabs/Hooks/useAddToReadingList";
import {
    type ActionButton,
    usePaneActionsList,
} from "Feature/Library/Tabs/Hooks/usePaneActionsList";
import { useCurrentLanguage } from "Hooks/useTranslation";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import {
    type ReadingListBase,
    type DocumentType,
    
    type ReadingList,
    type AddToReadingListDocType,
} from "Models/ReadingList/@types";
import { type User } from "Models/Users/@types";
import { useStoreState } from "Stores";
import { logger } from "utils/logger";

export interface TabTreeNode {
    docType: DocumentType;
    id: string;
}

interface ILibraryContextProps {
    currentTab: TabMapping;
    menuTree: ReactNode;
    setMenuTree: (menuTree: ReactNode) => void;
    menuSlug: string;
    contentSlug: string;
    globalMenuNode: { id: string; slug: string };
    setGlobalMenuNode: (value: { id: string; slug: string }) => void;
    windowList: ReactNode[];
    tabComponent: ReactNode;
    addWindow: (window: ReactNode, showSingleWindow?: boolean) => void;
    deleteWindow: (id?: string) => void;
    reverseWindowList: () => void;
    currentUrl: string;
    currentLanguage: string;
    currentDoc: LibraryDocument;
    setCurrentDoc: (item: LibraryDocument) => void;
    isLoggedIn: boolean;
    isAdmin: boolean;
    addToReadingList: (docId: string, docType: AddToReadingListDocType) => void;
    docTypeSearchParam: DocumentType | undefined;
    isDocTypeSearchParamValid: boolean;
    tabPopulatedNode: TabTreeNode;
    setTabPopulatedNode: (node: TabTreeNode) => void;
    handleAuthAction: (
        callback: (() => Promise<void>) | (() => void)
    ) => Promise<void>;
    createActionList: (actionList: ActionButton[]) => Array<{
        Button: JSX.Element;
        onClick: () => void;
    }>;
    readingListMethods: ReadingListMethods;
    listOfReadingLists: ReadingListBase[];
    User: User | undefined;
    isCurrentDocValid: boolean;
    isReadingDrawerDoc: boolean;
    currentReadingList: ReadingList | undefined;
    userHistoryList: ReadingHistoryItem[] | undefined;
    latestHistoryDocId: string;
    libraryComponentKey: boolean;
    toggleLibraryComponentKey: () => void;
}

export const WINDOW_LIST_MAX_LENGTH = 2;

export const LibraryContext = createContext<ILibraryContextProps>({
    currentTab: {
        path: "lectures",
        treeType: "",
        themeColor: "color_lectures",
        docType: "Video",
    },
    menuTree: "",
    setMenuTree() { },
    menuSlug: "",
    contentSlug: "",
    globalMenuNode: { id: "", slug: "" },
    setGlobalMenuNode() { },
    windowList: [],
    tabComponent: "",
    currentUrl: "",
    addWindow() { },
    deleteWindow() { },
    reverseWindowList() { },
    currentLanguage: "",
    currentDoc: {
        docId: "",
        docType: "EOCD",
        origin: "PathSlug",
    },
    setCurrentDoc() {},
    isLoggedIn: false,
    isAdmin: false,
    addToReadingList() {},
    docTypeSearchParam: undefined,
    isDocTypeSearchParamValid: false,
    tabPopulatedNode: { docType: "Video", id: "" },
    setTabPopulatedNode() {},
    handleAuthAction: async () => Promise.resolve(),
    createActionList: () => [],
    readingListMethods: {
        getReadingList: async () => Promise.resolve(undefined),
        createReadingList: async () =>
            Promise.resolve(DEFAULT_EMPTY_READING_LIST),
        renameReadingList: async () =>
            Promise.resolve(DEFAULT_EMPTY_READING_LIST),
        setCurrentReadingListId() {},
        getAllReadingLists: async () => Promise.resolve([]),
        getReadingHistory: async () => Promise.resolve([]),
        setReadingList() {},
        setUserHistoryList() {},
    },
    listOfReadingLists: [],
    User: undefined,
    isCurrentDocValid: false,
    isReadingDrawerDoc: false,
    currentReadingList: DEFAULT_READING_LIST,
    userHistoryList: [],
    latestHistoryDocId: "",
    libraryComponentKey: false,
    toggleLibraryComponentKey() {},
});

export const useLibraryContext = (): ILibraryContextProps => {
    const { language } = useCurrentLanguage();
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState<TabMapping>(tabMapping[0]);
    const [menuTree, setMenuTree] = useState<ReactNode>(undefined);
    const [globalMenuNode, setGlobalMenuNode] = useState<{
        id: string;
        slug: string;
    }>({ id: "", slug: "" });
    const [windowList, setWindowList] = useState<ReactNode[]>([]);
    const [tabComponent, setTabComponent] = useState<ReactNode>(undefined);
    const [currentDoc, setCurrentDoc] = useState<LibraryDocument>({
        docId: "",
        docType: "EOCD",
        origin: "PathSlug",
    });
    const [tabPopulatedNode, setTabPopulatedNode] = useState<TabTreeNode>({
        docType: "Video",
        id: "",
    });
    const [isRedirectToTab, setIsRedirectToTab] = useState<ReactNode>(false);
    const [latestHistoryDocId, setLatestHistoryDocId] = useState<string>("");
    const [libraryComponentKey, setLibraryComponentKey] = useState<boolean>(false);
    const { User, listOfReadingLists, readingList, userHistoryList } =
        useStoreState(
            ({
                UserStore: {
                    User,
                    listOfReadingLists,
                    readingList,
                    userHistoryList,
                },
            }) => ({
                User,
                listOfReadingLists,
                readingList,
                userHistoryList,
            })
        );
    const addToReadingList = useAddToReadingList(User?.currentListId);
    const handleAuthAction = useHandleAuthAction();
    const { createActionList } = usePaneActionsList();
    const {
        getReadingList,
        createReadingList,
        renameReadingList,
        setCurrentReadingListId,
        getAllReadingLists,
        getReadingHistory,
        setReadingList,
        setUserHistoryList,
    } = useReadingListMethods();

    const toggleLibraryComponentKey = () => {
        setLibraryComponentKey(prevState => !prevState); 
    };

    const isLoggedIn = Boolean(User);
    const isAdmin = Boolean(User?.roleNames?.includes("admin"));
    const url = config.get("BASE_URL") + location.pathname;
    const pathArr = location.pathname.split("/");
    const optionalPath = pathArr[2];
    const isRpe = optionalPath === "rpe";
    let { tab, menuSlug, contentSlug } = useParams();
    menuSlug = menuSlug ?? "";
    contentSlug = contentSlug ?? "";

    const [searchParams] = useSearchParams();
    const docTypeSearchParam = searchParams.get("type") as DocumentType;
    const isDocTypeSearchParamValid = docTypeSearchParam === currentTab.docType;

    const setTabByKey = (key: keyof TabMapping, value: string) => {
        if (isRpe) {
            const tab = findLibraryTab("path", "rpe/clicc");
            if (tab) setCurrentTab(tab);
        } else {
            const tab = findLibraryTab(key, value);
            if (tab) setCurrentTab(tab);
        }
    };

    useEffect(() => {
        setTabByKey("path", tab ?? "");
    }, [tab]);

    const isCurrentDocValid = currentDoc.docType === currentTab.docType;
    // Flag to check if docId of currentDoc was set by selecting a
    // document from ReadingDrawer
    const isReadingDrawerDoc = currentDoc.origin === "ReadingDrawer";

    useEffect(() => {
        const { docId, docType } = currentDoc;
        if (isLoggedIn && docId && !EXCLUDE_FROM_HISTORY.includes(docType)) {
            setIsRedirectToTab(false);

            if (!isCurrentDocValid) {
                // Switching to tab having docType
                // as that of currentDoc
                setIsRedirectToTab(true);
                setTabByKey("docType", docType);
            }

            void addToReadingHistory({ docId, docType })
                .then(() => {
                    setLatestHistoryDocId(docId); 
                })
                .catch((err: Error) => {
                    logger.error(err);
                });
        }
    }, [currentDoc.docId, currentDoc.docType]);

    useEffect(() => {
        setTabComponent(getLibraryTabComponent(currentTab.path));
        // Resetting currentDoc to empty on TabChange, except when
        // we are redirecting to tab with matching currentDoc
        if (!isRedirectToTab)
            setCurrentDoc({
                docId: "",
                docType: "EOCD",
                origin: "PathSlug",
            });
    }, [currentTab]);

    const addWindow = (window: ReactNode, isRemovePrevious = true) => {
        if (isRemovePrevious) setWindowList([window]);
        else if (windowList.length < WINDOW_LIST_MAX_LENGTH)
            setWindowList([...windowList, window]);
        else setWindowList([window, windowList[1]]);
    };

    const deleteWindow = (id?: string) => {
        if (id) {
            setWindowList(windowList.filter((_id) => _id !== id));
        } else setWindowList([]);
    };

    const reverseWindowList = () => {
        const list = windowList;
        setWindowList(list.reverse());
    };

    return {
        currentTab,
        menuTree,
        setMenuTree,
        menuSlug,
        contentSlug,
        globalMenuNode,
        setGlobalMenuNode,
        windowList,
        tabComponent,
        addWindow,
        deleteWindow,
        reverseWindowList,
        currentLanguage: language,
        currentDoc,
        setCurrentDoc,
        isLoggedIn,
        isAdmin,
        currentUrl: url,
        addToReadingList,
        docTypeSearchParam,
        isDocTypeSearchParamValid,
        tabPopulatedNode,
        setTabPopulatedNode,
        handleAuthAction,
        createActionList,
        readingListMethods: {
            getReadingList,
            createReadingList,
            renameReadingList,
            setCurrentReadingListId,
            getAllReadingLists,
            getReadingHistory,
            setReadingList,
            setUserHistoryList,
        },
        listOfReadingLists: listOfReadingLists ?? [],
        User,
        isCurrentDocValid,
        isReadingDrawerDoc,
        currentReadingList: readingList,
        userHistoryList,
        latestHistoryDocId,
        libraryComponentKey,
        toggleLibraryComponentKey,
    };
};

const LibraryContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const {
        currentTab,
        menuTree,
        setMenuTree,
        menuSlug,
        contentSlug,
        globalMenuNode,
        setGlobalMenuNode,
        windowList,
        tabComponent,
        addWindow,
        deleteWindow,
        reverseWindowList,
        currentUrl,
        currentLanguage,
        currentDoc,
        setCurrentDoc,
        isLoggedIn,
        isAdmin,
        addToReadingList,
        docTypeSearchParam,
        isDocTypeSearchParamValid,
        tabPopulatedNode,
        setTabPopulatedNode,
        handleAuthAction,
        createActionList,
        readingListMethods,
        listOfReadingLists,
        User,
        isCurrentDocValid,
        isReadingDrawerDoc,
        currentReadingList,
        userHistoryList,
        latestHistoryDocId,
        libraryComponentKey,
        toggleLibraryComponentKey,
    } = useLibraryContext();
    return (
        <LibraryContext.Provider
            value={{
                currentTab,
                menuTree,
                setMenuTree,
                menuSlug,
                contentSlug,
                globalMenuNode,
                setGlobalMenuNode,
                windowList,
                tabComponent,
                addWindow,
                deleteWindow,
                reverseWindowList,
                currentUrl,
                currentLanguage,
                currentDoc,
                setCurrentDoc,
                isLoggedIn,
                isAdmin,
                addToReadingList,
                docTypeSearchParam,
                isDocTypeSearchParamValid,
                tabPopulatedNode,
                setTabPopulatedNode,
                handleAuthAction,
                createActionList,
                readingListMethods,
                listOfReadingLists,
                User,
                isCurrentDocValid,
                isReadingDrawerDoc,
                currentReadingList,
                userHistoryList,
                latestHistoryDocId,
                libraryComponentKey,
                toggleLibraryComponentKey,
            }}
        >
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryContextProvider;
