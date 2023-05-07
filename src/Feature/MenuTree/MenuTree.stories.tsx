export {};// /* eslint-disable @typescript-eslint/naming-convention */
// import MenuTree from "./index";
// import type { ComponentStory, ComponentMeta } from "@storybook/react";

// const menuTreeData = [
//     {
//         _id: "5a0a9694707e5e1f94b16896",
//         nodeType: "MENU",
//         text: "PART 1. ESTABLISHMENT OF THE COURT",
//         children: [
//             {
//                 "_id": "5a0a9694707e5e1f94b16899",
//                 "nodeType": "MENU",
//                 "text": "Article 1 The Court",
//                 "children": [
          
//                 ],
//                 "item_slug": "1",
//             },
//             {
//                 "_id": "5a0a9694707e5e1f94b16898",
//                 "nodeType": "MENU",
//                 "text": "Article 2 Relationship of the Court with the United Nations",
//                 "children": [
//                 ],
//                 "item_slug": "2",
//             },
//             {
//                 "_id": "5a0a9694707e5e1f94b1689a",
//                 "nodeType": "MENU",
//                 "text": "Article 3 Seat of the Court",
//                 "children": [
//                     {
//                         "_id": "5a0a9694707e5e1f94b1689d",
//                         "nodeType": "MENU",
//                         "text": "Article 3(1)",
//                         "children": [
              
//                         ],
//                         "item_slug": "3-1",
//                     },
//                     {
//                         "_id": "5a0a9694707e5e1f94b1689f",
//                         "nodeType": "MENU",
//                         "text": "Article 3(2)",
//                         "children": [
              
//                         ],
//                         "item_slug": "3-2",
//                     },
//                     {
//                         "_id": "5a0a9694707e5e1f94b168a1",
//                         "nodeType": "MENU",
//                         "text": "Article 3(3)",
//                         "children": [
              
//                         ],
//                         "item_slug": "3-3",
//                     },
//                 ],
//                 "item_slug": "3",
//             },
//             {
//                 "_id": "5a0a9694707e5e1f94b168a2",
//                 "nodeType": "MENU",
//                 "text": "Article 4 Legal status and powers of the Court",
//                 "children": [
//                     {
//                         "_id": "5a0a9694707e5e1f94b168a3",
//                         "nodeType": "MENU",
//                         "text": "Article 4(1)",
//                         "children": [
              
//                         ],
//                         "item_slug": "4-1",
//                     },
//                     {
//                         "_id": "5a0a9694707e5e1f94b168a6",
//                         "nodeType": "MENU",
//                         "text": "Article 4(2)",
//                         "children": [
              
//                         ],
//                         "item_slug": "4-2",
//                     },
//                 ],
//                 "item_slug": "4",
//             },
//         ],
//         "item_slug": "part-1",
//     },
// ];
// const MenuTreeStory: ComponentMeta<typeof MenuTree> = {
//     title: "Example/MenuTree",
//     component: MenuTree,
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     args:{
//         tree:menuTreeData,
//     },
// };

// export default MenuTreeStory;


// const Template: ComponentStory<typeof MenuTree> = (args) => (
//     <MenuTree {...args}/>
  
// );

// export const MenuTreeDemo = Template.bind({});
// MenuTreeDemo.args = {
//     tree:menuTreeData,
// };