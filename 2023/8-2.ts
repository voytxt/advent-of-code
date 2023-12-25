export default function main(input: string): string {
  const { moves, network } = parseInput(input);

  const startingLocations = Object.keys(network).filter((loc) => loc.endsWith('A'));
  const stepsToEachLocation: number[] = [];

  for (let i = 0; i < startingLocations.length; i++) {
    let steps = 0;
    let currentLocation = startingLocations[i];

    while (!currentLocation.endsWith('Z')) {
      for (const move of moves) {
        currentLocation = network[currentLocation][move];
        steps++;
      }
    }

    stepsToEachLocation.push(steps);
  }

  return leastCommonMultiple(stepsToEachLocation).toString();
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

function leastCommonMultiple(nums: number[]): number {
  //  greatest common divisor  https://en.wikipedia.org/wiki/Euclidean_algorithm
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

  // least common multiple
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

  if (nums.length === 2) {
    return lcm(nums[0], nums[1]);
  }

  return lcm(nums[0], leastCommonMultiple(nums.slice(1)));
}
