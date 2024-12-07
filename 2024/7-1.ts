export default function main(input: string): string {
  let sum = 0;

  for (const line of input.split('\n')) {
    const [a, b] = line.split(': ');
    const result = +a;
    const nums = b.split(' ').map((e) => +e);

    const dfs = (curr: number, i: number): number[] => {
      if (i === nums.length) return [curr];
      return [...dfs(curr * nums[i], i + 1), ...dfs(curr + nums[i], i + 1)];
    };

    const possibleResults = dfs(nums[0], 1);

    if (possibleResults.includes(result)) {
      sum += result;
    }
  }

  return sum.toString();
}
