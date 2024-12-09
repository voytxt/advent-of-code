export default function main(input: string): string {
  // array of numbers (file ids) and nulls (empty space)
  // one element = one block in the filesystem
  const system: (number | null)[] = parseInput(input);

  let checksum = 0;

  let l = 0;
  let r = system.length - 1;
  while (true) {
    if (system[l] === null) {
      while (system[r] === null) r--;
      if (r <= l) break;

      system[l] = system[r];
      system[r] = null;
    }

    checksum += system[l]! * l;
    l++;
  }

  return checksum.toString();
}

function parseInput(input: string): (number | null)[] {
  const system: (number | null)[] = [];

  for (let i = 0; i < input.length; i++) {
    const isFile = i % 2 === 0;
    const size = +input[i];

    if (isFile) {
      for (let j = 0; j < size; j++) {
        system.push(i / 2);
      }
    } else {
      for (let j = 0; j < size; j++) {
        system.push(null);
      }
    }
  }

  return system;
}
