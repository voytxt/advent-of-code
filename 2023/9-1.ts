export default function main(input: string): string {
  let sum = 0;

  for (const line of input.split('\n')) {
    const array = line.split(' ').map((e) => +e);

    let next = 0;

    while (!array.every((e) => e == 0)) {
      for (let i = 0; i < array.length - 1; i++) {
        const diff = array[i + 1] - array[i];
        array[i] = diff;
      }

      // remove last element from array
      next += array.splice(-1)[0];
    }

    sum += next;
  }

  return sum.toString();
}
