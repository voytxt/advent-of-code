// current state: i don't know how to handle infinite loops between 2 (or more) squares in the grid

export default (input: string): string => {
  const grid = input.split('\n');

  const start = findChar(grid, 'S');
  const end = findChar(grid, 'E');

  main(grid, start, end);

  return '';
};

function main(grid: string[], start: number[], end: number[], i = 1) {
  if (i > 1000) throw 'too much recursion';

  const elevation = getElevation(grid[start[0]][start[1]]);

  console.log(start, '=>', getNeighbors(start[0], start[1]));

  for (const neighbor of getNeighbors(start[0], start[1])) {
    if (grid[neighbor[0]]?.[neighbor[1]] === undefined) {
      continue;
    }

    if (neighbor[0] === end[0] && neighbor[1] === end[1]) {
      throw 'FOUND: ' + i;
    }

    const neighborElevation = getElevation(grid[neighbor[0]][neighbor[1]]);

    if (neighborElevation <= elevation + 1) {
      main(grid, neighbor, end, i + 1);
    }
  }
}

function findChar(grid: string[], char: string) {
  const x = grid.findIndex((row) => row.includes(char));
  const y = grid[x].indexOf(char);

  return [x, y];
}

function getNeighbors(x: number, y: number) {
  return [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ];
}

function getElevation(char: string) {
  return 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
}
