export default function main(input: string): string {
  const g = input.split('\n');
  const antinodesSet = new Set<string>();

  for (const char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    const positions: [number, number][] = [];

    // get all positions of the specific char
    for (let i = 0; i < g.length; i++) {
      for (let j = 0; j < g[0].length; j++) {
        if (g[i][j] === char) {
          positions.push([i, j]);
        }
      }
    }

    // for every possible pair of positions, get the antinodes
    // and if they're in bounds, add them to the set
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];

        const dx = b[0] - a[0];
        const dy = b[1] - a[1];

        const possibleAntinodes: [number, number][] = [];

        for (let i = 0; i <= Math.max(g.length, g[0].length); i++) {
          possibleAntinodes.push(
            [b[0] + dx * i, b[1] + dy * i],
            [a[0] - dx * i, a[1] - dy * i],
          );
        }

        for (const a of possibleAntinodes) {
          if (a[0] >= 0 && a[0] < g.length && a[1] >= 0 && a[1] < g.length) {
            antinodesSet.add(a.join(' '));
          }
        }
      }
    }
  }

  return antinodesSet.size.toString();
}
