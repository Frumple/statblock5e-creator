import ArmorClassSection from './armor-class-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import CurrentContext from '../../../models/current-context.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Armor Class';

const armorClassModel = CurrentContext.creature.armorClass;

let armorClassSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ArmorClassSection.define();
});

beforeEach(() => {
  armorClassModel.reset();

  armorClassSection = new ArmorClassSection();
  TestCustomElements.initializeSection(armorClassSection);
  armorClassSection.connect();
});

it('show section should have default values', () => {
  verifyShowModeView();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    armorClassSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    verifyEditModeView();
  });

  it('should switch to edit mode and focus on the armor class field', () => {
    expect(armorClassSection).toBeInMode('edit');
    expect(armorClassSection.editElements.armorClass).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      armorClassSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(armorClassSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
        armorClassSection.editElements.useCustomText,
        ['customText'],
        ['armorClass', 'armorType', 'hasShield']
      );

      expect(armorClassSection.editElements.customText).toHaveFocus();
      expect(armorClassSection.editElements.customText).toBeSelected();
    });

    describe('and the edit section is submitted', () => {
      describe('should switch to show mode and save the custom text', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                 | customText                              | expectedHtmlText
          ${'plain custom text'}                      | ${'14 (natural armor), 11 while prone'} | ${'14 (natural armor), 11 while prone'}
          ${'custom text with valid markdown syntax'} | ${'12 (15 with *mage armor*)'}          | ${'12 (15 with <em>mage armor</em>)'}
          ${'custom text with html tags escaped'}     | ${'12 (15 with <em>mage armor</em>)'}   | ${'12 (15 with &lt;em&gt;mage armor&lt;/em&gt;)'}
        `
        ('$description: $customText => $expectedHtmlText',
        ({customText, expectedHtmlText}) => {
          const expectedValues = {
            useCustomText: true,
            customText: customText,
            htmlCustomText: expectedHtmlText
          };

          inputValueAndTriggerEvent(armorClassSection.editElements.customText, customText);

          armorClassSection.editElements.submitForm();

          expect(armorClassSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedHtmlText);

          const json = verifyJsonExport(expectedValues);
          expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedHtmlText);
          expect(armorClassSection).toExportPropertyLineToMarkdown(expectedHeading, customText);

          reset();
          armorClassSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedHtmlText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the custom text if submitted with the custom text checkbox unchecked', () => {
        const expectedValues = {
          useCustomText: false,
          customText: '17 *(19 with shield equipped)*'
        };

        inputValueAndTriggerEvent(armorClassSection.editElements.customText, expectedValues.customText);

        armorClassSection.editElements.useCustomText.click();
        armorClassSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();

        const json = verifyJsonExport(expectedValues);

        reset();
        armorClassSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text cannot be blank.');
      });

      it('should display an error if the custom text field has invalid markdown syntax', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '11 (16 with _barkskin)');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text has invalid Markdown syntax.');
      });

      it('should display only one error if the armor class is not a valid number and custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, '');
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text cannot be blank.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      armorClassSection.editElements.useCustomText.click();
      armorClassSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the armor class field', () => {
      expect(armorClassSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
        armorClassSection.editElements.useCustomText,
        ['customText'],
        ['armorClass', 'armorType', 'hasShield']
      );

      expect(armorClassSection.editElements.armorClass).toHaveFocus();
    });

    describe('and the edit section is submitted', () => {
      describe('should switch to show mode and save the desired fields', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                              | armorClass | armorType          | hasShield | expectedText
          ${'armor class only'}                    | ${7}       | ${''}              | ${false}  | ${'7'}
          ${'armor class and armor type'}          | ${21}      | ${'natural armor'} | ${false}  | ${'21 (natural armor)'}
          ${'armor class and shield'}              | ${12}      | ${''}              | ${true}   | ${'12 (shield)'}
          ${'armor class, armor type, and shield'} | ${16}      | ${'chain shirt'}   | ${true}   | ${'16 (chain shirt, shield)'}
        `
        ('$description: {armorClass="$armorClass", armorType="$armorType", hasShield="$hasShield"} => $expectedText',
        ({armorClass, armorType, hasShield, expectedText}) => {
          const expectedValues = {
            armorClass: armorClass,
            armorType : armorType,
            hasShield: hasShield,
            useCustomText: false
          };

          inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, armorClass);
          inputValueAndTriggerEvent(armorClassSection.editElements.armorType, armorType);
          if (hasShield) {
            armorClassSection.editElements.hasShield.click();
          }

          armorClassSection.editElements.submitForm();

          expect(armorClassSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedText);

          const json = verifyJsonExport(expectedValues);
          expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(armorClassSection).toExportPropertyLineToMarkdown(expectedHeading, expectedText);

          reset();
          armorClassSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the armor class, armor type, and shield if submitted with the custom text checkbox checked', () => {
        const expectedValues = {
          armorClass: 13,
          armorType: 'studded leather armor',
          hasShield: true,
          useCustomText: true,
          customText: 'This custom text should be __saved__, but not shown.',
          htmlCustomText: 'This custom text should be <strong>saved</strong>, but not shown.'
        };

        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, expectedValues.armorClass);
        inputValueAndTriggerEvent(armorClassSection.editElements.armorType, expectedValues.armorType);
        armorClassSection.editElements.hasShield.click();

        armorClassSection.editElements.useCustomText.click();
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, expectedValues.customText);

        armorClassSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedValues.htmlCustomText);

        const json = verifyJsonExport(expectedValues);

        reset();
        armorClassSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedValues.htmlCustomText);
      });

      it('should display an error if the armor class field is not a valid number', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.armorClass,
          'Armor Class must be a valid number.');
      });

      it('should display only one error if the armor class is not a valid number and custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, '');
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.armorClass,
          'Armor Class must be a valid number.');
      });
    });
  });
});

function reset() {
  armorClassModel.reset();
  armorClassSection.updateView();
}

function verifyModel({
  armorClass = 10,
  armorType = '',
  hasShield = false,
  useCustomText = false,
  customText = '',
  htmlCustomText = ''
} = {}) {
  expect(armorClassModel.armorClass).toBe(armorClass);
  expect(armorClassModel.armorType).toBe(armorType);
  expect(armorClassModel.hasShield).toBe(hasShield);
  expect(armorClassModel.useCustomText).toBe(useCustomText);
  expect(armorClassModel.customText).toBe(customText);
  expect(armorClassModel.htmlCustomText).toBe(htmlCustomText);
}

function verifyEditModeView({
  armorClass = 10,
  armorType = '',
  hasShield = false,
  useCustomText = false,
  customText = ''
} = {}) {
  expect(armorClassSection.editElements.armorClass).toHaveValue(armorClass);
  expect(armorClassSection.editElements.armorType).toHaveValue(armorType);
  expect(armorClassSection.editElements.hasShield.checked).toBe(hasShield);
  expect(armorClassSection.editElements.useCustomText.checked).toBe(useCustomText);
  expect(armorClassSection.editElements.customText).toHaveValue(customText);

  expect(armorClassSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
    armorClassSection.editElements.useCustomText,
    ['customText'],
    ['armorClass', 'armorType', 'hasShield']
  );
}

function verifyShowModeView(expectedText = '10') {
  expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedText);
}

function verifyJsonExport({
  armorClass = 10,
  armorType = '',
  hasShield = false,
  useCustomText = false,
  customText = ''
} = {}) {
  const json = armorClassSection.exportToJson();
  const expectedJson = {
    armorClass: armorClass,
    armorType: armorType,
    hasShield: hasShield,
    useCustomText: useCustomText,
    customText: customText
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}