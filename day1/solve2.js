const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const reverse = (str) => str.split("").reverse().join("");
const reversedNumbers = numbers.map(reverse);
const replaceFirstStrNum = (numbers) => (line) => {
  for (let i = 0; i < line.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (line.slice(i).startsWith(numbers[j])) {
        return line.replace(numbers[j], numbers[j] + (j + 1) + numbers[j]);
      }
    }
  }
  return line;
};

const solve = (input) => {
  return input
    .map(replaceFirstStrNum(numbers))
    .map(reverse)
    .map(replaceFirstStrNum(reversedNumbers))
    .map(reverse)
    .reduce((acc, line) => {
      const [first] = line.match(/\d/);
      const [last] = line.split("").reverse().join("").match(/\d/);

      return acc + +(first + last);
    }, 0);
};

module.exports = {
  solve,
  result: 53592,
  exampleResult: 281,
};
