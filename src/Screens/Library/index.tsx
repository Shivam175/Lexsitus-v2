import { useContext, type FC } from "react";
import GlobalDrawer from "./Drawer";
import TabContent from "./TabContent";
import { AppDialogContext } from "Context/AppDialog";
import CasePrepDialog from "Feature/CasePrepDialog";
import LibraryContextProvider, {
    LibraryContext,
} from "Feature/Library/Context";
import LibrarySearchDialog from "Feature/Library/LibrarySearchDialog";
import SecondaryHeader from "Feature/Library/SecondaryHeader";
import LibraryTabs from "Feature/LibraryTabs";
import PageTemplate from "Feature/PageTemplate";

const LibraryContent: FC = () => {
    const { setGlobalMenuNode, libraryComponentKey } =
        useContext(LibraryContext);
    const { showAppDialog, closeAppDialog } = useContext(AppDialogContext);

    return (
        <PageTemplate key={libraryComponentKey.toString()}>
            <SecondaryHeader
                onChange={() => {
                    showAppDialog(
                        <LibrarySearchDialog closeAppDialog={closeAppDialog} />,
                        {
                            closeBtnStyle:
                                "w-[22px] h-[22px] bg-white rounded-full !top-5 !right-5",
                            modalWrapperClass: "!block",
                        }
                    );
                }}
            />

            <LibraryTabs />
            <GlobalDrawer
                onClickPrep={(menuid) => {
                    showAppDialog(<CasePrepDialog menuId={menuid} />);
                }}
                onPopulateTabs={setGlobalMenuNode}
            />
            <TabContent />
        </PageTemplate>
    );
};

const Library: FC = () => (
    <LibraryContextProvider>
        <LibraryContent />
    </LibraryContextProvider>
);

export default Library;
