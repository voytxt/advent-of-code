export async function load(year: string, day: string): Promise<Problem> {
  if (year === undefined || day === undefined) {
    console.error('%cPlease specify the year and problem', 'color: red');
    Deno.exit();
  }

  const problem = await import(`../${year}/${day}.ts`);

  return { run: problem.default };
}

type Problem = { run: (input: string) => number };
