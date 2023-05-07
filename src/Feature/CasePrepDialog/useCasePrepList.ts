import { useEffect, useState } from "react";
import useAsyncTask from "Hooks/useAsyncTask";
import MenuItem from "Models/MenuItem";
import { type MenuConfig } from "Models/MenuItem/@types";
import { type CasePrepDialogListItem } from "Models/Tabs/@types";
import CaseLawModel from "Models/Tabs/CaseLaw";
import PrepWorksModel from "Models/Tabs/PrepWorks";
import { logger } from "utils/logger";

export const useCasePrepList = (id: string)=>{
    const [menuItemConfig, setMenuItemConfig] = useState({
        text: "",
        slug: "",
    });
    const [caseLawList, setCaseLawList] = useState<CasePrepDialogListItem[]>([]);
    const [prepWorksList, setPrepWorksList] = useState<CasePrepDialogListItem[]>([]);

    const MenusData = useAsyncTask<
    string[],
    { casedata: CasePrepDialogListItem[]; prepWorksData: CasePrepDialogListItem[]; menuItemConfig: MenuConfig }
    >(async (id) => {
        try {
            const menuItemConfig =  await MenuItem.findById(id);
            const casedata = await CaseLawModel.getCaseLawList(id);
            const prepWorksData = await PrepWorksModel.getPreparatoryWorksList(id);

            return {
                menuItemConfig,
                casedata,
                prepWorksData,
            };
        } catch (error: unknown) {
            logger.error(error);
        }
    });

    const fetchTreeData = async () => {
        const  data = await MenusData.run(id);

        logger.log(data, "data");
        if (!data) return;

        setMenuItemConfig({
            text: data.menuItemConfig.text,
            slug: data.menuItemConfig.item_slug,
        });
        setCaseLawList(data.casedata);
        setPrepWorksList(data.prepWorksData);
        
    };

    useEffect(() => {
        fetchTreeData().catch((err) => {
            logger.log(err);
        });
    }, [id]);

    return {
        menuItemConfig,
        caseLawList,
        prepWorksList
    };
};