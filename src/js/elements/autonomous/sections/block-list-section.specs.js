import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import CurrentContext from '../../../models/current-context.js';

const title = CurrentContext.creature.title;

let expectedHeading = null;

export function setExpectedHeading(heading) {
  expectedHeading = heading;
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

export function shouldAddASingleBlock(section, block) {
  addAndPopulateBlock(section, block.name, block.originalText);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  const blocks = [block];
  verifyBlocks(section, blocks);
}

export function shouldAddMultipleBlocks(section, blocks) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.originalText);
  }

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  verifyBlocks(section, blocks);
}

export function shouldAddASingleBlockThenRemoveIt(section, block) {
  addAndPopulateBlock(section, block.name, block.originalText);

  const editableBlock = section.editElements.editableBlockList.blocks[0];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, true);

  expect(section.showElements.displayBlockList.blocks).toHaveLength(0);
}

export function shouldAddMultipleBlocksThenRemoveOneOfThem(section, blocks, removeIndex) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.originalText);
  }

  const editableBlock = section.editElements.editableBlockList.blocks[removeIndex];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  blocks.splice(removeIndex, 1);

  verifyBlocks(section, blocks);
}

export function shouldReparseNameChanges(section, block, oldNames, newNames) {
  title.fullName = oldNames.fullName;
  title.shortName = oldNames.shortName;
  title.isProperNoun = oldNames.isProperNoun;

  addAndPopulateBlock(section, block.name, block.originalText);

  section.editElements.submitForm();

  title.fullName = newNames.fullName;
  title.shortName = newNames.shortName;
  title.isProperNoun = newNames.isProperNoun;

  section.reparse();

  const blocks = [block];
  verifyBlocks(section, blocks);
}

export function shouldTrimAllTrailingPeriodCharactersInBlockName(section) {
  addAndPopulateBlock(section, 'Cthulhu. fhtag.n........', 'Some text.');

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  const expectedBlocks = [{
    name: 'Cthulhu. fhtag.n',
    originalText: 'Some text.'
  }];
  verifyBlocks(section, expectedBlocks);

  section.showElements.section.click();

  expect(section.editElements.editableBlockList.blocks[0].name).toBe(expectedBlocks[0].name);
}

export function shouldDisplayAnErrorIfBlockNameIsBlank(section, expectedItemType) {
  addAndPopulateBlock(section, '', 'Some text.');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableBlockList.blocks[0].nameInput,
    `${expectedItemType} Name cannot be blank.`);
}

export function shouldDisplayAnErrorIfBlockTextIsBlank(section, expectedItemType) {
  addAndPopulateBlock(section, 'Some name', '');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableBlockList.blocks[0].textArea,
    `${expectedItemType} Text cannot be blank.`);
}

export function shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(section, expectedItemType) {
  addAndPopulateBlock(section, 'Some name', 'Some *invalid syntax');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableBlockList.blocks[0].textArea,
    `${expectedItemType} Text has invalid markdown syntax.`);
}

export function shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(section, expectedItemType) {
  addAndPopulateBlock(section, '', '');

  section.editElements.submitForm();

  const editableBlock = section.editElements.editableBlockList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameInput,
    `${expectedItemType} Name cannot be blank.`,
    0);
  expect(section).toHaveError(
    editableBlock.textArea,
    `${expectedItemType} Text cannot be blank.`,
    1);
}

export function shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(section, expectedItemType) {
  addAndPopulateBlock(section, '', 'Some __invalid syntax');

  section.editElements.submitForm();

  const editableBlock = section.editElements.editableBlockList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameInput,
    `${expectedItemType} Name cannot be blank.`,
    0);
  expect(section).toHaveError(
    editableBlock.textArea,
    `${expectedItemType} Text has invalid markdown syntax.`,
    1);
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

function verifyBlocks(section, expectedBlocks) {
  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const editableBlock = section.editElements.editableBlockList.blocks[index];
    const displayBlock = section.showElements.displayBlockList.blocks[index];

    verifyEditableBlock(editableBlock, expectedBlock);
    verifyDisplayBlock(displayBlock, expectedBlock);
  }

  verifyJsonExport(section, expectedBlocks);
  verifyHtmlExport(section, expectedBlocks);
  verifyHomebreweryExport(section, expectedBlocks);
}

function verifyEditableBlock(editableBlock, expectedBlock) {
  expect(editableBlock.previewName).toBe(expectedBlock.name);
  expect(editableBlock.previewText).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.originalText);
}

function verifyDisplayBlock(displayBlock, expectedBlock) {
  expect(displayBlock.name).toBe(expectedBlock.name);
  expect(displayBlock.text).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.originalText);
}

function verifyJsonExport(section, expectedBlocks) {
  const json = section.exportToJson();

  const expectedJson = expectedBlocks.map(block => {
    return {
      name: block.name,
      text: block.originalText
    };
  });

  expect(json.blocks).toStrictEqual(expectedJson);
}

function verifyHtmlExport(section, expectedBlocks) {
  const htmlExportBlocks = getHtmlExportBlocks(section);

  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const htmlExportBlock = htmlExportBlocks[index];
    expect(htmlExportBlock).toBeHtmlPropertyBlock(
      `${expectedBlock.name}.`,
      (expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.originalText));
  }
}

function verifyHomebreweryExport(section, expectedBlocks) {
  const homebreweryExport = section.exportToHomebrewery();

  if (expectedHeading !== null) {
    const firstNewLineIndex = homebreweryExport.indexOf('\n');
    const firstLine = homebreweryExport.slice(0, firstNewLineIndex);

    expect(firstLine).toBe(`> ### ${expectedHeading}`);
  }

  const firstBlockIndex = homebreweryExport.indexOf('> ***');
  const blocksText = homebreweryExport.slice(firstBlockIndex);

  const expectedBlocksInHomebreweryFormat =
    expectedBlocks.map(
      block => `> ***${block.name}.*** ${(block.homebreweryText ? block.homebreweryText : block.originalText)}`);

  const expectedBlocksText = expectedBlocksInHomebreweryFormat.join('\n>\n');
  expect(blocksText).toBe(expectedBlocksText);
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