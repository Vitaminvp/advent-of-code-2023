function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const solve = (input) => {
  const [seedsStr, ...listMap] = input;
  const [, seedsNum] = seedsStr.split(": ");
  let seeds = seedsNum.split(" ").map((seed) => +seed);

  const seedsRanges = seeds.map((seed, idx) => {
    if (idx % 2) return seed + seeds[idx - 1] - 1;

    return seed;
  });

  const seedChunks = [...chunks(seedsRanges, 2)];

  const mappers = listMap.filter(Boolean).reduce((acc, line) => {
    if (line.endsWith(" map:")) {
      return [...acc, []];
    }
    const nums = line.split(" ").map((num) => +num);

    acc.at(-1).push(nums);

    return acc;
  }, []);

  const seedsList = seedChunks.map((seed) => {
    let allSeeds = [seed];

    for (let mapperList of mappers) {
      const mappedSeeds = [];

      for (let [seedLow, seedHigh] of allSeeds) {
        const foundMappers = mapperList
          .filter(
            ([, source, length]) =>
              (seedHigh >= source && seedLow < source) ||
              (seedLow <= source + length - 1 &&
                seedHigh > source + length - 1) ||
              (seedLow >= source && seedHigh <= source + length - 1)
          )
          .sort((a, b) => a[1] - b[1]);

        for (let [destination, source, length] of foundMappers) {
          const offset = destination - source;
          const mapLow = source;
          const mapHigh = source + length - 1;

          if (mapLow < seedLow) {
            mappedSeeds.push([seedLow + offset, mapHigh + offset]);
            seedLow = mapHigh + 1;
          } else if (mapHigh > seedHigh) {
            mappedSeeds.push([mapLow + offset, seedHigh + offset]);
            seedHigh = mapLow - 1;
          } else {
            if (seedLow < mapLow) mappedSeeds.push([seedLow, mapLow - 1]);

            mappedSeeds.push([mapLow + offset, mapHigh + offset]);
            seedLow = mapHigh + 1;
          }
        }
        if (seedLow < seedHigh) mappedSeeds.push([seedLow, seedHigh]);
      }
      allSeeds = mappedSeeds;
    }

    return Math.min(...allSeeds.flat(1));
  });

  return Math.min(...seedsList.filter(Boolean));
};

module.exports = {
  solve,
  result: 69323688,
  exampleResult: 46,
};
