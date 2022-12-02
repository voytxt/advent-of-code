export default (input: string): string => {
  // prettier-ignore
  const SCORE_TABLE: { [key: string]: number } = {
    A: 1, X: 1, // rock
    B: 2, Y: 2, // paper
    C: 3, Z: 3, // scissors
  };

  let points = 0;

  for (const round of input.split('\n')) {
    const [theirShape, ourShape] = round.split(' ');
    const [theirScore, ourScore] = [SCORE_TABLE[theirShape], SCORE_TABLE[ourShape]];

    if (ourScore === theirScore) {
      points += 3; // draw
    } else if (ourScore - 1 === theirScore || ourScore + 2 === theirScore) {
      points += 6; // win
    }

    points += ourScore;
  }

  return points.toString();
};
