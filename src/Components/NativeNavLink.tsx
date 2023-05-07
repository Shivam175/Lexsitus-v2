import { type FC, type PropsWithChildren } from "react";
import { type NavLinkProps, NavLink as DomNavLink } from "react-router-dom";
import { useCurrentLanguage } from "Hooks/useTranslation";

interface NativeNavLinkProps {
    isPrefixLanguage?: boolean;
}
const NativeNavLink: FC<
NavLinkProps & NativeNavLinkProps & PropsWithChildren
> = (props) => {
    const { language } = useCurrentLanguage();
    const { to, children, isPrefixLanguage = true, ...NavLinkProps } = props;
    const path = isPrefixLanguage ? `/${language}${to as string}` : to;
    return (
        <DomNavLink {...NavLinkProps} to={path}>
            {children}
        </DomNavLink>
    );
};

export default NativeNavLink;
