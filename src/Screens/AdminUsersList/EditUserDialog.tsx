import clsx from "clsx";
import { type FC } from "react";
import { ReactForm } from "react-forms-lite";
import styles from "./index.module.scss";
import { findRoleUpdateType, getEditUserDialogConfig, getUpdatedUser, validationSchemas, } from "./utils";
import Typography from "Components/Typography";
import UsersModel from "Models/Users";
import { type User } from "Models/Users/@types";
import { isAuthor } from "utils";
import { logger } from "utils/logger";


const EditUserDialog: FC<{ user?: User; closeAppDialog: () => void }> = ({ user, closeAppDialog }) => {

    const initialValues: Partial<User> & { password?: string } = { ...user };


    const handleSubmit = async (values: Partial<User> & { password?: string }) => {

        try {
            if (!user) return;
            const updatedUser = await getUpdatedUser(user, values);
            const currentRoleStatus = await findRoleUpdateType(values);

            if (Object.keys(updatedUser).length !== 0) await UsersModel.updateUser(user?.id, updatedUser);
            if (isAuthor(user?.user_types) && (values.user_types !== user?.user_types)) {
                await UsersModel.updateUserRole(user.id, {
                    updateType: currentRoleStatus,
                    id: user.id,
                    roles: ["AUTHOR"],

                });
            }

            closeAppDialog();
        } catch (err: unknown) {
            logger.log(err);
        }
    };


    const cls = clsx("w-[800px]", "bg-white2", "rounded-md", "p-4", "text-base", "leading-6", "my-0", "mx-auto", styles["user-dialog"]);

    return (
        <div className={cls}>
            <Typography variant="h2" className={styles.heading}>Edit User</Typography>
            <ReactForm
                config={getEditUserDialogConfig(user)}
                initialValues={initialValues}
                validationSchema={validationSchemas}
                onSubmit={handleSubmit}
                formId="edituser-form"
                actionConfig={{ submitButtonLayout: "right", submitButtonText: "SUBMIT" }}
            />
        </div>
    );

};

export default EditUserDialog;