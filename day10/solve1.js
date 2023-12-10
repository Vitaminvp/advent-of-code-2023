const getNextCoords = (x, y, vector) => {
  switch (vector) {
    case "DOWN":
      return [x + 1, y];
    case "UP":
      return [x - 1, y];
    case "LEFT":
      return [x, y - 1];
    case "RIGHT":
      return [x, y + 1];
    default:
      throw new Error(`Wrong direction ${vector}`);
  }
};

const getDirection = (vector, char) => {
  switch (char) {
    case "F":
      return vector === "UP" ? "RIGHT" : "DOWN";
    case "J":
      return vector === "RIGHT" ? "UP" : "LEFT";
    case "L":
      return vector === "LEFT" ? "UP" : "RIGHT";
    case "7":
      return vector === "RIGHT" ? "DOWN" : "LEFT";
    case "|":
      return vector === "UP" ? "UP" : "DOWN";
    case "-":
      return vector === "LEFT" ? "LEFT" : "RIGHT";
    case "S":
      return vector === "LEFT" ? "DOWN" : "RIGHT";
    default:
      throw new Error(`Wrong character ${char}`);
  }
};

const solve = (input) => {
  const grid = input.map((line) => line.split(""));
  const SX = grid.findIndex((inner) => inner.includes("S"));
  const SY = grid[SX].findIndex((inner) => inner === "S");

  let steps = 0;
  let nextChar = "";
  let vector = "DOWN";
  let X = SX;
  let Y = SY;

  while (nextChar !== "S") {
    const [x, y] = getNextCoords(X, Y, vector);
    X = x;
    Y = y;
    nextChar = grid[x][y];
    vector = getDirection(vector, nextChar);
    steps++;
  }

  return Math.ceil(steps / 2);
};

module.exports = {
  solve,
  result: 6701,
  exampleResult: 8,
};
