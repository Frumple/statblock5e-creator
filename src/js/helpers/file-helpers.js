import isRunningInNode from './is-running-in-node.js';

export async function fetchFromFile(path) {
  if (isRunningInNode) {
    const fs = require('fs');
    const util = require('util');
    const readFile = util.promisify(fs.readFile);

    return await readFile(path).then(buffer => buffer.toString());
  } else {
    return await fetch(path).then(stream => stream.text());
  }
}