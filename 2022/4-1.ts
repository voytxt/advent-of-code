export default (input: string): string => {
  let sum = 0;

  for (const pair of input.split('\n')) {
    const elves = pair.split(',').map((elf) => elf.split('-').map((number) => parseInt(number)));

    const a = elves[0][0] >= elves[1][0] && elves[0][1] <= elves[1][1];
    const b = elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][1];

    if (a || b) sum++;
  }

  return sum.toString();
};
