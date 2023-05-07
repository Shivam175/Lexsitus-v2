import { action, type Action, thunk, type Thunk } from "easy-peasy";
import AxiosUtils from "AxiosUtils";
import NoteModel from "Models/Note";
import { type IAddNoteToListResponse, type IAddNoteToReadingList, type INote, type BaseNote, type IRenameNote, type ISaveNote } from "Models/Note/@types";
import ReadingHistoryModel from "Models/ReadingHistory";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import ReadingListModel from "Models/ReadingList";
import { type GetReadingList, type RequestParams, type EmptyReadingList, type ReadingListBase, type ReadingList, type RenameListParams } from "Models/ReadingList/@types";
import UsersModel from "Models/Users/";
import {
    type UserWithAccessToken,
    type User,
    type ILoginUser,
} from "Models/Users/@types";
import { type TRootStore } from "Stores";
import { type JSONType } from "Typings/@types";
import { CLIENT_ACCESS_TOKEN_KEY, CLIENT_USER_ID_KEY } from "constants/app";
import { deleteClientData, getClientData, saveClientData } from "utils";

export interface UserState {
    User?: User;
    listOfReadingLists?: ReadingListBase[];
    readingList?: ReadingList;
    userHistoryList?: ReadingHistoryItem[];
    setReadingList: Action<UserState, ReadingList>;
    setUserHistoryList: Action<UserState, ReadingHistoryItem[]>;
    setListOfReadingLists: Action<UserState, ReadingListBase[]>;
    setCurrentReadingListId: Action<UserState, string>;
    setUser: Action<UserState, User>;
    setAxiosAuthHeader: Action<UserState>;
    clearUserState: Action<UserState>;
    fetchCurrentUser: Thunk<UserState, void>;
    loginUser: Thunk<
    UserState,
    ILoginUser,
    any,
    TRootStore,
    Promise<UserWithAccessToken>
    >;
    logoutUser: Thunk<UserState, void, any, TRootStore, Promise<void>>;
    getReadingList: Thunk<UserState, GetReadingList, any, TRootStore, Promise<ReadingList>>;
    renameReadingList: Thunk<UserState, RenameListParams, any, TRootStore, Promise<EmptyReadingList>>;
    createReadingList: Thunk<UserState, string, any, TRootStore, Promise<EmptyReadingList>>;
    getAllReadingLists: Thunk<UserState, RequestParams, any, TRootStore, Promise<ReadingListBase[]>>;
    getReadingHistory: Thunk<UserState, RequestParams, any, TRootStore, Promise<ReadingHistoryItem[]>>;

    currentNote?: INote;
    setCurrentUserNoteId: Action<UserState, string>;
    setCurrentNote: Action<UserState, INote>;
    setCurrentNoteContent: Action<UserState, string>;
    createNote: Thunk<UserState, string, any, TRootStore, Promise<INote>>;
    getNote: Thunk<UserState, string, any, TRootStore, Promise<INote>>;
    getAllNotes: Thunk<UserState, JSONType, any, TRootStore, Promise<BaseNote[]>>;
    saveNote: Thunk<UserState, ISaveNote, any, TRootStore, Promise<INote>>;
    renameNote: Thunk<UserState, IRenameNote, any, TRootStore, Promise<INote>>;
    addToCurrentReadingList: Thunk<UserState, IAddNoteToReadingList, any, TRootStore, Promise<IAddNoteToListResponse>>;
    refreshReadingListFlag?: boolean;
    toggleRefreshListFlag: Action<UserState>;
}

