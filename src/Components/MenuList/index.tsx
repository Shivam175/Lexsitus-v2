import { type FC } from "react";
import styles from "./index.module.scss";
import BdoHandler from "Components/BdoHandler";
import Button from "Components/Button";
import IconsWithText from "Components/IconsWithText";
import Translate from "Feature/Translation/index";
import { type IMenuListItem } from "constants/navigationDrawerMenu";

export interface IMenuList {
    menus: IMenuListItem[];
}

export const MenuListItem: FC<IMenuListItem> = ({
    url,
    isExternal,
    iconClass,
    langKey,
}) => (
    <li>
        <Button link={url} isExternal={isExternal}>
            <IconsWithText icon={iconClass} />
            <p>
                {" "}
                <Translate keyLang={langKey} />
            </p>
        </Button>
    </li>
);

const MenuList: FC<IMenuList> = ({ menus }) => (
    <div>
        <BdoHandler>
            <ul className={styles.menulist_ul}>
                {menus.map((menulistItem) => (
                    <MenuListItem key={menulistItem.url} {...menulistItem} />
                ))}
            </ul>
        </BdoHandler>
    </div>
);

export default MenuList;
