import LanguagesSection from '/src/js/sections/languages-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let languagesSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await LanguagesSection.define();
});

beforeEach(() => {
  languagesSection = new LanguagesSection();
  copyObjectProperties(languagesSection, SectionTestMixin);
  languagesSection.initializeCustomElements();
  languagesSection.forceConnect();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    languagesSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(languagesSection).toBeInMode('edit');
    expect(languagesSection.editElements.input).toHaveFocus();
  });


});