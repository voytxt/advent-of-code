export default function main(input: string): string {
  let values = input
    .split('\n')[0]
    .split(' ')
    .slice(1)
    .map((e) => +e);

  for (const block of input.split('\n\n').slice(1)) {
    values = values.map((v) => {
      for (const line of block.split('\n').slice(1)) {
        const [bStart, aStart, range] = line.split(' ').map((e) => +e);
        const aEnd = aStart + range;

        const offset = bStart - aStart;

        if (v >= aStart && v < aEnd) return v + offset;
      }

      return v;
    });
  }

  return Math.min(...values).toString();
}
