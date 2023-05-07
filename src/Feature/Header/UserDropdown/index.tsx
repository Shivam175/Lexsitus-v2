import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { getUserMenu } from "./helpers";
import Button from "Components/Button";
import DropdownList, { DropDownItem } from "Components/DropdownList";
import styles from "Feature/Header/index.module.scss";
import { useStoreActions, useStoreState } from "Stores";
import { logger } from "utils/logger";




const UserDropdown: FC = () => {
    const navigate = useNavigate();
    const { User } = useStoreState(({ UserStore: { User } }) => ({ User }));
    const { logoutUser } = useStoreActions(({ UserStore: { logoutUser } }) => ({ logoutUser }));

    const userMenu = getUserMenu(User);

    const handleDropDown = async (id: string) => {
        if (id === "logout") {
            await logoutUser().catch((err: unknown) => {
                logger.error(err);
            });

            navigate("/");
        }
    };

    return (
        <DropdownList
            targetElement={
                <Button>
                    <div className="flex  absolute -top-1">
                        <i
                            className={`material-icons text-grey5 ${styles.account}`}
                        >
                            account_circle
                        </i>
                        <span className="flex bg-purple border-[1px] border-white w-4 h-4 rounded-full relative top-2 right-1">
                            <i className="material-icons text-white relative -top-1 right-1">
                                arrow_drop_down
                            </i>
                        </span>
                    </div>
                </Button>
            }
        >
            {userMenu.map((menuItem) => (
                <DropDownItem
                    key={menuItem.label}
                    href={menuItem.href}
                    isPrefixLanguage={menuItem.isPrefixLanguage}
                    onClick={() => {
                        void handleDropDown(menuItem.id);
                    }}
                >
                    {menuItem.label}
                </DropDownItem>
            ))}
        </DropdownList>
    );
};

export default UserDropdown;
