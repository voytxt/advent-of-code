export default function main(input: string): string {
  const priorities = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let sum = 0;

  for (const rucksackGroup of input.match(/(?:.+\n?){3}/g) ?? []) {
    const rucksacks = rucksackGroup.split('\n');

    for (const item of rucksacks[0]) {
      if (rucksacks[1].includes(item) && rucksacks[2].includes(item)) {
        sum += priorities.indexOf(item);
        break;
      }
    }
  }

  return sum.toString();
}
