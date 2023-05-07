import { useContext, type FC } from "react";
import TabItemContent from "./TabItemContent";
import { NUMBER_OF_SEARCH_DIALOG_ITEM_PER_PAGE } from "./constants";
import Pagination from "Components/Pagination";
import { SearchDialogContext } from "Feature/Library/LibrarySearchDialog/SearchDialogContext";


const SearchDialogContent: FC<{ closeAppDialog: () => void }> = ({ closeAppDialog }) => {

    const { totalPages, searchedData, setSkipNumber, skipNumber } = useContext(SearchDialogContext);

    return (
        <div className="flex flex-col items-center h-[80vh] bg-white overflow-auto ">
            {
                searchedData?.map(item => <TabItemContent item={item} closeAppDialog={closeAppDialog} key={item.id} />)
            }
            {totalPages > NUMBER_OF_SEARCH_DIALOG_ITEM_PER_PAGE ?
                <Pagination
                    totalPages={totalPages}
                    onClick={(num) => {
                        if (num !== 0) setSkipNumber(num * NUMBER_OF_SEARCH_DIALOG_ITEM_PER_PAGE);
                    }}
                    initialPage={skipNumber === 0 ? 0 : undefined}
                    perPageItem={NUMBER_OF_SEARCH_DIALOG_ITEM_PER_PAGE}
                />
                : null}

        </div>);
};

export default SearchDialogContent;
