/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { request } from "AxiosUtils";
import config from "Config";

const BASE_URL: string = config.get("BASE_URL");

class TabModel {
    static getIntroHtml = async (ln: string, path: string) =>
        request<string>({
            url: `/intros/${ln}/${path}.html`,
            baseURL: BASE_URL,
            method: "GET",
        });
}

export default TabModel;
