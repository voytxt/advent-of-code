export default function main(input: string): string {
  let safeCount = 0;

  for (const line of input.split('\n')) {
    const nums = line.split(' ').map((e) => +e);

    if (isSafe(nums)) {
      safeCount++;
    } else {
      // try to remove a number
      for (let i = 0; i < nums.length; i++) {
        const nums_ = [...nums];
        nums_.splice(i, 1);

        if (isSafe(nums_)) {
          safeCount++;
          break;
        }
      }
    }
  }

  return safeCount.toString();
}

function isSafe(nums: number[]): boolean {
  const diff = (i: number): number =>
    i === 0 ? 1 : Math.abs(nums[i] - nums[i - 1]);

  return (
    nums.every((_, i) => diff(i) >= 1 && diff(i) <= 3) &&
    nums
      .toSorted((a, b) => (nums[0] < nums[1] ? a - b : b - a))
      .every((e, i) => e === nums[i])
  );
}
