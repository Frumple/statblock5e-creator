import StatBlockEditor from '../containers/stat-block-editor.js';
import StatBlockMenu from '../containers/stat-block-menu.js';
import StatBlockSidebar from '../containers/stat-block-sidebar.js';
import StatBlock from '../containers/stat-block.js';

import ExportDialog from './export-dialog.js';

import CurrentContext from '../../../models/current-context.js';

import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
import printHtml from '../../../helpers/print-helpers.js';
import { ClipboardWrapper, startFileDownload } from '../../../helpers/export-helpers.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

jest.mock('../../../helpers/print-helpers.js');
jest.mock('../../../helpers/export-helpers.js');

const sliderChangeAmount = 25;

let statBlockEditor;
let statBlockMenu;
let statBlockSidebar;
let statBlock;

/* Notes about JSDOM limitations:

   JSDOM does not support document.execCommand() or any sort of Clipboard API.
   The best that the "Copy to Clipboard" tests can do is check that we are
   calling the ClipboardWrapper with the appropriate parameters.
   - GitHub issue: https://github.com/jsdom/jsdom/issues/1568

   The stepUp() and stepDown() methods in JSDOM do not fire input events.
   The workaround is to call onInputSlider() manually afterwards.
*/

beforeAll(async() => {
  HtmlExportDocumentFactory.init();

  await TestCustomElements.define();
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

  CurrentContext.reset();

  statBlockEditor = new StatBlockEditor();
  document.body.appendChild(statBlockEditor);

  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlockSidebar = statBlockEditor.statBlockSidebar;
  statBlock = statBlockEditor.statBlock;

  // Mocking a custom element returns an empty HTMLElement for some unknown reason.
  // The workaround is to inject a fake object and mock the relevant methods within.
  statBlock.headingStats = {
    setEmptyVisibility: () => {},
    exportToJson: () => { return {}; },
    exportToHtml: () => { return document.createElement('heading-stats'); },
    exportToMarkdown: () => { return ''; }
  };
  statBlock.topStats = {
    setEmptyVisibility: () => {},
    exportToJson: () => { return {}; },
    exportToHtml: () => { return document.createElement('top-stats'); },
    exportToMarkdown: () => { return ''; }
  };
  statBlock.bottomStats = {
    setEmptyVisibility: () => {},
    exportToJson: () => { return {}; },
    exportToHtml: () => { return document.createElement('bottom-stats'); },
    exportToMarkdown: () => { return ''; }
  };
});

describe('should export JSON', () => {
  const oneColumnTextSnippet = `"layout": {
    "columns": 1,
    "twoColumnMode": "auto",
    "twoColumnHeight": 600
  }`;

  const twoColumnAutoHeightTextSnippet = `"layout": {
    "columns": 2,
    "twoColumnMode": "auto",
    "twoColumnHeight": 600
  }`;

  const twoColumnManualHeightTextSnippet = `"layout": {
    "columns": 2,
    "twoColumnMode": "manual",
    "twoColumnHeight": 625
  }`;

  const oneColumnTextMatcher = expect.stringContaining(oneColumnTextSnippet);
  const twoColumnAutoHeightTextMatcher = expect.stringContaining(twoColumnAutoHeightTextSnippet);
  const twoColumnManualHeightTextMatcher = expect.stringContaining(twoColumnManualHeightTextSnippet);

  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.exportJsonDialog.dialog,
        statBlockEditor.exportJsonDialog.copyToClipboardButton,
      );
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.columnsToggle.click();
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
      statBlockMenu.columnsToggle.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.stepUp(sliderChangeAmount);
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

    it('one-column version', () => {
      statBlockMenu.exportJsonButton.click();

      statBlockEditor.exportJsonDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportJsonDialog);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.columnsToggle.click();
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
      statBlockMenu.columnsToggle.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.stepUp(sliderChangeAmount);
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
      statBlockMenu.printButton.click();

      expect(printHtml).toHaveBeenCalledWith(oneColumnTextMatcher);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.columnsToggle.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.printButton.click();

      expect(printHtml).toHaveBeenCalledWith(twoColumnAutoHeightTextMatcher);
    });

    it('two-column version with manual height', () => {
      statBlockMenu.columnsToggle.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.stepUp(sliderChangeAmount);
      statBlockSidebar.onInputSlider();

      statBlockMenu.printButton.click();

      expect(printHtml).toHaveBeenCalledWith(twoColumnManualHeightTextMatcher);
    });
  });

  describe('should export HTML', () => {
    describe('to clipboard', () => {
      it('one-column version', () => {
        statBlockMenu.exportHtmlButton.click();

        statBlockEditor.exportHtmlDialog.copyToClipboardButton.click();

        expect(ClipboardWrapper).toHaveBeenCalledWith(
          oneColumnTextMatcher,
          statBlockEditor.exportHtmlDialog.dialog,
          statBlockEditor.exportHtmlDialog.copyToClipboardButton,
        );
      });

      it('two-column version with automatic height', () => {
        statBlockMenu.columnsToggle.click();
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
        statBlockMenu.columnsToggle.click();
        statBlockSidebar.manualHeightModeButton.click();

        statBlockSidebar.manualHeightSlider.stepUp(sliderChangeAmount);
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
        statBlockMenu.exportHtmlButton.click();

        statBlockEditor.exportHtmlDialog.downloadAsFileButton.click();

        expect(startFileDownload).toHaveBeenCalledWith(
          oneColumnTextMatcher,
          expectedContentType,
          expectedFileName);

        expectFileDownloadStatus(statBlockEditor.exportHtmlDialog);
      });

      it('two-column version with automatic height', () => {
        statBlockMenu.columnsToggle.click();
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
        statBlockMenu.columnsToggle.click();
        statBlockSidebar.manualHeightModeButton.click();

        statBlockSidebar.manualHeightSlider.stepUp(sliderChangeAmount);
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

  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.exportMarkdownButton.click();

      statBlockEditor.exportMarkdownDialog.copyToClipboardButton.click();

      expect(ClipboardWrapper).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        statBlockEditor.exportMarkdownDialog.dialog,
        statBlockEditor.exportMarkdownDialog.copyToClipboardButton,
      );
    });

    it('two-column version', () => {
      statBlockMenu.columnsToggle.click();
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
      statBlockMenu.exportMarkdownButton.click();

      statBlockEditor.exportMarkdownDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        oneColumnTextMatcher,
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.exportMarkdownDialog);
    });

    it('two-column version', () => {
      statBlockMenu.columnsToggle.click();
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