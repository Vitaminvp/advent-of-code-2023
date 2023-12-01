const fs = require("fs");

const getInput = (task, example, folder) => {
  try {
    if (!example) return fs.readFileSync(`${folder}/input.txt`);

    const text = fs.readFileSync(`${folder}/example${task}.txt`);

    if (text) return text;
  } catch (err) {
    return fs.readFileSync(`${folder}/example.txt`);
  }
};

const solve = (day, task, example) => {
  const root = `${__dirname}/../day${day}`;
  const startTime = new Date();
  const solver = require(`${root}/solve${task}`);
  const text = getInput(task, example, root)
    .toString()
    .replace(/\n+$/, "")
    .split("\n");

  const result = solver.solve(text, example);
  const endTime = new Date();
  const timeDiff = (endTime - startTime) / 1000;
  const expected = example ? solver.exampleResult : solver.result;
  const check = expected === result;
  const exampleStr = example ? `,EXAMPLE ${task}` : "";
  console.log(
    check ? "\u2705" : "\u274C",
    `DAY ${day}, TASK ${task} ${exampleStr}`
  );
  console.log("\u23F0", `${timeDiff}s`);
  console.log("\uD83C\uDFC1", result);
  console.log("-----------------");
  return { result, check };
};

const isLowerCase = (char) => char === char.toLowerCase();
const getIntersection = (arr1, arr2) =>
  arr1.filter((val) => arr2.includes(val));
const getUnique = (arr) => [...new Set(arr)];

const isUnique = (array) => {
  return new Set(array).size === array.length;
};

const isIntNum = (n) => {
  return !isNaN(parseInt(n)) && isFinite(n);
};
const transpose = (matrix) => {
  return matrix.reduce(
    (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
    []
  );
};

module.exports = {
  solve,
  isLowerCase,
  getIntersection,
  getUnique,
  isUnique,
  isIntNum,
  transpose,
};
