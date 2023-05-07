/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type EditMenuNode, type SnapshotsMenus } from "./@types";
import { request } from "AxiosUtils";
import { type JSONType } from "Typings/@types";

 
const BASE_PATH = "/snapshotMenus";
class SnapshotMenusModel {
    static getSnapshotMenu = async (type: string) =>
        request<SnapshotsMenus[]>({
            url: `${BASE_PATH}`,
            method: "GET",
            params: { filter: { where: { type } } },
        });

    static getEditableMenuNode = async (params: JSONType) =>
        request<EditMenuNode>({
            url: `${BASE_PATH}/edit-menu-nodes`,
            method: "GET",
            params,
        });

    static editNodeTabList = async (payload: JSONType) =>
        request<string>({
            url: `${BASE_PATH}/change-node-status`,
            method: "POST",
            data: payload,
        });

    static editNodeText = async (payload: JSONType) =>
        request<{ ok: boolean }>({
            url: `${BASE_PATH}/change-node-text`,
            method: "POST",
            data: payload,
        });
}

export default SnapshotMenusModel;
