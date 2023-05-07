/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {  type FormikProps } from "formik";
import { type FC } from "react";
import styles from "./index.module.scss";
import { getFieldError } from "Components/Form";
import { type IFieldProps } from "Components/Form";
import Typography from "Components/Typography";

export interface ReportIssueInputProps {
    formikProps: FormikProps<any>;
    fieldProps: IFieldProps;
    type: string;
    valuekey: string;
    className?: string;
}

const ReportIssueInput: FC<ReportIssueInputProps> = ({
    formikProps,
    fieldProps,
    valuekey,
    type
    ,
}) => {
    const fieldError = getFieldError(valuekey, formikProps);
    return (
        <div className={styles["input-root"]}>
            <div className={styles["input-container"]}>
                <label htmlFor={valuekey} className={styles["label-text"]}>
                    {fieldProps.label}
                </label>
                <input
                    className={styles["input-text-field"]}
                    id={valuekey}
                    name={valuekey}
                    type={type}
                    placeholder={fieldProps.placeholder}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    autoComplete="off"
                    value={formikProps.values.valuekey}
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

export default ReportIssueInput;
