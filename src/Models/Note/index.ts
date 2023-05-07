/* eslint-disable @typescript-eslint/no-extraneous-class */
import {
    type BaseNote,
    type ISaveNote,
    type INote,
    type IAddNoteToReadingList,
    type IAddNoteToListResponse,
    type IRenameNote,
} from "./@types";
import { request } from "AxiosUtils";
import { type JSONType } from "Typings/@types";

 
const BASE_PATH = "/notes";
class NoteModel {
    static createNote = async (id: string) =>
        request<INote>({
            url: `/users/${id}/add-note`,
            method: "POST",
            data: { id },
        });

    static getNote = async (noteId: string) =>
        request<INote>({
            url: `${BASE_PATH}/${noteId}`,
            method: "GET",
        });

    static getAllNotes = async (params: JSONType) =>
        request<BaseNote[]>({
            url: `${BASE_PATH}`,
            method: "GET",
            params,
        });

    static saveNote = async ({ noteId, noteContent }: ISaveNote) =>
        request<INote>({
            url: `${BASE_PATH}/${noteId}`,
            method: "PUT",
            data: noteContent,
        });

    static renameNote = async ({ noteId, updatedTitle }: IRenameNote) =>
        request<INote>({
            url: `${BASE_PATH}/${noteId}`,
            method: "PUT",
            data: updatedTitle,
        });

    static deleteNote = async (noteId: string) =>
        request<{ count: number }>({
            url: `${BASE_PATH}/${noteId}`,
            method: "DELETE",
        });

    static addNoteToReadingList = async ({
        noteId,
        readingListId,
    }: IAddNoteToReadingList) =>
        request<IAddNoteToListResponse>({
            url: `${BASE_PATH}/${noteId}/readingListNote`,
            method: "POST",
            data: readingListId,
        });
}

export default NoteModel;
