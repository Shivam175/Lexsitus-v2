import React, { type FC } from "react";
import UserListCards from "Components/UserListCards";
import LexsitusHeading from "Feature/LexsitusHeading";
import { ARABIC_TEAM_CARD_LIST, ARABIC_TEAM_TEXT_CARD_LIST } from "constants/landingPageImageCards";



const ArabicLexsitusTeam: FC = () => (
    <>
        <LexsitusHeading subHeadingKey="arabicTeam" />
        <UserListCards list={ARABIC_TEAM_CARD_LIST} />
        <UserListCards list={ARABIC_TEAM_TEXT_CARD_LIST} variant="small" />
    </>
);

export default ArabicLexsitusTeam;
