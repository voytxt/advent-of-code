import { getInput, getProblem } from './main.ts';

const input = await getInput();
const problem = await getProblem();

const t0 = performance.now();
const result = problem.run(input);
const t1 = performance.now();

console.log(`Result: %c${result}`, 'color: green');
console.log(`Finished in %c${(t1 - t0).toFixed(2)} ms`, 'color: green');
