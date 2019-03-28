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

beforeAll(async() => {
  HeadingSection.mockImplementation(() => {
    return {
      title: 'Commoner',
      exportToHtml: () => { return document.createElement('creature-heading'); }
    };
  });
  TopStats.mockImplementation(() => {
    return {
      exportToHtml: () => { return document.createElement('top-stats'); }
    };
  });
  BottomStats.mockImplementation(() => {
    return {
      exportToHtml: () => { return document.createElement('bottom-stats'); }
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

    // JSDOM doesn't support the stepUp() method, set the value and dispatch the event manually
    // statBlockSidebar.manualHeightSlider.stepUp(25);
    statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
    statBlockSidebar.onInputSlider();

    statBlockMenu.printButton.click();

    expect(printHtml).toHaveBeenCalledWith(
      expect.stringContaining('<stat-block data-two-column="" style="--data-content-height: 625px">'));
  });
});

describe('should export HTML', () => {
  describe('to clipboard', () => {

    // JSDOM does not support document.execCommand() or any sort of Clipboard API.
    // The best that these tests can do is check that the fallback status is
    // shown on the export dialog.

    it('one-column version', () => {
      statBlockMenu.oneColumnButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus();
    });

    it('two-column version with automatic height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.autoHeightModeButton.click();

      statBlockMenu.exportHtmlButton.click();

      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus();
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      // JSDOM doesn't support the stepUp() method, set the value and dispatch the event manually
      // statBlockSidebar.manualHeightSlider.stepUp(25);
      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportHtmlButton.click();
      statBlockEditor.htmlExportDialog.copyToClipboardButton.click();

      expectCopyToClipboardStatus();
    });

    function expectCopyToClipboardStatus() {
      const status = statBlockEditor.htmlExportDialog.status;
      expect(status).toHaveTextContent('Press Ctrl+C to copy to clipboard.');
      expect(status).toHaveClass('export-dialog__status_error');
    }
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

      expectFileDownloadStatus();
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

      expectFileDownloadStatus();
    });

    it('two-column version with manual height', () => {
      statBlockMenu.twoColumnButton.click();
      statBlockSidebar.manualHeightModeButton.click();

      // JSDOM doesn't support the stepUp() method, set the value and dispatch the event manually
      // statBlockSidebar.manualHeightSlider.stepUp(25);
      statBlockSidebar.manualHeightSlider.value = initialHeightSliderValue + 25;
      statBlockSidebar.onInputSlider();

      statBlockMenu.exportHtmlButton.click();
      statBlockEditor.htmlExportDialog.downloadAsFileButton.click();

      expect(startFileDownload).toHaveBeenCalledWith(
        expect.stringContaining('<stat-block data-two-column="" style="--data-content-height: 625px">'), 
        expectedContentType,
        expectedFileName);
      
      expectFileDownloadStatus();
    });

    function expectFileDownloadStatus() {
      const status = statBlockEditor.htmlExportDialog.status;
      expect(status).toHaveTextContent('File download initiated.');
      expect(status).toHaveClass('export-dialog__status_complete');
    }
  });  
});