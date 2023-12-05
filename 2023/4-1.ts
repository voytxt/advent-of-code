export default function main(input: string): string {
  let sum = 0;

  for (const line of input.split('\n')) {
    const [part1, part2] = line.split(':')[1].split('|');

    const ourNums = [...part1.matchAll(/\d+/g)].map((e) => +e[0]);
    const winningNums = [...part2.matchAll(/\d+/g)].map((e) => +e[0]);

    let points = 0;

    for (const ourNum of ourNums) {
      if (winningNums.includes(ourNum)) {
        if (points === 0) points = 1;
        else points *= 2;
      }
    }

    sum += points;
  }

  return sum.toString();
}
