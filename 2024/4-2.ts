export default function main(input: string): string {
  const directions: [number, number][] = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const grid = input.split('\n');
  const word = 'MAS';

  const aPositions: [number, number][] = [];
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      outer: for (const dir of directions) {
        for (let k = 0; k < word.length; k++) {
          if (grid[i + dir[0] * k]?.[j + dir[1] * k] !== word[k]) {
            continue outer;
          }
        }

        if (aPositions.some(([x, y]) => x === i + dir[0] && y === j + dir[1])) {
          count++;
        } else {
          aPositions.push([i + dir[0], j + dir[1]]);
        }
      }
    }
  }

  return count.toString();
}
