import { fetchFromFile } from './file-helpers.js';

class HtmlTemplates {
  constructor() {
    this.templates = new Map();
  }

  async addTemplate(name, path) {
    const content = await fetchFromFile(path);
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
