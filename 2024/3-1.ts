export default function main(input: string): string {
// return eval([...input.matchAll(/mul\((\d+),(\d+)\)/g)].map(e=>e[1]*e[2]).join`+`)
// return [...input.matchAll(/mul\((\d+),(\d+)\)/g)].map(e=>s+=e[1]*e[2],s=0)|s
  return''+[...input.matchAll(/mul\((\d+),(\d+)\)/g)].reduce((a,c)=>a+c[1]*c[2],0)
}
