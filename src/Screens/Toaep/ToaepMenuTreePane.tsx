import { type FC } from "react";
import TreeWrapper, { type TreeWrapperProps } from "Feature/Library/TreeWrapper";

const ToaepMenuTreePane: FC = () => {

    const treeWrapperProps: TreeWrapperProps = {
        treeType: "ToeApp",
        useParentSlug: false,
        titleText: "Menu",
        paneHeaderClass: "color_caselaw1",
        isEachFirstExpanded: false,
        isHeading: false,
        isEditNode: false,
    };

    return <TreeWrapper {...treeWrapperProps} />;
};

export default ToaepMenuTreePane;