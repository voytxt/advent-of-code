export default (input: string): string => {
  let maxCalories = 0;

  for (const elf of input.split('\n\n')) {
    let totalCalories = 0;

    for (const calorie of elf.split('\n')) {
      totalCalories += parseInt(calorie);
    }

    if (totalCalories > maxCalories) maxCalories = totalCalories;
  }

  return maxCalories.toString();
};
