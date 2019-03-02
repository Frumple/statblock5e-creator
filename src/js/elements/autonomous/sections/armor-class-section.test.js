import ArmorClassSection from '/src/js/elements/autonomous/sections/armor-class-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineCustomElements from '/src/js/helpers/test/define-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let armorClassSection;

beforeAll(async() => {
  await defineCustomElements();
  await ArmorClassSection.define();
});

beforeEach(() => {
  armorClassSection = new ArmorClassSection();
  copyObjectProperties(armorClassSection, SectionTestMixin);
  armorClassSection.initializeCustomElements();
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
      armorClassSection.editElements.useCustom.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(armorClassSection.editElements.armorClass).toBeDisabled();
      expect(armorClassSection.editElements.armorType).toBeDisabled();
      expect(armorClassSection.editElements.shield).toBeDisabled();
      expect(armorClassSection.editElements.customText).not.toBeDisabled();

      expect(armorClassSection.editElements.customText).toHaveFocus();
    });

    describe('and the edit section is submitted', () => {
      it('should switch to show mode and save the custom text', () => {
        let customText = '14 (natural armor), 11 while prone';
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, customText);

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent(customText);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text cannot be blank.');
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
      armorClassSection.editElements.useCustom.click();
      armorClassSection.editElements.useCustom.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the armor class field', () => {
      expect(armorClassSection.editElements.armorClass).not.toBeDisabled();
      expect(armorClassSection.editElements.armorType).not.toBeDisabled();
      expect(armorClassSection.editElements.shield).not.toBeDisabled();
      expect(armorClassSection.editElements.customText).toBeDisabled();

      expect(armorClassSection.editElements.armorClass).toHaveFocus();
    });

    describe('and the edit section is submitted', () => {
      it('should switch to show mode and save the armor class only', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 7);

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('7');
      });

      it('should switch to show mode and save the armor class and armor type', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 21);
        inputValueAndTriggerEvent(armorClassSection.editElements.armorType, 'natural armor');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('21 (natural armor)');
      });

      it('should switch to show mode and save the armor class and shield', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 12);      
        armorClassSection.editElements.shield.click();

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('12 (shield)');
      });

      it('should switch to show mode and save the armor class, armor type, and shield', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, 16);
        inputValueAndTriggerEvent(armorClassSection.editElements.armorType, 'chain shirt');
        armorClassSection.editElements.shield.click();

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('16 (chain shirt, shield)');
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