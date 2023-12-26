type Row = { map: string[]; groups: number[] };

export default function main(input: string): string {
  const rows = parseInput(input);

  let sum = 0;

  for (const row of rows) {
    sum += countArrangements(row);
  }

  return sum.toString();
}

function parseInput(input: string): Row[] {
  const rows: Row[] = [];

  for (const line of input.split('\n')) {
    const [map, groups] = line.split(' ');

    rows.push({
      map: map.split(''),
      groups: groups.split(',').map((e) => +e),
    });
  }

  return rows;
}

function countArrangements(row: Row, i = 0): number {
  if (i > row.map.length) {
    return checkIfValid(row) ? 1 : 0;
  }

  if (row.map[i] === '?') {
    return (
      countArrangements({ groups: row.groups, map: row.map.with(i, '#') }, i + 1) +
      countArrangements({ groups: row.groups, map: row.map.with(i, '.') }, i + 1)
    );
  } else {
    return countArrangements(row, i + 1);
  }
}

function checkIfValid(row: Row): boolean {
  const groups = row.map
    .join('')
    .split('.')
    .map((group) => group.length)
    .filter((group) => group !== 0);

  return groups.length === row.groups.length && groups.every((group, i) => group === row.groups[i]);
}
