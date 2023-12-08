const getGreatestCommonDivisor = (firstNum, secondNum) => {
  if (!secondNum) return firstNum;

  return getGreatestCommonDivisor(secondNum, firstNum % secondNum);
};


const solve = (input) => {
  const [instructionsString, ...navigationsStrings] = input.filter(Boolean);
  const instructions = instructionsString.split("");

  const startNodes = [];
  const maps = navigationsStrings.reduce((acc, line) => {
    const [key, value] = line.split(" = ");

    if (key.endsWith("A")) startNodes.push(key);

    const [L, R] = value.match(/\(([^)]+)\)/)[1].split(", ");

    return { ...acc, [key]: { L, R } };
  }, {});

  const currentPositions = startNodes.map((currentPos) => {
    let i = 0;

    while (!currentPos.endsWith("Z")) {
      const currentInstruction = instructions[i % instructions.length];
      currentPos = maps[currentPos][currentInstruction];
      i++;
    }
    return i;
  });

  // least common multiple
  return currentPositions.reduce((prevNum, curNum) => {
    const greatestCommonDivisor = getGreatestCommonDivisor(prevNum, curNum);

    return (prevNum * curNum) / greatestCommonDivisor;
  });
};

module.exports = {
  solve,
  result: 10818234074807,
  exampleResult: 6,
};
