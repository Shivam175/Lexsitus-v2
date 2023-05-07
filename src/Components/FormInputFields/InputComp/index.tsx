import { type FormikProps } from "formik";
import { type FC } from "react";
import styles from "./index.module.scss";
import { getFieldError, type IFieldProps } from "Components/Form";
import Typography from "Components/Typography";

export interface IInputCompProps {
    formikProps: FormikProps<any>;
    type: string;
    valuekey: string;
    fieldProps: IFieldProps;
}

export const InputComp: FC<IInputCompProps> = ({
    formikProps,
    fieldProps,
    valuekey,
    type,
}) => {
    const fieldError = getFieldError(valuekey, formikProps);

    return (
        <div className={styles.inputcontainer}>
            <label htmlFor={valuekey}>{fieldProps.label}</label>
            <input
                id={valuekey}
                className={styles.input}
                name={valuekey}
                type={type}
                placeholder={fieldProps.placeholder}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                autoComplete="off"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                value={formikProps.values.name}
            />

            {fieldError && typeof fieldError === "string" ? (
                <Typography className={styles.error}>{fieldError}</Typography>
            ) : null}
        </div>
    );
};
