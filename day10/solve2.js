const pipeDescriptions = {
  "|": { north: true, south: true, west: false, east: false, ascii: "│" },
  "-": { north: false, south: false, west: true, east: true, ascii: "─" },
  L: { north: true, south: false, west: false, east: true, ascii: "└" },
  J: { north: true, south: false, west: true, east: false, ascii: "┘" },
  7: { north: false, south: true, west: true, east: false, ascii: "┐" },
  F: { north: false, south: true, west: false, east: true, ascii: "┌" },
  ".": { north: false, south: false, west: false, east: false, ascii: " " },
  S: { north: true, south: true, west: true, east: true, ascii: "▓" },
};
const solve = (lines) => {
  const input = lines.map((row) => row.split(""));

  const map = {};
  let startPosition = null;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const coordinate = `${x}:${y}`;

      map[coordinate] = {
        type: input[y][x],
        partOfPipe: false,
        isInside: false,
      };
    }
  }

  for (const mapTileKey of Object.keys(map)) {
    const mapTile = map[mapTileKey];
    const [mapX, mapY] = mapTileKey.split(":").map(Number);

    if (mapTile.type === "S") {
      startPosition = mapTile;
      startPosition.partOfPipe = true;
    }

    if (pipeDescriptions[mapTile.type].north) {
      const mapPosition = map[`${mapX}:${mapY - 1}`];
      if (mapPosition && mapPosition.type !== ".") mapTile.north = mapPosition;
    }
    if (pipeDescriptions[mapTile.type].south) {
      const mapPosition = map[`${mapX}:${mapY + 1}`];
      if (mapPosition && mapPosition.type !== ".") mapTile.south = mapPosition;
    }
    if (pipeDescriptions[mapTile.type].west) {
      const mapPosition = map[`${mapX - 1}:${mapY}`];
      if (mapPosition && mapPosition.type !== ".") mapTile.west = mapPosition;
    }
    if (pipeDescriptions[mapTile.type].east) {
      const mapPosition = map[`${mapX + 1}:${mapY}`];
      if (mapPosition && mapPosition.type !== ".") mapTile.east = mapPosition;
    }
  }

  if (startPosition.north?.south === startPosition) {
    if (startPosition.south?.north === startPosition) {
      startPosition.type = "|";
      delete startPosition.west;
      delete startPosition.east;
    }
    if (startPosition.west?.east === startPosition) {
      startPosition.type = "J";
      delete startPosition.south;
      delete startPosition.east;
    }
    if (startPosition.east?.west === startPosition) {
      startPosition.type = "L";
      delete startPosition.west;
      delete startPosition.south;
    }
  } else if (startPosition.south?.north === startPosition) {
    if (startPosition.west?.east === startPosition) {
      startPosition.type = "7";
      delete startPosition.north;
      delete startPosition.east;
    }
    if (startPosition.east?.west === startPosition) {
      startPosition.type = "F";
      delete startPosition.north;
      delete startPosition.west;
    }
  } else if (startPosition.west?.east === startPosition) {
    if (startPosition.east?.west === startPosition) {
      startPosition.type = "-";
      delete startPosition.north;
      delete startPosition.south;
    }
  }

  let steps = 1;
  let runner01;
  const runnerVisits = new Set([startPosition]);

  [runner01] = [
    startPosition.north,
    startPosition.south,
    startPosition.west,
    startPosition.east,
  ].filter((direction) => !!direction);

  while (runner01) {
    runnerVisits.add(runner01);
    runner01.partOfPipe = true;

    runner01 = [
      runner01.north,
      runner01.south,
      runner01.west,
      runner01.east,
    ].filter((direction) => !!direction && !runnerVisits.has(direction))[0];

    steps++;
  }

  const newMap = [];

  let enclosedTiles = 0;
  for (const mapTileKey of Object.keys(map)) {
    const mapTile = map[mapTileKey];
    const [mapX, mapY] = mapTileKey.split(":").map(Number);

    if (!newMap[mapY]) newMap[mapY] = [];
    newMap[mapY][mapX] = mapTile;
  }

  for (const row of newMap) {
    let isInside = false;
    let isUp = false;

    for (const tile of row) {
      const type = tile.partOfPipe ? tile.type : ".";

      if (type === "|") {
        isInside = !isInside;
      } else if (type === "L" || type === "F") {
        isUp = type === "L";
      } else if (type === "7" || type === "J") {
        if (isUp && type !== "J") isInside = !isInside;
        if (!isUp && type !== "7") isInside = !isInside;

        isUp = false;
      }

      if (tile.partOfPipe) continue;

      if (isInside) {
        enclosedTiles++;
        tile.isInside = isInside;
      }
    }
  }

  // console.log(
  //   newMap
  //     .map((line) =>
  //       line
  //         .map((tile) => {
  //           if (tile.isInside) return "*";
  //           return tile.partOfPipe ? pipeDescriptions[tile.type].ascii : " ";
  //         })
  //         .join("")
  //     )
  //     .join(" \n")
  // );

  return enclosedTiles;
};

module.exports = {
  solve,
  result: 303,
  exampleResult: 4,
};
