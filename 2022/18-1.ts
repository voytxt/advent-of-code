export default (input: string): string => {
  const cubes = input.split('\n').map((line) => {
    return line.split(',').map((number) => parseInt(number));
  });

  let sides = cubes.length * 6;

  for (const cube of cubes) {
    const positiveNeighbors = cubes.filter((c) => {
      const differentX = cube[0] + 1 === c[0] && cube[1] === c[1] && cube[2] === c[2];
      const differentY = cube[1] + 1 === c[1] && cube[0] === c[0] && cube[2] === c[2];
      const differentZ = cube[2] + 1 === c[2] && cube[0] === c[0] && cube[1] === c[1];

      return differentX || differentY || differentZ;
    });

    sides -= positiveNeighbors.length * 2;
  }

  return sides.toString();
};
