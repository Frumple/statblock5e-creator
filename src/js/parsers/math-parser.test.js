import { parseMath } from './parser.js';
import CurrentContext from '../models/current-context.js';

const abilities = CurrentContext.creature.abilities;
const proficiencyBonus = CurrentContext.creature.proficiencyBonus;

beforeEach(() => {
  abilities.reset();
  proficiencyBonus.reset();
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
      ${'positive + positive'}             | ${'[42 + 19]'}                  | ${'61'}
      ${'positive + zero'}                 | ${'[42 + 0]'}                   | ${'42'}
      ${'positive + negative'}             | ${'[42 + -7]'}                  | ${'35'}
      ${'zero + positive'}                 | ${'[0 + 3]'}                    | ${'3'}
      ${'zero + zero'}                     | ${'[0 + 0]'}                    | ${'0'}
      ${'zero + negative'}                 | ${'[0 + -30]'}                  | ${'–30'}
      ${'negative + positive'}             | ${'[-14 + 22]'}                 | ${'8'}
      ${'negative + zero'}                 | ${'[-14 + 0]'}                  | ${'–14'}
      ${'negative + negative'}             | ${'[-14 + -238]'}               | ${'–252'}
      ${'positive - positive'}             | ${'[42 - 19]'}                  | ${'23'}
      ${'positive - zero'}                 | ${'[42 - 0]'}                   | ${'42'}
      ${'positive - negative'}             | ${'[42 - -7]'}                  | ${'49'}
      ${'zero - positive'}                 | ${'[0 - 3]'}                    | ${'–3'}
      ${'zero - zero'}                     | ${'[0 - 0]'}                    | ${'0'}
      ${'zero - negative'}                 | ${'[0 - -30]'}                  | ${'30'}
      ${'negative - positive'}             | ${'[-14 - 22]'}                 | ${'–36'}
      ${'negative - zero'}                 | ${'[-14 - 0]'}                  | ${'–14'}
      ${'negative - negative'}             | ${'[-14 - -238]'}               | ${'224'}
      ${'3 integers added'}                | ${'[101 + -28 + 77]'}           | ${'150'}
      ${'4 integers added'}                | ${'[101 + -28 + 77 + 4]'}       | ${'154'}
      ${'5 integers added'}                | ${'[101 + -28 + 77 + 4 + -56]'} | ${'98'}
      ${'3 integers subtracted'}           | ${'[101 - -28 - 77]'}           | ${'52'}
      ${'4 integers subtracted'}           | ${'[101 - -28 - 77 - 4]'}       | ${'48'}
      ${'5 integers subtracted'}           | ${'[101 - -28 - 77 - 4 - -56]'} | ${'104'}
      ${'3 integers added and subtracted'} | ${'[101 + -28 - 77]'}           | ${'–4'}
      ${'4 integers added and subtracted'} | ${'[101 + -28 - 77 + 4]'}       | ${'0'}
      ${'5 integers added and subtracted'} | ${'[101 + -28 - 77 + 4 + -56]'} | ${'–56'}
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

  describe('with ability modifiers and proficiency bonus only', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                               | inputText                                       | expectedText
      ${'modifier + modifier'}                                  | ${'[con + wis]'}                                | ${'8'}
      ${'modifier + proficiency bonus'}                         | ${'[dex + prof]'}                               | ${'7'}
      ${'proficiency bonus + modifier'}                         | ${'[prof + str]'}                               | ${'1'}
      ${'proficiency bonus + proficiency bonus'}                | ${'[prof + prof]'}                              | ${'6'}
      ${'modifier - modifier'}                                  | ${'[con - wis]'}                                | ${'6'}
      ${'modifier - proficiency bonus'}                         | ${'[dex - prof]'}                               | ${'1'}
      ${'proficiency bonus - modifier'}                         | ${'[prof - str]'}                               | ${'5'}
      ${'proficiency bonus - proficiency bonus'}                | ${'[prof - prof]'}                              | ${'0'}
      ${'3 modifiers added'}                                    | ${'[str + dex + con]'}                          | ${'9'}
      ${'4 modifiers added'}                                    | ${'[str + dex + con + int]'}                    | ${'9'}
      ${'5 modifiers added'}                                    | ${'[str + dex + con + int + wis]'}              | ${'10'}
      ${'6 modifiers added'}                                    | ${'[str + dex + con + int + wis + cha]'}        | ${'5'}
      ${'6 modifiers added + proficiency bonus'}                | ${'[str + dex + con + int + wis + cha + prof]'} | ${'8'}
      ${'3 modifiers subtracted'}                               | ${'[str - dex - con]'}                          | ${'–13'}
      ${'4 modifiers subtracted'}                               | ${'[str - dex - con - int]'}                    | ${'–13'}
      ${'5 modifiers subtracted'}                               | ${'[str - dex - con - int - wis]'}              | ${'–14'}
      ${'6 modifiers subtracted'}                               | ${'[str - dex - con - int - wis - cha]'}        | ${'–9'}
      ${'6 modifiers subtracted - proficiency bonus'}           | ${'[str - dex - con - int - wis - cha - prof]'} | ${'–12'}
      ${'3 modifiers added and subtracted'}                     | ${'[str + dex - con]'}                          | ${'–5'}
      ${'4 modifiers added and subtracted'}                     | ${'[str + dex - con + int]'}                    | ${'–5'}
      ${'5 modifiers added and subtracted'}                     | ${'[str + dex - con + int - wis]'}              | ${'–6'}
      ${'6 modifiers added and subtracted'}                     | ${'[str + dex - con + int - wis + cha]'}        | ${'–11'}
      ${'6 modifiers added and subtracted - proficiency bonus'} | ${'[str + dex - con + int - wis + cha - prof]'} | ${'–14'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 7;      // -2 modifier
      abilities.abilities['dexterity'].score = 18;    // +4 modifier
      abilities.abilities['constitution'].score = 25; // +7 modifier
      abilities.abilities['intelligence'].score = 11; // +0 modifier
      abilities.abilities['wisdom'].score = 12;       // +1 modifier
      abilities.abilities['charisma'].score = 1;      // -5 modifier
      proficiencyBonus.proficiencyBonus = 3;

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
      description                          | inputText                       | expectedText
      ${'modifier + integer'}              | ${'[cha + 6]'}                  | ${'9'}
      ${'proficiency bonus + integer'}     | ${'[prof + 6]'}                 | ${'10'}
      ${'integer + modifier'}              | ${'[-2 + int]'}                 | ${'3'}
      ${'integer + proficiency bonus'}     | ${'[-2 + prof]'}                | ${'2'}
      ${'modifier - integer'}              | ${'[cha - 6]'}                  | ${'–3'}
      ${'proficiency bonus - integer'}     | ${'[prof - 6]'}                 | ${'–2'}
      ${'integer - modifier'}              | ${'[-2 - int]'}                 | ${'–7'}
      ${'integer - proficiency bonus'}     | ${'[-2 - prof]'}                | ${'–6'}
      ${'3 operands added'}                | ${'[str + 4 + dex]'}            | ${'13'}
      ${'4 operands added'}                | ${'[-8 + str + 4 + dex]'}       | ${'5'}
      ${'5 operands added'}                | ${'[-8 + str + 4 + dex + wis]'} | ${'1'}
      ${'3 operands subtracted'}           | ${'[str - 4 - dex]'}            | ${'7'}
      ${'4 operands subtracted'}           | ${'[-8 - str - 4 - dex]'}       | ${'–21'}
      ${'5 operands subtracted'}           | ${'[-8 - str - 4 - dex - wis]'} | ${'–17'}
      ${'3 operands added and subtracted'} | ${'[str + 4 - dex]'}            | ${'15'}
      ${'4 operands added and subtracted'} | ${'[-8 - str + 4 - dex]'}       | ${'–13'}
      ${'5 operands added and subtracted'} | ${'[-8 - str + 4 - dex + wis]'} | ${'–17'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 30;     // +10 modifier
      abilities.abilities['dexterity'].score = 9;     // -1 modifier
      abilities.abilities['constitution'].score = 12; // +2 modifier
      abilities.abilities['intelligence'].score = 21; // +5 modifier
      abilities.abilities['wisdom'].score = 3;        // -4 modifier
      abilities.abilities['charisma'].score = 16;     // +3 modifier
      proficiencyBonus.proficiencyBonus = 4;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                   | strScore | dexScore | inputText         | expectedText
      ${'fin only, str > dex'}      | ${16}    | ${12}    | ${'[fin]'}        | ${'3'}
      ${'fin + mod, str > dex'}     | ${16}    | ${12}    | ${'[fin + str]'}  | ${'6'}
      ${'fin + prof, str > dex'}    | ${16}    | ${12}    | ${'[fin + prof]'} | ${'5'}
      ${'fin + integer, str > dex'} | ${16}    | ${12}    | ${'[fin + -4]'}   | ${'–1'}
      ${'fin only, dex > str'}      | ${14}    | ${20}    | ${'[fin]'}        | ${'5'}
      ${'fin + mod, dex > str'}     | ${14}    | ${20}    | ${'[fin + str]'}  | ${'7'}
      ${'fin + prof, dex > str'}    | ${14}    | ${20}    | ${'[fin + prof]'} | ${'7'}
      ${'fin + integer, dex > str'} | ${14}    | ${20}    | ${'[fin + -4]'}   | ${'1'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilities.abilities['strength'].score = strScore;
      abilities.abilities['dexterity'].score = dexScore;
      proficiencyBonus.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('should parse invalid math expressions unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                               | inputText
    ${'Unclosed brackets'}                    | ${'[42 + 19'}
    ${'Decimal numbers'}                      | ${'[42.83 - 19.11]'}
    ${'Missing operand'}                      | ${'[42 - - 19]'}
    ${'Missing operator'}                     | ${'[42 19]'}
    ${'Dangling preceding operator'}          | ${'[+ 42 + 19]'}
    ${'Dangling trailing operator'}           | ${'[42 + 19 +]'}
    ${'Invalid modifier'}                     | ${'[dax]'}
    ${'Invalid proficiency bonus'}            | ${'[profbonus]'}
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
      ${'positive + positive'}             | ${'mod[42 + 19]'}                  | ${'+61'}
      ${'positive + zero'}                 | ${'mod[42 + 0]'}                   | ${'+42'}
      ${'positive + negative'}             | ${'mod[42 + -7]'}                  | ${'+35'}
      ${'zero + positive'}                 | ${'mod[0 + 3]'}                    | ${'+3'}
      ${'zero + zero'}                     | ${'mod[0 + 0]'}                    | ${'+0'}
      ${'zero + negative'}                 | ${'mod[0 + -30]'}                  | ${'–30'}
      ${'negative + positive'}             | ${'mod[-14 + 22]'}                 | ${'+8'}
      ${'negative + zero'}                 | ${'mod[-14 + 0]'}                  | ${'–14'}
      ${'negative + negative'}             | ${'mod[-14 + -238]'}               | ${'–252'}
      ${'positive - positive'}             | ${'mod[42 - 19]'}                  | ${'+23'}
      ${'positive - zero'}                 | ${'mod[42 - 0]'}                   | ${'+42'}
      ${'positive - negative'}             | ${'mod[42 - -7]'}                  | ${'+49'}
      ${'zero - positive'}                 | ${'mod[0 - 3]'}                    | ${'–3'}
      ${'zero - zero'}                     | ${'mod[0 - 0]'}                    | ${'+0'}
      ${'zero - negative'}                 | ${'mod[0 - -30]'}                  | ${'+30'}
      ${'negative - positive'}             | ${'mod[-14 - 22]'}                 | ${'–36'}
      ${'negative - zero'}                 | ${'mod[-14 - 0]'}                  | ${'–14'}
      ${'negative - negative'}             | ${'mod[-14 - -238]'}               | ${'+224'}
      ${'3 integers added'}                | ${'mod[101 + -28 + 77]'}           | ${'+150'}
      ${'4 integers added'}                | ${'mod[101 + -28 + 77 + 4]'}       | ${'+154'}
      ${'5 integers added'}                | ${'mod[101 + -28 + 77 + 4 + -56]'} | ${'+98'}
      ${'3 integers subtracted'}           | ${'mod[101 - -28 - 77]'}           | ${'+52'}
      ${'4 integers subtracted'}           | ${'mod[101 - -28 - 77 - 4]'}       | ${'+48'}
      ${'5 integers subtracted'}           | ${'mod[101 - -28 - 77 - 4 - -56]'} | ${'+104'}
      ${'3 integers added and subtracted'} | ${'mod[101 + -28 - 77]'}           | ${'–4'}
      ${'4 integers added and subtracted'} | ${'mod[101 + -28 - 77 + 4]'}       | ${'+0'}
      ${'5 integers added and subtracted'} | ${'mod[101 + -28 - 77 + 4 + -56]'} | ${'–56'}
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

  describe('with ability modifiers and proficiency bonus only', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                               | inputText                                          | expectedText
      ${'modifier + modifier'}                                  | ${'mod[con + wis]'}                                | ${'+8'}
      ${'modifier + proficiency bonus'}                         | ${'mod[dex + prof]'}                               | ${'+7'}
      ${'proficiency bonus + modifier'}                         | ${'mod[prof + str]'}                               | ${'+1'}
      ${'proficiency bonus + proficiency bonus'}                | ${'mod[prof + prof]'}                              | ${'+6'}
      ${'modifier - modifier'}                                  | ${'mod[con - wis]'}                                | ${'+6'}
      ${'modifier - proficiency bonus'}                         | ${'mod[dex - prof]'}                               | ${'+1'}
      ${'proficiency bonus - modifier'}                         | ${'mod[prof - str]'}                               | ${'+5'}
      ${'proficiency bonus - proficiency bonus'}                | ${'mod[prof - prof]'}                              | ${'+0'}
      ${'3 modifiers added'}                                    | ${'mod[str + dex + con]'}                          | ${'+9'}
      ${'4 modifiers added'}                                    | ${'mod[str + dex + con + int]'}                    | ${'+9'}
      ${'5 modifiers added'}                                    | ${'mod[str + dex + con + int + wis]'}              | ${'+10'}
      ${'6 modifiers added'}                                    | ${'mod[str + dex + con + int + wis + cha]'}        | ${'+5'}
      ${'6 modifiers added + proficiency bonus'}                | ${'mod[str + dex + con + int + wis + cha + prof]'} | ${'+8'}
      ${'3 modifiers subtracted'}                               | ${'mod[str - dex - con]'}                          | ${'–13'}
      ${'4 modifiers subtracted'}                               | ${'mod[str - dex - con - int]'}                    | ${'–13'}
      ${'5 modifiers subtracted'}                               | ${'mod[str - dex - con - int - wis]'}              | ${'–14'}
      ${'6 modifiers subtracted'}                               | ${'mod[str - dex - con - int - wis - cha]'}        | ${'–9'}
      ${'6 modifiers subtracted - proficiency bonus'}           | ${'mod[str - dex - con - int - wis - cha - prof]'} | ${'–12'}
      ${'3 modifiers added and subtracted'}                     | ${'mod[str + dex - con]'}                          | ${'–5'}
      ${'4 modifiers added and subtracted'}                     | ${'mod[str + dex - con + int]'}                    | ${'–5'}
      ${'5 modifiers added and subtracted'}                     | ${'mod[str + dex - con + int - wis]'}              | ${'–6'}
      ${'6 modifiers added and subtracted'}                     | ${'mod[str + dex - con + int - wis + cha]'}        | ${'–11'}
      ${'6 modifiers added and subtracted - proficiency bonus'} | ${'mod[str + dex - con + int - wis + cha - prof]'} | ${'–14'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 7;      // -2 modifier
      abilities.abilities['dexterity'].score = 18;    // +4 modifier
      abilities.abilities['constitution'].score = 25; // +7 modifier
      abilities.abilities['intelligence'].score = 11; // +0 modifier
      abilities.abilities['wisdom'].score = 12;       // +1 modifier
      abilities.abilities['charisma'].score = 1;      // -5 modifier
      proficiencyBonus.proficiencyBonus = 3;

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
      description                          | inputText                          | expectedText
      ${'modifier + integer'}              | ${'mod[cha + 6]'}                  | ${'+9'}
      ${'proficiency bonus + integer'}     | ${'mod[prof + 6]'}                 | ${'+10'}
      ${'integer + modifier'}              | ${'mod[-2 + int]'}                 | ${'+3'}
      ${'integer + proficiency bonus'}     | ${'mod[-2 + prof]'}                | ${'+2'}
      ${'modifier - integer'}              | ${'mod[cha - 6]'}                  | ${'–3'}
      ${'proficiency bonus - integer'}     | ${'mod[prof - 6]'}                 | ${'–2'}
      ${'integer - modifier'}              | ${'mod[-2 - int]'}                 | ${'–7'}
      ${'integer - proficiency bonus'}     | ${'mod[-2 - prof]'}                | ${'–6'}
      ${'3 operands added'}                | ${'mod[str + 4 + dex]'}            | ${'+13'}
      ${'4 operands added'}                | ${'mod[-8 + str + 4 + dex]'}       | ${'+5'}
      ${'5 operands added'}                | ${'mod[-8 + str + 4 + dex + wis]'} | ${'+1'}
      ${'3 operands subtracted'}           | ${'mod[str - 4 - dex]'}            | ${'+7'}
      ${'4 operands subtracted'}           | ${'mod[-8 - str - 4 - dex]'}       | ${'–21'}
      ${'5 operands subtracted'}           | ${'mod[-8 - str - 4 - dex - wis]'} | ${'–17'}
      ${'3 operands added and subtracted'} | ${'mod[str + 4 - dex]'}            | ${'+15'}
      ${'4 operands added and subtracted'} | ${'mod[-8 - str + 4 - dex]'}       | ${'–13'}
      ${'5 operands added and subtracted'} | ${'mod[-8 - str + 4 - dex + wis]'} | ${'–17'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 30;     // +10 modifier
      abilities.abilities['dexterity'].score = 9;     // -1 modifier
      abilities.abilities['constitution'].score = 12; // +2 modifier
      abilities.abilities['intelligence'].score = 21; // +5 modifier
      abilities.abilities['wisdom'].score = 3;        // -4 modifier
      abilities.abilities['charisma'].score = 16;     // +3 modifier
      proficiencyBonus.proficiencyBonus = 4;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                   | strScore | dexScore | inputText            | expectedText
      ${'fin only, str > dex'}      | ${16}    | ${12}    | ${'mod[fin]'}        | ${'+3'}
      ${'fin + mod, str > dex'}     | ${16}    | ${12}    | ${'mod[fin + str]'}  | ${'+6'}
      ${'fin + prof, str > dex'}    | ${16}    | ${12}    | ${'mod[fin + prof]'} | ${'+5'}
      ${'fin + integer, str > dex'} | ${16}    | ${12}    | ${'mod[fin + -4]'}   | ${'–1'}
      ${'fin only, dex > str'}      | ${14}    | ${20}    | ${'mod[fin]'}        | ${'+5'}
      ${'fin + mod, dex > str'}     | ${14}    | ${20}    | ${'mod[fin + str]'}  | ${'+7'}
      ${'fin + prof, dex > str'}    | ${14}    | ${20}    | ${'mod[fin + prof]'} | ${'+7'}
      ${'fin + integer, dex > str'} | ${14}    | ${20}    | ${'mod[fin + -4]'}   | ${'+1'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilities.abilities['strength'].score = strScore;
      abilities.abilities['dexterity'].score = dexScore;
      proficiencyBonus.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('should parse invalid modifier expressions unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                               | inputText
    ${'Unclosed brackets'}                    | ${'mod[42 + 19'}
    ${'Decimal numbers'}                      | ${'mod[42.83 - 19.11]'}
    ${'Missing operand'}                      | ${'mod[42 - - 19]'}
    ${'Missing operator'}                     | ${'mod[42 19]'}
    ${'Dangling preceding operator'}          | ${'mod[+ 42 + 19]'}
    ${'Dangling trailing operator'}           | ${'mod[42 + 19 +]'}
    ${'Invalid modifier'}                     | ${'mod[dax]'}
    ${'Invalid proficiency bonus'}            | ${'mod[profbonus]'}
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

describe('should parse valid attack roll modifier expressions', () => {
  describe('with single ability modifier only', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description       | inputText     | expectedText
      ${'strength'}     | ${'atk[str]'} | ${'+1'}
      ${'dexterity'}    | ${'atk[dex]'} | ${'+7'}
      ${'constitution'} | ${'atk[con]'} | ${'+10'}
      ${'intelligence'} | ${'atk[int]'} | ${'+3'}
      ${'wisdom'}       | ${'atk[wis]'} | ${'+4'}
      ${'charisma'}     | ${'atk[cha]'} | ${'–2'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 7;      // -2 modifier
      abilities.abilities['dexterity'].score = 18;    // +4 modifier
      abilities.abilities['constitution'].score = 25; // +7 modifier
      abilities.abilities['intelligence'].score = 11; // +0 modifier
      abilities.abilities['wisdom'].score = 12;       // +1 modifier
      abilities.abilities['charisma'].score = 1;      // -5 modifier
      proficiencyBonus.proficiencyBonus = 3;

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
      description                        | inputText                 | expectedText
      ${'ability + positive'}            | ${'atk[str + 3]'}         | ${'+10'}
      ${'ability + zero'}                | ${'atk[str + 0]'}         | ${'+7'}
      ${'ability + negative'}            | ${'atk[str + -4]'}        | ${'+3'}
      ${'ability - positive'}            | ${'atk[str - 3]'}         | ${'+4'}
      ${'ability - zero'}                | ${'atk[str - 0]'}         | ${'+7'}
      ${'ability - negative'}            | ${'atk[str - -4]'}        | ${'+11'}
      ${'ability + proficiency bonus'}   | ${'atk[str + prof]'}      | ${'+9'}
      ${'ability + modifier'}            | ${'atk[str + dex]'}       | ${'+10'}
      ${'ability - proficiency bonus'}   | ${'atk[str - prof]'}      | ${'+5'}
      ${'ability - modifier'}            | ${'atk[str - dex]'}       | ${'+4'}
      ${'ability + integer + integer'}   | ${'atk[str + -1 + 12]'}   | ${'+18'}
      ${'ability - integer - integer'}   | ${'atk[str - -1 - 12]'}   | ${'–4'}
      ${'ability + modifier + modifier'} | ${'atk[str + str + dex]'} | ${'+15'}
      ${'ability - modifier - modifier'} | ${'atk[str - str - dex]'} | ${'–1'}
      ${'ability + modifier + integer'}  | ${'atk[str + dex + 7]'}   | ${'+17'}
      ${'ability - modifier - integer'}  | ${'atk[str - dex - 7]'}   | ${'–3'}
      ${'ability + integer + modifier'}  | ${'atk[str + 8 + str]'}   | ${'+20'}
      ${'ability - integer - modifier'}  | ${'atk[str - 8 - str]'}   | ${'–6'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 20;     // +5 modifier
      abilities.abilities['dexterity'].score = 17;    // +3 modifier
      proficiencyBonus.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                             | strScore | dexScore | inputText            | expectedText
      ${'fin only, str > dex'}                | ${16}    | ${12}    | ${'atk[fin]'}        | ${'+5'}
      ${'fin + modifier, str > dex'}          | ${16}    | ${12}    | ${'atk[fin + str]'}  | ${'+8'}
      ${'fin + proficiency bonus, str > dex'} | ${16}    | ${12}    | ${'atk[fin + prof]'} | ${'+7'}
      ${'fin + integer, str > dex'}           | ${16}    | ${12}    | ${'atk[fin + -4]'}   | ${'+1'}
      ${'fin only, dex > str'}                | ${14}    | ${20}    | ${'atk[fin]'}        | ${'+7'}
      ${'fin + modifier, dex > str'}          | ${14}    | ${20}    | ${'atk[fin + str]'}  | ${'+9'}
      ${'fin + proficiency bonus, dex > str'} | ${14}    | ${20}    | ${'atk[fin + prof]'} | ${'+9'}
      ${'fin + integer, dex > str'}           | ${14}    | ${20}    | ${'atk[fin + -4]'}   | ${'+3'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilities.abilities['strength'].score = strScore;
      abilities.abilities['dexterity'].score = dexScore;
      proficiencyBonus.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('should parse invalid attack roll modifier expression unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                            | inputText
    ${'Unclosed brackets'}                                 | ${'atk[str + 19'}
    ${'Decimal numbers'}                                   | ${'atk[str - 19.11]'}
    ${'Missing operand'}                                   | ${'atk[str - - 19]'}
    ${'Missing operator'}                                  | ${'atk[str 19]'}
    ${'Dangling preceding operator'}                       | ${'atk[+ str + 19]'}
    ${'Dangling trailing operator'}                        | ${'atk[str + 19 +]'}
    ${'Invalid modifier'}                                  | ${'atk[dax]'}
    ${'Invalid proficiency bonus'}                         | ${'atk[profbonus]'}
    ${'Integer cannot be used as first operand'}           | ${'atk[19]'}
    ${'Proficiency bonus cannot be used as first operand'} | ${'atk[prof]'}
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

describe('should parse valid damage expressions', () => {
  describe('with integers, ability modifiers, and proficiency bonus', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                      | inputText                 | expectedText
      ${'single die without quantity'} | ${'dmg[d8]'}              | ${'4 (1d8)'}
      ${'single die with quantity'}    | ${'dmg[1d8]'}             | ${'4 (1d8)'}
      ${'multiple die'}                | ${'dmg[2d8]'}             | ${'9 (2d8)'}
      ${'die + positive'}              | ${'dmg[4d6 + 3]'}         | ${'17 (4d6 + 3)'}
      ${'die + zero'}                  | ${'dmg[4d6 + 0]'}         | ${'14 (4d6)'}
      ${'die + negative'}              | ${'dmg[4d6 + -4]'}        | ${'10 (4d6 – 4)'}
      ${'die - positive'}              | ${'dmg[3d12 - 3]'}        | ${'16 (3d12 – 3)'}
      ${'die - zero'}                  | ${'dmg[3d12 - 0]'}        | ${'19 (3d12)'}
      ${'die - negative'}              | ${'dmg[3d12 - -4]'}       | ${'23 (3d12 + 4)'}
      ${'die + modifier'}              | ${'dmg[1d10 + str]'}      | ${'10 (1d10 + 5)'}
      ${'die + proficiency bonus'}     | ${'dmg[1d10 + prof]'}     | ${'7 (1d10 + 2)'}
      ${'die - modifier'}              | ${'dmg[1d10 - str]'}      | ${'0 (1d10 – 5)'}
      ${'die - proficiency bonus'}     | ${'dmg[1d10 - prof]'}     | ${'3 (1d10 – 2)'}
      ${'die + integer + integer'}     | ${'dmg[5d4 + -1 + 12]'}   | ${'23 (5d4 + 11)'}
      ${'die - integer - integer'}     | ${'dmg[5d4 - -1 - 12]'}   | ${'1 (5d4 – 11)'}
      ${'die + modifier + modifier'}   | ${'dmg[6d8 + str + dex]'} | ${'35 (6d8 + 8)'}
      ${'die - modifier - modifier'}   | ${'dmg[6d8 - str - dex]'} | ${'19 (6d8 – 8)'}
      ${'die + modifier + integer'}    | ${'dmg[3d6 + dex + 7]'}   | ${'20 (3d6 + 10)'}
      ${'die - modifier - integer'}    | ${'dmg[3d6 - dex - 7]'}   | ${'0 (3d6 – 10)'}
      ${'die + integer + modifier'}    | ${'dmg[2d20 + 8 + str]'}  | ${'34 (2d20 + 13)'}
      ${'die - integer - modifier'}    | ${'dmg[2d20 - 8 - str]'}  | ${'8 (2d20 – 13)'}
    `
    ('$description: {param1="$param1"} => $expected',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 20;     // +5 modifier
      abilities.abilities['dexterity'].score = 17;    // +3 modifier
      proficiencyBonus.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                         | strScore | dexScore | inputText                  | expectedText
      ${'die + fin, str > dex'}           | ${16}    | ${12}    | ${'dmg[2d8 + fin]'}        | ${'12 (2d8 + 3)'}
      ${'die + fin + mod, str > dex'}     | ${16}    | ${12}    | ${'dmg[2d8 + fin + str]'}  | ${'15 (2d8 + 6)'}
      ${'die + fin + prof, str > dex'}    | ${16}    | ${12}    | ${'dmg[2d8 + fin + prof]'} | ${'14 (2d8 + 5)'}
      ${'die + fin + integer, str > dex'} | ${16}    | ${12}    | ${'dmg[2d8 + fin + -4]'}   | ${'8 (2d8 – 1)'}
      ${'die + fin, dex > str'}           | ${14}    | ${20}    | ${'dmg[2d8 + fin]'}        | ${'14 (2d8 + 5)'}
      ${'die + fin + mod, dex > str'}     | ${14}    | ${20}    | ${'dmg[2d8 + fin + str]'}  | ${'16 (2d8 + 7)'}
      ${'die + fin + prof, dex > str'}    | ${14}    | ${20}    | ${'dmg[2d8 + fin + prof]'} | ${'16 (2d8 + 7)'}
      ${'die + fin + integer, dex > str'} | ${14}    | ${20}    | ${'dmg[2d8 + fin + -4]'}   | ${'10 (2d8 + 1)'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilities.abilities['strength'].score = strScore;
      abilities.abilities['dexterity'].score = dexScore;
      proficiencyBonus.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('should parse invalid damage expressions unchanged', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                            | inputText
    ${'Unclosed brackets'}                                 | ${'dmg[2d8 + 19'}
    ${'Decimal numbers'}                                   | ${'dmg[2d8 - 19.11]'}
    ${'Missing operand'}                                   | ${'dmg[2d8 - - 19]'}
    ${'Missing operator'}                                  | ${'dmg[2d8 19]'}
    ${'Dangling preceding operator'}                       | ${'dmg[+ 2d8 + 19]'}
    ${'Dangling trailing operator'}                        | ${'dmg[2d8 + 19 +]'}
    ${'Invalid modifier'}                                  | ${'dmg[dax]'}
    ${'Invalid proficiency bonus'}                         | ${'dmg[profbonus]'}
    ${'Integer cannot be used as first operand'}           | ${'dmg[19]'}
    ${'Ability modifier cannot be used as first operand'}  | ${'dmg[str]'}
    ${'Proficiency bonus cannot be used as first operand'} | ${'dmg[prof]'}
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

describe('should parse valid spell save DC expressions', () => {
  describe('with single ability modifier only', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description       | inputText     | expectedText
      ${'strength'}     | ${'sdc[str]'} | ${'9'}
      ${'dexterity'}    | ${'sdc[dex]'} | ${'15'}
      ${'constitution'} | ${'sdc[con]'} | ${'18'}
      ${'intelligence'} | ${'sdc[int]'} | ${'11'}
      ${'wisdom'}       | ${'sdc[wis]'} | ${'12'}
      ${'charisma'}     | ${'sdc[cha]'} | ${'6'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['strength'].score = 7;      // -2 modifier
      abilities.abilities['dexterity'].score = 18;    // +4 modifier
      abilities.abilities['constitution'].score = 25; // +7 modifier
      abilities.abilities['intelligence'].score = 11; // +0 modifier
      abilities.abilities['wisdom'].score = 12;       // +1 modifier
      abilities.abilities['charisma'].score = 1;      // -5 modifier
      proficiencyBonus.proficiencyBonus = 3;

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
      description                        | inputText                 | expectedText
      ${'ability + positive'}            | ${'sdc[cha + 3]'}         | ${'20'}
      ${'ability + zero'}                | ${'sdc[cha + 0]'}         | ${'17'}
      ${'ability + negative'}            | ${'sdc[cha + -4]'}        | ${'13'}
      ${'ability - positive'}            | ${'sdc[cha - 3]'}         | ${'14'}
      ${'ability - zero'}                | ${'sdc[cha - 0]'}         | ${'17'}
      ${'ability - negative'}            | ${'sdc[cha - -4]'}        | ${'21'}
      ${'ability + proficiency bonus'}   | ${'sdc[cha + prof]'}      | ${'22'}
      ${'ability + modifier'}            | ${'sdc[cha + wis]'}       | ${'19'}
      ${'ability - proficiency bonus'}   | ${'sdc[cha - prof]'}      | ${'12'}
      ${'ability - modifier'}            | ${'sdc[cha - wis]'}       | ${'15'}
      ${'ability + integer + integer'}   | ${'sdc[cha + -1 + 12]'}   | ${'28'}
      ${'ability - integer - integer'}   | ${'sdc[cha - -1 - 12]'}   | ${'6'}
      ${'ability + modifier + modifier'} | ${'sdc[cha + cha + wis]'} | ${'23'}
      ${'ability - modifier - modifier'} | ${'sdc[cha - cha - wis]'} | ${'11'}
      ${'ability + modifier + integer'}  | ${'sdc[cha + wis + 7]'}   | ${'26'}
      ${'ability - modifier - integer'}  | ${'sdc[cha - wis - 7]'}   | ${'8'}
      ${'ability + integer + modifier'}  | ${'sdc[cha + 8 + cha]'}   | ${'29'}
      ${'ability - integer - modifier'}  | ${'sdc[cha - 8 - cha]'}   | ${'5'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilities.abilities['charisma'].score = 18;    // +4 modifier
      abilities.abilities['wisdom'].score = 14;      // +2 modifier

      proficiencyBonus.proficiencyBonus = 5;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('should parse invalid spell save DC expression unchanged', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                            | inputText
      ${'Unclosed brackets'}                                 | ${'sdc[cha + 19'}
      ${'Decimal numbers'}                                   | ${'sdc[cha - 19.11]'}
      ${'Missing operand'}                                   | ${'sdc[cha - - 19]'}
      ${'Missing operator'}                                  | ${'sdc[cha 19]'}
      ${'Dangling preceding operator'}                       | ${'sdc[+ cha + 19]'}
      ${'Dangling trailing operator'}                        | ${'sdc[cha + 19 +]'}
      ${'Invalid modifier'}                                  | ${'sdc[dax]'}
      ${'Invalid proficiency bonus'}                         | ${'sdc[profbonus]'}
      ${'Integer cannot be used as first operand'}           | ${'sdc[19]'}
      ${'Finesse modifier cannot be used as first operand'}  | ${'sdc[fin]'}
      ${'Proficiency bonus cannot be used as first operand'} | ${'sdc[prof]'}
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
});