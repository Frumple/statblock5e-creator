import StatBlockEditor from './stat-block-editor.js';
import StatBlockMenu from './stat-block-menu.js';
import StatBlockSidebar from './stat-block-sidebar.js';
import StatBlock from './stat-block.js';

import HeadingStats from '../containers/heading-stats.js';
import TopStats from '../containers/top-stats.js';
import BottomStats from '../containers/bottom-stats.js';

import ExportDialog from '../dialogs/export-dialog.js';

import CurrentContext from '../../../models/current-context.js';

import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
import printHtml from '../../../helpers/print-helpers.js';
import { ClipboardWrapper, startFileDownload } from '../../../helpers/export-helpers.js';

jest.mock('../../../helpers/print-helpers.js');
jest.mock('../../../helpers/export-helpers.js');
jest.mock('../containers/heading-stats.js');
jest.mock('../containers/top-stats.js');
jest.mock('../containers/bottom-stats.js');

const initialHeightSliderValue = 600;

let statBlockEditor;
let statBlockMenu;
let statBlockSidebar;
let statBlock;

/* Notes about JSDOM limitations:

   JSDOM does not support document.execCommand() or any sort of Clipboard API.
   The best that the "Copy to Clipboard" tests can do is check that we are
   calling the ClipboardWrapper with the appropriate parameters.

   JSDOM does not support the stepUp() method, so when interacting with the
   two-column manual height slider, we have to set its value and dispatch
   a change event manually.
*/

beforeAll(async() => {
  HeadingStats.mockImplementation(() => {
    return {
      setEmptyVisibility: () => {},
      exportToJson: () => { return {}; },
      exportToHtml: () => { return document.createElement('heading-stats'); },
      exportToHomebrewery: () => { return ''; }
    };
  });
  TopStats.mockImplementation(() => {
    return {
      setEmptyVisibility: () => {},
      exportToJson: () => { return {}; },
      exportToHtml: () => { return document.createElement('top-stats'); },
      exportToHomebrewery: () => { return ''; }
    };
  });
  BottomStats.mockImplementation(() => {
    return {
      setEmptyVisibility: () => {},
      exportToJson: () => { return {}; },
      exportToHtml: () => { return document.createElement('bottom-stats'); },
      exportToHomebrewery: () => { return ''; }
    };
  });

  HtmlExportDocumentFactory.init();

  await StatBlockEditor.define();
  await StatBlockMenu.define();
  await StatBlockSidebar.define();
  await StatBlock.define();

  await ExportDialog.define();
});

beforeEach(() => {
  printHtml.mockClear();
  ClipboardWrapper.mockClear();
  startFileDownload.mockClear();
  HeadingStats.mockClear();
  TopStats.mockClear();
  BottomStats.mockClear();

  CurrentContext.layoutSettings.reset();

  statBlockEditor = new StatBlockEditor();
  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlockSidebar = statBlockEditor.statBlockSidebar;
  statBlock = statBlockEditor.statBlock;

  statBlockEditor.connect();
  statBlockMenu.connect();
  statBlockSidebar.connect();
  statBlock.connect();

  statBlockEditor.jsonExportDialog.connect();
  statBlockEditor.htmlExportDialog.connect();
  statBlockEditor.homebreweryExportDialog.connect();
});

describe('should print', () => {
  it('one-column version', () => {
    statBlockMenu.oneColumnButton.click();

    statBlockMenu.printButton.click();

    expect(printHtml).toHaveBeenCalledWith(
      expect.stringContaining('<stat-block>'));
  });

  it('two-column version with automatic height', () => {
    statBlockMenu.twoColumnButton.click();
    statBlockSidebar.autoHeightModeButton.click();

    statBlockMenu.printButton.click();

    expect(printHtml).toHaveBeenCalledWith(
      expect.stringContaining('<stat-block data-two-column="">'));
  });

  it('two-column version with manual height', () => {
    statBlockMenu.twoColumnButton.click();
    statBlockSidebar.manualHeightModeButton.click();


    statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
    statBlockSidebar.onInputSlider();

    statBlockMenu.printButton.click();

    expect(printHtml).toHaveBeenCalledWith(
      expect.stringContaining('<stat-block data-two-column="" style="--data-content-height: 625px">'));
  });
});

