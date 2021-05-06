import { parseMath } from './parser.js';
import CurrentContext from '../models/current-context.js';

const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;

beforeEach(() => {
  abilitiesModel.reset();
  challengeRatingModel.reset();
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
      ${'single positive'}                 | ${'[42]'}                       | ${'42'}
      ${'single zero'}                     | ${'[0]'}                        | ${'0'}
      ${'single negative'}                 | ${'[-14]'}                      | ${'–14'}
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
      ${'modifier only'}                                        | ${'[CON]'}                                      | ${'7'}
      ${'proficiency bonus only'}                               | ${'[PROF]'}                                     | ${'3'}
      ${'modifier + modifier'}                                  | ${'[CON + WIS]'}                                | ${'8'}
      ${'modifier + proficiency bonus'}                         | ${'[DEX + PROF]'}                               | ${'7'}
      ${'proficiency bonus + modifier'}                         | ${'[PROF + STR]'}                               | ${'1'}
      ${'proficiency bonus + proficiency bonus'}                | ${'[PROF + PROF]'}                              | ${'6'}
      ${'modifier - modifier'}                                  | ${'[CON - WIS]'}                                | ${'6'}
      ${'modifier - proficiency bonus'}                         | ${'[DEX - PROF]'}                               | ${'1'}
      ${'proficiency bonus - modifier'}                         | ${'[PROF - STR]'}                               | ${'5'}
      ${'proficiency bonus - proficiency bonus'}                | ${'[PROF - PROF]'}                              | ${'0'}
      ${'3 modifiers added'}                                    | ${'[STR + DEX + CON]'}                          | ${'9'}
      ${'4 modifiers added'}                                    | ${'[STR + DEX + CON + INT]'}                    | ${'9'}
      ${'5 modifiers added'}                                    | ${'[STR + DEX + CON + INT + WIS]'}              | ${'10'}
      ${'6 modifiers added'}                                    | ${'[STR + DEX + CON + INT + WIS + CHA]'}        | ${'5'}
      ${'6 modifiers added + proficiency bonus'}                | ${'[STR + DEX + CON + INT + WIS + CHA + PROF]'} | ${'8'}
      ${'3 modifiers subtracted'}                               | ${'[STR - DEX - CON]'}                          | ${'–13'}
      ${'4 modifiers subtracted'}                               | ${'[STR - DEX - CON - INT]'}                    | ${'–13'}
      ${'5 modifiers subtracted'}                               | ${'[STR - DEX - CON - INT - WIS]'}              | ${'–14'}
      ${'6 modifiers subtracted'}                               | ${'[STR - DEX - CON - INT - WIS - CHA]'}        | ${'–9'}
      ${'6 modifiers subtracted - proficiency bonus'}           | ${'[STR - DEX - CON - INT - WIS - CHA - PROF]'} | ${'–12'}
      ${'3 modifiers added and subtracted'}                     | ${'[STR + DEX - CON]'}                          | ${'–5'}
      ${'4 modifiers added and subtracted'}                     | ${'[STR + DEX - CON + INT]'}                    | ${'–5'}
      ${'5 modifiers added and subtracted'}                     | ${'[STR + DEX - CON + INT - WIS]'}              | ${'–6'}
      ${'6 modifiers added and subtracted'}                     | ${'[STR + DEX - CON + INT - WIS + CHA]'}        | ${'–11'}
      ${'6 modifiers added and subtracted - proficiency bonus'} | ${'[STR + DEX - CON + INT - WIS + CHA - PROF]'} | ${'–14'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with ability modifiers and proficiency bonus only (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                               | inputText                                       | expectedText
      ${'modifier only'}                                        | ${'[con]'}                                      | ${'7'}
      ${'proficiency bonus only'}                               | ${'[prof]'}                                     | ${'3'}
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
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

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
      ${'modifier + integer'}              | ${'[CHA + 6]'}                  | ${'9'}
      ${'proficiency bonus + integer'}     | ${'[PROF + 6]'}                 | ${'10'}
      ${'integer + modifier'}              | ${'[-2 + INT]'}                 | ${'3'}
      ${'integer + proficiency bonus'}     | ${'[-2 + PROF]'}                | ${'2'}
      ${'modifier - integer'}              | ${'[CHA - 6]'}                  | ${'–3'}
      ${'proficiency bonus - integer'}     | ${'[PROF - 6]'}                 | ${'–2'}
      ${'integer - modifier'}              | ${'[-2 - INT]'}                 | ${'–7'}
      ${'integer - proficiency bonus'}     | ${'[-2 - PROF]'}                | ${'–6'}
      ${'3 operands added'}                | ${'[STR + 4 + DEX]'}            | ${'13'}
      ${'4 operands added'}                | ${'[-8 + STR + 4 + DEX]'}       | ${'5'}
      ${'5 operands added'}                | ${'[-8 + STR + 4 + DEX + WIS]'} | ${'1'}
      ${'3 operands subtracted'}           | ${'[STR - 4 - DEX]'}            | ${'7'}
      ${'4 operands subtracted'}           | ${'[-8 - STR - 4 - DEX]'}       | ${'–21'}
      ${'5 operands subtracted'}           | ${'[-8 - STR - 4 - DEX - WIS]'} | ${'–17'}
      ${'3 operands added and subtracted'} | ${'[STR + 4 - DEX]'}            | ${'15'}
      ${'4 operands added and subtracted'} | ${'[-8 - STR + 4 - DEX]'}       | ${'–13'}
      ${'5 operands added and subtracted'} | ${'[-8 - STR + 4 - DEX + WIS]'} | ${'–17'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 30;     // +10 modifier
      abilitiesModel.abilities['dexterity'].score = 9;     // -1 modifier
      abilitiesModel.abilities['constitution'].score = 12; // +2 modifier
      abilitiesModel.abilities['intelligence'].score = 21; // +5 modifier
      abilitiesModel.abilities['wisdom'].score = 3;        // -4 modifier
      abilitiesModel.abilities['charisma'].score = 16;     // +3 modifier
      challengeRatingModel.proficiencyBonus = 4;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with integers, ability modifiers, and proficiency bonus (lowercase)', () => {
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
      abilitiesModel.abilities['strength'].score = 30;     // +10 modifier
      abilitiesModel.abilities['dexterity'].score = 9;     // -1 modifier
      abilitiesModel.abilities['constitution'].score = 12; // +2 modifier
      abilitiesModel.abilities['intelligence'].score = 21; // +5 modifier
      abilitiesModel.abilities['wisdom'].score = 3;        // -4 modifier
      abilitiesModel.abilities['charisma'].score = 16;     // +3 modifier
      challengeRatingModel.proficiencyBonus = 4;

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
      description                    | strScore | dexScore | inputText         | expectedText
      ${'FIN only, STR > DEX'}       | ${16}    | ${12}    | ${'[FIN]'}        | ${'3'}
      ${'FIN + modifier, STR > DEX'} | ${16}    | ${12}    | ${'[FIN + STR]'}  | ${'6'}
      ${'FIN + PROF, STR > DEX'}     | ${16}    | ${12}    | ${'[FIN + PROF]'} | ${'5'}
      ${'FIN + integer, STR > DEX'}  | ${16}    | ${12}    | ${'[FIN + -4]'}   | ${'–1'}
      ${'FIN only, DEX > STR'}       | ${14}    | ${20}    | ${'[FIN]'}        | ${'5'}
      ${'FIN + modifier, DEX > STR'} | ${14}    | ${20}    | ${'[FIN + STR]'}  | ${'7'}
      ${'FIN + PROF, DEX > STR'}     | ${14}    | ${20}    | ${'[FIN + PROF]'} | ${'7'}
      ${'FIN + integer, DEX > STR'}  | ${14}    | ${20}    | ${'[FIN + -4]'}   | ${'1'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                    | strScore | dexScore | inputText         | expectedText
      ${'FIN only, STR > DEX'}       | ${16}    | ${12}    | ${'[fin]'}        | ${'3'}
      ${'FIN + modifier, STR > DEX'} | ${16}    | ${12}    | ${'[fin + str]'}  | ${'6'}
      ${'FIN + PROF, STR > DEX'}     | ${16}    | ${12}    | ${'[fin + prof]'} | ${'5'}
      ${'FIN + integer, STR > DEX'}  | ${16}    | ${12}    | ${'[fin + -4]'}   | ${'–1'}
      ${'FIN only, DEX > STR'}       | ${14}    | ${20}    | ${'[fin]'}        | ${'5'}
      ${'FIN + modifier, DEX > STR'} | ${14}    | ${20}    | ${'[fin + str]'}  | ${'7'}
      ${'FIN + PROF, DEX > STR'}     | ${14}    | ${20}    | ${'[fin + prof]'} | ${'7'}
      ${'FIN + integer, DEX > STR'}  | ${14}    | ${20}    | ${'[fin + -4]'}   | ${'1'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

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
    description                                      | inputText
    ${'Empty expression'}                            | ${'[]'}
    ${'Whitespace expression'}                       | ${'[   ]'}
    ${'Unclosed brackets'}                           | ${'[42 + 19'}
    ${'Decimal numbers'}                             | ${'[42.83 - 19.11]'}
    ${'Missing operand'}                             | ${'[42 - - 19]'}
    ${'Missing operator'}                            | ${'[42 19]'}
    ${'Dangling preceding operator'}                 | ${'[+ 42 + 19]'}
    ${'Dangling trailing operator'}                  | ${'[42 + 19 +]'}
    ${'Invalid modifier'}                            | ${'[DAX]'}
    ${'Invalid proficiency bonus'}                   | ${'[PROFBONUS]'}
    ${'Modifier with mixed capitalization'}          | ${'[Str]'}
    ${'Proficiency bonus with mixed capitalization'} | ${'[pRoF]'}
    ${'Dice operand'}                                | ${'[3d8]'}
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
      ${'single positive'}                 | ${'MOD[42]'}                       | ${'+42'}
      ${'single zero'}                     | ${'MOD[0]'}                        | ${'+0'}
      ${'single negative'}                 | ${'MOD[-14]'}                      | ${'–14'}
      ${'positive + positive'}             | ${'MOD[42 + 19]'}                  | ${'+61'}
      ${'positive + zero'}                 | ${'MOD[42 + 0]'}                   | ${'+42'}
      ${'positive + negative'}             | ${'MOD[42 + -7]'}                  | ${'+35'}
      ${'zero + positive'}                 | ${'MOD[0 + 3]'}                    | ${'+3'}
      ${'zero + zero'}                     | ${'MOD[0 + 0]'}                    | ${'+0'}
      ${'zero + negative'}                 | ${'MOD[0 + -30]'}                  | ${'–30'}
      ${'negative + positive'}             | ${'MOD[-14 + 22]'}                 | ${'+8'}
      ${'negative + zero'}                 | ${'MOD[-14 + 0]'}                  | ${'–14'}
      ${'negative + negative'}             | ${'MOD[-14 + -238]'}               | ${'–252'}
      ${'positive - positive'}             | ${'MOD[42 - 19]'}                  | ${'+23'}
      ${'positive - zero'}                 | ${'MOD[42 - 0]'}                   | ${'+42'}
      ${'positive - negative'}             | ${'MOD[42 - -7]'}                  | ${'+49'}
      ${'zero - positive'}                 | ${'MOD[0 - 3]'}                    | ${'–3'}
      ${'zero - zero'}                     | ${'MOD[0 - 0]'}                    | ${'+0'}
      ${'zero - negative'}                 | ${'MOD[0 - -30]'}                  | ${'+30'}
      ${'negative - positive'}             | ${'MOD[-14 - 22]'}                 | ${'–36'}
      ${'negative - zero'}                 | ${'MOD[-14 - 0]'}                  | ${'–14'}
      ${'negative - negative'}             | ${'MOD[-14 - -238]'}               | ${'+224'}
      ${'3 integers added'}                | ${'MOD[101 + -28 + 77]'}           | ${'+150'}
      ${'4 integers added'}                | ${'MOD[101 + -28 + 77 + 4]'}       | ${'+154'}
      ${'5 integers added'}                | ${'MOD[101 + -28 + 77 + 4 + -56]'} | ${'+98'}
      ${'3 integers subtracted'}           | ${'MOD[101 - -28 - 77]'}           | ${'+52'}
      ${'4 integers subtracted'}           | ${'MOD[101 - -28 - 77 - 4]'}       | ${'+48'}
      ${'5 integers subtracted'}           | ${'MOD[101 - -28 - 77 - 4 - -56]'} | ${'+104'}
      ${'3 integers added and subtracted'} | ${'MOD[101 + -28 - 77]'}           | ${'–4'}
      ${'4 integers added and subtracted'} | ${'MOD[101 + -28 - 77 + 4]'}       | ${'+0'}
      ${'5 integers added and subtracted'} | ${'MOD[101 + -28 - 77 + 4 + -56]'} | ${'–56'}
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

  describe('with integers only (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                          | inputText                          | expectedText
      ${'single positive'}                 | ${'mod[42]'}                       | ${'+42'}
      ${'single zero'}                     | ${'mod[0]'}                        | ${'+0'}
      ${'single negative'}                 | ${'mod[-14]'}                      | ${'–14'}
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
      ${'modifier only'}                                        | ${'MOD[CON]'}                                      | ${'+7'}
      ${'proficiency bonus only'}                               | ${'MOD[PROF]'}                                     | ${'+3'}
      ${'modifier + modifier'}                                  | ${'MOD[CON + WIS]'}                                | ${'+8'}
      ${'modifier + proficiency bonus'}                         | ${'MOD[DEX + PROF]'}                               | ${'+7'}
      ${'proficiency bonus + modifier'}                         | ${'MOD[PROF + STR]'}                               | ${'+1'}
      ${'proficiency bonus + proficiency bonus'}                | ${'MOD[PROF + PROF]'}                              | ${'+6'}
      ${'modifier - modifier'}                                  | ${'MOD[CON - WIS]'}                                | ${'+6'}
      ${'modifier - proficiency bonus'}                         | ${'MOD[DEX - PROF]'}                               | ${'+1'}
      ${'proficiency bonus - modifier'}                         | ${'MOD[PROF - STR]'}                               | ${'+5'}
      ${'proficiency bonus - proficiency bonus'}                | ${'MOD[PROF - PROF]'}                              | ${'+0'}
      ${'3 modifiers added'}                                    | ${'MOD[STR + DEX + CON]'}                          | ${'+9'}
      ${'4 modifiers added'}                                    | ${'MOD[STR + DEX + CON + INT]'}                    | ${'+9'}
      ${'5 modifiers added'}                                    | ${'MOD[STR + DEX + CON + INT + WIS]'}              | ${'+10'}
      ${'6 modifiers added'}                                    | ${'MOD[STR + DEX + CON + INT + WIS + CHA]'}        | ${'+5'}
      ${'6 modifiers added + proficiency bonus'}                | ${'MOD[STR + DEX + CON + INT + WIS + CHA + PROF]'} | ${'+8'}
      ${'3 modifiers subtracted'}                               | ${'MOD[STR - DEX - CON]'}                          | ${'–13'}
      ${'4 modifiers subtracted'}                               | ${'MOD[STR - DEX - CON - INT]'}                    | ${'–13'}
      ${'5 modifiers subtracted'}                               | ${'MOD[STR - DEX - CON - INT - WIS]'}              | ${'–14'}
      ${'6 modifiers subtracted'}                               | ${'MOD[STR - DEX - CON - INT - WIS - CHA]'}        | ${'–9'}
      ${'6 modifiers subtracted - proficiency bonus'}           | ${'MOD[STR - DEX - CON - INT - WIS - CHA - PROF]'} | ${'–12'}
      ${'3 modifiers added and subtracted'}                     | ${'MOD[STR + DEX - CON]'}                          | ${'–5'}
      ${'4 modifiers added and subtracted'}                     | ${'MOD[STR + DEX - CON + INT]'}                    | ${'–5'}
      ${'5 modifiers added and subtracted'}                     | ${'MOD[STR + DEX - CON + INT - WIS]'}              | ${'–6'}
      ${'6 modifiers added and subtracted'}                     | ${'MOD[STR + DEX - CON + INT - WIS + CHA]'}        | ${'–11'}
      ${'6 modifiers added and subtracted - proficiency bonus'} | ${'MOD[STR + DEX - CON + INT - WIS + CHA - PROF]'} | ${'–14'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with ability modifiers and proficiency bonus only (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                               | inputText                                          | expectedText
      ${'modifier only'}                                        | ${'mod[con]'}                                      | ${'+7'}
      ${'proficiency bonus only'}                               | ${'mod[prof]'}                                     | ${'+3'}
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
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

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
      ${'modifier + integer'}              | ${'MOD[CHA + 6]'}                  | ${'+9'}
      ${'proficiency bonus + integer'}     | ${'MOD[PROF + 6]'}                 | ${'+10'}
      ${'integer + modifier'}              | ${'MOD[-2 + INT]'}                 | ${'+3'}
      ${'integer + proficiency bonus'}     | ${'MOD[-2 + PROF]'}                | ${'+2'}
      ${'modifier - integer'}              | ${'MOD[CHA - 6]'}                  | ${'–3'}
      ${'proficiency bonus - integer'}     | ${'MOD[PROF - 6]'}                 | ${'–2'}
      ${'integer - modifier'}              | ${'MOD[-2 - INT]'}                 | ${'–7'}
      ${'integer - proficiency bonus'}     | ${'MOD[-2 - PROF]'}                | ${'–6'}
      ${'3 operands added'}                | ${'MOD[STR + 4 + DEX]'}            | ${'+13'}
      ${'4 operands added'}                | ${'MOD[-8 + STR + 4 + DEX]'}       | ${'+5'}
      ${'5 operands added'}                | ${'MOD[-8 + STR + 4 + DEX + WIS]'} | ${'+1'}
      ${'3 operands subtracted'}           | ${'MOD[STR - 4 - DEX]'}            | ${'+7'}
      ${'4 operands subtracted'}           | ${'MOD[-8 - STR - 4 - DEX]'}       | ${'–21'}
      ${'5 operands subtracted'}           | ${'MOD[-8 - STR - 4 - DEX - WIS]'} | ${'–17'}
      ${'3 operands added and subtracted'} | ${'MOD[STR + 4 - DEX]'}            | ${'+15'}
      ${'4 operands added and subtracted'} | ${'MOD[-8 - STR + 4 - DEX]'}       | ${'–13'}
      ${'5 operands added and subtracted'} | ${'MOD[-8 - STR + 4 - DEX + WIS]'} | ${'–17'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 30;     // +10 modifier
      abilitiesModel.abilities['dexterity'].score = 9;     // -1 modifier
      abilitiesModel.abilities['constitution'].score = 12; // +2 modifier
      abilitiesModel.abilities['intelligence'].score = 21; // +5 modifier
      abilitiesModel.abilities['wisdom'].score = 3;        // -4 modifier
      abilitiesModel.abilities['charisma'].score = 16;     // +3 modifier
      challengeRatingModel.proficiencyBonus = 4;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with integers, ability modifiers, and proficiency bonus (lowercase)', () => {
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
      abilitiesModel.abilities['strength'].score = 30;     // +10 modifier
      abilitiesModel.abilities['dexterity'].score = 9;     // -1 modifier
      abilitiesModel.abilities['constitution'].score = 12; // +2 modifier
      abilitiesModel.abilities['intelligence'].score = 21; // +5 modifier
      abilitiesModel.abilities['wisdom'].score = 3;        // -4 modifier
      abilitiesModel.abilities['charisma'].score = 16;     // +3 modifier
      challengeRatingModel.proficiencyBonus = 4;

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
      description                    | strScore | dexScore | inputText            | expectedText
      ${'FIN only, STR > DEX'}       | ${16}    | ${12}    | ${'MOD[FIN]'}        | ${'+3'}
      ${'FIN + modifier, STR > DEX'} | ${16}    | ${12}    | ${'MOD[FIN + STR]'}  | ${'+6'}
      ${'FIN + PROF, STR > DEX'}     | ${16}    | ${12}    | ${'MOD[FIN + PROF]'} | ${'+5'}
      ${'FIN + integer, STR > DEX'}  | ${16}    | ${12}    | ${'MOD[FIN + -4]'}   | ${'–1'}
      ${'FIN only, DEX > STR'}       | ${14}    | ${20}    | ${'MOD[FIN]'}        | ${'+5'}
      ${'FIN + modifier, DEX > STR'} | ${14}    | ${20}    | ${'MOD[FIN + STR]'}  | ${'+7'}
      ${'FIN + PROF, DEX > STR'}     | ${14}    | ${20}    | ${'MOD[FIN + PROF]'} | ${'+7'}
      ${'FIN + integer, DEX > STR'}  | ${14}    | ${20}    | ${'MOD[FIN + -4]'}   | ${'+1'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                    | strScore | dexScore | inputText            | expectedText
      ${'FIN only, STR > DEX'}       | ${16}    | ${12}    | ${'mod[fin]'}        | ${'+3'}
      ${'FIN + modifier, STR > DEX'} | ${16}    | ${12}    | ${'mod[fin + str]'}  | ${'+6'}
      ${'FIN + PROF, STR > DEX'}     | ${16}    | ${12}    | ${'mod[fin + prof]'} | ${'+5'}
      ${'FIN + integer, STR > DEX'}  | ${16}    | ${12}    | ${'mod[fin + -4]'}   | ${'–1'}
      ${'FIN only, DEX > STR'}       | ${14}    | ${20}    | ${'mod[fin]'}        | ${'+5'}
      ${'FIN + modifier, DEX > STR'} | ${14}    | ${20}    | ${'mod[fin + str]'}  | ${'+7'}
      ${'FIN + PROF, DEX > STR'}     | ${14}    | ${20}    | ${'mod[fin + prof]'} | ${'+7'}
      ${'FIN + integer, DEX > STR'}  | ${14}    | ${20}    | ${'mod[fin + -4]'}   | ${'+1'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

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
    description                                      | inputText
    ${'Empty expression'}                            | ${'MOD[]'}
    ${'Whitespace expression'}                       | ${'MOD[   ]'}
    ${'Unclosed brackets'}                           | ${'MOD[42 + 19'}
    ${'Decimal numbers'}                             | ${'MOD[42.83 - 19.11]'}
    ${'Missing operand'}                             | ${'MOD[42 - - 19]'}
    ${'Missing operator'}                            | ${'MOD[42 19]'}
    ${'Dangling preceding operator'}                 | ${'MOD[+ 42 + 19]'}
    ${'Dangling trailing operator'}                  | ${'MOD[42 + 19 +]'}
    ${'Invalid modifier'}                            | ${'MOD[DAX]'}
    ${'Invalid proficiency bonus'}                   | ${'MOD[PROFBONUS]'}
    ${'Modifier with mixed capitalization'}          | ${'MOD[Str]'}
    ${'Proficiency bonus with mixed capitalization'} | ${'MOD[pRoF]'}
    ${'Prefix with mixed capitalization'}            | ${'MoD[42]'}
    ${'Dice operand'}                                | ${'MOD[3d8]'}
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
      ${'strength'}     | ${'ATK[STR]'} | ${'+1'}
      ${'dexterity'}    | ${'ATK[DEX]'} | ${'+7'}
      ${'constitution'} | ${'ATK[CON]'} | ${'+10'}
      ${'intelligence'} | ${'ATK[INT]'} | ${'+3'}
      ${'wisdom'}       | ${'ATK[WIS]'} | ${'+4'}
      ${'charisma'}     | ${'ATK[CHA]'} | ${'–2'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with single ability modifier only (lowercase)', () => {
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
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

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
      ${'ability + positive'}            | ${'ATK[STR + 3]'}         | ${'+10'}
      ${'ability + zero'}                | ${'ATK[STR + 0]'}         | ${'+7'}
      ${'ability + negative'}            | ${'ATK[STR + -4]'}        | ${'+3'}
      ${'ability - positive'}            | ${'ATK[STR - 3]'}         | ${'+4'}
      ${'ability - zero'}                | ${'ATK[STR - 0]'}         | ${'+7'}
      ${'ability - negative'}            | ${'ATK[STR - -4]'}        | ${'+11'}
      ${'ability + proficiency bonus'}   | ${'ATK[STR + PROF]'}      | ${'+9'}
      ${'ability + modifier'}            | ${'ATK[STR + DEX]'}       | ${'+10'}
      ${'ability - proficiency bonus'}   | ${'ATK[STR - PROF]'}      | ${'+5'}
      ${'ability - modifier'}            | ${'ATK[STR - DEX]'}       | ${'+4'}
      ${'ability + integer + integer'}   | ${'ATK[STR + -1 + 12]'}   | ${'+18'}
      ${'ability - integer - integer'}   | ${'ATK[STR - -1 - 12]'}   | ${'–4'}
      ${'ability + modifier + modifier'} | ${'ATK[STR + STR + DEX]'} | ${'+15'}
      ${'ability - modifier - modifier'} | ${'ATK[STR - STR - DEX]'} | ${'–1'}
      ${'ability + modifier + integer'}  | ${'ATK[STR + DEX + 7]'}   | ${'+17'}
      ${'ability - modifier - integer'}  | ${'ATK[STR - DEX - 7]'}   | ${'–3'}
      ${'ability + integer + modifier'}  | ${'ATK[STR + 8 + STR]'}   | ${'+20'}
      ${'ability - integer - modifier'}  | ${'ATK[STR - 8 - STR]'}   | ${'–6'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 20;     // +5 modifier
      abilitiesModel.abilities['dexterity'].score = 17;    // +3 modifier
      challengeRatingModel.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with integers, ability modifiers, and proficiency bonus (lowercase)', () => {
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
      abilitiesModel.abilities['strength'].score = 20;     // +5 modifier
      abilitiesModel.abilities['dexterity'].score = 17;    // +3 modifier
      challengeRatingModel.proficiencyBonus = 2;

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
      ${'FIN only, STR > DEX'}                | ${16}    | ${12}    | ${'ATK[FIN]'}        | ${'+5'}
      ${'FIN + modifier, STR > DEX'}          | ${16}    | ${12}    | ${'ATK[FIN + STR]'}  | ${'+8'}
      ${'FIN + proficiency bonus, STR > DEX'} | ${16}    | ${12}    | ${'ATK[FIN + PROF]'} | ${'+7'}
      ${'FIN + integer, STR > DEX'}           | ${16}    | ${12}    | ${'ATK[FIN + -4]'}   | ${'+1'}
      ${'FIN only, DEX > STR'}                | ${14}    | ${20}    | ${'ATK[FIN]'}        | ${'+7'}
      ${'FIN + modifier, DEX > STR'}          | ${14}    | ${20}    | ${'ATK[FIN + STR]'}  | ${'+9'}
      ${'FIN + proficiency bonus, DEX > STR'} | ${14}    | ${20}    | ${'ATK[FIN + PROF]'} | ${'+9'}
      ${'FIN + integer, DEX > STR'}           | ${14}    | ${20}    | ${'ATK[FIN + -4]'}   | ${'+3'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                             | strScore | dexScore | inputText            | expectedText
      ${'FIN only, STR > DEX'}                | ${16}    | ${12}    | ${'atk[fin]'}        | ${'+5'}
      ${'FIN + modifier, STR > DEX'}          | ${16}    | ${12}    | ${'atk[fin + str]'}  | ${'+8'}
      ${'FIN + proficiency bonus, STR > DEX'} | ${16}    | ${12}    | ${'atk[fin + prof]'} | ${'+7'}
      ${'FIN + integer, STR > DEX'}           | ${16}    | ${12}    | ${'atk[fin + -4]'}   | ${'+1'}
      ${'FIN only, DEX > STR'}                | ${14}    | ${20}    | ${'atk[fin]'}        | ${'+7'}
      ${'FIN + modifier, DEX > STR'}          | ${14}    | ${20}    | ${'atk[fin + str]'}  | ${'+9'}
      ${'FIN + proficiency bonus, DEX > STR'} | ${14}    | ${20}    | ${'atk[fin + prof]'} | ${'+9'}
      ${'FIN + integer, DEX > STR'}           | ${14}    | ${20}    | ${'atk[fin + -4]'}   | ${'+3'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

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
    ${'Empty expression'}                                  | ${'ATK[]'}
    ${'Whitespace expression'}                             | ${'ATK[   ]'}
    ${'Unclosed brackets'}                                 | ${'ATK[STR + 19'}
    ${'Decimal numbers'}                                   | ${'ATK[STR - 19.11]'}
    ${'Missing operand'}                                   | ${'ATK[STR - - 19]'}
    ${'Missing operator'}                                  | ${'ATK[STR 19]'}
    ${'Dangling preceding operator'}                       | ${'ATK[+ STR + 19]'}
    ${'Dangling trailing operator'}                        | ${'ATK[STR + 19 +]'}
    ${'Invalid modifier'}                                  | ${'ATK[DAX]'}
    ${'Invalid proficiency bonus'}                         | ${'ATK[PROFBONUS]'}
    ${'Modifier with mixed capitalization'}                | ${'ATK[Str]'}
    ${'Proficiency bonus with mixed capitalization'}       | ${'ATK[STR + pRoF]'}
    ${'Prefix with mixed capitalization'}                  | ${'AtK[STR]'}
    ${'Integer cannot be used as first operand'}           | ${'ATK[19]'}
    ${'Proficiency bonus cannot be used as first operand'} | ${'ATK[PROF]'}
    ${'Dice operand cannot be used as first operand'}      | ${'ATK[3d8]'}
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
      ${'single die without quantity'} | ${'DMG[d8]'}              | ${'4 (1d8)'}
      ${'single die with quantity'}    | ${'DMG[1d8]'}             | ${'4 (1d8)'}
      ${'multiple die'}                | ${'DMG[2d8]'}             | ${'9 (2d8)'}
      ${'die + positive'}              | ${'DMG[4d6 + 3]'}         | ${'17 (4d6 + 3)'}
      ${'die + zero'}                  | ${'DMG[4d6 + 0]'}         | ${'14 (4d6)'}
      ${'die + negative'}              | ${'DMG[4d6 + -4]'}        | ${'10 (4d6 – 4)'}
      ${'die - positive'}              | ${'DMG[3d12 - 3]'}        | ${'16 (3d12 – 3)'}
      ${'die - zero'}                  | ${'DMG[3d12 - 0]'}        | ${'19 (3d12)'}
      ${'die - negative'}              | ${'DMG[3d12 - -4]'}       | ${'23 (3d12 + 4)'}
      ${'die + modifier'}              | ${'DMG[1d10 + STR]'}      | ${'10 (1d10 + 5)'}
      ${'die + proficiency bonus'}     | ${'DMG[1d10 + PROF]'}     | ${'7 (1d10 + 2)'}
      ${'die - modifier'}              | ${'DMG[1d10 - STR]'}      | ${'0 (1d10 – 5)'}
      ${'die - proficiency bonus'}     | ${'DMG[1d10 - PROF]'}     | ${'3 (1d10 – 2)'}
      ${'die + integer + integer'}     | ${'DMG[5d4 + -1 + 12]'}   | ${'23 (5d4 + 11)'}
      ${'die - integer - integer'}     | ${'DMG[5d4 - -1 - 12]'}   | ${'1 (5d4 – 11)'}
      ${'die + modifier + modifier'}   | ${'DMG[6d8 + STR + DEX]'} | ${'35 (6d8 + 8)'}
      ${'die - modifier - modifier'}   | ${'DMG[6d8 - STR - DEX]'} | ${'19 (6d8 – 8)'}
      ${'die + modifier + integer'}    | ${'DMG[3d6 + DEX + 7]'}   | ${'20 (3d6 + 10)'}
      ${'die - modifier - integer'}    | ${'DMG[3d6 - DEX - 7]'}   | ${'0 (3d6 – 10)'}
      ${'die + integer + modifier'}    | ${'DMG[2d20 + 8 + STR]'}  | ${'34 (2d20 + 13)'}
      ${'die - integer - modifier'}    | ${'DMG[2d20 - 8 - STR]'}  | ${'8 (2d20 – 13)'}
    `
    ('$description: {param1="$param1"} => $expected',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 20;     // +5 modifier
      abilitiesModel.abilities['dexterity'].score = 17;    // +3 modifier
      challengeRatingModel.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with integers, ability modifiers, and proficiency bonus (lowercase)', () => {
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
      abilitiesModel.abilities['strength'].score = 20;     // +5 modifier
      abilitiesModel.abilities['dexterity'].score = 17;    // +3 modifier
      challengeRatingModel.proficiencyBonus = 2;

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
      ${'die + FIN, STR > DEX'}           | ${16}    | ${12}    | ${'DMG[2d8 + FIN]'}        | ${'12 (2d8 + 3)'}
      ${'die + FIN + mod, STR > DEX'}     | ${16}    | ${12}    | ${'DMG[2d8 + FIN + STR]'}  | ${'15 (2d8 + 6)'}
      ${'die + FIN + PROF, STR > DEX'}    | ${16}    | ${12}    | ${'DMG[2d8 + FIN + PROF]'} | ${'14 (2d8 + 5)'}
      ${'die + FIN + integer, STR > DEX'} | ${16}    | ${12}    | ${'DMG[2d8 + FIN + -4]'}   | ${'8 (2d8 – 1)'}
      ${'die + FIN, DEX > STR'}           | ${14}    | ${20}    | ${'DMG[2d8 + FIN]'}        | ${'14 (2d8 + 5)'}
      ${'die + FIN + mod, DEX > STR'}     | ${14}    | ${20}    | ${'DMG[2d8 + FIN + STR]'}  | ${'16 (2d8 + 7)'}
      ${'die + FIN + PROF, DEX > STR'}    | ${14}    | ${20}    | ${'DMG[2d8 + FIN + PROF]'} | ${'16 (2d8 + 7)'}
      ${'die + FIN + integer, DEX > STR'} | ${14}    | ${20}    | ${'DMG[2d8 + FIN + -4]'}   | ${'10 (2d8 + 1)'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with finesse modifier (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                         | strScore | dexScore | inputText                  | expectedText
      ${'die + FIN, STR > DEX'}           | ${16}    | ${12}    | ${'dmg[2d8 + fin]'}        | ${'12 (2d8 + 3)'}
      ${'die + FIN + mod, STR > DEX'}     | ${16}    | ${12}    | ${'dmg[2d8 + fin + str]'}  | ${'15 (2d8 + 6)'}
      ${'die + FIN + PROF, STR > DEX'}    | ${16}    | ${12}    | ${'dmg[2d8 + fin + prof]'} | ${'14 (2d8 + 5)'}
      ${'die + FIN + integer, STR > DEX'} | ${16}    | ${12}    | ${'dmg[2d8 + fin + -4]'}   | ${'8 (2d8 – 1)'}
      ${'die + FIN, DEX > STR'}           | ${14}    | ${20}    | ${'dmg[2d8 + fin]'}        | ${'14 (2d8 + 5)'}
      ${'die + FIN + mod, DEX > STR'}     | ${14}    | ${20}    | ${'dmg[2d8 + fin + str]'}  | ${'16 (2d8 + 7)'}
      ${'die + FIN + PROF, DEX > STR'}    | ${14}    | ${20}    | ${'dmg[2d8 + fin + prof]'} | ${'16 (2d8 + 7)'}
      ${'die + FIN + integer, DEX > STR'} | ${14}    | ${20}    | ${'dmg[2d8 + fin + -4]'}   | ${'10 (2d8 + 1)'}
    `
    ('$description: {strScore="$strScore", dexScore="$dexScore", inputText=${inputText}} => $expectedText',
    ({strScore, dexScore, inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = strScore;
      abilitiesModel.abilities['dexterity'].score = dexScore;
      challengeRatingModel.proficiencyBonus = 2;

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
    ${'Empty expression'}                                  | ${'DMG[]'}
    ${'Whitespace expression'}                             | ${'DMG[   ]'}
    ${'Unclosed brackets'}                                 | ${'DMG[2d8 + 19'}
    ${'Decimal numbers'}                                   | ${'DMG[2d8 - 19.11]'}
    ${'Missing operand'}                                   | ${'DMG[2d8 - - 19]'}
    ${'Missing operator'}                                  | ${'DMG[2d8 19]'}
    ${'Dangling preceding operator'}                       | ${'DMG[+ 2d8 + 19]'}
    ${'Dangling trailing operator'}                        | ${'DMG[2d8 + 19 +]'}
    ${'Invalid modifier'}                                  | ${'DMG[DAX]'}
    ${'Invalid proficiency bonus'}                         | ${'DMG[PROFBONUS]'}
    ${'Modifier with mixed capitalization'}                | ${'DMG[2d8 + Str]'}
    ${'Proficiency bonus with mixed capitalization'}       | ${'DMG[2d8 + pRoF]'}
    ${'Prefix with mixed capitalization'}                  | ${'DmG[2d8]'}
    ${'Integer cannot be used as first operand'}           | ${'DMG[19]'}
    ${'Ability modifier cannot be used as first operand'}  | ${'DMG[STR]'}
    ${'Finesse modifier cannot be used as first operand'}  | ${'DMG[FIN]'}
    ${'Proficiency bonus cannot be used as first operand'} | ${'DMG[PROF]'}
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
      ${'strength'}     | ${'SDC[STR]'} | ${'9'}
      ${'dexterity'}    | ${'SDC[DEX]'} | ${'15'}
      ${'constitution'} | ${'SDC[CON]'} | ${'18'}
      ${'intelligence'} | ${'SDC[INT]'} | ${'11'}
      ${'wisdom'}       | ${'SDC[WIS]'} | ${'12'}
      ${'charisma'}     | ${'SDC[CHA]'} | ${'6'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with single ability modifier only (lowercase)', () => {
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
      abilitiesModel.abilities['strength'].score = 7;      // -2 modifier
      abilitiesModel.abilities['dexterity'].score = 18;    // +4 modifier
      abilitiesModel.abilities['constitution'].score = 25; // +7 modifier
      abilitiesModel.abilities['intelligence'].score = 11; // +0 modifier
      abilitiesModel.abilities['wisdom'].score = 12;       // +1 modifier
      abilitiesModel.abilities['charisma'].score = 1;      // -5 modifier
      challengeRatingModel.proficiencyBonus = 3;

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
      ${'ability + positive'}            | ${'SDC[CHA + 3]'}         | ${'20'}
      ${'ability + zero'}                | ${'SDC[CHA + 0]'}         | ${'17'}
      ${'ability + negative'}            | ${'SDC[CHA + -4]'}        | ${'13'}
      ${'ability - positive'}            | ${'SDC[CHA - 3]'}         | ${'14'}
      ${'ability - zero'}                | ${'SDC[CHA - 0]'}         | ${'17'}
      ${'ability - negative'}            | ${'SDC[CHA - -4]'}        | ${'21'}
      ${'ability + proficiency bonus'}   | ${'SDC[CHA + PROF]'}      | ${'22'}
      ${'ability + modifier'}            | ${'SDC[CHA + WIS]'}       | ${'19'}
      ${'ability - proficiency bonus'}   | ${'SDC[CHA - PROF]'}      | ${'12'}
      ${'ability - modifier'}            | ${'SDC[CHA - WIS]'}       | ${'15'}
      ${'ability + integer + integer'}   | ${'SDC[CHA + -1 + 12]'}   | ${'28'}
      ${'ability - integer - integer'}   | ${'SDC[CHA - -1 - 12]'}   | ${'6'}
      ${'ability + modifier + modifier'} | ${'SDC[CHA + CHA + WIS]'} | ${'23'}
      ${'ability - modifier - modifier'} | ${'SDC[CHA - CHA - WIS]'} | ${'11'}
      ${'ability + modifier + integer'}  | ${'SDC[CHA + WIS + 7]'}   | ${'26'}
      ${'ability - modifier - integer'}  | ${'SDC[CHA - WIS - 7]'}   | ${'8'}
      ${'ability + integer + modifier'}  | ${'SDC[CHA + 8 + CHA]'}   | ${'29'}
      ${'ability - integer - modifier'}  | ${'SDC[CHA - 8 - CHA]'}   | ${'5'}
    `
    ('$description: "$inputText" => $expectedText',
    ({inputText, expectedText}) => {
      abilitiesModel.abilities['charisma'].score = 18;    // +4 modifier
      abilitiesModel.abilities['wisdom'].score = 14;      // +2 modifier

      challengeRatingModel.proficiencyBonus = 5;

      const parserResults = parseMath(inputText);

      expect(parserResults).not.toBeNull();
      expect(parserResults.inputText).toBe(inputText);
      expect(parserResults.outputText).toBe(expectedText);
      expect(parserResults.error).toBeNull();
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('with integers, ability modifiers, and proficiency bonus (lowercase)', () => {
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
      abilitiesModel.abilities['charisma'].score = 18;    // +4 modifier
      abilitiesModel.abilities['wisdom'].score = 14;      // +2 modifier

      challengeRatingModel.proficiencyBonus = 5;

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
      ${'Empty expression'}                                  | ${'SDC[]'}
      ${'Whitespace expression'}                             | ${'SDC[   ]'}
      ${'Unclosed brackets'}                                 | ${'SDC[CHA + 19'}
      ${'Decimal numbers'}                                   | ${'SDC[CHA - 19.11]'}
      ${'Missing operand'}                                   | ${'SDC[CHA - - 19]'}
      ${'Missing operator'}                                  | ${'SDC[CHA 19]'}
      ${'Dangling preceding operator'}                       | ${'SDC[+ CHA + 19]'}
      ${'Dangling trailing operator'}                        | ${'SDC[CHA + 19 +]'}
      ${'Invalid modifier'}                                  | ${'SDC[dax]'}
      ${'Invalid proficiency bonus'}                         | ${'SDC[profbonus]'}
      ${'Modifier with mixed capitalization'}                | ${'SDC[Cha]'}
      ${'Proficiency bonus with mixed capitalization'}       | ${'SDC[CHA + pRoF]'}
      ${'Prefix with mixed capitalization'}                  | ${'SdC[CHA]'}
      ${'Integer cannot be used as first operand'}           | ${'SDC[19]'}
      ${'Finesse modifier cannot be used as first operand'}  | ${'SDC[FIN]'}
      ${'Proficiency bonus cannot be used as first operand'} | ${'SDC[PROF]'}
      ${'Dice operand cannot be used as first operand'}      | ${'SDC[3d8]'}
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

  describe('should parse math expressions surrounded by round brackets', () => {
    /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                   | inputText             | expectedText
        ${'basic math expression'}    | ${'([INT])'}          | ${'(3)'}
        ${'modifier expression'}      | ${'(MOD[INT])'}       | ${'(+3)'}
        ${'attack expression'}        | ${'(ATK[INT])'}       | ${'(+7)'}
        ${'damage expression'}        | ${'(DMG[2d6 + INT])'} | ${'(10 (2d6 + 3))'}
        ${'spell save DC expression'} | ${'(SDC[INT])'}       | ${'(15)'}
      `
      ('$description: "$inputText" => $expectedText',
      ({inputText, expectedText}) => {
        abilitiesModel.abilities['intelligence'].score = 16;    // +3 modifier

        challengeRatingModel.proficiencyBonus = 4;

        const parserResults = parseMath(inputText);

        expect(parserResults).not.toBeNull();
        expect(parserResults.inputText).toBe(inputText);
        expect(parserResults.outputText).toBe(expectedText);
        expect(parserResults.error).toBeNull();
      });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('should parse math expressions surrounded by round brackets (lowercase)', () => {
    /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                   | inputText             | expectedText
        ${'basic math expression'}    | ${'([int])'}          | ${'(3)'}
        ${'modifier expression'}      | ${'(mod[int])'}       | ${'(+3)'}
        ${'attack expression'}        | ${'(atk[int])'}       | ${'(+7)'}
        ${'damage expression'}        | ${'(dmg[2d6 + int])'} | ${'(10 (2d6 + 3))'}
        ${'spell save DC expression'} | ${'(sdc[int])'}       | ${'(15)'}
      `
      ('$description: "$inputText" => $expectedText',
      ({inputText, expectedText}) => {
        abilitiesModel.abilities['intelligence'].score = 16;    // +3 modifier

        challengeRatingModel.proficiencyBonus = 4;

        const parserResults = parseMath(inputText);

        expect(parserResults).not.toBeNull();
        expect(parserResults.inputText).toBe(inputText);
        expect(parserResults.outputText).toBe(expectedText);
        expect(parserResults.error).toBeNull();
      });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});