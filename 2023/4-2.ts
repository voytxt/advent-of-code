export default function main(input: string): string {
  const cards = input.split('\n').map((line) => {
    const [part1, part2] = line.split(':')[1].split('|');

    const cardNum = +line.match(/\d+/)?.[0]!;
    const ourNums = [...part1.matchAll(/\d+/g)].map((e) => +e[0]);
    const winningNums = [...part2.matchAll(/\d+/g)].map((e) => +e[0]);

    return { cardNum, ourNums, winningNums };
  });

  let i = 0;

  while (i < cards.length) {
    const card = cards[i];

    let numOfNextWinningCard = card.cardNum + 1;

    for (const ourNum of card.ourNums) {
      if (card.winningNums.includes(ourNum)) {
        const newCard = cards.find((c) => c?.cardNum === numOfNextWinningCard);

        cards.push(newCard!);

        numOfNextWinningCard++;
      }
    }

    i++;
  }

  return i.toString();
}
