/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useEffect, useState, type FC } from "react";
import Button from "Components/Button";
import Typography from "Components/Typography";
import MenuTree from "Feature/MenuTree";
import {
    type EditNodeProps,
    type MenuTreeProps,
    type ReducedEditNodeTextPayload,
} from "Feature/MenuTree/@types";

export interface EditTreeNodeProps {
    id: string;
    nodeText: string;
    nodeProps: MenuTreeProps;
    onClose: () => void;
}

const rootCls = "flex justify-center h-[100%] w-[100%] py-[25px] px-[10px] overflow-auto";

const containerCls = `bg-lxsGrey2 max-w-[80%] w-[100%] min-h-[100%] relative leading-[24px]
font-fontFamilyHalvetica inline-table`;

const closeBtnCls = `absolute right-[-20px] top-[-20px] bg-lxsGrey2 w-[40px] h-[40px] 
rounded-[50%] cursor-pointer text-black`;

const titleCls = "pt-[30px] text-[20px] max-w-[400px] text-center !font-fontFamilyHalvetica";

const EditTreeNode: FC<EditTreeNodeProps> = ({
    id,
    nodeText,
    nodeProps,
    onClose,
}) => {
    const [text, setText] = useState<string>(nodeText);

    useEffect(() => {
        if (nodeText) setText(nodeText);
    }, [nodeText]);

    const { editNodeProps } = nodeProps;

    const onEditText = (props: ReducedEditNodeTextPayload) => {
        if (id === props.itemId) {
            const plainText = stripHtml(props.text);
            setText(plainText);
        }

        editNodeProps?.onEditNodeText(props);
    };

    const updatedNodeProps = {
        ...nodeProps,
        editNodeProps: {
            ...editNodeProps,
            onEditNodeText: onEditText,
        } as EditNodeProps | undefined,
    };
    return (
        <div className={rootCls}>
            <div className={containerCls}>
                <Button className={closeBtnCls} onClick={onClose}>
                    <span className="material-icons pt-[5px]">close</span>
                </Button>
                <div className="mb-[20px]">
                    <div className="px-[12px] flex justify-center">
                        <Typography variant="h4" className={titleCls}>
                            <span dangerouslySetInnerHTML={{ __html: text }} />
                        </Typography>
                    </div>
                </div>
                <div className="px-[11px] pb-[20px] text-center">
                    <MenuTree {...updatedNodeProps} />
                </div>
            </div>
        </div>
    );
};

export default EditTreeNode;

export const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");
