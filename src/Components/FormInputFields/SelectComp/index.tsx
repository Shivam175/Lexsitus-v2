/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FormikProps } from "formik";
import { type FC } from "react";
import styles from "./index.module.scss";
import { getFieldError, type IFieldProps } from "Components/Form";
import Typography from "Components/Typography";

export interface IOptions {
    value: string;
    label: string;
}

export interface ISelectCompProps {
    formikProps: FormikProps<any>;
    fieldProps: IFieldProps;
    valuekey: string;
    className?: string;
}

export const SelectComp: FC<ISelectCompProps> = ({
    formikProps,
    fieldProps,
    valuekey,
    className,
}) => {
    const fieldError = getFieldError(valuekey, formikProps);

    return (
        <div className={styles.selectcontainer}>
            <select
                name={valuekey}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                defaultValue={fieldProps.label}
                value={formikProps.values.name}
                className={className}
            >
                <option
                    value={fieldProps.label}
                    disabled
                    label={fieldProps.label}
                />
                {fieldProps.options?.map((option, index) => (
                    <option
                        key={index}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </select>
            {fieldError && typeof fieldError === "string" ? (
                <Typography className={styles.error}>{fieldError}</Typography>
            ) : null}
        </div>
    );
};
