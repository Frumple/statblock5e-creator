import fetch from 'unfetch';

export async function fetchFromFile(path) {
  return await fetch(path).then(stream => stream.text());
}