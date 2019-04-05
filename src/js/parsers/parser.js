import ExpressionParser from './expression-parser.js';
import MarkdownParser from './markdown-parser.js';
import Creature from '../models/creature.js';

export function parseExpressions(inputText, parserOptions = {}) {
  parserOptions.creature = Creature.toParserOptions();
  return parseText(ExpressionParser, inputText, parserOptions);
}

export function parseMarkdown(inputText, parserOptions = {}) {
  return parseText(MarkdownParser, inputText, parserOptions);
}

function parseText(parser, inputText, parserOptions) {
  const parserResults = {
    inputText: inputText,
    outputText: null,
    error: null
  };

  try {    
    const outputText = parser.parse(inputText, parserOptions);
    parserResults.outputText = outputText;
  } catch (pegError) {
    parserResults.error = {
      message: pegError.message,
      location: pegError.location
    };
  }

  return parserResults;
}