import React, { useState, type FC } from "react";
import ClickAwayListener from "react-click-away-listener";
import styles from "./index.module.scss";

export interface PaneTitleEditorProps {
    titleText: string;
    onClose: (updatedTitle: string) => void;
}

const PaneTitleEditor: FC<PaneTitleEditorProps> = (props) => {
    const { titleText, onClose } = props;
    const [title, setTitle] = useState(titleText);
    const onInputChange = (event: any) => {
        setTitle(event.target.value);
    };

    return (
        <ClickAwayListener onClickAway={() => {
            onClose(title); 
        }}>
            <div className={styles["edit-title-root"]}>
                <input
                    type="text"
                    className={styles["edit-title-input"]}
                    value={title}
                    onChange={onInputChange}
                />
            </div>
        </ClickAwayListener>
    );
};

export default PaneTitleEditor;
