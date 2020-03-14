import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import CurrentContext from '../../../models/current-context.js';

const title = CurrentContext.creature.title;

let expectedHeading = null;

export function setExpectedHeading(heading) {
  expectedHeading = heading;
}

export function sectionShouldHaveDefaultBlocks(section, listModel, expectedBlocks = []) {
  verifyBlocks(section, listModel, expectedBlocks);

  const json = verifyJsonExport(section, expectedBlocks);
  verifyHtmlExport(section, expectedBlocks);
  verifyMarkdownExport(section, expectedBlocks);

  reset(section, listModel);
  section.importFromJson(json);

  verifyBlocks(section, listModel, expectedBlocks);
}

export function shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(section) {
  expect(section).toBeInMode('edit');
  expect(section.editElements.addButton).toHaveFocus();
}

export function shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(section) {
  addAndPopulateBlock(section, 'Some name', 'Some text.');

  section.editElements.submitForm();
  section.showElements.section.click();

  expect(section).toBeInMode('edit');
  expect(section.editElements.editableBlockList.blocks[0].nameInput).toHaveFocus();
  expect(section.editElements.editableBlockList.blocks[0].nameInput).toBeSelected();
}

export function shouldFocusOnNameFieldOfNewBlock(section) {
  for (let index = 0; index <= 2; index++) {
    section.editElements.addButton.click();
    const blocks = section.editElements.editableBlockList.blocks;
    expect(blocks[index].nameInput).toHaveFocus();
    expect(blocks[index].nameInput).toBeSelected();
  }
}

export function shouldAddASingleBlock(section, listModel, block) {
  addAndPopulateBlock(section, block.name, block.text);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  const blocks = [block];
  verifyBlocks(section, listModel, blocks);

  const json = verifyJsonExport(section, blocks);
  verifyHtmlExport(section, blocks);
  verifyMarkdownExport(section, blocks);

  reset(section, listModel);
  section.importFromJson(json);

  verifyBlocks(section, listModel, blocks);
}

export function shouldAddMultipleBlocks(section, listModel, blocks) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.text);
  }

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  verifyBlocks(section, listModel, blocks);

  const json = verifyJsonExport(section, blocks);
  verifyHtmlExport(section, blocks);
  verifyMarkdownExport(section, blocks);

  reset(section, listModel);
  section.importFromJson(json);

  verifyBlocks(section, listModel, blocks);
}

export function shouldAddASingleBlockThenRemoveIt(section, block) {
  addAndPopulateBlock(section, block.name, block.text);

  const editableBlock = section.editElements.editableBlockList.blocks[0];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, true);

  expect(section.showElements.displayBlockList.blocks).toHaveLength(0);
}

export function shouldAddMultipleBlocksThenRemoveOneOfThem(section, listModel, blocks, removeIndex) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.text);
  }

  const editableBlock = section.editElements.editableBlockList.blocks[removeIndex];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  blocks.splice(removeIndex, 1);

  verifyBlocks(section, listModel, blocks);

  const json = verifyJsonExport(section, blocks);
  verifyHtmlExport(section, blocks);
  verifyMarkdownExport(section, blocks);

  reset(section, listModel);
  section.importFromJson(json);

  verifyBlocks(section, listModel, blocks);
}

export function shouldReparseNameChanges(section, listModel, block, oldNames, newNames) {
  title.fullName = oldNames.fullName;
  title.shortName = oldNames.shortName;
  title.isProperNoun = oldNames.isProperNoun;

  addAndPopulateBlock(section, block.name, block.text);

  section.editElements.submitForm();

  title.fullName = newNames.fullName;
  title.shortName = newNames.shortName;
  title.isProperNoun = newNames.isProperNoun;

  section.reparse();

  const blocks = [block];
  verifyBlocks(section, listModel, blocks);

  const json = verifyJsonExport(section, blocks);
  verifyHtmlExport(section, blocks);
  verifyMarkdownExport(section, blocks);

  reset(section, listModel);
  section.importFromJson(json);

  verifyBlocks(section, listModel, blocks);
}

export function shouldTrimAllTrailingPeriodCharactersInBlockName(section, listModel) {
  addAndPopulateBlock(section, 'Cthulhu. fhtag.n........', 'Some text.');

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  const expectedBlocks = [{
    name: 'Cthulhu. fhtag.n',
    text: 'Some text.'
  }];
  verifyBlocks(section, listModel, expectedBlocks);

  const json = verifyJsonExport(section, expectedBlocks);
  verifyHtmlExport(section, expectedBlocks);
  verifyMarkdownExport(section, expectedBlocks);

  reset(section, listModel);
  section.importFromJson(json);

  verifyBlocks(section, listModel, expectedBlocks);
}

export function shouldDisplayAnErrorIfBlockNameIsBlank(section, expectedBlockType) {
  addAndPopulateBlock(section, '', 'Some text.');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableBlockList.blocks[0].nameInput,
    `${expectedBlockType} Name cannot be blank.`);
}

export function shouldDisplayAnErrorIfBlockTextIsBlank(section, expectedBlockType) {
  addAndPopulateBlock(section, 'Some name', '');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableBlockList.blocks[0].textArea,
    `${expectedBlockType} Text cannot be blank.`);
}

export function shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(section, expectedBlockType) {
  addAndPopulateBlock(section, 'Some name', 'Some *invalid syntax');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableBlockList.blocks[0].textArea,
    `${expectedBlockType} Text has invalid markdown syntax.`);
}

export function shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(section, expectedBlockType) {
  addAndPopulateBlock(section, '', '');

  section.editElements.submitForm();

  const editableBlock = section.editElements.editableBlockList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameInput,
    `${expectedBlockType} Name cannot be blank.`,
    0);
  expect(section).toHaveError(
    editableBlock.textArea,
    `${expectedBlockType} Text cannot be blank.`,
    1);
}

