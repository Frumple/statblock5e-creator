import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export function shouldAddAnItem(section, headingName, itemText) {
  const expectedItems = [itemText];

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  expect(section.editElements.propertyList.itemsAsText).toEqual(expectedItems);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section).toShowPropertyLine(headingName, itemText);

  verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, itemText);
  expect(section).toExportPropertyLineToHomebrewery(headingName, itemText);
}

export function shouldAddManyItems(section, headingName, items) {
  const expectedTextContent = items.join(', ');

  for (const itemText of items) {
    inputValueAndTriggerEvent(section.editElements.input, itemText);
    section.editElements.addButton.click();
  }

  expect(section.editElements.propertyList.itemsAsText).toEqual(items);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section).toShowPropertyLine(headingName, expectedTextContent);

  verifyJsonExport(section, items);
  expect(section).toExportPropertyLineToHtml(headingName, expectedTextContent);
  expect(section).toExportPropertyLineToHomebrewery(headingName, expectedTextContent);
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

export function shouldAddAndRemoveItem(section, headingName, itemText) {
  const expectedItems = [];
  const expectedTextContent = '';

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  let item = section.editElements.propertyList.findItem(itemText);
  item.remove();

  expect(section.editElements.propertyList.itemsAsText).toEqual(expectedItems);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section.showElements.section).toHaveClass('section_empty');
  expect(section).toShowPropertyLine(headingName, expectedTextContent);

  verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, expectedTextContent);
  expect(section).toExportPropertyLineToHomebrewery(headingName, expectedTextContent);
}

export function shouldDeleteOneOfManyItems(section, headingName, initialItems, itemToDelete, expectedItems) {
  const expectedTextContent = expectedItems.join(', ');

  for (const item of initialItems) {
    inputValueAndTriggerEvent(section.editElements.input, item);
    section.editElements.addButton.click();
  }

  let item = section.editElements.propertyList.findItem(itemToDelete);
  item.remove();

  expect(section.editElements.propertyList.itemsAsText).toEqual(expectedItems);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');
  expect(section).toShowPropertyLine(headingName, expectedTextContent);

  verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, expectedTextContent);
  expect(section).toExportPropertyLineToHomebrewery(headingName, expectedTextContent);
}

function verifyJsonExport(section, expectedItems) {
  const jsObject = section.exportToJson();
  const expectedJsObject = {
    items: expectedItems
  };

  expect(jsObject).toStrictEqual(expectedJsObject);
}