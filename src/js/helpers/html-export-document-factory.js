import { fetchFromFile } from './file-helpers.js';

let doc = null;

export async function init() {
  const template = await fetchFromFile('src/html/export-inlined.html');

  const parser = new DOMParser();
  doc = parser.parseFromString(template, 'text/html');

  return doc;
}

export function createInstance() {
  return doc.cloneNode(true);
}