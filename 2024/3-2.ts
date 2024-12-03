export default function main(input: string): string {
  return input
    .split('do()')
    .map((section) => section.split("don't()")[0])
    .map((s) => [...s.matchAll(/mul\((\d+),(\d+)\)/g)])
    .flat()
    .flatMap((m) => +m[1] * +m[2])
    .reduce((a, c) => a + c, 0)
    .toString();
}