export function shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(section, expectedBlockType) {
  addAndPopulateBlock(section, '', 'Some __invalid syntax');

  section.editElements.submitForm();

  const editableBlock = section.editElements.editableBlockList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameInput,
    `${expectedBlockType} Name cannot be blank.`,
    0);
  expect(section).toHaveError(
    editableBlock.textArea,
    `${expectedBlockType} Text has invalid markdown syntax.`,
    1);
}

export function shouldImportFromOpen5e(section, model, open5eJsonKey, blocks) {
  const json = {};
  json[open5eJsonKey] = blocks.map(block => {
    return {
      name: block.name,
      desc: block.text
    };
  });

  section.importFromOpen5e(json);

  verifyBlocks(section, model, blocks);
}

export function shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(section, blocksToImport) {
  const json = {
    blocks: blocksToImport
  };

  section.mode = 'hidden';
  section.importFromJson(json);

  expect(section).toBeInMode('show');
  verifyShowModeView(section, blocksToImport);
}

export function addAndPopulateBlock(section, blockName, blockText) {
  section.editElements.addButton.click();

  const blocks = section.editElements.editableBlockList.blocks;
  const editableBlock = blocks[blocks.length - 1];

  inputValueAndTriggerEvent(editableBlock.nameInput, blockName);
  inputValueAndTriggerEvent(editableBlock.textArea, blockText);
}

function getHtmlExportBlocks(section) {
  const htmlExport = section.exportToHtml();
  const children = htmlExport.children;

  if (expectedHeading !== null) {
    expect(children[0].tagName).toBe('H3');
    expect(children[0]).toHaveTextContent(expectedHeading);
  }

  return Array.from(children)
    .filter(element => element.tagName === 'PROPERTY-BLOCK');
}

export function reset(section, listModel) {
  listModel.reset();
  section.updateView();
}

function verifyBlocks(section, listModel, expectedBlocks) {
  verifyModel(listModel, expectedBlocks);
  verifyEditModeView(section, expectedBlocks);
  verifyShowModeView(section, expectedBlocks);
}

function verifyModel(listModel, expectedBlocks) {
  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const blockModel = listModel.blocks[index];
    verifyBlockModel(blockModel, expectedBlock);
  }
}

function verifyEditModeView(section, expectedBlocks) {
  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const editableBlock = section.editElements.editableBlockList.blocks[index];
    verifyEditableBlock(editableBlock, expectedBlock);
  }
}

function verifyShowModeView(section, expectedBlocks) {
  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const displayBlock = section.showElements.displayBlockList.blocks[index];
    verifyDisplayBlock(displayBlock, expectedBlock);
  }
}

function verifyBlockModel(blockModel, expectedBlock) {
  expect(blockModel.name).toBe(expectedBlock.name);
  expect(blockModel.text).toBe(expectedBlock.expectedText ? expectedBlock.expectedText : expectedBlock.text);
  expect(blockModel.markdownText).toBe(expectedBlock.markdownText ? expectedBlock.markdownText : expectedBlock.text);
  expect(blockModel.htmlText).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text);
}

function verifyEditableBlock(editableBlock, expectedBlock) {
  expect(editableBlock.previewName).toBe(expectedBlock.name);
  expect(editableBlock.previewText).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text);
}

function verifyDisplayBlock(displayBlock, expectedBlock) {
  expect(displayBlock.name).toBe(expectedBlock.name);
  expect(displayBlock.text).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text);
}

function verifyJsonExport(section, expectedBlocks) {
  const json = section.exportToJson();

  const expectedJson = expectedBlocks.map(block => {
    return {
      name: block.name,
      text: block.text
    };
  });

  expect(json.blocks).toStrictEqual(expectedJson);

  return json;
}

function verifyHtmlExport(section, expectedBlocks) {
  const htmlExportBlocks = getHtmlExportBlocks(section);

  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const htmlExportBlock = htmlExportBlocks[index];
    expect(htmlExportBlock).toBeHtmlPropertyBlock(
      `${expectedBlock.name}.`,
      (expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text));
  }
}

function verifyMarkdownExport(section, expectedBlocks) {
  const markdownExport = section.exportToMarkdown();

  if (expectedHeading !== null) {
    const firstNewLineIndex = markdownExport.indexOf('\n');
    const firstLine = markdownExport.slice(0, firstNewLineIndex);

    expect(firstLine).toBe(`> ### ${expectedHeading}`);
  }

  if (expectedBlocks.length > 0) {
    const firstBlockIndex = markdownExport.indexOf('> ***');
    const blocksText = markdownExport.slice(firstBlockIndex);

    const expectedBlocksInMarkdownFormat =
      expectedBlocks.map(
        block => `> ***${block.name}.*** ${(block.markdownText ? block.markdownText : block.text)}`);

    const expectedBlocksText = expectedBlocksInMarkdownFormat.join('\n>\n');
    expect(blocksText).toBe(expectedBlocksText);
  }
}

function expectSectionToBeEmpty(section, isEmpty) {
  const emptySectionClass = 'section_empty';
  const emptyLabelHiddenClass = 'block-list-section__empty-label_hidden';

  expect(section.empty).toBe(isEmpty);

  if (isEmpty) {
    expect(section.showElements.section).toHaveClass(emptySectionClass);
    expect(section.showElements.emptyLabel).not.toHaveClass(emptyLabelHiddenClass);
  } else {
    expect(section.showElements.section).not.toHaveClass(emptySectionClass);
    expect(section.showElements.emptyLabel).toHaveClass(emptyLabelHiddenClass);
  }
}