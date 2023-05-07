export interface TimeStamp {
    created: string;
    updated: string;
}

 
export type JSONType = Record<string, any>;

export interface BaseEntity extends TimeStamp {
    id: string;
}

export interface NameValuePair<T = string> {
    name: string;
    value: T;
}
