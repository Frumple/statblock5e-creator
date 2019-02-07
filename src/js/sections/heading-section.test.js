import HeadingSection from '/src/js/sections/heading-section.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

let headingSection;

beforeAll(async() => {
  await HeadingSection.define();
});

beforeEach(() => {
  headingSection = new HeadingSection();
  headingSection.errorMessages = new ErrorMessages();
});

describe('when the show section is clicked', () => {
  it('should switch to edit mode and focus on the title field', () => {
    headingSection.showElements.section.click(); 
    
    expect(headingSection).toBeInMode('edit');
    expect(headingSection.editElements.title).toHaveFocus();
  });
});

describe('when the save button is clicked', () => {
  beforeEach(() => {
    headingSection.showElements.section.click(); 
  });

  it('should switch to show mode and save the creature name, size, type, and alignment', () => {
    inputValue(headingSection.editElements.title, 'Beholder');
    inputValue(headingSection.editElements.size, 'Large');
    inputValue(headingSection.editElements.type, 'aberration');
    inputValue(headingSection.editElements.alignment, 'lawful evil');
  
    headingSection.editElements.saveAction.click();

    expect(headingSection).toBeInMode('show');
    expect(headingSection.showElements.title).toHaveTextContent('Beholder');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Large aberration, lawful evil');
  });

  it('should capitalize the first letter in the creature name', () => {
    inputValue(headingSection.editElements.title, 'young red dragon');

    headingSection.editElements.saveAction.click();

    expect(headingSection).toBeInMode('show');
    expect(headingSection.showElements.title).toHaveTextContent('Young red dragon');
  });

  it('should trim whitespace from the creature name and type', () => {
    inputValue(headingSection.editElements.title, '  Purple Worm ');
    inputValue(headingSection.editElements.size, 'Gargantuan');
    inputValue(headingSection.editElements.type, '    monstrosity        ');
    inputValue(headingSection.editElements.alignment, 'unaligned');

    headingSection.editElements.saveAction.click();

    expect(headingSection).toBeInMode('show');
    expect(headingSection.showElements.title).toHaveTextContent('Purple Worm');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
  });

  it('should display an error if the creature name field is blank', () => {
    inputValue(headingSection.editElements.title, '');

    headingSection.editElements.saveAction.click();

    expect(headingSection).toBeInMode('edit');
    expect(headingSection).toHaveSingleError(
      headingSection.editElements.title,
      'Creature Name cannot be blank.');
  });

  it('should display an error if the creature type field is blank', () => {
    inputValue(headingSection.editElements.type, '');

    headingSection.editElements.saveAction.click();

    expect(headingSection).toBeInMode('edit');
    expect(headingSection).toHaveSingleError(
      headingSection.editElements.type,
      'Creature Type cannot be blank.');
  });

  it('should display both errors if the creature name and creature type fields are both blank', () => {
    inputValue(headingSection.editElements.title, '');
    inputValue(headingSection.editElements.type, '');

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
