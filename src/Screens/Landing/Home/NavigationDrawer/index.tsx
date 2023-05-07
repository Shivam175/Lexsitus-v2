import clsx from "clsx";
import { type FC } from "react";
import styles from "./index.module.scss";
import Button from "Components/Button";
import MenuList from "Components/MenuList";
import LanguageTabs from "Screens/Landing/Home/LanguageTabs";
import {
    TOP_NAVIGATION_DRAWER_MENULIST,
    BOTTOM_NAVIGATION_DRAWER_MENULIST,
} from "constants/navigationDrawerMenu";


const NavigationDrawer: FC = () => (
    <div className={`${styles.navigation_drawer}`}>
        <div className={clsx("pb-2", styles.menuContainer)}>
            <LanguageTabs />
        </div>
        <div className={clsx(styles["button-container"], "pb-6", styles.menuContainer)}>
            <Button
                variant="contained"
                edge="rounded"
                link={"/lectures"}
                color="grey"
                className={styles.button}
            >
                    Enter
            </Button>
        </div>
        <div className={styles.menuContainer}>
            <MenuList
                menus={TOP_NAVIGATION_DRAWER_MENULIST}
            />
        </div>
        <div className={styles.menu_divider} />
        <div className={styles.menuContainer}>
            <MenuList
                menus={BOTTOM_NAVIGATION_DRAWER_MENULIST}
            />
        </div>
    </div>
);

export default NavigationDrawer;
