import clsx from "clsx";
import React, { useContext, useEffect, useState, type FC } from "react";
import styles from "./index.module.scss";
import PaneHeader, { type PaneHeaderProps } from "Components/PaneHeader";
import RichTextEditor, { type RichTextEditorProps } from "Components/RichTextEditor";
import { ToastContext } from "Context/Toast";
import useHandleAuthAction from "Feature/Library/Context/Hooks/useHandleAuthAction";
import TextListModal, {
    type TextListModalProps,
} from "Feature/Library/ReadingListDrawer/TextListModal";
import { Modal } from "Feature/Library/ReadingListDrawer/helper";
import { usePaneActionsList } from "Feature/Library/Tabs/Hooks/usePaneActionsList";
import {
    type IAddNoteToListResponse,
    type IAddNoteToReadingList,
    type INote,
    type IRenameNote,
    type ISaveNote,
    type BaseNote,
} from "Models/Note/@types";
import { type User } from "Models/Users/@types";
import { type JSONType } from "Typings/@types";

export interface LibraryTextEditorProps {
    User: User | undefined;
    currentNote: INote | undefined;
    getAllNotes: (params: JSONType) => Promise<BaseNote[]>;
    setCurrentUserNoteId: (payload: string) => void;
    createNote: (id: string) => Promise<INote>;
    getNote: (noteId: string) => Promise<INote>;
    saveNote: (note: ISaveNote) => Promise<INote>;
    setCurrentNote: (payload: INote) => void;
    setCurrentNoteContent: (payload: string) => void;
    renameNote: (data: IRenameNote) => Promise<INote>;
    addToCurrentReadingList: (
        data: IAddNoteToReadingList
    ) => Promise<IAddNoteToListResponse>;
    toggleEditorState: () => void;
}

const rightArrowIconCls = `max-w-[24px] max-h-[20px] mt-[1px] text-[20px] leading-[14px]
!rounded-[2px] bg-lxsGrey6 !text-lxsGrey4 hover:!bg-white hover:!text-lxsGrey6`;

const LibraryTextEditor: FC<LibraryTextEditorProps> = (props) => {
    const {
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
    } = props;
    const [isListOpen, setIsListOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(true);
    const [notesList, setNotesList] = useState<BaseNote[]>([]);

    const handleAuthAction = useHandleAuthAction();
    const { createActionList } = usePaneActionsList();
    const { showToast } = useContext(ToastContext);

    const toggleTextEditorState = () => {
        toggleEditorState();
        setIsEditorOpen((state) => !state);
    };

    const setCurrentNoteAsync = async (id: string) => {
        const currentNote = await getNote(id);
        setCurrentNote(currentNote);
    };

    useEffect(() => {
        if (User?.currentNoteId) void setCurrentNoteAsync(User?.currentNoteId);
    }, [User?.currentNoteId ?? ""]);

    const saveCurrentNote = async () => {
        if (currentNote?.id) {
            await saveNote({
                noteId: currentNote?.id,
                noteContent: {
                    text: currentNote.text ?? "",
                },
            });
            showToast({ message: "Note saved!" });
        }
    };

    const onTitleChange = async (updatedTitle: string) => {
        if (currentNote?.id) {
            await renameNote({
                noteId: currentNote?.id,
                updatedTitle: {
                    title: updatedTitle,
                },
            });
        }
    };

    const addToReadingList = async () => {
        if (User?.currentListId && currentNote?.id) {
            await addToCurrentReadingList({
                noteId: currentNote?.id,
                readingListId: {
                    listId: User?.currentListId,
                },
            });
        }
    };

    const showNotesList = async () => {
        if (!isListOpen && User?.id) {
            const args = {
                filter: {
                    where: { userId: User?.id },
                    fields: ["title", "id"],
                },
            };
            setNotesList(await getAllNotes(args));
            setIsListOpen(true);
        }
    };

    const giveHeaderProps = () =>
        isEditorOpen ? openEditorHeaderProps : closedEditorHeaderProps;

    const changeCurrentNote = async (listId: string) => {
        if (listId === "new") await createNote(User?.id ?? "");
        else setCurrentUserNoteId(listId);
    };

    const setCurrentNoteTextContent = (updatedContent: string) => {
        if (User) setCurrentNoteContent(updatedContent);
    };

    const openEditorHeaderProps: PaneHeaderProps = {
        leftButtonList: createActionList([
            {
                icon: "folder_open",
                tooltip: "Open/Create notes",
                iconClass: "text-[20px]",
                onClick() {
                    void handleAuthAction(showNotesList);
                },
            },
            {
                icon: "save",
                iconClass: "text-[20px]",
                onClick() {
                    void handleAuthAction(saveCurrentNote);
                },
            },
            {
                icon: "library_add",
                tooltip: "Add to reading list",
                iconClass: "text-[20px]",
                onClick() {
                    void handleAuthAction(addToReadingList);
                },
            },
        ]),
        rightButtonList: createActionList([
            {
                icon: "keyboard_arrow_right",
                iconClass: rightArrowIconCls,
                onClick() {
                    toggleTextEditorState();
                },
            },
        ]),
        titleText: currentNote?.title ?? "Untitled",
        onTitleChange,
        titleIsEditable: true,
        isUsingColorVariants: false,
    };

    const closedEditorHeaderProps: PaneHeaderProps = {
        leftButtonList: [],
        rightButtonList: createActionList([
            {
                icon: "keyboard_arrow_left",
                iconClass: rightArrowIconCls,
                onClick() {
                    toggleTextEditorState();
                },
            },
        ]),
        titleText: " ",
        titleIsEditable: false,
        isUsingColorVariants: false,
    };

    const textEditorProps: RichTextEditorProps = {
        inputContent: currentNote?.text ?? "",
        onContentChange: setCurrentNoteTextContent,
        className: styles.editorContainer,
    };

    const notesListProps: TextListModalProps = {
        list: notesList,
        closeModal() {
            setIsListOpen(false);
        },
        onItemClick: changeCurrentNote,
        listType: "Note",
    };

    return (
        <div className="overflow-hidden bg-white">
            <Modal
                isOpen={isListOpen}
                onClose={() => {
                    setIsListOpen(false);
                }}
            >
                <TextListModal {...notesListProps} />
            </Modal>
            <div
                className={clsx(styles.editorHeader, {
                    [styles.closedHeader]: !isEditorOpen,
                })}
            >
                <PaneHeader {...giveHeaderProps()} />
            </div>
            <div className={clsx({ "invisible": !isEditorOpen })}>
                <RichTextEditor {...textEditorProps} />
            </div>
        </div>
    );
};

export default LibraryTextEditor;
