import { type PdfMetaData } from "Models/Tabs/@types";


export const getCitationText = (metadata: PdfMetaData[] | undefined) =>  {
   
    const pdfConfig = {
        title:"",
        presistentUrl:"",
        externalIdentifier:"",
        date:"",
    };
    metadata?.forEach(data=>{
        if (data.name === "Persistent URL") pdfConfig.presistentUrl = data.val;
        if (data.name === "External identifier") pdfConfig.externalIdentifier = data.val;
        if (data.name === "Title") pdfConfig.title = data.val;
        if (data.name === "Date created")pdfConfig.date = data.val;
    });

  
    const text = `${pdfConfig.title}, ${pdfConfig.externalIdentifier}, ${pdfConfig.date} (${pdfConfig.presistentUrl}).`;
   
    return text;
    
   
};
