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

  fromJson(json) {
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