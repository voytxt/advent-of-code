const eq = (a: [number, number], b: [number, number]) =>
  a[0] === b[0] && a[1] === b[1];

export default function main(input: string): string {
  const grid = input.split("\n").map((l) => l.split("").map((e) => +e));

  // key = position id (pos[0] * grid.length + pos[1])
  // value = smallest amount of heat loss
  const hashmap = new Map<number, number>();

  recurse([0, 0], [0, 0]);

  return "";

  function recurse(
    pos: [number, number],
    dir: [number, number],
    _sameDirStreak = 0,
    heatLoss = 0,
  ) {
    const num = grid[pos[0]][pos[1]];

    console.log(num, { pos });

    const posId = pos[0] * grid.length + pos[1];

    if (heatLoss >= (hashmap.get(posId) ?? Infinity)) {
      // we can get here with smaller heat loss, so there's no point in continuing
      return;
    }

    hashmap.set(posId, heatLoss);

    for (const d of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      // we can't reverse direction
      if (-dir[0] === d[0] && -dir[1] === d[1]) continue;

      // if (same)
    }
  }
}
