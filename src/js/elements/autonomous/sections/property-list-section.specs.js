import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export function showSectionShouldHaveDefaultValues(section, headingName, expectedText = '') {
  expect(section.showElements.heading).toHaveTextContent(headingName);
  expect(section.showElements.text).toHaveTextContent(expectedText);
}

export function editSectionShouldHaveDefaultValues(section, expectedItems = []) {
  expect(section.editElements.propertyList.itemsAsText).toEqual(expectedItems);
}

export function shouldAddAnItem(section, model, headingName, itemText) {
  const expectedItems = [itemText];

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  verifyEditModeView(section, expectedItems);

  section.editElements.submitForm();

  verifyModel(model, expectedItems);
  expect(section).toBeInMode('show');
  verifyShowModeView(section, headingName, itemText);

  const json = verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, itemText);
  expect(section).toExportPropertyLineToHomebrewery(headingName, itemText);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
}

export function shouldAddManyItems(section, model, headingName, items) {
  const expectedTextContent = items.join(', ');

  for (const itemText of items) {
    inputValueAndTriggerEvent(section.editElements.input, itemText);
    section.editElements.addButton.click();
  }

  verifyEditModeView(section, items);

  section.editElements.submitForm();

  verifyModel(model, items);
  expect(section).toBeInMode('show');
  verifyShowModeView(section, headingName, expectedTextContent);

  const json = verifyJsonExport(section, items);
  expect(section).toExportPropertyLineToHtml(headingName, expectedTextContent);
  expect(section).toExportPropertyLineToHomebrewery(headingName, expectedTextContent);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, items);
  verifyEditModeView(section, items);
}

export function shouldDisplayAnErrorIfAddingBlank(section, expectedBlockType) {
  inputValueAndTriggerEvent(section.editElements.input, '');
  section.editElements.addButton.click();

  expect(section).toHaveError(
    section.editElements.input,
    `Cannot add a blank ${expectedBlockType}.`);
}

export function shouldDisplayAnErrorIfAddingDuplicate(section, itemText, expectedBlockType) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  expect(section).toHaveError(
    section.editElements.input,
    `Cannot add a duplicate ${expectedBlockType}.`);
}

export function shouldDisplayAnErrorIfSavingWithUnaddedInputText(section, itemText, expectedBlockType) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);

  section.editElements.submitForm();

  expect(section).toHaveError(
    section.editElements.input,
    `Cannot save while the ${expectedBlockType} field contains text.\nClear or add the field, then try again.`);
}

export function shouldRemoveAndAddSuggestions(section, itemText) {
  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  const dataList = section.editElements.dataList;
  const option = dataList.findOption(itemText);
  expect(option).toHaveAttribute('disabled');

  const item = section.editElements.propertyList.findItem(itemText);
  item.remove();

  expect(option).not.toHaveAttribute('disabled');
}

export function shouldAddAndRemoveItem(section, model, headingName, itemText) {
  const expectedItems = [];
  const expectedTextContent = '';

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  const item = section.editElements.propertyList.findItem(itemText);
  item.remove();

  verifyEditModeView(section, expectedItems);

  section.editElements.submitForm();

  verifyModel(model, expectedItems);
  expect(section).toBeInMode('show');
  expect(section.showElements.section).toHaveClass('section_empty');
  verifyShowModeView(section, headingName, expectedTextContent);

  const json = verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, expectedTextContent);
  expect(section).toExportPropertyLineToHomebrewery(headingName, expectedTextContent);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
}

export function shouldDeleteOneOfManyItems(section, model, headingName, initialItems, itemToDelete, expectedItems) {
  const expectedTextContent = expectedItems.join(', ');

  for (const item of initialItems) {
    inputValueAndTriggerEvent(section.editElements.input, item);
    section.editElements.addButton.click();
  }

  const item = section.editElements.propertyList.findItem(itemToDelete);
  item.remove();

  verifyEditModeView(section, expectedItems);

  section.editElements.submitForm();

  verifyModel(model, expectedItems);
  expect(section).toBeInMode('show');
  verifyShowModeView(section, headingName, expectedTextContent);

  const json = verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, expectedTextContent);
  expect(section).toExportPropertyLineToHomebrewery(headingName, expectedTextContent);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
}

function reset(section, model) {
  model.reset();
  section.updateView();
}

function verifyModel(model, expectedItems) {
  expect(model.items).toStrictEqual(expectedItems);
}

function verifyEditModeView(section, expectedItems) {
  expect(section.editElements.propertyList.itemsAsText).toStrictEqual(expectedItems);
}

function verifyShowModeView(section, headingName, expectedText) {
  expect(section).toShowPropertyLine(headingName, expectedText);
}

export function verifyJsonExport(section, expectedItems) {
  const json = section.exportToJson();
  const expectedJson = {
    items: expectedItems
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}