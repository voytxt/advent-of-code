export default function main(input: string): string {
  let sum = 0;

  const gears: Record<string, number> = {};

  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let currentNum = '';
    let isPart = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char.match(/\d/)) {
        currentNum += char.toString();

        const symbolsAround = [
          line[j - 1],
          line[j + 1],
          lines[i + 1]?.[j + 1],
          lines[i + 1]?.[j],
          lines[i + 1]?.[j - 1],
          lines[i - 1]?.[j + 1],
          lines[i - 1]?.[j],
          lines[i - 1]?.[j - 1],
        ].filter((e) => e !== undefined && e !== '.' && !e.match(/\d/));

        if (symbolsAround.length) {
          isPart = true;
        }
      } else {
        if (isPart) {
          sum += +currentNum;

          if (gears[i.toString() + ',' + j.toString()] !== undefined) {
            sum += gears[i.toString() + ',' + j.toString()] * (+currentNum - 1);
          } else {
            gears[i.toString() + ',' + j.toString()] = +currentNum;
          }
        }

        currentNum = '';
        isPart = false;
      }

      if (j === line.length - 1 && isPart) {
        sum += +currentNum;
      }
    }
  }

  console.log(gears);

  return sum.toString();
}
