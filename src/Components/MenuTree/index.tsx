/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export interface TreeNode {
    nodeType: string;
    text: string;
    children: TreeNode[];
    _id: string;
    item_slug: string;
}
export interface ITree {
    nodeType: string;
    text: string;
    children: TreeNode[];
    _id: string;
    item_slug: string;
    handleLeafTreeItem: (slug: string) => void;
}
export interface MenuTreeProps {
    tree: TreeNode[];
    treeclass?: string;
    handleLeafTreeItem: (slug: string) => void;
}

const MenuTree: React.FC<MenuTreeProps> = (props) => {
    const { tree, treeclass, handleLeafTreeItem } = props;

    return (
        <ul className={treeclass}>
            {tree?.map(({ text, children, nodeType, _id, item_slug }) => (
                <Tree
                    key={_id}
                    text={text}
                    // eslint-disable-next-line react/no-children-prop
                    children={children}
                    nodeType={nodeType}
                    _id={_id}
                    item_slug={item_slug}
                    handleLeafTreeItem={handleLeafTreeItem}
                />
            ))}
        </ul>
    );
};

const Tree: React.FC<ITree> = (props) => {
    const { text, children, nodeType, item_slug, handleLeafTreeItem } = props;
    const [showChildren, setShowChildren] = useState(false);

    const handleIcon = () => showChildren ? (
        <i className={styles.arrow_left} />
    ) : (
        <i className={styles.arrow_down} />
    );

    const [icon, setIcon] = useState(<i className={styles.arrow_left} />);
    const handleClick = () => {
        setShowChildren(!showChildren);
        setIcon(handleIcon);
    };

    return (
        <div>
            {nodeType === "MENU" ? (
                <div>
                    <div onClick={handleClick} className={styles.container}>
                        {children.length > 0 ? icon : null}
                        {children.length > 0 ? (
                            item_slug.includes("part") ? (
                                <span className={styles.heading}>{text}</span>
                            ) : (
                                <Link to={`lectures/${item_slug}`}>
                                    <span
                                        onClick={() => {
                                            handleLeafTreeItem(item_slug);
                                        }}
                                        className={styles.subheading}
                                    >
                                        {text}
                                    </span>
                                </Link>
                            )
                        ) : (
                            <Link
                                to={item_slug}
                                onClick={() => {
                                    handleLeafTreeItem(item_slug);
                                }}
                            >
                                <span className={styles.heading_leaf}>
                                    {text}
                                </span>
                            </Link>
                        )}
                    </div>
                    <ul className={styles.nodes}>
                        {showChildren && handleLeafTreeItem && (
                            <MenuTree
                                tree={children}
                                handleLeafTreeItem={handleLeafTreeItem}
                            />
                        )}
                    </ul>
                </div>
            ) : undefined}
        </div>
    );
};

export default MenuTree;
