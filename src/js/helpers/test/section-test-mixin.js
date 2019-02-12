import CustomElementMixins from '/src/js/helpers/test/custom-element-mixins.js';
import { traverseElements } from '/src/js/helpers/element-helpers.js';

import AttributeList from '/src/js/elements/attribute-list.js';
import ErrorMessages from '/src/js/elements/error-messages.js';

jest.mock('/src/js/elements/attribute-list.js');
jest.mock('/src/js/elements/error-messages.js');

/*
JSDOM does not currently support custom elements, so in our tests,
such elements will appear as vanilla elements with no special behaviour.
However, there are ways to inject or emulate this custom element 
behaviour, and the SectionTestMixin can be used to do this.

Before each test, apply the SectionTestMixin to the section object,
and then call initializeCustomElements(). This function will then
do the following depending on the type of custom element:

- For custom builtin elements (with an 'is' attribute),
  if the element has a corresponding mixin, that mixin will be applied.

- For specific custom autonomous elements (with their own unique tag name),
  if the element has a corresponding mock, it will be used instead.
*/

let SectionTestMixin; // eslint-disable-line no-unused-vars
export default SectionTestMixin = {
  initializeCustomElements() {
    this.errorMessages = new ErrorMessages();

    const listElement = this.editElements.list;
    if (listElement && listElement.tagName === 'ATTRIBUTE-LIST') {
      this.editElements.list = new AttributeList();
    }

    traverseElements(this.editElements, 3, (element) => {            
      CustomElementMixins.applyToElement(element);      
    });
  }
};
