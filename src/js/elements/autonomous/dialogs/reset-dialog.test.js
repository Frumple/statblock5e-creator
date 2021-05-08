import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';
import StatBlockSidebar from '../containers/stat-block-sidebar.js';

import ResetDialog from './reset-dialog.js';

import CurrentContext from '../../../models/current-context.js';

import { getCheckedRadioButton } from '../../../helpers/element-helpers.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import waitForExpect from 'wait-for-expect';

let statBlockEditor;
let statBlockMenu;
let statBlockSidebar;
let statBlock;
let resetDialog;

beforeAll(async() => {
  await TestCustomElements.define();
  await StatBlockEditor.define();
  await StatBlockMenu.define();
  await StatBlockSidebar.define();
  await ResetDialog.define();
});

beforeEach(() => {
  CurrentContext.localSettings.reset();

  statBlockEditor = new StatBlockEditor();
  document.body.appendChild(statBlockEditor);

  // Mocking a custom element returns an empty HTMLElement for some unknown reason.
  // The workaround is to inject a fake object and mock the relevant methods within.
  statBlockEditor.statBlock = {
    setColumns: () => {},
    setColumnHeight: () => {},
    setEmptyVisibility: () => {},
    updateView: jest.fn(),
    importFromJson: () => {},
    importFromOpen5e: () => {},
    exportToJson: () => { return {}; }
  };

  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlockSidebar = statBlockEditor.statBlockSidebar;
  statBlock = statBlockEditor.statBlock;
  resetDialog = statBlockEditor.resetDialog;
});

it('should reset the statblock and persist empty section visibility if it is set to "Show"', async () => {
  statBlockMenu.resetButton.click();
  resetDialog.resetButton.click();

  await waitForExpect(() => {
    expect(resetDialog.dialog.open).toBe(false);
  });

  const twoColumns = statBlockMenu.columnsToggle.checked;
  const emptySectionsVisibility = statBlockMenu.emptySectionsToggle.checked;
  const heightMode = getCheckedRadioButton(statBlockSidebar, 'height-mode').value;
  const manualHeight = statBlockSidebar.manualHeightSlider.value;

  expect(twoColumns).toBe(false);
  expect(emptySectionsVisibility).toBe(true);
  expect(heightMode).toBe('auto');
  expect(manualHeight).toBe('600');

  expect(statBlock.updateView).toHaveBeenCalled();
});

it('should reset the statblock and persist empty section visibility if it is set to "Hide"', async () => {
  statBlockMenu.emptySectionsToggle.click();

  statBlockMenu.resetButton.click();
  resetDialog.resetButton.click();

  await waitForExpect(() => {
    expect(resetDialog.dialog.open).toBe(false);
  });

  const twoColumns = statBlockMenu.columnsToggle.checked;
  const emptySectionsVisibility = statBlockMenu.emptySectionsToggle.checked;
  const heightMode = getCheckedRadioButton(statBlockSidebar, 'height-mode').value;
  const manualHeight = statBlockSidebar.manualHeightSlider.value;

  expect(twoColumns).toBe(false);
  expect(emptySectionsVisibility).toBe(false);
  expect(heightMode).toBe('auto');
  expect(manualHeight).toBe('600');

  expect(statBlock.updateView).toHaveBeenCalled();
});

it('should reset the statblock to one column if initially set to two columns', async () => {
  statBlockMenu.columnsToggle.click();

  statBlockMenu.resetButton.click();
  resetDialog.resetButton.click();

  await waitForExpect(() => {
    expect(resetDialog.dialog.open).toBe(false);
  });

  const twoColumns = statBlockMenu.columnsToggle.checked;
  const emptySectionsVisibility = statBlockMenu.emptySectionsToggle.checked;
  const heightMode = getCheckedRadioButton(statBlockSidebar, 'height-mode').value;
  const manualHeight = statBlockSidebar.manualHeightSlider.value;

  expect(twoColumns).toBe(false);
  expect(emptySectionsVisibility).toBe(true);
  expect(heightMode).toBe('auto');
  expect(manualHeight).toBe('600');

  expect(statBlock.updateView).toHaveBeenCalled();
});