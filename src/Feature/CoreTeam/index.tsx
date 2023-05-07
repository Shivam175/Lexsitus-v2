import React, { type FC } from "react";
import UserListCards from "Components/UserListCards";
import LexsitusHeading from "Feature/LexsitusHeading";
import { CORE_TEAM_CARD_LIST } from "constants/landingPageImageCards";



const CoreTeam: FC = () => (
    <div>
        <LexsitusHeading subHeadingKey="coreTeam" />
        <UserListCards list={CORE_TEAM_CARD_LIST} />
    </div>
);

export default CoreTeam;
