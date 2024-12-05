export default function main(input: string): string {
  const [a, b] = input.split('\n\n');

  const rules = a.split('\n').map((line) => line.split('|').map((e) => +e));
  const updates = b.split('\n').map((line) => line.split(',').map((e) => +e));

  let sum = 0;

  const incorrectUpdates: number[][] = [];

  outer: for (const update of updates) {
    for (const rule of rules) {
      const i = update.indexOf(rule[0]);
      const j = update.indexOf(rule[1]);

      if (i == -1 || j == -1) continue;

      // is update incorrect?
      if (i > j) {
        incorrectUpdates.push(update);
        continue outer;
      }
    }
  }

  for (const update of incorrectUpdates) {
    update.sort((x, y) => {
      const rule = rules.find(
        (r) => (r[0] === x && r[1] === y) || (r[0] === y && r[1] === x),
      );

      if (rule === undefined) return 0;
      return rule[0] === x ? -1 : 1;
    });

    sum += update[Math.floor(update.length / 2)];
  }

  return sum.toString();
}
