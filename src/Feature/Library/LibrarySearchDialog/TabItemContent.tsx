import { type FC } from "react";
import { type TabDocTypes, type HtmlSearchTabContentProps, type PdfSearchTabContentProps, type VideoSearchTabContentProps } from "./@types";
import styles from "./index.module.scss";
import { getClippedText, itemConfiguration } from "./utils";

import IconsWithText from "Components/IconsWithText";
import Link from "Components/Link";
import MetaDataItem from "Components/MetaDataItem";
import Typography from "Components/Typography";
import { type PdfMetaData, type VideoMetaData, type SearchResultItem } from "Models/Search/@types";

const getHtmlContent = (props: HtmlSearchTabContentProps) => {
    const { link, closeAppDialog, header, title, text } = props;
    return (
        <div className="text-left">
            <div className="ml-4">
                <Typography className="!text-color_clicc !text-xl">
                    <Link to={link} onClick={closeAppDialog}>
                        {header ?? title}
                    </Link>
                </Typography>
                <p className={styles.links}
                    dangerouslySetInnerHTML={{
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        __html: getClippedText(text),
                    }}
                />
            </div>
        </div>
    );
};

const getPdfContent = (props: PdfSearchTabContentProps) => {
    const { link, closeAppDialog, title, metaDataKeys, metadata } = props;
    return (
        <div className="text-left !font-fontFamilyBlack">
            <Typography className="!text-color_clicc !text-xl ml-2">
                <Link
                    to={link}
                    onClick={closeAppDialog}
                >
                    {title}
                </Link>
            </Typography>
            {
                metaDataKeys?.map((data, idx) => <div key={idx}>
                    {
                        metadata.map((arr, idx) => {
                            const valuesArray = Object.values(arr) as string[];

                            if (valuesArray[0] === data) return (<MetaDataItem heading={valuesArray[0]} key={`${valuesArray[0]}-${idx}`} text={valuesArray[1]} linkIdentificationWord="http" />);

                            return <></>;
                        })
                    }
                </div>)
            }
        </div>
    );
};

const getVideoConent = (props: VideoSearchTabContentProps) => {
    const { link, closeAppDialog, title, metadata } = props;
    return (
        <div className="text-left !font-fontFamilyBlack">
            <Typography className="!text-color_clicc !text-xl ml-2">
                <Link
                    to={link}
                    onClick={closeAppDialog}
                >
                    {title}
                </Link>
            </Typography>
            {
                Object.entries(metadata).map(([key, value], idx) => <MetaDataItem key={`${key}-${idx}`} heading={key} text={value} />)
            }

        </div>
    );
};

const TabItemContent: FC<{ item: SearchResultItem; closeAppDialog: () => void }> = ({ item, closeAppDialog }) => {

    const { header, title, bodytext = "", doc_type, metadata } = item;

    const { contentType, baseSlug, icon, metaDataKeys = [] } = itemConfiguration[doc_type as TabDocTypes];

    const leafSlug = item.item_slug ?? item.id;
    const link = `/${baseSlug}/content/${leafSlug}`;

    const commonProps = { link, closeAppDialog, title };

    const htmlContentProps: HtmlSearchTabContentProps = { ...commonProps, header, text: bodytext };

    const pdfContentProps: PdfSearchTabContentProps = { ...commonProps, metadata: metadata as unknown as PdfMetaData[], metaDataKeys };

    const videoContentProps: VideoSearchTabContentProps = { ...commonProps, metadata: metadata as unknown as VideoMetaData, };

    const renderItem = () => {
        switch (contentType) {
            case "VIDEO":
                return getVideoConent({ ...videoContentProps });
            case "PDF":
                return getPdfContent({ ...pdfContentProps });

            case "HTML":
                return getHtmlContent({ ...htmlContentProps });
            default:
                return null;
        }
    };

    return (
        <div className="flex  w-3/5 py-3" key={item.id}>
            <div className="float-right mr-3 pt-1">
                <IconsWithText icon={icon} />
            </div>
            {renderItem()}
        </div>


    );
};

export default TabItemContent;