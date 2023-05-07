import { type JSONType } from "Typings/@types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TAppConstants { }

export interface Params extends Record<string, any> {
    filter: {
        where?: JSONType;
        fields?: string | string[];
        order?: string | string[] | Record<string, any>;
    };
}