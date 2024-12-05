export default function main(input: string): string {
  const [a, b] = input.split('\n\n');

  const rules = a.split('\n').map((line) => line.split('|').map((e) => +e));
  const updates = b.split('\n').map((line) => line.split(',').map((e) => +e));

  let sum = 0;

  outer: for (const update of updates) {
    for (const rule of rules) {
      const i = update.indexOf(rule[0]);
      const j = update.indexOf(rule[1]);

      if (i == -1 || j == -1) continue;

      // is update incorrect?
      if (i > j) {
        continue outer;
      }
    }

    // update is correct

    sum += update[Math.floor(update.length / 2)];
  }

  return sum.toString();
}
