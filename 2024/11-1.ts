export default function main(input: string): string {
  let stones = input.split(' ').map((e) => +e);

  for (let i = 0; i < 25; i++) {
    stones = stones
      .map((s) => {
        if (s === 0) return 1;

        const str = s.toString();
        if (str.length % 2 === 0) {
          return [+str.slice(0, str.length / 2), +str.slice(str.length / 2)];
        }

        return s * 2024;
      })
      .flat();
  }

  return stones.length.toString();
}