describe('should export JSON', () => {
  const emptySectionsHiddenTextSnippet = `"layout": {
    "columns": 1,
    "twoColumnMode": "auto",
    "twoColumnHeight": 600,
    "emptySectionsVisibility": false
  }`;

  const oneColumnTextSnippet = `"layout": {
    "columns": 1,
    "twoColumnMode": "auto",
    "twoColumnHeight": 600,
    "emptySectionsVisibility": true
  }`;

  const twoColumnAutoHeightTextSnippet = `"layout": {
    "columns": 2,
    "twoColumnMode": "auto",
    "twoColumnHeight": 600,
    "emptySectionsVisibility": true
  }`;

  const twoColumnManualHeightTextSnippet = `"layout": {
    "columns": 2,
    "twoColumnMode": "manual",
    "twoColumnHeight": 625,
    "emptySectionsVisibility": true
  }`;

  const emptySectionsHiddenTextMatcher = expect.stringContaining(emptySectionsHiddenTextSnippet);
  const oneColumnTextMatcher = expect.stringContaining(oneColumnTextSnippet);
  const twoColumnAutoHeightTextMatcher = expect.stringContaining(twoColumnAutoHeightTextSnippet);
  const twoColumnManualHeightTextMatcher = expect.stringContaining(twoColumnManualHeightTextSnippet);

  describe('to clipboard', () => {
    it('empty sections hidden', () => {
      statBlockMenu.hideEmptySectionsButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.jsonExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        emptySectionsHiddenTextMatcher,
        statBlockEditor.jsonExportDialog.dialog,
        statBlockEditor.jsonExportDialog.copyToClipboardButton,
      );
    });

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.jsonExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.jsonExportDialog.dialog,
        statBlockEditor.jsonExportDialog.copyToClipboardButton,
      );
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.jsonExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        statBlockEditor.jsonExportDialog.dialog,
        statBlockEditor.jsonExportDialog.copyToClipboardButton,
      );
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportJsonButton.click();
      statBlockEditor.jsonExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnManualHeightTextMatcher,
        statBlockEditor.jsonExportDialog.dialog,
        statBlockEditor.jsonExportDialog.copyToClipboardButton,
      );
    });
  });

  describe('as file download', () => {
    const expectedContentType = 'application/json';
    const expectedFileName = 'Commoner.json';

    it('empty sections hiddenn', () => {
      statBlockMenu.hideEmptySectionsButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.jsonExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        emptySectionsHiddenTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.jsonExportDialog);
    });

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.jsonExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.jsonExportDialog);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.jsonExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.jsonExportDialog);
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportJsonButton.click();
      statBlockEditor.jsonExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnManualHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.jsonExportDialog);
    });
  });
});

describe('should export HTML', () => {
  const oneColumnTextMatcher = expect.stringContaining('<stat-block>');
  const twoColumnAutoHeightTextMatcher = expect.stringContaining('<stat-block data-two-column="">');
  const twoColumnManualHeightTextMatcher = expect.stringContaining('<stat-block data-two-column="" style="--data-content-height: 625px">');

  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.htmlExportDialog.dialog,
        statBlockEditor.htmlExportDialog.copyToClipboardButton,
      );
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        statBlockEditor.htmlExportDialog.dialog,
        statBlockEditor.htmlExportDialog.copyToClipboardButton,
      );
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportHtmlButton.click();
      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnManualHeightTextMatcher,
        statBlockEditor.htmlExportDialog.dialog,
        statBlockEditor.htmlExportDialog.copyToClipboardButton,
      );
    });
  });

  describe('as file download', () => {
    const expectedContentType = 'text/html';
    const expectedFileName = 'Commoner.html';

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.htmlExportDialog);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.htmlExportDialog);
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportHtmlButton.click();
      statBlockEditor.htmlExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnManualHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.htmlExportDialog);
    });
  });
});

describe('should export homebrewery', () => {
  const oneColumnTextMatcher = expect.stringMatching(/^___\n.*/);
  const twoColumnAutoHeightTextMatcher = expect.stringMatching(/^___\n___\n.*/);

  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.homebreweryExportDialog.dialog,
        statBlockEditor.homebreweryExportDialog.copyToClipboardButton,
      );
    });

    it('two-column version', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        statBlockEditor.homebreweryExportDialog.dialog,
        statBlockEditor.homebreweryExportDialog.copyToClipboardButton,
      );
    });
  });

  describe('as file download', () => {
    const expectedContentType = 'text/markdown';
    const expectedFileName = 'Commoner.md';

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.homebreweryExportDialog);
    });

    it('two-column version', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.homebreweryExportDialog);
    });
  });
});

function expectFileDownloadStatus(dialog) {
  const statusLabel = dialog.statusLabel;
  expect(statusLabel).toHaveTextContent('File download initiated.');
  expect(statusLabel).toHaveClass('export-dialog__status-label_complete');
}