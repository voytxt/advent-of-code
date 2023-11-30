export async function load(year: string, day: string): Promise<Problem> {
  if (year === undefined || day === undefined) {
    console.error('%cPlease specify the year and problem', 'color: red');
    Deno.exit();
  }

  try {
    const problem = await import(`../${year}/${day}.ts`);

    return { run: problem.default };
  } catch {
    console.error(`%cFile ${year}/${day}.ts not found`, 'color: red');
    Deno.exit();
  }
}

type Problem = { run: (input: string) => number };
