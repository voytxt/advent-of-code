// start is inclusive, end is exclusive
type Range = { start: number; end: number };
type Map = Range & { offset: number };

export default function main(input: string): string {
  let ranges = parseSeeds(input);
  const almanac = parseAlmanac(input);

  for (const maps of almanac) {
    const newRanges: Range[] = [];

    for (const range of ranges) {
      newRanges.push(...applyMapsToRange(range, maps));
    }

    ranges = newRanges;
  }

  return Math.min(...ranges.map((r) => r.start)).toString();
}

function parseSeeds(input: string) {
  const rawSeeds = input
    .split('\n')[0]
    .split(' ')
    .slice(1)
    .map((e) => +e);

  const seeds: Range[] = [];

  for (let i = 0; i < rawSeeds.length; i += 2) {
    seeds.push({
      start: rawSeeds[i],
      end: rawSeeds[i] + rawSeeds[i + 1],
    });
  }

  return seeds;
}

function parseAlmanac(input: string) {
  const almanac: Map[][] = [];

  for (const block of input.split('\n\n').slice(1)) {
    const lines = block.split('\n').slice(1);

    const maps: Map[] = [];

    for (const line of lines) {
      const [bStart, aStart, length] = line.split(' ').map((e) => +e);

      maps.push({
        start: aStart,
        end: aStart + length,
        offset: bStart - aStart,
      });
    }

    almanac.push(maps);
  }

  return almanac;
}

function applyMapsToRange(range: Range | null, maps: Map[]) {
  const newRanges: Range[] = [];

  for (const map of maps.toSorted((a, b) => a.start - b.start)) {
    const { before, intersection, after } = splitRange(range!, map);

    if (before !== null) {
      newRanges.push(before);
    }

    if (intersection !== null) {
      newRanges.push({
        start: intersection.start + map.offset,
        end: intersection.end + map.offset,
      });
    }

    range = after;

    if (range === null) {
      break;
    }
  }

  if (range !== null) {
    newRanges.push(range);
  }

  return newRanges;
}

//        range:  x-------------x
//          map:      x-----x
//       before:  x---x
// intersection:      x-----x
//        after:            x---x
function splitRange(r: Range, m: Map): { before: Range | null; intersection: Range | null; after: Range | null } {
  if (r.end <= m.start) return { before: r, intersection: null, after: null };
  if (r.start >= m.end) return { before: null, intersection: null, after: r };

  return {
    before: r.start < m.start ? { start: r.start, end: m.start } : null,
    intersection: { start: Math.max(r.start, m.start), end: Math.min(r.end, m.end) },
    after: r.end > m.end ? { start: m.end, end: r.end } : null,
  };
}
