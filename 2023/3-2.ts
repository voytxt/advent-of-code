export default function main(input: string): string {
  let sum = 0;

  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '*') {
        const partNums: number[] = [];

        for (let i_ = -1; i_ <= 1; i_++) {
          for (let j_ = -1; j_ <= 1; j_++) {
            if (i_ === 0 && j_ === 0) continue;

            const char = lines[i_ + i]?.[j_ + j];

            if (char !== undefined && /\d/.test(char)) {
              const partNumI = i_ + i;
              let partNumJ = j_ + j;

              // find the left-most digit of the part number,
              // so we can slice from there and match the whole number
              while (/\d/.test(lines[partNumI][partNumJ - 1])) {
                partNumJ--;
              }

              const partNum = +lines[partNumI].slice(partNumJ).match(/\d+/)![0];

              if (!partNums.includes(partNum)) {
                partNums.push(partNum);
              }
            }
          }
        }

        if (partNums.length === 2) {
          sum += partNums[0] * partNums[1];
        }
      }
    }
  }

  return sum.toString();
}