const UserStore: UserState = {
    setUser: action((state, payload) => {
        state.User = payload;
    }),

    setAxiosAuthHeader: action(() => {
        const accessToken = getClientData(CLIENT_ACCESS_TOKEN_KEY);
        if (accessToken) AxiosUtils.setAuthHeader(accessToken);
    }),

    fetchCurrentUser: thunk(async (actions) => {
        try {
            const user = await UsersModel.getCurrentUser();
            actions.setUser(user);
        } catch (err: unknown) {
            // Reset accessToken
            deleteClientData(CLIENT_ACCESS_TOKEN_KEY);
            deleteClientData(CLIENT_USER_ID_KEY);
        }
    }),

    loginUser: thunk(async (actions, payload) => {
        const data: UserWithAccessToken = await UsersModel.loginUser(payload);
        const { id, userId } = data;

        AxiosUtils.setAuthHeader(id);
        AxiosUtils.setAuthHeader(id);
        // Save token and user id in local storage
        saveClientData(CLIENT_ACCESS_TOKEN_KEY, id);
        saveClientData(CLIENT_USER_ID_KEY, userId);

        await actions.fetchCurrentUser();
        return data;
    }),

    clearUserState: action((state) => {
        if (state.User) state.User = undefined;
        if (state.listOfReadingLists) state.listOfReadingLists = undefined;
        // Reset accessToken
        deleteClientData(CLIENT_ACCESS_TOKEN_KEY);
        deleteClientData(CLIENT_USER_ID_KEY);
    }),

    logoutUser: thunk(async (actions) => {
        actions.setAxiosAuthHeader();
        await UsersModel.logoutUser();
        actions.clearUserState();
    }),

    setCurrentReadingListId: action((state, payload) => {
        if (state.User) state.User.currentListId = payload;
    }),

    setReadingList: action((state, payload) => {
        state.readingList = payload;
    }),

    setUserHistoryList: action((state, payload) => {
        state.userHistoryList = payload;
    }),

    getReadingList: thunk(async (actions, payload) => {
        const data = await ReadingListModel.getReadingList(payload);

        actions.setCurrentReadingListId(data.id);
        actions.setReadingList(data);
        return data;
    }),

    renameReadingList: thunk(async (actions, payload) => {
        const data = await ReadingListModel.renameReadingList(payload);

        const getListArgs = {
            readingListId: data.id,
            params: { filter: {} },
        };
        await actions.getReadingList(getListArgs);
        return data;
    }),

    createReadingList: thunk(async (actions, payload) => {
        actions.setAxiosAuthHeader();
        const data = await UsersModel.createReadingList(payload);

        actions.setCurrentReadingListId(data.id);
        actions.setReadingList(data);
        return data;
    }),

    setListOfReadingLists: action((state, payload) => {
        state.listOfReadingLists = payload;
    }),

    getAllReadingLists: thunk(async (actions, payload) => {
        const data = await ReadingListModel.getAllReadingLists(payload);

        actions.setListOfReadingLists(data);
        return data;
    }),

    getReadingHistory: thunk(async (actions, payload) => {
        const data = await ReadingHistoryModel.getReadingHistory(payload);

        actions.setUserHistoryList(data);
        return data;
    }),

    setCurrentUserNoteId: action((state, payload) => {
        if (state.User)
            state.User.currentNoteId = payload;
    }),

    setCurrentNote: action((state, payload) => {
        state.currentNote = payload;
        if (state.User)
            state.User.currentNoteId = payload.id;
    }),

    setCurrentNoteContent: action((state, payload) => {
        if (state.currentNote)
            state.currentNote.text = payload;
    }),

    createNote: thunk(async (actions, payload) => {
        actions.setAxiosAuthHeader();
        const data = await NoteModel.createNote(payload);

        actions.setCurrentNote(data);
        return data;
    }),

    getNote: thunk(async (actions, payload) => {
        const data = await NoteModel.getNote(payload);

        return data;
    }),

    getAllNotes: thunk(async (actions, payload) => {
        const data = await NoteModel.getAllNotes(payload);

        return data;
    }),

    saveNote: thunk(async (actions, { noteId, noteContent }) => {
        const data = await NoteModel.saveNote({ noteId, noteContent });

        actions.setCurrentNote(data);
        return data;
    }),

    renameNote: thunk(async (actions, { noteId, updatedTitle }) => {
        const data = await NoteModel.renameNote({ noteId, updatedTitle });

        actions.setCurrentNote(data);
        return data;
    }),

    addToCurrentReadingList: thunk(async (actions, { noteId, readingListId }) => {
        const data = await NoteModel.addNoteToReadingList({ noteId, readingListId });

        actions.toggleRefreshListFlag();
        return data;
    }),

    toggleRefreshListFlag: action((state) => {
        state.refreshReadingListFlag = !state.refreshReadingListFlag;
    }),

};

export default UserStore;
