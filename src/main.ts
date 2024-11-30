export async function getInput(): Promise<string> {
  return await Deno.readTextFile('./io/input.txt');
}

export async function getProblem(): Promise<{
  year: string;
  day: string;
  run: (input: string) => number;
}> {
  const [year, day] = Deno.args as [string | undefined, string | undefined];

  if (year === undefined || day === undefined) {
    console.error('%cPlease specify the year and problem', 'color: red');
    Deno.exit();
  }

  const problem = await import(`../${year}/${day}.ts`);

  return { year, day, run: problem.default };
}
