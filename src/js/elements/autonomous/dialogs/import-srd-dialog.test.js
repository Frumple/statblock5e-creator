import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';
import StatBlockSidebar from '../containers/stat-block-sidebar.js';
import StatBlock from '../containers/stat-block.js';

import ImportSrdDialog from './import-srd-dialog.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { fetchFromFile } from '../../../helpers/file-helpers.js';
import waitForExpect from 'wait-for-expect';

jest.mock('../containers/stat-block.js');

let statBlockEditor;
let statBlockMenu;
let statBlockSidebar;
let statBlock;
let importSrdDialog;

beforeAll(async() => {
  StatBlock.mockImplementation(() => {
    return {
      setColumns: () => {},
      setColumnHeight: () => {},
      setEmptyVisibility: () => {},
      importFromJson: jest.fn(),
      importFromOpen5e: () => {},
      exportToJson: () => { return {}; }
    };
  });

  await TestCustomElements.define();
  await StatBlockEditor.define();
  await StatBlockMenu.define();
  await StatBlockSidebar.define();
  await ImportSrdDialog.define();
});

beforeEach(() => {
  statBlockEditor = new StatBlockEditor();
  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlockSidebar = statBlockEditor.statBlockSidebar;
  statBlock = statBlockEditor.statBlock;
  importSrdDialog = statBlockEditor.importSrdDialog;
  TestCustomElements.initializeContainer(importSrdDialog);

  StatBlock.mockClear();

  statBlockEditor.connect();
  statBlockMenu.connect();
  statBlockSidebar.connect();
  importSrdDialog.connect();
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