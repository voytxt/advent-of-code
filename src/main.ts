import { load } from './problem.ts';

const [year, day] = Deno.args;
const problem = await load(year, day);

const input = await Deno.readTextFile('./io/input.txt');

const t0 = performance.now();
const result = problem.run(input);
const t1 = performance.now();

console.log(`Result: %c${result}`, 'color: green');
console.log(`Finished in %c${(t1 - t0).toFixed(2)} ms`, 'color: green');
