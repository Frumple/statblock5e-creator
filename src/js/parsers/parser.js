import NameParser from './name-parser.js';
import MathParser from './math-parser.js';
import MarkdownParser from './markdown-parser.js';

import CurrentContext from '../models/current-context.js';

export function parseNames(inputText, parserOptions = {}) {
  parserOptions.creature = CurrentContext.creature.title.toParserOptions();
  return parseText(NameParser, inputText, parserOptions);
}

export function parseMath(inputText, parserOptions = {}) {
  parserOptions.abilities = CurrentContext.creature.abilities.toParserOptions();
  parserOptions.proficiencyBonus = CurrentContext.creature.proficiencyBonus.toParserOptions();
  return parseText(MathParser, inputText, parserOptions);
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