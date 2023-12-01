const { solve } = require("./common/utils");

const args = process.argv.slice(2);
const days = Number(args[0]);
const example = Number(args[1]);
let failingTasks = 0;

for (let i = 1; i <= days; i++) {
  failingTasks += solve(i, 1, example).check ? 0 : 1;
  failingTasks += solve(i, 2, example).check ? 0 : 1;
}

if (failingTasks > 0) {
  console.log(`\u274C  HAS ${failingTasks} FAILING CHECKS  \u274C `);
} else {
  console.log("\u2705  ALL CHECKS PASSED  \u2705 ");
}
