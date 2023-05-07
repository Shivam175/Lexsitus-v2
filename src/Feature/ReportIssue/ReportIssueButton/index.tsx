import React, { useState, type FC } from "react";

import ClickAwayListener from "react-click-away-listener";
import Button from "Components/Button";
import { type IAvailableIcon } from "Components/Icons/@types";
import IconsWithText from "Components/IconsWithText";
import ReportIssueCard from "Feature/ReportIssue/ReportIssueCard";
import useMessageDialog from "Hooks/useMessageDialog";

export interface ReportIssueButtonProps {
    icon?: IAvailableIcon;
    tooltip?: string;
    url?: string;
}

const ReportIssueButton: FC<ReportIssueButtonProps> = (props) => {
    const { icon, tooltip, url } = props;
    const [isReportOpen, setIsReportOpen] = useState(false);

    const closeReportIssue = () => {
        setIsReportOpen(false);
    };

    const { showMessageDialog } = useMessageDialog();

    const handleOnSubmit = () => {
        closeReportIssue();
        showMessageDialog({
            heading: "Thank you!",
            message:
                "Thank you for your feedback, we will respond at our earliest opportunity.",
        });
    };

    const args = { onClose: closeReportIssue, onSubmitIssue: handleOnSubmit };

    return (
        <>
            <ClickAwayListener onClickAway={closeReportIssue}>
                <div>
                    <Button
                        tooltip={tooltip}
                        link={url}
                        onClick={() => {
                            setIsReportOpen(true);
                        }}
                    >
                        <IconsWithText icon={icon} />
                    </Button>
                    {isReportOpen ? <ReportIssueCard {...args} /> : null} 
                </div>
            </ClickAwayListener>
        </>
    );
};

export default ReportIssueButton;
