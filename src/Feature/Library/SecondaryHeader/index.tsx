import React, { useContext, useState, type FC } from "react";
import styles from "./index.module.scss";
import { SearchDialogContext } from "Feature/Library/LibrarySearchDialog/SearchDialogContext";
import LanguageDropDown from "Feature/Translation/LanguageDropDown";

const SecondaryHeader: FC<{ onChange: () => void }> = ({ onChange }) => {
    const { setSearchText, searchText } = useContext(SearchDialogContext);

    const [inputText, setInputText] = useState<string>(searchText);

    return (<div className={styles.library_search_container}>
        <div className="w-[33.2%]" />
        <div className="flex w-[33.2%] bg-gradient-to-b from-black to-lxsGrey8">
            <div className="material-icons text-white pt-[2px] w-[5%]">search</div>
            <input
                placeholder="Type keyword"
                className=" w-full outline-none text-lxsGrey3 bg-transparent placeholder:text-center"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onChange();
                        setSearchText(inputText);
                    }
                }}
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                }}
            />
        </div>
        <div className="w-[33.2%] text-right">
            <LanguageDropDown selectClass={styles.library_search_dropdown} />
        </div>
    </div>);
};

export default SecondaryHeader;