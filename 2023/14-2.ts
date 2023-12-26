export default function main(input: string): string {
  const platform = parseInput(input);
  const tiltedPlatform = cycle(platform);
  const totalLoad = calculateTotalLoad(tiltedPlatform);

  return totalLoad.toString();
}

function parseInput(input: string): string[][] {
  return input
    .split('\n')
    .toReversed()
    .map((e) => e.split(''));
}

function cycle(platform: string[][]) {
  let currentPlatform = platform;

  const seenStrings: string[] = [];
  let foundCycle = false;

  for (let i = 0; i < 1_000_000_000; i++) {
    currentPlatform = doOneCycle(currentPlatform);
    const currentPlatformString = currentPlatform.map((l) => l.join('')).join('\n');

    // found a repeating cycle
    if (seenStrings.includes(currentPlatformString) && !foundCycle) {
      const prevSeenIndex = seenStrings.indexOf(currentPlatformString);

      const cycleLength = i - prevSeenIndex;
      const offset = prevSeenIndex;
      const goal = 1_000_000_000 - 1; // we start i from 0, so the goal is -1

      i = Math.floor((goal - offset) / cycleLength) * cycleLength + offset;
      foundCycle = true;
    } else {
      seenStrings.push(currentPlatformString);
    }
  }

  return currentPlatform;
}

function doOneCycle(platform: string[][]) {
  platform = tiltPlatform(platform); // north
  platform = tiltPlatform(rotatePlatform(platform)); // west
  platform = tiltPlatform(rotatePlatform(platform)); // south
  platform = tiltPlatform(rotatePlatform(platform)); // east

  return rotatePlatform(platform); // north
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

function rotatePlatform(platform: string[][]): string[][] {
  const rotatedPlatform: string[][] = [];

  for (let i = 0; i < platform[0].length; i++) {
    rotatedPlatform[i] = platform.map((l) => l[i]);
  }

  return rotatedPlatform.toReversed();
}

function calculateTotalLoad(platform: string[][]) {
  let totalLoad = 0;

  for (let i = 0; i < platform.length; i++) {
    totalLoad += platform[i].filter((e) => e === 'O').length * (i + 1);
  }

  return totalLoad;
}
