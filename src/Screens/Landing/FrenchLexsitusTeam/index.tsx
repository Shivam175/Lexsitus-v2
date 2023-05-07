import { type FC } from "react";
import UserListCards from "Components/UserListCards";
import LexsitusHeading from "Feature/LexsitusHeading";
import { FRENCH_TEAM_CARD_LIST } from "constants/landingPageImageCards";

const FrenchLexsitusTeam: FC = () => (
    <>
        <LexsitusHeading subHeadingKey="frenchTeam" />
        <UserListCards list={FRENCH_TEAM_CARD_LIST} />
    </>
);

export default FrenchLexsitusTeam;
