import Parser from './parser.js';

export default function(inputText) {
  const parserResults = {
    inputText: inputText,
    outputText: null,
    error: null
  };

  try {
    const outputText = Parser.parse(inputText);
    parserResults.outputText = outputText;
  } catch (pegError) {
    parserResults.error = {
      message: pegError.message,
      location: pegError.location
    };
  }

  return parserResults;
}