/* eslint-disable no-console */

// Run this script in node to generate the parser source code from the grammar.

const fs = require('fs');
const peg = require('pegjs');

const grammarFileName = 'grammar.pegjs';
const parserFileName = 'parser.js';

const parserOptions = {
  format: 'bare',
  optimize: 'speed',
  output: 'source'
};

console.log(`Reading grammar from '${grammarFileName}'...`);
const grammar = fs.readFileSync(grammarFileName).toString();
console.log('  Done');

console.log('Generating parser from grammar...');
var parser = peg.generate(grammar, parserOptions);
console.log('  Done');

// Inject 'export default' to the front of the parser object so that
// it can be imported as part of an ES6 module.
console.log('Converting parser into ES6 module...');
const indexOfObject = parser.indexOf('(function()');
parser = `${parser.slice(0, indexOfObject)}export default ${parser.slice(indexOfObject)}`;
console.log('  Done');

console.log(`Writing parser to '${parserFileName}'...`);
fs.writeFileSync(parserFileName, parser);
console.log('  Done');

