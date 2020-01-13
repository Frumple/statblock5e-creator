import NameParser from './name-parser.js';
import MathParser from './math-parser.js';
import MarkdownParser from './markdown-parser.js';

import Title from '../models/title.js';
import Abilities from '../models/abilities.js';
import ProficiencyBonus from '../models/proficiency-bonus.js';

export function parseNames(inputText, parserOptions = {}) {
  parserOptions.creature = Title.toParserOptions();
  return parseText(NameParser, inputText, parserOptions);
}

export function parseMath(inputText, parserOptions = {}) {
  parserOptions.abilities = Abilities.toParserOptions();
  parserOptions.proficiencyBonus = ProficiencyBonus.toParserOptions();
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