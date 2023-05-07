import React, { type FC } from "react";
import { PDFObject } from "react-pdfobject";
import styles from "./index.module.scss";
import Typography from "Components/Typography";
import { type PdfMetaData } from "Models/Tabs/@types";

export interface PdfDocumentProps {
    pdfUrl: string;
    isMetaData?: boolean;
    metadata: PdfMetaData[];
}

interface DisplayPdfProps {
    pdfUrl: string;
    height?: string;
}
const DisplayPdf: FC<DisplayPdfProps> = ({ pdfUrl, height = "100vh" }) => <PDFObject url={pdfUrl} height={height} />;

const PdfMetaDataContent: FC<Pick<PdfDocumentProps, "metadata">> = ({ metadata }) => (
    <>
        {metadata.map((data) => (
            <div className={styles.metaDataDiv} key={data.val}>
                <Typography className={styles.metaheading}>
                    {data.name}
                </Typography>
                <Typography className={styles.metatext}>
                    {data.val.includes("http") ? (
                        <a className={styles.link}>{data.val}</a>
                    ) : (
                        <span> {data.val} </span>
                    )}
                </Typography>
            </div>
        ))}
    </>
);

const PdfDocument: FC<PdfDocumentProps> = ({
    pdfUrl,
    isMetaData,
    metadata,
}) => {

    if (isMetaData) return <PdfMetaDataContent metadata={metadata} />;


    return (
        <div className="w-full h-full overflow-auto">
            <DisplayPdf pdfUrl={pdfUrl} />
        </div>
    );
};

export default PdfDocument;