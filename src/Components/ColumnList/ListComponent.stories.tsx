export { };
// Import React from "react";
// import styles from "./index.module.scss";
// import ColumnList from "./index";
// import type { ComponentStory, ComponentMeta } from "@storybook/react";

// const lecturersFirstColumn = [
//     "Hirad Abtahi",
//     "Juan Pablo Perez-Leon Acevedo",
//     "Xabier Agirre",
//     "Marina Aksenova",
//     "Pouria Askary",
//     "Mohamed S.E.A. Badar",
//     "Devasheesh Singh Bais",
//     "Horejah Bala-Gaye",
//     "Stefan Barriga",
//     "Olympia Bekou",
//     "Morten Bergsmo",
//     "Shikha S. Bhattacharjee",
//     "Gilbert Bitti",
//     "Enrique Carnero Rojo",
// ];

// const lecturersSecondColumn = [
//     "Eleni Chaitidou",
//     "Roger Clark",
//     "Matthew Cross",
//     "Arne Willy Dahl",
//     "Mohamed El Zeidy",
//     "Donald M. Ferencz",
//     "Shannon Fyfe",
//     "Matilde Gawronski",
//     "Richard J. Goldstone",
//     "Gregory S. Gordon",
//     "Jens Iverson",
//     "Dov Jacobs",
//     "Nina Jørgensen",
//     "Sangkul KIM",
//     "Mark Klamberg",
// ];

// const lecturersThirdColumn = [
//     "Linnea Kortfält",
//     "Claus Kress",
//     "LING Yan",
//     "Adel Maged",
//     "Christopher Mahony",
//     "Yvonne McDermott",
//     "Omar A. Mekky",
//     "Salim A. Nakhjavani",
//     "Jennifer Naouri",
//     "Megumi OCHI",
//     "Hector Olasolo",
//     "Marc Perrin de Brichambaut",
//     "Jelena Plamenac",
//     "Sara Porro",
//     "Klaus Rackwitz",
// ];

// const lecturersFourthColumn = [
//     "Dejana Radisavljevic",
//     "Rod Rastan",
//     "Joseph Rikhof",
//     "Geoffrey Roberts",
//     "Darryl Robinson",
//     "Leila N. Sadat",
//     "Beth Van Schaack",
//     "William A. Schabas",
//     "Jo Stigen",
//     "Sepideh Tabatabaei",
//     "Melinda Taylor",
//     "SONG Tianying",
//     "Vladimir Tochilovsky",
//     "Mohammad H. Zakerhossein",
//     "ZHANG Binxin",
// ];

// const lecturersList = [
//     ...lecturersFirstColumn,
//     ...lecturersSecondColumn,
//     ...lecturersThirdColumn,
//     ...lecturersFourthColumn,
// ];

// const digestEditorsList = [
//     "Fathi Abdel-Raouf",
//     "Kai Ambos",
//     "Morten Bergsmo",
//     "Enrique Carnero-Rojo",
//     "Alejandro Chehtman",
//     "Julia Grignon",
//     "Alexander Heinze",
//     "Vickie Iacobellis",
//     "Kiki A. Japutra ",
//     "Sangkul Kim",
//     "Fannie Lafontaine",
//     "Justine Levasseur",
//     "Maria Luisa Pique",
//     "Christian Ranheim",
//     "Aleksandra Sidorenko",
//     "Alain-Guy Tachou Sipowo",
//     "Érick Sullivan ",
//     "Ilia Utmelidze",
// ];

// const authorsListLeft = [
//     "Mohamed Abdou",
//     "Marina Aksenova",
//     "Marie Aronsson",
//     "Mohamed Badar",
//     "Paul Behrens",
//     "Kirsten Bowman",
//     "Wenke Brückner",
//     "Yassin Brunger",
//     "Enrique Carnero-Rojo",
//     "Antonio Coco",
//     "Gerard Conway",
//     "Karel De Meester",
//     "Julia Dornbusch",
//     "Caroline Ehlert",
//     "Ola Engdahl",
//     "Viljam Engström",
//     "Håkan Friman",
//     "Matthew Gillett",
// ];

// const authorsListMiddle = [
//     "Barbara Goy",
//     "Nikola Hajdin",
//     "Mikaela Heikkilä",
//     "Mayeul Hieramente",
//     "Mark Klamberg",
//     "Geert-Jan Alexander Knoops",
//     "Ruth Kok",
//     "Linnea Kortfält",
//     "Mateus Kowalski",
//     "Camilla Lind",
//     "Letizia Lo Giacco",
//     "Sally Longworth",
//     "Iryna Marchuk",
//     "Julie McBride",
//     "Yvonne McDermott",
//     "Olle Mårsäter",
//     "Jonas Nilsson",
//     "Anna Öhmichen",
// ];

// const authorsListRight = [
//     "Joan Pablo Pérez-León- Acevedo",
//     "Sara Porro",
//     "Noëlle Quénivet",
//     "Karin Påle-Bartes",
//     "Dejana Radisavljević",
//     "Sophie Rigney",
//     "Geoff Roberts",
//     "Maria Sjöholm",
//     "SONG Tianying",
//     "Michael Stiel",
//     "Ignaz Stegmiller",
//     "Carl-Friedrich Stuckenberg",
//     "Jenia Iontcheva Turner",
//     "Sergey Vasiliev",
//     "Aloka Wanigasuriya",
//     "ZHANG Binxin",
//     "ZHANG Yueyao",
//     "Marie Aronsson-Storrier",
// ];

// const authorsList = [
//     ...authorsListLeft,
//     ...authorsListMiddle,
//     ...authorsListRight,
// ];

// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// const ListStory: ComponentMeta<typeof ColumnList> = {
//     title: "Example/ListComponent",
//     component: ColumnList,
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     args: {},
// };
// // As ComponentMeta<typeof ListComponent>;

// export default ListStory;
// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof ColumnList> = (args) => (
//     <div className={styles["story-div-height"]}>
//         <ColumnList {...args} />
//     </div>
// );

// const facultyTemplate: ComponentStory<typeof ColumnList> = (args) => (
//     <div className={styles["faculty-story-div-height"]}>
//         <ColumnList {...args} />
//     </div>
// );

// // Comment - export const Default = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// // Default.args = {};

// export const LexsitusFaculty = facultyTemplate.bind({});
// LexsitusFaculty.args = {
//     inputList: lecturersList,
// };

// export const DigestEditors = Template.bind({});
// DigestEditors.args = {
//     inputList: digestEditorsList,
// };

// export const CliccAuthors = Template.bind({});
// CliccAuthors.args = {
//     inputList: authorsList,
// };
