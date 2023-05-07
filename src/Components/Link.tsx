import { type FC, type PropsWithChildren } from "react";
import { type LinkProps, Link as DomLink } from "react-router-dom";
import { useCurrentLanguage } from "Hooks/useTranslation";

interface ILinkProps {
    isPrefixLanguage?: boolean;
}
const Link: FC<LinkProps & ILinkProps & PropsWithChildren> = (props) => {
    const { language } = useCurrentLanguage();
    const { to, children, isPrefixLanguage = true, ...linkProps } = props;
    const path = isPrefixLanguage ? `/${language}${to as string}` : to;
    return (
        <DomLink {...linkProps} to={path}>
            {children}
        </DomLink>
    );
};

export default Link;
