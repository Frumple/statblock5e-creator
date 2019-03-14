import parseText from './parse-text.js';
import Creature from '../stats/creature.js';

beforeEach(() => {
  Creature.reset();
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

  const parserResults = parseText(inputText);    
  
  expect(parserResults).not.toBeNull();
  expect(parserResults.inputText).toBe(inputText);
  expect(parserResults.outputText).toBe(inputText);
  expect(parserResults.error).toBeNull();
});

describe('should parse valid markdown formatting', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                 | inputText                                         | expectedOutputText
    ${'Emphasis Asterisk'}                      | ${'Emphasize with *asterisks*.'}                  | ${'Emphasize with <em>asterisks</em>.'}
    ${'Emphasis Underscore'}                    | ${'Emphasize with _underscores_.'}                | ${'Emphasize with <em>underscores</em>.'}
    ${'Strong Asterisk'}                        | ${'Strengthen with **asterisks**.'}               | ${'Strengthen with <strong>asterisks</strong>.'}
    ${'Strong Underscore'}                      | ${'Strengthen with __underscores__.'}             | ${'Strengthen with <strong>underscores</strong>.'}
    ${'Emphasis Asterisk in Strong Underscore'} | ${'Combine with __*asterisks* in underscores__.'} | ${'Combine with <strong><em>asterisks</em> in underscores</strong>.'}
    ${'Emphasis Underscore in Strong Asterisk'} | ${'Combine with **_underscores_ in asterisks**.'} | ${'Combine with <strong><em>underscores</em> in asterisks</strong>.'}
    ${'Strong Asterisk in Emphasis Underscore'} | ${'Combine with _**asterisks** in underscores_.'} | ${'Combine with <em><strong>asterisks</strong> in underscores</em>.'}
    ${'Strong Underscore in Emphasis Asterisk'} | ${'Combine with *__underscores__ in asterisks*.'} | ${'Combine with <em><strong>underscores</strong> in asterisks</em>.'}
  `
  ('$description: $inputText => $expectedOutputText',
  ({inputText, expectedOutputText}) => {
    const parserResults = parseText(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedOutputText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('should return an error with invalid markdown formatting', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                    | inputText
    ${'Unclosed Emphasis Asterisk'}                | ${'Emphasize with *asterisks.'}
    ${'Unclosed Emphasis Underscore'}              | ${'Emphasize with _underscores.'}
    ${'Unclosed Strong Asterisk'}                  | ${'Strengthen with **asterisks.'}
    ${'Unclosed Strong Underscore'}                | ${'Strengthen with __underscores.'}
    ${'Emphasis Asterisk across multiple lines'}   | ${'Emphasize with *asterisks\nacross* lines.'}
    ${'Emphasis Underscore across multiple lines'} | ${'Emphasize with _underscores\nacross_ lines.'}
    ${'Strong Asterisk across multiple lines'}     | ${'Strengthen with **asterisks\nacross** lines.'}
    ${'Strong Underscore across multiple lines'}   | ${'Strengthen with __underscores\nacross__ lines.'}
  `
  ('$description: $inputText',
  ({inputText}) => {
    const parserResults = parseText(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBeNull();
    expect(parserResults.error).not.toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('should parse valid name expressions', () => {
  const inputText =
    '{name} begins on a new line. {name} begins on a new sentence, but {name} does not.\n' +
    '{fullname} begins on a new line. {fullname} begins on a new sentence, but {fullname} does not.';

  it('when only the full name is defined', () => {
    Creature.fullName = 'Hook Horror';

    const expectedOutputText =      
      'The hook horror begins on a new line. The hook horror begins on a new sentence, but the hook horror does not.\n' +
      'The hook horror begins on a new line. The hook horror begins on a new sentence, but the hook horror does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name and short name are defined', () => {
    Creature.fullName = 'Ancient Red Dragon';
    Creature.shortName = 'dragon';

    const expectedOutputText =      
      'The dragon begins on a new line. The dragon begins on a new sentence, but the dragon does not.\n' +
      'The ancient red dragon begins on a new line. The ancient red dragon begins on a new sentence, but the ancient red dragon does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name is defined and it is a proper noun', () => {
    Creature.fullName = 'Tiamat';
    Creature.isProperNoun = true;

    const expectedOutputText =      
      'Tiamat begins on a new line. Tiamat begins on a new sentence, but Tiamat does not.\n' +
      'Tiamat begins on a new line. Tiamat begins on a new sentence, but Tiamat does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  it('when the full name and short name are defined and they are proper nouns', () => {
    Creature.fullName = 'Lady Kima of Vord';
    Creature.shortName = 'Lady Kima';
    Creature.isProperNoun = true;

    const expectedOutputText =      
      'Lady Kima begins on a new line. Lady Kima begins on a new sentence, but Lady Kima does not.\n' +
      'Lady Kima of Vord begins on a new line. Lady Kima of Vord begins on a new sentence, but Lady Kima of Vord does not.';

    parseAndVerifyNameExpressions(expectedOutputText);
  });

  function parseAndVerifyNameExpressions(expectedOutputText) {
    const parserResults = parseText(inputText);    
  
    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedOutputText);
    expect(parserResults.error).toBeNull();
  }
});

describe('should return an error with invalid name expressions', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                       | inputText
    ${'Unknown name expression'}      | ${'{blimey}'}
    ${'Unclosed name expression'}     | ${'{name'}
    ${'Unclosed fullname expression'} | ${'{fullname'}
  `
  ('$description: $inputText',
  ({inputText}) => {
    const parserResults = parseText(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBeNull();
    expect(parserResults.error).not.toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

it('should not parse expressions if disabled in settings', () => {
  const inputText =
    '{name} should not be parsed, neither should {fullname}. **Markdown _formatting_ should still work.**';

  const expectedOutputText =
    '{name} should not be parsed, neither should {fullname}. <strong>Markdown <em>formatting</em> should still work.</strong>';

  const settings = {
    enableExpressions: false
  };

  const parserResults = parseText(inputText, settings);    
  
  expect(parserResults).not.toBeNull();
  expect(parserResults.inputText).toBe(inputText);
  expect(parserResults.outputText).toBe(expectedOutputText);
  expect(parserResults.error).toBeNull();
});