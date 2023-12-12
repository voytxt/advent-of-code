export default function main(input: string): string {
  let steps = 0;

  const { moves, network } = parseInput(input);

  let currentLocation = 'AAA';

  while (currentLocation !== 'ZZZ') {
    for (const move of moves) {
      currentLocation = network[currentLocation][move];
      steps++;
    }
  }

  return steps.toString();
}

function parseInput(input: string) {
  const splitByLine = input.split('\n');

  const moves = splitByLine[0].split('') as ('L' | 'R')[];

  const network: Record<string, { L: string; R: string }> = {};

  for (const location of splitByLine.slice(2)) {
    const current = location.slice(0, 3);
    const left = location.slice(7, 10);
    const right = location.slice(12, 15);

    network[current] = { L: left, R: right };
  }

  return { moves, network };
}
