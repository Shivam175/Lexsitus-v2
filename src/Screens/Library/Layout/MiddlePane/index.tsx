
import { type ReactNode, type FC } from "react";
import styles from "./index.module.scss";

export interface MiddlePaneProps {
    windowList?: ReactNode[];
}

const MiddlePane: FC<MiddlePaneProps> = ({ windowList }) => (
    <>
        {(windowList ?? []).map((window, idx) => (
            <div key={idx} className={styles.middlepane}>
                {window}
            </div>
        ))}
    </>
);

export default MiddlePane;
