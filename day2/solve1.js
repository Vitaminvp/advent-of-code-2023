const max = {
  red: 12,
  green: 13,
  blue: 14,
};
const solve = (input) => {
  return input
    .map((game) => {
      const [, cubes] = game.split(": ");

      return cubes.split("; ");
    })
    .map((game) => {
      return game.map((set) => set.split(", "));
    })
    .map((game) => {
      return game.map((sets) => {
        return sets.reduce((acc, set) => {
          const [sum, color] = set.split(" ");

          return { ...acc, [color]: sum };
        }, {});
      });
    })
    .map((game) => {
      return !game.some((sets) => {
        return Object.entries(sets).some(([color, sum]) => max[color] < sum);
      });
    })
    .reduce((acc, cur, idx) => {
      return cur ? acc + idx + 1 : acc;
    }, 0);
};

module.exports = {
  solve,
  result: 2239,
  exampleResult: 8,
};
