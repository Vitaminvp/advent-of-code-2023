const solve = (input) => {
  return input
    .map((line) => {
      return [line.split(" ").map((num) => +num)];
    })
    .map((history) => {
      while (history.length && !history.at(-1).every((num) => num === 0)) {
        const nextHistory = [];

        for (let i = 1; i < history.at(-1).length; i++) {
          nextHistory.push(history.at(-1)[i] - history.at(-1)[i - 1]);
        }

        history.push(nextHistory);
      }
      return history.reverse();
    })
    .map((histories) => {
      for (let i = 0; i < histories.length; i++) {
        if (i === 0 && histories[i].length) {
          histories[i].push(histories[i].at(-1));
        } else if (histories[i].length) {
          histories[i].push(histories[i].at(-1) + histories[i - 1].at(-1));
        }
      }

      return histories;
    })
    .map((histories) => histories.filter((history) => history.length))
    .reduce((acc, curr) => {
      return acc + curr.at(-1).at(-1);
    }, 0);
};

module.exports = {
  solve,
  result: 2043183816,
  exampleResult: 114,
};
