// doesn't work (the solution number is too big)

export default function main(input: string): string {
  let steps = 0;

  const { moves, network } = parseInput(input);

  const currentLocations = Object.keys(network).filter((loc) => loc.endsWith('A'));

  for (const currentLocation of currentLocations) {
    let cycle = 0;
    while (!currentLocation.endsWith('Z')) {
      for (const move of moves) {
        for (let i = 0; i < currentLocations.length; i++) {
          currentLocations[i] = network[currentLocations[i]][move];
          i++;
        }

        steps++;
        if (steps % 10_000_000 === 0) console.log(steps);
      }
      cycle++;
    }
    console.log(currentLocation, cycle);
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
