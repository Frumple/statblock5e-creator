import toBeSelected from './matchers/to-be-selected.js';
import toBeInMode from './matchers/to-be-in-mode.js';
import toHaveError from './matchers/to-have-error.js';
import toHaveElementsEnabledOrDisabledBasedOnCheckboxState from './matchers/to-have-elements-enabled-or-disabled-based-on-checkbox-state.js';
import { toShowPropertyLine, toExportPropertyLineToHtml, toExportPropertyLineToMarkdown, toBeHtmlPropertyBlock } from './matchers/property-line-matchers.js';

// TODO: Remove this matcher when the fix for the following JSDOM bug is available in Jest: https://github.com/jsdom/jsdom/issues/2472
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