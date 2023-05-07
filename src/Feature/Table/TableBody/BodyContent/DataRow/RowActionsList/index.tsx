import React, { useState, type FC } from "react";
import { type ActionHandlerArgs, type RowActionIcon } from "./@types";
import ListModalContainer from "./ListModalContainer";
import { getRowAction } from "./utils";
import { type ListItem } from "Components/ListModal";
import { type DocumentType } from "Models/ReadingList/@types";

export interface RowActionsListProps {
    actionList: RowActionIcon[];
    docId: string;
    title: string;
    listItemId?: string;
    docType: DocumentType;
    externalLink: string;
    actionHandler: ({ ...value }: ActionHandlerArgs) => void;
    modalList: ListItem[];
    modalTitle?: string;
    iconClass?: string;
}

const RowActionsList: FC<RowActionsListProps> = ({
    actionList,
    modalList,
    modalTitle = "",
    ...props
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { actionHandler, docId, title, docType, listItemId } = props;
    return (
        <div className="flex">
            <ListModalContainer
                isOpen={isOpen}
                closeModal={() => {
                    setIsOpen(false);
                }}
                list={modalList}
                listTitle={modalTitle}
                onClickListItem={(id) => {
                    actionHandler({
                        actionKey: "playlist_add",
                        docId,
                        title,
                        listId: id,
                        docType,
                        listItemId,
                    });
                    setIsOpen(false);
                }}
            />
            {actionList.map((tableActionIcon, idx) => (
                <span key={idx}>
                    {getRowAction({
                        openModal() {
                            setIsOpen(true);
                        },
                        rowActionIcon: tableActionIcon,
                        ...props,
                    })}
                </span>
            ))}
        </div>
    );
};

export default RowActionsList;
