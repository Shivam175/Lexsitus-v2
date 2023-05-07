import {  type ISignUpUser, type ILoginUser,  type User,  type UserWithAccessToken, type EditUserTypes } from "./@types";
import { request } from "AxiosUtils";
import { type EmptyReadingList } from "Models/ReadingList/@types";
import { type JSONType } from "Typings/@types";

const BASE_PATH = "/users";
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UsersModel {
    static registerUser = async (usersData: ISignUpUser) =>
        request<User>({
            url: BASE_PATH,
            method: "POST",
            data: usersData,
        });

    static loginUser = async (usersData: ILoginUser) =>
        request<UserWithAccessToken>({
            url: `${BASE_PATH}/login`,
            method: "POST",
            data: usersData,
        });

    static getCurrentUser = async () =>
        request<User>({
            url: `${BASE_PATH}/current`,
            method: "GET",
        });

    static resetUserPassword = async (email: string) =>
        request<any>({
            url: `${BASE_PATH}/reset`,
            method: "POST",
            data: email,
        });

    static logoutUser = async () =>
        request<void>({
            url: `${BASE_PATH}/logout`,
            method: "POST",
        });

    static createReadingList = async (id: string) =>
        request<EmptyReadingList>({
            url: `${BASE_PATH}/${id}/add-reading-list`,
            method: "POST",
            data: { id },
        });

    static getUserById = async (id: string)=>request<User>({
        url:`${BASE_PATH}/${id}`,
        method:"GET",
    });

    static getAllUsersList = async () =>
        request<User[]>({
            url: `${BASE_PATH}/get-list`,
            method: "GET",
            params:{
                filter: { "fields":["id", "firstName", "lastName", "full_name"] }
            }
        });    

    static updateUser = async (id: string, data: EditUserTypes) =>
        request<User[]>({
            url: `${BASE_PATH}/${id}`,
            method: "PUT",
            data,
        });   
        
    static updateUserRole = async (id: string, data: JSONType) =>
        request<User[]>({
            url: `${BASE_PATH}/update-roles`,
            method: "POST",
            params:{ id },
            data,
            
        });    

    static isUserValid = async (params: JSONType) =>
        request<{ id: string }>({
            url: `${BASE_PATH}/findOne`,
            method: "GET",
            params,
            
            
        });    

}

export default UsersModel;
