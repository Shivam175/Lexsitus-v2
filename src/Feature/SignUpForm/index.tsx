import React, { type FC } from "react";
import { ReactForm } from "react-forms-lite";
import * as Yup from "yup";
import styles from "./index.module.scss";
import BackButton from "Components/BackButton";
import Typography from "Components/Typography";
import useMessageDialog from "Hooks/useMessageDialog";
import UsersModel from "Models/Users";
import { type ISignUpUser } from "Models/Users/@types";
import { Countrylist } from "constants/countrylist";



// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignUpFormProps { }

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    country: "",
    aboutLexsitus: "",
    confirmPassword: "",
    professionalAffiliation: "",
};

interface ISignupForm extends ISignUpUser {
    confirmPassword: string;
}

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("invalid email!").required("Required"),
    password: Yup.string().min(6).required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "password not matched!")
        .required("Required"),
    country: Yup.string().required("Required"),
});

const countryOptionsSelectList = Countrylist.map((country) => ({
    value: country.name,
    name: country.name,
}));

const aboutLexsitusArray = [
    { value: "From an e-mail message", name: "From an e-mail message" },
    { value: "Through Twitter", name: "Through Twitter" },
    {
        value: "Through other social media",
        name: "Through other social media",
    },
    {
        value: "Through Internet search or browse",
        name: "Through Internet search or browse",
    },
    {
        value: "From a colleague or friend",
        name: "From a colleague or friend",
    },
    { value: "Other", name: "Other" },
];


const paragraphText = (
    <Typography>
        By registering a Lexsitus user-account, you consent to CILRAP storing
        your registration data (name, e-mail address, password, country,
        professional affiliation, and where you heard about Lexsitus) for the
        purpose of technically supporting your account, until you request that
        your account be deleted (by simply sending an e-mail to CILRAP at{" "}
        <a href="mailto:info@cilrap.org">info@cilrap.org</a>). Only CILRAP may
        see the registration data, which will not be sent outside the European
        Union. Questions (including corrections) concerning your Lexsitus
        user-account can be addressed to{" "}
        <a href="mailto:info@cilrap.org">info@cilrap.org</a>.
    </Typography>
);

const myConfig = [
    {
        type: "text",
        valueKey: "fullName",
        fieldProps: {
            label: "",
            placeholder: "Full name (capitalize your family name)",
        },
    },
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
    {
        type: "password",
        valueKey: "confirmPassword",
        fieldProps: { label: "", placeholder: "Confirm Password" },
    },
    {
        type: "select",
        valueKey: "country",
        fieldProps: {
            label: "",
            options: countryOptionsSelectList,
            emptyItem: "Country"
        },
    },
    {
        type: "text",
        valueKey: "professionalAffiliation",
        fieldProps: {
            label: "",
            placeholder: "Professional affiliation (if any)",
        },
    },

    {
        type: "select",
        valueKey: "aboutLexsitus",
        fieldProps: {
            label: "",
            options: aboutLexsitusArray,
            emptyItem: "Where did you hear about Lexsitus?"
        },
    },
    {
        type: "plaintext",
        valueKey: "plaintext",
        fieldProps: {
            text: paragraphText,
            classNames: "hello",
            disabled: true
        }
    },
];



const SignUpForm: FC<SignUpFormProps> = () => {
    const { showMessageDialog } = useMessageDialog();

    const handleRegister = async (values: Partial<ISignupForm>) => {
        const { confirmPassword, ...signupFormValues } = values;
        try {
            await UsersModel.registerUser(signupFormValues as ISignUpUser);

            showMessageDialog({
                heading: "Signed up successfully",
                message:
                    "Please check your email and click on the verification link to login.",
            });
        } catch (error: unknown) {
            showMessageDialog({
                heading: "Registration Failed",
                message: "Registration Failed. Please try again later",
            });
        }
    };

    return (
        <div className={styles.SignUpForm}>
            <div className={styles.form_content}>
                <div className={styles.heading}>
                    <BackButton />
                    <Typography variant="h3">Registration</Typography>
                </div>

                <ReactForm
                    config={myConfig}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                    formId="sign-up-form"
                    actionConfig={{ submitButtonLayout: "fullWidth", submitButtonText: "SUBMIT" }}
                />

            </div>
        </div>
    );
};

export default SignUpForm;
