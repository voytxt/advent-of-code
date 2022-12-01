const [year, problem] = Deno.args;

console.log(`%cRunning ${problem}`, 'color: yellow');

const run = (await import(`./${year}/${problem}.ts`)).default;

const input = Deno.readTextFileSync('./io/input.txt');

const startTime = performance.now();
const output = run(input);
const totalTime = (performance.now() - startTime).toFixed(2);

console.log(`%cCompleted ${problem} in ${totalTime}ms`, 'color: lime');

Deno.writeTextFileSync('./io/output.txt', output);
