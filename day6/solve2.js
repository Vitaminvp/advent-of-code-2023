const { range } = require("../utils");
const solve = (input) => {
  const [times, distances] = input.map((line) =>
    line.replace(/^\D+/g, "").split(" ").filter(Boolean)
  );
  const wholeTime = +times.reduce((prev, next) => prev + next);
  const wholeDistances = +distances.reduce((prev, next) => prev + next);

  return range(wholeTime - 1, 1)
    .map((velocity) => velocity * (wholeTime - velocity))
    .filter((distance) => distance > wholeDistances).length
};

module.exports = {
  solve,
  result: 35865985,
  exampleResult: 71503,
};
