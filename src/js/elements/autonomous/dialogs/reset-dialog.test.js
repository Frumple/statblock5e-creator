import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';
import StatBlockSidebar from '../containers/stat-block-sidebar.js';

import ResetDialog from './reset-dialog.js';

import { getCheckedRadioButton } from '../../../helpers/element-helpers.js';
import waitForExpect from 'wait-for-expect';

let statBlockEditor;
let statBlockMenu;
let statBlockSidebar;
let statBlock;
let resetDialog;

beforeAll(async() => {
  await StatBlockEditor.define();
  await StatBlockMenu.define();
  await StatBlockSidebar.define();
  await ResetDialog.define();
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

it('should reset the statblock', async () => {
  statBlockMenu.resetButton.click();
  resetDialog.resetButton.click();

  await waitForExpect(() => {
    expect(resetDialog.dialog.open).toBe(false);
  });

  const columns = getCheckedRadioButton(statBlockMenu, 'columns').value;
  const emptySectionVisibility = getCheckedRadioButton(statBlockMenu, 'empty-section-visibility').value;
  const heightMode = getCheckedRadioButton(statBlockSidebar, 'height-mode').value;
  const manualHeight = statBlockSidebar.manualHeightSlider.value;

  expect(columns).toBe('1');
  expect(emptySectionVisibility).toBe('true');
  expect(heightMode).toBe('auto');
  expect(manualHeight).toBe('600');

  expect(statBlock.updateView).toHaveBeenCalled();
});