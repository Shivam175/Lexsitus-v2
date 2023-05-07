import React, { type FC } from "react";
import styles from "./index.module.scss";
import BdoHandler from "Components/BdoHandler";
import ColumnList from "Components/ColumnList";
import Typography from "Components/Typography";
import Translate from "Feature/Translation";
import { LECTURERS_LIST } from "constants/landingPageNameLists";


const LexsitusFaculty: FC = () => (
    <div className={styles["lecturers-root"]}>
        <BdoHandler>
            <Typography
                variant="h2"
                className={styles["lp-names-list-header"]}
            >
                <Translate keyLang= "lecturers"/>
            </Typography>
            <Typography
                variant="body"
                className={styles["lecturers-description"]}
            >
                <Translate keyLang="Lexsitus_offers_a_comprehensive_faculty"/>
            </Typography>
        </BdoHandler>
        <ColumnList list={LECTURERS_LIST} />
    </div>
);

export default LexsitusFaculty;
