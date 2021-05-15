import EditableBlock from './editable-block.js';
import BlockTextArea from '../../builtin/block-textarea.js';

import CurrentContext from '../../../models/current-context.js';

const titleModel = CurrentContext.creature.title;
const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;

const existingText = 'this is some text ';
const cursorIndex = 8;
const selectionStartIndex = 8;
const selectionEndIndex = 12;

let editableBlock;

beforeAll(async() => {
  titleModel.fullName = 'Androsphinx';
  titleModel.shortName = 'sphinx';

  abilitiesModel.abilities['strength'].score = 22;     // +6 modifier
  abilitiesModel.abilities['dexterity'].score = 10;    // +0 modifier
  abilitiesModel.abilities['constitution'].score = 20; // +5 modifier
  abilitiesModel.abilities['intelligence'].score = 16; // +3 modifier
  abilitiesModel.abilities['wisdom'].score = 18;       // +4 modifier
  abilitiesModel.abilities['charisma'].score = 23;     // +6 modifier

  challengeRatingModel.proficiencyBonus = 6;

  await EditableBlock.define();
  await BlockTextArea.define();
});

beforeEach(() => {
  editableBlock = new EditableBlock();
  document.body.appendChild(editableBlock);

  editableBlock.text = existingText;
});

describe('should add expression to the end of the block text if there is no cursor or selection', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description     | expressionType | variable      | expectedRawText                      | expectedPreviewText
    ${'[NAME]'}     | ${'NAME'}      | ${'NAME'}     | ${'this is some text [NAME]'}        | ${'this is some text the sphinx'}
    ${'[FULLNAME]'} | ${'NAME'}      | ${'FULLNAME'} | ${'this is some text [FULLNAME]'}    | ${'this is some text the androsphinx'}
    ${'MOD[STR]'}   | ${'MOD'}       | ${'STR'}      | ${'this is some text MOD[STR]'}      | ${'this is some text +6'}
    ${'MOD[DEX]'}   | ${'MOD'}       | ${'DEX'}      | ${'this is some text MOD[DEX]'}      | ${'this is some text +0'}
    ${'MOD[CON]'}   | ${'MOD'}       | ${'CON'}      | ${'this is some text MOD[CON]'}      | ${'this is some text +5'}
    ${'MOD[INT]'}   | ${'MOD'}       | ${'INT'}      | ${'this is some text MOD[INT]'}      | ${'this is some text +3'}
    ${'MOD[WIS]'}   | ${'MOD'}       | ${'WIS'}      | ${'this is some text MOD[WIS]'}      | ${'this is some text +4'}
    ${'MOD[CHA]'}   | ${'MOD'}       | ${'CHA'}      | ${'this is some text MOD[CHA]'}      | ${'this is some text +6'}
    ${'ATK[STR]'}   | ${'ATK'}       | ${'STR'}      | ${'this is some text ATK[STR]'}      | ${'this is some text +12'}
    ${'ATK[DEX]'}   | ${'ATK'}       | ${'DEX'}      | ${'this is some text ATK[DEX]'}      | ${'this is some text +6'}
    ${'ATK[FIN]'}   | ${'ATK'}       | ${'FIN'}      | ${'this is some text ATK[FIN]'}      | ${'this is some text +12'}
    ${'DMG[STR]'}   | ${'DMG'}       | ${'STR'}      | ${'this is some text DMG[d6 + STR]'} | ${'this is some text 9 (1d6 + 6)'}
    ${'DMG[DEX]'}   | ${'DMG'}       | ${'DEX'}      | ${'this is some text DMG[d6 + DEX]'} | ${'this is some text 3 (1d6)'}
    ${'DMG[FIN]'}   | ${'DMG'}       | ${'FIN'}      | ${'this is some text DMG[d6 + FIN]'} | ${'this is some text 9 (1d6 + 6)'}
    ${'SDC[INT]'}   | ${'SDC'}       | ${'INT'}      | ${'this is some text SDC[INT]'}      | ${'this is some text 17'}
    ${'SDC[WIS]'}   | ${'SDC'}       | ${'WIS'}      | ${'this is some text SDC[WIS]'}      | ${'this is some text 18'}
    ${'SDC[CHA]'}   | ${'SDC'}       | ${'CHA'}      | ${'this is some text SDC[CHA]'}      | ${'this is some text 20'}
  `
  ('$description',
  ({expressionType, variable, expectedRawText, expectedPreviewText}) => {
    const button = getExpressionButton(expressionType, variable);

    button.click();

    // TODO: Find a way to apply CSS to elements under test, so we can verify that the button is hidden after being clicked.

    expect(editableBlock.text).toBe(expectedRawText);
    expect(editableBlock.previewText).toBe(expectedPreviewText);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('should add expression after the cursor', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description     | expressionType | variable      | expectedRawText                      | expectedPreviewText
    ${'[NAME]'}     | ${'NAME'}      | ${'NAME'}     | ${'this is [NAME]some text '}        | ${'this is the sphinxsome text '}
    ${'[FULLNAME]'} | ${'NAME'}      | ${'FULLNAME'} | ${'this is [FULLNAME]some text '}    | ${'this is the androsphinxsome text '}
    ${'MOD[STR]'}   | ${'MOD'}       | ${'STR'}      | ${'this is MOD[STR]some text '}      | ${'this is +6some text '}
    ${'MOD[DEX]'}   | ${'MOD'}       | ${'DEX'}      | ${'this is MOD[DEX]some text '}      | ${'this is +0some text '}
    ${'MOD[CON]'}   | ${'MOD'}       | ${'CON'}      | ${'this is MOD[CON]some text '}      | ${'this is +5some text '}
    ${'MOD[INT]'}   | ${'MOD'}       | ${'INT'}      | ${'this is MOD[INT]some text '}      | ${'this is +3some text '}
    ${'MOD[WIS]'}   | ${'MOD'}       | ${'WIS'}      | ${'this is MOD[WIS]some text '}      | ${'this is +4some text '}
    ${'MOD[CHA]'}   | ${'MOD'}       | ${'CHA'}      | ${'this is MOD[CHA]some text '}      | ${'this is +6some text '}
    ${'ATK[STR]'}   | ${'ATK'}       | ${'STR'}      | ${'this is ATK[STR]some text '}      | ${'this is +12some text '}
    ${'ATK[DEX]'}   | ${'ATK'}       | ${'DEX'}      | ${'this is ATK[DEX]some text '}      | ${'this is +6some text '}
    ${'ATK[FIN]'}   | ${'ATK'}       | ${'FIN'}      | ${'this is ATK[FIN]some text '}      | ${'this is +12some text '}
    ${'DMG[STR]'}   | ${'DMG'}       | ${'STR'}      | ${'this is DMG[d6 + STR]some text '} | ${'this is 9 (1d6 + 6)some text '}
    ${'DMG[DEX]'}   | ${'DMG'}       | ${'DEX'}      | ${'this is DMG[d6 + DEX]some text '} | ${'this is 3 (1d6)some text '}
    ${'DMG[FIN]'}   | ${'DMG'}       | ${'FIN'}      | ${'this is DMG[d6 + FIN]some text '} | ${'this is 9 (1d6 + 6)some text '}
    ${'SDC[INT]'}   | ${'SDC'}       | ${'INT'}      | ${'this is SDC[INT]some text '}      | ${'this is 17some text '}
    ${'SDC[WIS]'}   | ${'SDC'}       | ${'WIS'}      | ${'this is SDC[WIS]some text '}      | ${'this is 18some text '}
    ${'SDC[CHA]'}   | ${'SDC'}       | ${'CHA'}      | ${'this is SDC[CHA]some text '}      | ${'this is 20some text '}
  `
  ('$description',
  ({expressionType, variable, expectedRawText, expectedPreviewText}) => {
    const button = getExpressionButton(expressionType, variable);

    editableBlock.textArea.setSelectionRange(cursorIndex, cursorIndex);

    button.click();

    // TODO: Find a way to apply CSS to elements under test, so we can verify that the button is hidden after being clicked.

    expect(editableBlock.text).toBe(expectedRawText);
    expect(editableBlock.previewText).toBe(expectedPreviewText);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

describe('should replace selected text with expression', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description     | expressionType | variable      | expectedRawText                  | expectedPreviewText
    ${'[NAME]'}     | ${'NAME'}      | ${'NAME'}     | ${'this is [NAME] text '}        | ${'this is the sphinx text '}
    ${'[FULLNAME]'} | ${'NAME'}      | ${'FULLNAME'} | ${'this is [FULLNAME] text '}    | ${'this is the androsphinx text '}
    ${'MOD[STR]'}   | ${'MOD'}       | ${'STR'}      | ${'this is MOD[STR] text '}      | ${'this is +6 text '}
    ${'MOD[DEX]'}   | ${'MOD'}       | ${'DEX'}      | ${'this is MOD[DEX] text '}      | ${'this is +0 text '}
    ${'MOD[CON]'}   | ${'MOD'}       | ${'CON'}      | ${'this is MOD[CON] text '}      | ${'this is +5 text '}
    ${'MOD[INT]'}   | ${'MOD'}       | ${'INT'}      | ${'this is MOD[INT] text '}      | ${'this is +3 text '}
    ${'MOD[WIS]'}   | ${'MOD'}       | ${'WIS'}      | ${'this is MOD[WIS] text '}      | ${'this is +4 text '}
    ${'MOD[CHA]'}   | ${'MOD'}       | ${'CHA'}      | ${'this is MOD[CHA] text '}      | ${'this is +6 text '}
    ${'ATK[STR]'}   | ${'ATK'}       | ${'STR'}      | ${'this is ATK[STR] text '}      | ${'this is +12 text '}
    ${'ATK[DEX]'}   | ${'ATK'}       | ${'DEX'}      | ${'this is ATK[DEX] text '}      | ${'this is +6 text '}
    ${'ATK[FIN]'}   | ${'ATK'}       | ${'FIN'}      | ${'this is ATK[FIN] text '}      | ${'this is +12 text '}
    ${'DMG[STR]'}   | ${'DMG'}       | ${'STR'}      | ${'this is DMG[d6 + STR] text '} | ${'this is 9 (1d6 + 6) text '}
    ${'DMG[DEX]'}   | ${'DMG'}       | ${'DEX'}      | ${'this is DMG[d6 + DEX] text '} | ${'this is 3 (1d6) text '}
    ${'DMG[FIN]'}   | ${'DMG'}       | ${'FIN'}      | ${'this is DMG[d6 + FIN] text '} | ${'this is 9 (1d6 + 6) text '}
    ${'SDC[INT]'}   | ${'SDC'}       | ${'INT'}      | ${'this is SDC[INT] text '}      | ${'this is 17 text '}
    ${'SDC[WIS]'}   | ${'SDC'}       | ${'WIS'}      | ${'this is SDC[WIS] text '}      | ${'this is 18 text '}
    ${'SDC[CHA]'}   | ${'SDC'}       | ${'CHA'}      | ${'this is SDC[CHA] text '}      | ${'this is 20 text '}
  `
  ('$description',
  ({expressionType, variable, expectedRawText, expectedPreviewText}) => {
    const button = getExpressionButton(expressionType, variable);

    editableBlock.textArea.setSelectionRange(selectionStartIndex, selectionEndIndex);

    button.click();

    // TODO: Find a way to apply CSS to elements under test, so we can verify that the button is hidden after being clicked.

    expect(editableBlock.text).toBe(expectedRawText);
    expect(editableBlock.previewText).toBe(expectedPreviewText);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

function getExpressionButton(expressionType, variable) {
  switch (expressionType) {
  case 'NAME':
    return editableBlock.nameExpressionButtons[variable];
  case 'MOD':
    return editableBlock.modExpressionButtons[variable];
  case 'ATK':
    return editableBlock.atkExpressionButtons[variable];
  case 'DMG':
    return editableBlock.dmgExpressionButtons[variable];
  case 'SDC':
    return editableBlock.sdcExpressionButtons[variable];
  default:
    return null;
  }
}
