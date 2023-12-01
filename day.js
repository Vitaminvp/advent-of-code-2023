const { solve } = require("./common/utils");

const args = process.argv.slice(2);
let _day = Number(args[0]);
let _task = Number(args[1]);
let _example = Number(args[2]);

solve(_day, _task, _example);
