function rotateRight(array) {
  const result = [];
  array.forEach(function (a, i) {
    a.forEach(function (b, j, bb) {
      result[bb.length - j - 1] = result[bb.length - j - 1] || [];
      result[bb.length - j - 1][i] = b;
    });
  });
  return result;
}

function rotateLeft(array) {
  const result = [];
  array.forEach(function (a, i, aa) {
    a.forEach(function (b, j) {
      result[j] = result[j] || [];
      result[j][aa.length - i - 1] = b;
    });
  });
  return result;
}

const solve = (input) => {
  const matrix = input
    .map((line) => line.split(""))
    .reduce((acc, line) => {
      if (line.every((char) => char === ".")) {
        return [...acc, line, line];
      }

      return [...acc, line];
    }, []);

  const matrixRL = rotateRight(matrix).reduce((acc, line) => {
    if (line.every((char) => char === ".")) {
      return [...acc, line, line];
    }

    return [...acc, line];
  }, []);

  const mapper = rotateLeft(matrixRL).reduce((acc, cur, y) => {
    const nextCur = cur.reduce((acc, cur, x) => {
      if (cur === "#") return [...acc, [x, y]];
      return acc;
    }, []);
    return [...acc, ...nextCur];
  }, []);

  const lengths = [];
  for (let i = 0; i < mapper.length; i++) {
    const [sx, sy] = mapper[i];

    for (let j = i + 1; j < mapper.length; j++) {
      const [x, y] = mapper[j];
      lengths.push(Math.abs(sx - x) + Math.abs(sy - y));
    }
  }

  return lengths.reduce((prev, next) => prev + next);
};

module.exports = {
  solve,
  result: 9274989,
  exampleResult: 374,
};
