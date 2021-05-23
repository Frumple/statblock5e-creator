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
    description                               | inputText                                                          | expectedOutputText
    ${'Single asterisk'}                      | ${'Emphasize with *asterisks*.'}                                   | ${'Emphasize with <em>asterisks</em>.'}
    ${'Single underscore'}                    | ${'Emphasize with _underscores_.'}                                 | ${'Emphasize with <em>underscores</em>.'}
    ${'Double asterisk'}                      | ${'Strengthen with **asterisks**.'}                                | ${'Strengthen with <strong>asterisks</strong>.'}
    ${'Double underscore'}                    | ${'Strengthen with __underscores__.'}                              | ${'Strengthen with <strong>underscores</strong>.'}
    ${'Triple asterisk'}                      | ${'Emphasize and strengthen with ***asterisks***.'}                | ${'Emphasize and strengthen with <strong><em>asterisks</em></strong>.'}
    ${'Triple underscore'}                    | ${'Emphasize and strengthen with ___underscores___.'}              | ${'Emphasize and strengthen with <strong><em>underscores</em></strong>.'}
    ${'Single asterisk in double underscore'} | ${'Emphasize and strengthen with __*asterisks* in underscores__.'} | ${'Emphasize and strengthen with <strong><em>asterisks</em> in underscores</strong>.'}
    ${'Single underscore in double asterisk'} | ${'Emphasize and strengthen with **_underscores_ in asterisks**.'} | ${'Emphasize and strengthen with <strong><em>underscores</em> in asterisks</strong>.'}
    ${'Double asterisk in single underscore'} | ${'Emphasize and strengthen with _**asterisks** in underscores_.'} | ${'Emphasize and strengthen with <em><strong>asterisks</strong> in underscores</em>.'}
    ${'Double underscore in single asterisk'} | ${'Emphasize and strengthen with *__underscores__ in asterisks*.'} | ${'Emphasize and strengthen with <em><strong>underscores</strong> in asterisks</em>.'}
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

