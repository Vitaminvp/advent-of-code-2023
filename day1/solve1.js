const solve = (input) => {
  return input.reduce((acc, line) => {
    const [first] = line.match(/\d/);
    const [last] = line.split("").reverse().join("").match(/\d/);

    return acc + +(first + last);
  }, 0);
};

module.exports = {
  solve,
  result: 55621,
  exampleResult: 142,
};
