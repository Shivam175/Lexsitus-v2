import React, { type FC } from "react";
import { ReactForm } from "react-forms-lite";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "./index.module.scss";
import BackButton from "Components/BackButton";
import Button from "Components/Button";
import IconsWithText from "Components/IconsWithText";
import Typography from "Components/Typography";
import useMessageDialog from "Hooks/useMessageDialog";
import { type ILoginUser } from "Models/Users/@types";
import { useStoreActions } from "Stores";


export interface Error {
    code: string;
}


const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email!").required("Required"),
    password: Yup.string().required("Required"),
});

const myConfig = [
    {
        type: "text",
        valueKey: "email",
        fieldProps: { label: "", placeholder: "E-mail" },

    },
    {
        type: "password",
        valueKey: "password",
        fieldProps: { label: "", placeholder: "Password" },
    },
];

const LoginForm: FC = () => {
    const navigate = useNavigate();
    const { showMessageDialog } = useMessageDialog();

    const userLogin = useStoreActions(({ UserStore: { loginUser } }) => loginUser);

    const handleLogin = async (values: Partial<ILoginUser>) => {
        try {
            await userLogin(values as ILoginUser);
            navigate("/");
        } catch (err: unknown) {
            const { code } = err as Error;
            if (code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
                showMessageDialog({
                    heading: "Not Verified",
                    message: "Please check you email for verification link",
                });
            } else
                showMessageDialog({
                    heading: "Login Failed",
                    message: "Authentication failed. Please try again",
                });
        }
    };

    return (
        <div className={styles.LoginForm}>
            <div className={styles.form_content}>
                <div className={styles.heading}>
                    <BackButton />
                    <Typography variant="h3">Login</Typography>
                </div>
                <ReactForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                    config={myConfig}
                    formId="login-form"
                    actionConfig={{ submitButtonLayout: "fullWidth", submitButtonText: "LOGIN" }}

                />

                <Button link="/forgot-password">
                    Forgot your password?
                </Button>
                <div className={styles.socialdiv}>
                    <Typography variant="h5"> or sign with</Typography>
                    <div className={styles.socialmedia}>
                        <Button
                            link="/social-auth/facebook"
                            isPrefixLanguage={false}
                            isExternal={true}
                        >
                            <IconsWithText
                                icon="sm-icons-facebook"
                                className={styles.facebook}
                            />
                        </Button>
                        <Button
                            link="/social-auth/google"
                            isPrefixLanguage={false}
                            isExternal={true}
                        >
                            <IconsWithText
                                icon="sm-icons-google"
                                className={styles.google}
                            />
                        </Button>
                    </div>
                </div>
                <Typography variant="h5">Do you have an account?</Typography>
                <Button
                    link="/register"
                    className={styles.register_button}
                >
                    REGISTER
                </Button>
                <Typography variant="h5">
                    If you wish to delete your Lesitus user-account, please send
                    an e-mail to{" "}
                    <a href="mailto:info@cilrap.org">info@cilrap.org</a>
                </Typography>
            </div>
        </div>
    );
};

export default LoginForm;
