import { parseMath } from './parser.js';
import Abilities from '../models/abilities.js';
import ProficiencyBonus from '../models/proficiency-bonus.js';

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
  describe('with integers only', () => {
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
      ${'3 integers added'}                | ${'{101 + -28 + 77}'}           | ${'150'}
      ${'4 integers added'}                | ${'{101 + -28 + 77 + 4}'}       | ${'154'}
      ${'5 integers added'}                | ${'{101 + -28 + 77 + 4 + -56}'} | ${'98'}
      ${'3 integers subtracted'}           | ${'{101 - -28 - 77}'}           | ${'52'}
      ${'4 integers subtracted'}           | ${'{101 - -28 - 77 - 4}'}       | ${'48'}
      ${'5 integers subtracted'}           | ${'{101 - -28 - 77 - 4 - -56}'} | ${'104'}
      ${'3 integers added and subtracted'} | ${'{101 + -28 - 77}'}           | ${'-4'}
      ${'4 integers added and subtracted'} | ${'{101 + -28 - 77 + 4}'}       | ${'0'}
      ${'5 integers added and subtracted'} | ${'{101 + -28 - 77 + 4 + -56}'} | ${'-56'}
    `
    ('$description: "$inputText" => $expectedText',
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

describe('with ability modifiers and proficiency bonus only', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                               | inputText                                                         | expectedText
    ${'modifier + modifier'}                                  | ${'{conmod + wismod}'}                                            | ${'8'}
    ${'modifier + proficiency bonus'}                         | ${'{dexmod + prof}'}                                              | ${'7'}
    ${'proficiency bonus + modifier'}                         | ${'{prof + strmod}'}                                              | ${'1'}
    ${'proficiency bonus + proficiency bonus'}                | ${'{prof + prof}'}                                                | ${'6'}
    ${'modifier - modifier'}                                  | ${'{conmod - wismod}'}                                            | ${'6'}
    ${'modifier - proficiency bonus'}                         | ${'{dexmod - prof}'}                                              | ${'1'}
    ${'proficiency bonus - modifier'}                         | ${'{prof - strmod}'}                                              | ${'5'}
    ${'proficiency bonus - proficiency bonus'}                | ${'{prof - prof}'}                                                | ${'0'}
    ${'3 modifiers added'}                                    | ${'{strmod + dexmod + conmod}'}                                   | ${'9'}
    ${'4 modifiers added'}                                    | ${'{strmod + dexmod + conmod + intmod}'}                          | ${'9'}
    ${'5 modifiers added'}                                    | ${'{strmod + dexmod + conmod + intmod + wismod}'}                 | ${'10'}
    ${'6 modifiers added'}                                    | ${'{strmod + dexmod + conmod + intmod + wismod + chamod}'}        | ${'5'}
    ${'6 modifiers added + proficiency bonus'}                | ${'{strmod + dexmod + conmod + intmod + wismod + chamod + prof}'} | ${'8'}
    ${'3 modifiers subtracted'}                               | ${'{strmod - dexmod - conmod}'}                                   | ${'-13'}
    ${'4 modifiers subtracted'}                               | ${'{strmod - dexmod - conmod - intmod}'}                          | ${'-13'}
    ${'5 modifiers subtracted'}                               | ${'{strmod - dexmod - conmod - intmod - wismod}'}                 | ${'-14'}
    ${'6 modifiers subtracted'}                               | ${'{strmod - dexmod - conmod - intmod - wismod - chamod}'}        | ${'-9'}
    ${'6 modifiers subtracted - proficiency bonus'}           | ${'{strmod - dexmod - conmod - intmod - wismod - chamod - prof}'} | ${'-12'}
    ${'3 modifiers added and subtracted'}                     | ${'{strmod + dexmod - conmod}'}                                   | ${'-5'}
    ${'4 modifiers added and subtracted'}                     | ${'{strmod + dexmod - conmod + intmod}'}                          | ${'-5'}
    ${'5 modifiers added and subtracted'}                     | ${'{strmod + dexmod - conmod + intmod - wismod}'}                 | ${'-6'}
    ${'6 modifiers added and subtracted'}                     | ${'{strmod + dexmod - conmod + intmod - wismod + chamod}'}        | ${'-11'}
    ${'6 modifiers added and subtracted - proficiency bonus'} | ${'{strmod + dexmod - conmod + intmod - wismod + chamod - prof}'} | ${'-14'}
  `
  ('$description: "$inputText" => $expectedText',
  ({inputText, expectedText}) => {
    Abilities.abilities['strength'].score = 7;      // -2 modifier
    Abilities.abilities['dexterity'].score = 18;    // +4 modifier
    Abilities.abilities['constitution'].score = 25; // +7 modifier
    Abilities.abilities['intelligence'].score = 11; // +0 modifier
    Abilities.abilities['wisdom'].score = 12;       // +1 modifier
    Abilities.abilities['charisma'].score = 1;      // -5 modifier
    ProficiencyBonus.proficiencyBonus = 3;

    const parserResults = parseMath(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('with integers, ability modifiers, and proficiency bonus', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                          | inputText                                | expectedText
    ${'modifier + integer'}              | ${'{chamod + 6}'}                        | ${'9'}
    ${'proficiency bonus + integer'}     | ${'{prof + 6}'}                          | ${'10'}
    ${'integer + modifier'}              | ${'{-2 + intmod}'}                       | ${'3'}
    ${'integer + proficiency bonus'}     | ${'{-2 + prof}'}                         | ${'2'}
    ${'modifier - integer'}              | ${'{chamod - 6}'}                        | ${'-3'}
    ${'proficiency bonus - integer'}     | ${'{prof - 6}'}                          | ${'-2'}
    ${'integer - modifier'}              | ${'{-2 - intmod}'}                       | ${'-7'}
    ${'integer - proficiency bonus'}     | ${'{-2 - prof}'}                         | ${'-6'}
    ${'3 operands added'}                | ${'{strmod + 4 + dexmod}'}               | ${'13'}
    ${'4 operands added'}                | ${'{-8 + strmod + 4 + dexmod}'}          | ${'5'}
    ${'5 operands added'}                | ${'{-8 + strmod + 4 + dexmod + wismod}'} | ${'1'}
    ${'3 operands subtracted'}           | ${'{strmod - 4 - dexmod}'}               | ${'7'}
    ${'4 operands subtracted'}           | ${'{-8 - strmod - 4 - dexmod}'}          | ${'-21'}
    ${'5 operands subtracted'}           | ${'{-8 - strmod - 4 - dexmod - wismod}'} | ${'-17'}
    ${'3 operands added and subtracted'} | ${'{strmod + 4 - dexmod}'}               | ${'15'}
    ${'4 operands added and subtracted'} | ${'{-8 - strmod + 4 - dexmod}'}          | ${'-13'}
    ${'5 operands added and subtracted'} | ${'{-8 - strmod + 4 - dexmod + wismod}'} | ${'-17'}
  `
  ('$description: "$inputText" => $expectedText',
  ({inputText, expectedText}) => {
    Abilities.abilities['strength'].score = 30;     // +10 modifier
    Abilities.abilities['dexterity'].score = 9;     // -1 modifier
    Abilities.abilities['constitution'].score = 12; // +2 modifier
    Abilities.abilities['intelligence'].score = 21; // +5 modifier
    Abilities.abilities['wisdom'].score = 3;        // -4 modifier
    Abilities.abilities['charisma'].score = 16;     // +3 modifier
    ProficiencyBonus.proficiencyBonus = 4;

    const parserResults = parseMath(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('should parse invalid math expressions unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                               | inputText
    ${'Unclosed brackets'}                    | ${'{42 + 19'}
    ${'Decimal numbers'}                      | ${'{42.83 - 19.11}'}
    ${'Missing operand'}                      | ${'{42 - - 19}'}
    ${'Missing operator'}                     | ${'{42 19}'}
    ${'Dangling preceding operator'}          | ${'{+ 42 + 19}'}
    ${'Dangling trailing operator'}           | ${'{42 + 19 +}'}
    ${'Invalid modifier'}                     | ${'{daxmod}'}
    ${'Invalid proficiency bonus'}            | ${'{profbonus}'}
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

describe('should parse valid modifier expressions', () => {
  describe('with integers only', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                          | inputText                          | expectedText
      ${'positive + positive'}             | ${'mod{42 + 19}'}                  | ${'+61'}
      ${'positive + zero'}                 | ${'mod{42 + 0}'}                   | ${'+42'}
      ${'positive + negative'}             | ${'mod{42 + -7}'}                  | ${'+35'}
      ${'zero + positive'}                 | ${'mod{0 + 3}'}                    | ${'+3'}
      ${'zero + zero'}                     | ${'mod{0 + 0}'}                    | ${'+0'}
      ${'zero + negative'}                 | ${'mod{0 + -30}'}                  | ${'-30'}
      ${'negative + positive'}             | ${'mod{-14 + 22}'}                 | ${'+8'}
      ${'negative + zero'}                 | ${'mod{-14 + 0}'}                  | ${'-14'}
      ${'negative + negative'}             | ${'mod{-14 + -238}'}               | ${'-252'}
      ${'positive - positive'}             | ${'mod{42 + 19}'}                  | ${'+61'}
      ${'positive - zero'}                 | ${'mod{42 + 0}'}                   | ${'+42'}
      ${'positive - negative'}             | ${'mod{42 + -7}'}                  | ${'+35'}
      ${'zero - positive'}                 | ${'mod{0 + 3}'}                    | ${'+3'}
      ${'zero - zero'}                     | ${'mod{0 + 0}'}                    | ${'+0'}
      ${'zero - negative'}                 | ${'mod{0 + -30}'}                  | ${'-30'}
      ${'negative - positive'}             | ${'mod{-14 + 22}'}                 | ${'+8'}
      ${'negative - zero'}                 | ${'mod{-14 + 0}'}                  | ${'-14'}
      ${'negative - negative'}             | ${'mod{-14 + -238}'}               | ${'-252'}
      ${'3 integers added'}                | ${'mod{101 + -28 + 77}'}           | ${'+150'}
      ${'4 integers added'}                | ${'mod{101 + -28 + 77 + 4}'}       | ${'+154'}
      ${'5 integers added'}                | ${'mod{101 + -28 + 77 + 4 + -56}'} | ${'+98'}
      ${'3 integers subtracted'}           | ${'mod{101 - -28 - 77}'}           | ${'+52'}
      ${'4 integers subtracted'}           | ${'mod{101 - -28 - 77 - 4}'}       | ${'+48'}
      ${'5 integers subtracted'}           | ${'mod{101 - -28 - 77 - 4 - -56}'} | ${'+104'}
      ${'3 integers added and subtracted'} | ${'mod{101 + -28 - 77}'}           | ${'-4'}
      ${'4 integers added and subtracted'} | ${'mod{101 + -28 - 77 + 4}'}       | ${'+0'}
      ${'5 integers added and subtracted'} | ${'mod{101 + -28 - 77 + 4 + -56}'} | ${'-56'}
    `
    ('$description: "$inputText" => $expectedText',
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

describe('with ability modifiers and proficiency bonus only', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                               | inputText                                                            | expectedText
    ${'modifier + modifier'}                                  | ${'mod{conmod + wismod}'}                                            | ${'+8'}
    ${'modifier + proficiency bonus'}                         | ${'mod{dexmod + prof}'}                                              | ${'+7'}
    ${'proficiency bonus + modifier'}                         | ${'mod{prof + strmod}'}                                              | ${'+1'}
    ${'proficiency bonus + proficiency bonus'}                | ${'mod{prof + prof}'}                                                | ${'+6'}
    ${'modifier - modifier'}                                  | ${'mod{conmod - wismod}'}                                            | ${'+6'}
    ${'modifier - proficiency bonus'}                         | ${'mod{dexmod - prof}'}                                              | ${'+1'}
    ${'proficiency bonus - modifier'}                         | ${'mod{prof - strmod}'}                                              | ${'+5'}
    ${'proficiency bonus - proficiency bonus'}                | ${'mod{prof - prof}'}                                                | ${'+0'}
    ${'3 modifiers added'}                                    | ${'mod{strmod + dexmod + conmod}'}                                   | ${'+9'}
    ${'4 modifiers added'}                                    | ${'mod{strmod + dexmod + conmod + intmod}'}                          | ${'+9'}
    ${'5 modifiers added'}                                    | ${'mod{strmod + dexmod + conmod + intmod + wismod}'}                 | ${'+10'}
    ${'6 modifiers added'}                                    | ${'mod{strmod + dexmod + conmod + intmod + wismod + chamod}'}        | ${'+5'}
    ${'6 modifiers added + proficiency bonus'}                | ${'mod{strmod + dexmod + conmod + intmod + wismod + chamod + prof}'} | ${'+8'}
    ${'3 modifiers subtracted'}                               | ${'mod{strmod - dexmod - conmod}'}                                   | ${'-13'}
    ${'4 modifiers subtracted'}                               | ${'mod{strmod - dexmod - conmod - intmod}'}                          | ${'-13'}
    ${'5 modifiers subtracted'}                               | ${'mod{strmod - dexmod - conmod - intmod - wismod}'}                 | ${'-14'}
    ${'6 modifiers subtracted'}                               | ${'mod{strmod - dexmod - conmod - intmod - wismod - chamod}'}        | ${'-9'}
    ${'6 modifiers subtracted - proficiency bonus'}           | ${'mod{strmod - dexmod - conmod - intmod - wismod - chamod - prof}'} | ${'-12'}
    ${'3 modifiers added and subtracted'}                     | ${'mod{strmod + dexmod - conmod}'}                                   | ${'-5'}
    ${'4 modifiers added and subtracted'}                     | ${'mod{strmod + dexmod - conmod + intmod}'}                          | ${'-5'}
    ${'5 modifiers added and subtracted'}                     | ${'mod{strmod + dexmod - conmod + intmod - wismod}'}                 | ${'-6'}
    ${'6 modifiers added and subtracted'}                     | ${'mod{strmod + dexmod - conmod + intmod - wismod + chamod}'}        | ${'-11'}
    ${'6 modifiers added and subtracted - proficiency bonus'} | ${'mod{strmod + dexmod - conmod + intmod - wismod + chamod - prof}'} | ${'-14'}
  `
  ('$description: "$inputText" => $expectedText',
  ({inputText, expectedText}) => {
    Abilities.abilities['strength'].score = 7;      // -2 modifier
    Abilities.abilities['dexterity'].score = 18;    // +4 modifier
    Abilities.abilities['constitution'].score = 25; // +7 modifier
    Abilities.abilities['intelligence'].score = 11; // +0 modifier
    Abilities.abilities['wisdom'].score = 12;       // +1 modifier
    Abilities.abilities['charisma'].score = 1;      // -5 modifier
    ProficiencyBonus.proficiencyBonus = 3;

    const parserResults = parseMath(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('with integers, ability modifiers, and proficiency bonus', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                          | inputText                                   | expectedText
    ${'modifier + integer'}              | ${'mod{chamod + 6}'}                        | ${'+9'}
    ${'proficiency bonus + integer'}     | ${'mod{prof + 6}'}                          | ${'+10'}
    ${'integer + modifier'}              | ${'mod{-2 + intmod}'}                       | ${'+3'}
    ${'integer + proficiency bonus'}     | ${'mod{-2 + prof}'}                         | ${'+2'}
    ${'modifier - integer'}              | ${'mod{chamod - 6}'}                        | ${'-3'}
    ${'proficiency bonus - integer'}     | ${'mod{prof - 6}'}                          | ${'-2'}
    ${'integer - modifier'}              | ${'mod{-2 - intmod}'}                       | ${'-7'}
    ${'integer - proficiency bonus'}     | ${'mod{-2 - prof}'}                         | ${'-6'}
    ${'3 operands added'}                | ${'mod{strmod + 4 + dexmod}'}               | ${'+13'}
    ${'4 operands added'}                | ${'mod{-8 + strmod + 4 + dexmod}'}          | ${'+5'}
    ${'5 operands added'}                | ${'mod{-8 + strmod + 4 + dexmod + wismod}'} | ${'+1'}
    ${'3 operands subtracted'}           | ${'mod{strmod - 4 - dexmod}'}               | ${'+7'}
    ${'4 operands subtracted'}           | ${'mod{-8 - strmod - 4 - dexmod}'}          | ${'-21'}
    ${'5 operands subtracted'}           | ${'mod{-8 - strmod - 4 - dexmod - wismod}'} | ${'-17'}
    ${'3 operands added and subtracted'} | ${'mod{strmod + 4 - dexmod}'}               | ${'+15'}
    ${'4 operands added and subtracted'} | ${'mod{-8 - strmod + 4 - dexmod}'}          | ${'-13'}
    ${'5 operands added and subtracted'} | ${'mod{-8 - strmod + 4 - dexmod + wismod}'} | ${'-17'}
  `
  ('$description: "$inputText" => $expectedText',
  ({inputText, expectedText}) => {
    Abilities.abilities['strength'].score = 30;     // +10 modifier
    Abilities.abilities['dexterity'].score = 9;     // -1 modifier
    Abilities.abilities['constitution'].score = 12; // +2 modifier
    Abilities.abilities['intelligence'].score = 21; // +5 modifier
    Abilities.abilities['wisdom'].score = 3;        // -4 modifier
    Abilities.abilities['charisma'].score = 16;     // +3 modifier
    ProficiencyBonus.proficiencyBonus = 4;

    const parserResults = parseMath(inputText);

    expect(parserResults).not.toBeNull();
    expect(parserResults.inputText).toBe(inputText);
    expect(parserResults.outputText).toBe(expectedText);
    expect(parserResults.error).toBeNull();
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('should parse invalid modifier expressions unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                               | inputText
    ${'Unclosed brackets'}                    | ${'mod{42 + 19'}
    ${'Decimal numbers'}                      | ${'mod{42.83 - 19.11}'}
    ${'Missing operand'}                      | ${'mod{42 - - 19}'}
    ${'Missing operator'}                     | ${'mod{42 19}'}
    ${'Dangling preceding operator'}          | ${'mod{+ 42 + 19}'}
    ${'Dangling trailing operator'}           | ${'mod{42 + 19 +}'}
    ${'Invalid modifier'}                     | ${'mod{daxmod}'}
    ${'Invalid proficiency bonus'}            | ${'mod{profbonus}'}
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