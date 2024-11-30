import { getInput, getProblem } from './main.ts';

const input = await getInput();
const problem = await getProblem();

Deno.bench(`Problem ${problem.year}/${problem.day}`, () => {
  problem.run(input);
});
