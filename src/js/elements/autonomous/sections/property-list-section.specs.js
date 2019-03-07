import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export function shouldAddASuggestedItem(section, itemText) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  expect(section.editElements.propertyList.itemsAsText).toEqual([itemText]);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section.showElements.text).toHaveTextContent(itemText);
}

export function shouldAddACustomItem(section, itemText) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);      
  section.editElements.addButton.click();

  expect(section.editElements.propertyList.itemsAsText).toEqual([itemText]);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section.showElements.text).toHaveTextContent(itemText);
}

export function shouldAddManyItems(section, itemTexts) {
  for (const itemText of itemTexts) {
    inputValueAndTriggerEvent(section.editElements.input, itemText);      
    section.editElements.addButton.click();
  }

  expect(section.editElements.propertyList.itemsAsText).toEqual(itemTexts);

  section.editElements.submitForm();

  const expectedTextContent = itemTexts.join(', ');

  expect(section).toBeInMode('show');
  expect(section.showElements.text).toHaveTextContent(expectedTextContent);
}

export function shouldDisplayAnErrorIfAddingBlank(section, expectedItemType) {
  inputValueAndTriggerEvent(section.editElements.input, '');
  section.editElements.addButton.click();

  expect(section).toHaveError(
    section.editElements.input,
    `Cannot add a blank ${expectedItemType}.`);
}

export function shouldDisplayAnErrorIfAddingDuplicate(section, itemText, expectedItemType) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  expect(section).toHaveError(
    section.editElements.input,
    `Cannot add a duplicate ${expectedItemType}.`);
}

export function shouldDisplayAnErrorIfSavingWithUnaddedInputText(section, itemText, expectedItemType) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.input,
    `Cannot save while the ${expectedItemType} field contains text.\nClear or add the field, then try again.`);
}

export function shouldRemoveAndAddSuggestions(section, itemText) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  let dataList = section.editElements.dataList;
  let option = dataList.findOption(itemText);
  expect(option).toHaveAttribute('disabled');

  let item = section.editElements.propertyList.findItem(itemText);
  item.remove();

  expect(option).not.toHaveAttribute('disabled');
}

export function shouldAddAndRemoveItem(section, itemText) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  let item = section.editElements.propertyList.findItem(itemText);
  item.remove();

  expect(section.editElements.propertyList.itemsAsText).toEqual([]);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section.showElements.text).toHaveTextContent('');
  expect(section.showElements.section).toHaveClass('section_empty');
}

export function shouldDeleteOneOfThreeItems(section, initialItems, itemToDelete, expectedItems) {
  for (const item of initialItems) {
    inputValueAndTriggerEvent(section.editElements.input, item);
    section.editElements.addButton.click();
  }

  let item = section.editElements.propertyList.findItem(itemToDelete);
  item.remove();

  expect(section.editElements.propertyList.itemsAsText).toEqual(expectedItems);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section.showElements.text).toHaveTextContent(expectedItems.join(', '));
}