/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type MenuConfig, type MenuItems } from "./@types";
import { request } from "AxiosUtils";

const BASE_PATH = "/menuItems";
class MenuItem {
    static getMenuItem = async (slug: string) =>
        request<MenuItems>({
            url: `${BASE_PATH}/findOne`,
            method: "GET",
            params: { filter: { where: { id: slug } } },
        });

    static findById = async (id: string) =>
        request<MenuConfig>({
            url: `${BASE_PATH}/${id}`,
            method: "GET",
            params: {
                filter: {
                    fields: ["id", "text", "item_slug", "slug"],
                },
            },
        });
}

export default MenuItem;
