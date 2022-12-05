export default (input: string): string => {
  const lines = input.split('\n');

  const crateSetupEndIndex = lines.findLastIndex((line) => line.includes('['));

  const stackIndexes = lines[crateSetupEndIndex + 1];
  const numberOfStacks = parseInt(stackIndexes[stackIndexes.length - 2]);
  const crates: string[][] = Array.from(Array(numberOfStacks), () => []);

  const crateSetupLines = lines.slice(0, crateSetupEndIndex + 1);

  for (const line of crateSetupLines) {
    const cratesRow = line.match(/.{1,4}/g)?.map((crate) => crate[1]) ?? [];

    for (let stackIndex = 0; stackIndex < cratesRow.length; stackIndex++) {
      const crate = cratesRow[stackIndex];
      if (crate !== ' ') crates[stackIndex].unshift(crate);
    }
  }

  const instructionLines = lines.slice(crateSetupEndIndex + 3);

  for (const line of instructionLines) {
    const [quantity, from, to] = [...line.matchAll(/\d+/g)].map((number) => parseInt(number as unknown as string));
    const [fromStackIndex, toStackIndex] = [from - 1, to - 1];

    const pickedUpCrates: string[] = [];

    for (let i = 0; i < quantity; i++) {
      const crate = crates[fromStackIndex].pop();
      if (crate !== undefined) pickedUpCrates.push(crate);
    }

    pickedUpCrates.reverse();

    crates[toStackIndex].push(...pickedUpCrates);
  }

  const topCrates = crates.map((stack) => stack[stack.length - 1]);

  return topCrates.join('');
};
