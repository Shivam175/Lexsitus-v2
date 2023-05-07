import clsx from "clsx";
import React, { type FC, type PropsWithChildren, useState } from "react";
import ClickAwayListener from "react-click-away-listener";


export interface IDropdownProps {
    targetElement: React.ReactElement;
    anchorPosition?: "Left" | "Right" | "Center";
    className?: string;
}

// TODO support anchor position

const Dropdown: FC<IDropdownProps & PropsWithChildren> = ({ targetElement, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickAway = () => {
        setIsOpen(false);
    };


    return (<ClickAwayListener onClickAway={handleClickAway}>
        <div className="relative">
            <div>
                {React.cloneElement(targetElement, { onClick() {
                    setIsOpen(!isOpen); 
                } })}
            </div>
            {
                isOpen ? (<div className={clsx("bg-white", "min-w-[150px]", "absolute", "right-0", "text-black", className)}>
                    {children}
                </div>) : null
            }
        </div>
        
    </ClickAwayListener>);
};




export default Dropdown;