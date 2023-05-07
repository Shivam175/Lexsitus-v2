// Import { request } from "Resources/AxiosUtils";

import { type TAppConstants } from "./@types";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModel {
    static getAppConstants = (): TAppConstants =>
        /* Replace with actual axios call to get App constants like this:
    request({
      url: "/app-constants",
      method: "GET",
    });    
    */
        new Promise((resolve) => {
            setTimeout(() => {
                resolve({});
            }, 1000);
        });
}

export default AppModel;
