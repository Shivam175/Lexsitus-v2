import { useContext, type FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import PaneHeader, { type IButtonListItem } from "Components/PaneHeader";
import { LibraryContext } from "Feature/Library/Context";
import MenuTree from "Feature/MenuTree";
import { type MenuTreeProps } from "Feature/MenuTree/@types";

export interface MenuTreePaneProps extends MenuTreeProps {
    titleText: string;
    paneHeaderClass?: string;
    rightButtonList?: IButtonListItem[];
    populatedNodeId?: string;
}

const MenuTreePane: FC<MenuTreePaneProps> = ({
    titleText,
    paneHeaderClass,
    rightButtonList = [],
    populatedNodeId = "",
    ...props
}) => {
    const { globalMenuNode } = useContext(LibraryContext);
    const { tab, menuSlug, contentSlug } = useParams();
    const pathSlug = contentSlug ?? menuSlug;
    const populatedNodeID =
        globalMenuNode.id ? globalMenuNode.id : populatedNodeId;
    return (
        <div className={styles.LeftPane}>
            <PaneHeader
                leftButtonList={[]}
                rightButtonList={rightButtonList}
                titleText={titleText}
                titleClassName={styles.title}
                paneHeaderClassName={paneHeaderClass}
            />
            <div className={styles.tree}>
                <div className={styles.tree}>
                    <MenuTree
                        {...props}
                        isFirstExpanded={false}
                        nodeUI="LINK"
                        populatedNodeId={populatedNodeID}
                        pathSlug={pathSlug}
                        treeType={tab}
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuTreePane;
