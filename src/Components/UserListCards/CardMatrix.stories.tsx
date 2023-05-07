export { };// Import { type ComponentStory, type ComponentMeta } from "@storybook/react";
// import React from "react";

// import styles from "./index.module.scss";
// import UserListCards from "./index";

// const frenchTeamCardList = [
//     {
//         "name": "french_team_Antonio_Angotti",
//         "image": "antonio.jpg",
//         "description": "french_team_description_CILRAP_Fellow_and_Co-ordinator_of_Lexsitus",
//     },
//     {
//         "name": "french_team_Érick_Sullivan",
//         "image": "Team/ErickSullivan.jpeg",
//         "description": "french_team_description_Deputy_Director",
//     },
//     {
//         "name": "french_team_Virginie_Lefèbvre",
//         "image": "Virginie.jpeg",
//         "description": "french_team_description_Co-ordinator_of_French",
//     },
//     {
//         "name": "french_team_Natacha_Bracq",
//         "image": "Team/Natacha.jpeg",
//         "description": "french_team_description_Editor",
//     },
//     {
//         "name": "french_team_Gabriel Bichet",
//         "image": "Team/GabrielBichet.jpeg",
//         "description": "french_team_description_Content_Contributor",
//     },
// ];

// const persianTeamCardList = [
//     {
//         "name": "Professor_Mohammad_Zakerhossein",
//         "image": "Team/MohammadZakerHossan.jpeg",
//         "description": "Co-ordinator_of_Persian_Lexsitus",
//     },
// ];

// const coreTeamCardList = [
//     {
//         "name": "contributor_name_Antonio_Angotti",
//         "image": "antonio.jpg",
//         "description": "contributor_description_Antonio_Angotti",
//     },
//     {
//         "name": "contributor_name_Mark_Klamberg",
//         "image": "mark-klamberg.JPG",
//         "description": "contributor_description_Chief_Editor_of_CLICC_and_Co-Director_of_Lexsitus",
//     },
//     {
//         "name": "contributor_name_Saurabh_Sachan",
//         "image": "saurabh.JPG",
//         "description": "contributor_description_Head_of_Technology",
//     },
//     {
//         "name": "contributor_name_Shikha_S_Bhattacharjee",
//         "image": "shikha.jpg",
//         "description": "contributor_description_Content_Director",
//     },
//     {
//         "name": "contributor_name_Morten_Bergsmo",
//         "image": "morten.jpg",
//         "description": "contributor_description_Creator_of_Lexsitus",
//     },
//     {
//         "name": "contributor_name_Avneesh_Raghav",
//         "image": "avneesh.jpg",
//         "description": "contributor_description_Tech_Lead",
//     },
//     {
//         "name": "contributor_name_Rajan_Zaveri",
//         "image": "rajan.jpg",
//         "description": "contributor_description_Media_Producer_and_Project Manager",
//     },
//     {
//         "name": "contributor_name_Virginie_Lefèbvre",
//         "image": "Virginie.jpeg",
//         "description": "contributor_description_Creative_Director",
//     },
//     {
//         "name": "contributor_name_Ralph_Hecksteden",
//         "image": "ralph.jpg",
//         "description": "contributor_description_Technical_developer_of_the_Case_Matrix",
//     },
// ];

// const arabicTeamCardList = [
//     {
//         "name": "arabic_team_Professor_Mohamed_S.E.A.Badar",
//         "image": "Team/Mohamedbadara.jpeg",
//         "description": "arabic_team_description_Editor",
//         "isImageAvailable": true,
//     },
//     {
//         "name": "arabic_team_Fathi_M.A._Ahmed",
//         "image": "Team/FathiAhmed.jpeg",
//         "description": "arabic_team_description_CILRAP_Arabic_Translation_Team_Leader",
//         "isImageAvailable": true,
//     },
// ];

// const arabicTeamTextCardList = [
//     {
//         "name": "arabic_team_Gamal_Abdelazim",
//         "image": "",
//         "description": "arabic_team_description_Copy-preparer_and_Proofreader",
//     },
//     {
//         "name": "arabic_team_Judge_Rima_Akoum",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_teamJudge_Ali_Al-Khatib",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Sanar_Taha_Darwish",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Hossam_Ed-Deen_Allam",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Judge_Mohamed_Eltawila",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Professor_Rana_M._Essawy",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Mariana_Fakih",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Maisa_M._Fathi",
//         "image": "",
//         "description": "arabic_team_description_Translator",
//     },
//     {
//         "name": "arabic_team_Dr._Dolly_Hamad",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Hagar_M._Khalil",
//         "image": "",
//         "description": "arabic_team_description_Translator",
//     },
//     {
//         "name": "arabic_team_Radwa_Khalil",
//         "image": "",
//         "description": "arabic_team_description_Associate_Editor",
//     },
//     {
//         "name": "arabic_team_Dr._Jelena_Plamenac",
//         "image": "",
//         "description": "arabic_team_description_Arabic_Lexsitus_Outreach",
//     },
//     {
//         "name": "arabic_team_Sara_I._Sanad",
//         "image": "",
//         "description": "arabic_team_description_Translator",
//     },
//     {
//         "name": "arabic_team_Yasmine_O._Shaalan",
//         "image": "",
//         "description": "arabic_team_description_Translator",
//     },
// ];
// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// const cardMatrixStory: ComponentMeta<typeof UserListCards> = {
//     title: "Example/CardMatrix",
//     component: UserListCards,
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     args : { },
// };

// export default cardMatrixStory;

// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof UserListCards> = (args) => (
//     <div className={styles["story-card-matrix-div"]}>
//         < UserListCards {...args} />
//     </div>
// );

// // Export const Default = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// // Default.args = {};

// export const frenchTeamCards = Template.bind({});
// frenchTeamCards.args = { inputCardList: frenchTeamCardList };

// export const persianTeamCards = Template.bind({});
// persianTeamCards.args = { inputCardList: persianTeamCardList };

// export const coreTeamCards = Template.bind({});
// coreTeamCards.args = { inputCardList: coreTeamCardList };

// export const arabicTeamCards = Template.bind({});
// arabicTeamCards.args = { inputCardList: arabicTeamCardList };

// export const arabicTeamTextCards = Template.bind({});
// arabicTeamTextCards.args = { inputCardList: arabicTeamTextCardList };

