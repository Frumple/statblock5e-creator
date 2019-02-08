import ArmorClassSection from '/src/js/sections/armor-class-section.js';
import { EnableDisableElementsCheckboxInternal } from '/src/js/extensions/enable-disable-elements-checkbox.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

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

afterEach(() => {
  document.clear();
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

    describe('and the save button is clicked', () => {
      it('should switch to show mode and save the custom text', () => {
        let customText = '14 (natural armor), 11 while prone';
        inputValue(armorClassSection.editElements.customText, customText);

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent(customText);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValue(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveSingleError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text cannot be blank.');
      });

      it('should display only one error if the armor class and custom text fields are both blank', () => {
        inputValue(armorClassSection.editElements.armorClass, NaN);
        inputValue(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveSingleError(
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

    describe('and the save button is clicked', () => {
      it('should switch to show mode and save the armor class only', () => {
        inputValue(armorClassSection.editElements.armorClass, 7);

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('7');
      });

      it('should switch to show mode and save the armor class and armor type', () => {
        inputValue(armorClassSection.editElements.armorClass, 21);
        inputValue(armorClassSection.editElements.armorType, 'natural armor');

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('21 (natural armor)');
      });

      it('should switch to show mode and save the armor class and shield', () => {
        inputValue(armorClassSection.editElements.armorClass, 12);      
        armorClassSection.editElements.shield.click();

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('12 (shield)');
      });

      it('should switch to show mode and save the armor class, armor type, and shield', () => {
        inputValue(armorClassSection.editElements.armorClass, 16);
        inputValue(armorClassSection.editElements.armorType, 'chain shirt');
        armorClassSection.editElements.shield.click();

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('show');
        expect(armorClassSection.showElements.text).toHaveTextContent('16 (chain shirt, shield)');
      });

      it('should display an error if the armor class field is blank', () => {
        inputValue(armorClassSection.editElements.armorClass, NaN);

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveSingleError(
          armorClassSection.editElements.armorClass,
          'Armor Class must be a valid number.');
      });

      it('should display only one error if the armor class and custom text fields are both blank', () => {
        inputValue(armorClassSection.editElements.armorClass, NaN);
        inputValue(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.saveAction.click();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveSingleError(
          armorClassSection.editElements.armorClass,
          'Armor Class must be a valid number.');
      });
    });
  });  
});