export default (input: string): string => {
  let i = 0;

  while (i < input.length) {
    const set = new Set(input.slice(i, i + 14));

    if (set.size === 14) break;

    i++;
  }

  return (i + 14).toString();
};
