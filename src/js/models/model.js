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
      this[propertyName] = json[propertyName];
    }
  }

  toJson() {
    const json = {};
    for (const propertyName of this.jsonPropertyNames) {
      json[propertyName] = this[propertyName];
    }
    return json;
  }

  toHtml() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the toHtml() method.`);
  }

  toHomebrewery() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the toHomebrewery() method.`);
  }
}