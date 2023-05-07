/* eslint-disable @typescript-eslint/no-extraneous-class */
import { request } from "AxiosUtils";
import { type PdfEntity } from "Models/Tabs/@types";
import { type JSONType } from "Typings/@types";

 
const BASE_URL = "/toeapp-documents";
class ToeAppModel {
    static findById = async (params?: JSONType) =>
        request<PdfEntity>({
            url: `${BASE_URL}/findOne`,
            method: "GET",
            params,
        });

    static getDocumentById = async (docId: string) =>
        request<PdfEntity>({
            url: `${BASE_URL}/${docId}`,
            method: "GET",
        });
}

export default ToeAppModel;
