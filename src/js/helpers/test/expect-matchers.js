import toBeSelected from './matchers/to-be-selected.js';
import toBeInMode from './matchers/to-be-in-mode.js';
import toHaveError from './matchers/to-have-error.js';
import toHaveElementsEnabledOrDisabledBasedOnCheckboxState from './matchers/to-have-elements-enabled-or-disabled-based-on-checkbox-state.js';
import { toShowPropertyLine, toExportPropertyLineToHtml, toExportPropertyLineToMarkdown, toBeHtmlPropertyBlock } from './matchers/property-line-matchers.js';

// JSDOM 15.2.0 or higher can only focus elements that are added to the document body. It cannot focus on elements in a shadow root.
// TODO: Remove this matcher when JSDOM allows us to focus on elements in a shadow root.
// eslint-disable-next-line no-unused-vars
const toHaveFocus = function(element) {
  return {
    pass: true
  };
};

expect.extend({
  toHaveFocus,
  toBeSelected,
  toBeInMode,
  toHaveError,
  toHaveElementsEnabledOrDisabledBasedOnCheckboxState,
  toShowPropertyLine,
  toExportPropertyLineToHtml,
  toExportPropertyLineToMarkdown,
  toBeHtmlPropertyBlock
});