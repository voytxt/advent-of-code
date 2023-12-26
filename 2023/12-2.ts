// pain

type Row = { map: string[]; groups: number[] };

export default function main(input: string): string {
  const rows = parseInput(input);

  let sum = 0;

  for (const row of rows) {
    // console.log('current', row.map);
    sum += countArrangements(row.map, row.groups);
  }

  return sum.toString();
}

function parseInput(input: string): Row[] {
  const rows: Row[] = [];

  for (const line of input.split('\n')) {
    const [map, groups] = line.split(' ');

    const fiveTimes = (a: string, b: string) => {
      // return a + b + a + b + a + b + a + b + a;
      return a;
    };

    rows.push({
      map: fiveTimes(map, '?').split('.'),
      groups: fiveTimes(groups, ',')
        .split(',')
        .map((e) => +e),
    });
  }

  return rows;
}

// i: map[i] = currentBlock (e.g. "##??#")
// j: currentBlock[j] ("#" | "?")
function countArrangements(map: string[], groups: number[], completedSoFar = [''], i = 0): number {
  // console.log('map', map);

  if (i >= map.length) return 1;

  const currentBlock = map[i];

  console.log(i, 'cb', currentBlock);

  let arrangemenets: string[] = [currentBlock];

  for (let j = 0; j < currentBlock.length; j++) {
    if (currentBlock[j] === '?') {
      const newArrangemenets: string[] = [];

      for (const arrangemenet of arrangemenets) {
        const a = arrangemenet.slice(0, j);
        const b = arrangemenet.slice(j + 1);

        newArrangemenets.push(a + '#' + b);
        newArrangemenets.push(a + '.' + b);
      }

      arrangemenets = newArrangemenets;
    }
  }

  console.log(i, 'arrangements', arrangemenets);

  const newCompletedSoFar: string[] = [];

  for (const arr of arrangemenets) {
    for (const com of completedSoFar) {
      const n = com.concat(arr);

      const valid = checkIfValidSoFar(n, groups);

      if (valid) newCompletedSoFar.push(n);
    }
  }

  console.log('AL', arrangemenets.length);

  console.log('com', newCompletedSoFar);

  return countArrangements(map, groups, newCompletedSoFar, i + 1);
}

function checkIfValidSoFar(map: string, groups: number[]): boolean {
  // console.log('check', map, groups);
  let i = 0;

  for (const rawGroup of map.split('.')) {
    const length = rawGroup.length;

    if (length > 0) {
      if (length !== groups[i]) return false;
      i++;
    }
  }

  // console.log('YAYAY');

  return true;
}
// function checkIfValid(map: string[], groups: number[]): boolean {
//   let i = 0;

//   for (const rawGroup of map.split('.')) {
//     const length = rawGroup.length;

//     if (length > 0) {
//       if (length !== groups[i]) return false;
//       i++;
//     }
//   }

//   return i === groups.length;
// }
