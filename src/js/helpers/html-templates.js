class HtmlTemplates {
  constructor() {
    this.templates = new Map();
  }

  async addTemplate(name, path) {
    let content = await fetch(path).then(stream => stream.text());
    let contentNode = document.createRange().createContextualFragment(content);
    this.templates.set(name, contentNode);
  }

  hasTemplate(name) {
    return this.templates.has(name);
  }

  getTemplate(name) {
    return this.templates.get(name);
  }
}

export default new HtmlTemplates();
