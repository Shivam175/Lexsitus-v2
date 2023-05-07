import React from "react";

export const ArrowIcon: React.FC<{
    isDownArrow: boolean;
}> = ({ isDownArrow }) =>
    isDownArrow ? (
        <i className="text-lxsGrey13  arrow material-icons">
            arrow_drop_down
        </i>
    ) : (
        <i className="text-lxsGrey13 arrow material-icons">
            arrow_left
        </i>
    );
