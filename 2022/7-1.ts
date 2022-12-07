// i have no idea what i'm doing

export default (input: string): string => {
  const tree: any = {};

  let sum = 0;

  let path = [];
  let whatComesNextIsLsOutput = false;

  for (const line of input.split('\n')) {
    if (line.startsWith('$ cd')) {
      const dir = line.slice(5);

      if (dir === '..') path.pop();
      else if (dir === '/') path = [];
      else path.push(dir);

      whatComesNextIsLsOutput = false;
    } else if (whatComesNextIsLsOutput) {
      let subTree = tree;

      for (const folder of path) {
        if (subTree[folder] === undefined) subTree[folder] = {};
        subTree = subTree[folder];
      }

      const size = line.split(' ')[0];

      if (size === 'dir') continue;

      if (subTree.size === undefined) subTree.size = 0;
      // console.log(subTree.size);
      subTree.size += parseInt(size);

      // console.log(line, 'in', path);
    } else if (line.startsWith('$ ls')) {
      whatComesNextIsLsOutput = true;
    }
  }

  function loop(subTree: any) {
    let totalSize = 0;

    for (const key of Object.keys(subTree)) {
      if (key === 'size') {
        const currentSize = subTree[key];

        totalSize += currentSize;

        if (currentSize < 100_000) {
          sum += currentSize;
          console.log('ADDING', currentSize);
        } else {
          console.log('TOO BIG', currentSize);
        }

        continue;
      } else {
        loop(subTree[key]);
      }
    }

    return totalSize;
  }

  loop(tree);

  console.log(tree);

  return sum.toString();
};
