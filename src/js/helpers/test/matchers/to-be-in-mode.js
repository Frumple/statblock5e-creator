export default function toBeInMode(section, expectedMode) {
  const sectionHiddenClass = 'section_hidden';

  const showSectionClassList = section.showElements.section.classList;
  const editSectionClassList = section.editElements.section.classList;

  const hasMatchingMode = (section.mode === expectedMode);
  let showSectionHasHiddenClass = showSectionClassList.contains(sectionHiddenClass);
  let editSectionHasHiddenClass = editSectionClassList.contains(sectionHiddenClass);

  if (expectedMode === 'show') {
    showSectionHasHiddenClass = ! showSectionHasHiddenClass;
  } else if(expectedMode === 'edit') {
    editSectionHasHiddenClass = ! editSectionHasHiddenClass;
  } else if(expectedMode !== 'hidden') {
    throw new Error(`'${expectedMode}' is not a valid section mode.`);
  }

  let message = '';
  let pass = hasMatchingMode &&
             showSectionHasHiddenClass &&
             editSectionHasHiddenClass;

  if (this.isNot && hasMatchingMode) {
    message += `expected section mode not to be '${expectedMode}', but was '${section.mode}'\n`;
  } else if (! this.isNot && ! hasMatchingMode) {
    message += `expected section mode to be '${expectedMode}', but was '${section.mode}'\n`;
  }

  if (this.isNot && showSectionHasHiddenClass) {
    message += `expected show section not to have '${sectionHiddenClass}' class, but was '${showSectionClassList.value}'\n`;
  } else if (! this.isNot && ! showSectionHasHiddenClass) {
    message += `expected show section to have '${sectionHiddenClass}' class, but was '${showSectionClassList.value}'\n`;
  }

  if (this.isNot && editSectionHasHiddenClass) {
    message += `expected edit section classes not to have '${sectionHiddenClass}' class, but was '${editSectionClassList.value}'`;
  } else if (! this.isNot && ! editSectionHasHiddenClass) {
    message += `expected edit section classes to have '${sectionHiddenClass}' class, but was '${editSectionClassList.value}'`;
  }

  return {
    message: () => message,
    pass: pass
  };
}