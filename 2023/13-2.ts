export default function main(input: string): string {
  let sum = 0;

  for (const pattern of input.split('\n\n')) {
    const lines = pattern.split('\n');
    const repeatedRowIndexes = findAllRepeatedRowIndexes(lines);

    for (const index of repeatedRowIndexes) {
      if (hasHorizontalSmudgedMirrorAt(lines, index)) {
        sum += (index + 1) * 100;
      }
    }

    const transposedLines = transposeLines(lines);
    const repeatedColumnIndexes = findAllRepeatedRowIndexes(transposedLines);

    for (const index of repeatedColumnIndexes) {
      if (hasHorizontalSmudgedMirrorAt(transposedLines, index)) {
        sum += index + 1;
      }
    }
  }

  return sum.toString();
}

function findAllRepeatedRowIndexes(lines: string[]): number[] {
  const indexes: number[] = [];

  for (let i = 0; i < lines.length - 1; i++) {
    if (getSmudgeQuantity(lines[i], lines[i + 1]) < 2) {
      indexes.push(i);
    }
  }

  return indexes;
}

function hasHorizontalSmudgedMirrorAt(lines: string[], at: number): boolean {
  let i = at;
  let j = at + 1;

  let foundSmudge = false;

  while (i >= 0 && j < lines.length) {
    if (lines[i] !== lines[j]) {
      if (!foundSmudge && getSmudgeQuantity(lines[i], lines[j]) === 1) {
        foundSmudge = true;
      } else {
        return false;
      }
    }

    i--, j++;
  }

  return foundSmudge;
}

function transposeLines(lines: string[]): string[] {
  const transposedLines: string[] = [];

  for (let i = 0; i < lines[0].length; i++) {
    transposedLines[i] = lines.map((l) => l[i]).join('');
  }

  return transposedLines;
}

function getSmudgeQuantity(a: string, b: string): number {
  const x = [...a];
  const y = [...b];

  return x.filter((e, i) => e !== y[i]).length;
}
