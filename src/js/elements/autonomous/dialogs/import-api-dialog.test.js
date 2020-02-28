import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';

import ImportApiDialog from './import-api-dialog.js';

import Open5eClient, { mockLoadCreatureList, mockLoadCreature } from '../../../api/open5e-client.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import waitForExpect from 'wait-for-expect';

jest.mock('../containers/stat-block.js');
jest.mock('../../../api/open5e-client.js');

let statBlockEditor;
let statBlockMenu;
let statBlock;
let importOpen5eDialog;

beforeAll(async() => {
  await StatBlockEditor.define();
  await StatBlockMenu.define();
  await ImportApiDialog.define();
});

beforeEach(() => {
  statBlockEditor = new StatBlockEditor();
  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlock = statBlockEditor.statBlock;
  importOpen5eDialog = statBlockEditor.importOpen5eDialog;

  statBlock.importFromOpen5e.mockClear();

  Open5eClient.mockClear();
  mockLoadCreatureList.mockClear();
  mockLoadCreature.mockClear();

  statBlockEditor.connect();
  statBlockMenu.connect();
  importOpen5eDialog.connect();
});

describe('should import a creature from Open5e (stub)', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description          | documentSlug  | creatureSlug
    ${'5th Edition SRD'} | ${'wotc-srd'} | ${'adult-black-dragon'}
    ${'Tome of Beasts'}  | ${'tob'}      | ${'accursed-defiler'}
    ${'Creature Codex'}  | ${'cc'}       | ${'adult-light-dragon'}
  `
  ('$description: documentSlug=$documentSlug, creatureSlug=$creatureSlug',
  async ({documentSlug, creatureSlug}) => {
    statBlockMenu.importOpen5eButton.click();

    expect(importOpen5eDialog.statusText).toBe('Choose a sourcebook:');
    expect(importOpen5eDialog.statusType).toBeNull();

    const expectedJson = mockLoadCreature(creatureSlug);

    switch(documentSlug) {
    case 'wotc-srd':
      importOpen5eDialog.srdRadioButton.click();
      break;
    case 'tob':
      importOpen5eDialog.tobRadioButton.click();
      break;
    case 'cc':
      importOpen5eDialog.ccRadioButton.click();
      break;
    }


    await waitForExpect(() => {
      expect(importOpen5eDialog.statusText).toBe('Choose a creature:');
      expect(importOpen5eDialog.statusType).toBeNull();
    });

    expect(mockLoadCreatureList).toHaveBeenCalledWith(documentSlug);

    inputValueAndTriggerEvent(importOpen5eDialog.creatureSelect, creatureSlug);
    importOpen5eDialog.importButton.click();

    await waitForExpect(() => {
      expect(importOpen5eDialog.dialog.open).toBe(false);
    });

    expect(mockLoadCreature).toHaveBeenCalledWith(creatureSlug);
    expect(statBlock.importFromOpen5e).toHaveBeenCalledWith(expectedJson);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});