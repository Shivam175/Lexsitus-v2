import { type LibraryTabPath, tabMapping, type TabMapping } from "./tabMapping";
import CaseLaw from "Feature/Library/Tabs/CaseLaw";
import Clicc from "Feature/Library/Tabs/Clicc";
import ElementsDigest from "Feature/Library/Tabs/ElementsDigest";
import ElementsOfCrime from "Feature/Library/Tabs/ElementsOfCrime";
import Lectures from "Feature/Library/Tabs/Lectures";
import MeansOfProof from "Feature/Library/Tabs/MeansOfProof";
import PrepWorks from "Feature/Library/Tabs/PrepWorks";
import ReadingHistoryModel from "Models/ReadingHistory";
import { type AddItemToHistory } from "Models/ReadingHistory/@types";

export const getLibraryTabComponent = (tabPath: LibraryTabPath) => {
    switch (tabPath) {
        case "lectures":
            return <Lectures />;
        case "clicc":
            return <Clicc />;
        case "preparatory-works":
            return <PrepWorks />;
        case "case-law":
            return <CaseLaw />;
        case "elements-of-crime":
            return <ElementsOfCrime />;
        case "elements-digest":
            return <ElementsDigest />;
        case "means-proof-digest":
            return <MeansOfProof />;
        default:
            return null;
    }
};

export const findLibraryTab = (key: keyof TabMapping, value: string) =>
    tabMapping.find((tab: TabMapping) => tab[key] === value);

export const addToReadingHistory = async (payload: AddItemToHistory) => {
    await ReadingHistoryModel.addToReadingHistory(payload);
};
