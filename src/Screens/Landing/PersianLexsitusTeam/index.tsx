import React, { type FC } from "react";
import UserListCards from "Components/UserListCards";
import LexsitusHeading from "Feature/LexsitusHeading";
import { PERSIAN_TEAM_CARD_LIST } from "constants/landingPageImageCards";


const PersianLexsitusTeam: FC = () => (
    <>
        <LexsitusHeading subHeadingKey="persianTeam" />
        <UserListCards list={PERSIAN_TEAM_CARD_LIST} />
    </>
);

export default PersianLexsitusTeam;
