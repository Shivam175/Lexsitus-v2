import { type userType } from "Models/Users/@types";

export const saveClientData = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const getClientData = (key: string) => localStorage.getItem(key);

export const deleteClientData = (key: string) =>  {
    localStorage.removeItem(key);
};

export const isAuthor = (userType?: userType[])=>{
    if (userType?.includes("AUTHOR")) return true;
    return false;
};