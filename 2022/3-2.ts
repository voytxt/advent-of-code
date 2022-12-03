export default (input: string): string => {
  const PRIORITIES = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let prioritiesSum = 0;

  for (const rucksackGroup of input.match(/(?:.+\n?){3}/g) ?? []) {
    const rucksacks = rucksackGroup.split('\n');

    for (const item of rucksacks[0]) {
      if (rucksacks[1].includes(item) && rucksacks[2].includes(item)) {
        prioritiesSum += PRIORITIES.indexOf(item);
        break;
      }
    }
  }

  return prioritiesSum.toString();
};
