import HeadingSection from '/src/js/sections/heading-section.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

import * as ExpectHelpers from '/src/js/helpers/expect-helpers.js';

let headingSection;

beforeAll(async() => {
  await HeadingSection.define();
});

beforeEach(() => {
  headingSection = new HeadingSection();
  headingSection.errorMessages = new ErrorMessages();
});

describe('when the show section is clicked', () => {
  it('should switch to edit mode and focus on initial element', () => {
    headingSection.showElements.section.click(); 
    
    ExpectHelpers.expectSectionMode(headingSection, 'edit');
    expect(headingSection.editElements.title).toHaveFocus();
  });
});

describe('when the save button is clicked', () => {
  beforeEach(() => {
    headingSection.showElements.section.click(); 
  });

  it('should switch to show mode and save the creature name, size, type, and alignment', () => {
    headingSection.editElements.title.value = 'Beholder';
    headingSection.editElements.size.value = 'Large';
    headingSection.editElements.type.value = 'aberration';
    headingSection.editElements.alignment.value = 'lawful evil';
  
    headingSection.editElements.saveAction.click();

    ExpectHelpers.expectSectionMode(headingSection, 'show');
    expect(headingSection.showElements.title).toHaveTextContent('Beholder');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Large aberration, lawful evil');
  });

  it('should capitalize the first letter in the creature name', () => {
    headingSection.editElements.title.value = 'young red dragon';

    headingSection.editElements.saveAction.click();

    ExpectHelpers.expectSectionMode(headingSection, 'show');
    expect(headingSection.showElements.title).toHaveTextContent('Young red dragon');
  });

  it('should trim whitespace from the creature name and type', () => {
    headingSection.editElements.title.value = '  Purple Worm ';
    headingSection.editElements.size.value = 'Gargantuan';
    headingSection.editElements.type.value = '    monstrosity        ';
    headingSection.editElements.alignment.value = 'unaligned';

    headingSection.editElements.saveAction.click();

    ExpectHelpers.expectSectionMode(headingSection, 'show');
    expect(headingSection.showElements.title).toHaveTextContent('Purple Worm');
    expect(headingSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
  });

  it('should display an error if the creature name is blank', () => {
    headingSection.editElements.title.value = '';

    headingSection.editElements.saveAction.click();

    ExpectHelpers.expectSectionMode(headingSection, 'edit');
    ExpectHelpers.expectSectionToHaveSingleError(
      headingSection,
      headingSection.editElements.title,
      'Creature Name cannot be blank.');
  });

  it('should display an error if the creature type is blank', () => {
    headingSection.editElements.type.value = '';

    headingSection.editElements.saveAction.click();

    ExpectHelpers.expectSectionMode(headingSection, 'edit');
    ExpectHelpers.expectSectionToHaveSingleError(
      headingSection,
      headingSection.editElements.type,
      'Creature Type cannot be blank.');
  });
});

