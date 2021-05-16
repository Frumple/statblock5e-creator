import { parseMarkdown } from './parser.js';
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
    description                                 | inputText                                                          | expectedOutputText
    ${'Emphasis Asterisk'}                      | ${'Emphasize with *asterisks*.'}                                   | ${'Emphasize with <em>asterisks</em>.'}
    ${'Emphasis Underscore'}                    | ${'Emphasize with _underscores_.'}                                 | ${'Emphasize with <em>underscores</em>.'}
    ${'Strong Asterisk'}                        | ${'Strengthen with **asterisks**.'}                                | ${'Strengthen with <strong>asterisks</strong>.'}
    ${'Strong Underscore'}                      | ${'Strengthen with __underscores__.'}                              | ${'Strengthen with <strong>underscores</strong>.'}
    ${'Strong Emphasis Asterisk'}               | ${'Emphasize and strengthen with ***asterisks***.'}                | ${'Emphasize and strengthen with <strong><em>asterisks</em></strong>.'}
    ${'Strong Emphasis Underscore'}             | ${'Emphasize and strengthen with ___underscores___.'}              | ${'Emphasize and strengthen with <strong><em>underscores</em></strong>.'}
    ${'Emphasis Asterisk in Strong Underscore'} | ${'Emphasize and strengthen with __*asterisks* in underscores__.'} | ${'Emphasize and strengthen with <strong><em>asterisks</em> in underscores</strong>.'}
    ${'Emphasis Underscore in Strong Asterisk'} | ${'Emphasize and strengthen with **_underscores_ in asterisks**.'} | ${'Emphasize and strengthen with <strong><em>underscores</em> in asterisks</strong>.'}
    ${'Strong Asterisk in Emphasis Underscore'} | ${'Emphasize and strengthen with _**asterisks** in underscores_.'} | ${'Emphasize and strengthen with <em><strong>asterisks</strong> in underscores</em>.'}
    ${'Strong Underscore in Emphasis Asterisk'} | ${'Emphasize and strengthen with *__underscores__ in asterisks*.'} | ${'Emphasize and strengthen with <em><strong>underscores</strong> in asterisks</em>.'}

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
    description                                           | inputText
    ${'Unclosed Emphasis Asterisk'}                       | ${'Emphasize with *asterisks.'}
    ${'Unclosed Emphasis Underscore'}                     | ${'Emphasize with _underscores.'}
    ${'Unclosed Strong Asterisk'}                         | ${'Strengthen with **asterisks.'}
    ${'Unclosed Strong Underscore'}                       | ${'Strengthen with __underscores.'}
    ${'Unclosed Strong Emphasis Asterisk'}                | ${'Emphasize and strengthen with ***asterisks.'}
    ${'Unclosed Strong Emphasis Underscore'}              | ${'Emphasize and strengthen with ___underscores.'}
    ${'Emphasis Asterisk across multiple lines'}          | ${'Emphasize with *asterisks\nacross* lines.'}
    ${'Emphasis Underscore across multiple lines'}        | ${'Emphasize with _underscores\nacross_ lines.'}
    ${'Strong Asterisk across multiple lines'}            | ${'Strengthen with **asterisks\nacross** lines.'}
    ${'Strong Underscore across multiple lines'}          | ${'Strengthen with __underscores\nacross__ lines.'}
    ${'Strong Emphasis Asterisk across multiple lines'}   | ${'Emphasize and strengthen with ***asterisks\nacross*** lines.'}
    ${'Strong Emphasis Underscore across multiple lines'} | ${'Emphasize adn strengthen with ___underscores\nacross___ lines.'}
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