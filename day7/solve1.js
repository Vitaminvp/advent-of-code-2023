const cards = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const getType = (hand) => {
  const cards = [...hand];
  const uniqSymbols = new Set(cards).size;
  const maxNumOfUnq = Math.max(
      ...Object.values(
          cards.reduce((acc, chr) => {
            acc[chr] = (acc[chr] || 0) + 1;
            return acc;
          }, {})
      )
  );

  switch (uniqSymbols) {
    case 1:
      return 6;
    case 2:
      return maxNumOfUnq === 4 ? 5 : 4;
    case 3:
      return maxNumOfUnq === 3 ? 3 : 2;
    case 4:
      return 1;
    case 5:
      return 0;
    default:
      throw new Error(`Something is wrong with hand: ${hand}`);
  }
};

const solve = (input) => {
  return input
      .map((line) => {
        const [hand, bid] = line.split(" ");
        const type = getType(hand);

        return { hand, bid: +bid, type };
      })
      .sort((prevCard, nextCard) => {
        const { hand: prevHand, type: prevType } = prevCard;
        const { hand: nextHand, type: nextType } = nextCard;
        if (prevType !== nextType) {
          return prevType - nextType;
        }

        for (let i = 0; i < prevHand.length; i++) {
          if (prevHand[i] !== nextHand[i]) {
            return cards[prevHand[i]] - cards[nextHand[i]];
          }
        }

        return 0;
      })
      .map(({ bid }, index) => bid * (index + 1))
      .reduce((prev, curr) => prev + curr);
};

module.exports = {
  solve,
  result: 251216224,
  exampleResult: 6440,
};
