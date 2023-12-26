export default function main(input: string): string {
  let sum = 0;

  for (const step of input.split(',')) {
    sum += hash(step);
  }

  return sum.toString();
}

function hash(str: string): number {
  let currentValue = 0;

  for (const char of str) {
    currentValue += char.charCodeAt(0);
    currentValue *= 17;
    currentValue = currentValue % 256;
  }

  return currentValue;
}
