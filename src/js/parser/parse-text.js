import Parser from './parser.js';
import Creature from '../stats/creature.js';

const defaultSettings = {
  enableExpressions: true
};

export default function(inputText, settings = defaultSettings) {
  const parserOptions = {};
  parserOptions.settings = settings;
  parserOptions.creature = Creature.toParserOptions();

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