export default function main(input: string): string {
  const grid = input.split('\n').map((l) => l.split(''));

  // key = position id (pos[0] * grid.length + pos[1])
  // value = array of directions
  const visited = new Map<number, [number, number][]>();

  let maxVisited = 0;

  for (const start of getAllPossibleStarts(grid)) {
    recurse(start.pos, start.dir);

    if (visited.size > maxVisited) {
      maxVisited = visited.size;
    }

    visited.clear();
  }

  return maxVisited.toString();

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

function getAllPossibleStarts(grid: string[][]) {
  const size = grid.length;
  if (size !== grid[0].length) throw new Error('assert height = width');

  const starts: { pos: [number, number]; dir: [number, number] }[] = [];

  for (let i = 0; i < size; i++) {
    starts.push(
      { pos: [0, i], dir: [1, 0] },
      { pos: [i, 0], dir: [0, 1] },
      { pos: [size - 1, i], dir: [-1, 0] },
      { pos: [i, size - 1], dir: [0, -1] }
    );
  }

  return starts;
}
