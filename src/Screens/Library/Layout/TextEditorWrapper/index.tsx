import React, { type FC } from "react";
import LibraryTextEditor from "Feature/TextEditor";
import { useStoreActions, useStoreState } from "Stores";

interface TextEditorWrapperProps {
    toggleEditorState: () => void;
}

const TextEditorWrapper: FC<TextEditorWrapperProps> = (props) => {
    const { toggleEditorState } = props;
    const { User, currentNote } = useStoreState(
        ({ UserStore: { User, currentNote } }) => ({ User, currentNote })
    );

    const {
        getAllNotes,
        setCurrentUserNoteId,
        createNote,
        getNote,
        saveNote,
        setCurrentNote,
        setCurrentNoteContent,
        renameNote,
        addToCurrentReadingList,
    } = useStoreActions(
        ({
            UserStore: {
                getAllNotes,
                setCurrentUserNoteId,
                createNote,
                getNote,
                saveNote,
                setCurrentNote,
                setCurrentNoteContent,
                renameNote,
                addToCurrentReadingList,
            },
        }) => ({
            getAllNotes,
            setCurrentUserNoteId,
            createNote,
            getNote,
            saveNote,
            setCurrentNote,
            setCurrentNoteContent,
            renameNote,
            addToCurrentReadingList,
        })
    );

    const args = {
        User,
        currentNote,
        getAllNotes,
        setCurrentUserNoteId,
        createNote,
        getNote,
        saveNote,
        setCurrentNote,
        setCurrentNoteContent,
        renameNote,
        addToCurrentReadingList,
        toggleEditorState,
    };
    return <LibraryTextEditor {...args} />;
};

export default TextEditorWrapper;
