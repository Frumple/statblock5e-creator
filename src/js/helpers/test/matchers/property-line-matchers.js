export function toShowPropertyLine(section, expectedHeading, expectedText) {
  if (this.isNot) {
    throw new Error('The matcher toShowPropertyLine cannot be used with the not modifier.');
  }

  const headingElement = section.showElements.heading;
  const textElement = section.showElements.text;

  return matchPropertyLineOrBlock(headingElement.textContent, textElement.innerHTML, expectedHeading, expectedText);
}

export function toExportPropertyLineToHtml(section, expectedHeading, expectedText) {
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
}

export function toExportPropertyLineToMarkdown(section, expectedHeading, expectedText) {
  if (this.isNot) {
    throw new Error('The matcher toExportPropertyLineToMarkdown cannot be used with the not modifier.');
  }

  const propertyLine = section.exportToMarkdown();
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
}

export function toBeHtmlPropertyBlock(propertyBlock, expectedHeading, expectedText, expectedTagName) {
  if (this.isNot) {
    throw new Error('The matcher toBeHtmlPropertyBlock cannot be used with the not modifier.');
  }

  const headingElement = propertyBlock.querySelector('h4');
  const textElement = propertyBlock.querySelector('p');

  if (propertyBlock.tagName !== expectedTagName) {
    return {
      message: () => `expected tag name to be 'property-block', but was ${propertyBlock.tagName}`,
      pass: false
    };
  }

  return matchPropertyLineOrBlock(headingElement.textContent, textElement.innerHTML, expectedHeading, expectedText);
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
