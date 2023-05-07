import {   type FC } from "react";
import CasePrepContent from "./CasePrepContent";
import styles from "./index.module.scss";

import { useCasePrepList } from "./useCasePrepList";

interface CasePrepDialogProps {
    menuId: string;
}

const CasePrepDialog: FC<CasePrepDialogProps> = ({ menuId }) => {
    
         
    const { menuItemConfig, caseLawList, prepWorksList } = useCasePrepList(menuId);
 

    return (
        <div className={styles.caseprepContainer}>
            <div className="flex">
                <CasePrepContent
                    titleText={menuItemConfig.text}
                    itemList={caseLawList}
                    defaultText={"Case Law"}
                    iconName="document-icons-bookZoom"
                    slug={`case-law/${menuItemConfig.slug}`}
                />
                <CasePrepContent
                    titleText={menuItemConfig.text}
                    itemList={prepWorksList}
                    defaultText={"Preparatory Works"}
                    iconName="document-icons-sketch"
                    slug={`case-law/${menuItemConfig.slug}`}
                />
            </div>
        </div>
    );
};

export default CasePrepDialog;
