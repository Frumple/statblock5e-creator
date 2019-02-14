export default class ErrorMessages {
  constructor() {
    this.errors = [];
  }

  add(fieldElement, message) {
    let error = {
      fieldElement: fieldElement,
      message: message
    };

    this.errors.push(error);
  }

  clear() {
    while (this.errors.length > 0) {
      this.errors.pop();
    }
  }

  any() {
    return this.errors.length > 0;
  }
}