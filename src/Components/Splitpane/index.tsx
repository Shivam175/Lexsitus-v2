import clsx from "clsx";
import React, { useEffect, useState, type FC, type ReactNode } from "react";
import SplitPane, { Pane } from "split-pane-react";
import styles from "./index.module.scss";
import "split-pane-react/esm/themes/default.css";

export interface IPanes {
    pane: ReactNode;
    maxSize: string;
    minSize: string;
}

export interface SplitpaneProps {
    panes: IPanes[];
    className?: string;
    paneIndexWithClass?: number;
    isThirdPaneOpen?: boolean;
}

const Splitpane: FC<SplitpaneProps> = ({
    panes,
    className = "",
    paneIndexWithClass = -1,
    isThirdPaneOpen = true
}) => {
    const [sizes, setSizes] = useState([350, 750, 350]);
    
    useEffect(() => {
        if (isThirdPaneOpen) setSizes([350, 750, 350]);
        else setSizes([350, 1030, 70]);
    }, [isThirdPaneOpen]);

    return (
        <div className={`${styles.splitpane} splitpane`}>
            <SplitPane
                split="vertical"
                sizes={sizes}
                onChange={setSizes}
                sashRender={function (
                    index: number,
                    active: boolean,
                ): React.ReactNode {
                    return active;
                }}
            >
                {panes.map((pane, index) => (
                    <Pane
                        className={clsx({
                            [className]:
                                index === paneIndexWithClass ||
                                paneIndexWithClass === -1,
                        })}
                        minSize={pane.minSize}
                        maxSize={pane.maxSize}
                        key={index}
                    >
                        {pane.pane}
                    </Pane>
                ))}
            </SplitPane>
        </div>
    );
};

export default Splitpane;
