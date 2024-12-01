export default function main(input: string): string {
  const a: number[] = [];
  const b: number[] = [];

  for (const line of input.split('\n')) {
    const [x, y] = line.split('   ').map((e) => +e);

    a.push(x);
    b.push(y);
  }

  const occ: Record<number, number> = {};

  for (const num of b) {
    occ[num] = (occ[num] ?? 0) + 1;
  }

  return a.reduce((acc, curr) => acc + curr * (occ[curr] ?? 0), 0).toString();
}
