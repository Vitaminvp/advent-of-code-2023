const { intersect } = require("../utils");

const solve = (input) => {
  const winList = input
    .map((line) => {
      const [, numbers] = line.split(": ");
      const [winStr, myStr] = numbers.split(" | ");
      const winNums = winStr.split(" ").filter((s) => s !== "");
      const myNums = myStr.split(" ").filter((s) => s !== "");
      return [winNums, myNums];
    })
    .map(([winNums, myNums]) => {
      return [intersect(winNums, myNums)];
    });

  for (let i = 0; i < winList.length; i++) {
    for (let j = 0; j < winList[i].length; j++) {
      for (let k = 0; k < winList[i][j].length; k++) {
        winList[i + k + 1].push(winList[i + k + 1][0]);
      }
    }
  }
  return winList.reduce((acc, nums) => {return acc + nums.length}, 0);
};

module.exports = {
  solve,
  result: 11024379,
  exampleResult: 30,
};
