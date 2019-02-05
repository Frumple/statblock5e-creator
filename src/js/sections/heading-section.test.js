import HeadingSection from './heading-section.js';
import ErrorMessages from '../elements/error-messages.js';
jest.mock('../elements/error-messages.js');

// Importing jest-dom directly here due to bug in Jest setupFilesAfterEnv:
// https://github.com/facebook/jest/issues/7719
// TODO: Remove this when the fix for this bug is available.
import 'jest-dom/extend-expect';

const sectionHiddenClass = 'section_hidden';

beforeAll(async() => {
  await HeadingSection.define();
});

describe('when the edit button is clicked', () => {
  it('should switch to edit mode', () => {
    let headingSection = new HeadingSection();
  
    headingSection.showElements.section.click(); 
    
    expectSectionMode(headingSection, 'edit');
  });
});

describe('when the save button is clicked', () => {
  it('should switch to show mode and save the creature name, size, type, and alignment', () => {
    let headingSection = new HeadingSection();
    headingSection.errorMessages = new ErrorMessages();
    
    headingSection.mode = 'edit';
    headingSection.editElements.title.value = 'Beholder';
    headingSection.editElements.size.value = 'Large';
    headingSection.editElements.type.value = 'aberration';
    headingSection.editElements.alignment.value = 'lawful evil';
  
    headingSection.editElements.saveAction.click();

    expectSectionMode(headingSection, 'show');
    expect(headingSection.showElements.title).toHaveTextContent('Beholder');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Large aberration, lawful evil');
  });

  it('should capitalize the first letter in the creature name', () => {
    let headingSection = new HeadingSection();
    headingSection.errorMessages = new ErrorMessages();

    headingSection.mode = 'edit';
    headingSection.editElements.title.value = 'young red dragon';

    headingSection.editElements.saveAction.click();

    expectSectionMode(headingSection, 'show');
    expect(headingSection.showElements.title).toHaveTextContent('Young red dragon');
  });

  it('should trim whitespace from the creature name and type', () => {
    let headingSection = new HeadingSection();
    headingSection.errorMessages = new ErrorMessages();

    headingSection.mode = 'edit';
    headingSection.editElements.title.value = '  Purple Worm ';
    headingSection.editElements.size.value = 'Gargantuan';
    headingSection.editElements.type.value = '    monstrosity        ';
    headingSection.editElements.alignment.value = 'unaligned';

    headingSection.editElements.saveAction.click();

    expectSectionMode(headingSection, 'show');
    expect(headingSection.showElements.title).toHaveTextContent('Purple Worm');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
  });

  it('should display an error if the creature name is blank', () => {
    let headingSection = new HeadingSection();
    headingSection.errorMessages = new ErrorMessages();

    headingSection.mode = 'edit';
    headingSection.editElements.title.value = '';

    headingSection.editElements.saveAction.click();

    expectSectionMode(headingSection, 'edit');
    expectSectionSingleError(
      headingSection,
      headingSection.editElements.title,
      'Creature Name cannot be blank.');
  });

  it('should display an error if the creature type is blank', () => {
    let headingSection = new HeadingSection();
    headingSection.errorMessages = new ErrorMessages();

    headingSection.mode = 'edit';
    headingSection.editElements.type.value = '';

    headingSection.editElements.saveAction.click();

    expectSectionMode(headingSection, 'edit');
    expectSectionSingleError(
      headingSection,
      headingSection.editElements.type,
      'Creature Type cannot be blank.');
  });
});

function expectSectionMode(section, expectedMode) {
  if (expectedMode === 'hidden') {
    expect(section.mode).toBe('hidden');
    expect(section.showElements.section).toHaveClass(sectionHiddenClass);
    expect(section.editElements.section).toHaveClass(sectionHiddenClass);
  } else if (expectedMode === 'show') {
    expect(section.mode).toBe('show');
    expect(section.showElements.section).not.toHaveClass(sectionHiddenClass);
    expect(section.editElements.section).toHaveClass(sectionHiddenClass);
  } else if (expectedMode === 'edit') {
    expect(section.mode).toBe('edit');
    expect(section.showElements.section).toHaveClass(sectionHiddenClass);
    expect(section.editElements.section).not.toHaveClass(sectionHiddenClass);
  } else {
    throw new Error(`'${expectedMode}' is not a valid section mode.`);
  }
}

function expectSectionSingleError(section, expectedFieldElement, expectedMessage) {
  let errors = section.errorMessages.errors;
  expect(errors.length).toBe(1);
  expectError(errors[0], expectedFieldElement, expectedMessage);
}

function expectError(error, expectedFieldElement, expectedMessage) {
  expect(error.fieldElement).toBe(expectedFieldElement);
  expect(error.message).toBe(expectedMessage);
}


