import { type PropsWithChildren, type FC } from "react";
import { useCurrentLanguage } from "Hooks/useTranslation";

const BdoHandler: FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const { language } = useCurrentLanguage();
    return (
        <>
            {language === "fa" || language === "ar" ? (
                <bdo dir="rtl">
                    <div>{children}</div>
                </bdo>
            ) : (
                children
            )}
        </>
    );
};

export default BdoHandler;
