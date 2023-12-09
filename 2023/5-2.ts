// tackle this one another time

export default function main(input: string): string {
  const rawValues = input
    .split('\n')[0]
    .split(' ')
    .slice(1)
    .map((e) => +e);

  let ranges: [number, number][] = [];

  for (let i = 0; i < rawValues.length; i += 2) {
    ranges.push([rawValues[i], rawValues[i] + rawValues[i + 1]]);
  }

  for (const block of input.split('\n\n').slice(1)) {
    const newRanges: [number, number][] = [];

    ranges.forEach((r) => {
      for (const line of block.split('\n').slice(1)) {
        const [bStart, aStart, range] = line.split(' ').map((e) => +e);
        const a = [aStart, aStart + range];

        const offset = bStart - aStart;

        if (r[0] >= a[0] && r[1] <= a[1]) newRanges.push([r[0] + offset, r[1] + offset]);
        else if (r[0] < a[0] && r[1] > a[1]) {
          newRanges.push([r[0] + offset, r[1] + offset]);
        }

        // if (r >= aStart && r < aEnd) return r + offset;
      }

      newRanges.push(r);
    });

    ranges = newRanges;
  }

  return ranges
    .map((e) => e[0])
    .toSorted((a, b) => a - b)[0]
    .toString();
}
