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

  expect(section).toBeInMode('show');

  verifyModel(model, expectedItems);
  verifyShowModeView(section, headingName, itemText);

  const json = verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, itemText);
  expect(section).toExportPropertyLineToMarkdown(headingName, itemText);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
  verifyShowModeView(section, headingName, itemText);
}

export function shouldAddManyItems(section, model, headingName, itemTexts, expectedText) {
  for (const itemText of itemTexts) {
    inputValueAndTriggerEvent(section.editElements.input, itemText);
    section.editElements.addButton.click();
  }

  verifyEditModeView(section, itemTexts);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');

  verifyModel(model, itemTexts);
  verifyShowModeView(section, headingName, expectedText);

  const json = verifyJsonExport(section, itemTexts);
  expect(section).toExportPropertyLineToHtml(headingName, expectedText);
  expect(section).toExportPropertyLineToMarkdown(headingName, expectedText);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, itemTexts);
  verifyEditModeView(section, itemTexts);
  verifyShowModeView(section, headingName, expectedText);
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
  const expectedText = '';

  inputValueAndTriggerEvent(section.editElements.input, itemText);
  section.editElements.addButton.click();

  const item = section.editElements.propertyList.findItem(itemText);
  item.remove();

  verifyEditModeView(section, expectedItems);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');

  verifyModel(model, expectedItems);
  expect(section.showElements.section).toHaveClass('section_empty');
  verifyShowModeView(section, headingName, expectedText);

  const json = verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, expectedText);
  expect(section).toExportPropertyLineToMarkdown(headingName, expectedText);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
  verifyShowModeView(section, headingName, expectedText);
}

export function shouldDeleteOneOfManyItems(section, model, headingName, initialItems, itemToDelete, expectedItems) {
  const expectedText = expectedItems.join(', ');

  for (const item of initialItems) {
    inputValueAndTriggerEvent(section.editElements.input, item);
    section.editElements.addButton.click();
  }

  const item = section.editElements.propertyList.findItem(itemToDelete);
  item.remove();

  verifyEditModeView(section, expectedItems);

  section.editElements.submitForm();

  expect(section).toBeInMode('show');

  verifyModel(model, expectedItems);
  verifyShowModeView(section, headingName, expectedText);

  const json = verifyJsonExport(section, expectedItems);
  expect(section).toExportPropertyLineToHtml(headingName, expectedText);
  expect(section).toExportPropertyLineToMarkdown(headingName, expectedText);

  reset(section, model);
  section.importFromJson(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
  verifyShowModeView(section, headingName, expectedText);
}

export function shouldImportFromOpen5e(section, model, headingName, open5eJsonKey, inputText, expectedItems, expectedText = null) {
  if (expectedText === null) {
    expectedText = inputText;
  }

  const json = {};
  json[open5eJsonKey] = inputText;

  section.importFromOpen5e(json);

  verifyModel(model, expectedItems);
  verifyEditModeView(section, expectedItems);
  verifyShowModeView(section, headingName, expectedText);
}

export function shouldShowItemsImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(section, headingName, itemsToImport) {
  const expectedText = itemsToImport.join(', ');
  const json = {
    items: itemsToImport
  };

  section.mode = 'hidden';
  section.importFromJson(json);

  expect(section).toBeInMode('show');
  verifyShowModeView(section, headingName, expectedText);
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