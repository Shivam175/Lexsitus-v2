import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationPath } from "Hooks/useLocationPath";
import {  useCurrentLanguage } from "Hooks/useTranslation";
import { languages } from "constants/language";

interface IDropDownProps {
    label?: string;
    selectClass?: string;
}

const LanguageDropDown: FC<IDropDownProps> = ({ label, selectClass }) => {
    const navigate = useNavigate();
    const { changePathLanguage } = useLocationPath();
    const { language } = useCurrentLanguage();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
        navigate(changePathLanguage(e.target.value));
    };

    return (
        <div>
            <label htmlFor="languages"> {label}</label>
            <select
                value={language}
                onChange={changeLanguage}
                className={selectClass}
            >
                {languages.map((language, index) => (
                    <option key={index} value={language.value}>
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageDropDown;
