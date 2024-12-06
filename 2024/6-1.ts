export default function main(input: string): string {
  const grid = input.split('\n').map((l) => l.split(''));
  let pos: [number, number] = getGuardPos();
  let dirIndex = 0;

  while (true) {
    if (grid[pos[0]]?.[pos[1]] === undefined || grid[pos[0]][pos[1]] === '#') {
      break;
    }

    grid[pos[0]][pos[1]] = 'X';

    while (grid[pos[0] + getDir()[0]]?.[pos[1] + getDir()[1]] === '#') {
      dirIndex++;
    }

    pos = [pos[0] + getDir()[0], pos[1] + getDir()[1]];
  }

  return grid
    .flat()
    .filter((c) => c == 'X')
    .length.toString();

  function getGuardPos(): [number, number] {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '^') return [i, j] as [number, number];
      }
    }

    throw new Error('assert');
  }

  function getDir(): [number, number] {
    return [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ][dirIndex % 4] as [number, number];
  }
}
