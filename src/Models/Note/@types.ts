export interface BaseNote {
    id: string;
    title: string;
}

export interface INote extends BaseNote {
    created: string;
    text?: string;
    updated: string;
    userId: string;
}

export interface ISaveNote {
    noteId: string;
    noteContent: {
        text: string;
    };
}

export interface IAddNoteToReadingList {
    noteId: string;
    readingListId: {
        listId: string;
    };
}

export interface IAddNoteToListResponse {
    created: string;
    docId: string;
    docType: "Note";
    id: string;
    listId: string;
    updated: string;
    userId: string;
}

export interface IRenameNote {
    noteId: string;
    updatedTitle: {
        title: string;
    };
}
