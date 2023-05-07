import { type FC } from "react";
import { useLocation } from "react-router-dom";
import Button from "Components/Button";
import IconsWithText from "Components/IconsWithText";
import Link from "Components/Link";
import { type INode } from "Models/SnapshotsMenus/@types";
import { type PreNavActionsList } from "Screens/Library/Drawer/constants";


interface PrevNavActionsProps {
    node: INode;
    actionList: PreNavActionsList[];
    onClickPrep: (menuId: string) => void;
    onPopulateTabs: (value: { id: string; slug: string }) => void;
}

const PreNavActions: FC<PrevNavActionsProps> = ({
    onClickPrep,
    onPopulateTabs,
    node,
    actionList,
}) => {

    const { item_slug, _id } = node;

    const currentUrl = useLocation().pathname.split("/");


    const handleOnClickPrep = (id: string, isRpe?: boolean) => {
        if (id === "populateTabs" && !isRpe) {
            onPopulateTabs({ id: _id, slug: item_slug });
        } else if (id === "casePrep") {
            onClickPrep(_id);
        }

    };

    return (
        <div className="actionDiv w-9 relative -left-4">
            <div className="flex">
                {actionList.map((list) => {
                    const button = (
                        <Button
                            key={list.iconName}
                            tooltip={list.tooltip}
                            className="pb-2"
                            onClick={() => {
                                handleOnClickPrep(list.id, list.isRpe);
                            }}
                            tippyClass={list.tippyClass}
                            isArrow={list.isTooltipArrow}
                        >
                            <IconsWithText icon={list.iconName} />
                        </Button>
                    );
                    const link = list.isRpe ? (`/rpe/clicc/${item_slug}`) : (`/${currentUrl[2]}/${item_slug}`);

                    if (list.id === "populateTabs") {
                        return (
                            <Link to={link} key={list.iconName}>
                                {button}
                            </Link>
                        );
                    }

                    return button;
                })}
            </div>
        </div>
    );
};

export default PreNavActions;
