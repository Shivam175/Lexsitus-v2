import { type FC, type PropsWithChildren } from "react";
import Header from "Feature/Header";
import { type HeaderProps } from "Feature/Header/@types";
import Footer from "Feature/Footer";

interface PageTemplateProps {
    isFooter?: boolean;
}
const PageTemplate: FC<HeaderProps & PageTemplateProps & PropsWithChildren> = (props) => {
    const { children, isLeftHeader = true, isTransparent = false, isRightHeader = true, isFooter = false } = props;
    return (
        <>
            <Header isLeftHeader={isLeftHeader} isTransparent={isTransparent} isRightHeader={isRightHeader} />
            {children}
            {isFooter ? <Footer /> : null}
        </>
    );
};
export default PageTemplate;