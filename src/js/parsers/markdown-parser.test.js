import { parseMarkdown } from './parser.js';
import Creature from '../models/creature.js';

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

  const parserResults = parseMarkdown(inputText);    
  
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
    const parserResults = parseMarkdown(inputText);

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
    const parserResults = parseMarkdown(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBeNull();
    expect(parserResults.error).not.toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});