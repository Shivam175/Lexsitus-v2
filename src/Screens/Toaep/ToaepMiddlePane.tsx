import { type FC } from "react";
import styles from "./index.module.scss";
import { useToaepWindow } from "./useToaepWindow";
import ReadingListDrawer from "Feature/Library/ReadingListDrawer";

const ToaepMiddlePane: FC = () => {
    const { createWindow } = useToaepWindow();

    return (
        <>
            {createWindow()}
            <ReadingListDrawer drawerClassName={styles.drawerClassName} />
        </>
    );
};

export default ToaepMiddlePane;
