import { type FC, useState, useContext, type ChangeEvent, useEffect } from "react";
import { SearchDialogContext } from "Feature/Library/LibrarySearchDialog/SearchDialogContext";
import { DIALOG_SEARCH_PRIMARY_HEADER_LIST } from "Feature/Library/LibrarySearchDialog/constants";


const SearchDialogPrimaryHeader: FC = () => {

    const { searchText, setSearchText, setContentTypes, setSkipNumber } = useContext(SearchDialogContext);
    const [inputValue, setInputValue] = useState<string>(searchText);

    const [contentTypeList, setContentTypeList] = useState<string[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newArray = [...contentTypeList, event.target.value];

        if (contentTypeList.includes(event.target.value)) {
            newArray = newArray.filter(val => val !== event.target.value);
        }

        setContentTypeList(newArray);
    };



    useEffect(() => {
        setSkipNumber(0);
        setContentTypes(contentTypeList.join(","));
    }, [contentTypeList]);


    return (
        <div className="bg-grey5 h-7">
            <div className="flex justify-center h-full">
                {
                    DIALOG_SEARCH_PRIMARY_HEADER_LIST.map(list => (
                        <div key={list.id}>
                            <input type="checkbox" className="checkbox-input" onChange={handleChange} id={list.label} name={list.label} value={list.value} />
                            <label htmlFor={list.label} className="checkbox-label" >{list.label}</label>
                        </div>))
                }

                <div className="flex bg-grey4 text-grey3 w-1/5 ml-10">
                    <input
                        className=" bg-transparent w-full outline-none pl-2"
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearchText(inputValue);
                            }
                        }}

                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                    <i className="material-icons pt-1">search</i>
                </div>

            </div>
        </div>
    );
};

export default SearchDialogPrimaryHeader;
