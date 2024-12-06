export default function main(input: string): string {
  const grid = input.split('\n').map((l) => l.split(''));
  let pos: [number, number] = getGuardPos();
  let dirIndex = 0;

  const possibleObstacles: [number, number][] = [];

  while (true) {
    // are we outside bounds
    if (grid[pos[0]]?.[pos[1]] === undefined) {
      possibleObstacles.pop();
      break;
    }

    // while '#' in front, turn right
    while (grid[pos[0] + getDir()[0]]?.[pos[1] + getDir()[1]] === '#') {
      dirIndex++;
    }

    pos = [pos[0] + getDir()[0], pos[1] + getDir()[1]];
    if (!possibleObstacles.some(([a, b]) => a === pos[0] && b === pos[1])) {
      possibleObstacles.push(pos);
    }
  }

  let count = 0;

  for (const pos of possibleObstacles) {
    if (
      doesPuttingObstacleAtPosMakeALoop(
        structuredClone(grid),
        pos,
        getGuardPos(),
      )
    ) {
      const g = structuredClone(grid);

      g[pos[0]][pos[1]] = 'O';

      count++;
    }
  }

  return count.toString();

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

function doesPuttingObstacleAtPosMakeALoop(
  grid: string[][],
  obstacle: [number, number],
  pos: [number, number],
): boolean {
  let dirIndex = 0;
  grid[obstacle[0]][obstacle[1]] = '#';

  const visited: string[] = [];

  while (true) {
    // are we outside bounds
    if (grid[pos[0]]?.[pos[1]] === undefined) {
      return false;
    }

    // while '#' in front, turn right
    while (grid[pos[0] + getDir()[0]]?.[pos[1] + getDir()[1]] === '#') {
      if (
        visited.indexOf(pos.join(' ')) !== visited.lastIndexOf(pos.join(' '))
      ) {
        return true;
      }

      visited.push(pos.join(' '));

      dirIndex++;
    }

    pos = [pos[0] + getDir()[0], pos[1] + getDir()[1]];
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
