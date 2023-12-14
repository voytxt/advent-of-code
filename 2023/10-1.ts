export default function main(input: string): string {
  const lines = input.split('\n');

  const start = findStartInLines(lines);
  const pipes = parseLines(lines);
  const pipesThatConnectToStart = findAllPipesThatConnectToStart(start, pipes);
  const furthestPointDistance = bfs(start, pipes, pipesThatConnectToStart);

  return furthestPointDistance.toString();
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

function bfs(start: number, pipes: Record<number, number[]>, pipesThatConnectToStart: number[]): number {
  const queue = [...pipesThatConnectToStart];
  const visited = [...pipesThatConnectToStart, start];
  const distancesFromStart: Record<number, number> = {};

  distancesFromStart[start] = 0;

  for (const pipe of pipesThatConnectToStart) {
    distancesFromStart[pipe] = 1;
  }

  while (queue.length > 0) {
    const pipe = queue.shift()!;
    const neighbors = pipes[pipe];

    if (neighbors !== undefined) {
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor)) {
          queue.push(neighbor);
          visited.push(neighbor);
          distancesFromStart[neighbor] = distancesFromStart[pipe] + 1;
        }
      }
    }
  }

  return Math.max(...Object.values(distancesFromStart));
}
