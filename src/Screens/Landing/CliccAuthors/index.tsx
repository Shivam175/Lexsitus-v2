import { type FC } from "react";
import BdoHandler from "Components/BdoHandler";
import ColumnList from "Components/ColumnList";
import Typography from "Components/Typography";
import Translate from "Feature/Translation";
import { AUTHORS_LIST } from "constants/landingPageNameLists";



const CliccAuthors: FC = () => (
    <div className="lp-names-list-root">
        <BdoHandler>
            <Typography variant="h2" className="lp-names-list-header">
                <Translate keyLang="cliccAuthorsKey"/>
            </Typography>
        </BdoHandler>
        <ColumnList list={AUTHORS_LIST} />
    </div>
);

export default CliccAuthors;
