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
      return game.reduce((acc, sets) => {
        Object.entries(sets).forEach(([color, sum]) => {
          if (acc[color]) {
            acc[color] = Math.max(acc[color], +sum);
          } else {
            acc[color] = +sum;
          }
        });

        return acc;
      }, {});
    })
    .map((game) => {
      return Object.values(game).reduce((acc, cur) => acc * cur);
    })
    .reduce((acc, cur) => acc + cur);
};

module.exports = {
  solve,
  result: 83435,
  exampleResult: 2286,
};
