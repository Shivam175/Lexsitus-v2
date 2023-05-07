/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {  type FormikProps } from "formik";
import React, { type FC } from "react";
import styles from "./index.module.scss";
import { getFieldError } from "Components/Form";
import { type IFieldProps } from "Components/Form";
import Typography from "Components/Typography";

export interface TextBoxInputProps {
    formikProps: FormikProps<any>;
    fieldProps: IFieldProps;
    type: string;
    valuekey: string;
    className?: string;
}

const TextBoxInput: FC<TextBoxInputProps> = ({
    formikProps,
    fieldProps,
    valuekey
    
    ,
}) => {
    const fieldError = getFieldError(valuekey, formikProps);

    return (
        <div className={styles["root-container"]}>
            <div className={styles["textbox-container"]}>
                <label htmlFor={valuekey} className={styles["label-text"]}>
                    {fieldProps.label}
                </label>
                <textarea
                    className={styles.textbox}
                    id={valuekey}
                    name={valuekey}
                    placeholder={fieldProps.placeholder}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    autoComplete="off"
                    value={formikProps.values.issue}
                />
                {fieldError && typeof fieldError === "string" ? (
                    <Typography className={styles["error-msg"]}>
                        {fieldError}
                    </Typography>
                ) : null}
            </div>
        </div>
    );
};

export default TextBoxInput;
