import React, { type FC } from "react";
import BdoHandler from "Components/BdoHandler";
import ColumnList from "Components/ColumnList";
import Typography from "Components/Typography";
import Translate from "Feature/Translation";
import { DIGEST_EDITORS_LIST } from "constants/landingPageNameLists";



const DigestEditors: FC = () => (
    <div className="lp-names-list-root">
        <BdoHandler>
            <Typography variant="h2" className="lp-names-list-header">
                <Translate keyLang="digestEditorsKey"/>
            </Typography>
        </BdoHandler>
        <ColumnList list={DIGEST_EDITORS_LIST} />
    </div>
);

export default DigestEditors;
