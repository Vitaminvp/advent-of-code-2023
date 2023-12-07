const { range } = require("../utils");
const solve = (input) => {
  const [times, distances] = input.map((line) =>
    line.replace(/^\D+/g, "").split(" ").filter(Boolean)
  );

  return times
    .reduce((acc, time, idx) => {
      const winButtonPressTimes = range(+time - 1, 1)
        .map((velocity) => velocity * (+time - velocity))
        .filter((distance) => distance > distances[idx]);

      return [...acc, winButtonPressTimes];
    }, [])
    .map(({ length }) => length)
    .reduce((prev, next) => prev * next);
};

module.exports = {
  solve,
  result: 2269432,
  exampleResult: 288,
};
