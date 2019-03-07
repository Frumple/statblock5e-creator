import isRunningInNode from './is-running-in-node.js';

class HtmlTemplates {
  constructor() {
    this.templates = new Map();
  }

  async addTemplate(name, path) {
    let content;

    if (isRunningInNode) {
      const fs = require('fs');
      const util = require('util');
      const readFile = util.promisify(fs.readFile);

      const buffer = await readFile(path);
      content = buffer.toString();
    } else {
      content = await fetch(path).then(stream => stream.text());
    }

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
