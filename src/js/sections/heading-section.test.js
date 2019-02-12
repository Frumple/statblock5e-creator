import HeadingSection from '/src/js/sections/heading-section.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let headingSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await HeadingSection.define();
});

beforeEach(() => {
  headingSection = new HeadingSection();
  headingSection.errorMessages = new ErrorMessages();
  headingSection.initializeCustomEditElements();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    headingSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the title field', () => {
    expect(headingSection).toBeInMode('edit');
    expect(headingSection.editElements.title).toHaveFocus();
  });

  describe('and fields are populated and the save button is clicked', () => {
    it('should switch to show mode and save the creature name, size, type, and alignment', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, 'Beholder');
      inputValueAndTriggerEvent(headingSection.editElements.size, 'Large');
      inputValueAndTriggerEvent(headingSection.editElements.type, 'aberration');
      inputValueAndTriggerEvent(headingSection.editElements.alignment, 'lawful evil');
    
      headingSection.editElements.saveAction.click();

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Beholder');
      expect(headingSection.showElements.subtitle).toHaveTextContent('Large aberration, lawful evil');
    });

    it('should capitalize the first letter in the creature name', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, 'young red dragon');

      headingSection.editElements.saveAction.click();

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Young red dragon');
    });

    it('should trim whitespace from the creature name and type', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, '  Purple Worm ');
      inputValueAndTriggerEvent(headingSection.editElements.size, 'Gargantuan');
      inputValueAndTriggerEvent(headingSection.editElements.type, '    monstrosity        ');
      inputValueAndTriggerEvent(headingSection.editElements.alignment, 'unaligned');

      headingSection.editElements.saveAction.click();

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Purple Worm');
      expect(headingSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
    });

    it('should display an error if the creature name field is blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, '');

      headingSection.editElements.saveAction.click();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection).toHaveSingleError(
        headingSection.editElements.title,
        'Creature Name cannot be blank.');
    });

    it('should display an error if the creature type field is blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.type, '');

      headingSection.editElements.saveAction.click();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection).toHaveSingleError(
        headingSection.editElements.type,
        'Creature Type cannot be blank.');
    });

    it('should display both errors if the creature name and creature type fields are both blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, '');
      inputValueAndTriggerEvent(headingSection.editElements.type, '');

      headingSection.editElements.saveAction.click();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection.errorMessages.errors.length).toBe(2);
      expect(headingSection).toHaveError(
        headingSection.editElements.title,
        'Creature Name cannot be blank.');
      expect(headingSection).toHaveError(
        headingSection.editElements.type,
        'Creature Type cannot be blank.');
    });
  });
});
