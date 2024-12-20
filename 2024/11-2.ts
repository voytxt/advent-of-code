export default function main(input: string): string {
  let stones = new Map<number, number>(input.split(' ').map((n) => [+n, 1]));

  for (let i = 0; i < 75; i++) {
    const newStones = new Map<number, number>();

    for (const [stone, count] of stones) {
      const add = (s: number) =>
        newStones.set(s, (newStones.get(s) ?? 0) + count);

      if (stone === 0) add(1);
      else {
        const str = stone.toString();
        if (str.length % 2 === 0) {
          const x = 10 ** (str.length / 2);
          add(Math.floor(stone / x));
          add(stone % x);
        } else {
          add(stone * 2024);
        }
      }
    }

    stones = newStones;
  }

  return stones
    .entries()
    .reduce((acc, curr) => acc + curr[1], 0)
    .toString();
}
