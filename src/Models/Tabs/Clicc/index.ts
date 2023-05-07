import { type CommentarySearchListItem, type CliccItem } from "./@types";
import { request } from "AxiosUtils";
import { type MenuItems } from "Models/MenuItem/@types";
import { type JSONType } from "Typings/@types";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CliccModel {
    static getById = async (id: string) =>
        request<CliccItem>({
            url: "/commentaries/findOne",
            method: "GET",
            params: { filter: { where: { id } } },
        });

    static filterCommentariesById = async (commentaryIds: string[]) =>
        request<Array<Pick<CliccItem, "header" | "id">>>({
            url: "/commentaries",
            method: "GET",
            params: { filter: { "where":{ "id":{ "inq":commentaryIds } }, "fields":["id", "header"] } },
        });   

    static searchCommentaryList = async (params: JSONType) =>
        request<CommentarySearchListItem>({
            url: "/search",
            method: "GET",
            baseURL:"https://dev.cilrap-lexsitus.org",
            params
        });   

    static findMenuIdBySlug = async (slug: string) =>
        request<CliccItem>({
            url: "/menuItems/findOne",
            method: "GET",
            params: { filter: { "where":{ "id": slug, "and":[{ "or":[{ "menuTypes":"rpe" }, { "menuTypes":"RPECommentary" }] }] } } },
        });

    static getRpetId = async (menuIds: string[]) =>
        request<MenuItems[]>({
            url: "/menuItems",
            method: "GET",
            params: { filter: { "where":{ "id":{ "inq": menuIds }, "nodeType":"CONTENT" } } },
        });     
}

export default CliccModel;
