type Row = { map: string; groups: number[] };

export default function main(input: string): string {
  const rows = parseInput(input);

  let sum = 0;

  for (const row of rows) {
    sum += countArrangements(row.map, row.groups);
  }

  return sum.toString();
}

function parseInput(input: string): Row[] {
  const rows: Row[] = [];

  for (const line of input.split('\n')) {
    const [map, groups] = line.split(' ');

    rows.push({
      map: map,
      groups: groups.split(',').map((e) => +e),
    });
  }

  return rows;
}

function countArrangements(map: string, groups: number[], i = 0): number {
  for (; i < map.length; i++) {
    if (map[i] === '?') {
      const a = map.slice(0, i);
      const b = map.slice(i + 1);

      const x = countArrangements(a + '#' + b, groups, i + 1);
      const y = countArrangements(a + '.' + b, groups, i + 1);

      return x + y;
    }
  }

  return checkIfValid(map, groups) ? 1 : 0;
}

function checkIfValid(map: string, groups: number[]): boolean {
  let i = 0;

  for (const rawGroup of map.split('.')) {
    if (rawGroup.length > 0) {
      if (rawGroup.length !== groups[i]) return false;
      i++;
    }
  }

  return i === groups.length;
}
