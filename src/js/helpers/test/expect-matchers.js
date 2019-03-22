expect.extend({
  toBeSelected(element) {
    const pass = isTextSelected(element);
    let message = null;

    if (pass) {
      message = 'expected element not to be selected, but was selected';
    } else {
      message = 'expected element to be selected';
    }

    return {
      pass: pass,
      message: () => message
    };
  },  

  toBeInMode(section, expectedMode) {
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
  },

  toHaveError(section, expectedFieldElement, expectedMessage, expectedIndex = 0) {
    if (this.isNot) {
      throw new Error('The matcher toHaveError cannot be used with the not modifier.');
    }

    const errors = section.errorMessages.errors;

    const errorExists = (errors.length - 1 >= expectedIndex);
    if (! errorExists) {
      return {
        message: () => `expected error with index ${expectedIndex} to exist, but only ${errors.length} errors exist`,
        pass: false
      };
    }
    
    const theError = errors[expectedIndex];
    const focusedElement = theError.fieldElement.ownerDocument.activeElement;

    const hasMatchingFieldElement = (theError.fieldElement === expectedFieldElement);
    const hasMatchingMessage = (theError.message === expectedMessage);
    const fieldElementHasFocus = (focusedElement === expectedFieldElement);

    let message = '';
    let pass = false;

    if (expectedIndex == 0) {
      pass = (hasMatchingFieldElement && hasMatchingMessage && fieldElementHasFocus);
    } else {
      pass = (hasMatchingFieldElement && hasMatchingMessage);
    }   

    if (! hasMatchingFieldElement) {
      message += `expected error element to be '${expectedFieldElement}', but was '${theError.fieldElement}'\n`;
    }
    if (! hasMatchingMessage) {
      message += `expected error message to be '${expectedMessage}', but was '${theError.message}'`;
    }
    if (expectedIndex === 0 && ! fieldElementHasFocus) {
      message += `expected error element '${expectedFieldElement}' to have focus, but was '${focusedElement}'\n`;
    }

    return {
      message: () => message,
      pass: pass
    };
  },

  toHavePropertyLine(section, expectedHeading, expectedText, expectedTextHtml = null) {
    if (this.isNot) {
      throw new Error('The matcher toHavePropertyLine cannot be used with the not modifier.');
    }

    const headingElement = section.showElements.heading;
    const textElement = section.showElements.text;

    return matchPropertyLine(headingElement, textElement, expectedHeading, expectedText, expectedTextHtml);
  },

  toExportPropertyLineToHtml(section, expectedHeading, expectedText, expectedTextHtml = null) {
    if (this.isNot) {
      throw new Error('The matcher toExportPropertyLineToHtml cannot be used with the not modifier.');
    }

    const propertyLine = section.exportToHtml();
    const headingElement = propertyLine.querySelector('h4');
    const textElement = propertyLine.querySelector('p');

    return matchPropertyLine(headingElement, textElement, expectedHeading, expectedText, expectedTextHtml);
  }
});

function isTextSelected(element) {
  if (typeof element.selectionStart === 'number') {
    return element.selectionStart === 0 && element.selectionEnd === element.value.length;
  } else if (typeof document.selection !== 'undefined') {
    return document.selection.createRange().text === element.value;
  } else {
    throw 'Unable to determine the selected text for the element using JSDOM.';
  }
}

function matchPropertyLine(headingElement, textElement, expectedHeading, expectedText, expectedTextHtml = null) {
  const hasMatchingHeading = (headingElement.textContent === expectedHeading);
  const hasMatchingText = (textElement.textContent === expectedText);
  const hasMatchingTextHtml = (expectedTextHtml !== null) ? (textElement.innerHTML === expectedTextHtml) : true;

  const pass = (hasMatchingHeading && hasMatchingText && hasMatchingTextHtml);
  let message = '';

  if (! hasMatchingHeading) {
    message += `expected property line heading to be '${expectedHeading}', but was '${headingElement.textContent}'\n`;
  }
  if (! hasMatchingText) {
    message += `expected property line text to be '${expectedText}', but was '${textElement.textContent}'`;
  }
  if (! hasMatchingTextHtml) {
    message += `expected property line text to contain HTML '${expectedTextHtml}', but was '${textElement.innerHTML}'`;
  }

  return {
    message: () => message,
    pass: pass
  };
}