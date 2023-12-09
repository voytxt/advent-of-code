// overcomplicated as fuck, but I'll leave it here for the funsies
// see part 2 for a way simpler solution

export default function main(input: string): string {
  let product = 1;

  const times = [...input.split('\n')[0].match(/\d+/g)!].map((e) => +e);
  const distances = [...input.split('\n')[1].match(/\d+/g)!].map((e) => +e);

  for (let i = 0; i < times.length; i++) {
    const totalTime = times[i];
    const recordDistance = distances[i];

    const numberOfWaysToBeatRecord = recurse({
      time: 0,
      isMoving: false,
      totalTime,
      speed: 0,
      distance: 0,
      recordDistance,
      numberOfWaysToBeatRecord: 0,
    });

    product *= numberOfWaysToBeatRecord;
  }

  return product.toString();
}

function recurse({
  time,
  isMoving,
  totalTime,
  speed,
  distance,
  recordDistance,
  numberOfWaysToBeatRecord,
}: {
  time: number;
  isMoving: boolean;
  totalTime: number;
  speed: number;
  distance: number;
  recordDistance: number;
  numberOfWaysToBeatRecord: number;
}): number {
  if (time === totalTime) {
    return numberOfWaysToBeatRecord + (distance > recordDistance ? 1 : 0);
  }

  time++;

  if (isMoving) {
    distance += speed;
  } else {
    speed++;

    numberOfWaysToBeatRecord = recurse({
      time,
      isMoving: true,
      totalTime,
      speed,
      distance,
      recordDistance,
      numberOfWaysToBeatRecord,
    });
  }

  return recurse({
    time,
    isMoving,
    totalTime,
    speed,
    distance,
    recordDistance,
    numberOfWaysToBeatRecord,
  });
}
