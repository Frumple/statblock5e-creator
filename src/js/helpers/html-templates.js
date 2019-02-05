import isRunningInNode from '../helpers/is-running-in-node.js';

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

      content = await readFile(path);
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
