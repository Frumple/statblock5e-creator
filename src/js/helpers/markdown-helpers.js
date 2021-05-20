export function isSelectedTextWithinMarkdown(fullText, selectionStart, selectionEnd) {
  const leadingSubstring = fullText.substring(selectionStart - 3, selectionStart);
  const trailingSubstring = fullText.substring(selectionEnd, selectionEnd + 3);

  if((leadingSubstring === '***' && trailingSubstring === '***') ||
     (leadingSubstring === '___' && trailingSubstring === '___') ||
     (leadingSubstring === '**_' && trailingSubstring === '_**') ||
     (leadingSubstring === '__*' && trailingSubstring === '*__')) {
    return 'bold-italic';
  } else if((leadingSubstring === '_**' && trailingSubstring === '**_') ||
            (leadingSubstring === '*__' && trailingSubstring === '__*')) {
    return 'italic-bold';
  } else if(surroundedByMarkdownInner('**', leadingSubstring, trailingSubstring) ||
            surroundedByMarkdownInner('__', leadingSubstring, trailingSubstring)) {
    return 'bold';
  } else if(surroundedByMarkdownInner('*', leadingSubstring, trailingSubstring) ||
            surroundedByMarkdownInner('_', leadingSubstring, trailingSubstring)) {
    return 'italic';
  }

  return 'none';
}

export function toggleBoldInSelectedText(fullText, selectionStart, selectionEnd) {
  const markdownState = isSelectedTextWithinMarkdown(fullText, selectionStart, selectionEnd);

  switch(markdownState) {
  case 'bold-italic':
    return removeMarkdownOuter(fullText, selectionStart, selectionEnd, 2);
  case 'italic-bold':
  case 'bold':
    return removeMarkdownInner(fullText, selectionStart, selectionEnd, 2);
  case 'italic':
  case 'none':
    return addMarkdown(fullText, selectionStart, selectionEnd, '**');
  }
}

export function toggleItalicInSelectedText(fullText, selectionStart, selectionEnd) {
  const markdownState = isSelectedTextWithinMarkdown(fullText, selectionStart, selectionEnd);

  switch(markdownState) {
  case 'italic-bold':
    return removeMarkdownOuter(fullText, selectionStart, selectionEnd, 1);
  case 'bold-italic':
  case 'italic':
    return removeMarkdownInner(fullText, selectionStart, selectionEnd, 1);
  case 'bold':
  case 'none':
    return addMarkdown(fullText, selectionStart, selectionEnd, '*');
  }
}

function surroundedByMarkdownInner(markdownString, leadingSubstring, trailingSubstring) {
  return leadingSubstring.endsWith(markdownString) && trailingSubstring.startsWith(markdownString);
}

function addMarkdown(fullText, selectionStart, selectionEnd, markdownString) {
  const newText = fullText.substring(0, selectionStart) +
                  markdownString +
                  fullText.substring(selectionStart, selectionEnd) +
                  markdownString +
                  fullText.substring(selectionEnd, fullText.length);

  const newSelectionStart = selectionStart + markdownString.length;
  const newSelectionEnd = selectionEnd + markdownString.length;

  return {
    newText: newText,
    newSelectionStart: newSelectionStart,
    newSelectionEnd: newSelectionEnd
  };
}

function removeMarkdownInner(fullText, selectionStart, selectionEnd, numberOfChars) {
  const newText = fullText.substring(0, selectionStart - numberOfChars) +
                  fullText.substring(selectionStart, selectionEnd) +
                  fullText.substring(selectionEnd + numberOfChars, fullText.length);

  const newSelectionStart = selectionStart - numberOfChars;
  const newSelectionEnd = selectionEnd - numberOfChars;

  return {
    newText: newText,
    newSelectionStart: newSelectionStart,
    newSelectionEnd: newSelectionEnd
  };
}

function removeMarkdownOuter(fullText, selectionStart, selectionEnd, numberOfChars) {
  const newText = fullText.substring(0, selectionStart - 3) +
                  fullText.substring(selectionStart - 3 + numberOfChars, selectionEnd + 3 - numberOfChars) +
                  fullText.substring(selectionEnd + 3, fullText.length);

  const newSelectionStart = selectionStart - numberOfChars;
  const newSelectionEnd = selectionEnd - numberOfChars;

  return {
    newText: newText,
    newSelectionStart: newSelectionStart,
    newSelectionEnd: newSelectionEnd
  };
}