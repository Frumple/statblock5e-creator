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
      message += `expected error element to be '${expectedFieldElement.id}', but was '${theError.fieldElement.id}'\n`;
    }
    if (! hasMatchingMessage) {
      message += `expected error message to be '${expectedMessage}', but was '${theError.message}'`;
    }
    if (expectedIndex === 0 && ! fieldElementHasFocus) {
      message += `expected error element '${expectedFieldElement.id}' to have focus, but was '${focusedElement.id}'\n`;
    }

    return {
      message: () => message,
      pass: pass
    };
  },

  toShowPropertyLine(section, expectedHeading, expectedText) {
    if (this.isNot) {
      throw new Error('The matcher toShowPropertyLine cannot be used with the not modifier.');
    }

    const headingElement = section.showElements.heading;
    const textElement = section.showElements.text;

    return matchPropertyLineOrBlock(headingElement.textContent, textElement.innerHTML, expectedHeading, expectedText);
  },

  toExportPropertyLineToHtml(section, expectedHeading, expectedText) {
    if (this.isNot) {
      throw new Error('The matcher toExportPropertyLineToHtml cannot be used with the not modifier.');
    }

    const propertyLine = section.exportToHtml();
    const headingElement = propertyLine.querySelector('h4');
    const textElement = propertyLine.querySelector('p');

    if (propertyLine.tagName !== 'PROPERTY-LINE') {
      return {
        message: () => `expected tag name to be 'property-line', but was ${propertyLine.tagName}`,
        pass: false
      };
    }

    expect(propertyLine.tagName).toBe('PROPERTY-LINE');

    return matchPropertyLineOrBlock(headingElement.textContent, textElement.innerHTML, expectedHeading, expectedText);
  },

  toExportPropertyLineToHomebrewery(section, expectedHeading, expectedText) {
    if (this.isNot) {
      throw new Error('The matcher toExportPropertyLineToHomebrewery cannot be used with the not modifier.');
    }

    const propertyLine = section.exportToHomebrewery();
    const expectedPropertyLine = `> - **${expectedHeading}** ${expectedText}`;

    let message = '';
    const pass = (propertyLine === expectedPropertyLine);

    if (! pass) {
      message = `expected property line to be '${expectedPropertyLine}', but was ${propertyLine}`;
    }

    return {
      message: () => message,
      pass: pass
    };
  },

  toBeHtmlPropertyBlock(propertyBlock, expectedHeading, expectedText) {
    if (this.isNot) {
      throw new Error('The matcher toBeHtmlPropertyBlock cannot be used with the not modifier.');
    }

    const headingElement = propertyBlock.querySelector('h4');
    const textElement = propertyBlock.querySelector('p');

    if (propertyBlock.tagName !== 'PROPERTY-BLOCK') {
      return {
        message: () => `expected tag name to be 'property-block', but was ${propertyBlock.tagName}`,
        pass: false
      };
    }

    return matchPropertyLineOrBlock(headingElement.textContent, textElement.innerHTML, expectedHeading, expectedText);
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

function matchPropertyLineOrBlock(heading, text, expectedHeading, expectedText) {
  const hasMatchingHeading = (heading === expectedHeading);
  const hasMatchingText = (text === expectedText);

  const pass = (hasMatchingHeading && hasMatchingText);
  let message = '';

  if (! hasMatchingHeading) {
    message += `expected heading to be '${expectedHeading}', but was '${heading}'\n`;
  }
  if (! hasMatchingText) {
    message += `expected text to be '${expectedText}', but was '${text}'`;
  }

  return {
    message: () => message,
    pass: pass
  };
}