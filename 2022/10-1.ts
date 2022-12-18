export default (input: string): string => {
  const cycles: number[] = []; // x after each cycle
  let x = 1;

  for (const instruction of input.split('\n')) {
    if (instruction !== 'noop') {
      const value = instruction.split(' ')[1];

      cycles.push(x);

      x += parseInt(value);
    }

    cycles.push(x);
  }

  let sum = 0;

  for (let i = 20; i <= 220; i += 40) {
    sum += i * cycles[i - 2];
  }

  return sum.toString();
};
