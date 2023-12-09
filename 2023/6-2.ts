export default function main(input: string): string {
  const totalTime = +[...input.split('\n')[0].match(/\d+/g)!].join('');
  const recordDistance = +[...input.split('\n')[1].match(/\d+/g)!].join('');

  let counter = 0;

  for (let i = 0; i <= totalTime; i++) {
    const distance = (totalTime - i) * i;

    if (distance > recordDistance) counter++;
  }

  return counter.toString();
}
