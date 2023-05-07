import clsx from "clsx";
import { useEffect, useState, useContext, type FC } from "react";
import EditUserDialog from "./EditUserDialog";
import { USERS_PER_PAGE } from "./constants";
import styles from "./index.module.scss";
import { getFulluserName } from "./utils";
import Button from "Components/Button";
import Pagination from "Components/Pagination";
import { AppDialogContext } from "Context/AppDialog";
import UsersModel from "Models/Users";
import { type User } from "Models/Users/@types";
import { logger } from "utils/logger";

const UsersListItem: FC<{
    user: User; handleClick: (id: string) => Promise<void>;
}> = ({ user, handleClick }) => (

    <li className="flex pl-7 py-2 pr-5 justify-between border-b-[1px] border-b-grey5">
        {
            <span>{getFulluserName(user)}{"    "}</span>
        }
        <Button
            className="material-icons float-right text-blue2"
            onClick={() => {
                void handleClick(user?.id);
            }}

        >edit</Button>
    </li>


);

const UsersList: FC = () => {
    const { showAppDialog, closeAppDialog } = useContext(AppDialogContext);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [indexOfSecondPageFirstUser, setIndexOfSecondPageFirstUser] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [UsersListPerPage, setUsersListPerPage] = useState<User[]>([]);


    const getUsersList = async () => {
        const data = await UsersModel.getAllUsersList();
        setTotalPages(data.length);
        setUsersList(data);
    };

    const getSliceUsersList = () => {
        const indexOfLastUser = indexOfSecondPageFirstUser + USERS_PER_PAGE;
        const slicedUserList = usersList.slice(indexOfSecondPageFirstUser, indexOfLastUser);
        setUsersListPerPage(slicedUserList);
    };

    const handleEditClick = async (id: string) => {
        const userData = await UsersModel.getUserById(id);
        showAppDialog(<EditUserDialog user={userData} closeAppDialog={closeAppDialog} />, { isOverFlow: true });
    };



    useEffect(() => {
        getUsersList().catch((err: unknown) => {
            logger.log(err);
        });
    }, []);

    useEffect(() => {
        getSliceUsersList();
    }, [indexOfSecondPageFirstUser, usersList]);



    return (
        <div className={clsx("bg-lxsGrey4 absolute inset-0 pt-10 overflow-auto", styles.userList)}>
            <ul className="max-w-[500px] my-0 mx-auto bg-white">
                <li className="flex pl-7 py-2 pr-5 justify-between border-b-[1px] border-b-grey5">
                    <span>Users</span>
                    <Button className="material-icons float-right text-blue2" onClick={() => {
                        showAppDialog(<EditUserDialog closeAppDialog={closeAppDialog} />, { isOverFlow: true });
                    }}>add</Button>
                </li>
                {
                    UsersListPerPage?.map(user => (
                        <UsersListItem user={user} key={user.id} handleClick={handleEditClick} />
                    ))
                }
                <div className="mb-10">
                    {totalPages > 10 ?
                        <Pagination totalPages={totalPages} perPageItem={USERS_PER_PAGE} onClick={(num: number) => {
                            setIndexOfSecondPageFirstUser(num * USERS_PER_PAGE);
                        }} /> : null}
                </div>
            </ul>

        </div>
    );
};

export default UsersList;