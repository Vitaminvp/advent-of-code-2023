const getValue = (list, seed) => {
  for (let i = 0; i < list.length; i++) {
    const [destinationStart, sourceStart, size] = list[i].split(" ");

    if (seed >= +sourceStart && seed < +sourceStart + +size) {
      const offset = seed - +sourceStart;
      return +destinationStart + offset;
    }
  }

  return +seed;
};
const solve = (input) => {
  const [seedsStr, ...listMap] = input;
  const [, seedsNum] = seedsStr.split(": ");
  const seeds = seedsNum.split(" ");

  const mapObject = {};

  for (let i = 0; i < listMap.length; i++) {
    if (listMap[i].endsWith(" map:")) {
      let j = 1;
      while (listMap[i + j]) {
        const [key] = listMap[i].split(" ");

        mapObject[key] = mapObject[key]
          ? [...mapObject[key], listMap[i + j]]
          : [listMap[i + j]];
        j++;
      }
      i += j;
    }
  }

  return seeds
    .map((seed) => {
      let result = seed;

      return Object.values(mapObject).reduce((acc, list) => {
        console.log({ list });
        result = getValue(list, result);

        return result;
      }, undefined);
    })
    .reduce((prev, cur) => Math.min(prev, cur));
};

module.exports = {
  solve,
  result: 111627841,
  exampleResult: 35,
};
