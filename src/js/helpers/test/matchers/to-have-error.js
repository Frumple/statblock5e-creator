export default function toHaveError(section, expectedFieldElement, expectedMessage, expectedIndex = 0) {
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
  // TODO: Re-enable checking elements for focus when the fix for the following JSDOM bug is available in Jest: https://github.com/jsdom/jsdom/issues/2472
  // const focusedElement = theError.fieldElement.ownerDocument.activeElement;

  const hasMatchingFieldElement = (theError.fieldElement === expectedFieldElement);
  const hasMatchingMessage = (theError.message === expectedMessage);
  // const fieldElementHasFocus = (focusedElement === expectedFieldElement);

  let message = '';
  let pass = false;

  pass = (hasMatchingFieldElement && hasMatchingMessage);

  // if (expectedIndex == 0) {
  //   pass = (pass && fieldElementHasFocus);
  // }

  if (! hasMatchingFieldElement) {
    message += `expected error element to be '${expectedFieldElement.id}', but was '${theError.fieldElement.id}'\n`;
  }
  if (! hasMatchingMessage) {
    message += `expected error message to be '${expectedMessage}', but was '${theError.message}'`;
  }
  // if (expectedIndex === 0 && ! fieldElementHasFocus) {
  //   message += `expected error element '${expectedFieldElement.id}' to have focus, but was '${focusedElement.id}'\n`;
  // }

  return {
    message: () => message,
    pass: pass
  };
}