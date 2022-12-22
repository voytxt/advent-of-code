export default (input: string): string => {
  const commands = ('\n' + input).split('\n$ ').slice(1);

  const path: string[] = [];
  const tree: Directory = { name: '/', size: 0, contents: [] };

  let smallestDirectorySize = Infinity;

  for (const command of commands) {
    if (command.startsWith('cd')) {
      cd(path, command.slice(3));
    } else if (command.startsWith('ls')) {
      ls(tree, path, command.split('\n').slice(1));
    }
  }

  function calculateSize(directory: Directory) {
    let size = 0;

    for (const fileOrDirectory of directory.contents) {
      if (fileOrDirectory.size === 0) {
        size += calculateSize(fileOrDirectory as Directory);
      } else {
        size += fileOrDirectory.size;
      }
    }

    return size;
  }
  const minSizeToDelete = calculateSize(tree) - 40_000_000;

  function findDirectoryToDelete(directory: Directory) {
    let size = 0;

    for (const fileOrDirectory of directory.contents) {
      if (fileOrDirectory.size === 0) {
        size += findDirectoryToDelete(fileOrDirectory as Directory);
      } else {
        size += fileOrDirectory.size;
      }
    }

    if (size > minSizeToDelete && size < smallestDirectorySize) {
      smallestDirectorySize = size;
    }

    return size;
  }
  findDirectoryToDelete(tree);

  return smallestDirectorySize.toString();
};

function cd(currentPath: string[], newPath: string) {
  if (newPath === '/') currentPath = [];
  else if (newPath === '..') currentPath.pop();
  else currentPath.push(newPath);
}

function ls(tree: Directory, path: string[], contents: string[]) {
  let subTree = tree;

  for (const directoryName of path) {
    subTree = subTree.contents.find((directory) => directory.name === directoryName) as Directory;
  }

  for (const fileOrDirectory of contents) {
    const [typeOrSize, name] = fileOrDirectory.split(' ');

    if (typeOrSize === 'dir') {
      subTree.contents.push({ name, size: 0, contents: [] });
    } else {
      subTree.contents.push({ name, size: parseInt(typeOrSize) });
    }
  }
}

type Directory = {
  name: string;
  size: 0;
  contents: Array<File | Directory>;
};

type File = {
  name: string;
  size: number;
};
