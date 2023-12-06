module.exports = {
  intersect: (a, b) => {
    const setB = new Set(b);
    return [...new Set(a)].filter((x) => setB.has(x));
  },
  range: (size, startAt = 0) => {
    return [...Array(size).keys()].map((i) => i + startAt);
  },
};