describe('should parse escaped markdown characters and leave them unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                     | inputText                       | expectedOutputText
    ${'Asterisk before first triple asterisk'}      | ${'\\****this is some text***'} | ${'*<strong><em>this is some text</em></strong>'}
    ${'Asterisk after first triple asterisk'}       | ${'***\\*this is some text***'} | ${'<strong><em>*this is some text</em></strong>'}
    ${'Asterisk within triple asterisk'}            | ${'***this is\\* some text***'} | ${'<strong><em>this is* some text</em></strong>'}
    ${'Asterisk before second triple asterisk'}     | ${'***this is some text\\****'} | ${'<strong><em>this is some text*</em></strong>'}
    ${'Asterisk after second triple asterisk'}      | ${'***this is some text***\\*'} | ${'<strong><em>this is some text</em></strong>*'}
    ${'Asterisk before first bold asterisk'}        | ${'\\***this is some text**'}   | ${'*<strong>this is some text</strong>'}
    ${'Asterisk after first bold asterisk'}         | ${'**\\*this is some text**'}   | ${'<strong>*this is some text</strong>'}
    ${'Asterisk within bold asterisk'}              | ${'**this is\\* some text**'}   | ${'<strong>this is* some text</strong>'}
    ${'Asterisk before second bold asterisk'}       | ${'**this is some text\\***'}   | ${'<strong>this is some text*</strong>'}
    ${'Asterisk after second bold asterisk'}        | ${'**this is some text**\\*'}   | ${'<strong>this is some text</strong>*'}
    ${'Asterisk before first italic asterisk'}      | ${'\\**this is some text*'}     | ${'*<em>this is some text</em>'}
    ${'Asterisk after first italic asterisk'}       | ${'*\\*this is some text*'}     | ${'<em>*this is some text</em>'}
    ${'Asterisk within italic asterisk'}            | ${'*this is\\* some text*'}     | ${'<em>this is* some text</em>'}
    ${'Asterisk before second italic asterisk'}     | ${'*this is some text\\**'}     | ${'<em>this is some text*</em>'}
    ${'Asterisk after second italic asterisk'}      | ${'*this is some text*\\*'}     | ${'<em>this is some text</em>*'}
    ${'Underscore before first triple underscore'}  | ${'\\____this is some text___'} | ${'_<strong><em>this is some text</em></strong>'}
    ${'Underscore after first triple underscore'}   | ${'___\\_this is some text___'} | ${'<strong><em>_this is some text</em></strong>'}
    ${'Underscore within triple underscore'}        | ${'___this is\\_ some text___'} | ${'<strong><em>this is_ some text</em></strong>'}
    ${'Underscore before second triple underscore'} | ${'___this is some text\\____'} | ${'<strong><em>this is some text_</em></strong>'}
    ${'Underscore after second triple underscore'}  | ${'___this is some text___\\_'} | ${'<strong><em>this is some text</em></strong>_'}
    ${'Underscore before first bold underscore'}    | ${'\\___this is some text__'}   | ${'_<strong>this is some text</strong>'}
    ${'Underscore after first bold underscore'}     | ${'__\\_this is some text__'}   | ${'<strong>_this is some text</strong>'}
    ${'Underscore within bold underscore'}          | ${'__this is\\_ some text__'}   | ${'<strong>this is_ some text</strong>'}
    ${'Underscore before second bold underscore'}   | ${'__this is some text\\___'}   | ${'<strong>this is some text_</strong>'}
    ${'Underscore after second bold underscore'}    | ${'__this is some text__\\_'}   | ${'<strong>this is some text</strong>_'}
    ${'Underscore before first italic underscore'}  | ${'\\__this is some text_'}     | ${'_<em>this is some text</em>'}
    ${'Underscore after first italic underscore'}   | ${'_\\_this is some text_'}     | ${'<em>_this is some text</em>'}
    ${'Underscore within italic underscore'}        | ${'_this is\\_ some text_'}     | ${'<em>this is_ some text</em>'}
    ${'Underscore before second italic underscore'} | ${'_this is some text\\__'}     | ${'<em>this is some text_</em>'}
    ${'Underscore after second italic underscore'}  | ${'_this is some text_\\_'}     | ${'<em>this is some text</em>_'}
  `
  ('$description',
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
    description                                  | inputText
    ${'Unclosed single asterisk'}                | ${'Emphasize with *asterisks.'}
    ${'Unclosed single underscore'}              | ${'Emphasize with _underscores.'}
    ${'Unclosed double asterisk'}                | ${'Strengthen with **asterisks.'}
    ${'Unclosed double underscore'}              | ${'Strengthen with __underscores.'}
    ${'Unclosed triple asterisk'}                | ${'Emphasize and strengthen with ***asterisks.'}
    ${'Unclosed triple underscore'}              | ${'Emphasize and strengthen with ___underscores.'}
    ${'Unclosed escaped single asterisk'}        | ${'Emphasize with *asterisks\\*.'}
    ${'Unclosed escaped single underscore'}      | ${'Emphasize with _underscores\\_.'}
    ${'Unclosed escaped double asterisk'}        | ${'Strengthen with **asterisks\\**.'}
    ${'Unclosed escaped double underscore'}      | ${'Strengthen with __underscores\\__.'}
    ${'Unclosed escaped triple asterisk'}        | ${'Emphasize and strengthen with ***asterisks\\***.'}
    ${'Unclosed escaped triple underscore'}      | ${'Emphasize and strengthen with ___underscores\\___.'}
    ${'Single asterisk across multiple lines'}   | ${'Emphasize with *asterisks\nacross* lines.'}
    ${'Single underscore across multiple lines'} | ${'Emphasize with _underscores\nacross_ lines.'}
    ${'Double asterisk across multiple lines'}   | ${'Strengthen with **asterisks\nacross** lines.'}
    ${'Double underscore across multiple lines'} | ${'Strengthen with __underscores\nacross__ lines.'}
    ${'Triple asterisk across multiple lines'}   | ${'Emphasize and strengthen with ***asterisks\nacross*** lines.'}
    ${'Triple underscore across multiple lines'} | ${'Emphasize and strengthen with ___underscores\nacross___ lines.'}
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