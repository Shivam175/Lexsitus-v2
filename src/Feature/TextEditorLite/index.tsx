import { type FC, useEffect, useState } from "react";
import { type ReactQuillProps } from "react-quill";
import styles from "./index.module.scss";
import Button from "Components/Button";
import RichTextEditor, { type RichTextEditorProps } from "Components/RichTextEditor";

export interface TextEditorLiteProps {
    text: string;
    onSave: (text: string) => void;
    onClose: () => void;
    modules?: ReactQuillProps["modules"];
}

const editorModules: ReactQuillProps["modules"] = {
    toolbar: [
        ["bold", "italic"],
        [{ script: "sub" }, { script: "super" }],
    ],
};

const rootCls = "!flex items-center justify-center h-[100%]";

const listItemCls = "inline-block mx-[3px]";

const btnCls = `text-[14px] bg-grey2 px-[12px] min-h-[45px] leading-[45px] relative 
cursor-pointer text-white text-center tracking-[0.5px] rounded-[2px] shadow-medium`;

const TextEditorLite: FC<TextEditorLiteProps> = ({ text, onSave, onClose, modules }) => {
    const [textContent, setTextContent] = useState<string>(text);

    useEffect(() => {
        if (text) setTextContent(text);
    }, [text]);

    const textEditorProps: RichTextEditorProps = {
        inputContent: text,
        onContentChange: setTextContent,
        editorModules: modules ?? editorModules,
    };

    return (
        <div className={rootCls}>
            <div className={styles.editorContainer}>
                <RichTextEditor {...textEditorProps} />
                <div>
                    <ul className="py-[5px] px-[10px] float-right flex gap-[4px]">
                        <li className={listItemCls} onClick={onClose}>
                            <Button className={btnCls}>Cancel</Button>
                        </li>
                        <li className={listItemCls}>
                            <Button
                                className={btnCls}
                                onClick={() => {
                                    onSave(textContent);
                                    onClose();
                                }}
                            >
                                Save
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TextEditorLite;
