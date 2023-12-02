export default function main(input: string): string {
  let sum = 0;

  const max_red = 12;
  const max_green = 13;
  const max_blue = 14;

  for (const line of input.split('\n')) {
    let ok = true;

    for (const a of [...line.matchAll(/\d+(?= (green|blue|red))/g)]) {
      if (a[1] === 'red' && +a[0] > max_red) ok = false;
      if (a[1] === 'green' && +a[0] > max_green) ok = false;
      if (a[1] === 'blue' && +a[0] > max_blue) ok = false;
    }

    if (ok) {
      console.log(line);
      sum += +line.match(/\d+/)!;
    }
  }

  return sum.toString();
}
