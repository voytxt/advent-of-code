export default function main(input: string): string {
  let sum = 0;

  const boxes: Array<Record<string, number>> = Array(256)
    .fill(undefined)
    .map(() => ({}));

  for (const step of input.split(',')) {
    if (step.includes('=')) {
      const [label, focalLength] = step.split('=');
      const box = hash(label);

      boxes[box][label] = +focalLength;
    } else {
      const [label] = step.split('-');
      const box = hash(label);

      delete boxes[box][label];
    }
  }

  for (let i = 0; i < boxes.length; i++) {
    const focalLengths = Object.values(boxes[i]);

    for (let j = 0; j < focalLengths.length; j++) {
      const focalLength = focalLengths[j];

      sum += (i + 1) * (j + 1) * focalLength;
    }
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
