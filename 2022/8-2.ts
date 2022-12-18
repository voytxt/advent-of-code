export default (input: string): string => {
  const rows = input.split('\n').map((row) => row.split(''));
  const columns = getColumns(rows);

  let highestScore = 0;

  for (const [rowIndex, row] of rows.entries()) {
    for (const [columnIndex, currentTree] of row.entries()) {
      let score = 1;

      const directions = getDirections(rows, columns, rowIndex, columnIndex);

      for (const direction of directions) {
        let localScore = 0;

        for (const tree of direction) {
          localScore++;

          if (parseInt(tree) >= parseInt(currentTree)) {
            break;
          }
        }

        if (localScore === 0) {
          score = 0;
          break;
        }

        score *= localScore;
      }

      if (score > highestScore) highestScore = score;
    }
  }

  return highestScore.toString();
};

function getColumns(rows: string[][]) {
  const columns: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    const column: string[] = [];

    for (let j = 0; j < rows.length; j++) {
      column.push(rows[j][i]);
    }

    columns.push(column);
  }

  return columns;
}

function getDirections(rows: string[][], columns: string[][], rowIndex: number, columnIndex: number) {
  const sameRow = rows[rowIndex];
  const sameColumn = columns[columnIndex];

  const left = sameRow.slice(0, columnIndex).toReversed();
  const right = sameRow.slice(columnIndex + 1);
  const up = sameColumn.slice(0, rowIndex).toReversed();
  const down = sameColumn.slice(rowIndex + 1);

  return [left, right, up, down];
}
