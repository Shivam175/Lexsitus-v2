import { useContext, type FC } from "react";
import { LibraryContext } from "Feature/Library/Context";
import Layout from "Screens/Library/Layout/index";

const TabContent: FC = () => {
    const { tabComponent } = useContext(LibraryContext);
    return (
        <>
            {tabComponent}
            <Layout />
        </>
    );
};

export default TabContent;
