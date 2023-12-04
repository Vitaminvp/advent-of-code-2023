const notADot = /[^.]/;
const isNum = /\d+/g;
const isPart = (startIdx, endIdx, input, row, i) => {
  if (row?.[startIdx - 1] && notADot.test(row?.[startIdx - 1])) return true;

  if (row?.[endIdx] && notADot.test(row?.[endIdx])) return true;

  for (let l = startIdx - 1; l <= endIdx; l++) {
    if (
      (input[i - 1]?.[l] && notADot.test(input[i - 1]?.[l])) ||
      (input[i + 1]?.[l] && notADot.test(input[i + 1]?.[l]))
    )
      return true;
  }
  return false;
};

const solve = (input) => {
  return input.reduce((accum, row, i) => {
    const nums = row.match(isNum) ?? [];

    let offset = 0;

    return (
      accum +
      nums.reduce((acc, num) => {
        const startIdx = row.indexOf(num, offset);
        const endIdx = startIdx + num.length;
        offset = endIdx;

        if (isPart(startIdx, endIdx, input, row, i)) {
          return acc + +num;
        }

        return acc;
      }, 0)
    );
  }, 0);
};

module.exports = {
  solve,
  result: 519444,
  exampleResult: 4361,
};
