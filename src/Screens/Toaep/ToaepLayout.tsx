import { type FC } from "react";
import ToaepMenuTreePane from "./ToaepMenuTreePane";
import ToaepMiddlePane from "./ToaepMiddlePane";
import { panesConfig } from "./constants";
import styles from "./index.module.scss";
import Splitpane from "Components/Splitpane";

const ToaepLayout: FC = () => {
    const panes = [
        {
            pane: <ToaepMenuTreePane />,
            minSize: panesConfig.firstPane.minSize,
            maxSize: panesConfig.firstPane.maxSize,
        },
        {
            pane: <ToaepMiddlePane />,
            minSize: panesConfig.secondPane.minSize,
            maxSize: panesConfig.secondPane.maxSize,
        },
        {
            pane: <div>pane3</div>,
            minSize: panesConfig.thirdPane.minSize,
            maxSize: panesConfig.thirdPane.maxSize,
        },
    ];
    return (
        <div className={styles.toaep}>
            <Splitpane panes={panes} />
        </div>
    );
};

export default ToaepLayout;