import axios from "axios";
import queryString from "query-string";
import type { JSONType } from "./Typings/@types";
import type { AxiosError, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create();

export const request = async <T = Record<string, any>>(
    config: AxiosRequestConfig,
    _log = true,
): Promise<T> => {
    if (!axiosInstance.defaults.baseURL) {
        return Promise.reject(new Error("Error: Base Url is not provided"));
    }

    const resp = await axiosInstance.request<T>(config);
    return resp.data;
};

const AxiosUtils = {
    init() {
        axiosInstance.defaults.paramsSerializer = {
            serialize(params: JSONType) {
                if (typeof params !== "object") return params;
                const res: JSONType = {};
                for (const key of Object.keys(params)) {
                    if (typeof params[key] === "object") {
                        res[key] = JSON.stringify(params[key]);
                    } else {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        res[key] = params[key];
                    }
                }

                return queryString.stringify(res);
            },
        };
    },

    setBaseAPI_URL(url: string): void {
        axiosInstance.defaults.baseURL = url;
    },

    setHeader(type = "Content-Type", value = "application/json"): void {
        axiosInstance.defaults.headers.post[type] = value;
    },

    setAuthHeader(accessToken?: string): void {
        axiosInstance.defaults.headers.common.Authorization = accessToken ?? "";
    },

    throwError(error: AxiosError): void {
        throw error;
    },
};

export default AxiosUtils;
