import StatBlockEditor from './stat-block-editor.js';
import StatBlockMenu from './stat-block-menu.js';
import StatBlockSidebar from './stat-block-sidebar.js';
import StatBlock from './stat-block.js';

import HeadingSection from '../sections/heading-section.js';
import TopStats from '../containers/top-stats.js';
import BottomStats from '../containers/bottom-stats.js';

import ExportDialog from '../dialogs/export-dialog.js';

import GlobalOptions from '../../../helpers/global-options.js';

import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
import printHtml from '../../../helpers/print-helpers.js';
import { startFileDownload } from '../../../helpers/export-helpers.js';

jest.mock('../../../helpers/print-helpers.js');
jest.mock('../../../helpers/export-helpers.js');
jest.mock('../sections/heading-section.js');
jest.mock('../containers/top-stats.js');
jest.mock('../containers/bottom-stats.js');

const initialHeightSliderValue = 600;

let statBlockEditor;
let statBlockMenu;
let statBlockSidebar;
let statBlock;

/* Notes about JSDOM limitations:

   JSDOM does not support document.execCommand() or any sort of Clipboard API.
   The best that the "Copy to Clipboard" tests can do is check that the
   fallback "Press Ctrl+C..." status is shown on the export dialog.

   JSDOM does not support the stepUp() method, so when interacting with the
   two-column manual height slider, we have to set its value and dispatch
   a change event manually.
*/

beforeAll(async() => {
  HeadingSection.mockImplementation(() => {
    return {
      exportToHtml: () => { return document.createElement('creature-heading'); },
      exportToHomebrewery: () => { return ''; }
    };
  });
  TopStats.mockImplementation(() => {
    return {
      exportToHtml: () => { return document.createElement('top-stats'); },
      exportToHomebrewery: () => { return ''; }
    };
  });
  BottomStats.mockImplementation(() => {
    return {
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
  startFileDownload.mockClear();
  HeadingSection.mockClear();
  TopStats.mockClear();
  BottomStats.mockClear();

  GlobalOptions.reset();

  statBlockEditor = new StatBlockEditor();
  statBlockMenu = statBlockEditor.statBlockMenu;
  statBlockSidebar = statBlockEditor.statBlockSidebar;
  statBlock = statBlockEditor.statBlock;

  statBlockEditor.connect();
  statBlockMenu.connect();
  statBlockSidebar.connect();
  statBlock.connect();

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

describe('should export HTML', () => {
  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus(statBlockEditor.htmlExportDialog);
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus(statBlockEditor.htmlExportDialog);
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportHtmlButton.click();
      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus(statBlockEditor.htmlExportDialog);
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
        expect.stringContaining('<stat-block>'), 
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
        expect.stringContaining('<stat-block data-two-column="">'), 
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
        expect.stringContaining('<stat-block data-two-column="" style="--data-content-height: 625px">'), 
        expectedContentType,
        expectedFileName);
      
      expectFileDownloadStatus(statBlockEditor.htmlExportDialog);
    });
  });  
});

describe('should export homebrewery', () => {
  describe('to clipboard', () => {
    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus(statBlockEditor.homebreweryExportDialog);
    });

    it('two-column version', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus(statBlockEditor.homebreweryExportDialog);
    });
  });

  describe('as file download', () => {
    const expectedContentType = 'text/plain';
    const expectedFileName = 'Commoner.txt';

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHomebreweryButton.click();

      statBlockEditor.homebreweryExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        expect.stringMatching(/^___\n.*/), 
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
        expect.stringMatching(/^___\n___\n.*/), 
        expectedContentType,
        expectedFileName);

      expectFileDownloadStatus(statBlockEditor.homebreweryExportDialog);
    });
  });  
});

function expectCopyToClipboardStatus(dialog) {
  const statusLabel = dialog.statusLabel;
  expect(statusLabel).toHaveTextContent('Press Ctrl+C to copy to clipboard.');
  expect(statusLabel).toHaveClass('export-dialog__status-label_error');
}

function expectFileDownloadStatus(dialog) {
  const statusLabel = dialog.statusLabel;
  expect(statusLabel).toHaveTextContent('File download initiated.');
  expect(statusLabel).toHaveClass('export-dialog__status-label_complete');
}