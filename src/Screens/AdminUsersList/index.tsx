import { type FC } from "react";
import UsersList from "./UsersList";
import AppDialogProvider from "Context/AppDialog";
import PageTemplate from "Feature/PageTemplate";

const AdminUsersList: FC = () => (
    <PageTemplate>
        <AppDialogProvider>
            <UsersList />
        </AppDialogProvider>
    </PageTemplate>
);

export default AdminUsersList;