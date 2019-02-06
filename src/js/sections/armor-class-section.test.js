import ArmorClassSection from '/src/js/sections/armor-class-section.js';
import { EnableDisableElementsCheckboxInternal } from '/src/js/extensions/enable-disable-elements-checkbox.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

import * as ExpectHelpers from '/src/js/helpers/expect-helpers.js';

let armorClassSection;

beforeAll(async() => {
  await ArmorClassSection.define();
});

beforeEach(() => {
  armorClassSection = new ArmorClassSection();
  armorClassSection.errorMessages = new ErrorMessages();
  armorClassSection.editElements.useCustom = new EnableDisableElementsCheckboxInternal(armorClassSection.editElements.useCustom);
  armorClassSection.forceConnect();
});

describe('when the show section is clicked', () => {
  it('should switch to edit mode and focus on initial element', () => {
    armorClassSection.showElements.section.click(); 
    
    ExpectHelpers.expectSectionMode(armorClassSection, 'edit');
    expect(armorClassSection.editElements.armorClass).toHaveFocus();
  });
});

describe('when the custom text checkbox is checked', () => {
  beforeEach(() => {
    armorClassSection.showElements.section.click(); 
    armorClassSection.editElements.useCustom.click();
  });

  it('should enable the custom text field, disable all other input elements, and focus on the correct element', () => {
    expect(armorClassSection.editElements.armorClass).toBeDisabled();
    expect(armorClassSection.editElements.armorType).toBeDisabled();
    expect(armorClassSection.editElements.shield).toBeDisabled();
    expect(armorClassSection.editElements.customText).not.toBeDisabled();

    expect(armorClassSection.editElements.customText).toHaveFocus();
  });

  describe('when the save button is clicked', () => {
    it('should switch to show mode and save the custom text', () => {
      let customText = '14 (natural armor), 11 while prone';
      armorClassSection.editElements.customText.value = customText;

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'show');
      expect(armorClassSection.showElements.text).toHaveTextContent(customText);
    });

    it('should display an error if the custom text is blank', () => {
      armorClassSection.editElements.customText.value = '';

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'edit');
      ExpectHelpers.expectSectionToHaveSingleError(
        armorClassSection,
        armorClassSection.editElements.customText,
        'Armor Class Custom Text cannot be blank.');
    });

    it('should display only one error if the armor class and custom text are both blank', () => {
      armorClassSection.editElements.armorClass.value = '';
      armorClassSection.editElements.customText.value = '';

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'edit');
      ExpectHelpers.expectSectionToHaveSingleError(
        armorClassSection,
        armorClassSection.editElements.customText,
        'Armor Class Custom Text cannot be blank.');
    });
  });
});

describe('when the custom text checkbox is unchecked', () => {
  beforeEach(() => {
    armorClassSection.showElements.section.click(); 
    armorClassSection.editElements.useCustom.click();
    armorClassSection.editElements.useCustom.click();
  });

  it('should enable the custom text field, disable all other input elements, and focus on the correct element', () => {
    expect(armorClassSection.editElements.armorClass).not.toBeDisabled();
    expect(armorClassSection.editElements.armorType).not.toBeDisabled();
    expect(armorClassSection.editElements.shield).not.toBeDisabled();
    expect(armorClassSection.editElements.customText).toBeDisabled();

    expect(armorClassSection.editElements.armorClass).toHaveFocus();
  });

  describe('when the save button is clicked', () => {
    it('should switch to show mode and save the armor class only', () => {
      armorClassSection.editElements.armorClass.value = 7;

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'show');
      expect(armorClassSection.showElements.text).toHaveTextContent('7');
    });

    it('should switch to show mode and save the armor class and armor type', () => {
      armorClassSection.editElements.armorClass.value = 21;
      armorClassSection.editElements.armorType.value = 'natural armor';

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'show');
      expect(armorClassSection.showElements.text).toHaveTextContent('21 (natural armor)');
    });

    it('should switch to show mode and save the armor class and shield', () => {
      armorClassSection.editElements.armorClass.value = 12;      
      armorClassSection.editElements.shield.click();

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'show');
      expect(armorClassSection.showElements.text).toHaveTextContent('12 (shield)');
    });

    it('should switch to show mode and save the armor class, armor type, and shield', () => {
      armorClassSection.editElements.armorClass.value = 16;
      armorClassSection.editElements.armorType.value = 'chain shirt';
      armorClassSection.editElements.shield.click();

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'show');
      expect(armorClassSection.showElements.text).toHaveTextContent('16 (chain shirt, shield)');
    });

    it('should display an error if the armor class is blank', () => {
      armorClassSection.editElements.armorClass.value = '';

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'edit');
      ExpectHelpers.expectSectionToHaveSingleError(
        armorClassSection,
        armorClassSection.editElements.armorClass,
        'Armor Class must be a valid number.');
    });

    it('should display only one error if the armor class and custom text are both blank', () => {
      armorClassSection.editElements.armorClass.value = '';
      armorClassSection.editElements.customText.value = '';

      armorClassSection.editElements.saveAction.click();

      ExpectHelpers.expectSectionMode(armorClassSection, 'edit');
      ExpectHelpers.expectSectionToHaveSingleError(
        armorClassSection,
        armorClassSection.editElements.armorClass,
        'Armor Class must be a valid number.');
    });
  });
});