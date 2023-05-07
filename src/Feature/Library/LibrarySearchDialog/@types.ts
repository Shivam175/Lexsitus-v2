import { type IAvailableIcon } from "Components/Icons/@types";
import { type VideoMetaData, type PdfMetaData } from "Models/Search/@types";

export type TabItemContentType = "HTML" | "PDF" | "VIDEO";
export interface TabContentProps {
    closeAppDialog: () => void;
    link: string;
}

export interface HtmlSearchTabContentProps extends TabContentProps {
    header?: string;
    title: string;
    text: string;
}

export interface PdfSearchTabContentProps extends TabContentProps {
    title: string;
    metadata: PdfMetaData[];
    metaDataKeys: string[];
}

export interface VideoSearchTabContentProps extends TabContentProps {
    title: string;
    metadata: VideoMetaData;
}

export interface TabItemConfiguration {
    icon: IAvailableIcon;
    baseSlug: string;
    metaDataKeys?: string[];
    contentType: TabItemContentType;
}
export type TabDocTypes = "MeansOfProofDigest" |
"ElementsOfCrimeDigest" |
"ElementsOfCrime" | 
"CaseLaw" | 
"PreparatoryWork" |
"Commentary" |
"Video"; 
