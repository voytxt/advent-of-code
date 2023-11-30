export default function main(input: string): string {
  let points = 0;

  for (const round of input.split('\n')) {
    const shapes = round.split(' ');

    const theirScore = shapes[0].charCodeAt(0) - 64;
    const gameResult = shapes[1];

    if (gameResult === 'Z') {
      points += theirScore === 3 ? 7 : theirScore + 7; // win
    } else if (gameResult === 'Y') {
      points += theirScore + 3; // draw
    } else {
      points += theirScore === 1 ? 3 : theirScore - 1; // loss
    }
  }

  return points.toString();
}
