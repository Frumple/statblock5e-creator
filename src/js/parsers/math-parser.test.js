import { parseMath } from './parser.js';

beforeEach(() => {

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

  const parserResults = parseMath(inputText);

  expect(parserResults).not.toBeNull();
  expect(parserResults.inputText).toBe(inputText);
  expect(parserResults.outputText).toBe(inputText);
  expect(parserResults.error).toBeNull();
});

describe('should parse valid math expressions', () => {
  describe('with whole numbers only', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                          | inputText                       | expectedText
      ${'positive + positive'}             | ${'{42 + 19}'}                  | ${'61'}
      ${'positive + zero'}                 | ${'{42 + 0}'}                   | ${'42'}
      ${'positive + negative'}             | ${'{42 + -7}'}                  | ${'35'}
      ${'zero + positive'}                 | ${'{0 + 3}'}                    | ${'3'}
      ${'zero + zero'}                     | ${'{0 + 0}'}                    | ${'0'}
      ${'zero + negative'}                 | ${'{0 + -30}'}                  | ${'-30'}
      ${'negative + positive'}             | ${'{-14 + 22}'}                 | ${'8'}
      ${'negative + zero'}                 | ${'{-14 + 0}'}                  | ${'-14'}
      ${'negative + negative'}             | ${'{-14 + -238}'}               | ${'-252'}
      ${'positive - positive'}             | ${'{42 + 19}'}                  | ${'61'}
      ${'positive - zero'}                 | ${'{42 + 0}'}                   | ${'42'}
      ${'positive - negative'}             | ${'{42 + -7}'}                  | ${'35'}
      ${'zero - positive'}                 | ${'{0 + 3}'}                    | ${'3'}
      ${'zero - zero'}                     | ${'{0 + 0}'}                    | ${'0'}
      ${'zero - negative'}                 | ${'{0 + -30}'}                  | ${'-30'}
      ${'negative - positive'}             | ${'{-14 + 22}'}                 | ${'8'}
      ${'negative - zero'}                 | ${'{-14 + 0}'}                  | ${'-14'}
      ${'negative - negative'}             | ${'{-14 + -238}'}               | ${'-252'}
      ${'3 operands added'}                | ${'{101 + -28 + 77}'}           | ${'150'}
      ${'4 operands added'}                | ${'{101 + -28 + 77 + 4}'}       | ${'154'}
      ${'5 operands added'}                | ${'{101 + -28 + 77 + 4 + -56}'} | ${'98'}
      ${'3 operands subtracted'}           | ${'{101 - -28 - 77}'}           | ${'52'}
      ${'4 operands subtracted'}           | ${'{101 - -28 - 77 - 4}'}       | ${'48'}
      ${'5 operands subtracted'}           | ${'{101 - -28 - 77 - 4 - -56}'} | ${'104'}
      ${'3 operands added and subtracted'} | ${'{101 + -28 - 77}'}           | ${'-4'}
      ${'4 operands added and subtracted'} | ${'{101 + -28 - 77 + 4}'}       | ${'0'}
      ${'5 operands added and subtracted'} | ${'{101 + -28 - 77 + 4 + -56}'} | ${'-56'}
    `
    ('$description: {inputText="$inputText"} => $expectedText',
    ({inputText, expectedText}) => {
      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('should return invalid math expressions with no change', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                               | inputText
    ${'Unclosed brackets'}                    | ${'{42 + 19'}
    ${'Decimal numbers'}                      | ${'{42.83 - 19.11}'}
  `
  ('$description: {inputText="$inputText"} => $expectedText',
  ({inputText}) => {
    const parserResults = parseMath(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(inputText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});