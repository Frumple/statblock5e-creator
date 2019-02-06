const sectionHiddenClass = 'section_hidden';

export function expectSectionMode(section, expectedMode) {
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

export function expectSectionToHaveSingleError(section, expectedFieldElement, expectedMessage) {
  let errors = section.errorMessages.errors;
  expect(errors.length).toBe(1);
  expectError(errors[0], expectedFieldElement, expectedMessage);
}

export function expectError(error, expectedFieldElement, expectedMessage) {
  expect(error.fieldElement).toBe(expectedFieldElement);
  expect(error.message).toBe(expectedMessage);
}