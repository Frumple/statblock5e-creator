import HeadingSection from './heading-section.js';
import ErrorMessages from '../elements/error-messages.js';
jest.mock('../elements/error-messages.js');

// Importing jest-dom directly here due to bug in Jest setupFilesAfterEnv:
// https://github.com/facebook/jest/issues/7719
// TODO: Remove this when the fix for this bug is available.
import 'jest-dom/extend-expect';

beforeAll(async() => {
  await HeadingSection.define();
});

describe('when the edit button is clicked', () => {
  it('should switch to edit mode', () => {
    let headingSection = new HeadingSection();
  
    headingSection.showElements.section.click();  
  
    expect(headingSection.mode).toBe('edit');
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

    expect(headingSection.mode).toBe('show');  
    expect(headingSection.showElements.title).toHaveTextContent('Beholder');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Large aberration, lawful evil');
  });
});


