const promptArgs = require("../../_promptArgUtils.cjs");

const questions = [
  {
    type: "input",
    name: "name",
    message: "Component name (in snake_case): ",
  },
];

module.exports = {
  prompt: promptArgs(questions),
};
