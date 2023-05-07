import { isAxiosError } from "axios";
import { debounce } from "lodash";
import * as Yup from "yup";
import CliccModel from "Models/Tabs/Clicc";
import UsersModel from "Models/Users";
import { type EditUserTypes, type User } from "Models/Users/@types";
import { isAuthor } from "utils";

export const getEditUserDialogConfig = (user?: User ) =>[
    
    [{
        type: "text",
        valueKey: "firstName",
        fieldProps: {
            label: "",
            placeholder: "first Name",
        },
    },
    {
        type: "text",
        valueKey: "lastName",
        fieldProps: {
            label: "",
            placeholder: "last Name",
        },
    },
    ],
    [{
        type: "text",
        valueKey: "email",
        fieldProps: { label: "", placeholder: "E-mail" },
    },
    {
        type: "password",
        valueKey: "password",
        fieldProps: { label: "", placeholder: "Password" },
    },
    ],
    {
        type: "checkbox",
        valueKey: "user_types",
        fieldProps: {
            options: [{ name: "Author", value: "AUTHOR", checked: isAuthor(user?.user_types) }],
        }
    },
    {
        type: "commentaries",
        valueKey: "commentaryIds",
        fieldProps: {
            async getCommentaries() {
                if (!user?.commentaryIds) return [];
                const data = await CliccModel.filterCommentariesById(user?.commentaryIds);
                return data;
            },
        }

    }

];

const isUserExist = async (email: string)=>{
    try {
        const { id } = await  UsersModel.isUserValid({ filter: { "where":{ email }, "fields":["id"] } });       
        return Boolean(id);
    } catch (error) {
        if (isAxiosError(error)) return false;
        throw error;
    }
   
    
};

const debouncedUserCheck = debounce(isUserExist, 400);

export const validationSchemas = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email!").required("Required").test("is User valid", "Email is not unique", async function (email: any) {
        const { path, createError } = this;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            if (Boolean(email) && typeof email !== "string") reject(createError({ path, message: "Email is not unique" }));
            const isExist = await debouncedUserCheck(email) ;
            if (!isExist && isExist !== undefined) {
       
                reject(createError({ path, message: "Email is not unique" }));
            }

            resolve(true);
        });
    } 
    
    )
});




// To find that author role has been removed or added
export const findRoleUpdateType = async (currentUserValues: EditUserTypes)=>{
    if (isAuthor(currentUserValues?.user_types)) {
        return "add";
    }

    if (currentUserValues.user_types?.length === 0) {
        return "remove";
    }
};

export const getUpdatedUser = async (user: User, currentUserValues: Partial<User> & { password?: string })=>{
    const { firstName, lastName, email, password, commentaryIds   } = currentUserValues;
    const updatedUser: Partial<User> & { password?: string } = {};
    if (user.firstName !== firstName && firstName) updatedUser.firstName = firstName;
    if (user.lastName !== lastName && lastName) updatedUser.lastName = lastName;
    if (user.email !== email && email) updatedUser.email = email;
    if (user.commentaryIds !== commentaryIds && commentaryIds) updatedUser.commentaryIds = commentaryIds;
    if (password) updatedUser.password = password;


    return updatedUser;
};

export const getFulluserName = (user: User)=>{
    const { firstName, lastName = "" } = user;
    if (firstName) return `${firstName} ${lastName}`;
   
    return "";
};