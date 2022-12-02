export default (input: string): string => {
  const SCORE_TABLE: { [key: string]: number } = {
    A: 1, // rock
    B: 2, // paper
    C: 3, // scissors

    Z: 6, // win
    Y: 3, // draw
    X: 0, // loss
  };

  let points = 0;

  for (const round of input.split('\n')) {
    const [theirShape, gameResult] = round.split(' ');
    const [theirScore, gameScore] = [SCORE_TABLE[theirShape], SCORE_TABLE[gameResult]];

    if (gameScore === 6) {
      if (theirScore === 3) points += 1; // win with scissors
      else points += theirScore + 1; // win with rock or paper
    } else if (gameScore === 3) {
      points += theirScore; // draw
    } else {
      if (theirScore === 1) points += 3; // loss with rock
      else points += theirScore - 1; // loss with paper or scissors
    }

    points += gameScore;
  }

  return points.toString();
};
