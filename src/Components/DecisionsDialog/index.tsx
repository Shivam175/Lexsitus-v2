import React, {  useState, type FC } from "react";
import styles from "./index.module.scss";
import { sortInAscending, sortInDescending } from "./utils";
import Button from "Components/Button";

export interface DeciosionsJsonType {
    court: string;
    date: string;
    decisionLink?: string;
    decisionText: string;
}
export interface DecisionsDialogProps {
    json: DeciosionsJsonType[];
 
}

const RenderJson: FC<DeciosionsJsonType> = (props) =>{
    const { court, date, decisionLink, decisionText } = props;

    return (
        <tr >
            <td className="w-[20%]">
                {court}
            </td>
            <td className="text-left w-[60%]">
                <Button link={decisionLink} isExternal className="hover:underline text-left">{decisionText}</Button>
            </td>
            <td className="w-[20%]">
                {date}
            </td>
        </tr> 
    );
};


const DecisionsDialog: FC<DecisionsDialogProps> = ({ json }) => {

    const [count, setCount] = useState<{ courtCount: number; dateCount: number }>({
        courtCount: 0,
        dateCount:0,
    });
    const [sortedJson, setSortedJson ] = useState(json);

    const toggleSort = (property: "court" | "date", clickCount: number) =>{
        if (clickCount % 2 === 0) {
            setSortedJson(json.sort(sortInDescending(property)));
        } else {

            setSortedJson(json.sort(sortInAscending(property)));
        }

    };

    return (
        <div className={styles.DecisionsDialog}>
            <div className="w-[70%]">
                <table className="text-sm w-full">
                    <thead>
                        <tr className="w-full">
                            <th className="text-center w-[20%]">
                                <Button onClick={() => {
                                    setCount({ ...count, courtCount:count.dateCount + 1 }); 
                                    toggleSort("court", count.courtCount);
                                }}>
						Court
				   <i className="material-icons">sort</i>
                                </Button>
                            </th>
                            <th className="text-center w-[60%]">
                                <span>Decisions</span>
                            </th>
                            <th className="text-left">
                                <Button onClick={() => {
                                    setCount({ ...count, dateCount: count.dateCount + 1 }); 
                                    toggleSort("date", count.dateCount);
                                }}>
						Date
				   <i className="material-icons">sort</i>
                                </Button>
                            </th>
                        </tr>
                    </thead>
		   </table>
                <tbody>
                    {
                        sortedJson.map((jsonItem, index)=><RenderJson key={index} {...jsonItem} />)
			 }
			 </tbody>
			 </div>
        </div>
    );
};

export default DecisionsDialog;