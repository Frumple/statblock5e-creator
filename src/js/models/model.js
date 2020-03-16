export default class Model {
  constructor() {
  }

  reset() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the reset() method.`);
  }

  get jsonPropertyNames() {
    return [];
  }

  // eslint-disable-next-line no-unused-vars
  fromOpen5e(json) {
    throw new Error(
      `The class '${this.constructor.name}' must implement the fromOpen5e() method.`);
  }

  fromJson(json) {
    this.reset();

    for (const propertyName of this.jsonPropertyNames) {
      if (propertyName in json) {
        this[propertyName] = json[propertyName];
      }
    }
  }

  toJson() {
    const json = {};
    for (const propertyName of this.jsonPropertyNames) {
      if (propertyName in this) {
        json[propertyName] = this[propertyName];
      }
    }
    return json;
  }

  toHtml() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the toHtml() method.`);
  }

  toMarkdown() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the toMarkdown() method.`);
  }
}