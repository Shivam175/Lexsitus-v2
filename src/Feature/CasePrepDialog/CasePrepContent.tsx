import { type FC } from "react";
import styles from "./index.module.scss";
import { type IAvailableIcon } from "Components/Icons/@types";
import IconsWithText from "Components/IconsWithText";
import Link from "Components/Link";
import Typography from "Components/Typography";
import { type CasePrepDialogListItem } from "Models/Tabs/@types";


interface CasePrepContainerProps {
    titleText: string;
    itemList: CasePrepDialogListItem[];
    defaultText: string;
    iconName: IAvailableIcon;
    slug: string;
}

const CasePrepContent: FC<CasePrepContainerProps> = (props) => {
    const { titleText, itemList, defaultText, iconName, slug } = props;

    return (
        <div className={`flex flex-col text-white ${styles.casePrepDiv}`}>
            <Typography variant="h3" className="mb-8">
                {" "}
                {defaultText} {" | "}
                {titleText}
            </Typography>

            <div className="flex flex-col">
                {itemList.length > 0 ? (
                    itemList?.map((list) => (
                        <Link
                            key={list.id}
                            to={`/${slug}/${list.item_slug}`}
                            className="flex"
                        >
                            <div>
                                <IconsWithText icon={iconName} />
                            </div>
                            <Typography
                                variant="body"
                                className="mb-4 pl-2 text-left"
                            >
                                {list.title}
                            </Typography>
                        </Link>
                    ))
                ) : (
                    <div className="w-full">
                        <Typography variant="h3">
                            {" "}
                            No {defaultText} documents available.
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CasePrepContent;
