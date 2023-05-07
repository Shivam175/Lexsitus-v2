export type ScreenPosition = "centreRight" | "default";

export type DialogBgColor = "lightGrey" | "mediumGrey" | "default";

export const COLOR_VARIANTS: Record<DialogBgColor, string> = {
    lightGrey: "bg-msgDialogBackground",
    mediumGrey: "bg-mediumGrey",
    default: "bg-dialogBackground",
};

export const BTN_POSITIONS: Record<ScreenPosition, string> = {
    centreRight: "top-[-30px] right-[-30px]",
    default: "top-[5px] right-[30px]",
};
