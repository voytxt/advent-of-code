const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export default function main(input: string): string {
  let sum = 0;

  for (const line of input.split('\n')) {
    let firstDigit: number | null = null;
    let lastDigit: number | null = null;

    for (const [i, char] of Object.entries([...line])) {
      if (parseInt(char)) {
        if (firstDigit === null) {
          firstDigit = parseInt(char);
        }

        lastDigit = parseInt(char);
      } else {
        for (const [j, num] of Object.entries(nums)) {
          if (line.slice(+i).startsWith(num)) {
            if (firstDigit === null) {
              firstDigit = +j + 1;
            }

            lastDigit = +j + 1;
          }
        }
      }
    }

    sum += firstDigit! * 10 + lastDigit!;
  }

  return sum.toString();
}
