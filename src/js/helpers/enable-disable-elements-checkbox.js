export default class EnableDisableElementsCheckbox {
  constructor(checkboxElement) {
    this.checkboxElement = checkboxElement;
    this.enabledElements = [];
    this.disabledElements = [];

    checkboxElement.addEventListener('input', () => {
      if (checkboxElement.checked) {
        this.enabledElements.forEach( (element) => {
          element.removeAttribute('disabled');
        });
        this.disabledElements.forEach( (element) => {
          element.setAttribute('disabled', '');
        });
      } else {
        this.enabledElements.forEach( (element) => {
          element.setAttribute('disabled', '');
        });
        this.disabledElements.forEach( (element) => {
          element.removeAttribute('disabled');
        });
      }
    });
  }

  enableElementWhenChecked(element) {
    this.enabledElements.push(element);
  }

  disableElementWhenChecked(element) {
    this.disabledElements.push(element);
  }
}
