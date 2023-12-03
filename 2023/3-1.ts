export default function main(input: string): string {
  let sum = 0;

  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let currentNum = '';
    let isPart = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char.match(/\d/)) {
        currentNum += char.toString();

        if (
          [
            line[j - 1],
            line[j + 1],
            lines[i + 1]?.[j + 1],
            lines[i + 1]?.[j],
            lines[i + 1]?.[j - 1],
            lines[i - 1]?.[j + 1],
            lines[i - 1]?.[j],
            lines[i - 1]?.[j - 1],
          ].some((e) => e !== undefined && e !== '.' && !e.match(/\d/))
        ) {
          isPart = true;
        }
      } else {
        if (isPart) {
          sum += +currentNum;
        }

        currentNum = '';
        isPart = false;
      }

      if (j === line.length - 1 && isPart) {
        sum += +currentNum;
      }
    }
  }

  return sum.toString();
}
