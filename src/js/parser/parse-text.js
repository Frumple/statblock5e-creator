import Parser from './parser.js';
import Creature from '../stats/creature.js';

export default function(inputText) {
  const parserOptions = {};
  Object.assign(parserOptions, Creature.toParserOptions);

  const parserResults = {
    inputText: inputText,
    outputText: null,
    error: null
  };

  try {    
    const outputText = Parser.parse(inputText, parserOptions);
    parserResults.outputText = outputText;
  } catch (pegError) {
    parserResults.error = {
      message: pegError.message,
      location: pegError.location
    };
  }

  return parserResults;
}