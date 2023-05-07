import { useEffect, useState } from "react";
import AxiosUtils from "./AxiosUtils";
import config from "./Config";
import UsersModel from "Models/Users";
import { useStoreActions } from "Stores";
import { CLIENT_ACCESS_TOKEN_KEY, CLIENT_USER_ID_KEY } from "constants/app";
import { deleteClientData, getClientData } from "utils";

const useBoot = () => {
    const [isBootComplete] = useState<boolean>(false);
    const { setUser } = useStoreActions(({ UserStore: { setUser } }) => ({
        setUser,
    }));
    AxiosUtils.setBaseAPI_URL(config.get("API_URL"));
    AxiosUtils.init();

    const loadUser = async () => {
        try {
            const user = await UsersModel.getCurrentUser();
            setUser(user);
        } catch (err: unknown) {
            AxiosUtils.setAuthHeader();
            deleteClientData(CLIENT_ACCESS_TOKEN_KEY);
            deleteClientData(CLIENT_USER_ID_KEY);
        }
    };

    useEffect(() => {
        const accessToken = getClientData(CLIENT_ACCESS_TOKEN_KEY);
        if (accessToken) {
            AxiosUtils.setAuthHeader(accessToken);
            void loadUser();
        }
    }, []);

    return { isBootComplete };
};

export default useBoot;
