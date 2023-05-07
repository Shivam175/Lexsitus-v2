import { type FC } from "react";
import { ReactForm } from "react-forms-lite";
import * as Yup from "yup";
import styles from "./index.module.scss";
import Typography from "Components/Typography";
import useMessageDialog from "Hooks/useMessageDialog";
import UsersModel from "Models/Users";


const initialValues = {
    email: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email!").required("Required"),
});

const myConfig = [
    {
        type: "text",
        valueKey: "email",
        fieldProps: { label: "", placeholder: "E-mail" },
    },
];

const ForgotPassword: FC = () => {
    const { showMessageDialog } = useMessageDialog();

    const handleForgotPassword = async (
        values: Partial<{ email: string }>,
    ) => {
        try {
            await UsersModel.resetUserPassword(values as string);
            showMessageDialog({
                heading: "Email Sent",
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                message: `An email has been sent to ${values.email}`,
            });
        } catch (err: unknown) {
            showMessageDialog({
                heading: "Error",
                message: "Could not reset password. Please try again.",
            });
        }
    };

    return (
        <div className={styles.ForgotPassword}>
            <div className={styles.form_content}>
                <Typography variant="h3">Forgot Password</Typography>
                <ReactForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleForgotPassword}
                    config={myConfig}
                    formId="forgotPasswword-form"
                    actionConfig={{ submitButtonLayout: "fullWidth", submitButtonText: "SEND EMAIL" }}

                />
            </div>
        </div>
    );
};

export default ForgotPassword;
