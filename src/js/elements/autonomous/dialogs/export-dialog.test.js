import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';
import StatBlockSidebar from '../containers/stat-block-sidebar.js';
import StatBlock from '../containers/stat-block.js';

import HeadingStats from '../containers/heading-stats.js';
import TopStats from '../containers/top-stats.js';
import BottomStats from '../containers/bottom-stats.js';

import ExportDialog from './export-dialog.js';

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
   - GitHub issue: https://github.com/jsdom/jsdom/issues/1568

   JSDOM does not support the stepUp() or stepDown() methods, so when
   interacting with the two-column manual height slider, we have to set its
   value and dispatch a change event manually.
   - This issue was fixed in JSDOM 16.0.0, need to update
*/

beforeAll(async() => {
  HeadingStats.mockImplementation(() => {
    return {
      setEmptyVisibility: () => {},
      exportToJson: () => { return {}; },
      exportToHtml: () => { return document.createElement('heading-stats'); },
      exportToMarkdown: () => { return ''; }
    };
  });
  TopStats.mockImplementation(() => {
    return {
      setEmptyVisibility: () => {},
      exportToJson: () => { return {}; },
      exportToHtml: () => { return document.createElement('top-stats'); },
      exportToMarkdown: () => { return ''; }
    };
  });
  BottomStats.mockImplementation(() => {
    return {
      setEmptyVisibility: () => {},
      exportToJson: () => { return {}; },
      exportToHtml: () => { return document.createElement('bottom-stats'); },
      exportToMarkdown: () => { return ''; }
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

  beforeEach(() => {
    statBlockEditor.exportJsonDialog.connect();
  });

  describe('to clipboard', () => {
    it('empty sections hidden', () => {
      statBlockMenu.hideEmptySectionsButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        emptySectionsHiddenTextMatcher,
        statBlockEditor.exportJsonDialog.dialog,
        statBlockEditor.exportJsonDialog.copyToClipboardButton,
      );
    });

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.exportJsonDialog.dialog,
        statBlockEditor.exportJsonDialog.copyToClipboardButton,
      );
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        statBlockEditor.exportJsonDialog.dialog,
        statBlockEditor.exportJsonDialog.copyToClipboardButton,
      );
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportJsonButton.click();
      statBlockEditor.exportJsonDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnManualHeightTextMatcher,
        statBlockEditor.exportJsonDialog.dialog,
        statBlockEditor.exportJsonDialog.copyToClipboardButton,
      );
    });
  });

  describe('as file download', () => {
    const expectedContentType = 'application/json';
    const expectedFileName = 'Commoner.json';

    it('empty sections hiddenn', () => {
      statBlockMenu.hideEmptySectionsButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        emptySectionsHiddenTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportJsonDialog);
    });

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportJsonDialog);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportJsonDialog);
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportJsonButton.click();
      statBlockEditor.exportJsonDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnManualHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportJsonDialog);
    });
  });
});

