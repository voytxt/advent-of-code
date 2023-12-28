export default function main(input: string): string {
  const grid = input.split('\n').map((l) => l.split(''));

  // key = position id (pos[0] * grid.length + pos[1])
  // value = array of directions
  const visited = new Map<number, [number, number][]>();

  recurse([0, 0], [0, 1]);

  return visited.size.toString();

  function recurse(pos: [number, number], dir: [number, number]) {
    const char = grid[pos[0]]?.[pos[1]];

    if (char === undefined) return;

    const posId = pos[0] * grid.length + pos[1];

    if (visited.has(posId)) {
      if (visited.get(posId)!.some((d) => d[0] === dir[0] && d[1] === dir[1])) {
        // already been here
        return;
      } else {
        visited.get(posId)!.push([...dir]);
      }
    } else {
      visited.set(posId, [[...dir]]);
    }

    if (char === '\\') {
      [dir[0], dir[1]] = [dir[1], dir[0]];
    } else if (char === '/') {
      [dir[0], dir[1]] = [-dir[1], -dir[0]];
    } else if (char === '|' && dir[0] === 0) {
      recurse([pos[0] - 1, pos[1]], [-1, 0]);
      dir = [1, 0];
    } else if (char === '-' && dir[1] === 0) {
      recurse([pos[0], pos[1] - 1], [0, -1]);
      dir = [0, 1];
    }

    recurse([pos[0] + dir[0], pos[1] + dir[1]], [...dir]);
  }
}
