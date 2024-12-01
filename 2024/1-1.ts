export default function main(input: string): string {
  const a: number[] = [];
  const b: number[] = [];

  for (const line of input.split('\n')) {
    const [x, y] = line.split('   ').map((e) => +e);

    a.push(x);
    b.push(y);
  }

  a.sort((a, b) => a - b);
  b.sort((a, b) => a - b);

  return a.reduce((acc, curr, i) => acc + Math.abs(curr - b[i]), 0).toString();
}
