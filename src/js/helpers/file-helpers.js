import isRunningInJsdom from './is-running-in-jsdom.js';

export async function fetchFromFile(path) {
  if (isRunningInJsdom) {
    const fs = require('fs');
    const util = require('util');
    const readFile = util.promisify(fs.readFile);

    return await readFile(path).then(buffer => buffer.toString());
  } else {
    return await fetch(path).then(stream => stream.text());
  }
}