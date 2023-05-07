import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import Button, { type IButtonProps } from "Components/Button";
import Dropdown, { type IDropdownProps } from "Components/Dropdown";

export interface IDropdownListProps extends IDropdownProps { }

const DropdownList: FC<IDropdownListProps & PropsWithChildren> = (props) => {
    const { children } = props;
    return (
        <Dropdown {...props}>
            <ul>{children}</ul>
        </Dropdown>
    );
};

export const DropDownItem: FC<{ onClick?: () => void; href?: string; isPrefixLanguage?: boolean } & PropsWithChildren> = ({ onClick, href, children, isPrefixLanguage }) => {
    const buttonProps: IButtonProps = {
        link: href,
        isPrefixLanguage,
        onClick,
        className: clsx(
            "w-full",
            "text-black",
            "text-left",
            "p-2",
            "hover:bg-slate-200",
            "block",
            "text-sm",
        ),
    };
    return (
        <li>
            <Button {...buttonProps}>{children}</Button>
        </li>
    );
};

export default DropdownList;
