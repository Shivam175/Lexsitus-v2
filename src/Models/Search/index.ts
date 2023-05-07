import { type Search } from "./@types";
import { request } from "AxiosUtils";
import { type JSONType } from "Typings/@types";



// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class SearchModel {
 

    static getAllSearchItem = async (params?: JSONType) => request<Search>({
        url: "/search",
        method: "GET",
        baseURL:"https://dev.cilrap-lexsitus.org",
        params,
    });

    static trackSearch = async (data: JSONType) => request<any>({
        url: "/search-tracks",
        method: "POST",
        data
    });
   
}

export default SearchModel;
