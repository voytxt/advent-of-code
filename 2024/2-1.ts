export default function main(input: string): string {
  let safeCount = 0;

  outer: for (const line of input.split('\n')) {
    const nums = line.split(' ').map((e) => +e);

    for (let i = 1; i < nums.length; i++) {
      const diff = Math.abs(nums[i] - nums[i - 1]);

      if (diff < 1 || diff > 3) continue outer;
    }

    if (
      nums
        .toSorted((a, b) => (nums[0] < nums[1] ? a - b : b - a))
        .every((e, i) => e === nums[i])
    ) {
      safeCount++;
    }
  }

  return safeCount.toString();
}
