import React, { type FC } from "react";
import { ReactForm, attachField } from "react-forms-lite";
import * as Yup from "yup";
import styles from "./index.module.scss";
import Button from "Components/Button";
import Typography from "Components/Typography";


const TextArea: FC = () => (
    <textarea className=" border-grey11 border-2 w-full min-h-[100px] " placeholder="Tell us the issue.." />
);

attachField("textbox", <TextArea />);

export interface ReportIssueCardProps {
    onClose: () => void;
    onSubmitIssue: () => void;
}

export interface IReportIssue {
    issueCategory: string;
    text: string;
    email: string;
    issue: string;
}

const initialValues = {
    issueCategory: "",
    text: "",
    email: "",
    issue: "",
};

const validationSchema: Yup.SchemaOf<IReportIssue> = Yup.object().shape({
    issueCategory: Yup.string().required("Required"),
    text: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    issue: Yup.string().required("Required"),
});

const myConfig = [
    {
        type: "radio",
        valueKey: "issueCategory",
        fieldProps: {
            options: [
                { name: "Content", value: "content" },
                { name: "Other Issue", value: "otherIssue" },
            ],
        },
    },

    {
        type: "text",
        valueKey: "text",
        fieldProps: {
            label: "",
            placeholder: "Name",
        },
        classNames: "mb-0 mt-0"
    },

    {
        type: "text",
        valueKey: "email",
        fieldProps: { label: "", placeholder: "E-mail" },

    },
    {
        type: "textbox",
        valueKey: "issue"
    },
];

const ReportIssueCard: FC<ReportIssueCardProps> = (props) => {
    const { onClose, onSubmitIssue } = props;
    const handleSubmit = () => {
        // Comment - logger.log("Issue reported.", values);
        onSubmitIssue();
    };

    return (
        <div className={styles["issue-card-root"]}>
            <Typography variant="h6" className={styles["issue-card-heading"]}>
                Report Issue
            </Typography>
            <Button
                className={styles["card-close-button"]}
                onClick={() => {
                    onClose();
                }}
            >
                <i className="material-icons">close</i>
            </Button>
            <div>
                <ReactForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    config={myConfig}
                    formId="login-form"
                    actionConfig={{ submitButtonLayout: "center", submitButtonText: "Send", containerClassNames: styles.submitbutton }}


                />
            </div>
        </div>
    );
};

export default ReportIssueCard;