describe('HTML-based tests', () => {
  const oneColumnTextMatcher = expect.stringContaining('<stat-block>');
  const twoColumnAutoHeightTextMatcher = expect.stringContaining('<stat-block data-two-column="">');
  const twoColumnManualHeightTextMatcher = expect.stringContaining('<stat-block data-two-column="" style="--data-content-height: 625px">');

  describe('should print', () => {
    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.printButton.click();

      expect(printHtml).toHaveBeenCalledWith(oneColumnTextMatcher);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.printButton.click();

      expect(printHtml).toHaveBeenCalledWith(twoColumnAutoHeightTextMatcher);
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();


      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.printButton.click();

      expect(printHtml).toHaveBeenCalledWith(twoColumnManualHeightTextMatcher);
    });
  });

  describe('should export HTML', () => {
    beforeEach(() => {
      statBlockEditor.exportHtmlDialog.connect();
    });

    describe('to clipboard', () => {
      it('one-column version', () => {
        statBlockMenu.oneColumnButton.click();

        statBlockMenu.exportHtmlButton.click();

        statBlockEditor.exportHtmlDialog.copyToClipboardButton.click();

        expect(ClipboardWrapper).toHaveBeenCalledWith(
          oneColumnTextMatcher,
          statBlockEditor.exportHtmlDialog.dialog,
          statBlockEditor.exportHtmlDialog.copyToClipboardButton,
        );
      });

      it('two-column version with automatic height', () => {
        statBlockMenu.twoColumnButton.click();
        statBlockSidebar.autoHeightModeButton.click();

        statBlockMenu.exportHtmlButton.click();

        statBlockEditor.exportHtmlDialog.copyToClipboardButton.click();

        expect(ClipboardWrapper).toHaveBeenCalledWith(
          twoColumnAutoHeightTextMatcher,
          statBlockEditor.exportHtmlDialog.dialog,
          statBlockEditor.exportHtmlDialog.copyToClipboardButton,
        );
      });

      it('two-column version with manual height', () => {
        statBlockMenu.twoColumnButton.click();
        statBlockSidebar.manualHeightModeButton.click();

        statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
        statBlockSidebar.onInputSlider();

        statBlockMenu.exportHtmlButton.click();
        statBlockEditor.exportHtmlDialog.copyToClipboardButton.click();

        expect(ClipboardWrapper).toHaveBeenCalledWith(
          twoColumnManualHeightTextMatcher,
          statBlockEditor.exportHtmlDialog.dialog,
          statBlockEditor.exportHtmlDialog.copyToClipboardButton,
        );
      });
    });

    describe('as file download', () => {
      const expectedContentType = 'text/html';
      const expectedFileName = 'Commoner.html';

      it('one-column version', () => {
        statBlockMenu.oneColumnButton.click();

        statBlockMenu.exportHtmlButton.click();

        statBlockEditor.exportHtmlDialog.downloadAsFileButton.click();

        expect(startFileDownload).toHaveBeenCalledWith(
          oneColumnTextMatcher,
          expectedContentType,
          expectedFileName);

        expectFileDownloadStatus(statBlockEditor.exportHtmlDialog);
      });

      it('two-column version with automatic height', () => {
        statBlockMenu.twoColumnButton.click();
        statBlockSidebar.autoHeightModeButton.click();

        statBlockMenu.exportHtmlButton.click();

        statBlockEditor.exportHtmlDialog.downloadAsFileButton.click();

        expect(startFileDownload).toHaveBeenCalledWith(
          twoColumnAutoHeightTextMatcher,
          expectedContentType,
          expectedFileName);

        expectFileDownloadStatus(statBlockEditor.exportHtmlDialog);
      });

      it('two-column version with manual height', () => {
        statBlockMenu.twoColumnButton.click();
        statBlockSidebar.manualHeightModeButton.click();

        statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
        statBlockSidebar.onInputSlider();

        statBlockMenu.exportHtmlButton.click();
        statBlockEditor.exportHtmlDialog.downloadAsFileButton.click();

        expect(startFileDownload).toHaveBeenCalledWith(
          twoColumnManualHeightTextMatcher,
          expectedContentType,
          expectedFileName);

        expectFileDownloadStatus(statBlockEditor.exportHtmlDialog);
      });
    });
  });
});

describe('should export markdown', () => {
  const oneColumnTextMatcher = expect.stringMatching(/^___\n.*/);
  const twoColumnAutoHeightTextMatcher = expect.stringMatching(/^___\n___\n.*/);

  beforeEach(() => {
    statBlockEditor.exportMarkdownDialog.connect();
  });

  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportMarkdownButton.click();

      statBlockEditor.exportMarkdownDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.exportMarkdownDialog.dialog,
        statBlockEditor.exportMarkdownDialog.copyToClipboardButton,
      );
    });

    it('two-column version', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportMarkdownButton.click();

      statBlockEditor.exportMarkdownDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        statBlockEditor.exportMarkdownDialog.dialog,
        statBlockEditor.exportMarkdownDialog.copyToClipboardButton,
      );
    });
  });

  describe('as file download', () => {
    const expectedContentType = 'text/markdown';
    const expectedFileName = 'Commoner.md';

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportMarkdownButton.click();

      statBlockEditor.exportMarkdownDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportMarkdownDialog);
    });

    it('two-column version', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportMarkdownButton.click();

      statBlockEditor.exportMarkdownDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        twoColumnAutoHeightTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportMarkdownDialog);
    });
  });
});

function expectFileDownloadStatus(dialog) {
  const statusLabel = dialog.statusLabel;
  expect(statusLabel).toHaveTextContent('File download initiated.');
  expect(statusLabel).toHaveClass('option-dialog__status-label_success');
}