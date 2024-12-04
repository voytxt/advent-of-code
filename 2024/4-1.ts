export default function main(input: string): string {
  const directions: [number, number][] = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];
  const grid = input.split('\n');
  const word = 'XMAS';
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      outer: for (const dir of directions) {
        for (let k = 0; k < word.length; k++) {
          if (grid[i + dir[0] * k]?.[j + dir[1] * k] !== word[k]) {
            continue outer;
          }
        }

        count++;
      }
    }
  }

  return count.toString();
}
