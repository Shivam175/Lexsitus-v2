import { type FormikProps } from "formik";
import { type FC } from "react";
import styles from "./index.module.scss";
import { getFieldError } from "Components/Form";
import { type IFieldProps } from "Components/Form";
import Typography from "Components/Typography";

export interface RadioInputProps {
    formikProps: FormikProps<any>;
    fieldProps: IFieldProps;
    valuekey: string;
    className?: string;
}

const RadioInput: FC<RadioInputProps> = ({
    formikProps,
    fieldProps,
    valuekey,
}) => {
    const fieldError = getFieldError(valuekey, formikProps);

    return (
        <div className={styles["radio-input-root"]}>
            <div className={styles["radio-btn-container"]}>
                <ul className={styles["options-list"]}>
                    {fieldProps.options?.map((option, index) => (
                        <li key={index} className={styles["options-list-item"]}>
                            <div className={styles["radio-input"]}>
                                <input
                                    type="radio"
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    name={valuekey}
                                    value={option.value}
                                    id={option.value}
                                />
                                <label htmlFor={option.value}>
                                    {option.label}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
                {fieldError && typeof fieldError === "string" ? (
                    <Typography className={styles["error-msg"]}>
                        {fieldError}
                    </Typography>
                ) : null}
            </div>
        </div>
    );
};

export default RadioInput;
