import clsx from "clsx";
import { logger } from "./logger";
import Button from "Components/Button";
import IconsWithText from "Components/IconsWithText";

const detectClick = () => {
    logger.log("Btn clicked");
};

export const createButton = (
    icon: string,
    tooltip?: string,
    iconClass = "",
    isCssIcon?: boolean,
    btnColor?: "grey" | "white" | "blue" | "transparent"
) => {
    if (isCssIcon) {
        return (
            <Button
                tooltip={tooltip}
                className="text-xs text-white relative right-1  gap-0"
            >
                <IconsWithText
                    icon="digest-decisions-icon"
                    text="Decisions"
                    iconPos="left"
                    width="20px"
                    height="20px"
                    textClass="text-xs"
                />
            </Button>
        );
    }

    return (
        <Button
            color={btnColor ?? "white"}
            tooltip={tooltip}
            className={clsx("material-icons", iconClass)}
        >
            {icon}
        </Button>
    );
};

export const createButtonListItem = (
    Button: JSX.Element,
    onClick: () => void = detectClick
) => ({
    Button,
    onClick,
});
