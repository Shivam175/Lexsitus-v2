import { type ElementDigestItem } from "./@types";
import { request } from "AxiosUtils";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ElementsDigestModel {
    static findById = async (id: string) =>
        request<ElementDigestItem>({
            url: "/elements-crime-digest/findOne",
            method: "GET",
            params: { filter: { where: { id } } },
        });
}

export default ElementsDigestModel;
