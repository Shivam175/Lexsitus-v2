/* eslint-disable @typescript-eslint/naming-convention */

import { type TabItemConfiguration, type TabDocTypes } from "./@types";
import { LIBRARY_SEARCH_DIALOG_CLIPP_TEXT_LENGTH } from "constants/searchDialog";


export const getClippedText = (text?: string)=> text ? text.substring(0, LIBRARY_SEARCH_DIALOG_CLIPP_TEXT_LENGTH) + "..." : "";

export const itemConfiguration: Record<TabDocTypes, TabItemConfiguration> = {
    Video:{ 
        icon:"lexsitus-icons38-playButton",
        baseSlug:"lectures",
        contentType:"VIDEO", 
    },
    Commentary:{ 
        icon:"lexsitus-icons38-message",
        baseSlug:"clicc",
        contentType:"HTML"
    },
    PreparatoryWork:{
        icon:"lexitus-icons38-prep", 
        baseSlug:"preparatory-works",
        contentType:"PDF",
        metaDataKeys:["Date created", "Language(s)", "External identifier", "Persistent URL"],
        
    },
    CaseLaw: { 
        icon:"lexitus-icons38-Case", 
        baseSlug:"case-law",
        contentType:"PDF",
        metaDataKeys:["Organisation / State of source", "Title", "Content type", "Date created", "Case/Document number", "Persistent URL"],
    },
    ElementsOfCrimeDigest:{ 
        icon:"lexitus-icons38-Eocd", 
        baseSlug:"elements-of-crime",
        contentType:"HTML",
    },
    ElementsOfCrime:{ 
        icon:"lexitus-icons38-Eoc",
        baseSlug:"elements_digest",
        contentType:"HTML",
        
    },
    MeansOfProofDigest:{ 
        icon:"lexitus-icons38-Mopd", 
        baseSlug:"means-proof-digest",
        contentType:"HTML"
    
    },
}; 