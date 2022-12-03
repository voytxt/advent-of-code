export default (input: string): string => {
  const PRIORITIES = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let prioritiesSum = 0;

  for (const rucksack of input.split('\n')) {
    const [half1, half2] = [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)];

    for (const item of half1) {
      if (half2.includes(item)) {
        prioritiesSum += PRIORITIES.indexOf(item);
        break;
      }
    }
  }

  return prioritiesSum.toString();
};
