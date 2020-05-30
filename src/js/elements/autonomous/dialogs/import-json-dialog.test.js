import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';

import ImportJsonDialog from './import-json-dialog.js';

jest.mock('../containers/stat-block.js');

let statBlockEditor;
let statBlockMenu;

beforeAll(async() => {
  await StatBlockEditor.define();
  await StatBlockMenu.define();

  await ImportJsonDialog.define();
});


beforeEach(() => {
  statBlockEditor = new StatBlockEditor();
  statBlockMenu = statBlockEditor.statBlockMenu;

  statBlockEditor.connect();
  statBlockMenu.connect();
});

describe('should import JSON', () => {
  beforeEach(() => {
    statBlockEditor.importJsonDialog.connect();
  });

  describe('from file', () => {
    it('successfully', async () => {
      let fileInputClickEvent = null;
      statBlockEditor.importJsonDialog.fileInput.addEventListener('click', (event) => {
        fileInputClickEvent = event;
      });

      statBlockMenu.importJsonButton.click();
      statBlockEditor.importJsonDialog.chooseFileButton.click();
      expect(fileInputClickEvent).not.toBeNull();

      /* Notes about JSDOM limitations:

        JSDOM does not support Blob.text(), which prevents us from testing file
        reading. We could fallback to using FileReader in the implementation,
        but then the test would not be able to easily detect the load event when
        the FileReader is complete.
        - GitHub issue: https://github.com/jsdom/jsdom/issues/2555
      */

      /*
      const json = {
        layout: {
          columns: 2,
          twoColumnMode: 'manual',
          twoColumnHeight: 700
        }
      };

      const file = new File([json], 'blah.json', {
        type: 'application/json'
      });

      Object.defineProperty(statBlockEditor.importJsonDialog.fileInput, 'files', {
        value: [file]
      });

      await statBlockEditor.importJsonDialog.onJsonImportFileSelected();

      expect(CurrentContext.layoutSettings.columns).toBe(json.layout.columns);
      expect(CurrentContext.layoutSettings.twoColumnMode).toBe(json.layout.twoColumnMode);
      expect(CurrentContext.layoutSettings.twoColumnHeight).toBe(json.layout.twoColumnHeight);
      */
    });
  });
});