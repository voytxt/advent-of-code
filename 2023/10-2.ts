export default function main(input: string): string {
  const lines = input.split('\n');

  const start = findStartInLines(lines);
  const pipes = parseLines(lines);
  const pipesThatConnectToStart = findAllPipesThatConnectToStart(start, pipes);

  pipes[start] = pipesThatConnectToStart;

  const pipeLoop = getAllPipeIndexesInLoop(start, pipes);
  const vertices = turnIndexesIntoCoords(pipeLoop, lines[0].length);

  const area = calculateArea(vertices);
  const interiorPoints = countInteriorPoints(area, vertices);

  return interiorPoints.toString();
}

function parseLines(lines: string[]): Record<number, number[]> {
  const pipes: Record<number, number[]> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const index = i * line.length + j;

      const f = (di: number, dj: number) => (i + di) * line.length + (j + dj);

      if (char === '|') pipes[index] = [f(-1, 0), f(1, 0)];
      else if (char === '-') pipes[index] = [f(0, -1), f(0, 1)];
      else if (char === 'L') pipes[index] = [f(-1, 0), f(0, 1)];
      else if (char === 'J') pipes[index] = [f(-1, 0), f(0, -1)];
      else if (char === '7') pipes[index] = [f(1, 0), f(0, -1)];
      else if (char === 'F') pipes[index] = [f(1, 0), f(0, 1)];
    }
  }

  return pipes;
}

function findStartInLines(lines: string[]): number {
  for (let i = 0; i < lines.length; i++) {
    const j = lines[i].indexOf('S');
    if (j !== -1) return i * lines[0].length + j;
  }

  return -1;
}

function findAllPipesThatConnectToStart(start: number, pipes: Record<number, number[]>): number[] {
  const pipesThatConnectToStart: number[] = [];

  for (const [i, neighbors] of Object.entries(pipes)) {
    if (neighbors.includes(start)) {
      pipesThatConnectToStart.push(+i);
    }
  }

  return pipesThatConnectToStart;
}

function getAllPipeIndexesInLoop(start: number, pipes: Record<number, number[]>) {
  const pipeLoop = [start];

  let previousPipe = start;
  let currentPipe = pipes[start][0];

  while (currentPipe != start) {
    pipeLoop.push(currentPipe);

    const nextPipe = pipes[currentPipe][0] === previousPipe ? pipes[currentPipe][1] : pipes[currentPipe][0];

    previousPipe = currentPipe;
    currentPipe = nextPipe;
  }

  return pipeLoop;
}

function turnIndexesIntoCoords(indexes: number[], width: number): [number, number][] {
  return indexes.map((i) => [i % width, Math.floor(i / width)]);
}

// https://en.wikipedia.org/wiki/Shoelace_formula
function calculateArea(vertices: [number, number][]) {
  let sum = 0;

  for (let i = 0; i < vertices.length; i++) {
    const [x1, y1] = vertices[i];
    const [x2, y2] = vertices[i + 1] ?? vertices[0];

    // sum += (x1 - x2) * (y1 + y2);
    sum += x1 * y2 - y1 * x2;
  }

  return Math.abs(sum) / 2;
}

// https://en.wikipedia.org/wiki/Pick%27s_theorem
function countInteriorPoints(area: number, vertices: [number, number][]) {
  return area - vertices.length / 2 + 1;
}
