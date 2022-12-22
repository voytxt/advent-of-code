export default (input: string): string => {
  const packets = input
    .replaceAll('\n\n', '\n')
    .split('\n')
    .map((line) => eval(line)) as [ArrayOrInt, ArrayOrInt];

  const sortedPackets = [...packets, [[2]], [[6]]].toSorted(compare).toReversed();

  const dividerPacketIndexes = [
    sortedPackets.findIndex((packet) => compareArrays(packet as ArrayOrInt[], [[2]]) === 0) + 1,
    sortedPackets.findIndex((packet) => compareArrays(packet as ArrayOrInt[], [[6]]) === 0) + 1,
  ];

  return (dividerPacketIndexes[0] * dividerPacketIndexes[1]).toString();
};

// 1 = correct order, 0 = indifferent, -1 = incorrect order
function compare(a: ArrayOrInt, b: ArrayOrInt): number {
  if (!Array.isArray(a) && !Array.isArray(b)) {
    return compareIntegers(a, b);
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return compareArrays(a, b);
  } else if (!Array.isArray(a) && Array.isArray(b)) {
    return compare([a], b);
  } else if (Array.isArray(a) && !Array.isArray(b)) {
    return compare(a, [b]);
  } else {
    return 0;
  }
}

function compareIntegers(a: number, b: number) {
  if (a === b) return 0;
  else return a < b ? 1 : -1;
}

function compareArrays(a: ArrayOrInt[], b: ArrayOrInt[]): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const result = compare(a[i], b[i]);

    if (result !== 0) return result;
  }

  if (a.length !== b.length) {
    return a.length < b.length ? 1 : -1;
  } else {
    return 0;
  }
}

type ArrayOrInt = Array<ArrayOrInt> | number;
