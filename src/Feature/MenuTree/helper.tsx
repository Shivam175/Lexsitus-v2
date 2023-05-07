/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type FC } from "react";

const editNodeCls = "w-[100%] h-[100%] absolute invisible hover:!visible";

const editContainerCls = `absolute px-[3px] bg-lxsGrey7 top-[-22px] leading-[4px] 
rounded-[4px] font-fontFamilyBlack h-[22px] w-[56px] flex items-center justify-center`;

const editMsgCls = "hover:underline text-white text-[10px] cursor-pointer leading-[4px]";

export const EditNode: FC<{ isEditNode: boolean; onClick: () => void }> = ({
    isEditNode,
    onClick,
}) => {
    const handleClick = (event?: any) => {
        event?.preventDefault();
        event?.stopPropagation();
        onClick();
    };

    return (
        <>
            {isEditNode ? (
                <span className={`${editNodeCls} editNodeChild`}>
                    <span className={editContainerCls}>
                        <span onClick={handleClick} className={editMsgCls}>
                            Edit node
                        </span>
                    </span>
                </span>
            ) : null}
        </>
    );
};
