import { load } from './problem.ts';

const [year, day] = Deno.args;
const problem = await load(year, day);

const input = await Deno.readTextFile('./io/input.txt');

Deno.bench(`Problem ${year}/${day}`, () => {
  problem.run(input);
});
