export type HoverThemeColor = "default";

export const ListThemeVariants: Record<HoverThemeColor, string> = {
    default: `font-fontFamilyBlack bg-grey8 hover:bg-purple 
    text-black hover:text-white group font-fontFamilyBlack text-[14.5px]
    leading-[19px]`,
};

export const IconThemeVariants: Record<HoverThemeColor, string> = {
    default: `text-purple group-hover:text-white left-[-2px] 
    top-[7px] relative pl-[20px] pr-[1px]`,
};

export const listHeadingClass =
    "py-[3px] px-[20px] text-[14px] font-bold font-fontFamilyBlack";
export const titleClass = "inline-block w-[100%]";
export const listContentClass = "relative top-[-3px]";
