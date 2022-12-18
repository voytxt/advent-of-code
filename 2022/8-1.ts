export default (input: string): string => {
  const rows = input.split('\n').map((row) => row.split(''));
  const columns = getColumns(rows);

  let visibleTrees = 0;

  for (const [rowIndex, row] of rows.entries()) {
    for (const [columnIndex, currentTree] of row.entries()) {
      const directions = getDirections(rows, columns, rowIndex, columnIndex);

      for (const direction of directions) {
        const isVisible = direction.every((tree) => parseInt(tree) < parseInt(currentTree));
        if (isVisible) {
          visibleTrees++;
          break;
        }
      }
    }
  }

  return visibleTrees.toString();
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

  const left = sameRow.slice(0, columnIndex);
  const right = sameRow.slice(columnIndex + 1);
  const up = sameColumn.slice(0, rowIndex);
  const down = sameColumn.slice(rowIndex + 1);

  return [left, right, up, down];
}
