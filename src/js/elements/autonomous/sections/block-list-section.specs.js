import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import Creature from '../../../models/creature.js';

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
  expect(section.editElements.editableList.blocks[0].nameElement).toHaveFocus();
  expect(section.editElements.editableList.blocks[0].nameElement).toBeSelected();
}

export function shouldFocusOnNameFieldOfNewBlock(section) {
  for (let index = 0; index <= 2; index++) {
    section.editElements.addButton.click();
    const blocks = section.editElements.editableList.blocks;
    expect(blocks[index].nameElement).toHaveFocus();
    expect(blocks[index].nameElement).toBeSelected();
  }
}

export function shouldAddASingleBlock(section, block) {
  addAndPopulateBlock(section, block.name, block.originalText);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  const blocks = [block];

  expectDisplayBlocks(section, blocks);
  expectHtmlExport(section, blocks);
  expectHomebreweryExport(section, blocks);
}

export function shouldAddMultipleBlocks(section, blocks) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.originalText);
  }

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  expectDisplayBlocks(section, blocks);
  expectHtmlExport(section, blocks);
  expectHomebreweryExport(section, blocks);
}

export function shouldAddASingleBlockThenRemoveIt(section, block) {
  addAndPopulateBlock(section, block.name, block.originalText);

  const editableBlock = section.editElements.editableList.blocks[0];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, true);

  expect(section.showElements.displayList.blocks).toHaveLength(0);
}

export function shouldAddMultipleBlocksThenRemoveOneOfThem(section, blocks, removeIndex) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.originalText);
  }

  const editableBlock = section.editElements.editableList.blocks[removeIndex];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  blocks.splice(removeIndex, 1);

  expectDisplayBlocks(section, blocks);
  expectHtmlExport(section, blocks);
  expectHomebreweryExport(section, blocks);
}

export function shouldReparseNameChanges(section, block, oldNames, newNames) {
  Creature.fullName = oldNames.fullName;
  Creature.shortName = oldNames.shortName;
  Creature.isProperNoun = oldNames.isProperNoun;

  addAndPopulateBlock(section, block.name, block.originalText);

  section.editElements.submitForm();

  Creature.fullName = newNames.fullName;
  Creature.shortName = newNames.shortName;
  Creature.isProperNoun = newNames.isProperNoun;

  section.reparse();

  const blocks = [block];

  expectDisplayBlocks(section, blocks);
  expectHtmlExport(section, blocks);
  expectHomebreweryExport(section, blocks);
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
  expectDisplayBlocks(section, expectedBlocks);
  expectHtmlExport(section, expectedBlocks);
  expectHomebreweryExport(section, expectedBlocks);

  section.showElements.section.click();

  expect(section.editElements.editableList.blocks[0].name).toBe(expectedBlocks[0].name);
}

export function shouldDisplayAnErrorIfBlockNameIsBlank(section, expectedItemType) {
  addAndPopulateBlock(section, '', 'Some text.');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableList.blocks[0].nameElement,
    `${expectedItemType} Name cannot be blank.`);
}

export function shouldDisplayAnErrorIfBlockTextIsBlank(section, expectedItemType) {
  addAndPopulateBlock(section, 'Some name', '');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableList.blocks[0].textElement,
    `${expectedItemType} Text cannot be blank.`);
}

export function shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(section, expectedItemType) {
  addAndPopulateBlock(section, 'Some name', 'Some *invalid syntax');

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.editableList.blocks[0].textElement,
    `${expectedItemType} Text has invalid markdown syntax.`);
}

export function shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(section, expectedItemType) {
  addAndPopulateBlock(section, '', '');

  section.editElements.submitForm();

  const editableBlock = section.editElements.editableList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameElement,
    `${expectedItemType} Name cannot be blank.`,
    0);
  expect(section).toHaveError(
    editableBlock.textElement,
    `${expectedItemType} Text cannot be blank.`,
    1);
}

export function shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(section, expectedItemType) {
  addAndPopulateBlock(section, '', 'Some __invalid syntax');

  section.editElements.submitForm();

  const editableBlock = section.editElements.editableList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameElement,
    `${expectedItemType} Name cannot be blank.`,
    0);
  expect(section).toHaveError(
    editableBlock.textElement,
    `${expectedItemType} Text has invalid markdown syntax.`,
    1);
}

function addAndPopulateBlock(section, blockName, blockText) {
  section.editElements.addButton.click();

  const blocks = section.editElements.editableList.blocks;
  const editableBlock = blocks[blocks.length - 1];

  inputValueAndTriggerEvent(editableBlock.nameElement, blockName);
  inputValueAndTriggerEvent(editableBlock.textElement, blockText);
}

function expectDisplayBlocks(section, expectedBlocks) {
  for (const [index, block] of expectedBlocks.entries()) {
    const displayBlock = section.showElements.displayList.blocks[index];

    expect(displayBlock.name).toBe(block.name);
    expect(displayBlock.text).toBe(block.htmlText ? block.htmlText : block.originalText);
  }
}

function expectHtmlExport(section, expectedBlocks) {
  const htmlExport = section.exportToHtml();
  const children = htmlExport.children;

  if (expectedHeading !== null) {
    expect(children[0].tagName).toBe('H3');
    expect(children[0]).toHaveTextContent(expectedHeading);
  }

  const htmlExportPropertyBlocks = Array.from(children)
    .filter(element => element.tagName === 'PROPERTY-BLOCK');

  for (const [index, block] of expectedBlocks.entries()) {
    const htmlExportPropertyBlock = htmlExportPropertyBlocks[index];

    expect(htmlExportPropertyBlock).toBeHtmlPropertyBlock(
      `${block.name}.`,
      (block.htmlText ? block.htmlText : block.originalText));
  }
}

function expectHomebreweryExport(section, expectedBlocks) {
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