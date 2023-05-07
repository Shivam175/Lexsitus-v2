const promptArgs = require("../../_promptArgUtils.cjs");

const questions = [
  {
    type: "input",
    name: "name",
    message: "Model name",
  },
  {
    type: "input",
    name: "api",
    message: "API url (do not add leading slash): ",
  },
  {
    type: "confirm",
    name: "needsParser",
    message: "Do you want a parser with this model?",
  },
  {
    type: "confirm",
    name: "needsUtils",
    message: "Do you want to add utils for this model?",
  },
];
module.exports = {
  prompt: promptArgs(questions),
};
