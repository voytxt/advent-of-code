export default function main(input: string): string {
  let sum = 0;

  for (const line of input.split('\n')) {
    let max_red = 0;
    let max_green = 0;
    let max_blue = 0;

    for (const a of [...line.matchAll(/\d+(?= (green|blue|red))/g)]) {
      if (a[1] === 'red' && +a[0] > max_red) max_red = +a[0];
      if (a[1] === 'green' && +a[0] > max_green) max_green = +a[0];
      if (a[1] === 'blue' && +a[0] > max_blue) max_blue = +a[0];
    }

    sum += max_blue * max_green * max_red;
  }

  return sum.toString();
}
