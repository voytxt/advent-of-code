export default function main(input: string): string {
  let sum = 0;

  for (const line of input.split('\n')) {
    let firstDigit: number | null = null;
    let lastDigit: number | null = null;

    for (const char of line) {
      if (parseInt(char)) {
        if (firstDigit === null) {
          firstDigit = parseInt(char);
        }

        lastDigit = parseInt(char);
      }
    }

    sum += firstDigit! * 10 + lastDigit!;
  }

  return sum.toString();
}
