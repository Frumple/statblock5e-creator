import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

export function shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(section) {
  section.showElements.section.click();
  
  expect(section).toBeInMode('edit');
  expect(section.editElements.addButton).toHaveFocus();
}

export function shouldSwitchToEditModeAndFocusOnFirstNameFieldIfBlockExists(section) {
  section.showElements.section.click();

  addAndPopulateBlock(section, 'Some name', 'Some text.');

  section.editElements.saveButton.click();
  section.showElements.section.click();
  
  expect(section).toBeInMode('edit');
  expect(section.editElements.editableList.blocks[0].nameElement).toHaveFocus();
}

export function shouldAddASingleBlock(section, blockName, blockText) {
  addAndPopulateBlock(section, blockName, blockText);

  section.editElements.saveButton.click();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);
  
  const blocks = [{
    name: blockName,
    text: blockText
  }];

  expectDisplayBlocks(section, blocks);
}

export function shouldAddMultipleBlocks(section, blocks) {
  for (const block of blocks) {
    addAndPopulateBlock(section, block.name, block.text);
  }

  section.editElements.saveButton.click();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  expectDisplayBlocks(section, blocks);
}

export function shouldAddASingleBlockThenRemoveIt(section, blockName, blockText) {
  addAndPopulateBlock(section, blockName, blockText);

  const editableBlock = section.editElements.editableList.blocks[0];
  editableBlock.remove();

  section.editElements.saveButton.click();

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

  section.editElements.saveButton.click();

  expect(section).toBeInMode('show');
  expectSectionToBeEmpty(section, false);

  blocks.splice(removeIndex, 1);

  expectDisplayBlocks(section, blocks);
}

export function shouldTrimAllTrailingPeriodCharactersInBlockName(section) {
  addAndPopulateBlock(section, 'Cthulhu. fhtag.n........', 'Some text.');

  section.editElements.saveButton.click();

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

export function shouldDisplayAnErrorIfBlockNameIsBlank(section) {
  addAndPopulateBlock(section, '', 'Some text.');

  section.editElements.saveButton.click();

  expect(section).toHaveSingleError(
    section.editElements.editableList.blocks[0].nameElement,
    'Item Name cannot be blank.');
}

export function shouldDisplayAnErrorIfBlockTextIsBlank(section) {
  addAndPopulateBlock(section, 'Some name', '');

  section.editElements.saveButton.click();

  expect(section).toHaveSingleError(
    section.editElements.editableList.blocks[0].textElement,
    'Item Text cannot be blank.');
}

export function shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(section) {
  addAndPopulateBlock(section, '', '');

  section.editElements.saveButton.click();

  const editableBlock = section.editElements.editableList.blocks[0];

  expect(section.errorMessages.errors).toHaveLength(2);
  expect(section).toHaveError(
    editableBlock.nameElement,
    'Item Name cannot be blank.');
  expect(section).toHaveError(
    editableBlock.textElement,
    'Item Text cannot be blank.');
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
    expect(displayBlock.text).toBe(block.text);
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