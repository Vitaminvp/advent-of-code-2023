const solve = (input) => {
  const [instructionsString, ...navigationsStrings] = input.filter(Boolean);
  const instructions = instructionsString.split("");

  const navigations = navigationsStrings.reduce((acc, line) => {
    const [key, value] = line.split(" = ");
    const [L, R] = value.match(/\(([^)]+)\)/)[1].split(", ");

    return { ...acc, [key]: { L, R } };
  }, {});

  let key = "AAA";
  let i = 0;

  while (key !== "ZZZ") {
    const iKey = instructions[i % instructions.length];
    key = navigations[key][iKey];
    i++;
  }

  return i;
};

module.exports = {
  solve,
  result: 17141,
  exampleResult: 6,
};
