import clsx from "clsx";
import { useEffect, useRef, type FC } from "react";
import styles from "./index.module.scss";
import BdoHandler from "Components/BdoHandler";
import "./digest-quill-styles.scss";

export interface HtmlDocumentProps {
    data: string;
    isTabIntroPage?: boolean;
}

const HtmlDocument: FC<HtmlDocumentProps> = ({
    data,
    isTabIntroPage = false,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (data) scrollRef.current?.scrollTo(0, 0);
    }, [data]);

    return (
        <BdoHandler>
            <div
                ref={scrollRef}
                className={`w-full h-full ${clsx(styles.HtmlDocument, {
                    windowHtmlDocument: !isTabIntroPage,
                })}`}
                dangerouslySetInnerHTML={{ __html: data }}
            />
        </BdoHandler>
    );
};

export default HtmlDocument;
