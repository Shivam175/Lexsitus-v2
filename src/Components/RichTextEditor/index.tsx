import { Editor } from "@mithya-team/rich-text-editor";
import React, { useEffect, useState, type FC } from "react";
import { type ReactQuillProps } from "react-quill";

const modules: ReactQuillProps["modules"] = {
    toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        ["link"],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["image"],
        ["code-block"],
    ],
};

export interface RichTextEditorProps {
    inputContent: string;
    onContentChange: (updatedContent: string) => void;
    editorModules?: ReactQuillProps["modules"];
    className?: string;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
    inputContent,
    onContentChange,
    editorModules,
    className = "",
}) => {
    const [editorState, setEditorState] = useState("");
    useEffect(() => {
        setEditorState(inputContent);
    }, [inputContent]);

    const onEditorContentChange = (value: string) => {
        setEditorState(value);
        onContentChange(value);
    };

    const editorQuillProps: ReactQuillProps = {
        modules: editorModules ?? modules,
        value: editorState,
    };
    return (
        <div className={className}>
            <Editor
                quillProps={editorQuillProps}
                onChange={onEditorContentChange}
            />
        </div>
    );
};

export default RichTextEditor;
