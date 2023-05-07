/* eslint-disable @typescript-eslint/naming-convention */
export type userType = "USER" | "AUTHOR";

export type RoleNamesType = "admin" | "AUTHOR" | "USER";

export interface User {
    commentaryIds: string[];
    created?: string;
    country: string;
    currentListId?: string;
    currentNoteId?: string;
    email: string;
    emailVerified: boolean;
    foundUsAt?: string;
    full_name: string;
    firstName?: string;
    lastName?: string;
    id: string;
    isRegistrationComplete?: boolean;
    roleNames: RoleNamesType[]; 
    user_types: userType[];
    accessTokenId: string;
}

export interface UserWithAccessToken {
    created: Date;
    ttl: number;
    id: string;
    userId: string;
}

export interface ISignUpUser {
    fullName: string;
    aboutLexsitus?: string;
    professionalAffiliation?: string;
    email: string;
    password: string;
    country: string;
}

export interface ILoginUser {
    email: string; 
    password: string;
}


export interface EditUserTypes {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    user_types?: userType[];
    commentaryIds?: string[];
}