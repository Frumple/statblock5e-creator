import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

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
}

export function shouldFocusOnNameFieldOfNewBlock(section) {
  for (let index = 0; index <= 2; index++) {
    section.editElements.addButton.click();
    const blocks = section.editElements.editableList.blocks;
    expect(blocks[index].nameElement).toHaveFocus();
  }
}

export function shouldAddASingleBlock(section, blockName, blockText, expectedText = null) {
  addAndPopulateBlock(section, blockName, blockText);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);
  
  const blocks = [{
    name: blockName,
    text: blockText,
    expectedText: expectedText
  }];

  expectDisplayBlocks(section, blocks);
}

export function shouldAddMultipleBlocks(section, blocks) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.text);
  }

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  expectDisplayBlocks(section, blocks);
}

export function shouldAddASingleBlockThenRemoveIt(section, blockName, blockText) {
  addAndPopulateBlock(section, blockName, blockText);

  const editableBlock = section.editElements.editableList.blocks[0];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, true);

  expect(section.showElements.displayList.blocks).toHaveLength(0);
}

export function shouldAddMultipleBlocksThenRemoveOneOfThem(section, blocks, removeIndex) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.text);
  }

  const editableBlock = section.editElements.editableList.blocks[removeIndex];
  editableBlock.remove();

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  blocks.splice(removeIndex, 1);

  expectDisplayBlocks(section, blocks);
}

export function shouldTrimAllTrailingPeriodCharactersInBlockName(section) {
  addAndPopulateBlock(section, 'Cthulhu. fhtag.n........', 'Some text.');

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  const expectedBlocks = [{
    name: 'Cthulhu. fhtag.n',
    text: 'Some text.'
  }];
  expectDisplayBlocks(section, expectedBlocks);

  section.showElements.editButton.click();

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
    `${expectedItemType} Text has invalid syntax.`);
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
    `${expectedItemType} Text has invalid syntax.`,
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
    if (block.expectedText) {
      expect(displayBlock.text).toBe(block.expectedText);
    } else {
      expect(displayBlock.text).toBe(block.text);
    }    
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