/* eslint-disable @typescript-eslint/indent */
import clsx from "clsx";
import { debounce } from "lodash";
import { useEffect, useState, type FC, useCallback } from "react";
import { type TStatus } from "Hooks/useAsyncTask";
import { type CliccItem, type CommentarySearchListItem } from "Models/Tabs/Clicc/@types";


export interface GlobalAutoCompleteProps {
	placeholder?: string;
	handleChange?: {
		run: (...arg: string[]) => Promise<CommentarySearchListItem | undefined>;
		status: TStatus;
		message: string;
		reset: () => void;
	};
	onSelect: (tag: Pick<CliccItem, "id" | "header">) => void;
}


const GlobalAutoComplete: FC<GlobalAutoCompleteProps> = (props) => {
	const { placeholder = "", handleChange, onSelect } = props;
	const [inputValue, setInputValue] = useState<string>("");
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [itemNotFound, setItemNotFound] = useState<boolean>(false);
	const [closeMenu, setCloseMenu] = useState<boolean>(false);
	const [searchItem, setSearchItem] = useState<Array<Pick<CliccItem, "header" | "id" | "item_slug">>>();

	const debouncedFetch = useCallback(debounce(async (value: string) => {
		if (!handleChange) return;
		setIsProcessing(true);
		const data = await handleChange.run(value);
		if (data?.total === 0) setItemNotFound(true);
		else {
			setSearchItem(data?.results);
			setCloseMenu(true);
			setIsProcessing(false);
			setItemNotFound(false);
		}
	}, 400), []);

	useEffect(() => {
		void debouncedFetch(inputValue);

	}, [inputValue, debouncedFetch]);

	const cls = clsx("p-1 bg-lxsGrey3 border-b-[1px] border-lxsGrey4 text-black");

	let content: JSX.Element = <></>;
	if (isProcessing) {
		content = <div className={`${cls} searchingDivClass`}>searching...</div>;
	}

	if (itemNotFound) {
		content = <div className={`${cls} itemNotfoundDivClass`}>No results found</div>;
	}

	if (!itemNotFound && closeMenu) {
		content = (<div className="w-full my-0 mx-auto max-h-[200px] overflow-auto search-root-div">
			{searchItem?.map(item => <div key={item.id}
				className={`${cls} hover:bg-grey3 hover:text-white search-Item`}
				onClick={() => {
					onSelect(item);
					setCloseMenu(false);
					setInputValue("");
				}}
			>
				{item.header}
			</div>
			)}
		</div>);
	}

	return (
		<>
			<input className="searchInput" placeholder={placeholder} value={inputValue} onChange={(e) => {
				setInputValue(e.target.value);
			}} />

			{content}
		</>
	);
};

export default GlobalAutoComplete;