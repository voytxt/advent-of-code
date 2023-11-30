export default function main(input: string): string {
  let points = 0;

  for (const round of input.split('\n')) {
    const shapes = round.split(' ');

    const theirScore = shapes[0].charCodeAt(0) - 64;
    const ourScore = shapes[1].charCodeAt(0) - 87;

    if (ourScore === theirScore) {
      points += 3; // draw
    } else if (ourScore - 1 === theirScore || ourScore + 2 === theirScore) {
      points += 6; // win
    }

    points += ourScore;
  }

  return points.toString();
}
