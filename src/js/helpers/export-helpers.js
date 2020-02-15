const ClipboardJS = require('clipboard');

export class ClipboardWrapper {
  constructor(
    copiedText,
    container,
    targetElement) {

    this.clipboard = new ClipboardJS(targetElement, {
      container: container,
      text: function() {
        return copiedText;
      }
    });
  }

  setSuccessCallback(callback) {
    this.clipboard.on('success', callback);
  }

  setErrorCallback(callback) {
    this.clipboard.on('error', callback);
  }

  destroy() {
    this.clipboard.destroy();
  }
}

export function startFileDownload(content, contentType, fileName) {
  const blob = new Blob([content], {type: contentType});
  const link = document.createElement('a');
  link.download = fileName;
  link.href = URL.createObjectURL(blob);
  link.click();
}

export function createHtmlPropertyLine(heading, text) {
  const propertyLine = document.createElement('property-line');
  return populatePropertyElement(propertyLine, heading, text);
}

export function createHtmlPropertyBlock(heading, text) {
  const propertyBlock = document.createElement('property-block');
  return populatePropertyElement(propertyBlock, `${heading}.`, text);
}

function populatePropertyElement(element, heading, text) {
  const headingElement = document.createElement('h4');
  const textElement = document.createElement('p');

  headingElement.textContent = heading;
  textElement.innerHTML = text;

  element.appendChild(headingElement);
  element.appendChild(textElement);

  return element;
}

export function createMarkdownPropertyLine(heading, text) {
  return `> - **${heading}** ${text}`;
}

export function createMarkdownPropertyBlock(heading, text) {
  return `> ***${heading}.*** ${text}`;
}