import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export default class PropertyListSectionSpecs {
  constructor(section, model, headingName, open5eJsonKey) {
    this.section = section;
    this.model = model;
    this.headingName = headingName;
    this.open5eJsonKey = open5eJsonKey;
  }

  showSectionShouldHaveDefaultValues(expectedText = '') {
    expect(this.section.showElements.heading).toHaveTextContent(this.headingName);
    expect(this.section.showElements.text).toHaveTextContent(expectedText);
  }

  editSectionShouldHaveDefaultValues(expectedItems = []) {
    expect(this.section.editElements.propertyList.itemsAsText).toEqual(expectedItems);
  }

  shouldAddAnItem(itemText, expectedText = null) {
    const expectedItems = [itemText];
    if (expectedText === null) {
      expectedText = itemText;
    }

    inputValueAndTriggerEvent(this.section.editElements.input, itemText);
    this.section.editElements.addButton.click();

    this.verifyEditModeView(expectedItems);

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');

    this.verifyModel(expectedItems);
    this.verifyShowModeView(expectedText);

    const json = this.verifyJsonExport(expectedItems);
    expect(this.section).toExportPropertyLineToHtml(this.headingName, expectedText);
    expect(this.section).toExportPropertyLineToMarkdown(this.headingName, expectedText);

    this.reset();
    this.section.importFromJson(json);

    this.verifyModel(expectedItems);
    this.verifyEditModeView(expectedItems);
    this.verifyShowModeView(expectedText);
  }

  shouldAddManyItems(itemTexts, expectedText) {
    for (const itemText of itemTexts) {
      inputValueAndTriggerEvent(this.section.editElements.input, itemText);
      this.section.editElements.addButton.click();
    }

    this.verifyEditModeView(itemTexts);

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');

    this.verifyModel(itemTexts);
    this.verifyShowModeView(expectedText);

    const json = this.verifyJsonExport(itemTexts);
    expect(this.section).toExportPropertyLineToHtml(this.headingName, expectedText);
    expect(this.section).toExportPropertyLineToMarkdown(this.headingName, expectedText);

    this.reset();
    this.section.importFromJson(json);

    this.verifyModel(itemTexts);
    this.verifyEditModeView(itemTexts);
    this.verifyShowModeView(expectedText);
  }

  shouldDisplayAnErrorIfAddingBlank(expectedBlockType) {
    inputValueAndTriggerEvent(this.section.editElements.input, '');
    this.section.editElements.addButton.click();

    expect(this.section).toHaveError(
      this.section.editElements.input,
      `Cannot add a blank ${expectedBlockType}.`);
  }

  shouldDisplayAnErrorIfAddingDuplicate(itemText, expectedBlockType) {
    inputValueAndTriggerEvent(this.section.editElements.input, itemText);
    this.section.editElements.addButton.click();

    inputValueAndTriggerEvent(this.section.editElements.input, itemText);
    this.section.editElements.addButton.click();

    expect(this.section).toHaveError(
      this.section.editElements.input,
      `Cannot add a duplicate ${expectedBlockType}.`);
  }

  shouldDisplayAnErrorIfSavingWithUnaddedInputText(itemText, expectedBlockType) {
    inputValueAndTriggerEvent(this.section.editElements.input, itemText);

    this.section.editElements.submitForm();

    expect(this.section).toHaveError(
      this.section.editElements.input,
      `Cannot save while the ${expectedBlockType} field contains text.\nClear or add the field, then try again.`);
  }

  shouldRemoveAndAddSuggestions(itemText) {
    inputValueAndTriggerEvent(this.section.editElements.input, itemText);
    this.section.editElements.addButton.click();

    const dataList = this.section.editElements.dataList;
    const option = dataList.findOption(itemText);
    expect(option).toHaveAttribute('disabled');

    const item = this.section.editElements.propertyList.findItem(itemText);
    item.remove();

    expect(option).not.toHaveAttribute('disabled');
  }

  shouldAddAndRemoveItem(itemText) {
    const expectedItems = [];
    const expectedText = '';

    inputValueAndTriggerEvent(this.section.editElements.input, itemText);
    this.section.editElements.addButton.click();

    const item = this.section.editElements.propertyList.findItem(itemText);
    item.remove();

    this.verifyEditModeView(expectedItems);

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');

    this.verifyModel(expectedItems);
    expect(this.section.showElements.section).toHaveClass('section_empty');
    this.verifyShowModeView(expectedText);

    const json = this.verifyJsonExport(expectedItems);
    expect(this.section).toExportPropertyLineToHtml(this.headingName, expectedText);
    expect(this.section).toExportPropertyLineToMarkdown(this.headingName, expectedText);

    this.reset();
    this.section.importFromJson(json);

    this.verifyModel(expectedItems);
    this.verifyEditModeView(expectedItems);
    this.verifyShowModeView(expectedText);
  }

  shouldDeleteOneOfManyItems(initialItems, itemToDelete, expectedItems) {
    const expectedText = expectedItems.join(', ');

    for (const item of initialItems) {
      inputValueAndTriggerEvent(this.section.editElements.input, item);
      this.section.editElements.addButton.click();
    }

    const item = this.section.editElements.propertyList.findItem(itemToDelete);
    item.remove();

    this.verifyEditModeView(expectedItems);

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');

    this.verifyModel(expectedItems);
    this.verifyShowModeView(expectedText);

    const json = this.verifyJsonExport(expectedItems);
    expect(this.section).toExportPropertyLineToHtml(this.headingName, expectedText);
    expect(this.section).toExportPropertyLineToMarkdown(this.headingName, expectedText);

    this.reset();
    this.section.importFromJson(json);

    this.verifyModel(expectedItems);
    this.verifyEditModeView(expectedItems);
    this.verifyShowModeView(expectedText);
  }

  shouldImportFromOpen5e(inputText, expectedItems, expectedText = null) {
    if (expectedText === null) {
      expectedText = inputText;
    }

    const json = {};
    json[this.open5eJsonKey] = inputText;

    this.section.importFromOpen5e(json);

    this.verifyModel(expectedItems);
    this.verifyEditModeView(expectedItems);
    this.verifyShowModeView(expectedText);
  }

  shouldShowItemsImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(itemsToImport) {
    const expectedText = itemsToImport.join(', ');
    const json = {
      items: itemsToImport
    };

    this.section.mode = 'hidden';
    this.section.importFromJson(json);

    expect(this.section).toBeInMode('show');
    this.verifyShowModeView(expectedText);
  }

  reset() {
    this.model.reset();
    this.section.updateView();
  }

  verifyModel(expectedItems) {
    expect(this.model.items).toStrictEqual(expectedItems);
  }

  verifyEditModeView(expectedItems) {
    expect(this.section.editElements.propertyList.itemsAsText).toStrictEqual(expectedItems);
  }

  verifyShowModeView(expectedText) {
    expect(this.section).toShowPropertyLine(this.headingName, expectedText);
  }

  verifyJsonExport(expectedItems) {
    const json = this.section.exportToJson();
    const expectedJson = {
      items: expectedItems
    };

    expect(json).toStrictEqual(expectedJson);

    return json;
  }
}