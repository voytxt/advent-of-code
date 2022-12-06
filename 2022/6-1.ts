export default (input: string): string => {
  let i = 0;

  while (i < input.length) {
    const set = new Set(input.slice(i, i + 4));

    if (set.size === 4) break;

    i++;
  }

  return (i + 4).toString();
};
