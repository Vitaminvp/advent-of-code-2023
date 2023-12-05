const { intersect } = require("../utils");

const solve = (input) => {
  return input
    .map((line) => {
      const [, numbers] = line.split(": ");
      const [winStr, myStr] = numbers.split(" | ");
      const winNums = winStr.split(" ").filter((s) => s !== "");
      const myNums = myStr.split(" ").filter((s) => s !== "");
      return [winNums, myNums];
    })
    .map(([winNums, myNums]) => {
      return intersect(winNums, myNums);
    })
    .filter((l) => l.length)
    .map((nums) => {
      return nums.map((num, idx) => (idx === 0 ? 1 : 2));
    })
    .reduce((acc, nums) => {
      return acc + nums.reduce((acc, num) => acc * num, 1);
    }, 0);
};

module.exports = {
  solve,
  result: 21485,
  exampleResult: 13,
};
