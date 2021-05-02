import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';
import StatBlockSidebar from '../containers/stat-block-sidebar.js';

import ImportSrdDialog from './import-srd-dialog.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { fetchFromFile } from '../../../helpers/file-helpers.js';
import waitForExpect from 'wait-for-expect';

let statBlockEditor;
let statBlockMenu;
let statBlock;
let importSrdDialog;

beforeAll(async() => {
  await TestCustomElements.define();
  await StatBlockEditor.define();
  await StatBlockMenu.define();
  await StatBlockSidebar.define();
  await ImportSrdDialog.define();
});

beforeEach(() => {
  statBlockEditor = new StatBlockEditor();
  document.body.appendChild(statBlockEditor);

  // Mocking a custom element returns an empty HTMLElement for some unknown reason.
  // The workaround is to inject a fake object and mock the relevant methods within.
  statBlockEditor.statBlock = {
    setColumns: () => {},
    setColumnHeight: () => {},
    setEmptyVisibility: () => {},
    importFromJson: jest.fn(),
    importFromOpen5e: () => {},
    exportToJson: () => { return {}; }
  };

  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlock = statBlockEditor.statBlock;
  importSrdDialog = statBlockEditor.importSrdDialog;
});

describe('should import an SRD creature from the example JSON files', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    creatureSlug
    ${'adult-green-dragon'}
    ${'deep-gnome-svirfneblin'}
    ${'giant-rat-diseased'}
    ${'half-red-dragon-veteran'}
    ${'mage'}
    ${'succubus-incubus'}
    ${'swarm-of-rats'}
    ${'will-o-wisp'}
  `
  ('$creatureSlug',
  async ({creatureSlug}) => {
    const path = `examples/5e-srd/${creatureSlug}.json`;
    const text = await fetchFromFile(path);
    const expectedJson = JSON.parse(text);

    statBlockMenu.importSrdButton.click();

    expect(importSrdDialog.statusText).toBe('Choose a creature:');
    expect(importSrdDialog.statusType).toBeNull();

    inputValueAndTriggerEvent(importSrdDialog.creatureSelect, creatureSlug);
    importSrdDialog.importButton.click();

    await waitForExpect(() => {
      expect(importSrdDialog.dialog.open).toBe(false);
    });

    expect(statBlock.importFromJson).toHaveBeenCalledWith(expectedJson);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});