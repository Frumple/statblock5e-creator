import isRunningInNode from './is-running-in-node.js';

class HtmlTemplates {
  constructor() {
    this.templates = new Map();
  }

  async fetchFromFile(path) {
    if (isRunningInNode) {
      const fs = require('fs');
      const util = require('util');
      const readFile = util.promisify(fs.readFile);

      return await readFile(path).then(buffer => buffer.toString());
    } else {
      return await fetch(path).then(stream => stream.text());
    }
  }

  async addTemplate(name, path) {
    const content = await this.fetchFromFile(path);
    this.templates.set(name, content);
  }

  hasTemplate(name) {
    return this.templates.has(name);
  }

  getTemplate(name) {
    return this.templates.get(name);
  }
}

export default new HtmlTemplates();
