export default function main(input: string): string {
  let sum = 0;

  for (const pattern of input.split('\n\n')) {
    const lines = pattern.split('\n');
    const repeatedRowIndexes = findAllRepeatedRowIndexes(lines);

    for (const index of repeatedRowIndexes) {
      if (hasHorizontalMirrorAt(lines, index)) {
        sum += (index + 1) * 100;
      }
    }

    const transposedLines = transposeLines(lines);
    const repeatedColumnIndexes = findAllRepeatedRowIndexes(transposedLines);

    for (const index of repeatedColumnIndexes) {
      if (hasHorizontalMirrorAt(transposedLines, index)) {
        sum += index + 1;
      }
    }
  }

  return sum.toString();
}

function findAllRepeatedRowIndexes(lines: string[]): number[] {
  const indexes: number[] = [];

  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i] === lines[i + 1]) {
      indexes.push(i);
    }
  }

  return indexes;
}

function hasHorizontalMirrorAt(lines: string[], at: number): boolean {
  let i = at;
  let j = at + 1;

  while (i >= 0 && j < lines.length) {
    if (lines[i] !== lines[j]) {
      return false;
    }

    i--, j++;
  }

  return true;
}

function transposeLines(lines: string[]): string[] {
  const transposedLines: string[] = [];

  for (let i = 0; i < lines[0].length; i++) {
    transposedLines[i] = lines.map((l) => l[i]).join('');
  }

  return transposedLines;
}
