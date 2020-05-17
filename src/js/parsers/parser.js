import NameParser from './name-parser.js';
import MathParser from './math-parser.js';
import MarkdownParser from './markdown-parser.js';

import CurrentContext from '../models/current-context.js';

export function parse(inputText, nameParsingEnabled = true, mathParsingEnabled = true, markdownParsingEnabled = true, parserOptions = {}) {
  let results = {
    text: inputText,
    nameParserResults: null,
    mathParserResults: null,
    markdownParserResults: null
  };

  if (nameParsingEnabled) {
    results.nameParserResults = parseNames(results.text, parserOptions);
    if (results.nameParserResults.error) {
      return results;
    }
    results.text = results.nameParserResults.outputText;
  }

  if (mathParsingEnabled) {
    results.mathParserResults = parseMath(results.text, parserOptions);
    if (results.mathParserResults.error) {
      return results;
    }
    results.text = results.mathParserResults.outputText;
  }

  if (markdownParsingEnabled) {
    results.markdownParserResults = parseMarkdown(results.text, parserOptions);
    if (results.markdownParserResults.error) {
      return results;
    }
    results.text = results.markdownParserResults.outputText;
  }

  return results;
}

export function parseNames(inputText, parserOptions = {}) {
  parserOptions.creature = CurrentContext.creature.title.toParserOptions();
  return parseText(NameParser, inputText, parserOptions);
}

export function parseMath(inputText, parserOptions = {}) {
  parserOptions.abilities = CurrentContext.creature.abilities.toParserOptions();
  parserOptions.proficiencyBonus = CurrentContext.creature.challengeRating.toParserOptions();
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