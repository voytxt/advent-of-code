export default function main(input: string): string {
  const platform = parseInput(input);
  const tiltedPlatform = tiltPlatform(platform);
  const totalLoad = calculateTotalLoad(tiltedPlatform);

  return totalLoad.toString();
}

function parseInput(input: string): string[][] {
  return input
    .split('\n')
    .reverse()
    .map((e) => e.split(''));
}

function tiltPlatform(platform: string[][]) {
  const tiltedPlatform: string[][] = [];

  for (let i = 0; i < platform.length; i++) {
    const line = platform[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === 'O') {
        const charNorth = platform[i + 1]?.[j];

        if (charNorth === '.') {
          line[j] = '.';
          platform[i + 1][j] = 'O';
        }

        // stacked rocks
        else if (charNorth === 'O') {
          let k = i + 2;

          while (platform[k]?.[j] === 'O') {
            k++;
          }

          if (platform[k]?.[j] === '.') {
            line[j] = '.';
            platform[k][j] = 'O';
          }
        }
      }
    }

    tiltedPlatform.push(line);
  }

  return platform;
}

function calculateTotalLoad(platform: string[][]) {
  let totalLoad = 0;

  for (let i = 0; i < platform.length; i++) {
    totalLoad += platform[i].filter((e) => e === 'O').length * (i + 1);
  }

  return totalLoad;
}
