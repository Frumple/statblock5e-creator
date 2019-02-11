import { EnableDisableElementsCheckboxMixin } from '/src/js/extensions/enable-disable-elements-checkbox.js';

export function getCustomElementMixin(element) {
  const is = element.getAttribute('is');

  if (is === 'enable-disable-elements-checkbox') {
    return EnableDisableElementsCheckboxMixin;
  }

  return null;
}

export function assignCustomElementMixin(element, mixin) {
  Object.assign(element, mixin);
  element.initializeMixin();
}