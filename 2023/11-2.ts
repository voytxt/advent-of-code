export default function main(input: string): string {
  const galaxies = parseInput(input);

  let sum = 0;

  for (let i = 0; i < galaxies.length; i++) {
    const galaxyA = galaxies[i];

    for (let j = 0; j < i; j++) {
      const galaxyB = galaxies[j];

      sum += Math.abs(galaxyA[0] - galaxyB[0]) + Math.abs(galaxyA[1] - galaxyB[1]);
    }
  }

  return sum.toString();
}

function parseInput(input: string): [number, number][] {
  const galaxies: [number, number][] = [];

  const lines = input.split('\n');

  let iOffset = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let jOffset = 0;

    if (!line.includes('#')) iOffset += 999999;

    for (let j = 0; j < line.length; j++) {
      if (lines.every((l) => l[j] === '.')) jOffset += 999999;

      if (line[j] === '#') {
        galaxies.push([i + iOffset, j + jOffset]);
      }
    }
  }

  return galaxies;
}
