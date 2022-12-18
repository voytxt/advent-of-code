export default (input: string): string => {
  let x = 1;
  let pixels = '';
  let currentCycle = 0;

  for (const instruction of input.split('\n')) {
    if (instruction !== 'noop') {
      const value = instruction.split(' ')[1];

      render();
      render();

      x += parseInt(value);
    } else {
      render();
    }
  }

  function render() {
    const horizontal = currentCycle % 40;
    const isOverlapping = x - 1 === horizontal || x === horizontal || x + 1 === horizontal;

    pixels += isOverlapping ? '#' : '.';

    currentCycle++;
  }

  return pixels.match(/.{40}/g)!.join('\n');
};
