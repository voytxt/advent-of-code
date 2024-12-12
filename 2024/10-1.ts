export default function main(input: string): string {
  const grid = input.split('\n');

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '0') {
        traverse(i, j);
      }
    }
  }

  function traverse(i: number, j: number) {
    const ninePos = new Set<string>();

    dfs(i, j);

    function dfs(i: number, j: number) {
      if (grid[i][j] === '9') {
        ninePos.add(`${i} ${j}`);
        return;
      }

      const next = +grid[i][j] + 1;

      for (const dir of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        if (grid[i + dir[0]]?.[j + dir[1]] === next.toString()) {
          dfs(i + dir[0], j + dir[1]);
        }
      }
    }

    count += ninePos.size;
  }

  return count.toString();
}
