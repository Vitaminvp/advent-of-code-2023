const isNum = /\d+/g;

const solve = (input) => {
  let total = 0;

  const stars =  input
    .map((line) => {
      const nums = [];
      let match;

      while ((match = isNum.exec(line)) !== null) {
        nums.push({
          start: match.index,
          end: isNum.lastIndex - 1,
          number: match[0],
        });
      }

      return nums;
    })
    .reduce((acc, numsList, numsIndex) => {
      const nums = [];

      for (let num of numsList) {
        for (let y = numsIndex - 1; y <= numsIndex + 1; y++) {
          for (let x = num.start - 1; x <= num.end + 1; x++) {
            if (input?.[y]?.[x] === "*") {
              nums.push({ x, y, number: parseInt(num.number) });
            }
          }
        }
      }
      return [...acc, ...nums];
    }, [])

  for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {

          let starsList = stars.filter(star => star.x === x && star.y === y);
          if (starsList.length >= 2) {
              let nums = starsList.map(el => el.number)
              total += nums[0] * nums[1]
          }
      }
  }

  return total;
};

module.exports = {
  solve,
  result: 74528807,
  exampleResult: 467835,
};
