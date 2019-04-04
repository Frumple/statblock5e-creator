import ArmorClassSection from './armor-class-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import ArmorClass from '../../../models/armor-class.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Armor Class';

let armorClassSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ArmorClassSection.define();
});

beforeEach(() => {
  ArmorClass.reset();

  armorClassSection = new ArmorClassSection();
  TestCustomElements.initializeSection(armorClassSection);
  armorClassSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    armorClassSection.showElements.section.click(); 
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
      expect(armorClassSection.editElements.armorClass).toBeDisabled();
      expect(armorClassSection.editElements.armorType).toBeDisabled();
      expect(armorClassSection.editElements.hasShield).toBeDisabled();
      expect(armorClassSection.editElements.customText).not.toBeDisabled();

      expect(armorClassSection.editElements.customText).toHaveFocus();
      expect(armorClassSection.editElements.customText).toBeSelected();
    });

    describe('and the edit section is submitted', () => {
      it('should switch to show mode and save the custom text', () => {
        const customText = '14 (natural armor), 11 while prone';
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, customText);

        armorClassSection.editElements.submitForm();

        expect(ArmorClass.useCustomText).toBe(true);
        expect(ArmorClass.originalCustomText).toBe(customText);
        expect(ArmorClass.parsedCustomText).toBe(customText);

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection).toShowPropertyLine(expectedHeading, customText);

        expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, customText);
        expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, customText);
      });

      it('should switch to show mode and save the custom text with valid markdown syntax', () => {
        const originalText = '12 (15 with *mage armor*)';
        const parsedText = '12 (15 with <em>mage armor</em>)';
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, originalText);

        armorClassSection.editElements.submitForm();

        expect(ArmorClass.useCustomText).toBe(true);
        expect(ArmorClass.originalCustomText).toBe(originalText);
        expect(ArmorClass.parsedCustomText).toBe(parsedText);

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection).toShowPropertyLine(expectedHeading, parsedText);

        expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, parsedText);
        expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, originalText);
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
          'Armor Class Custom Text has invalid syntax.');
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
      expect(armorClassSection.editElements.armorClass).not.toBeDisabled();
      expect(armorClassSection.editElements.armorType).not.toBeDisabled();
      expect(armorClassSection.editElements.hasShield).not.toBeDisabled();
      expect(armorClassSection.editElements.customText).toBeDisabled();

      expect(armorClassSection.editElements.armorClass).toHaveFocus();
    });

    describe('and the edit section is submitted', () => {
      it('should switch to show mode and save the armor class only', () => {
        const expectedText = '7';

        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 7);

        armorClassSection.editElements.submitForm();

        expect(ArmorClass.armorClass).toBe(7);
        expect(ArmorClass.armorType).toBe('');
        expect(ArmorClass.hasShield).toBe(false);

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedText);

        expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
      });

      it('should switch to show mode and save the armor class and armor type', () => {
        const expectedText = '21 (natural armor)';

        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 21);
        inputValueAndTriggerEvent(armorClassSection.editElements.armorType, 'natural armor');

        armorClassSection.editElements.submitForm();

        expect(ArmorClass.armorClass).toBe(21);
        expect(ArmorClass.armorType).toBe('natural armor');
        expect(ArmorClass.hasShield).toBe(false);

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedText);

        expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
      });

      it('should switch to show mode and save the armor class and shield', () => {
        const expectedText = '12 (shield)';

        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 12);      
        armorClassSection.editElements.hasShield.click();

        armorClassSection.editElements.submitForm();

        expect(ArmorClass.armorClass).toBe(12);
        expect(ArmorClass.armorType).toBe('');
        expect(ArmorClass.hasShield).toBe(true);

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedText);

        expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
      });

      it('should switch to show mode and save the armor class, armor type, and shield', () => {
        const expectedText = '16 (chain shirt, shield)';

        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 16);
        inputValueAndTriggerEvent(armorClassSection.editElements.armorType, 'chain shirt');
        armorClassSection.editElements.hasShield.click();

        armorClassSection.editElements.submitForm();

        expect(ArmorClass.armorClass).toBe(16);
        expect(ArmorClass.armorType).toBe('chain shirt');
        expect(ArmorClass.hasShield).toBe(true);

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedText);

        expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
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