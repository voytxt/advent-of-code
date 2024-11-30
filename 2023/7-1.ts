export default function main(input: string): string {
  const hands = parseInput(input);

  hands.sort((a, b) => {
    return a.type - b.type;
  });

  return "";
}

function parseInput(input: string) {
  const hands: { type: number; bid: number }[] = [];

  for (const line of input.split("\n")) {
    const [cards, bid] = line.split(" ");

    const type = getType(cards.split(""));

    hands.push({ type: type!, bid: +bid });
  }

  return hands;
}

function getType(cards: string[]) {
  const groups = new Set(...cards);

  if (groups.size === 1) return 1;
  else if (groups.size === 2) {
    return 2;
  }
}
