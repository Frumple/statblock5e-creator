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

it('should parse standalone periods and text' , () => {
  const inputText =
    '.\n' +
    '  .\n' +
    'asdf\n' +
    '  asdf';

  const parserResults = parseNames(inputText);

  expect(parserResults).not.toBeNull();
  expect(parserResults.inputText).toBe(inputText);
  expect(parserResults.outputText).toBe(inputText);
  expect(parserResults.error).toBeNull();
});

describe('should parse valid name expressions', () => {
  const inputText =
    '[NAME] begins on a new line, but [NAME] does not. [NAME] begins on a new sentence, but [NAME] does not.\n' +
    '  [NAME] begins on an indented line, but [NAME] does not.\n' +
    '([NAME] has an opening bracket. ([NAME] has an opening bracket.\n' +
    '[NAME]) has a closing bracket. [NAME]) has a closing bracket.\n' +
    '([NAME]) has both brackets. ([NAME]) has both brackets.\n' +
    'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** [NAME] begins after a header. __Header.__ [NAME] begins after a header.\n' +
    'Name expressions do not begin as sentences there is no whitespace between the last period and expression.[NAME] does not begin as a sentence.\n' +

    '[name] begins on a new line, but [name] does not. [name] begins on a new sentence, but [name] does not.\n' +
    '  [name] begins on an indented line, but [name] does not.\n' +
    '([name] has an opening bracket. ([name] has an opening bracket.\n' +
    '[name]) has a closing bracket. [name]) has a closing bracket.\n' +
    '([name]) has both brackets. ([name]) has both brackets.\n' +
    'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** [name] begins after a header. __Header.__ [name] begins after a header.\n' +
    'Name expressions do not begin as sentences there is no whitespace between the last period and expression.[name] does not begin as a sentence.\n' +

    '[FULLNAME] begins on a new line, but [FULLNAME] does not. [FULLNAME] begins on a new sentence, but [FULLNAME] does not.\n' +
    '  [FULLNAME] begins on an indented line, but [FULLNAME] does not.\n' +
    '([FULLNAME] has an opening bracket. ([FULLNAME] has an opening bracket.\n' +
    '[FULLNAME]) has a closing bracket. [FULLNAME]) has a closing bracket.\n' +
    '([FULLNAME]) has both brackets. ([FULLNAME]) has both brackets.\n' +
    'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** [FULLNAME] begins after a header. __Header.__ [FULLNAME] begins after a header.\n' +
    'Name expressions do not begin as sentences there is no whitespace between the last period and expression.[FULLNAME] does not begin as a sentence.\n' +

    '[fullname] begins on a new line, but [fullname] does not. [fullname] begins on a new sentence, but [fullname] does not.\n' +
    '  [fullname] begins on an indented line, but [fullname] does not.\n' +
    '([fullname] has an opening bracket. ([fullname] has an opening bracket.\n' +
    '[fullname]) has a closing bracket. [fullname]) has a closing bracket.\n' +
    '([fullname]) has both brackets. ([fullname]) has both brackets.\n' +
    'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** [fullname] begins after a header. __Header.__ [fullname] begins after a header.\n' +
    'Name expressions do not begin as sentences there is no whitespace between the last period and expression.[fullname] does not begin as a sentence.';

  it('when only the full name is defined', () => {
    title.fullName = 'Hook Horror';

    const expectedOutputText =
      'The hook horror begins on a new line, but the hook horror does not. The hook horror begins on a new sentence, but the hook horror does not.\n' +
      '  The hook horror begins on an indented line, but the hook horror does not.\n' +
      '(The hook horror has an opening bracket. (The hook horror has an opening bracket.\n' +
      'The hook horror) has a closing bracket. The hook horror) has a closing bracket.\n' +
      '(The hook horror) has both brackets. (The hook horror) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The hook horror begins after a header. __Header.__ The hook horror begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the hook horror does not begin as a sentence.\n' +

      'The hook horror begins on a new line, but the hook horror does not. The hook horror begins on a new sentence, but the hook horror does not.\n' +
      '  The hook horror begins on an indented line, but the hook horror does not.\n' +
      '(The hook horror has an opening bracket. (The hook horror has an opening bracket.\n' +
      'The hook horror) has a closing bracket. The hook horror) has a closing bracket.\n' +
      '(The hook horror) has both brackets. (The hook horror) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The hook horror begins after a header. __Header.__ The hook horror begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the hook horror does not begin as a sentence.\n' +

      'The hook horror begins on a new line, but the hook horror does not. The hook horror begins on a new sentence, but the hook horror does not.\n' +
      '  The hook horror begins on an indented line, but the hook horror does not.\n' +
      '(The hook horror has an opening bracket. (The hook horror has an opening bracket.\n' +
      'The hook horror) has a closing bracket. The hook horror) has a closing bracket.\n' +
      '(The hook horror) has both brackets. (The hook horror) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The hook horror begins after a header. __Header.__ The hook horror begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the hook horror does not begin as a sentence.\n' +

      'The hook horror begins on a new line, but the hook horror does not. The hook horror begins on a new sentence, but the hook horror does not.\n' +
      '  The hook horror begins on an indented line, but the hook horror does not.\n' +
      '(The hook horror has an opening bracket. (The hook horror has an opening bracket.\n' +
      'The hook horror) has a closing bracket. The hook horror) has a closing bracket.\n' +
      '(The hook horror) has both brackets. (The hook horror) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The hook horror begins after a header. __Header.__ The hook horror begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the hook horror does not begin as a sentence.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name and short name are defined', () => {
    title.fullName = 'Ancient Red Dragon';
    title.shortName = 'dragon';

    const expectedOutputText =
      'The dragon begins on a new line, but the dragon does not. The dragon begins on a new sentence, but the dragon does not.\n' +
      '  The dragon begins on an indented line, but the dragon does not.\n' +
      '(The dragon has an opening bracket. (The dragon has an opening bracket.\n' +
      'The dragon) has a closing bracket. The dragon) has a closing bracket.\n' +
      '(The dragon) has both brackets. (The dragon) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The dragon begins after a header. __Header.__ The dragon begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the dragon does not begin as a sentence.\n' +

      'The dragon begins on a new line, but the dragon does not. The dragon begins on a new sentence, but the dragon does not.\n' +
      '  The dragon begins on an indented line, but the dragon does not.\n' +
      '(The dragon has an opening bracket. (The dragon has an opening bracket.\n' +
      'The dragon) has a closing bracket. The dragon) has a closing bracket.\n' +
      '(The dragon) has both brackets. (The dragon) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The dragon begins after a header. __Header.__ The dragon begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the dragon does not begin as a sentence.\n' +

      'The ancient red dragon begins on a new line, but the ancient red dragon does not. The ancient red dragon begins on a new sentence, but the ancient red dragon does not.\n' +
      '  The ancient red dragon begins on an indented line, but the ancient red dragon does not.\n' +
      '(The ancient red dragon has an opening bracket. (The ancient red dragon has an opening bracket.\n' +
      'The ancient red dragon) has a closing bracket. The ancient red dragon) has a closing bracket.\n' +
      '(The ancient red dragon) has both brackets. (The ancient red dragon) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The ancient red dragon begins after a header. __Header.__ The ancient red dragon begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the ancient red dragon does not begin as a sentence.\n' +

      'The ancient red dragon begins on a new line, but the ancient red dragon does not. The ancient red dragon begins on a new sentence, but the ancient red dragon does not.\n' +
      '  The ancient red dragon begins on an indented line, but the ancient red dragon does not.\n' +
      '(The ancient red dragon has an opening bracket. (The ancient red dragon has an opening bracket.\n' +
      'The ancient red dragon) has a closing bracket. The ancient red dragon) has a closing bracket.\n' +
      '(The ancient red dragon) has both brackets. (The ancient red dragon) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** The ancient red dragon begins after a header. __Header.__ The ancient red dragon begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.the ancient red dragon does not begin as a sentence.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name is defined and it is a proper noun', () => {
    title.fullName = 'Tiamat';
    title.isProperNoun = true;

    const expectedOutputText =
      'Tiamat begins on a new line, but Tiamat does not. Tiamat begins on a new sentence, but Tiamat does not.\n' +
      '  Tiamat begins on an indented line, but Tiamat does not.\n' +
      '(Tiamat has an opening bracket. (Tiamat has an opening bracket.\n' +
      'Tiamat) has a closing bracket. Tiamat) has a closing bracket.\n' +
      '(Tiamat) has both brackets. (Tiamat) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Tiamat begins after a header. __Header.__ Tiamat begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Tiamat does not begin as a sentence.\n' +

      'Tiamat begins on a new line, but Tiamat does not. Tiamat begins on a new sentence, but Tiamat does not.\n' +
      '  Tiamat begins on an indented line, but Tiamat does not.\n' +
      '(Tiamat has an opening bracket. (Tiamat has an opening bracket.\n' +
      'Tiamat) has a closing bracket. Tiamat) has a closing bracket.\n' +
      '(Tiamat) has both brackets. (Tiamat) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Tiamat begins after a header. __Header.__ Tiamat begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Tiamat does not begin as a sentence.\n' +

      'Tiamat begins on a new line, but Tiamat does not. Tiamat begins on a new sentence, but Tiamat does not.\n' +
      '  Tiamat begins on an indented line, but Tiamat does not.\n' +
      '(Tiamat has an opening bracket. (Tiamat has an opening bracket.\n' +
      'Tiamat) has a closing bracket. Tiamat) has a closing bracket.\n' +
      '(Tiamat) has both brackets. (Tiamat) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Tiamat begins after a header. __Header.__ Tiamat begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Tiamat does not begin as a sentence.\n' +

      'Tiamat begins on a new line, but Tiamat does not. Tiamat begins on a new sentence, but Tiamat does not.\n' +
      '  Tiamat begins on an indented line, but Tiamat does not.\n' +
      '(Tiamat has an opening bracket. (Tiamat has an opening bracket.\n' +
      'Tiamat) has a closing bracket. Tiamat) has a closing bracket.\n' +
      '(Tiamat) has both brackets. (Tiamat) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Tiamat begins after a header. __Header.__ Tiamat begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Tiamat does not begin as a sentence.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name and short name are defined and they are proper nouns', () => {
    title.fullName = 'Lady Kima of Vord';
    title.shortName = 'Lady Kima';
    title.isProperNoun = true;

    const expectedOutputText =
      'Lady Kima begins on a new line, but Lady Kima does not. Lady Kima begins on a new sentence, but Lady Kima does not.\n' +
      '  Lady Kima begins on an indented line, but Lady Kima does not.\n' +
      '(Lady Kima has an opening bracket. (Lady Kima has an opening bracket.\n' +
      'Lady Kima) has a closing bracket. Lady Kima) has a closing bracket.\n' +
      '(Lady Kima) has both brackets. (Lady Kima) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Lady Kima begins after a header. __Header.__ Lady Kima begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Lady Kima does not begin as a sentence.\n' +

      'Lady Kima begins on a new line, but Lady Kima does not. Lady Kima begins on a new sentence, but Lady Kima does not.\n' +
      '  Lady Kima begins on an indented line, but Lady Kima does not.\n' +
      '(Lady Kima has an opening bracket. (Lady Kima has an opening bracket.\n' +
      'Lady Kima) has a closing bracket. Lady Kima) has a closing bracket.\n' +
      '(Lady Kima) has both brackets. (Lady Kima) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Lady Kima begins after a header. __Header.__ Lady Kima begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Lady Kima does not begin as a sentence.\n' +

      'Lady Kima of Vord begins on a new line, but Lady Kima of Vord does not. Lady Kima of Vord begins on a new sentence, but Lady Kima of Vord does not.\n' +
      '  Lady Kima of Vord begins on an indented line, but Lady Kima of Vord does not.\n' +
      '(Lady Kima of Vord has an opening bracket. (Lady Kima of Vord has an opening bracket.\n' +
      'Lady Kima of Vord) has a closing bracket. Lady Kima of Vord) has a closing bracket.\n' +
      '(Lady Kima of Vord) has both brackets. (Lady Kima of Vord) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Lady Kima of Vord begins after a header. __Header.__ Lady Kima of Vord begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Lady Kima of Vord does not begin as a sentence.\n' +

      'Lady Kima of Vord begins on a new line, but Lady Kima of Vord does not. Lady Kima of Vord begins on a new sentence, but Lady Kima of Vord does not.\n' +
      '  Lady Kima of Vord begins on an indented line, but Lady Kima of Vord does not.\n' +
      '(Lady Kima of Vord has an opening bracket. (Lady Kima of Vord has an opening bracket.\n' +
      'Lady Kima of Vord) has a closing bracket. Lady Kima of Vord) has a closing bracket.\n' +
      '(Lady Kima of Vord) has both brackets. (Lady Kima of Vord) has both brackets.\n' +
      'Name expressions begin as sentences if there is markdown between the last period and expression. **Header.** Lady Kima of Vord begins after a header. __Header.__ Lady Kima of Vord begins after a header.\n' +
      'Name expressions do not begin as sentences there is no whitespace between the last period and expression.Lady Kima of Vord does not begin as a sentence.';

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
    ${'Unknown name expression'}      | ${'[nam]'}
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