import { parseNames } from './parser.js';
import CurrentContext from '../models/current-context.js';

const title = CurrentContext.creature.title;

beforeEach(() => {
  title.reset();
});

it('should preserve newline characters', () => {
  const inputText =
    '\n' +
    'Line 2\n' +
    '\n' +
    'Line 4\r\n' +
    'Line 5\n' +
    '\n' +
    '\n' +
    'Line 8\n' +
    '\n';

  const parserResults = parseNames(inputText);

  expect(parserResults).not.toBeNull();
  expect(parserResults.inputText).toBe(inputText);
  expect(parserResults.outputText).toBe(inputText);
  expect(parserResults.error).toBeNull();
});

describe('should parse valid name expressions', () => {
  const inputText =
    '[name] begins on a new line. [name] begins on a new sentence, but [name] does not.\n' +
    '[fullname] begins on a new line. [fullname] begins on a new sentence, but [fullname] does not.';

  it('when only the full name is defined', () => {
    title.fullName = 'Hook Horror';

    const expectedOutputText =
      'The hook horror begins on a new line. The hook horror begins on a new sentence, but the hook horror does not.\n' +
      'The hook horror begins on a new line. The hook horror begins on a new sentence, but the hook horror does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name and short name are defined', () => {
    title.fullName = 'Ancient Red Dragon';
    title.shortName = 'dragon';

    const expectedOutputText =
      'The dragon begins on a new line. The dragon begins on a new sentence, but the dragon does not.\n' +
      'The ancient red dragon begins on a new line. The ancient red dragon begins on a new sentence, but the ancient red dragon does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name is defined and it is a proper noun', () => {
    title.fullName = 'Tiamat';
    title.isProperNoun = true;

    const expectedOutputText =
      'Tiamat begins on a new line. Tiamat begins on a new sentence, but Tiamat does not.\n' +
      'Tiamat begins on a new line. Tiamat begins on a new sentence, but Tiamat does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name and short name are defined and they are proper nouns', () => {
    title.fullName = 'Lady Kima of Vord';
    title.shortName = 'Lady Kima';
    title.isProperNoun = true;

    const expectedOutputText =
      'Lady Kima begins on a new line. Lady Kima begins on a new sentence, but Lady Kima does not.\n' +
      'Lady Kima of Vord begins on a new line. Lady Kima of Vord begins on a new sentence, but Lady Kima of Vord does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  function parseAndVerifyNameExpressions(expectedOutputText) {
    const parserResults = parseNames(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedOutputText);
    expect(parserResults.error).toBeNull();
  }
});

describe('should parse invalid name expressions unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                       | inputText
    ${'Unknown name expression'}      | ${'[blimey]'}
    ${'Unclosed name expression'}     | ${'[name'}
    ${'Unclosed fullname expression'} | ${'[fullname'}
  `
  ('$description: $inputText',
  ({inputText}) => {
    const parserResults = parseNames(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(inputText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});