export default function main(input: string): string {
  let sum = 0;

  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let currentNum = '';
    let isPart = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      const isCharANumber = /\d/.test(char);
      const isCharAtTheEndOfTheLine = j === line.length - 1;

      if (isCharANumber) {
        currentNum += char;

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
          ].some((e) => e !== undefined && e !== '.' && !/\d/.test(e))
        ) {
          isPart = true;
        }
      }

      if (!isCharANumber || isCharAtTheEndOfTheLine) {
        if (isPart) sum += +currentNum;

        currentNum = '';
        isPart = false;
      }
    }
  }

  return sum.toString();
}
