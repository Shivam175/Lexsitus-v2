import React, {   type FC } from "react";
import ClickAwayListener from "react-click-away-listener";
import ListModal, {  type ListModalProps } from "Components/ListModal";

export interface ListModalContainerProps extends ListModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ListModalContainer: FC<ListModalContainerProps> = ({
    isOpen,
    closeModal,
    ...props
}) => (
    <>
        {isOpen ? (
            <ClickAwayListener onClickAway={closeModal}>
                <div><ListModal {...props} /></div>
            </ClickAwayListener>
        ) : null}
    </>
);

export default ListModalContainer;
