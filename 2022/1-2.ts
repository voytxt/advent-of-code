export default (input: string): string => {
  const calories = [];

  for (const elf of input.split('\n\n')) {
    let totalCalories = 0;

    for (const calorie of elf.split('\n')) {
      totalCalories += parseInt(calorie);
    }

    calories.push(totalCalories);
  }

  calories.sort((a, b) => b - a);

  return (calories[0] + calories[1] + calories[2]).toString();
};
