export default function main(input: string): string {
  const priorities = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let sum = 0;

  for (const rucksack of input.split('\n')) {
    const [a, b] = [
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2),
    ];

    for (const item of a) {
      if (b.includes(item)) {
        sum += priorities.indexOf(item);
        break;
      }
    }
  }

  return sum.toString();
}
